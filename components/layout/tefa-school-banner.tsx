'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DISMISSED_COOKIE = 'schoolkits-tefa-banner-dismissed';
const DISMISSED_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export default function TefaSchoolBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = document.cookie
      .split('; ')
      .some((cookie) => cookie === `${DISMISSED_COOKIE}=true`);

    setIsVisible(!isDismissed);
  }, []);

  const dismissBanner = () => {
    document.cookie = `${DISMISSED_COOKIE}=true; Max-Age=${DISMISSED_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  if (!isVisible || pathname === '/texas-private-schools') {
    return null;
  }

  return (
    <div className="border-b border-[#B7E5F2] bg-[#EAF8FC]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 text-sm text-[#073B4C] sm:px-6 lg:px-8">
        <Link
          href="/texas-private-schools"
          className="min-w-0 flex-1 font-semibold underline-offset-4 hover:underline"
        >
          Texas private schools: SchoolKits is TEFA approved for school supply kits.
          <span className="ml-1 whitespace-nowrap text-[#0B80A7]">Contact us</span>
        </Link>
        <button
          type="button"
          aria-label="Dismiss TEFA banner"
          onClick={dismissBanner}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[#0B80A7] hover:bg-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
