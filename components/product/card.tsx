import { Product } from 'lib/shopify/types';
import React from 'react';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { title, priceRange } = product;
  const salePrice = parseFloat(priceRange.maxVariantPrice.amount);
  const originalPrice = salePrice + 10; // This is just an example, adjust as needed

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 right-0 bg-[#0B80A7] text-white px-2 py-1 text-sm font-semibold rounded-bl">
          SALE
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <div className="flex items-center">
            <span className="text-[#0B80A7] font-bold text-xl">
              ${salePrice.toFixed(2)}
            </span>
            <span className="ml-2 text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;