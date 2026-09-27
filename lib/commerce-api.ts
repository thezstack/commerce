import 'server-only';
import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';

export class CommerceRequestError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export function commerceConfig() {
  const base = process.env.COMMERCE_API_URL;
  const token = process.env.COMMERCE_STOREFRONT_TOKEN;
  if (!base || !token || token.length < 32) throw new Error('COMMERCE_NOT_CONFIGURED');
  const url = new URL(base);
  if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production')
    throw new Error('COMMERCE_URL_INVALID');
  return { base: url.origin, token };
}

export async function commerceRead(path: string, revalidate: number) {
  const { base, token } = commerceConfig();
  return fetch(`${base}/api/commerce${path}`, {
    headers: commerceHeaders(token),
    next: { revalidate },
    redirect: 'error',
    signal: AbortSignal.timeout(12000)
  });
}

function commerceHeaders(token: string): Record<string, string> {
  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
  // A protected API preview still requires its separate application credential.
  if (process.env.VERCEL_ENV === 'preview' && process.env.COMMERCE_PREVIEW_BYPASS_TOKEN) {
    headers['x-vercel-protection-bypass'] = process.env.COMMERCE_PREVIEW_BYPASS_TOKEN;
  }
  return headers;
}

export async function readCommerceBody(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    throw new CommerceRequestError(403, 'Please submit this form from our website.');
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    throw new CommerceRequestError(415, 'Invalid request.');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new CommerceRequestError(400, 'Invalid request.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 65536) {
      await reader.cancel();
      throw new CommerceRequestError(413, 'Request is too large.');
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    throw new CommerceRequestError(400, 'Invalid request.');
  }
}

export async function commerceMutation(request: Request, path: string, data: unknown) {
  const { base, token } = commerceConfig();
  const key = request.headers.get('idempotency-key') || '';
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(key)) {
    throw new CommerceRequestError(400, 'Please reload the page and try again.');
  }
  const secret = process.env.COMMERCE_REQUEST_SECRET;
  if (!secret || secret.length < 32) throw new Error('COMMERCE_IDENTITY_NOT_CONFIGURED');
  // Anonymous upload ownership is a random per-request capability, never an account ID.
  // Derivation survives a lost first response; browser-provided owner/IP headers are ignored.
  const mac = (value: string) => createHmac('sha256', secret).update(value).digest('hex');
  const h = mac(`owner:${key.toLowerCase()}`);
  const owner = `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(
    17,
    20
  )}-${h.slice(20, 32)}`;
  const ip = process.env.VERCEL ? request.headers.get('x-forwarded-for')?.trim() : '127.0.0.1';
  if (!ip || !isIP(ip)) throw new Error('TRUSTED_CLIENT_IP_MISSING');
  const response = await fetch(`${base}/api/commerce${path}`, {
    method: 'POST',
    redirect: 'error',
    cache: 'no-store',
    signal: AbortSignal.timeout(45000),
    headers: {
      ...commerceHeaders(token),
      'Content-Type': 'application/json',
      'Idempotency-Key': key,
      'X-Commerce-Owner': owner,
      'X-Commerce-Client': mac(`ip:${ip}`)
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    console.error(
      JSON.stringify({
        event: 'commerce.upstream_failed',
        status: response.status,
        requestId: result.requestId
      })
    );
    throw new CommerceRequestError(
      response.status === 429 ? 429 : 502,
      response.status === 429
        ? 'Too many requests. Please try again later.'
        : 'Could not submit your request. Please try again.'
    );
  }
  return result;
}

export function commerceError(error: unknown) {
  if (error instanceof CommerceRequestError)
    return Response.json({ success: false, error: error.message }, { status: error.status });
  console.error(JSON.stringify({ event: 'commerce.request_failed' }));
  return Response.json(
    { success: false, error: 'Could not submit your request. Please try again.' },
    { status: 503 }
  );
}
