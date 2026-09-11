'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeft, ArrowRight, CalendarDays, Mail, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Fragment, Suspense, useEffect, useRef, useState } from 'react';

const ContactForm = dynamic(() => import('components/contact'), {
  loading: () => <p role="status">Loading contact form…</p>
});

export default function BookingDialog({
  isOpen,
  setIsOpen,
  bookingUrl
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  bookingUrl: string;
}) {
  const [step, setStep] = useState<'choice' | 'contact' | 'booking'>('choice');
  const [contactVisited, setContactVisited] = useState(false);
  const [viewportContainer, setViewportContainer] = useState<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isOpen) setStep('choice');
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) titleRef.current?.focus({ preventScroll: true });
  }, [step, isOpen]);
  useEffect(() => {
    const viewport = window.visualViewport;
    const container = viewportContainer;
    if (!isOpen || !viewport || !container) return;

    let frame = 0;
    // iOS keyboards shrink/pan the visual viewport without resizing 100dvh.
    // Follow its bounds, including iframe focus, without disabling user zoom.
    const update = () => {
      container.style.top = `${viewport.offsetTop}px`;
      container.style.left = `${viewport.offsetLeft}px`;
      container.style.width = `${viewport.width}px`;
      container.style.height = `${viewport.height}px`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    viewport.addEventListener('resize', schedule);
    viewport.addEventListener('scroll', schedule);
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('resize', schedule);
      viewport.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      container.removeAttribute('style');
    };
  }, [isOpen, viewportContainer]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={setIsOpen} initialFocus={closeButtonRef} className="relative z-[100]">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300 ease-out motion-reduce:transition-none"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in motion-reduce:transition-none"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#073B4C]/50" aria-hidden="true" />
        </Transition.Child>
        <div
          ref={setViewportContainer}
          data-contact-viewport
          className="fixed left-0 top-0 flex h-dvh w-full items-center justify-center sm:p-6"
        >
          <Transition.Child
            as={Fragment}
            enter="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
            enterFrom="opacity-0 translate-y-3 motion-reduce:transform-none"
            enterTo="opacity-100 translate-y-0"
            leave="transition-[opacity,transform] duration-200 ease-in motion-reduce:transition-none"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2 motion-reduce:transform-none"
          >
            <Dialog.Panel
              className={`flex h-full max-h-full w-full min-w-0 flex-col overflow-hidden bg-white pt-[env(safe-area-inset-top)] shadow-2xl sm:rounded-2xl ${
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
              <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
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
                        <span className="block text-xl font-bold text-[#073B4C]">
                          Send a message
                        </span>
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
                          Talk through your supply lists, timing, and questions about the program
                          with our team.
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
