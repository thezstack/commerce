import { CalendarDays } from 'lucide-react';
import BookingButton from './booking-button';

type BookingPanelProps = { bookingUrl?: string };

export default function BookingPanel({ bookingUrl }: BookingPanelProps) {
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
      <BookingButton
        bookingUrl={bookingUrl}
        source="for_schools"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0B80A7] px-5 py-3 text-base font-bold text-white transition hover:bg-[#096c8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B80A7] sm:w-auto"
      >
        Book an appointment
      </BookingButton>
    </div>
  );
}
