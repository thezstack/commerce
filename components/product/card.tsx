import { Product } from 'lib/shopify/types';
import React from 'react';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { title, priceRange, compareAtPriceRange } = product;
  const price = parseFloat(priceRange.minVariantPrice.amount);
  const compareAtPrice = compareAtPriceRange?.minVariantPrice.amount 
    ? parseFloat(compareAtPriceRange.minVariantPrice.amount)
    : null;
  const isOnSale = compareAtPrice && compareAtPrice > price;

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden relative p-6">
      {isOnSale && (
        <div className="absolute top-0 right-0 bg-[#0B80A7] text-white px-4 py-2 text-sm font-bold rounded-bl-3xl">
          SALE
        </div>
      )}
      <h3 className="text-[#1B1B1B] font-semibold text-2xl sm:text-3xl lg:text-[44px] leading-[110%] lg:leading-[48.4px] mb-4 pr-16">
        {title}
      </h3>
      <div className="flex flex-col items-center">
        <span className="text-[#0B80A7] font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">
          ${price.toFixed(2)}
        </span>
        {isOnSale && (
          <span className="text-gray-400 line-through text-xl sm:text-2xl lg:text-3xl">
            ${compareAtPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;