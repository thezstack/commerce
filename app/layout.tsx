import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import { ensureStartsWith } from 'lib/utils';
import { Open_Sans } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;
const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap'
});
export const metadata = {
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
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300">
    
        <Suspense>
        <Navbar />
          <main>{children}</main>
          <Footer />
        </Suspense>
   
      </body>
    </html>
  );
}
