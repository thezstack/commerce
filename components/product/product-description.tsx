import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';
export function ProductDescription({ product }: { product: Product }) {
  console.log(product);
  return (
    <>
      {/* <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
  <Suspense>
  <AddToCart variants={product.variants} availableForSale={product.availableForSale} />

  </Suspense> */}
   <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
       <h2 className="text-xl text-gray-600 mb-4">{product.collection}</h2>
      <div className="flex items-center mb-6">
        <div className="text-3xl font-bold text-blue-600">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        <div className="ml-2 text-lg text-gray-500 line-through">
          <Price
           amount={product.priceRange.maxVariantPrice.amount}
           currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <Suspense>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
    </div>
    </>
  );
}
