import Card from 'components/product/card';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  console.log(products);
  return (
    <>
      {products.map((product) => (
          <Link className="relative inline-block" href={`/product/${product.handle}`}>
          <Card product={product} />

          </Link>
      ))}
    </>
  );
}
