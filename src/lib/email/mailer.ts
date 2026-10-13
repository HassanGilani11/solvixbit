import nodemailer from 'nodemailer';

// SMTP Transporter configuration
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false'; // true for 465, false for 587
  const user = process.env.SMTP_USER || 'hello@solvixbit.com';
  const pass = process.env.SMTP_PASS || 'SolvixBit@2026@!*';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

const DEFAULT_FROM = process.env.SMTP_FROM_EMAIL || 'hello@solvixbit.com';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'hello@solvixbit.com';

export interface ContactEmailPayload {
  referenceId: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
  submittedAt: string;
}

export interface ProjectDiscoveryEmailPayload {
  referenceId: string;
  fullName: string;
  email: string;
  companyName: string;
  website?: string | null;
  projectTitle?: string | null;
  objectives?: string[];
  challenges?: string[];
  customChallenge?: string | null;
  scopeDeliverables?: string[];
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  preferredContact?: string;
  submittedAt: string;
}

// 1. Send Contact Form Notification to Internal Team
export async function sendContactNotification(data: ContactEmailPayload): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F9FAFB; margin: 0; padding: 24px; color: #111827; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A0E1A; padding: 28px; text-align: left; border-bottom: 3px solid #598BFF; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; color: #9CA3AF; font-size: 13px; font-family: monospace; }
    .content { padding: 28px; }
    .badge { display: inline-block; background: #EEF2FF; color: #4338CA; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #F3F4F6; font-size: 14px; }
    .info-table td.label { width: 140px; color: #6B7280; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    .info-table td.value { color: #111827; font-weight: 600; }
    .message-box { background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap; }
    .footer { padding: 20px 28px; background: #F9FAFB; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SOLVIXBIT // New Contact Inquiry</h1>
      <p>REF: ${data.referenceId} &bull; ${new Date(data.submittedAt).toUTCString()}</p>
    </div>
    <div class="content">
      <span class="badge">DIRECT INQUIRY</span>
      
      <table class="info-table">
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #598BFF; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
        ${data.company ? `<tr><td class="label">Company</td><td class="value">${escapeHtml(data.company)}</td></tr>` : ''}
        ${data.phone ? `<tr><td class="label">Phone</td><td class="value">${escapeHtml(data.phone)}</td></tr>` : ''}
        ${data.service ? `<tr><td class="label">Service Focus</td><td class="value">${escapeHtml(data.service)}</td></tr>` : ''}
        ${data.budget ? `<tr><td class="label">Target Budget</td><td class="value">${escapeHtml(data.budget)}</td></tr>` : ''}
        ${data.timeline ? `<tr><td class="label">Target Timeline</td><td class="value">${escapeHtml(data.timeline)}</td></tr>` : ''}
      </table>

      <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Client Message / Scope Details:</div>
      <div class="message-box">${escapeHtml(data.message)}</div>
    </div>
    <div class="footer">
      Hit "Reply" in your email client to respond directly to <strong>${escapeHtml(data.email)}</strong>.
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"SOLVIXBIT Notifications" <${DEFAULT_FROM}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `[New Inquiry] ${data.name} — ${data.company || data.service || 'General Scope'} [${data.referenceId}]`,
      text: `New Contact Inquiry received:\n\nReference: ${data.referenceId}\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service || 'N/A'}\nBudget: ${data.budget || 'N/A'}\nTimeline: ${data.timeline || 'N/A'}\n\nMessage:\n${data.message}`,
      html,
    });

    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send contact notification:', error);
    return false;
  }
}

// 2. Send Automated Confirmation to Client
export async function sendContactConfirmation(data: ContactEmailPayload): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F9FAFB; margin: 0; padding: 24px; color: #111827; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A0E1A; padding: 28px; text-align: left; border-bottom: 3px solid #02C415; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 800; }
    .header p { margin: 6px 0 0; color: #9CA3AF; font-size: 13px; }
    .content { padding: 32px 28px; }
    .ref-box { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 14px 16px; margin: 20px 0; color: #166534; font-size: 14px; font-weight: 600; }
    .footer { padding: 20px 28px; background: #F9FAFB; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SOLVIXBIT</h1>
      <p>Technology That Solves.</p>
    </div>
    <div class="content">
      <h2 style="font-size: 18px; font-weight: 700; margin-top: 0;">Inquiry Confirmed, ${escapeHtml(data.name)}</h2>
      <p style="font-size: 15px; color: #4B5563; line-height: 1.6;">
        Thank you for connecting with SOLVIXBIT. Your project briefing has been received and routed directly to our senior engineering partners.
      </p>

      <div class="ref-box">
        Verification Tracking ID: <strong>${data.referenceId}</strong>
      </div>

      <h3 style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 8px;">What happens next:</h3>
      <ol style="font-size: 14px; color: #4B5563; line-height: 1.7; padding-left: 20px; margin: 0 0 24px 0;">
        <li>Our technical leads review your architectural requirements and goals.</li>
        <li>A senior partner will reach out within 24 hours with preliminary scopes and availability.</li>
        <li>We coordinate a 20-minute alignment call to finalize deliverables and milestones.</li>
      </ol>

      <p style="font-size: 14px; color: #6B7280; line-height: 1.6;">
        If you have supplementary wireframes, architecture documents, or NDA requirements, reply directly to this email or send them to <a href="mailto:hello@solvixbit.com" style="color: #598BFF;">hello@solvixbit.com</a>.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} SOLVIXBIT. All rights reserved. &bull; <a href="https://solvixbit.com" style="color: #598BFF; text-decoration: none;">solvixbit.com</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"SOLVIXBIT Engineering" <${DEFAULT_FROM}>`,
      to: data.email,
      subject: `Inquiry Received [${data.referenceId}] — SOLVIXBIT Engineering`,
      text: `Hello ${data.name},\n\nThank you for reaching out to SOLVIXBIT. Your inquiry has been received (Reference: ${data.referenceId}).\n\nA senior partner will review your requirements and reach out within 24 hours.\n\nBest regards,\nSOLVIXBIT Engineering Team\nhttps://solvixbit.com`,
      html,
    });

    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send contact confirmation:', error);
    return false;
  }
}

// 3. Send Project Discovery Brief Notification to Internal Team
export async function sendProjectDiscoveryNotification(data: ProjectDiscoveryEmailPayload): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const objectivesList = (data.objectives || []).map((o) => `<li>${escapeHtml(o)}</li>`).join('');
    const challengesList = (data.challenges || []).map((c) => `<li>${escapeHtml(c)}</li>`).join('');
    const deliverablesList = (data.scopeDeliverables || []).map((d) => `<li>${escapeHtml(d)}</li>`).join('');

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F9FAFB; margin: 0; padding: 24px; color: #111827; }
    .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A0E1A; padding: 28px; text-align: left; border-bottom: 3px solid #598BFF; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 800; }
    .header p { margin: 6px 0 0; color: #9CA3AF; font-size: 13px; font-family: monospace; }
    .content { padding: 28px; }
    .badge { display: inline-block; background: #DCFCE7; color: #15803D; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table td { padding: 9px 12px; border-bottom: 1px solid #F3F4F6; font-size: 14px; }
    .info-table td.label { width: 150px; color: #6B7280; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    .info-table td.value { color: #111827; font-weight: 600; }
    .section-title { font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 18px; margin-bottom: 8px; }
    .list-box { background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px 16px 12px 28px; margin: 0 0 16px 0; font-size: 13px; color: #374151; }
    .desc-box { background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap; margin-bottom: 20px; }
    .footer { padding: 20px 28px; background: #F9FAFB; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SOLVIXBIT // Project Discovery Brief</h1>
      <p>REF: ${data.referenceId} &bull; ${new Date(data.submittedAt).toUTCString()}</p>
    </div>
    <div class="content">
      <span class="badge">SCOPED PROJECT BRIEF</span>

      <table class="info-table">
        <tr>
          <td class="label">Lead Contact</td>
          <td class="value">${escapeHtml(data.fullName)}</td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #598BFF; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td class="label">Company / Brand</td>
          <td class="value">${escapeHtml(data.companyName)}</td>
        </tr>
        ${data.website ? `<tr><td class="label">Website</td><td class="value"><a href="${escapeHtml(data.website)}" target="_blank" style="color: #598BFF;">${escapeHtml(data.website)}</a></td></tr>` : ''}
        ${data.projectTitle ? `<tr><td class="label">Project Title</td><td class="value">${escapeHtml(data.projectTitle)}</td></tr>` : ''}
        <tr>
          <td class="label">Planned Budget</td>
          <td class="value" style="color: #02C415;">${escapeHtml(data.budgetRange)}</td>
        </tr>
        <tr>
          <td class="label">Target Timeline</td>
          <td class="value">${escapeHtml(data.timeline)}</td>
        </tr>
        ${data.preferredContact ? `<tr><td class="label">Preferred Channel</td><td class="value">${escapeHtml(data.preferredContact)}</td></tr>` : ''}
      </table>

      <div class="section-title">Core Strategic Objectives</div>
      <ul class="list-box">${objectivesList}</ul>

      <div class="section-title">Key Challenges Being Solved</div>
      <ul class="list-box">
        ${challengesList}
        ${data.customChallenge ? `<li>Custom Challenge: ${escapeHtml(data.customChallenge)}</li>` : ''}
      </ul>

      ${data.scopeDeliverables && data.scopeDeliverables.length > 0 ? `
        <div class="section-title">Requested Deliverables & Architecture</div>
        <ul class="list-box">${deliverablesList}</ul>
      ` : ''}

      <div class="section-title">Project Narrative & Technical Scope</div>
      <div class="desc-box">${escapeHtml(data.projectDescription)}</div>
    </div>
    <div class="footer">
      Hit "Reply" in your email client to respond directly to <strong>${escapeHtml(data.email)}</strong>.
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"SOLVIXBIT Discovery" <${DEFAULT_FROM}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `[Project Brief] ${data.companyName} (${data.fullName}) — ${data.budgetRange} [${data.referenceId}]`,
      text: `New Project Discovery Brief received:\n\nReference: ${data.referenceId}\nClient: ${data.fullName}\nCompany: ${data.companyName}\nEmail: ${data.email}\nBudget: ${data.budgetRange}\nTimeline: ${data.timeline}\n\nObjectives:\n${(data.objectives || []).join(', ')}\n\nDescription:\n${data.projectDescription}`,
      html,
    });

    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send discovery brief notification:', error);
    return false;
  }
}

// 4. Send Confirmation to Discovery Brief Client
export async function sendProjectDiscoveryConfirmation(data: ProjectDiscoveryEmailPayload): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F9FAFB; margin: 0; padding: 24px; color: #111827; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A0E1A; padding: 28px; text-align: left; border-bottom: 3px solid #598BFF; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 800; }
    .header p { margin: 6px 0 0; color: #9CA3AF; font-size: 13px; }
    .content { padding: 32px 28px; }
    .ref-box { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 14px 16px; margin: 20px 0; color: #1E40AF; font-size: 14px; font-weight: 600; }
    .footer { padding: 20px 28px; background: #F9FAFB; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SOLVIXBIT</h1>
      <p>Technology That Solves.</p>
    </div>
    <div class="content">
      <h2 style="font-size: 18px; font-weight: 700; margin-top: 0;">Discovery Brief Confirmed, ${escapeHtml(data.fullName)}</h2>
      <p style="font-size: 15px; color: #4B5563; line-height: 1.6;">
        We've received your project brief for <strong>${escapeHtml(data.companyName)}</strong>. Our engineering leads are analyzing your objectives and will prepare an initial scope outline.
      </p>

      <div class="ref-box">
        Discovery Dossier ID: <strong>${data.referenceId}</strong>
      </div>

      <h3 style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 8px;">Next steps in our intake process:</h3>
      <ol style="font-size: 14px; color: #4B5563; line-height: 1.7; padding-left: 20px; margin: 0 0 24px 0;">
        <li>Review of your goals against our technical capability matrix.</li>
        <li>Direct contact from a practice lead within 24 business hours.</li>
        <li>Scheduling a technical discovery conversation to confirm milestones and delivery phases.</li>
      </ol>

      <p style="font-size: 14px; color: #6B7280; line-height: 1.6;">
        Have additional requirements or existing codebases to share under NDA? Reply directly to this email or write to <a href="mailto:hello@solvixbit.com" style="color: #598BFF;">hello@solvixbit.com</a>.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} SOLVIXBIT. All rights reserved. &bull; <a href="https://solvixbit.com" style="color: #598BFF; text-decoration: none;">solvixbit.com</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"SOLVIXBIT Engineering" <${DEFAULT_FROM}>`,
      to: data.email,
      subject: `Project Discovery Brief Received [${data.referenceId}] — SOLVIXBIT`,
      text: `Hello ${data.fullName},\n\nWe've received your project discovery brief for ${data.companyName} (Reference: ${data.referenceId}).\n\nOur engineering practice leads are reviewing your goals and will be in touch within 24 hours.\n\nBest regards,\nSOLVIXBIT Engineering Team\nhttps://solvixbit.com`,
      html,
    });

    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send discovery confirmation:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
