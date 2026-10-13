import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification, sendContactConfirmation } from '../../../lib/email/mailer';

export interface ContactSubmissionBody {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  description?: string;
  website_url_hp?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  referenceId?: string;
  message?: string;
  error?: string;
  validationErrors?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactSubmissionBody = await req.json();

    // Spam Protection: Honeypot check
    if (body.website_url_hp && body.website_url_hp.trim().length > 0) {
      return NextResponse.json<ContactSubmissionResponse>(
        {
          success: false,
          error: 'Spam validation triggered. Please submit again.',
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      company,
      phone,
      service,
      budget,
      timeline,
      message,
      description,
    } = body;

    const submittedName = (name || '').trim();
    const submittedEmail = (email || '').trim().toLowerCase();
    const submittedMessage = (message || description || '').trim();

    // Validation
    const errors: Record<string, string> = {};

    if (!submittedName || submittedName.length < 2) {
      errors.name = 'Please provide your name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!submittedEmail || !emailRegex.test(submittedEmail)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!submittedMessage || submittedMessage.length < 10) {
      errors.message = 'Please provide details about your inquiry (minimum 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<ContactSubmissionResponse>(
        {
          success: false,
          error: 'Validation failed. Please review the highlighted fields.',
          validationErrors: errors,
        },
        { status: 422 }
      );
    }

    // Generate unique reference ID
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceId = `SB-CT-${Date.now().toString(36).toUpperCase().slice(-4)}-${randomSuffix}`;

    const sanitizedData = {
      referenceId,
      submittedAt: new Date().toISOString(),
      name: submittedName,
      email: submittedEmail,
      company: company?.trim() || null,
      phone: phone?.trim() || null,
      service: service || 'unspecified',
      budget: budget || 'unspecified',
      timeline: timeline || 'unspecified',
      message: submittedMessage,
    };

    console.log('[SOLVIXBIT CONTACT SUBMISSION]', JSON.stringify(sanitizedData, null, 2));

    // Optional CRM / Webhook forwarding if configured
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedData),
        });
      } catch (err) {
        console.error('Failed to forward contact inquiry to external webhook:', err);
      }
    }

    // Send SMTP notification to hello@solvixbit.com and confirmation to client
    try {
      await Promise.allSettled([
        sendContactNotification(sanitizedData),
        sendContactConfirmation(sanitizedData),
      ]);
    } catch (emailErr) {
      console.error('[SMTP EMAIL DISPATCH ERROR]', emailErr);
    }

    return NextResponse.json<ContactSubmissionResponse>(
      {
        success: true,
        referenceId,
        message: 'Your inquiry has been received. A senior partner will contact you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json<ContactSubmissionResponse>(
      {
        success: false,
        error: 'An unexpected server error occurred while processing your inquiry. Please try again or email us directly at hello@solvixbit.com.',
      },
      { status: 500 }
    );
  }
}
