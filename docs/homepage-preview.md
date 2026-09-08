# Administrator homepage preview

The homepage leads with fundraising, staff appreciation, and sponsorships. Terms
and availability are left for a school partnership conversation. The existing
`/for-schools` route is the partnership destination; `/schools` remains the parent
shopping destination. School responsibilities are list sharing, family
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

## Mobile sequence revision

The user subsequently authorized additional Runway generation. Task
`261c6c2b-be86-4130-903e-b1e998106175` (SUCCEEDED) created three portrait scenes: kit packing,
supply close-ups, and classroom delivery. These are generated illustrative
scenes, not documentary footage of SchoolKits staff or facilities.

The 15-second, 720×1280 silent sequence is compressed to about 1.5 MB with
H.264 faststart. The scenes use intentional cuts, including the loop boundary.
The mobile hero uses its own portrait MP4 and extracted poster behind the HTML
copy. The desktop clip is retained. Only the viewport-appropriate source loads;
reduced-motion and Data Saver preferences leave the video source unset until an
explicit play action. A manual pause is preserved when changing viewport sizes.

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
