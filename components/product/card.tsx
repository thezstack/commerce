import { Product } from 'lib/shopify/types';
import React from 'react';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { title, priceRange, compareAtPriceRange } = product;
  const price = parseFloat(priceRange.minVariantPrice.amount);
  const compareAtPrice = compareAtPriceRange?.minVariantPrice?.amount 
    ? parseFloat(compareAtPriceRange.minVariantPrice.amount)
    : null;
  
  const isOnSale = compareAtPrice !== null && compareAtPrice > price;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden relative p-4 sm:p-6">
      {isOnSale && (
        <div className="absolute top-0 right-0 bg-[#0B80A7] text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-bl-3xl">
          SALE
        </div>
      )}
      <h3 className="text-[#1B1B1B] font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-2 sm:mb-4 pr-12 sm:pr-16">
        {title}
      </h3>
      <div className="flex flex-col items-center">
        <span className="text-[#0B80A7] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">
          ${price.toFixed(2)}
        </span>
        {isOnSale && compareAtPrice !== null && (
          <span className="text-gray-400 line-through text-sm sm:text-base md:text-lg lg:text-xl">
            ${compareAtPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;