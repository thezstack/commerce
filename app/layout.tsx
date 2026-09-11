import Script from 'next/script';
import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const siteName = SITE_NAME || 'School Kits';
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-4SWM464SP9';
// Preview assets must resolve on the deployment being reviewed, not production.
const siteHost =
  process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;
const baseUrl = siteHost
  ? `https://${siteHost.replace(/^https?:\/\//, '')}`
  : 'http://localhost:3000';
// Social card attribution accepts handles, never website/template URLs.
const twitterHandle = (value?: string) =>
  value && /^@?[A-Za-z0-9_]{1,15}$/.test(value) ? `@${value.replace(/^@/, '')}` : undefined;
const twitterCreator = twitterHandle(TWITTER_CREATOR);
const twitterSite = twitterHandle(TWITTER_SITE);
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
    default: siteName,
    template: `%s | ${siteName}`
  },
  robots: {
    follow: true,
    index: true
  },
  twitter: {
    card: 'summary_large_image',
    ...(twitterCreator && { creator: twitterCreator }),
    ...(twitterSite && { site: twitterSite })
  },
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
        <Script id="_next-ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', ${JSON.stringify(googleAnalyticsId).replace(/</g, '\\u003c')});
        `}</Script>
        <Script
          id="_next-ga"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
            googleAnalyticsId
          )}`}
        />
        <Suspense>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
