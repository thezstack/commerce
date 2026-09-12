import PartnershipCta from 'components/resources/partnership-cta';
import { getResourceDetails, isFeaturedSchoolResource } from 'lib/school-resources';
import { getBlogPosts } from 'lib/shopify';
import { ArrowDown, ArrowRight, BookOpen, Check, ClipboardList } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import planningImage from '../../media/school-resource-planning.png';

export const revalidate = 3600;

const title = 'Resources for Schools & PTOs';
const description =
  'Practical guides and a planning checklist for school and PTO leaders comparing school supply programs, organizing their teams, and exploring fundraising.';

export const metadata: Metadata = {
  title: { absolute: `${title} | SchoolKits` },
  description,
  alternates: { canonical: 'https://schoolkits.org/blog' },
  openGraph: {
    type: 'website',
    title,
    description,
    url: 'https://schoolkits.org/blog',
    siteName: 'SchoolKits',
    images: [
      {
        url: planningImage.src,
        width: planningImage.width,
        height: planningImage.height,
        alt: 'A school supply kit beside a planning checklist'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [planningImage.src]
  }
};

const planningSteps = [
  {
    title: 'Gather your school’s needs',
    description: 'Start with the people, lists, and dates that shape your program.',
    points: [
      'Collect current supply lists and identify who approves each grade’s requirements.',
      'Estimate participating students and agree on your target ordering and delivery dates.',
      'Name a school or PTO contact who can coordinate decisions and family communication.'
    ]
  },
  {
    title: 'Compare providers on the same list',
    description: 'Look at the complete program alongside the price of each kit.',
    points: [
      'Compare item quantities, brands, substitution policies, and any additional fees.',
      'Ask who handles ordering support, packing, labels, delivery, and missing items.',
      'Confirm minimums, deadlines, and what happens with late orders or new students.'
    ]
  },
  {
    title: 'Discuss fundraising and family access',
    description: 'Make sure your school’s goals and family needs are part of the conversation.',
    points: [
      'Ask how any school proceeds are calculated and when they would be paid.',
      'Confirm how fundraising affects family pricing and who approves the arrangement.',
      'Discuss assistance or sponsorship needs and confirm what can be offered before sharing it.'
    ]
  },
  {
    title: 'Agree on responsibilities before launch',
    description: 'Give every handoff a clear owner, from approval through delivery.',
    points: [
      'Get agreement on the final lists, pricing, deadlines, and delivery arrangements.',
      'Plan launch messages and reminders with a clear ordering link and support contact.',
      'Choose a delivery contact and document the program for next year’s school or PTO team.'
    ]
  }
];

export default async function BlogPage() {
  // The Storefront API returns published content only. Drafts are never linked here.
  const allPosts = (await getBlogPosts(250, 'news')).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const posts = allPosts.filter(isFeaturedSchoolResource);
  const otherPosts = allPosts.filter((post) => !isFeaturedSchoolResource(post));

  return (
    <div className="bg-white text-[#073B4C]">
      <section className="bg-[#FCFAF6]" aria-labelledby="resources-heading">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#256278]">
              A good program starts with a good plan
            </p>
            <h1
              id="resources-heading"
              className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
            >
              Resources for Schools &amp; PTOs
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-7 text-[#49616A]">
              Helpful guides for school leaders, PTOs, and PTAs planning their next supply program.
              Compare your options, prepare your team, and decide what works for your campus.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#guides"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0B779A] px-6 py-3 text-sm font-bold text-white hover:bg-[#07566F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#073B4C]"
              >
                Explore the guides <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#planning-checklist"
                className="inline-flex min-h-12 items-center rounded-full border border-[#AAC4CB] px-6 py-3 text-sm font-bold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#073B4C]"
              >
                Start with the checklist
              </Link>
            </div>
          </div>
          <figure>
            <Image
              src={planningImage}
              alt="An open supply kit with folders, notebooks, and pencils beside a planning checklist"
              sizes="(min-width: 1280px) 580px, (min-width: 1024px) 46vw, 100vw"
              priority
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-3 text-xs leading-5 text-[#49616A]">
              Illustrative kit. Contents are based on each school’s approved supply lists.
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="guides"
        aria-labelledby="guides-heading"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 py-12 sm:px-8 lg:py-16"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#256278]">
              From the SchoolKits blog
            </p>
            <h2 id="guides-heading" className="mt-3 text-3xl font-bold tracking-tight">
              Ideas for your school’s next chapter.
            </h2>
          </div>
          {otherPosts.length > 0 && (
            <Link
              href="#more-resources"
              className="py-2 text-sm font-semibold text-[#0B779A] hover:underline"
            >
              More from SchoolKits <span aria-hidden="true">↓</span>
            </Link>
          )}
        </div>
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => {
              const detail = getResourceDetails(post);
              return (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#DCE8E7]"
                >
                  {post.image && (
                    <Image
                      src={post.image.url}
                      alt={post.image.altText || post.title}
                      width={post.image.width || 900}
                      height={post.image.height || 506}
                      sizes="(min-width: 1280px) 580px, (min-width: 768px) 46vw, 100vw"
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#256278]">
                      <BookOpen className="h-5 w-5 flex-none" aria-hidden="true" />
                      {detail.category}
                    </div>
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl">
                      <Link
                        href={`/blog/${post.handle}`}
                        className="hover:text-[#0B779A] hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mb-6 mt-3 leading-7 text-[#49616A]">{detail.description}</p>
                    <Link
                      href={`/blog/${post.handle}`}
                      aria-label={`Read: ${post.title}`}
                      className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[#0B779A] hover:underline"
                    >
                      Read the guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#DCE8E7] bg-[#F1F7F6] p-7">
            <p className="leading-7 text-[#49616A]">
              Our guides are unavailable right now. You can still use the planning checklist below
              or talk with our team about your school’s needs.
            </p>
          </div>
        )}
      </section>

      <section
        id="planning-checklist"
        aria-labelledby="checklist-heading"
        className="scroll-mt-28 bg-[#F1F7F6]"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="max-w-2xl">
            <ClipboardList className="mb-4 h-8 w-8 text-[#0B779A]" aria-hidden="true" />
            <h2 id="checklist-heading" className="text-3xl font-bold tracking-tight">
              Your school supply planning checklist.
            </h2>
            <p className="mt-4 leading-7 text-[#49616A]">
              Use these questions in your next school or PTO meeting, whether you’re starting a
              program or reviewing your current one.
            </p>
          </div>
          <ol className="mt-9 grid gap-7 lg:grid-cols-2">
            {planningSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 sm:p-8">
                <p className="mb-3 text-sm font-bold text-[#0B779A]">0{index + 1}</p>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#49616A]">{step.description}</p>
                <ul className="mt-5 space-y-4">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#315565]">
                      <Check className="mt-1 h-4 w-4 flex-none text-[#0B779A]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <PartnershipCta source="resources_hub" />
      </div>

      {otherPosts.length > 0 && (
        <section
          id="more-resources"
          aria-labelledby="more-resources-heading"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-12 sm:px-8 lg:pb-16"
        >
          <h2 id="more-resources-heading" className="text-2xl font-bold">
            More from SchoolKits
          </h2>
          <p className="mb-5 mt-3 text-sm leading-6 text-[#49616A]">
            Meet our team and browse earlier articles for families and teachers.
          </p>
          <details className="rounded-xl border border-[#DCE8E7] bg-[#FCFAF6] p-5">
            <summary className="cursor-pointer font-semibold text-[#0B779A]">
              Browse earlier articles
            </summary>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {otherPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.handle}`}
                    className="inline-block py-2 text-sm leading-6 text-[#315565] underline underline-offset-4 hover:text-[#0B779A]"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </section>
      )}
    </div>
  );
}
