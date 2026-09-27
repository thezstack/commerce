import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { commerceMutation, commerceRead, readCommerceBody } from '../lib/commerce-api';
import { POST as contact } from '../app/api/contact/route';
import { POST as school } from '../app/api/school-request/route';
import { POST as restock } from '../app/api/restock-request/route';
import { POST as upload } from '../app/api/quote-supply-list-upload/route';
import { POST as complete } from '../app/api/quote-supply-list-upload/complete/route';
import { NextRequest } from 'next/server';

const env = {
  COMMERCE_API_URL: 'https://commerce-api.example.com',
  COMMERCE_STOREFRONT_TOKEN: 'test-token-at-least-32-characters-long',
  COMMERCE_REQUEST_SECRET: 'test-identity-at-least-32-characters',
  CORE_API_URL: 'https://forbidden-core.example.com',
  NODE_ENV: 'test'
};
Object.assign(process.env, env);
delete process.env.VERCEL;
test('deployment protection credential is sent only from preview, for reads and writes', async () => {
  const original = globalThis.fetch;
  const previousEnvironment = process.env.VERCEL_ENV;
  const previousBypass = process.env.COMMERCE_PREVIEW_BYPASS_TOKEN;
  const headers: Headers[] = [];
  globalThis.fetch = async (_url, init) => {
    headers.push(new Headers(init?.headers));
    return Response.json({ success: true });
  };
  try {
    process.env.COMMERCE_PREVIEW_BYPASS_TOKEN = 'test-preview-only';
    for (const environment of ['preview', 'production']) {
      process.env.VERCEL_ENV = environment;
      await commerceRead('/schools/index', 0);
      await commerceMutation(req({}), '/uploads', {});
    }
    assert.deepEqual(
      headers.map((h) => h.get('x-vercel-protection-bypass')),
      ['test-preview-only', 'test-preview-only', null, null]
    );
    assert.ok(
      headers.every((h) => h.get('authorization') === `Bearer ${env.COMMERCE_STOREFRONT_TOKEN}`)
    );
  } finally {
    globalThis.fetch = original;
    if (previousEnvironment === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previousEnvironment;
    if (previousBypass === undefined) delete process.env.COMMERCE_PREVIEW_BYPASS_TOKEN;
    else process.env.COMMERCE_PREVIEW_BYPASS_TOKEN = previousBypass;
  }
});
const key = randomUUID();
const req = (body: unknown, origin = 'https://commerce.example.com', requestKey: string = key) =>
  new NextRequest('https://commerce.example.com/api/contact', {
    method: 'POST',
    headers: {
      origin,
      'content-type': 'application/json',
      'idempotency-key': requestKey,
      'x-commerce-owner': randomUUID(),
      'x-commerce-client': 'spoofed'
    },
    body: JSON.stringify(body)
  });

test('all four inquiry flows call Commerce with server-owned credentials and no Core fallback', async () => {
  const original = globalThis.fetch;
  const calls: { url: string; headers: Headers; body: any }[] = [];
  globalThis.fetch = async (url, init) => {
    calls.push({
      url: String(url),
      headers: new Headers(init?.headers),
      body: JSON.parse(String(init?.body))
    });
    return Response.json({ success: true, notificationStatus: 'accepted' });
  };
  try {
    const common = {
      fullName: 'Fixture',
      email: 'fixture@example.com',
      school: 'Fixture school',
      message: 'Hello',
      recaptchaToken: 'fixture-token'
    };
    assert.equal((await contact(req(common))).status, 200);
    assert.equal(
      (await contact(req({ ...common, message: 'Quote request landing page' }))).status,
      200
    );
    assert.equal(
      (
        await school(
          req({
            schoolName: 'Fixture school',
            persona: 'parent',
            context: 'school_not_found',
            contactName: 'Fixture',
            contactEmail: 'fixture@example.com'
          })
        )
      ).status,
      200
    );
    assert.equal(
      (await restock(req({ productName: 'Pencils', productHandle: 'pencils' }))).status,
      200
    );
    assert.equal(calls.length, 4);
    for (const call of calls) {
      assert.equal(call.url, 'https://commerce-api.example.com/api/commerce/inquiries');
      assert.equal(call.headers.get('authorization'), 'Bearer ' + env.COMMERCE_STOREFRONT_TOKEN);
      assert.equal(call.headers.get('idempotency-key'), key);
      assert.match(call.headers.get('x-commerce-client')!, /^[a-f0-9]{64}$/);
      assert.equal(call.body.recaptchaToken, undefined);
    }
    assert.match(calls[2]!.body.message, /Type: School request/);
    assert.match(calls[3]!.body.message, /Type: Restock request/);
  } finally {
    globalThis.fetch = original;
  }
});
test('anonymous ownership survives retries and changes with the request capability', async () => {
  const original = globalThis.fetch;
  const owners: string[] = [];
  globalThis.fetch = async (_url, init) => {
    owners.push(new Headers(init?.headers).get('x-commerce-owner')!);
    return Response.json({ success: true });
  };
  try {
    await commerceMutation(req({}), '/uploads', {});
    await commerceMutation(req({}), '/uploads/fixture/complete', {});
    await commerceMutation(req({}, 'https://commerce.example.com', randomUUID()), '/uploads', {});
    assert.equal(owners[0], owners[1]);
    assert.notEqual(owners[0], owners[2]);
  } finally {
    globalThis.fetch = original;
  }
});
test('cross-origin requests, invalid identities and oversized bodies are rejected', async () => {
  await assert.rejects(readCommerceBody(req({}, 'https://attacker.example.com')));
  await assert.rejects(readCommerceBody(req({ message: 'x'.repeat(66000) })));
  await assert.rejects(
    commerceMutation(req({}, 'https://commerce.example.com', 'bad'), '/inquiries', {})
  );
});
test('quote file metadata and completion go to Commerce without proxying file contents', async () => {
  const original = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return Response.json({ success: true });
  };
  try {
    assert.equal(
      (
        await upload(
          req({
            fileName: 'list.pdf',
            mimeType: 'application/pdf',
            fileSize: 10 * 1024 * 1024,
            checksum: 'abc'
          })
        )
      ).status,
      200
    );
    const id = randomUUID();
    assert.equal((await complete(req({ uploadId: id }))).status, 200);
    assert.deepEqual(urls, [
      'https://commerce-api.example.com/api/commerce/uploads',
      `https://commerce-api.example.com/api/commerce/uploads/${id}/complete`
    ]);
  } finally {
    globalThis.fetch = original;
  }
});
