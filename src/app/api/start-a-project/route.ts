import { NextRequest, NextResponse } from 'next/server';
import { ProjectDiscoveryData, ProjectSubmissionResponse } from '@/types/content';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Spam Protection: Honeypot check
    if (body.website_url_hp && body.website_url_hp.trim().length > 0) {
      // Bot filled out hidden honeypot field
      return NextResponse.json<ProjectSubmissionResponse>(
        {
          success: false,
          error: 'Spam validation triggered. Please submit again.',
        },
        { status: 400 }
      );
    }

    const {
      objectives,
      challenges,
      customChallenge,
      challengeCustom,
      scopeDeliverables,
      scope,
      budgetRange,
      budget,
      timeline,
      fullName,
      email,
      workEmail,
      companyName,
      website,
      projectTitle,
      projectDescription,
      preferredContact,
      additionalNotes,
    } = body as ProjectDiscoveryData & { website_url_hp?: string };

    // Server-side validation
    const errors: Record<string, string> = {};

    const submittedEmail = (email || workEmail || '').trim().toLowerCase();
    const submittedName = (fullName || '').trim();

    if (!submittedName || submittedName.length < 2) {
      errors.fullName = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!submittedEmail || !emailRegex.test(submittedEmail)) {
      errors.email = 'Please provide a valid work email address.';
    }

    if (!companyName || companyName.trim().length < 2) {
      errors.companyName = 'Please provide your company or organization name.';
    }

    if (!projectDescription || projectDescription.trim().length < 15) {
      errors.projectDescription = 'Please describe your project or challenge (at least 15 characters).';
    }

    if (!objectives || objectives.length === 0) {
      errors.objectives = 'Please select at least one primary project objective.';
    }

    if (!challenges || challenges.length === 0) {
      errors.challenges = 'Please select the primary challenge describing your situation.';
    }

    if (!budgetRange && !budget) {
      errors.budgetRange = 'Please select a planned investment range.';
    }

    if (!timeline) {
      errors.timeline = 'Please indicate your target timeframe.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<ProjectSubmissionResponse>(
        {
          success: false,
          error: 'Validation failed. Please review the highlighted fields.',
          validationErrors: errors,
        },
        { status: 422 }
      );
    }

    // Generate unique verifiable reference ID
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceId = `SB-${Date.now().toString(36).toUpperCase().slice(-4)}-${randomSuffix}`;

    // Payload logging (In production, forward to CRM/Email provider via configured ENV vars)
    const sanitizedData = {
      referenceId,
      submittedAt: new Date().toISOString(),
      objectives,
      challenges,
      customChallenge: customChallenge || challengeCustom || null,
      scopeDeliverables: scopeDeliverables || scope || [],
      budgetRange: budgetRange || budget || 'Unspecified',
      timeline,
      fullName: submittedName,
      email: submittedEmail,
      companyName: companyName.trim(),
      website: website?.trim() || null,
      projectTitle: projectTitle?.trim() || null,
      projectDescription: projectDescription.trim(),
      preferredContact: preferredContact || 'email',
    };

    console.log('[SOLVIXBIT DISCOVERY SUBMISSION]', JSON.stringify(sanitizedData, null, 2));

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
        console.error('Failed to forward enquiry to external webhook:', err);
      }
    }

    return NextResponse.json<ProjectSubmissionResponse>(
      {
        success: true,
        referenceId,
        message: 'Thank you for reaching out. Your project discovery brief has been received.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Start a Project API Error:', error);
    return NextResponse.json<ProjectSubmissionResponse>(
      {
        success: false,
        error: 'An unexpected server error occurred while processing your request. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}
