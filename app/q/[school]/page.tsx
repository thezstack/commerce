import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ContactModalCta from 'components/qr-landing/contact-modal-cta';
import SocialProof from 'components/qr-landing/social-proof';
import { getQrLandingData } from 'lib/qr-landing';

export const revalidate = 300;

const parsePrice = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isNaN(numeric) ? null : numeric;
};

const formatDifferencePercent = (schoolKits: string, retail: string) => {
  const schoolPrice = parsePrice(schoolKits);
  const retailPrice = parsePrice(retail);
  if (!schoolPrice || !retailPrice) return '—';
  if (retailPrice <= 0) return '—';
  const diff = ((retailPrice - schoolPrice) / retailPrice) * 100;
  const rounded = Math.round(diff);
  return `${rounded}%`;
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ school: string }>;
}): Promise<Metadata> {
  const { school } = await params;
  const data = await getQrLandingData(school);
  if (!data) return { title: 'School Kits for Administrators and PTAs' };

  return {
    title: `${data.schoolName} | School Kits for Administrators and PTAs`,
    description: `A short walkthrough for ${data.schoolName} administrators and PTAs on how School Kits works.`
  };
}

export default async function QrLandingPage({
  params
}: {
  params: Promise<{ school: string }>;
}) {
  const { school } = await params;
  const data = await getQrLandingData(school);
  if (!data) return notFound();

  return (
    <div
      className="bg-[#F7FBFD] text-[#0B2C3F]"
      style={
        {
          '--qr-sun': '#F9D27D',
          '--qr-sky': '#E7F7FF',
          '--qr-mint': '#DDF3EA',
          '--qr-ink': '#0B2C3F',
          '--qr-accent': '#0B80A7'
        } as React.CSSProperties
      }
    >
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 10%, rgba(249, 210, 125, 0.4), transparent 45%), radial-gradient(circle at 85% 5%, rgba(13, 128, 167, 0.18), transparent 40%), linear-gradient(180deg, rgba(231, 247, 255, 0.95), rgba(247, 251, 253, 0.9))'
          }}
        />
	        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-12 md:flex-row md:items-center md:pb-24 md:pt-20">
	          <div className="md:w-1/2">
	            <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B80A7] shadow-sm">
	              {data.heroBadge}
	            </span>
	            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">{data.heroTitle}</h1>
	            <p className="mt-4 text-base text-[#345060] md:text-lg">{data.heroDescription}</p>
	            <div className="mt-8 flex flex-wrap gap-4">
	              <Link
	                href="#how-it-works"
	                className="rounded-full bg-[#0B80A7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200/60 transition hover:-translate-y-0.5"
              >
                Continue
              </Link>
              <Link
                href="#next-step"
                className="rounded-full border border-[#0B80A7] px-6 py-3 text-sm font-semibold text-[#0B80A7] transition hover:bg-white"
              >
                Jump to the next step
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative grid gap-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#F9D27D] opacity-70 blur-xl" />
              <div className="absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-[#0B80A7] opacity-20 blur-2xl" />
	              <div className="relative">
	                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#79909E]">
	                  What admins evaluate
	                </p>
	                <ul className="mt-4 space-y-3 text-sm text-[#344D5A]">
	                  {data.heroChecklist.map((item) => (
	                    <li key={item} className="flex items-start gap-3">
	                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#0B80A7]" />
	                      <span>{item}</span>
	                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialProof
        title={data.socialProofTitle}
        subtitle={data.socialProofSubtitle}
        logos={data.socialProofLogos}
        testimonials={data.socialProofTestimonials}
      />

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-2 text-3xl font-semibold">{data.howItWorksTitle}</h2>
          </div>
          <p className="max-w-xl text-sm text-[#4C616E]">
            {data.howItWorksDescription}
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {data.howItWorksSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-md transition hover:-translate-y-1"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B80A7]">
                Step 0{index + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#0B2C3F]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#4C616E]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="relative overflow-hidden bg-white/60 px-6 py-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[#0B80A7] opacity-10 blur-2xl" />
          <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-[#F9D27D] opacity-20 blur-2xl" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-2 text-3xl font-semibold">{data.pricingTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm text-[#4C616E]">
                {data.pricingDescription}
              </p>
            </div>
            <div className="rounded-full bg-[#E7F7FF] px-4 py-2 text-xs font-semibold text-[#0B80A7]">
              {data.pricingNote}
            </div>
          </div>
          <div className="mt-10 hidden overflow-hidden rounded-3xl border border-[#E3EEF4] bg-white shadow-lg md:block">
            <div className="grid grid-cols-4 gap-4 border-b border-[#E3EEF4] bg-[#F4FBFF] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#79909E]">
              <div>Grade bundle</div>
              <div>School Kits</div>
              <div>{data.competitorName}</div>
              <div>Savings</div>
            </div>
            {data.pricingItems.map((item) => (
              <div
                key={item.item}
                className="grid grid-cols-4 gap-4 px-6 py-4 text-sm text-[#344D5A]"
              >
                <div className="font-semibold text-[#0B2C3F]">{item.item}</div>
                <div className="font-semibold text-[#0B80A7]">{item.schoolKits}</div>
                <div>{item.retail}</div>
                <div className="font-semibold text-[#1F6D57]">
                  {formatDifferencePercent(item.schoolKits, item.retail)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {data.pricingItems.map((item) => (
              <div key={item.item} className="rounded-2xl border border-[#E3EEF4] bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#79909E]">
                  Grade bundle
                </div>
                <div className="mt-2 text-lg font-semibold text-[#0B2C3F]">{item.item}</div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#344D5A]">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[#9AAAB4]">School Kits</div>
                    <div className="mt-1 text-base font-semibold text-[#0B80A7]">{item.schoolKits}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[#9AAAB4]">{data.competitorName}</div>
                    <div className="mt-1 text-base font-semibold text-[#0B2C3F]">{item.retail}</div>
                  </div>
                  <div className="col-span-2 rounded-xl bg-[#DDF3EA] px-3 py-2 text-sm font-semibold text-[#1F6D57]">
                    Savings {formatDifferencePercent(item.schoolKits, item.retail)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#6B7E8A]">
            No hidden fees. No markups added without visibility.
          </p>
        </div>
      </section>

      <section id="reporting" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-2 text-3xl font-semibold">{data.reportingTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#4C616E]">
              {data.reportingDescription}
            </p>
          </div>
          <div className="rounded-full bg-[#DDF3EA] px-4 py-2 text-xs font-semibold text-[#1F6D57]">
            Reporting access depends on participation.
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {data.reportingItems.map((item) => (
            <div key={item} className="rounded-2xl border border-[#E3EEF4] bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B80A7]">
                Preview
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#0B2C3F]">{item}</h3>
              <p className="mt-2 text-sm text-[#4C616E]">
                Snapshot view to help you understand adoption at a glance.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#6B7E8A]">
          Reporting access and level of detail depend on how your school or PTA chooses to
          participate.
        </p>
      </section>

      <section
        id="next-step"
        className="relative overflow-hidden bg-[#0B2C3F] px-6 py-16 text-white"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#F9D27D] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#0B80A7] blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="mt-3 text-3xl font-semibold">{data.nextStepTitle}</h2>
            <p className="mt-4 max-w-xl text-sm text-[#D7E5ED]">
              {data.nextStepDescription}
            </p>
            <p className="mt-3 text-xs text-[#A9C7D6]">{data.nextStepNote}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ContactModalCta
              triggerLabel={data.ctaPrimary.label}
              schoolName={data.schoolName}
              schoolSlug={data.schoolSlug}
            />
            <a
              href={data.ctaSecondary.href}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {data.ctaSecondary.label}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
