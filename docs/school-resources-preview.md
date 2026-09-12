# Resources for Schools & PTOs

The new `/resources` page helps school and PTO/PTA leaders explore a supply
program and start a partnership conversation. It includes published school-focused
blog articles, a four-part planning checklist, and links to the existing intro
call and quote-request pages.

The homepage has an illustrated resources section. Desktop and mobile navigation,
the footer, the blog index, and the sitemap make the page discoverable. Relevant
blog articles include a return link and the same partnership actions. The homepage
remains statically rendered.

## Content selection

The page reads published articles from the Shopify `news` blog. Two existing
articles are included by handle in `lib/school-resources.ts`:

- `why-more-schools-are-turning-to-pre-packaged-supply-kits`
- `how-schools-in-our-program-turn-supplies-into-extra-resources-for-students`

To include a future approved article, publish it in `news` with the exact tag
`school-resources` (matching is case-insensitive). Its title, excerpt, and featured
image come from Shopify. The same tag enables the partnership CTA on the article.
The resource page reads up to 250 articles and sorts selected posts newest first;
expand the fetching strategy if the blog grows beyond that limit. The page
revalidates hourly and uses the existing blog cache tag.

The 17 previously prepared blog drafts remain unpublished. This change does not
write Shopify records. If no articles are returned, the page shows a short notice
and retains the planning checklist and contact links.

## Illustration

`media/school-resource-planning.png` reuses the generated illustration prepared for
“How to Choose a School Supply Kit Company: A Houston PTO/PTA Checklist” in the
2026-09-11 illustrated blog review. It depicts an illustrative kit and checklist,
not a customer school or a guaranteed kit configuration. The resource page
includes an explanatory caption. Next Image serves responsive optimized versions;
the source image is also used in the resource page’s social sharing metadata.

## Measurement

The existing analytics helper records `school_resource_intro_click` and
`school_resource_quote_click`, with an event label identifying the resource hub
or source article. These are navigation clicks, not confirmed appointments or
submitted quote requests. The destination forms and booking workflow are unchanged.

## Validation and release

- Production build and TypeScript pass.
- Changed source files pass Prettier and `git diff --check`.
- Browser checks cover widths 320, 390, 768, 1024, and 1440; mobile menu navigation;
  article selection; images; anchors; intro-call navigation and its analytics event;
  homepage and blog entry points; and absence of horizontal overflow or browser
  JavaScript errors.
- Empty results and simulated Shopify errors retain the checklist and contact
  paths. Future tagged articles are recognized and unrelated articles excluded.
- The local build and browser review use isolated Shopify fixtures captured from
  the seven public articles on schoolkits.org. No production credentials were
  available in this checkout. A deployment using the real preview environment
  still needs verification before release.
- The existing ESLint configuration cannot initialize because ESLint 8 and the
  Next 16 configuration produce a circular-JSON error. This was also recorded in
  `docs/homepage-preview.md`; dependencies and lint configuration are unchanged.
- No real form submission or calendar appointment was made during validation.

Merging to `main` deploys production. Obtain approval of the preview before merge,
then verify the real Shopify articles, resource navigation, images, and CTA
destinations on the deployment. Keep preview protection enabled.
