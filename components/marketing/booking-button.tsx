'use client';

import { Dialog } from '@headlessui/react';
import { ArrowLeft, ArrowRight, CalendarDays, Mail, X } from 'lucide-react';
import ContactForm from 'components/contact';
import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
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
  const [step, setStep] = useState<'choice' | 'contact' | 'booking'>('choice');
  const [contactVisited, setContactVisited] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [step, isOpen]);
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
    setStep('choice');
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
          <Dialog.Panel
            className={`flex h-dvh w-full flex-col overflow-hidden bg-white pt-[env(safe-area-inset-top)] shadow-2xl sm:rounded-2xl ${
              step === 'booking'
                ? 'sm:h-[min(900px,90dvh)] sm:max-w-6xl'
                : step === 'contact'
                ? 'sm:h-[min(800px,90dvh)] sm:max-w-2xl'
                : 'sm:h-[min(520px,90dvh)] sm:max-w-4xl'
            }`}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#CFE8F0] px-4 py-3 sm:px-6">
              <div>
                {step !== 'choice' && (
                  <button
                    type="button"
                    onClick={() => setStep('choice')}
                    className="mb-1 flex min-h-10 items-center gap-2 text-sm font-semibold text-[#0B80A7]"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    All contact options
                  </button>
                )}
                <Dialog.Title
                  ref={titleRef}
                  tabIndex={-1}
                  className="text-lg font-bold text-[#073B4C] outline-none"
                >
                  {step === 'choice'
                    ? 'Let’s talk about your school'
                    : step === 'contact'
                    ? 'Send us a message'
                    : 'Book a 15-minute call'}
                </Dialog.Title>
                {step === 'booking' && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#0B80A7] underline underline-offset-4"
                  >
                    Open in Google Calendar (new tab)
                  </a>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close contact options"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E7F7FB] text-[#073B4C] hover:bg-[#CFE8F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B80A7]"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
              {step === 'choice' && (
                <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
                  <p className="mb-7 text-[16px] leading-relaxed text-[#315565]">
                    Send your questions for an email reply, or book a short call to talk them
                    through.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setContactVisited(true);
                        setStep('contact');
                      }}
                      className="rounded-2xl border border-[#CFE8F0] bg-[#F3FAFC] p-6 text-left transition hover:border-[#0B80A7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0B80A7]"
                    >
                      <Mail className="mb-4 text-[#0B80A7]" aria-hidden="true" />
                      <span className="block text-xl font-bold text-[#073B4C]">Send a message</span>
                      <span className="mt-3 block text-[16px] leading-relaxed text-[#315565]">
                        Share your school’s needs or ask a question. Our team will follow up by
                        email.
                      </span>
                      <span className="mt-5 flex items-center gap-2 font-semibold text-[#0B80A7]">
                        Open contact form <ArrowRight size={18} aria-hidden="true" />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('booking')}
                      className="rounded-2xl border border-[#CFE8F0] bg-white p-6 text-left transition hover:border-[#0B80A7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0B80A7]"
                    >
                      <CalendarDays className="mb-4 text-[#0B80A7]" aria-hidden="true" />
                      <span className="block text-xl font-bold text-[#073B4C]">
                        Book a 15-minute call
                      </span>
                      <span className="mt-3 block text-[16px] leading-relaxed text-[#315565]">
                        Talk through your supply lists, timing, and questions about the program with
                        our team.
                      </span>
                      <span className="mt-5 flex items-center gap-2 font-semibold text-[#0B80A7]">
                        Choose a time <ArrowRight size={18} aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
              {contactVisited && (
                <div hidden={step !== 'contact'} className="mx-auto max-w-2xl px-5 py-6 sm:px-8">
                  <p className="mb-5 text-[16px] leading-relaxed text-[#315565]">
                    Include your school’s name and what you’d like help with. We’ll reply to the
                    email address you provide.
                  </p>
                  <Suspense fallback={<p role="status">Loading contact form…</p>}>
                    <ContactForm variant="modal" metadata={{ persona: 'school_administrator' }} />
                  </Suspense>
                </div>
              )}
              {step === 'booking' && (
                <iframe
                  src={bookingUrl}
                  title="Book a 15-minute call with School Kits"
                  className="block h-full w-full border-0"
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
