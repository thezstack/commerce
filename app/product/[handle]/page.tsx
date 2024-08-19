
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
export const runtime = 'edge';

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
    image: product.featuredImage.url,
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
 <div className="mx-auto max-w-screen-2xl px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 rounded-lg bg-gradient-to-br from-blue-100 to-white p-6">
        <div className="w-full lg:w-1/2">
          <Gallery
            images={product.images.map((image: Image) => ({
              src: image.url,
              altText: image.altText
            }))}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <ProductDescription product={product} />
        </div>
      </div>
      <div className="mt-8 rounded-lg bg-white p-6">
        <h3 className="text-2xl font-bold mb-4 text-[#344054]">School Kit Contents</h3>
        <p>Please note, this kit contains majority of but not all teacher required items. 
        </p>
        <div className="border-t border-[#E5E5E5] my-6"></div>
          
        {product.descriptionHtml && (
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.descriptionHtml}
          />
        )}
      </div>
    </div>
    </>
  );
}
