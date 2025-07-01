
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDescription } from 'components/product/product-description';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
export const runtime = 'edge';

export const revalidate = 60; 
export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
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
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="rounded-lg bg-gradient-to-br from-blue-100 to-white p-6">
          <div className="max-w-2xl mx-auto">
            <ProductDescription product={product} />
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-white p-6">
          <h3 className="text-2xl font-bold mb-4 text-[#344054]">School Kit Contents</h3>
          <div className="border-t border-[#E5E5E5] my-6"></div>
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