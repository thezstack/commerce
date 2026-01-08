export type PricingComparisonItem = {
  item: string;
  schoolKits: string;
  retail: string;
};

export type HowItWorksStep = {
  title: string;
  body: string;
};

export type QrLandingData = {
  schoolName: string;
  schoolSlug: string;
  heroTitle: string;
  heroDescription: string;
  heroChecklist: string[];
  howItWorksTitle: string;
  howItWorksDescription: string;
  howItWorksSteps: HowItWorksStep[];
  pricingTitle: string;
  pricingDescription: string;
  pricingItems: PricingComparisonItem[];
  pricingNote: string;
  reportingTitle: string;
  reportingDescription: string;
  reportingItems: string[];
  nextStepTitle: string;
  nextStepDescription: string;
  nextStepNote: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  heroBadge: string;
};

const fallbackPricing: PricingComparisonItem[] = [
  { item: 'Grade 3 core supplies', schoolKits: '$45', retail: '$52' },
  { item: 'Grade 5 core supplies', schoolKits: '$57', retail: '$64' },
  { item: 'Middle school essentials', schoolKits: '$73', retail: '$81' }
];

const fallbackHowItWorksSteps: HowItWorksStep[] = [
  {
    title: 'Supply lists stay school-approved',
    body: 'Schools provide or approve grade-level supply lists. Nothing is changed without alignment.'
  },
  {
    title: 'Kits are optional for families',
    body: 'Families choose whether to purchase pre-packaged kits. No mandate or pressure.'
  },
  {
    title: 'Fulfillment handled end-to-end',
    body: 'School Kits manages sourcing, packing, and delivery before the school year begins.'
  }
];

const fallbackReporting = [
  'Orders by grade',
  'Participation overview',
  'Optional fundraising summaries'
];

const buildDefaultCtaPrimary = (schoolSlug: string) => ({
  label: 'Request a 15-minute overview',
  href: `/contact?school=${encodeURIComponent(schoolSlug)}&persona=admin_pta`
});
const defaultCtaSecondary = { label: 'Contact School Kits', href: 'mailto:hello@schoolkits.org' };

const titleCase = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ');

const formatSchoolName = (slug: string) => titleCase(slug.replace(/[-_]+/g, ' '));

const toPricingItems = (items: unknown): PricingComparisonItem[] => {
  if (!Array.isArray(items)) return fallbackPricing;
  const mapped = items
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, string>;
      const entry = {
        item: record.item || record.name || '',
        schoolKits: record.schoolKits || record.school_kits || record.ours || '',
        retail: record.retail || record.competitor || record.market || ''
      };
      if (!entry.item || !entry.schoolKits || !entry.retail) return null;
      return entry;
    })
    .filter(Boolean) as PricingComparisonItem[];
  return mapped.length ? mapped : fallbackPricing;
};

const toReportingItems = (items: unknown): string[] => {
  if (!Array.isArray(items)) return fallbackReporting;
  const mapped = items.filter((item) => typeof item === 'string') as string[];
  return mapped.length ? mapped : fallbackReporting;
};

const toHowItWorksSteps = (steps: unknown): HowItWorksStep[] => {
  if (!Array.isArray(steps)) return fallbackHowItWorksSteps;
  const mapped = steps
    .map((step) => {
      if (!step || typeof step !== 'object') return null;
      const record = step as Record<string, string>;
      const entry = {
        title: record.title || record.heading || '',
        body: record.body || record.description || ''
      };
      if (!entry.title || !entry.body) return null;
      return entry;
    })
    .filter(Boolean) as HowItWorksStep[];
  return mapped.length ? mapped : fallbackHowItWorksSteps;
};

const normalizePayload = (payload: unknown, schoolSlug: string): QrLandingData => {
  const record = (payload ?? {}) as Record<string, unknown>;
  const schoolRecord = (record.school ?? {}) as Record<string, unknown>;
  const schoolName =
    (record.schoolName as string) ||
    (schoolRecord.name as string) ||
    formatSchoolName(schoolSlug);

  const heroTitle =
    (record.heroTitle as string) || `A quick walkthrough for ${schoolName} admins & PTAs`;
  const heroDescription =
    (record.heroDescription as string) ||
    'In ~2 minutes, see how School Kits keeps supply lists school-approved, keeps kits optional for families, and removes fulfillment work from your staff.';
  const heroChecklist = Array.isArray(record.heroChecklist)
    ? ((record.heroChecklist as unknown[]).filter((item) => typeof item === 'string') as string[])
    : [
        'What is School Kits?',
        `How does this work for ${schoolName}?`,
        'Is pricing competitive and transparent?',
        'Do we get reporting and visibility?',
        'What is the next low-pressure step?'
      ];

  return {
    schoolName,
    schoolSlug,
    heroTitle,
    heroDescription,
    heroChecklist: heroChecklist.length ? heroChecklist : [
      'What is School Kits?',
      `How does this work for ${schoolName}?`,
      'Is pricing competitive and transparent?',
      'Do we get reporting and visibility?',
      'What is the next low-pressure step?'
    ],
    howItWorksTitle: (record.howItWorksTitle as string) || 'How the program works',
    howItWorksDescription:
      (record.howItWorksDescription as string) ||
      'Simple, school-controlled, and designed to remove administrative burden.',
    howItWorksSteps: toHowItWorksSteps(record.howItWorksSteps ?? record.steps),
    pricingTitle: (record.pricingTitle as string) || 'Pricing transparency',
    pricingDescription:
      (record.pricingDescription as string) ||
      'Families can view an item-by-item breakdown and compare pricing against major retailers.',
    pricingItems: toPricingItems(record.pricingItems ?? record.pricing ?? record.comparison),
    pricingNote:
      (record.pricingNote as string) ||
      'Example format shown. Exact pricing is tied to your school-approved supply lists.',
    reportingTitle:
      (record.reportingTitle as string) || 'Administrative visibility and reporting',
    reportingDescription:
      (record.reportingDescription as string) ||
      'Schools and PTAs can get visibility into participation and ordering activity (access depends on how you choose to participate).',
    reportingItems: toReportingItems(record.reportingItems ?? record.reporting),
    nextStepTitle: (record.nextStepTitle as string) || 'Interested in learning more?',
    nextStepDescription:
      (record.nextStepDescription as string) ||
      'If this looks like a fit for your school or parent organization, we are happy to answer questions or walk through details.',
    nextStepNote:
      (record.nextStepNote as string) || 'No obligation. No commitment required.',
    ctaPrimary:
      (record.ctaPrimary as { label: string; href: string }) || buildDefaultCtaPrimary(schoolSlug),
    ctaSecondary: (record.ctaSecondary as { label: string; href: string }) || defaultCtaSecondary,
    heroBadge: (record.heroBadge as string) || 'Admin / PTA walkthrough'
  };
};

export async function getQrLandingData(schoolSlug: string): Promise<QrLandingData | null> {
  const apiBase = process.env.SCHOOL_KITS_QR_LANDING_API;
  if (!apiBase) {
    const mockPayloads: Record<string, Record<string, unknown>> = {
      'houston-quran-academy': {
        schoolName: 'Houston Quran Academy',
        pricingItems: [
          { item: 'Grade 3 core supplies', schoolKits: '$45', retail: '$52' },
          { item: 'Grade 5 core supplies', schoolKits: '$57', retail: '$64' },
          { item: 'Middle school essentials', schoolKits: '$73', retail: '$81' }
        ],
        reportingItems: ['Participation overview', 'Orders by grade', 'Delivery roster']
      },
      'ilm-academy': {
        schoolName: 'ILM Academy',
        heroBadge: 'Admin / PTA walkthrough',
        pricingItems: [
          { item: 'Elementary core supplies', schoolKits: '$49', retail: '$56' },
          { item: 'Upper elementary essentials', schoolKits: '$59', retail: '$67' },
          { item: 'Middle school essentials', schoolKits: '$73', retail: '$81' }
        ],
        reportingItems: ['Orders by grade', 'Classroom delivery sort list', 'Participation overview']
      },
      'iman-academy': {
        schoolName: 'Iman Academy',
        pricingItems: [
          { item: 'Grade 1 core supplies', schoolKits: '$39', retail: '$46' },
          { item: 'Grade 3 core supplies', schoolKits: '$45', retail: '$52' },
          { item: 'Grade 6 core supplies', schoolKits: '$62', retail: '$70' }
        ],
        reportingItems: ['Orders by grade', 'Participation overview', 'Optional fundraising summary']
      }
    };

    const payload = mockPayloads[schoolSlug] ?? null;
    return normalizePayload(payload, schoolSlug);
  }

  const url = `${apiBase.replace(/\/$/, '')}/${encodeURIComponent(schoolSlug)}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (process.env.SCHOOL_KITS_QR_LANDING_TOKEN) {
    headers.Authorization = `Bearer ${process.env.SCHOOL_KITS_QR_LANDING_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers, next: { revalidate: 300 } });
    if (response.status === 404) return null;
    if (!response.ok) {
      return normalizePayload(null, schoolSlug);
    }
    const payload = await response.json();
    return normalizePayload(payload, schoolSlug);
  } catch (error) {
    return normalizePayload(null, schoolSlug);
  }
}
