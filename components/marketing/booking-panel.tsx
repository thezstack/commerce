'use client';

import { CalendarDays } from 'lucide-react';
import { useEffect, useRef } from 'react';

type BookingPanelProps = {
  bookingUrl?: string;
};

type GoogleSchedulingButton = {
  load: (options: { url: string; color: string; label: string; target: HTMLElement }) => void;
};

type WindowWithGoogleScheduling = Window & {
  calendar?: {
    schedulingButton?: GoogleSchedulingButton;
  };
};

const scriptSrc = 'https://calendar.google.com/calendar/scheduling-button-script.js';
const stylesheetHref = 'https://calendar.google.com/calendar/scheduling-button-script.css';

export default function BookingPanel({ bookingUrl }: BookingPanelProps) {
  const buttonTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bookingUrl || !buttonTargetRef.current) return;

    const loadButton = () => {
      const schedulingButton = (window as WindowWithGoogleScheduling).calendar?.schedulingButton;
      if (!schedulingButton || !buttonTargetRef.current) return;

      buttonTargetRef.current.innerHTML = '';
      schedulingButton.load({
        url: bookingUrl,
        color: '#039BE5',
        label: 'Book an appointment',
        target: buttonTargetRef.current
      });
    };

    if (!document.querySelector(`link[href="${stylesheetHref}"]`)) {
      const link = document.createElement('link');
      link.href = stylesheetHref;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
    if (existingScript) {
      if ((window as WindowWithGoogleScheduling).calendar?.schedulingButton) {
        loadButton();
      } else {
        existingScript.addEventListener('load', loadButton, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.addEventListener('load', loadButton, { once: true });
    document.body.appendChild(script);
  }, [bookingUrl]);

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
      <div ref={buttonTargetRef} className="mt-5" />
    </div>
  );
}
