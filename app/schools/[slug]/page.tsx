import ProductGridItems from 'components/layout/product-grid-items';
import SchoolRequestActions from 'components/schools/school-request-actions';
import { getProductsByIds } from 'lib/shopify';
import { getSchoolBySlug } from 'lib/schools';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type SchoolPageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SchoolPageParams): Promise<Metadata> {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);

  if (!school) {
    return {
      title: 'School Not Found'
    };
  }

  const location = [school.city, school.state].filter(Boolean).join(', ');

  return {
    title: `${school.name} | School Kits`,
    description: location
      ? `Find available school kits for ${school.name} in ${location}.`
      : `Find available school kits for ${school.name}.`
  };
}

export default async function SchoolDetailPage({ params }: SchoolPageParams) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const productIds = Array.from(
    new Set(school.grades.flatMap((grade) => (grade.shopifyProductId ? [grade.shopifyProductId] : [])))
  );
  const products = productIds.length > 0 ? await getProductsByIds(productIds) : [];
  const location = [school.city, school.state].filter(Boolean).join(', ');

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <Link href="/schools" className="text-sm font-medium text-[#0B80A7] hover:underline">
          Back to school search
        </Link>

        <section className="mt-5 rounded-[2rem] bg-[#F4FDFF] px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0B80A7]">School</p>
            <div className="mt-3 flex items-start gap-3 sm:items-center sm:gap-4">
              {school.logoUrl ? (
                <img
                  src={school.logoUrl}
                  alt={`${school.name} logo`}
                  className="h-14 w-14 shrink-0 rounded-full border border-[#D9EEF4] bg-white object-contain p-2 sm:h-20 sm:w-20"
                />
              ) : null}
              <h1 className="min-w-0 break-words text-3xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
                {school.name}
              </h1>
            </div>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {location || 'School record found in the School Kits catalog.'}
            </p>
          </div>
        </section>

        <section className="mt-10">
          {products.length > 0 ? (
            <ProductGridItems products={products} />
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-[#D9EEF4] bg-white px-6 py-10 text-center">
              <h2 className="text-2xl font-semibold text-black">Kits are not online yet</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                We found this school in our database, but kits are not currently available to order online.
                If you want us to review this school, send a request with one click below.
              </p>
              <SchoolRequestActions
                schoolName={school.name}
                schoolSlug={school.slug ?? slug}
                context="kits_unavailable"
              />
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/schools"
                  className="rounded-full border border-[#D9EEF4] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#F8FCFD]"
                >
                  Search again
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
