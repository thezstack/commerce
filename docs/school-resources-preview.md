# Resources for Schools & PTOs

The existing `/blog` becomes the resources hub for school and PTO/PTA leaders.
The former preview address `/resources` permanently redirects to `/blog`.
Existing article addresses remain `/blog/{handle}`. The homepage, desktop/mobile
navigation, footer, and sitemap all point to the consolidated hub.

The hub features four approved illustrated guides, a four-part planning checklist,
and links to the existing intro-call and quote pages. Seven earlier published
articles remain accessible under “More from SchoolKits” and at their existing
addresses. No older article was deleted, unpublished, or redirected.

## Approved launch collection

Osama approved consolidation and selected “Start with 4 priority articles.”
The following were created, checked as drafts, and published in the Shopify
`news` blog (ID 23877025856) on September 12, 2026 UTC / September 11 Central:

| Article                                                                  | Handle                                        | Shopify article ID |
| ------------------------------------------------------------------------ | --------------------------------------------- | ------------------ |
| How to Choose a School Supply Kit Company: A Houston PTO/PTA Checklist   | choose-school-supply-kit-company-houston      | 1009656168597      |
| Planning Next Year's School Supply Program: A Timeline for Texas Schools | texas-school-supply-program-planning-timeline | 1009656201365      |
| School Supply Kit Fundraising: Questions Every PTO Should Ask            | school-supply-kit-fundraising-pto-questions   | 1009656234133      |
| What Happens After a School Partners with SchoolKits?                    | how-schoolkits-school-partnership-works       | 1009656266901      |

The other 13 illustrated articles remain in reserve. Existing Shopify drafts were
left unchanged. All four launch articles include two relevant links to other launch
guides and an existing school conversation or quote destination.

Launch articles are recognized by their four exact handles in
`lib/school-resources.ts`. Future approved published articles can be included with
the exact `school-resources` tag (case-insensitive). Tags were cleared on the
four launch articles because the old live template links tags to unimplemented
category pages. This change renders future public topics as labels and hides
the internal selection tag.

The hub reads up to 250 published articles from Shopify and sorts newest first;
expand pagination if the blog exceeds that limit. It revalidates hourly using
the existing blog cache tag. Empty/error responses retain the checklist and
contact paths. Drafts are never included by the Storefront API.

## Images and social links

The four approved illustrations are stored permanently in Shopify and attached
as article featured images with descriptive alt text. They are illustrative,
not client-school photography or guaranteed kit configurations. The original
approved Markdown and images are retained in the SchoolKits marketing archive,
alongside launch payloads and Shopify readback records.

`media/school-resource-planning.png` reuses the approved provider-checklist
illustration for the homepage, hub hero, and hub sharing image. The hub explicitly
labels the kit illustrative. Next Image serves responsive optimized versions.

Article metadata now includes the existing canonical address, article-specific
Open Graph information and featured image, and Twitter sharing metadata. Missing
articles use the site's not-found page and noindex metadata instead of exposing
debug information. School-focused articles include partnership actions and a
clear return link to the hub.

## Measurement

Existing analytics records `school_resource_intro_click` and
`school_resource_quote_click`, with an event label for the hub or source article.
These are navigation clicks, not confirmed appointments or completed quote
requests. Forms, calendar booking, and commerce behavior are unchanged.

## Verification and release status

- Production build, TypeScript, changed-file Prettier, and diff checks pass.
- HTTP checks confirm the four cards render in the initial HTML, all eleven
  article addresses remain available, canonical/sharing metadata is present,
  the sitemap includes the articles, and the permanent redirect preserves query
  parameters. A local Suspense boundary around the mobile menu prevents its
  query-state hook from deferring the entire page to client rendering.
- Desktop and phone browser review confirmed the four guide cards, loaded images,
  the older-article disclosure, mobile navigation, canonical addresses, and
  article-to-hub navigation without horizontal overflow.
- The launch articles' titles, full bodies, summaries, publication status, and
  images were read back from Shopify. Shopify normalized apostrophe entities;
  normalized bodies match the approved payloads.
- Local verification uses isolated fixtures combining the seven existing public
  articles with the four exact Shopify readbacks. Shopify production credentials
  are not present in this checkout; real hosted preview verification is pending.
- Earlier resource-section checks covered 320, 390, 768, 1024, and 1440 px layouts,
  intro-click analytics, empty results, and simulated Shopify outages. This
  consolidation preserves the shared components and fallback behavior.
- The existing ESLint configuration cannot initialize because ESLint 8 and the
  Next 16 configuration produce a circular-JSON error, also recorded in
  `docs/homepage-preview.md`. Dependencies and lint configuration are unchanged.
- No real form submission or calendar appointment was made.
- Search Console was not signed in, so no traffic-based deletion decision was
  made. Earlier article bodies and URLs are preserved pending that review.

The four articles are published independently of this code release. The connected
GitHub account has read-only access to `thezstack/commerce`; changes are submitted
through the existing fork PR #20. Vercel requires a maintainer to authorize the
fork deployment. Keep the PR draft until the real hosted preview is checked.
Osama has already approved this scope; the remaining gate is maintainer access
and deployment verification. Merging to `main` deploys production.

Live readback confirmed all four direct article pages and their illustrations.
The current production blog index still serves the earlier cached collection;
release verification must confirm the four new articles on the new index and
refresh the blog cache if necessary. One early-read article also retained cached
tag links after Shopify tags were cleared; the new template removes those links.
Missing-article responses render the not-found page and noindex metadata; Next's
streamed browser response can retain HTTP 200. No legacy deletion relies on this
behavior.
