'use client';

type UploadedFile = { fileName: string; fileSize: number; mimeType: string; url: string };
const attempts = new WeakMap<File, { key: string; result?: UploadedFile }>();

export async function uploadCommerceFile(file: File): Promise<UploadedFile> {
  const attempt = attempts.get(file) || { key: crypto.randomUUID() };
  attempts.set(file, attempt);
  if (attempt.result) return attempt.result;
  const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
  const checksum = btoa(
    Array.from(new Uint8Array(digest), (value) => String.fromCharCode(value)).join('')
  );
  const headers = { 'Content-Type': 'application/json', 'Idempotency-Key': attempt.key };
  const response = await fetch('/api/quote-supply-list-upload', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      checksum
    })
  });
  const grant = await response.json();
  if (!response.ok || !grant.success)
    throw new Error(grant.error || 'Could not upload the supply list.');
  if (grant.alreadyUploaded) {
    attempt.result = grant;
    return grant;
  }
  const sent = await fetch(grant.uploadUrl, {
    method: 'PUT',
    headers: grant.headers,
    body: file,
    credentials: 'omit',
    redirect: 'error'
  });
  // A lost response can leave an already-uploaded immutable object. Completion verifies it.
  if (!sent.ok && sent.status !== 412) throw new Error('Could not upload the supply list.');
  const completed = await fetch('/api/quote-supply-list-upload/complete', {
    method: 'POST',
    headers,
    body: JSON.stringify({ uploadId: grant.uploadId })
  });
  const result = await completed.json();
  if (!completed.ok || !result.success)
    throw new Error(result.error || 'Could not verify the supply list.');
  attempt.result = result;
  return result;
}
