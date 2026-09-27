import { z } from 'zod';
import {
  commerceError,
  commerceMutation,
  readCommerceBody,
  CommerceRequestError
} from 'lib/commerce-api';

export async function POST(request: Request) {
  try {
    const parsed = z
      .object({ uploadId: z.string().uuid() })
      .strict()
      .safeParse(await readCommerceBody(request));
    if (!parsed.success) throw new CommerceRequestError(400, 'Invalid upload.');
    return Response.json(
      await commerceMutation(request, `/uploads/${parsed.data.uploadId}/complete`, {})
    );
  } catch (error) {
    return commerceError(error);
  }
}
