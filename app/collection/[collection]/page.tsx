import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const collection = await getCollection(params.collection);
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  
  if (!collection) return notFound();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
          <div className="flex items-center mb-4 md:mb-0">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="text-sm md:text-base text-gray-600 max-w-md">
                  {collection.description}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
          {collection.image ? (
              <div className="w-24 h-24 md:w-32 md:h-32 mr-6 relative overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image
                  src={collection.image.src}
                  alt={collection.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 mr-6 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-gray-500 text-xl">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        {products.length === 0 ? (
          <p className="py-3 text-lg text-center">{`No products found in this collection`}</p>
        ) : (
          <ProductGridItems products={products} />
        )}
      </div>
    </section>
  );
}