// import Card from 'components/product/card';
// import { Product } from 'lib/shopify/types';
// import Link from 'next/link';

// export default function ProductGridItems({ products }: { products: Product[] }) {
//   console.log(products);
//   return (
//     <>
//       {products.map((product) => (
//           <Link className="relative inline-block" href={`/product/${product.handle}`}>
//           <Card product={product} />

//           </Link>
//       ))}
//     </>
//   );
// }

// import Card from 'components/product/card';
// import { Product } from 'lib/shopify/types';
// import Link from 'next/link';

// export default function ProductGridItems({ products }: { products: Product[] }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//       {products.map((product) => (
//         <Link key={product.id} href={`/product/${product.handle}`} className="block">
//           <Card product={product} />
//         </Link>
//       ))}
//     </div>
//   );
// }

import Card from 'components/product/card';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.handle}`} className="block">
          <Card product={product} />
        </Link>
      ))}
    </div>
  );
}