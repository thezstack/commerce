"use server"
import { sql } from '@vercel/postgres';

export async function submitContactForm(formData: FormData) {

    
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const school = formData.get('school') as string;
  const message = formData.get('message') as string;

  try {
    await sql`
      INSERT INTO contact_submissions (full_name, email, school, message)
      VALUES (${fullName}, ${email}, ${school}, ${message})
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to submit form:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}