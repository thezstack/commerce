import { getBlogPost } from 'lib/shopify';
import { isSchoolResource } from 'lib/school-resources';
import PartnershipCta from 'components/resources/partnership-cta';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

export const revalidate = 0; // Force dynamic rendering

interface BlogPostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const findPost = cache(async (handle: string) => {
  for (const blogHandle of ['news', 'blog', 'blogs', 'articles', 'journal']) {
    const post = await getBlogPost(handle, blogHandle);
    if (post) return post;
  }
});

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const handle = slug.join('/');
  const post = await findPost(handle);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
      robots: { index: false, follow: false }
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || '',
    alternates: { canonical: `https://schoolkits.org/blog/${post.handle}` },
    openGraph: {
      type: 'article',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt || '',
      url: `https://schoolkits.org/blog/${post.handle}`,
      publishedTime: post.publishedAt,
      images: post.image
        ? [
            {
              url: post.image.url,
              width: post.image.width,
              height: post.image.height,
              alt: post.image.altText || post.title
            }
          ]
        : undefined
    },
    twitter: {
      card: post.image ? 'summary_large_image' : 'summary',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt || '',
      images: post.image ? [post.image.url] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const handle = slug.join('/');

  const post = await findPost(handle);

  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/blog" className="mb-6 inline-block text-[#0B80A7] hover:underline">
        ← Resources for Schools &amp; PTOs
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

          <div className="mb-6 flex items-center text-gray-600">
            {post.author && <span className="mr-4">By {post.author.name}</span>}
            <time dateTime={post.publishedAt}>{publishDate}</time>
          </div>

          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image.url}
                alt={post.image.altText || post.title}
                width={post.image.width || 1200}
                height={post.image.height || 630}
                className="h-auto w-full rounded-lg"
                priority
              />
            </div>
          )}
        </header>

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {post.tags?.some((tag) => tag.toLowerCase() !== 'school-resources') && (
          <div className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-2 text-lg font-semibold">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags
                .filter((tag) => tag.toLowerCase() !== 'school-resources')
                .map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        )}
      </article>
      {isSchoolResource(post) && (
        <div className="mt-12 space-y-6">
          <PartnershipCta source={`blog_${post.handle}`} />
        </div>
      )}
    </div>
  );
}
