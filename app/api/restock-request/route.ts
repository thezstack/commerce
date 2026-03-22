import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const RestockRequestSchema = z.object({
  productName: z.string().min(1),
  productHandle: z.string().min(1),
  schoolName: z.string().optional().default(''),
  variantTitle: z.string().optional().default(''),
  pagePath: z.string().optional().default('')
});

function getCoreApiBaseUrl(): string | null {
  const url = process.env.CORE_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = RestockRequestSchema.parse(body);

    const coreApiBaseUrl = getCoreApiBaseUrl();
    if (!coreApiBaseUrl) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    const coreResponse = await fetch(`${coreApiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: 'Parent restock request',
        email: 'restock-request@schoolkits.org',
        school: validated.schoolName,
        message: [
          'Type: Restock request',
          `Product: ${validated.productName}`,
          `Product handle: ${validated.productHandle}`,
          validated.variantTitle ? `Variant: ${validated.variantTitle}` : null,
          validated.pagePath ? `Page: ${validated.pagePath}` : null
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

    console.error('Restock request submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit request. Please try again later.' },
      { status: 500 }
    );
  }
}
