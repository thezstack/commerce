// import { Product } from 'lib/shopify/types';
// import React from 'react';

// interface CardProps {
//   product: Product;
// }

// const Card: React.FC<CardProps> = ({ product }) => {
//   const { title, priceRange } = product;
//   const salePrice = parseFloat(priceRange.maxVariantPrice.amount);
//   const originalPrice = salePrice + 10; // This is just an example, adjust as needed

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="relative">
//         <div className="absolute top-0 right-0 bg-[#0B80A7] text-white px-2 py-1 text-sm font-semibold rounded-bl">
//           SALE
//         </div>
//         <div className="p-4">
//           <h3 className="text-lg font-semibold mb-2">{title}</h3>
//           <div className="flex items-center">
//             <span className="text-[#0B80A7] font-bold text-xl">
//               ${salePrice.toFixed(2)}
//             </span>
//             <span className="ml-2 text-gray-500 line-through">
//               ${originalPrice.toFixed(2)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
// import { Product } from 'lib/shopify/types';
// import React from 'react';

// interface CardProps {
//   product: Product;
// }

// const Card: React.FC<CardProps> = ({ product }) => {
//   const { title, priceRange } = product;
//   const salePrice = parseFloat(priceRange.minVariantPrice.amount);
//   const originalPrice = parseFloat(priceRange.maxVariantPrice.amount);

//   return (
//     <div className="bg-white rounded-3xl shadow-md overflow-hidden relative p-6">
//       <div className="absolute top-0 right-0 bg-[#0B80A7] text-white px-4 py-2 text-sm font-bold rounded-bl-3xl">
//         SALE
//       </div>
//       <h3 className="text-[#1B1B1B] font-semibold text-[1.5rem] sm:text-[2rem] md:text-[2.75rem] leading-[110%] mb-4 pr-16">
//         {title}
//       </h3>
//       <div className="flex items-center">
//         <span className="text-[#0B80A7] font-bold text-3xl mr-3">
//           ${salePrice.toFixed(2)}
//         </span>
//         <span className="text-gray-400 line-through text-xl">
//           ${originalPrice.toFixed(2)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Card;


import { Product } from 'lib/shopify/types';
import React from 'react';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { title, priceRange } = product;
  const salePrice = parseFloat(priceRange.minVariantPrice.amount);
  const originalPrice = parseFloat(priceRange.maxVariantPrice.amount);

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden relative p-6">
      <div className="absolute top-0 right-0 bg-[#0B80A7] text-white px-4 py-2 text-sm font-bold rounded-bl-3xl">
        SALE
      </div>
      <h3 className="text-[#1B1B1B] font-semibold text-2xl sm:text-3xl lg:text-[44px] leading-[110%] lg:leading-[48.4px] mb-4 pr-16">
        {title}
      </h3>
      <div className="flex items-center">
        <span className="text-[#0B80A7] font-bold text-2xl sm:text-3xl lg:text-4xl mr-3">
          ${salePrice.toFixed(2)}
        </span>
        <span className="text-gray-400 line-through text-xl sm:text-2xl lg:text-3xl">
          ${originalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Card;