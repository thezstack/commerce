import type { Metadata } from 'next';

import ContactForm from 'components/contact';
import Prose from 'components/prose';
import Stores from 'components/stores';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';
export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: pageHandle } = await params;
  const page = await getPage(pageHandle);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageHandle } = await params;
  const page = await getPage(pageHandle);

  if (!page) return notFound();

  if (page.handle === 'contact') {
    return (
      <>
        <ContactForm />
      </>
    );
  }
  if(page.handle === 'schools'){
    return(
      <>
      <Stores/>
      </>
    )
  }
  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}
