import { getBlogPost } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0; // Force dynamic rendering

interface BlogPostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  // Try different blog handles
  const blogHandles = ['blog', 'news', 'blogs', 'articles', 'journal'];
  let post;
  
  for (const blogHandle of blogHandles) {
    post = await getBlogPost(params.slug.join('/'), blogHandle);
    if (post) break;
  }

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.'
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || '',
    openGraph: post.image
      ? {
          images: [
            {
              url: post.image.url,
              width: post.image.width,
              height: post.image.height,
              alt: post.image.altText || post.title
            }
          ]
        }
      : null
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const handle = params.slug.join('/');
  
  // Try different blog handles
  const blogHandles = ['blog', 'news', 'blogs', 'articles', 'journal'];
  let post;
  let debugInfo: string[] = [];
  
  for (const blogHandle of blogHandles) {
    try {
      debugInfo.push(`Trying to fetch post with handle '${handle}' from blog '${blogHandle}'`);
      post = await getBlogPost(handle, blogHandle);
      
      if (post) {
        debugInfo.push(`Found post in blog '${blogHandle}'`);
        break;
      }
    } catch (error) {
      const errorMessage = `Error fetching from '${blogHandle}': ${error instanceof Error ? error.message : String(error)}`;
      debugInfo.push(errorMessage);
    }
  }

  if (!post) {
    // Instead of just showing 404, show debug info
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Post Not Found</h1>
        <p className="mb-8">The blog post you are looking for could not be found.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
          <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">
            {debugInfo.join('\n')}
          </pre>
          <p className="mt-4 text-sm">
            Make sure your Shopify store has a blog with one of these handles: {blogHandles.join(', ')}.<br/>
            Also verify that you have a published blog post with the handle: "{handle}".
          </p>
        </div>
      </div>
    );
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link href="/blog" className="text-[#0B80A7] hover:underline mb-6 inline-block">
        ← Back to Blog
      </Link>
      
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            {post.author && (
              <span className="mr-4">By {post.author.name}</span>
            )}
            <time dateTime={post.publishedAt}>{publishDate}</time>
          </div>
          
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image.url}
                alt={post.image.altText || post.title}
                width={post.image.width || 1200}
                height={post.image.height || 630}
                className="rounded-lg w-full h-auto"
                priority
              />
            </div>
          )}
        </header>
        
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
