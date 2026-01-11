import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ContactModalCta from 'components/qr-landing/contact-modal-cta';
import SocialProof from 'components/qr-landing/social-proof';
import { getQrLandingData } from 'lib/qr-landing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PricingMobileList from 'components/qr-landing/pricing-mobile-list';
import ReportingViewMore from 'components/qr-landing/reporting-view-more';

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

const reportPreviewOrders = [
  { id: '1924', date: '8/5/2025', student: 'Natalie Smith', paid: '$240.00', quote: '$179.00', qty: '1', fee: '7.83', net: '$54.17' },
  { id: '1923', date: '8/5/2025', student: 'Ethan Johnson', paid: '$179.00', quote: '$87.00', qty: '1', fee: '3.75', net: '$19.80' },
  { id: '1918', date: '8/5/2025', student: 'Ava Brooks', paid: '$129.00', quote: '$128.00', qty: '1', fee: '4.32', net: '$27.68' },
  { id: '1913', date: '8/3/2025', student: 'Mason Thompson', paid: '$169.00', quote: '$94.00', qty: '1', fee: '4.22', net: '$27.88' },
  { id: '1908', date: '8/1/2025', student: 'Logan White', paid: '$126.00', quote: '$89.00', qty: '1', fee: '3.91', net: '$27.82' }
];


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
            <p className="mt-3 text-sm text-[#4C616E]">
              See how schools like Houston Quran Academy simplify supply season in ~2 minutes.
            </p>
            <p className="mt-4 text-base text-[#345060] md:text-lg">{data.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#walkthrough-start"
                className="rounded-full bg-[#0B80A7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200/60 transition hover:-translate-y-0.5"
              >
                Start walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="walkthrough-start" className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
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
      </section>

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
          <PricingMobileList items={data.pricingItems} competitorName={data.competitorName} />
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
        </div>
        <div className="mt-8 space-y-6">
          <Card className="border-[#E3EEF4] bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0B2C3F]">Profit snapshot</CardTitle>
              <p className="text-xs text-[#4C616E]">Net-to-school highlights with no extra reporting work.</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[#EEF3F6] bg-[#F7FBFD] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A8D99]">Net to school</p>
                  <p className="mt-2 text-2xl font-semibold text-[#0B2C3F]">$12,480</p>
                  <p className="mt-1 text-xs text-[#4C616E]">After fees, last 30 days</p>
                </div>
                <div className="rounded-2xl border border-[#EEF3F6] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A8D99]">Avg. net per kit</p>
                  <p className="mt-2 text-2xl font-semibold text-[#0B2C3F]">$18.70</p>
                  <p className="mt-1 text-xs text-[#4C616E]">Across active grades</p>
                </div>
                <div className="rounded-2xl border border-[#EEF3F6] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A8D99]">Top grade</p>
                  <p className="mt-2 text-2xl font-semibold text-[#0B2C3F]">Grade 5</p>
                  <p className="mt-1 text-xs text-[#4C616E]">$2,940 net to school</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#6B7E8A]">Snapshot cards summarize profit without extra reporting work.</p>
            </CardContent>
          </Card>

          <Card className="border-[#E3EEF4] bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0B2C3F]">Recent orders</CardTitle>
              <p className="text-xs text-[#4C616E]">Track participation, order value, and net-to-school totals.</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="hidden overflow-hidden rounded-2xl border border-[#EEF3F6] md:block">
                <div className="grid grid-cols-7 gap-4 border-b border-[#EEF3F6] bg-[#F7FBFD] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A8D99]">
                  <div>Order #</div>
                  <div>Date</div>
                  <div>Student</div>
                  <div>Price paid</div>
                  <div>Quote price</div>
                  <div>Qty</div>
                  <div>Net</div>
                </div>
                {reportPreviewOrders.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-7 gap-4 border-b border-[#F4F7F9] px-4 py-3 text-sm text-[#344D5A]"
                  >
                    <div className="font-semibold text-[#0B2C3F]">{row.id}</div>
                    <div className="text-[#6B7E8A]">{row.date}</div>
                    <div>{row.student}</div>
                    <div>{row.paid}</div>
                    <div className="text-[#6B7E8A]">{row.quote}</div>
                    <div>{row.qty}</div>
                    <div className="font-semibold text-[#1F6D57]">{row.net}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 md:hidden">
                {reportPreviewOrders.slice(0, 3).map((row) => (
                  <div key={row.id} className="rounded-2xl border border-[#EEF3F6] bg-[#F7FBFD] p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#7A8D99]">
                      <span>Order #{row.id}</span>
                      <span>{row.date}</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[#0B2C3F]">{row.student}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#344D5A]">
                      <div className="rounded-lg bg-white px-2 py-1">
                        <span className="text-[#7A8D99]">Paid</span>
                        <span className="ml-2 font-semibold">{row.paid}</span>
                      </div>
                      <div className="rounded-lg bg-white px-2 py-1">
                        <span className="text-[#7A8D99]">Quote</span>
                        <span className="ml-2 font-semibold">{row.quote}</span>
                      </div>
                      <div className="rounded-lg bg-white px-2 py-1">
                        <span className="text-[#7A8D99]">Qty</span>
                        <span className="ml-2 font-semibold">{row.qty}</span>
                      </div>
                      <div className="rounded-lg bg-white px-2 py-1">
                        <span className="text-[#7A8D99]">Net</span>
                        <span className="ml-2 font-semibold text-[#1F6D57]">{row.net}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#6B7E8A]">Showing recent records with fee and net-to-school breakdown.</p>
              <ReportingViewMore totalOrders="5,359" monthlySales="$4.2k" />
            </CardContent>
          </Card>
        </div>
        <p className="mt-4 text-xs text-[#6B7E8A]">
          No additional setup is required on your end.
        </p>
      </section>

      <SocialProof
        title={data.socialProofTitle}
        subtitle={data.socialProofSubtitle}
        logos={data.socialProofLogos}
        testimonials={data.socialProofTestimonials}
      />

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
