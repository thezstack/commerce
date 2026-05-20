import BookingPanel from 'components/marketing/booking-panel';
import TrackedLink from 'components/marketing/tracked-link';
import ScrollReveal from 'components/qr-landing/scroll-reveal';
import { ArrowRight, CheckCircle2, GraduationCap, Handshake, Tags, Truck } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import classroomStudents from '../../media/tefa-classroom-students.png';

export const metadata: Metadata = {
  title: 'School Supply Pack Intro Call',
  description:
    'Book a short intro call to learn how School Kits builds grade-level school supply packs from your school lists.'
};

const schoolBookingUrl =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1qJNg1BpLbvbB1NQa80HJjY1SaTDw55Piok6Rra0E03zzdg2dVqfVtVzgnrJU_YJ1FOb-ibNR_?gv=true';

const quoteDetails = [
  {
    title: 'How the program works',
    description:
      'We explain how lists become grade-level packs, how families order, and what school staff need to do.',
    icon: Tags
  },
  {
    title: 'What we need from your school',
    description:
      'Usually we start with grade levels, current supply lists, estimated student count, and your preferred timeline.',
    icon: GraduationCap
  },
  {
    title: 'Delivery and handoff',
    description:
      'We talk through where packs should go, whether they should be sorted by grade or classroom, and when they need to arrive.',
    icon: Truck
  },
  {
    title: 'Questions from your team',
    description:
      'Bring questions about pricing, minimums, PTA involvement, fundraising, or anything your school needs to decide.',
    icon: Handshake
  }
];

const heroPoints = [
  'See how school supply packs would work for your campus',
  'Ask about pricing, delivery, minimums, and PTA options',
  'Talk through your current supply lists',
  'Leave with a clear next step'
];

export default function ForSchoolsPage() {
  return (
    <div className="bg-white text-[#073B4C]">
      <section className="relative overflow-hidden bg-[#F4FDFF]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
          <ScrollReveal className="relative z-10">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0B80A7] shadow-sm">
              School supply packs for K-5 campuses
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Book a quick intro call for your school
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#315565]">
              We build grade-level supply packs from your school&apos;s lists, give families a
              simple way to order, and help plan delivery before the first day of school.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="#book-call"
                eventName="for_schools_cta_click"
                eventLabel="hero_book_call_primary"
                className="inline-flex items-center justify-center rounded-full bg-[#0B80A7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#096c8c]"
              >
                Schedule intro call
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
            <ul className="mt-7 grid gap-3 text-sm font-semibold text-[#315565] sm:grid-cols-2">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-none text-[#06D6A0]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delayMs={120} className="relative min-h-[330px] lg:min-h-[460px]">
            <div className="absolute inset-x-8 bottom-6 top-8 rounded-lg bg-[#A9DDED]" />
            <div className="absolute inset-x-0 bottom-0 mx-auto h-[88%] max-w-[520px] overflow-hidden rounded-lg shadow-2xl shadow-[#073B4C]/15">
              <Image
                src={classroomStudents}
                alt="Students using classroom supplies"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C]/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/95 p-4 shadow-lg">
                <p className="text-sm font-bold text-[#073B4C]">See if it fits your school</p>
                <p className="mt-1 text-xs leading-5 text-[#315565]">
                  A short call is enough to explain the process and answer your first questions.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase text-[#0B80A7]">What we cover</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">
                Use the call to understand the program
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#315565]">
                You do not need to commit to anything. The goal is to understand your school&apos;s
                needs and see whether School Kits is worth exploring.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {quoteDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.title}
                    className="rounded-lg border border-[#D9EEF4] bg-[#F8FCFD] p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B80A7] shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#073B4C]">{detail.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#315565]">{detail.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="book-call" className="scroll-mt-28 bg-[#F8FCFD] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[#0B80A7]">Schedule a call</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Book a short call and bring your questions
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#315565]">
              We can talk through your grades, supply lists, parent ordering, delivery, and any
              pricing or fundraising questions your team has.
            </p>
          </div>
          <BookingPanel bookingUrl={schoolBookingUrl} />
        </div>
      </section>
    </div>
  );
}
