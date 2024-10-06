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