'use client';

import { Dialog } from '@headlessui/react';
import { CalendarDays, X } from 'lucide-react';
import { useRef, useState } from 'react';

type BookingPanelProps = {
  bookingUrl?: string;
};

type WindowWithGtag = Window & {
  gtag?: (command: 'event', eventName: string, params?: Record<string, string>) => void;
};

export default function BookingPanel({ bookingUrl }: BookingPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openBooking = () => {
    (window as WindowWithGtag).gtag?.('event', 'for_schools_booking_click', {
      event_category: 'lead',
      event_label: 'google_calendar_booking_button'
    });
    setIsOpen(true);
  };

  if (!bookingUrl) {
    return (
      <div className="rounded-lg border border-[#CFE8F0] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F7FB] text-[#0B80A7]">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-[#073B4C]">Book a 15-minute call</h2>
            <p className="text-sm text-[#315565]">
              A booking calendar will appear here once configured.
            </p>
          </div>
        </div>
        <a
          href="mailto:hello@schoolkits.org"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#0B80A7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#096c8c]"
        >
          Email School Kits
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#CFE8F0] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F7FB] text-[#0B80A7]">
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#073B4C]">Book a 15-minute call</h2>
          <p className="text-sm text-[#315565]">
            Pick a time in Google Calendar. We&apos;ll explain how School Kits could work for your
            campus.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={openBooking}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0B80A7] px-5 py-3 text-base font-bold text-white transition hover:bg-[#096c8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B80A7] sm:w-auto"
      >
        Book an appointment
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
    </div>
  );
}
