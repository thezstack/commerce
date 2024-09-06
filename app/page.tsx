import { Carousel } from 'components/carousel';
import FAQ from 'components/faq';
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
export const runtime = 'edge';

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
            <div className="mb-8 px-4 py-8  lg:mb-0 lg:w-1/2 lg:px-12 lg:py-16">
              <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
                Simplify Back to School Shopping
              </h1>
              <p className="mb-6 text-gray-600">
                We partner with schools to create personalized supply kits for each grade. Shop
                online, skip the store lines, and ensure your child has exactly what they need on
                day one.
              </p>
              <Link
                href="/stores"
                className="rounded-full bg-custom-blue px-6 py-3 font-bold text-white"
              >
                Shop by school
              </Link>
            </div>

            {/* Image section with blue blob */}
            <div className="relative lg:w-1/2">
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
            </div>
          </div>
        </div>
        {/*How It Works */}{' '}
        <div className="mx-auto mb-8   px-4 py-10 lg:px-12 lg:py-16  ">
          <h2 className="mb-8 text-center text-4xl font-semibold">How it works</h2>
          <div className="flex  flex-col   gap-4 space-y-4 pl-4 pr-4 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
            <div className=" flex flex-1 flex-col  space-y-4 text-center">
              <Image src={step1} alt="Step 1" className="mx-auto" />
              <h3 className="font-semibold">Step 1</h3>
              <p>
                We collect grade-specific supply lists from schools and create custom pre-packaged
                school kits.
              </p>
            </div>
            <div className="my-7 flex flex-1 flex-col space-y-4 text-center">
              <Image src={step2} alt="Step 2" className="mx-auto" />
              <h3 className="font-semibold">Step 2</h3>
              <p>Parents conveniently buy their child a School Kit with a click of a button.</p>
            </div>
            <div className="my-7 flex flex-1  flex-col space-y-4 text-center">
              <Image src={step3} alt="Step 3" className="mx-auto" />
              <h3 className="font-semibold">Step 3</h3>
              <p>Our team delivers directly to your classroom. No need for pickup.</p>
            </div>
            <div className="my-7 flex flex-1  flex-col space-y-4 text-center">
              <Image src={step4} alt="Step 4" className="mx-auto" />
              <h3 className="font-semibold">Step 4</h3>
              <p>
                Send your child to school confidently knowing they have everything needed for
                learning.
              </p>
            </div>
          </div>
        </div>
        {/* Why Choose SchoolKits section */}
        <div className="mb-8 bg-[#F8FCFD] py-10 ">
          <div className="mx-auto ">
            <div className="flex flex-col lg:flex-row">
              <div className="mb-8 w-full lg:mb-0 lg:w-1/2">
                <div className="relative mx-auto h-64 max-w-[300px] sm:h-80 lg:h-full lg:max-w-none">
                  <div className="absolute left-0 top-0 h-2/5 w-2/5 overflow-hidden rounded-full">
                    <Image src={circle1} alt="Image 1" layout="fill" objectFit="cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-2/5 w-2/5 overflow-hidden rounded-full">
                    <Image src={circle2} alt="Image 2" layout="fill" objectFit="cover" />
                  </div>
                  <div className="absolute right-1/4 top-1/4 h-2/5 w-2/5 overflow-hidden rounded-full">
                    <Image src={circle3} alt="Image 3" layout="fill" objectFit="cover" />
                  </div>

                  <div className="absolute left-1/4 top-1/4 h-8 w-8 rounded-full bg-[#70C8E5]"></div>
                  <div className="absolute bottom-1/4 left-1/4 h-12 w-12 rounded-full bg-[#CCEBF5]"></div>
                  <div className="absolute bottom-1/4 right-1/4 h-12 w-12 rounded-full bg-[#06D6A0]"></div>
                  <div className="absolute right-1/4 top-1/4 h-6 w-6 rounded-full bg-[#FFD166]"></div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden lg:w-1/2 lg:pl-12 ">
                <div className="px-4 py-12">
                  <div className="absolute -bottom-8 -right-8 -z-10 h-64 w-64 rounded-full bg-[#FFE7AF] opacity-30"></div>

                  <h2 className="mb-4 text-3xl font-semibold lg:text-4xl">
                    Why Choose SchoolKits?
                  </h2>
                  <p className="mb-6">
                    SchoolKits takes the hassle out of back-to-school shopping. We work directly
                    with schools to ensure your child has exactly what they need for a successful
                    year. Our custom-packed kits save you time and stress, while providing
                    high-quality supplies approved by teachers.
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {[
                      'Supports teachers by providing high-quality materials',
                      'Grade-specific supplies curated for your school',
                      "Direct delivery to your child's classroom",
                      'Teacher-approved brands and products',
                      'Time and money savings for busy parents',
                      "Reduces teachers' administrative workload in managing supplies"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="mr-2 flex-shrink-0 text-[#06D6A0]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          width="16"
                          height="16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#FFE7AF] opacity-30"
                  style={{ transform: 'translate(30%, 50%)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/*Testimonial */}
        <div className="mx-auto ">
          <h2 className="mb-8 text-center text-4xl font-semibold">Parents love us</h2>
          <Carousel />
        </div>
        {/*Brands */}
        <div className="mx-auto max-w-6xl bg-[#FCFCFD] px-4 py-8 lg:py-16">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Teacher Approved Brands and Supplies
            </h1>
            <p className="mx-auto mb-6 max-w-2xl">
              SchoolKits provides reliable, top-notch products, exclusively using well-known brands
              and teacher-endorsed house brands, catering to a variety of needs.
            </p>
          </div>
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Brands.map((item, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={item.name}
                  width={100}
                  height={100}
                  alt={`brand-${index}`}
                  className="h-auto w-full max-w-[100px]"
                />
              </div>
            ))}
          </div>
        </div>
        <FAQ />
        {/* New Shop Banner Section */}
        <div className="relative h-[400px] w-full overflow-hidden sm:h-[500px]">
          <Image
            src={bottomCTA}
            alt="School supplies"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Shop for a school kit now!
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-white sm:text-base md:text-lg">
              Get your child ready for success with our curated school kits. Handpicked supplies,
              teacher-approved, and delivered directly to the classroom. Start the school year right
              - hassle-free!
            </p>
            <Link href="/stores" className="rounded-full bg-[#0B80A7] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#096c8c]">
              Shop by school
            </Link>
          </div>
        </div>
      </Suspense>
    </>
  );
}
