"use server"
import { createPool } from '@vercel/postgres';

// Create a database pool that explicitly references the POSTGRES_URL environment variable
const db = createPool({
  connectionString: process.env.POSTGRES_URL,
});

// Export the sql template tag for use in queries
const sql = db.sql;

export async function submitContactForm(formData: FormData) {
  // Validate database connection first
  try {
    // Test the connection with a simple query
    const connectionTest = await sql`SELECT 1 AS connection_test`;
    console.log('Database connection successful:', connectionTest);
  } catch (connectionError) {
    console.error('Database connection error:', connectionError);
    return { 
      success: false, 
      error: 'Database connection failed', 
      details: connectionError instanceof Error ? 
        connectionError.message : 
        `Connection error: ${String(connectionError)}. Check your POSTGRES_URL environment variable.`
    };
  }
    
  // Extract form data
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const school = formData.get('school') as string;
  const message = formData.get('message') as string;

  try {
    console.log('Attempting to insert form data:', { fullName, email, school });
    
    // Insert the form data
    const result = await sql`
      INSERT INTO contact_submissions (full_name, email, school, message)
      VALUES (${fullName}, ${email}, ${school}, ${message})
      RETURNING id
    `;
    
    console.log('Form submission successful, inserted with ID:', result.rows[0]?.id);
    return { success: true };
  } catch (error) {
    console.error('Failed to submit form:', error);
    // Return more detailed error information
    return { 
      success: false, 
      error: 'Failed to submit form', 
      details: error instanceof Error ? 
        error.message : 
        `Error: ${String(error)}. This might be due to a database configuration issue.`
    };
  }
}