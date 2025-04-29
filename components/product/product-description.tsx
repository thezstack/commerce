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
  
  // Calculate total inventory across all variants
  const totalInventory = product.variants.reduce((sum, variant) => {
    return sum + (variant.quantityAvailable || 0);
  }, 0);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
      <h2 className="mb-4 text-xl text-gray-600">{product.collection}</h2>
      {/* Inventory Status Display */}
      <div className="mb-4">
        {totalInventory > 0 ? (
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium">
              {totalInventory < 5 ? (
                <span className="text-orange-600">
                  Only {totalInventory} left in stock - order soon
                </span>
              ) : (
                <span className="text-green-600">In stock ({totalInventory} available)</span>
              )}
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
            <p className="text-sm font-medium text-red-600">Out of stock</p>
          </div>
        )}
      </div>
      <div className="my-6 border-t border-[#E5E5E5]"></div>

      <div className="mb-6">
        <div className="flex flex-wrap items-baseline">
          <div className={`text-3xl font-bold ${isOnSale ? 'text-[#0B80A7]' : 'text-black'}`}>
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
        </div>

        {isOnSale && (
          <div className="mt-2">
            <span className="inline-block rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
              Sale
            </span>
          </div>
        )}
      </div>

      <div className="my-6 border-t border-[#E5E5E5]"></div>

      <VariantSelector options={product.options} variants={product.variants} />
      <Suspense>
        <AddToCart variants={product.variants} availableForSale={totalInventory > 0 && product.availableForSale} />
      </Suspense>
    </div>
  );
}