import ContactForm from 'components/contact';
import ScrollReveal from 'components/qr-landing/scroll-reveal';
import { ArrowRight, CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import classroomStudents from '../../media/tefa-classroom-students.png';

const title = 'TEFA Parent Ordering Help';
const description =
  'How parents can find School Kits Supply for TEFA school supply orders by searching School Kits and filtering by Supplies in TEFA Finder or Odyssey.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/tefa-parents'
  },
  openGraph: {
    title,
    description,
    url: '/tefa-parents',
    siteName: 'School Kits',
    type: 'article',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'School Kits'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true
  }
};

const finderSteps = [
  {
    title: 'Go to TEFA Finder',
    description: 'Open the TEFA Finder website or use the path provided inside Odyssey.'
  },
  {
    title: 'Search School Kits',
    description: 'Type "School Kits" in the search bar.'
  },
  {
    title: 'Filter by Supplies',
    description: 'Select the Supplies category to find our School Kits Supply listing.'
  }
];

export default function TefaParentsPage() {
  return (
    <div className="bg-white text-[#073B4C]">
      <section className="bg-[#F4FDFF] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <ScrollReveal>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0B80A7] shadow-sm">
              TEFA ordering help for parents
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Find School Kits for TEFA supply orders
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#315565] sm:text-base sm:leading-7">
              Our Odyssey page is live and accepting orders for TEFA kits. If you are looking for
              School Kits through TEFA, search for School Kits in TEFA Finder and filter by
              Supplies. We do not have a direct parent listing URL to share.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#questions"
                className="inline-flex items-center justify-center rounded-full bg-[#0B80A7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#096c8c]"
              >
                Ask a question
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <div className="overflow-hidden rounded-3xl border border-[#D9EEF4] bg-white shadow-[0_14px_34px_rgba(11,128,167,0.10)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={classroomStudents}
                  alt="Students working with classroom supplies"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C]/65 via-[#073B4C]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-wide">Current TEFA season</p>
                  <p className="mt-2 text-2xl font-bold">
                    School Kits Supply is listed under Supplies
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-[#0B80A7]">How to find us</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Search TEFA Finder for School Kits Supply
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {finderSteps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-[#D9EEF4] bg-[#F8FCFD] p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B80A7] text-sm font-bold text-white">
                  {index === 0 ? (
                    <Search className="h-5 w-5" aria-hidden="true" />
                  ) : index === 1 ? (
                    <Search className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#315565]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-[#B7E5F2] bg-[#EAF8FC] p-5">
            <div className="flex gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 flex-none text-[#0B80A7]"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-[#315565]">
                I do not have visibility into exactly how the Odyssey parent portal routes families
                to vendor listings, and there is not a direct parent listing URL to share. On the
                TEFA Finder website, families can find our listing by searching for "School Kits"
                and filtering by "Supplies."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="questions"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6 lg:scroll-mt-32 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="max-w-md">
            <p className="mb-3 text-sm font-bold uppercase text-[#0B80A7]">Questions</p>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Need help finding or ordering your TEFA kit?
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#315565] sm:text-base sm:leading-7">
              Send us a note and we can help point you in the right direction for School Kits Supply
              on TEFA Finder or answer questions about your school supply kit order.
            </p>
          </div>

          <div className="rounded-lg border border-[#D7EEF5] bg-white p-1 shadow-xl shadow-[#073B4C]/10">
            <ContactForm variant="modal" metadata={{ persona: 'tefa_parent' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
