import { getBlogPosts } from 'lib/shopify';
import { BlogPost } from 'lib/shopify/types';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | SchoolKits',
  description: 'Read the latest articles, guides, and news from SchoolKits'
};

export default async function BlogPage() {
  // Use only the 'news' blog handle as specified
  let posts: BlogPost[] = [];
  let debugInfo: string[] = [];
  
  // Only use the 'news' blog handle
  const blogHandle = 'news';
  
  try {
    // Fetch posts from the 'news' blog
    const fetchedPosts = await getBlogPosts(20, blogHandle);
    const message = `Found ${fetchedPosts.length} posts with handle '${blogHandle}'`;
    console.log(message);
    debugInfo.push(message);
    
    // Sort by publish date (newest first)
    posts = fetchedPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Log the posts we found for debugging
    if (posts.length > 0) {
      debugInfo.push('Found posts:');
      posts.forEach(post => {
        debugInfo.push(`- ${post.title} (${post.handle}), published: ${new Date(post.publishedAt).toLocaleString()}`);
      });
    }
  } catch (error) {
    const errorMessage = `Error fetching posts with handle '${blogHandle}': ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMessage);
    debugInfo.push(errorMessage);
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">SchoolKits Blog</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover helpful guides, product comparisons, and tips for finding the best school supplies for your children.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
          <p className="text-gray-600 mb-4">
            Check back soon for new content!
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-left mx-auto max-w-2xl">
            <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
            <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">
              {debugInfo.join('\n')}
            </pre>
            <p className="mt-4 text-sm">
              Note: Make sure your Shopify store has a blog with handle 'news'.<br/>
              Also verify that you have published blog posts in that blog.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                {post.image && (
                  <Link href={`/blog/${post.handle}`} className="block overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.altText || post.title}
                      width={post.image.width || 600}
                      height={post.image.height || 400}
                      className="w-full h-48 object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    <Link href={`/blog/${post.handle}`} className="hover:text-[#0B80A7]">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    {post.author && (
                      <span className="mr-2">By {post.author.name}</span>
                    )}
                    <time dateTime={post.publishedAt}>{publishDate}</time>
                  </div>
                  
                  {post.excerptHtml && (
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
                    />
                  )}
                  
                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.handle}`}
                      className="text-[#0B80A7] font-medium hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
