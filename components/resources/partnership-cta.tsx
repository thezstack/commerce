import TrackedLink from 'components/marketing/tracked-link';
import { ArrowRight } from 'lucide-react';

export default function PartnershipCta({ source }: { source: string }) {
  return (
    <section
      aria-labelledby="resource-partnership-heading"
      className="rounded-2xl bg-[#073B4C] px-6 py-9 text-white sm:px-10 sm:py-12"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-[#A9DDED]">Your next step</p>
      <h2
        id="resource-partnership-heading"
        className="mt-3 text-2xl font-bold leading-tight sm:text-3xl"
      >
        Let’s talk about your school’s supply program.
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-[#D9EEF4]">
        Exploring options? Start with an intro call. If your grade-level lists are ready, send them
        to us for a quote.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <TrackedLink
          href="/for-schools"
          eventName="school_resource_intro_click"
          eventLabel={source}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#073B4C] hover:bg-[#E7F4F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Schedule an intro call <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href="/for-schools-quote"
          eventName="school_resource_quote_click"
          eventLabel={source}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#A9DDED] px-6 py-3 text-sm font-bold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Request a school quote
        </TrackedLink>
      </div>
    </section>
  );
}
