import { Carousel } from 'components/carousel';
import FAQ from 'components/faq';
import { WhyChooseSection } from 'components/home/why-choose-section';
import ScrollReveal from 'components/qr-landing/scroll-reveal';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import avery from '../media/Avery.svg';
import crayola from '../media/Crayola.svg';
import fiskar from '../media/Fiskar.png';
import bottomCTA from '../media/Frame 37280bottom_cta.png';
import mead from '../media/Mead.png';
import circle2 from '../media/boy_homePage_circle.png';
import elmer from '../media/elmer.svg';
import expo from '../media/expo.svg';
import circle3 from '../media/girl_homePage_circle.png';
import kleenex from '../media/kleenex.svg';
import littlePerson from '../media/little_person_homePage.png';
import circle1 from '../media/parent_homePage_circle.png';
import sharpie from '../media/sharpie.svg';
import step1 from '../media/step1.svg';
import step2 from '../media/step2.svg';
import step3 from '../media/step3.svg';
import step4 from '../media/step4.svg';
export const metadata = {
  description: 'School Supplies Shopping',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const Brands = [
    { name: avery },
    { name: crayola },
    { name: elmer },
    { name: expo },
    { name: kleenex },
    {
      name: mead
    },
    {
      name: sharpie
    },
    {
      name: fiskar
    }
  ];
  const whyChooseSchoolKits = [
    {
      title: 'Built for your school',
      description: "Grade-specific supplies matched to your child's classroom requirements."
    },
    {
      title: 'Delivered to the classroom',
      description: 'No store runs, no sorting supplies, and no pickup coordination.'
    },
    {
      title: 'Easier for parents & teachers',
      description: 'Less shopping for families and fewer missing-item headaches for staff.'
    }
  ];
  const steps = [
    {
      title: 'Step 1',
      image: step1,
      description:
        'We collect grade-specific supply lists from schools and create custom pre-packaged school kits.'
    },
    {
      title: 'Step 2',
      image: step2,
      description: 'Parents conveniently buy their child a SchoolKit with a click of a button.'
    },
    {
      title: 'Step 3',
      image: step3,
      description: 'Our team delivers directly to your classroom. No need for pickup.'
    },
    {
      title: 'Step 4',
      image: step4,
      description:
        'Send your child to school confidently knowing they have everything needed for learning.'
    }
  ];
  const Blob = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 819 690"
      className="absolute right-0 top-0 h-full w-full"
      preserveAspectRatio="xMinYMin slice"
    >
      <path
        d="M25.1507 124.371C-20.3997 46.7863 6.1714 -110.939 25.1507 -180.104L791.277 -294L864 12.1664L820.592 689.905C731.896 691.033 534.098 682.575 452.468 639.723C350.43 586.158 396.657 499.89 312.096 454.783C227.534 409.675 276.016 290.705 246.702 245.597C217.387 200.49 82.0888 221.352 25.1507 124.371Z"
        fill="#A9DDED"
      />
    </svg>
  );
  return (
    <>
      {/* <ThreeItemGrid /> */}
      <Suspense>
        {/*TopSection*/}{' '}
        <div className="bg-[#F4FDFF]">
          <div className="mx-auto flex  flex-col items-center lg:flex-row">
            {/* Text content */}
            <ScrollReveal className="mb-8 px-4 py-8 lg:mb-0 lg:w-1/2 lg:px-12 lg:py-16">
              <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
                School Ready, Stress Free
              </h1>
              <p className="mb-6 text-gray-600">
                We partner with schools to perfect back-to-school shopping.
              </p>
              <Link
                href="/schools"
                className="rounded-full bg-custom-blue px-6 py-3 font-bold text-white"
              >
                Shop by school
              </Link>
            </ScrollReveal>

            {/* Image section with blue blob */}
            <ScrollReveal delayMs={120} className="relative lg:w-1/2">
              {/* <div className="absolute inset-0 bg-light-blue rounded-full" style={{ clipPath: 'circle(70% at 70% 50%)' }}></div> */}
              <Blob />

              <div className="relative z-10">
                <Image
                  src={littlePerson}
                  alt="Happy kid with a backpack"
                  width={500}
                  height={600}
                  className="mx-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
        {/*How It Works */}{' '}
        <div className="mx-auto mb-8   px-4 py-10 lg:px-12 lg:py-16  ">
          <ScrollReveal className="mb-8 text-center">
            <h2 className="text-4xl font-semibold">How it works</h2>
          </ScrollReveal>
          <div className="flex  flex-col   gap-4 space-y-4 pl-4 pr-4 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.title}
                delayMs={index * 90}
                className={`flex flex-1 flex-col space-y-4 text-center ${index === 0 ? '' : 'my-7'}`}
              >
                <Image src={step.image} alt={step.title} className="mx-auto" />
                <h3 className="font-semibold">{step.title}</h3>
                <p>{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <WhyChooseSection
          images={{ first: circle1, second: circle3, third: circle2 }}
          items={whyChooseSchoolKits}
        />
        {/*Testimonial */}
        <div className="mx-auto ">
          <ScrollReveal className="mb-8 text-center">
            <h2 className="text-4xl font-semibold">Parents love us</h2>
          </ScrollReveal>
          <Carousel />
        </div>
        {/*Brands */}
        <div className="mx-auto max-w-6xl bg-[#FCFCFD] px-4 py-8 lg:py-16">
          <ScrollReveal className="text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Teacher Approved Brands and Supplies
            </h2>
            <p className="mx-auto mb-6 max-w-2xl">
              SchoolKits provides reliable, top-notch products, exclusively using well-known brands
              and teacher-endorsed house brands, catering to a variety of needs.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Brands.map((item, index) => (
              <ScrollReveal
                key={index}
                delayMs={index * 50}
                className="flex items-center justify-center"
              >
                <Image
                  src={item.name}
                  width={100}
                  height={100}
                  alt={`brand-${index}`}
                  className="h-auto w-full max-w-[100px]"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
        <ScrollReveal className="mx-auto">
          <FAQ />
        </ScrollReveal>
        {/* New Shop Banner Section */}
        <div className="relative h-[400px] w-full overflow-hidden sm:h-[500px]">
          <Image
            src={bottomCTA}
            alt="School supplies"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <ScrollReveal
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8"
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Shop for a SchoolKit now!
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-white sm:text-base md:text-lg">
              Get the exact supplies your school requested, packed and delivered to the classroom
              before the first day.
            </p>
            <Link href="/schools" className="rounded-full bg-[#0B80A7] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#096c8c]">
              Shop by school
            </Link>
          </ScrollReveal>
        </div>
      </Suspense>
    </>
  );
}
