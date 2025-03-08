// src/utils/emailService.js
import nodemailer from 'nodemailer';

// Create reusable transporter with OVH email credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ovh.net',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@yalors.tn',
    pass: '8Y3iXTaGsUgVZeY',
  },
});

/**
 * Send a contact form email notification
 * @param {Object} data - Form data (name, email, message, etc.)
 * @returns {Promise} - Result of the email sending operation
 */
export async function sendContactEmail(data) {
  // Format the email content with HTML
  let emailContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #4a5568; color: white; padding: 15px; text-align: center; }
      .content { padding: 20px; border: 1px solid #e2e8f0; }
      .field { margin-bottom: 10px; }
      .label { font-weight: bold; }
      .footer { font-size: 12px; text-align: center; margin-top: 20px; color: #718096; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Contact Form Submission</h2>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">From:</span> ${data.name} (${data.email})
        </div>
        
        ${data.company ? `
        <div class="field">
          <span class="label">Company:</span> ${data.company}
        </div>
        ` : ''}
        
        ${data.service ? `
        <div class="field">
          <span class="label">Service Interested In:</span> ${data.service}
        </div>
        ` : ''}
        
        <div class="field">
          <span class="label">Message:</span>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div class="field">
          <span class="label">Source:</span> ${data.source || 'Website Form'}
        </div>
        
        <div class="field">
          <span class="label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
      </div>
      <div class="footer">
        <p>This is an automated message from the Yalors website contact form.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  // Mail options
  const mailOptions = {
    from: '"Yalors Website" <contact@yalors.tn>',
    to: 'contact@yalors.tn',
    subject: `New Contact from ${data.name} - ${data.source || 'Website'}`,
    html: emailContent,
    replyTo: data.email,
  };

  try {
    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Verifies connection to the email server
 * Useful for testing email setup during development
 */
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email server connection verified.');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}