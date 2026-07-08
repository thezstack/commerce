import ContactForm from 'components/contact';
import ScrollReveal from 'components/qr-landing/scroll-reveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import bottomCta from '../../media/Frame 37280bottom_cta.png';
import littlePerson from '../../media/little_person_homePage.png';
import classroomStudents from '../../media/tefa-classroom-students.png';

const title = 'TEFA Approved School Supply Kits for Texas Private Schools';
const description =
  'SchoolKits is TEFA approved and helps Texas private school administrators set up grade-specific school supply kits for families.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/texas-private-schools'
  },
  openGraph: {
    title,
    description,
    url: '/texas-private-schools',
    siteName: 'School Kits',
    type: 'website',
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

const highlights = [
  'TEFA approved for school supply kits',
  'Built from your official classroom lists',
  'One simple contact form to start'
];

const processSteps = [
  {
    title: 'Send your lists',
    description: 'Share the grades, classroom lists, and timing your school needs.'
  },
  {
    title: 'We build the kits',
    description: 'SchoolKits creates grade-specific kits from your school requirements.'
  },
  {
    title: 'Families order',
    description: 'Your families get a simpler path to the right supplies before school starts.'
  }
];

export default function TexasPrivateSchoolsPage() {
  return (
    <div className="bg-white text-[#073B4C]">
      <section className="relative overflow-hidden bg-[#F4FDFF]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8 lg:py-14">
          <ScrollReveal className="relative z-10">
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0B80A7] shadow-sm">
              TEFA approved for Texas school supply kits
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Bring SchoolKits to your Texas private school
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#315565] sm:text-base sm:leading-7">
              TEFA-approved supply kits, built from your school&apos;s classroom lists.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-[#315565]">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-none text-[#06D6A0]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0B80A7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#096c8c]"
              >
                Contact us to set up kits
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120} className="relative min-h-[300px] lg:min-h-[430px]">
            <div className="absolute inset-x-10 bottom-0 top-8 rounded-[2rem] bg-[#A9DDED]" />
            <div className="absolute bottom-0 left-0 right-0 mx-auto h-[82%] max-w-[420px] overflow-hidden rounded-t-[2rem]">
              <Image
                src={bottomCta}
                alt="School supplies prepared for students"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#073B4C]/10" />
            </div>
            <Image
              src={littlePerson}
              alt="Student ready for school"
              width={300}
              height={360}
              priority
              className="absolute bottom-0 right-4 w-[52%] max-w-[300px]"
            />
            <div className="absolute left-3 top-0 max-w-[220px] rounded-xl bg-white p-4 shadow-xl">
              <p className="text-sm font-bold text-[#073B4C]">For school admins</p>
              <p className="mt-1 text-xs leading-5 text-[#315565]">
                Share your supply lists once. Give families a simpler back-to-school path.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F8FCFD] px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-12 top-10 h-32 w-32 rounded-full bg-[#CCEBF5] opacity-70 sm:h-44 sm:w-44" />
          <div className="absolute right-[-2rem] top-8 h-28 w-28 rounded-full bg-[#FFE7AF] opacity-80 sm:h-36 sm:w-36" />
          <div className="absolute bottom-6 left-[18%] h-6 w-6 rounded-full bg-[#06D6A0] opacity-80" />
          <div className="absolute bottom-[-4rem] right-[18%] h-40 w-40 rounded-full bg-[#E7F7FB] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-[#0B80A7]">Simple process</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">From supply lists to kits</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-[#D9EEF4] bg-white/95 p-5 shadow-[0_12px_30px_rgba(11,128,167,0.08)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B80A7] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-[#073B4C]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#315565]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#D9EEF4] bg-[#F8FCFD] shadow-[0_14px_34px_rgba(11,128,167,0.08)]">
          <div className="relative aspect-[16/7] min-h-[240px]">
            <Image
              src={classroomStudents}
              alt="Students working with classroom supplies"
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#073B4C]/35 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6 lg:scroll-mt-32 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="max-w-md">
            <p className="mb-3 text-sm font-bold uppercase text-[#0B80A7]">Next step</p>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              We&apos;re here to make this easy for your school
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#315565] sm:text-base sm:leading-7">
              If SchoolKits could be helpful for your families, send us a note. We&apos;ll listen
              first, answer questions, and walk through a simple TEFA-approved supply kit option at
              your pace.
            </p>
          </div>

          <div className="rounded-lg border border-[#D7EEF5] bg-white p-1 shadow-xl shadow-[#073B4C]/10">
            <ContactForm variant="modal" metadata={{ persona: 'tefa_texas_private_school' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
