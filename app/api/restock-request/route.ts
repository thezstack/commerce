import { NextRequest, NextResponse } from 'next/server';
import { commerceError, commerceMutation, readCommerceBody } from 'lib/commerce-api';
import { z } from 'zod';

const RestockRequestSchema = z.object({
  productName: z.string().min(1),
  productHandle: z.string().min(1),
  schoolName: z.string().optional().default(''),
  variantTitle: z.string().optional().default(''),
  pagePath: z.string().optional().default('')
});

export async function POST(request: NextRequest) {
  try {
    const body = await readCommerceBody(request);
    const validated = RestockRequestSchema.parse(body);

    const result = await commerceMutation(request, '/inquiries', {
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
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
    }

    return commerceError(error);
  }
}
