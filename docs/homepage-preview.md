# Administrator homepage preview

The homepage leads with fundraising, staff appreciation, and sponsorships. Terms
and availability are left for a school partnership conversation. The existing
`/for-schools` route remains available. Homepage partnership buttons open a
choice of an email contact form or the existing Google Calendar appointment
schedule inside a responsive dialog. `/schools` remains the parent shopping
destination. School responsibilities are list sharing, family
communication, and delivery coordination. Commerce routes and integrations are
unchanged.

## Media provenance

- Approved Runway task: `36f2e281-5a93-4066-884a-c504a1a611dd` (SUCCEEDED).
- Desktop: downloaded the approved output without regenerating it.
- `public/media/classroom-morning.mp4`: original H.264 frames, 1280×720,
  approximately five seconds, 24 fps, no audio. Lossless remux with faststart for
  phone playback; approximately 1 MB.
- `public/media/classroom-morning.jpg`: first frame extracted from that video.
- Loop composition is stable, with a small visible hand-position reset. It is
  not a seamless loop.
- Tint and desktop/mobile cropping live in `homepage.module.css`.
- Reduced motion leaves the source unset and displays the poster. Users can
  explicitly play it. Autoplay rejection leaves a manual play button; media
  load failure retains the background poster and a status message.

## Mobile school-life sequence

The user clarified that the mobile footage must convey happy school life:
classrooms, teachers, students, and parents. The earlier packing sequence is
replaced by completed Runway task `eb8c9042-8835-45ea-8f3c-97c52957378b`.

Visual references reviewed from the existing site: `tefa-classroom-students.png`,
`school-quote-students-parents.png`, `parent_homePage_circle.png`,
`boy_homePage_circle.png`, and `girl_homePage_circle.png`. The classroom photo
was supplied to Runway as the opening image reference. The scenes show children
learning together, a teacher supporting a student, and a parent-child arrival.
These are generated illustrative scenes, not documentary footage of a client
school.

Runway retained the reference image’s wide aspect ratio. The mobile export
uses a centered square crop over a softly blurred extension of the same scene,
keeping the people below the strongest text overlay. It is a 15-second
720×1280 H.264 faststart source export with intentional scene cuts. The current
served version is compressed to 540×960, about 0.77 MB, with the same scenes and
duration.

The mobile hero uses its own silent portrait MP4 and extracted poster behind the
HTML copy. The approved desktop clip is retained. Only the viewport-appropriate
source loads; reduced-motion and Data Saver preferences leave the video source
unset until an explicit play action. A manual pause is preserved when changing
viewport sizes.

## Validation

- Local development server rendered at 1440×1000 and 390×844, with no horizontal
  overflow or Next.js error overlay.
- TypeScript and production build passed using the project's preview environment.
- Changed source files pass Prettier and `git diff --check`.
- Verified keyboard pause/play, reduced-motion source suppression, autoplay
  rejection with manual recovery, and media-request failure.
- Existing `pnpm lint` cannot initialize: ESLint 8's legacy configuration and
  Next 16 configuration produce a circular-JSON configuration error. This change
  preserves the package manager, dependencies, lockfile, and lint configuration.

## Current delivery and interactions

- Served media lives in `public/media/optimized/`, with content hashes in filenames
  and `Cache-Control: public, max-age=31536000, immutable`. Generate a new hash
  when changing an asset; never overwrite different content at an existing URL.
  Original approved video and source exports remain available for provenance.
- A responsive picture and media-specific preloads request only the appropriate
  WebP poster before hydration. Desktop video remains the approved original.
- The hero contains its exact approved headline, one service sentence, and two
  actions. Fundraising, staff appreciation, and sponsorships appear below it.
- Only the word “more” grows and fades once. Brand cards fade in at 10% visibility
  and fade out below 5%; other homepage headings remain still.
- The dialog opens with a 300 ms fade/lift and closes in 200 ms. Reduced-motion
  users get no transition. Dialog and contact-form JavaScript load on demand.
- Analytics initializes an event queue after hydration and loads the Google
  script after page load during idle time. Existing event names are preserved.
- The TEFA promotional banner is removed; TEFA navigation and routes remain.

## Merge validation and limits

The homepage is statically pre-rendered and confirmed served from Vercel's CDN
cache. The school directory revalidates every five minutes; cart operations
remain dynamic. No dependency, lockfile, environment, or production-protection
changes are included.

Latest mobile Lighthouse lab sample after media and JavaScript optimization:
85 performance, 190 ms blocking time, 3.5 s largest contentful paint, zero layout
shift. The previous media-only sample was 73, 400 ms, and 4.7 s. These are
single-run preview results with sharing-redirect overhead, not field data or a
promise of the same production score. Preview noindex protection explains the
lower SEO score; do not remove that protection to improve the preview score.

Contact form UI, native validation, modal navigation, analytics queue, and mocked
success/error responses were checked. A real contact submission reaching the
Core API/email recipient has not been sent as part of this review. Google
Calendar was checked for loading, not for creating an appointment. Real iPhone
Low Power Mode can prevent autoplay; the poster and play control remain the
fallback.

Vercel's configured production branch is `main`. Merging this branch will trigger
production deployment. Merge and production launch require explicit approval;
preview sharing protection remains unchanged.

## Alternate mobile video preview

Branch `agent/homepage-reading-art-garden` replaces only the mobile hero with
Runway task `6fdf6ab0-eadf-453f-9ccd-6f3924d36b86`: reading circle, collaborative
art, and outdoor garden learning. The source is silent, 720×1280, and 15.041
seconds. The served 540×960 H.264 faststart copy is 935,163 bytes, with an
extracted WebP poster. Content-hashed filenames retain immutable caching.
The original desktop video is unchanged. This is a separate review option;
the original feature branch and its pull request retain the previous video.
