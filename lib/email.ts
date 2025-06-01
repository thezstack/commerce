import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create a transporter object
const createTransporter = async () => {
  // For production, use SMTP settings
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } 
  
  // For development/testing, create a new Ethereal account automatically
  // This makes testing easier as no configuration is needed
  try {
    // Generate a new Ethereal test account for each email
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created Ethereal test account:', testAccount.user);
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (err) {
    console.error('Failed to create test account:', err);
    
    // Fallback to environment variables if available
    if (process.env.ETHEREAL_EMAIL && process.env.ETHEREAL_PASSWORD) {
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: process.env.ETHEREAL_EMAIL,
          pass: process.env.ETHEREAL_PASSWORD,
        },
      });
    }
    
    // Last resort fallback
    throw new Error('Failed to create email transport');
  }
};

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    // Await the transporter creation since it's now async
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: 'SchoolKits <noreply@schoolkits.org>',
      to,
      subject,
      html,
    });
    
    console.log('Email sent:', info.messageId);
    
    // If using Ethereal in development, log the preview URL
    if (process.env.NODE_ENV !== 'production' && info.messageId) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function formatContactFormEmail(data: {
  fullName: string;
  email: string;
  school: string;
  message: string;
}) {
  return `
    <h1>New Contact Form Submission</h1>
    <p><strong>From:</strong> ${data.fullName} (${data.email})</p>
    ${data.school ? `<p><strong>School:</strong> ${data.school}</p>` : ''}
    <h2>Message:</h2>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><small>This email was sent from the SchoolKits contact form.</small></p>
  `;
}
