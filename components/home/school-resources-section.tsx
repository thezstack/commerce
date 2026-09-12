import { ArrowRight, BookOpen, ClipboardList } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import planningImage from '../../media/school-resource-planning.png';

export default function SchoolResourcesSection() {
  return (
    <section aria-labelledby="school-resources-heading" className="bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-[5%] py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:py-20">
        <Image
          src={planningImage}
          alt="A school supply kit beside a checklist for planning a school supply program"
          sizes="(min-width: 1400px) 520px, (min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#256278]">
            Plan your next program
          </p>
          <h2
            id="school-resources-heading"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Resources for Schools &amp; PTOs
          </h2>
          <p className="mt-4 max-w-xl leading-8 text-[#49616A]">
            Bring useful questions to your next school or PTO meeting. Explore supply program
            guides, fundraising considerations, and a checklist to help your team get started.
          </p>
          <div className="my-6 divide-y divide-[#DCE8E7] border-y border-[#DCE8E7]">
            <Link
              href="/blog#guides"
              className="flex min-h-14 items-center gap-3 py-4 text-sm font-semibold hover:text-[#0B779A]"
            >
              <BookOpen className="h-5 w-5 flex-none text-[#0B779A]" aria-hidden="true" />
              School supply program guides
              <ArrowRight className="ml-auto h-4 w-4 flex-none" aria-hidden="true" />
            </Link>
            <Link
              href="/blog#planning-checklist"
              className="flex min-h-14 items-center gap-3 py-4 text-sm font-semibold hover:text-[#0B779A]"
            >
              <ClipboardList className="h-5 w-5 flex-none text-[#0B779A]" aria-hidden="true" />
              School &amp; PTO planning checklist
              <ArrowRight className="ml-auto h-4 w-4 flex-none" aria-hidden="true" />
            </Link>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0B779A] px-6 py-3 text-sm font-bold text-white hover:bg-[#07566F]"
          >
            Explore school resources <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
