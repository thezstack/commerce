# Next.js 16 Upgrade Notes

This document summarizes the changes applied to align this repo with Next.js 16.1.1 guidance and to enable the React Compiler.

## Summary of changes

- Updated `package.json` to target `next@^16.1.1`, `eslint-config-next@^16.1.1`, and `@next/third-parties@^16.1.1`.
- Kept `reactCompiler: true` enabled in `next.config.js` and removed the deprecated `eslint` config block.
- Switched linting to the ESLint CLI (`"lint": "eslint ."`).
- Migrated async request APIs:
  - `cookies()` and `headers()` are now awaited before use.
  - `params` and `searchParams` are now treated as promises and awaited in pages, metadata, and Open Graph routes.

## Files touched

- `components/cart/actions.ts`, `components/cart/index.tsx`
- `app/api/cart/notes/route.ts`
- `lib/shopify/index.ts`
- `app/[page]/page.tsx`, `app/[page]/opengraph-image.tsx`
- `app/q/[school]/page.tsx`
- `app/search/page.tsx`, `app/search/[collection]/page.tsx`, `app/search/[collection]/opengraph-image.tsx`
- `app/collection/page.tsx`, `app/collection/layout.tsx`, `app/collection/[collection]/page.tsx`, `app/collection/[collection]/opengraph-image.tsx`
- `app/product/[handle]/page.tsx`
- `app/blog/[...slug]/page.tsx`
- `next.config.js`, `package.json`

## Follow-up actions

1. Install the React Compiler plugin:
   - `pnpm add -D babel-plugin-react-compiler`
2. Install updated dependencies:
   - `pnpm install`
3. Run lint with the new script:
   - `pnpm lint`
