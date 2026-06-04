import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { getProductContext } from 'lib/product-context';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const price = parseFloat(product.priceRange.maxVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const isOnSale = compareAtPrice !== null && compareAtPrice > price;
  const { gradeLabel, schoolName } = getProductContext(product);

  // Calculate total inventory across all variants
  const totalInventory = product.variants.reduce((sum, variant) => {
    return sum + (variant.quantityAvailable || 0);
  }, 0);

  return (
    <div className="flex flex-col">
      {schoolName ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0B80A7]">
          {schoolName}
        </p>
      ) : null}
      <h1 className="text-2xl font-bold leading-tight text-[#101828] sm:text-4xl">
        {gradeLabel} School Kit
      </h1>
      {schoolName ? (
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#475467] sm:mt-3 sm:text-base sm:leading-7">
          Official {schoolName} {gradeLabel.toLowerCase()} supply list.
        </p>
      ) : null}
      {/* Inventory Status Display */}
      <div className="mt-4 sm:mt-5">
        {totalInventory > 0 ? (
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium">
              {totalInventory < 5 ? (
                <span className="text-orange-600">
                  Only {totalInventory} left in stock - order soon
                </span>
              ) : (
                <span className="text-green-600">In stock: {totalInventory} kits available</span>
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
      <div className="my-4 border-t border-[#E5E5E5] sm:my-6"></div>

      <div className="mb-4 sm:mb-6">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
          <div
            className={`text-3xl font-bold sm:text-4xl ${
              isOnSale ? 'text-[#0B80A7]' : 'text-black'
            }`}
          >
            <Price
              amount={price.toString()}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              currencyCodeClassName="sr-only"
            />
          </div>

          {isOnSale && compareAtPrice && (
            <div className="text-lg text-gray-500">
              <span className="mr-1 text-sm font-medium text-gray-500">Was</span>
              <Price
                className="inline line-through"
                amount={compareAtPrice.toString()}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                currencyCodeClassName="sr-only"
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

      <div className="my-4 border-t border-[#E5E5E5] sm:my-6"></div>

      <VariantSelector options={product.options} variants={product.variants} />
      <Suspense>
        <AddToCart
          variants={product.variants}
          availableForSale={totalInventory > 0 && product.availableForSale}
          productTitle={product.title}
          productHandle={product.handle}
          schoolName={product.collection}
        />
      </Suspense>
    </div>
  );
}
