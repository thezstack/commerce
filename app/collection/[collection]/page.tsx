import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import ProductGridItems from 'components/layout/product-grid-items';

//export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: collectionHandle } = await params;
  const collection = await getCollection(collectionHandle);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: collectionHandle } = await params;

  const collection = await getCollection(collectionHandle);
  const products = await getCollectionProducts({
    collection: collectionHandle,
    sortKey: 'COLLECTION_DEFAULT'
  });

  if (!collection) return notFound();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 shadow-md">
        <div className="flex flex-col items-center justify-between p-6 md:flex-row md:p-8">
          <div className="mb-4 flex items-center md:mb-0">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="max-w-md text-sm text-gray-600 md:text-base">
                  {collection.description}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            {collection.image ? (
              <div className="relative mr-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-32 md:w-32">
                <Image
                  src={collection.image.src}
                  alt={collection.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="mr-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg md:h-32 md:w-32">
                <span className="text-xl text-gray-500">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {products.length === 0 ? (
          <p className="py-3 text-center text-lg">{`No products found in this collection`}</p>
        ) : (
          <ProductGridItems products={products} />
        )}
      </div>
    </section>
  );
}
