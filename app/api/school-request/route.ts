import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const SchoolRequestSchema = z.object({
  schoolName: z.string().min(1),
  schoolSlug: z.string().optional().default(''),
  persona: z.enum(['parent', 'school_admin']),
  context: z.enum(['kits_unavailable', 'school_not_found'])
});

function getCoreApiBaseUrl(): string | null {
  const url = process.env.CORE_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = SchoolRequestSchema.parse(body);

    const coreApiBaseUrl = getCoreApiBaseUrl();
    if (!coreApiBaseUrl) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    const personaLabel = validated.persona === 'parent' ? 'Parent' : 'Teacher/Admin';
    const contextLabel =
      validated.context === 'kits_unavailable' ? 'Kits unavailable on school page' : 'School not found in search';

    const coreResponse = await fetch(`${coreApiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: `${personaLabel} school request`,
        email: 'school-request@schoolkits.org',
        school: validated.schoolName,
        message: [
          `Type: School request`,
          `Persona: ${personaLabel}`,
          `Context: ${contextLabel}`,
          validated.schoolSlug ? `School slug: ${validated.schoolSlug}` : null
        ]
          .filter(Boolean)
          .join('\n')
      })
    });

    if (!coreResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to submit request. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
    }

    console.error('School request submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit request. Please try again later.' },
      { status: 500 }
    );
  }
}
