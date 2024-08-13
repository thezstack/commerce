import { getCollections } from 'lib/shopify';

export default async function Stores() {
  const data = await getCollections();

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-center text-2xl font-bold">Select School</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {data.map((collection, index) => (
            <a href={`/collection/${collection.handle}`} className="block">
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white p-6 text-center shadow-lg"
            >
              
                <img
                  src={collection?.image?.src}
                  alt={collection.title}
                  className="mx-auto mb-4 h-16 w-16 object-contain"
                />
                <h2 className="mb-2 text-xl font-semibold">{collection.title}</h2>
                <p className="text-gray-600">{collection.description}</p>
            </div>
            </a>

          ))}
          
        </div>
      </div>
      
    </>
  );
}
