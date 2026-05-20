import { AnimatedBlock, AnimatedInView } from 'components/marketing/quote-page-motion';
import QuoteRequestForm from 'components/marketing/quote-request-form';
import { CheckCircle2, Clock, FileText, PackageCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import schoolQuoteStudentsParents from '../../media/school-quote-students-parents.png';

export const metadata: Metadata = {
  title: 'Request a One-Hour School Supply Pack Quote Review',
  description:
    'Upload your school supply list and contact information to start a fast School Kits quote review.'
};

const quotePoints = [
  'K-5 and elementary supply packs',
  'Grade-level customization',
  'Delivery and sorting options',
  'Minimums and PTA questions'
];

export default function ForSchoolsQuotePage() {
  return (
    <div className="bg-white text-[#073B4C]">
      <section className="bg-[#F4FDFF] px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <AnimatedBlock>
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0B80A7] shadow-sm">
              Reviewed within one business hour
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Upload your supply list. Get a quote started.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#315565]">
              Upload the list and tell us how to reach you. We will review it and reply with the
              next quote step.
            </p>
            <AnimatedBlock
              delay={0.12}
              className="mt-5 overflow-hidden rounded-lg border border-[#D9EEF4] bg-white shadow-sm"
            >
              <Image
                src={schoolQuoteStudentsParents}
                alt="Parents and students reviewing organized school supply packs"
                className="aspect-[16/9] w-full object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
              />
            </AnimatedBlock>
            <AnimatedBlock
              delay={0.2}
              className="mt-5 grid gap-2 text-sm font-semibold text-[#315565] sm:grid-cols-2"
            >
              {quotePoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-none text-[#06D6A0]" aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </AnimatedBlock>
          </AnimatedBlock>
          <AnimatedBlock delay={0.1}>
            <QuoteRequestForm />
          </AnimatedBlock>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedInView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#0B80A7]">
            Start with the list
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#073B4C]">
            The fastest quote starts with the supply list.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#315565]">
            Upload the file your school already uses. We will review the items, check what is enough
            for pricing, and follow up with the next quote step.
          </p>
        </AnimatedInView>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            {
              title: '1. Upload the list',
              description: 'Send the PDF, spreadsheet, document, or image you already have.',
              icon: FileText
            },
            {
              title: '2. We review it',
              description:
                'We check what is enough for pricing and what still needs clarification.',
              icon: PackageCheck
            },
            {
              title: '3. Fast follow-up',
              description:
                'We review new school quote requests within one business hour during the workday.',
              icon: Clock
            }
          ].map((step) => {
            const Icon = step.icon;
            return (
              <AnimatedInView
                key={step.title}
                className="rounded-lg border border-[#D9EEF4] bg-[#F8FCFD] p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B80A7] shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-bold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#315565]">{step.description}</p>
              </AnimatedInView>
            );
          })}
        </div>
      </section>
    </div>
  );
}
