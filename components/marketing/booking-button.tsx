'use client';

import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { schoolBookingUrl } from 'lib/school-contact';

const loadDialog = () => import('./booking-dialog');
const BookingDialog = dynamic(loadDialog, {
  ssr: false,
  loading: () => (
    <span role="status" className="sr-only">
      Opening contact options…
    </span>
  )
});

export default function BookingButton({
  children,
  className,
  bookingUrl = schoolBookingUrl,
  source = 'homepage'
}: {
  children: ReactNode;
  className?: string;
  bookingUrl?: string;
  source?: 'homepage' | 'for_schools';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const openBooking = () => {
    (
      window as Window & {
        gtag?: (command: string, event: string, params: Record<string, string>) => void;
      }
    ).gtag?.('event', `${source}_booking_click`, {
      event_category: 'lead',
      event_label: 'google_calendar_booking_button'
    });
    setHasOpened(true);
    setIsOpen(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={openBooking}
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        className={className}
        aria-haspopup="dialog"
      >
        {children}
      </button>
      {hasOpened && <BookingDialog isOpen={isOpen} setIsOpen={setIsOpen} bookingUrl={bookingUrl} />}
    </>
  );
}
