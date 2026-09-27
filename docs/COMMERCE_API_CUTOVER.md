# Commerce API configuration

The storefront uses a server-side Commerce API for school discovery, QR landing data, inquiry submission, and quote upload permissions. The browser calls same-origin routes and never receives the service credential.

Required server-only variables:

- `COMMERCE_API_URL`: HTTPS service origin.
- `COMMERCE_STOREFRONT_TOKEN`: service credential, at least 32 characters.
- `COMMERCE_REQUEST_SECRET`: stable random identity secret, at least 32 characters.
- `COMMERCE_PREVIEW_BYPASS_TOKEN`: optional deployment-protection credential, used only when `VERCEL_ENV=preview`.

Keep existing Shopify and reCAPTCHA settings. Never prefix service credentials with `NEXT_PUBLIC_`.

Quote files upload directly to private Vercel Blob through short-lived, object-scoped permissions. The API verifies size, checksum, and content before completion. The 10 MiB limit remains; file bytes do not pass through storefront functions.

Use isolated API, database, and storage configuration for preview. Validate school and QR reads, all inquiry forms, file completion, retries, and downloads before switching production. Keep the previous deployment available for rollback and preserve inquiry and notification ledgers.

Run `pnpm exec next typegen`, `pnpm exec tsc --noEmit`, and `pnpm test:commerce`. The dedicated boundary checks do not replace the existing lint suite, whose legacy ESLint configuration requires a separate upgrade.

Deployment records and internal infrastructure details belong in private operational documentation.
