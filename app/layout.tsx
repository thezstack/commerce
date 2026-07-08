import { GoogleAnalytics } from '@next/third-parties/google';
import WebVitalsReporter from 'components/analytics/web-vitals';
import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import TefaSchoolBanner from 'components/layout/tefa-school-banner';
import { ensureStartsWith } from 'lib/utils';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-4SWM464SP9';
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap'
});
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    }),
  ...(googleSiteVerification && {
    verification: {
      google: googleSiteVerification
    }
  })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${openSans.className} scroll-smooth`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="flex min-h-svh flex-col bg-neutral-50 text-black selection:bg-teal-300">
        <GoogleAnalytics gaId={googleAnalyticsId} />
        <WebVitalsReporter />
        <Suspense>
          <TefaSchoolBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
