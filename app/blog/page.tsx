import { getBlogPosts } from 'lib/shopify';
import { BlogPost } from 'lib/shopify/types';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0; // Force dynamic rendering

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
    debugInfo.push(message);

    // Sort by publish date (newest first)
    posts = fetchedPosts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Log the posts we found for debugging
    if (posts.length > 0) {
      debugInfo.push('Found posts:');
      posts.forEach((post) => {
        debugInfo.push(
          `- ${post.title} (${post.handle}), published: ${new Date(
            post.publishedAt
          ).toLocaleString()}`
        );
      });
    }
  } catch (error) {
    const errorMessage = `Error fetching posts with handle '${blogHandle}': ${
      error instanceof Error ? error.message : String(error)
    }`;
    console.error(errorMessage);
    debugInfo.push(errorMessage);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">SchoolKits Blog</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Discover helpful guides, product comparisons, and tips for finding the best school
          supplies for your children.
        </p>
      </header>

      <aside className="mb-10 flex flex-col gap-4 rounded-2xl border border-[#D9EEF4] bg-[#F1F7F6] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#073B4C]">Planning a program for your school?</h2>
          <p className="mt-2 text-sm leading-6 text-[#49616A]">
            Find guides and a planning checklist for school leaders, PTOs, and PTAs.
          </p>
        </div>
        <Link
          href="/resources"
          className="inline-flex min-h-12 flex-none items-center justify-center rounded-full bg-[#0B779A] px-5 py-3 text-sm font-bold text-white hover:bg-[#07566F]"
        >
          School &amp; PTO resources{' '}
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </Link>
      </aside>

      {posts.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold">No posts found</h2>
          <p className="mb-4 text-gray-600">Check back soon for new content!</p>
          <div className="mx-auto max-w-2xl rounded-lg bg-gray-100 p-4 text-left">
            <h3 className="mb-2 text-lg font-semibold">Debug Information:</h3>
            <pre className="overflow-auto rounded bg-gray-200 p-2 text-xs">
              {debugInfo.join('\n')}
            </pre>
            <p className="mt-4 text-sm">
              Note: Make sure your Shopify store has a blog with handle 'news'.
              <br />
              Also verify that you have published blog posts in that blog.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <article
                key={post.id}
                className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm"
              >
                {post.image && (
                  <Link href={`/blog/${post.handle}`} className="block overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.altText || post.title}
                      width={post.image.width || 600}
                      height={post.image.height || 400}
                      className="h-48 w-full object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-2 line-clamp-2 text-xl font-semibold">
                    <Link href={`/blog/${post.handle}`} className="hover:text-[#0B80A7]">
                      {post.title}
                    </Link>
                  </h2>

                  <div className="mb-3 text-sm text-gray-500">
                    {post.author && <span className="mr-2">By {post.author.name}</span>}
                    <time dateTime={post.publishedAt}>{publishDate}</time>
                  </div>

                  {post.excerptHtml && (
                    <div
                      className="mb-4 line-clamp-3 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
                    />
                  )}

                  <div className="mt-auto">
                    <Link
                      href={`/blog/${post.handle}`}
                      className="font-medium text-[#0B80A7] hover:underline"
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
