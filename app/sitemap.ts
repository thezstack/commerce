import { getBlogPosts, getCollections, getPages, getProducts } from 'lib/shopify';
import { validateEnvironmentVariables } from 'lib/utils';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority?: number;
};

// Fix the URL format to avoid double https://
const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://schoolkits.org' : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/for-schools', priority: 0.8 },
    { path: '/for-schools-quote', priority: 0.8 },
    { path: '/tefa-parents', priority: 0.9 },
    { path: '/texas-private-schools', priority: 0.8 },
    { path: '/privacy-policy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/affiliate-disclosure', priority: 0.3 }
  ] as const;

  const routesMap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route.priority
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}/collection/${collection.handle}`,
      lastModified: collection.updatedAt
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt
    }))
  );

  // Add blog posts to sitemap - using 'news' as the blog handle
  const blogPostsPromise = getBlogPosts(50, 'news')
    .then((posts) =>
      posts.map((post) => ({
        url: `${baseUrl}/blog/${post.handle}`,
        lastModified: post.publishedAt
      }))
    )
    .catch((error) => {
      console.error('Error fetching blog posts for sitemap:', error);
      return []; // Return empty array if fetching fails
    });

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise, blogPostsPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
