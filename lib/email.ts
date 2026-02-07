// Email service integration with Resend

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  
  // If Resend is not configured, log and return (don't throw error)
  if (!apiKey) {
    console.log('Resend not configured. Email would be sent:', data);
    return;
  }

  try {
    // Dynamic import to avoid errors if Resend is not installed
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: data.from || process.env.EMAIL_FROM || 'dskinteriorsofficial@gmail.com',
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    console.log('Email sent successfully to:', data.to);
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw - we don't want email failures to break form submissions
    throw error;
  }
}

export function formatConsultationEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Consultation Request</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Project Type:</span>
            <span class="value">${data.projectType}</span>
          </div>
          <div class="field">
            <span class="label">Space Size:</span>
            <span class="value">${data.spaceSize}</span>
          </div>
          <div class="field">
            <span class="label">Budget Range:</span>
            <span class="value">${data.budgetRange}</span>
          </div>
          <div class="field">
            <span class="label">Timeline:</span>
            <span class="value">${data.timeline}</span>
          </div>
          <div class="field">
            <span class="label">Location:</span>
            <span class="value">${data.location}</span>
          </div>
          <div class="field">
            <span class="label">Style Preferences:</span>
            <span class="value">${data.stylePreferences?.join(", ") || "None"}</span>
          </div>
          ${data.specificRequirements ? `
          <div class="field">
            <span class="label">Specific Requirements:</span>
            <span class="value">${data.specificRequirements}</span>
          </div>
          ` : ''}
          <div class="field">
            <span class="label">Contact Name:</span>
            <span class="value">${data.contactName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${data.email}</span>
          </div>
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${data.phone}</span>
          </div>
          ${data.company ? `
          <div class="field">
            <span class="label">Company:</span>
            <span class="value">${data.company}</span>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatContactEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .message { background: white; padding: 15px; border-radius: 4px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span>
            <span class="value">${data.name}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${data.email}</span>
          </div>
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${data.phone || "Not provided"}</span>
          </div>
          <div class="field">
            <span class="label">Subject:</span>
            <span class="value">${data.subject}</span>
          </div>
          <div class="field">
            <span class="label">Message:</span>
            <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatAutoReplyEmail(name: string, type: 'consultation' | 'contact' = 'contact'): string {
  const title = type === 'consultation' 
    ? 'Thank You for Your Consultation Request'
    : 'Thank You for Contacting DSK Interior';
  
  const message = type === 'consultation'
    ? 'We have received your consultation request and our team will review it. We will contact you within 24 hours to discuss your project in detail.'
    : 'We have received your message and will get back to you within 24 hours.';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${title}</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>${message}</p>
          <p>We look forward to working with you!</p>
          <p>Best regards,<br/><strong>DSK Interior Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

