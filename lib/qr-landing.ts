export type PricingComparisonItem = {
  item: string;
  schoolKits: string;
  retail: string;
};

export type HowItWorksStep = {
  title: string;
  body: string;
};

export type SocialProofLogo = {
  label: string;
  src?: string;
};

export type SocialProofTestimonial = {
  quote: string;
  name: string;
  role: string;
  school: string;
};

export type QrLandingData = {
  schoolName: string;
  schoolSlug: string;
  schoolLogoUrl?: string | null;
  heroTitle: string;
  heroDescription: string;
  heroChecklist: string[];
  socialProofTitle: string;
  socialProofSubtitle: string;
  socialProofLogos: SocialProofLogo[];
  socialProofTestimonials: SocialProofTestimonial[];
  howItWorksTitle: string;
  howItWorksDescription: string;
  howItWorksSteps: HowItWorksStep[];
  pricingTitle: string;
  pricingDescription: string;
  competitorName: string;
  pricingItems: PricingComparisonItem[];
  pricingNote: string;
  hasPricingComparison: boolean;
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

const fallbackSocialProofLogos: SocialProofLogo[] = [
  { label: 'Katy ISD' },
  { label: 'Houston ISD' },
  { label: 'Spring ISD' }
];

const fallbackTestimonials: SocialProofTestimonial[] = [
  {
    quote:
      'SchoolKits made supply season smoother for our staff and easier for families. The program felt low-lift from day one.',
    name: 'Amina R.',
    role: 'PTA President',
    school: 'Partner School'
  },
  {
    quote:
      'We kept full control of our lists and still reduced the back-and-forth with parents. Delivery was organized and on time.',
    name: 'David K.',
    role: 'School Operations',
    school: 'Partner School'
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

const parsePrice = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isNaN(numeric) ? null : numeric;
};

const toPricingItems = (items: unknown): { items: PricingComparisonItem[]; hasValid: boolean } => {
  if (!Array.isArray(items)) return { items: [], hasValid: false };
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
      if (parsePrice(entry.schoolKits) === null || parsePrice(entry.retail) === null) return null;
      return entry;
    })
    .filter(Boolean) as PricingComparisonItem[];
  return { items: mapped, hasValid: mapped.length > 0 };
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
  const schoolLogoUrl =
    (record.schoolLogoUrl as string) ||
    (record.logoUrl as string) ||
    (schoolRecord.logoUrl as string) ||
    (schoolRecord.logo_url as string) ||
    null;

  const heroTitle =
    (record.heroTitle as string) ||
    'Reduce back-to-school supply chaos.';
  const heroDescription =
    (record.heroDescription as string) ||
    'A 2-minute walkthrough of SchoolKits: school-approved lists, optional kits, and end-to-end fulfillment.';
  const heroChecklist = Array.isArray(record.heroChecklist)
    ? ((record.heroChecklist as unknown[]).filter((item) => typeof item === 'string') as string[])
    : [
        'How much staff time does this save?',
        'Do we keep full control of our lists?',
        'Is pricing transparent for families?',
        'What reporting do we get?',
        'What is the lowest-effort next step?'
      ];

  return {
    schoolName,
    schoolSlug,
    schoolLogoUrl,
    heroTitle,
    heroDescription,
    heroChecklist: heroChecklist.length ? heroChecklist : [
      'How much staff time does this save?',
      'Do we keep full control of our lists?',
      'Is pricing transparent for families?',
      'What reporting do we get?',
      'What is the lowest-effort next step?'
    ],
    socialProofTitle:
      (record.socialProofTitle as string) || 'Trusted by school leaders and PTAs',
    socialProofSubtitle:
      (record.socialProofSubtitle as string) ||
      'Partners choose SchoolKits for transparency, low lift, and reliable fulfillment.',
    socialProofLogos: Array.isArray(record.socialProofLogos)
      ? (record.socialProofLogos as SocialProofLogo[])
      : fallbackSocialProofLogos,
    socialProofTestimonials: Array.isArray(record.socialProofTestimonials)
      ? (record.socialProofTestimonials as SocialProofTestimonial[])
      : fallbackTestimonials,
    howItWorksTitle: (record.howItWorksTitle as string) || 'How it works',
    howItWorksDescription:
      (record.howItWorksDescription as string) ||
      'Simple, school-controlled, and designed to remove administrative burden.',
    howItWorksSteps: toHowItWorksSteps(record.howItWorksSteps ?? record.steps),
    ...(() => {
      const { items, hasValid } = toPricingItems(
        record.pricingItems ?? record.pricing ?? record.comparison
      );
      return { pricingItems: items, hasPricingComparison: hasValid };
    })(),
    pricingTitle: (record.pricingTitle as string) || 'Per-grade pricing comparison',
    pricingDescription:
      (record.pricingDescription as string) ||
      'We reviewed your current list and benchmarked it against other providers to show clear, admin-only pricing.',
    competitorName: (record.competitorName as string) || 'Your current provider',
    pricingNote:
      (record.pricingNote as string) ||
      'Admin-only comparison based on school-approved lists and real kit totals.',
    reportingTitle:
      (record.reportingTitle as string) || 'Visibility for admins and PTAs',
    reportingDescription:
      (record.reportingDescription as string) ||
      'A custom dashboard is already set up to surface the metrics you care about, with no extra setup required.',
    reportingItems: toReportingItems(record.reportingItems ?? record.reporting),
    nextStepTitle: (record.nextStepTitle as string) || 'Ready for a quick overview?',
    nextStepDescription:
      (record.nextStepDescription as string) ||
      'If this looks like a fit for your school or parent organization, we can walk through details and answer questions.',
    nextStepNote:
      (record.nextStepNote as string) || 'No obligation. No commitment required.',
    ctaPrimary:
      (record.ctaPrimary as { label: string; href: string }) || buildDefaultCtaPrimary(schoolSlug),
    ctaSecondary: (record.ctaSecondary as { label: string; href: string }) || defaultCtaSecondary,
    heroBadge: (record.heroBadge as string) || 'Admin / PTA walkthrough'
  };
};

export async function getQrLandingData(schoolSlug: string): Promise<QrLandingData | null> {
  const apiBase = process.env.CORE_API_URL
    ? `${process.env.CORE_API_URL.replace(/\/$/, '')}/api/qr-landing`
    : undefined;
  if (!apiBase) {
    const mockPayloads: Record<string, Record<string, unknown>> = {
      'houston-quran-academy': {
        schoolName: 'Houston Quran Academy',
        competitorName: 'Local retailer',
        socialProofLogos: [
          { label: 'Katy ISD' },
          { label: 'Houston ISD' },
          { label: 'Spring ISD' }
        ],
        socialProofTestimonials: [
          {
            quote:
              'The program kept our lists intact and saved hours of follow-up with families. We loved the low-lift rollout.',
            name: 'Amina R.',
            role: 'PTA President',
            school: 'Houston Quran Academy'
          },
          {
            quote:
              'Clear pricing and on-time delivery made this an easy yes for our staff and parents.',
            name: 'David K.',
            role: 'School Operations',
            school: 'Houston Quran Academy'
          }
        ],
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
        competitorName: 'Big box retailer',
        socialProofLogos: [
          { label: 'Katy ISD' },
          { label: 'Houston ISD' },
          { label: 'Spring ISD' }
        ],
        pricingItems: [
          { item: 'Elementary core supplies', schoolKits: '$49', retail: '$56' },
          { item: 'Upper elementary essentials', schoolKits: '$59', retail: '$67' },
          { item: 'Middle school essentials', schoolKits: '$73', retail: '$81' }
        ],
        reportingItems: ['Orders by grade', 'Classroom delivery sort list', 'Participation overview']
      },
      'iman-academy': {
        schoolName: 'Iman Academy',
        competitorName: 'Current vendor',
        socialProofLogos: [
          { label: 'Katy ISD' },
          { label: 'Houston ISD' },
          { label: 'Spring ISD' }
        ],
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
