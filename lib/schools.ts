type SchoolSearchApiRecord = {
  id: number;
  name: string;
  slug: string | null;
  city: string | null;
  state: string | null;
  logoUrl: string | null;
  gradeCount: number;
  hasProducts: boolean;
  status: 'available' | 'limited' | 'coming_soon';
};

type SchoolDetailApiRecord = SchoolSearchApiRecord & {
  address: string | null;
  zipCode: string | null;
  isFulfilledBySchoolKits: boolean;
  grades: Array<{
    id: number;
    name: string;
    shopifyProductId: string | null;
    shopifyVariantId: string | null;
    hasProduct: boolean;
  }>;
};

type SchoolSearchApiResponse = {
  success: boolean;
  data: SchoolSearchApiRecord[];
};

type SchoolDetailApiResponse = {
  success: boolean;
  data: SchoolDetailApiRecord;
};

export type SchoolSearchResult = SchoolSearchApiRecord;
export type SchoolDetail = SchoolDetailApiRecord;

const getCoreApiBase = () => process.env.CORE_API_URL?.replace(/\/$/, '') ?? '';

export async function searchSchools(query: string): Promise<SchoolSearchResult[]> {
  const trimmedQuery = query.trim();
  const apiBase = getCoreApiBase();

  if (!trimmedQuery || !apiBase) {
    return [];
  }

  const url = new URL(`${apiBase}/storefront/schools/search`);
  url.searchParams.set('query', trimmedQuery);

  const response = await fetch(url, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as SchoolSearchApiResponse;
  return payload.success ? payload.data.filter((school) => school.slug) : [];
}

export async function getSchoolIndex(): Promise<SchoolSearchResult[]> {
  const apiBase = getCoreApiBase();

  if (!apiBase) {
    return [];
  }

  const response = await fetch(`${apiBase}/storefront/schools/index`, {
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as SchoolSearchApiResponse;
  return payload.success ? payload.data.filter((school) => school.slug) : [];
}

export async function getSchoolBySlug(slug: string): Promise<SchoolDetail | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  const apiBase = getCoreApiBase();

  if (!normalizedSlug || !apiBase) {
    return null;
  }

  const response = await fetch(`${apiBase}/storefront/schools/slug/${encodeURIComponent(normalizedSlug)}`, {
    next: { revalidate: 60 }
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as SchoolDetailApiResponse;
  return payload.success ? payload.data : null;
}
