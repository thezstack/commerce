import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';

// Define a schema for contact form validation
const ContactFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  school: z.string().optional().default(''),
  message: z.string().min(1, { message: "Message is required" }),
  recaptchaToken: z.string().min(1, { message: "reCAPTCHA verification failed" })
});

// Interface for reCAPTCHA v3 response
interface RecaptchaResponse {
  success: boolean;
  score: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  console.log('Verifying reCAPTCHA token...');
  
  // Skip verification in development for testing
  if (process.env.NODE_ENV !== 'production') {
    console.log('Development environment detected, bypassing strict reCAPTCHA verification');
    return true;
  }
  
  try {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      console.error('reCAPTCHA secret key is not defined');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const data: RecaptchaResponse = await response.json();
    console.log('reCAPTCHA verification response:', data);

    // In production, we would typically require a higher score
    const minimumScore = 0.3; // Lower threshold for testing
    
    if (data.success && data.score && data.score >= minimumScore) {
      console.log(`reCAPTCHA verification successful with score: ${data.score}`);
      return true;
    } else {
      console.log(`reCAPTCHA verification failed with score: ${data.score}`);
      return false;
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  console.log('Contact form API endpoint called');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Form data received:', {
      fullName: body.fullName,
      email: body.email,
      school: body.school || '[empty]',
      messageLength: body.message?.length,
      hasRecaptchaToken: !!body.recaptchaToken
    });
    
    // Validate the input data
    const validatedData = ContactFormSchema.parse(body);
    
    // Verify reCAPTCHA token
    let isRecaptchaValid = true;
    if (process.env.NODE_ENV === 'production') {
      isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } else {
      console.log('Skipping reCAPTCHA verification in development');
    }
    
    // Insert the form data using Prisma
    console.log('Attempting to insert data into contact_submissions table...');
    
    const result = await prisma.contact_submissions.create({
      data: {
        full_name: validatedData.fullName,
        email: validatedData.email,
        school: validatedData.school,
        message: validatedData.message
      },
      select: {
        id: true,
        full_name: true,
        email: true
      }
    });
    
    console.log('Form submission successful! Inserted with ID:', result.id);
    
    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@schoolkits.org';
    // const emailHtml = formatContactFormEmail({
    //   fullName: validatedData.fullName,
    //   email: validatedData.email,
    //   school: validatedData.school,
    //   message: validatedData.message
    // });
    
    // try {
    //   await sendEmail({
    //     to: adminEmail,
    //     subject: `New Contact Form Submission from ${validatedData.fullName}`,
    //     html: emailHtml
    //   });
    //   console.log(`Email notification sent to ${adminEmail}`);
    // } catch (emailError) {
    //   console.error('Failed to send email notification:', emailError);
    //   // Continue even if email fails - we don't want to block the form submission
    // }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to submit form:', error);
    
    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid form data', 
        validationErrors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }
    
    // Check for Prisma-specific errors
    if (error instanceof Error && error.message.includes('PrismaClient')) {
      return NextResponse.json({
        success: false,
        error: 'Database connection error. Please try again later.'
      }, { status: 500 });
    }
    
    // Return a simplified error message for other errors
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit form. Please try again later.'
    }, { status: 500 });
  }
}
