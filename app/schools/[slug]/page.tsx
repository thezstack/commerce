import SchoolRequestActions from 'components/schools/school-request-actions';
import { getProductsByIds } from 'lib/shopify';
import { getSchoolBySlug } from 'lib/schools';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type SchoolPageParams = {
  params: Promise<{ slug: string }>;
};

const formatPrice = (amount: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(amount));

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

  const source = school.offerings?.length > 0 ? school.offerings : school.grades;
  const productIds = Array.from(
    new Set(source.flatMap((item) => (item.shopifyProductId ? [item.shopifyProductId] : [])))
  );
  const products = productIds.length > 0 ? await getProductsByIds(productIds) : [];
  const hasProducts = products.length > 0;
  const location = [school.city, school.state].filter(Boolean).join(', ');
  const isOfficialSchoolKit = school.isFulfilledBySchoolKits;
  const heroTitle = `${school.name} kits`;
  const heroDescription = hasProducts
    ? isOfficialSchoolKit
      ? `We use ${school.name}'s official supply lists, then pack each grade as one kit. Pick your child's grade below.`
      : `Pick an available grade kit below. You can review the supplies before adding it to your cart.`
    : `Kits for this school are not available to order online yet. Send a quick request and we'll review this school.`;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <Link
          href="/schools"
          className="inline-flex text-sm font-semibold text-[#0B80A7] hover:underline"
        >
          Back to school search
        </Link>
      </div>

      <section className="border-y border-[#D9EEF4] bg-[#F4FDFF]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-8 lg:py-8">
          <div className="max-w-3xl">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {school.logoUrl ? (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#D9EEF4] bg-white p-2 shadow-sm sm:h-16 sm:w-16">
                    <img
                      src={school.logoUrl}
                      alt={`${school.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : null}
                <p className="text-xs font-bold uppercase text-[#0B80A7]">
                  {isOfficialSchoolKit ? 'Fulfilled by School Kits' : 'School kit page'}
                </p>
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-[42px]">
                  {heroTitle}
                </h1>
                <p className="mt-2 text-sm font-semibold text-[#315565] sm:text-base">
                  {location || 'School Kits'}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#315565] sm:text-base sm:leading-7">
              {heroDescription}
            </p>

            <p className="mt-4 text-sm font-semibold text-[#102A33]">
              One kit covers one student for one grade.
            </p>
          </div>

          {hasProducts ? (
            <div className="hidden self-start rounded-lg border border-[#B8DDE7] bg-white p-4 shadow-sm sm:p-5 md:block">
              <p className="text-sm font-bold uppercase text-[#0B80A7]">Ordering note</p>
              <h2 className="mt-1.5 text-xl font-bold text-black sm:text-2xl">
                Buying for siblings?
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Add each child&apos;s grade kit to the same cart before checkout.
              </p>
              <a
                href="#grade-kits"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#0B80A7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#096B8C]"
              >
                View grade kits
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        <section id="grade-kits">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-black">
                {hasProducts ? 'Choose a grade' : 'Request this school'}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {hasProducts
                  ? 'Tap a kit to see the supplies and order.'
                  : 'Tell us who you are and we will send this request to our team.'}
              </p>
            </div>
          </div>

          {hasProducts ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map((product) => {
                const price = product.priceRange.minVariantPrice.amount;
                const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount;
                const isOnSale = compareAtPrice && Number(compareAtPrice) > Number(price);

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.handle}`}
                    className="group flex min-h-32 flex-col justify-between rounded-lg border border-[#D9EEF4] bg-white p-4 shadow-sm transition hover:border-[#0B80A7] hover:shadow-md sm:min-h-36 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {isOnSale ? (
                          <p className="mb-2 inline-flex rounded-full bg-[#E6F6FB] px-3 py-1 text-xs font-bold text-[#0B80A7]">
                            Sale
                          </p>
                        ) : null}
                        <h3 className="text-lg font-bold leading-tight text-black sm:text-xl">
                          {product.title}
                        </h3>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xl font-bold text-[#0B80A7] sm:text-2xl">
                          {formatPrice(price)}
                        </p>
                        {isOnSale ? (
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(compareAtPrice)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-5 inline-flex items-center text-sm font-bold text-[#0B80A7]">
                      Order this kit
                      <ArrowRight
                        className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#D9EEF4] bg-white px-6 py-10 text-center">
              <h2 className="text-2xl font-semibold text-black">Kits are not online yet</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                Kits for this school are not available to order online right now. If you would like
                this school reviewed, send a quick request below.
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
