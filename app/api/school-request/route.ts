import { NextRequest, NextResponse } from 'next/server';
import { commerceError, commerceMutation, readCommerceBody } from 'lib/commerce-api';
import { z } from 'zod';

const optionalTrimmedString = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : ''),
  z.string()
);

const SchoolRequestSchema = z
  .object({
    schoolName: optionalTrimmedString.transform((value) => value || 'Unknown school request'),
    schoolSlug: optionalTrimmedString.optional().default(''),
    persona: z.enum(['parent', 'school_admin']),
    context: z.enum(['kits_unavailable', 'school_not_found']).catch('school_not_found'),
    contactName: optionalTrimmedString.pipe(z.string().min(1).max(120)),
    contactEmail: z
      .union([optionalTrimmedString.pipe(z.string().email()), z.literal('')])
      .optional()
      .default(''),
    contactMessage: optionalTrimmedString.pipe(z.string().max(1000)).optional().default('')
  })
  .superRefine((data, context) => {
    if (!data.contactEmail) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Contact email is required.',
        path: ['contactEmail']
      });
    }
  });

export async function POST(request: NextRequest) {
  try {
    const body = await readCommerceBody(request);
    const validated = SchoolRequestSchema.parse(body);

    const personaLabel = validated.persona === 'parent' ? 'Parent' : 'Teacher/Admin';
    const contextLabel =
      validated.context === 'kits_unavailable'
        ? 'Kits unavailable on school page'
        : 'School not found in search';
    const fullName = validated.contactName;
    const email = validated.contactEmail;

    const result = await commerceMutation(request, '/inquiries', {
      fullName,
      email,
      school: validated.schoolName,
      message: [
        `Type: School request`,
        `Persona: ${personaLabel}`,
        `Context: ${contextLabel}`,
        validated.schoolSlug ? `School slug: ${validated.schoolSlug}` : null,
        validated.contactMessage ? `Contact note: ${validated.contactMessage}` : null
      ]
        .filter(Boolean)
        .join('\n')
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name and email, then try again.' },
        { status: 400 }
      );
    }

    return commerceError(error);
  }
}
