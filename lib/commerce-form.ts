'use client';

// Keep the same request ID on network retries, without retaining form data in storage.
const attempts = new Map<string, string>();
export async function submitCommerceForm(path: string, body: Record<string, unknown>) {
  const { recaptchaToken: _captcha, ...content } = body;
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(content))
  );
  const fingerprint =
    path +
    ':' +
    Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  const key = attempts.get(fingerprint) || crypto.randomUUID();
  attempts.set(fingerprint, key);
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': key
    },
    body: JSON.stringify(body)
  });
  const result = await response.json();
  if (response.ok && result.success) attempts.delete(fingerprint);
  return result;
}
