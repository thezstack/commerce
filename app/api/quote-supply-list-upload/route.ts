import { z } from 'zod';
import {
  commerceError,
  commerceMutation,
  readCommerceBody,
  CommerceRequestError
} from 'lib/commerce-api';

export const runtime = 'nodejs';
const schema = z
  .object({
    fileName: z.string().min(1).max(255),
    mimeType: z.string().max(255),
    fileSize: z.number().int().min(1).max(10485760),
    checksum: z.string().max(100)
  })
  .strict();
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await readCommerceBody(request));
    if (!parsed.success)
      throw new CommerceRequestError(400, 'Upload a supported file smaller than 10 MB.');
    return Response.json(await commerceMutation(request, '/uploads', parsed.data));
  } catch (error) {
    return commerceError(error);
  }
}
