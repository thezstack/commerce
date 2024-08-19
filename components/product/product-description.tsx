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
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{product.collection}</h2>
      <div className="border-t border-[#E5E5E5] my-6"></div>

      <div className="flex items-center mb-6">

        <div className={`text-3xl font-bold ${isOnSale ? 'text-red-600' : 'text-blue-600'}`}>
          <Price
            amount={price.toString()}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>

        {isOnSale && compareAtPrice && (
          <div className="ml-2 text-lg text-gray-500 line-through">
            <Price
              amount={compareAtPrice.toString()}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
        )}
        {isOnSale && (
          <div className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
            Sale
          </div>
        )}
      </div>
      <div className="border-t border-[#E5E5E5] my-6"></div>

      <VariantSelector options={product.options} variants={product.variants} />
      <Suspense>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
    </div>
  );
}