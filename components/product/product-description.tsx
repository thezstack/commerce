import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const price = parseFloat(product.priceRange.maxVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const isOnSale = compareAtPrice !== null && compareAtPrice > price;
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
      <h2 className="mb-4 text-xl text-gray-600">{product.collection}</h2>
      <div className="my-6 border-t border-[#E5E5E5]"></div>

      <div className="mb-6 flex items-center">
        <div className={`text-3xl font-bold ${isOnSale ? 'text-[#0B80A7]' : 'text-black'}`}>
          <Price
            amount={price.toString()}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>

        {isOnSale && compareAtPrice && (
          <>
            <div className="ml-2 text-lg text-gray-500 line-through">
              <Price
                amount={compareAtPrice.toString()}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              />
            </div>
            <div className="ml-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
              Sale
            </div>
          </>
        )}
      </div>
      <div className="my-6 border-t border-[#E5E5E5]"></div>

      <VariantSelector options={product.options} variants={product.variants} />
      <Suspense>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
    </div>
  );
}
