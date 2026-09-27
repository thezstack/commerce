import { commerceRead } from './commerce-api';

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

type SchoolOffering = {
  id: number;
  name: string;
  listType: string;
  gradeId: number | null;
  gradeName: string | null;
  shopifyProductId: string | null;
  shopifyVariantId: string | null;
  finalPrice: number | null;
  isParentFacing: boolean;
};

type SchoolDetailApiRecord = SchoolSearchApiRecord & {
  address: string | null;
  zipCode: string | null;
  isFulfilledBySchoolKits: boolean;
  offerings: SchoolOffering[];
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
export type { SchoolOffering };

export async function searchSchools(query: string): Promise<SchoolSearchResult[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const response = await commerceRead(
    `/schools/search?query=${encodeURIComponent(trimmedQuery)}`,
    60
  );

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as SchoolSearchApiResponse;
  return payload.success ? payload.data.filter((school) => school.slug) : [];
}

export async function getSchoolIndex(): Promise<SchoolSearchResult[]> {
  const response = await commerceRead('/schools/index', 300);

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as SchoolSearchApiResponse;
  return payload.success ? payload.data.filter((school) => school.slug) : [];
}

export async function getSchoolBySlug(slug: string): Promise<SchoolDetail | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const response = await commerceRead(`/schools/slug/${encodeURIComponent(normalizedSlug)}`, 60);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as SchoolDetailApiResponse;
  return payload.success ? payload.data : null;
}
