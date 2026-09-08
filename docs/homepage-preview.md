# Administrator homepage preview

The homepage leads with fundraising, staff appreciation, and sponsorships. Terms
and availability are left for a school partnership conversation. The existing
`/for-schools` route is the partnership destination; `/schools` remains the parent
shopping destination. School responsibilities are list sharing, family
communication, and delivery coordination. Commerce routes and integrations are
unchanged.

## Media provenance

- Approved Runway task: `36f2e281-5a93-4066-884a-c504a1a611dd` (SUCCEEDED).
- Downloaded approved output; no generation or additional Runway credits used.
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
