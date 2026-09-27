import { z } from 'zod';
import {
  commerceError,
  commerceMutation,
  readCommerceBody,
  CommerceRequestError
} from 'lib/commerce-api';

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((value) => !/[\r\n]/.test(value)),
  email: z.string().email().max(255),
  school: z.string().max(255).default(''),
  message: z.string().min(1).max(40000),
  recaptchaToken: z.string().min(1).max(10000)
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await readCommerceBody(request));
    if (!parsed.success)
      throw new CommerceRequestError(400, 'Please check your form and try again.');
    const { recaptchaToken, ...data } = parsed.data;
    if (process.env.NODE_ENV === 'production') {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      if (!secret) throw new Error('RECAPTCHA_NOT_CONFIGURED');
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        signal: AbortSignal.timeout(10000),
        body: new URLSearchParams({ secret, response: recaptchaToken })
      });
      const verification = await response.json();
      if (
        !response.ok ||
        !verification.success ||
        verification.score < 0.3 ||
        !Number.isFinite(verification.score)
      ) {
        throw new CommerceRequestError(400, 'reCAPTCHA verification failed. Please try again.');
      }
    }
    return Response.json(await commerceMutation(request, '/inquiries', data));
  } catch (error) {
    return commerceError(error);
  }
}
