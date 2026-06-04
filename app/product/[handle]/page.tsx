import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDescription } from 'components/product/product-description';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProductSeo } from 'lib/product-context';
import { getProduct } from 'lib/shopify';
export const revalidate = 60;
export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
  const seo = getProductSeo(product);

  return {
    title: seo.title,
    description: seo.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      ...(url
        ? {
            images: [
              {
                url,
                width,
                height,
                alt: alt || seo.title
              }
            ]
          }
        : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      ...(url
        ? {
            images: [
              {
                url,
                width,
                height,
                alt: alt || seo.title
              }
            ]
          }
        : {})
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return notFound();

  const seo = getProductSeo(product);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: seo.title,
    description: seo.description,
    image: product.featuredImage?.url || '',
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:py-8">
        <div className="rounded-lg bg-gradient-to-br from-blue-100 to-white p-6 sm:p-8">
          <div className="mx-auto max-w-2xl">
            <ProductDescription product={product} />
          </div>
        </div>
        <div className="mt-6 rounded-lg bg-white p-6 sm:mt-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-[#344054]">Included supplies</h3>
            <p className="mt-2 text-sm leading-6 text-[#475467]">
              Includes the classroom supplies requested for this grade.
            </p>
          </div>
          <div className="my-6 border-t border-[#E5E5E5]"></div>
          {product.descriptionHtml && (
            <Prose
              className="mb-6 text-sm leading-tight text-gray-700"
              html={product.descriptionHtml}
            />
          )}
        </div>
      </div>
    </>
  );
}
