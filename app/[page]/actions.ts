"use server"

// Import the Prisma client
import { prisma } from '../../lib/prisma';

// Import zod for input validation
import { z } from 'zod';

// Define a schema for contact form validation
const ContactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  school: z.string().optional(),
  message: z.string().min(5, { message: "Message must be at least 5 characters long" }),
  recaptchaToken: z.string().min(1, { message: "reCAPTCHA verification failed" })
});

// Interface for reCAPTCHA v3 response
interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json() as RecaptchaResponse;

    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function submitContactForm(formData: FormData) {
  console.log('Form submission started');
  
  // Extract form data
  const rawData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    school: formData.get('school') as string || '', // Handle empty school field
    message: formData.get('message') as string,
    recaptchaToken: formData.get('recaptchaToken') as string
  };

  console.log('Form data extracted:', { 
    fullName: rawData.fullName, 
    email: rawData.email, 
    school: rawData.school || '[empty]', 
    messageLength: rawData.message?.length,
    hasRecaptchaToken: !!rawData.recaptchaToken
  });

  try {
    // Check if we're in a browser environment (this should never happen with server actions)
    if (typeof window !== 'undefined') {
      throw new Error('This function must be executed on the server');
    }
    
    // Validate input data
    const validatedData = ContactFormSchema.parse(rawData);
    
    // Verify reCAPTCHA token (only in production)
    let isRecaptchaValid = true;
    if (process.env.NODE_ENV === 'production') {
      isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken);
      if (!isRecaptchaValid) {
        return { 
          success: false, 
          error: 'reCAPTCHA verification failed. Please try again.'
        };
      }
    } else {
      console.log('Skipping reCAPTCHA verification in development');
    }
    
    // Insert the form data using Prisma
    console.log('Attempting to insert data into contact_submissions table...');
    
    // Make sure prisma is defined
    if (!prisma) {
      throw new Error('Database client is not initialized');
    }
    
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
    console.log('Inserted data:', result);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to submit form:', error);
    
    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Invalid form data', 
        validationErrors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    
    // Check for Prisma-specific errors
    if (error instanceof Error && error.message.includes('PrismaClient')) {
      return {
        success: false,
        error: 'Database connection error. Please try again later.'
      };
    }
    
    // Return a simplified error message for other errors
    return { 
      success: false, 
      error: 'Failed to submit form. Please try again later.'
    };
  }
}