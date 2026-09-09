'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { schoolBookingUrl } from 'lib/school-contact';

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openBooking = () => {
    (
      window as Window & {
        gtag?: (command: string, event: string, params: Record<string, string>) => void;
      }
    ).gtag?.('event', `${source}_booking_click`, {
      event_category: 'lead',
      event_label: 'google_calendar_booking_button'
    });
    setIsOpen(true);
  };
  return (
    <>
      <button type="button" onClick={openBooking} className={className} aria-haspopup="dialog">
        {children}
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        initialFocus={closeButtonRef}
        className="relative z-[100]"
      >
        <div className="fixed inset-0 bg-[#073B4C]/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center sm:p-6">
          <Dialog.Panel className="flex h-dvh w-full flex-col overflow-hidden bg-white pt-[env(safe-area-inset-top)] shadow-2xl sm:h-[min(900px,90dvh)] sm:max-w-6xl sm:rounded-2xl">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#CFE8F0] px-4 py-3 sm:px-6">
              <div>
                <Dialog.Title className="text-lg font-bold text-[#073B4C]">
                  Schedule a call
                </Dialog.Title>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0B80A7] underline underline-offset-4"
                >
                  Open in Google Calendar (new tab)
                </a>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close booking calendar"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E7F7FB] text-[#073B4C] hover:bg-[#CFE8F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B80A7]"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 pb-[env(safe-area-inset-bottom)]">
              <iframe
                src={bookingUrl}
                title="Book a 15-minute call with School Kits"
                className="block h-full w-full border-0"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
