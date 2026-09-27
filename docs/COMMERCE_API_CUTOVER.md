# Commerce service separation — ENG-28

Implementation branch, not a verified production cutover. [Commerce API rollout guide](https://github.com/thezstack/schoolkits-commerce-api/blob/agent/commerce-core-separation/docs/COMMERCE_BOUNDARY.md) defines schema, credentials, storage and rollback gates.

School search/index/detail, QR landing data, contact/quote/school/restock inquiries, and quote upload grants/completion now call Commerce API. There is no Core fallback. The browser uses same-origin routes; the service bearer stays server-only. Direct database/SMTP packages and the unused mail helper are removed.

Required server variables: `COMMERCE_API_URL`, `COMMERCE_STOREFRONT_TOKEN` and a stable random `COMMERCE_REQUEST_SECRET` of at least 32 characters. Existing Shopify and reCAPTCHA configuration stays in Commerce. Never use NEXT_PUBLIC for service secrets.

Forms use random request capabilities retained across failed attempts in the page. The server derives owner identity and a hashed client-IP rate-limit key; client-supplied identity headers are ignored. Same-origin JSON is required. On Vercel, X-Forwarded-For must be the platform-provided IP; any future proxy requires rechecking this trust boundary. These are anonymous inquiry capabilities, not customer accounts or teacher permissions.

Quote files upload directly to private S3 with signed size/type/checksum and create-only permissions. The completion route verifies the file before returning an expiring download link. The 10 MiB UI limit remains. Files never pass through a Vercel function body. Keep the same upload request capability on grant/complete retries.

## Deployment gates

1. Deploy and validate the API/Notifications changes first, using separate preview credentials and nonproduction database/storage.
2. Set the three Commerce variables for this branch's protected preview. Run `pnpm exec next typegen`, `pnpm exec tsc --noEmit`, and `pnpm test:commerce`. Verify all four forms, school lookup and QR pages in a browser, including file retry/download.
3. Confirm live baseline remains main commit `3775ee0218392b7ba1d71e88138e32c52822bc8a`; rollback deployment recorded 2026-09-27: `dpl_HhnfCPwcHke72xJJBD67pV37Kjqc` on project `skstorefront`. Re-read immediately before cutover.
4. At production cutover remove legacy `CORE_API_URL`, database/Render/Postgres variables, SMTP variables, and `ADMIN_EMAIL` from the new Commerce deployment configuration after verifying no remaining caller. Do not rotate shared database/SMTP passwords as part of this removal. Existing historical deployments remain part of the credential-retirement audit.
5. Deploy Commerce, verify school/QR reads and approved labeled submissions, and record delivery/contact evidence. Roll back to the recorded deployment if a gate fails. Core stays available until remaining callers and historical emailed download links have migrated.

The existing general lint job is already incompatible: ESLint 8.57 with eslint-config-next 16 fails while loading its config. The separate Commerce boundary CI runs Node 22, type generation/typechecking and the service contract tests; it does not claim the legacy lint suite passes.

Shared architecture: School-Kits-Docs `schoolkits/dev-docs/workspace/SERVICE_ESTATE.md`. Tracking: [ENG-28](https://schoolkits-projects.tailb37d72.ts.net/school-kits/browse/ENG-28/).
