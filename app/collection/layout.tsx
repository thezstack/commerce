import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <h1 className="text-center text-[#1B1B1B] font-sans text-2xl md:text-3xl lg:text-[3rem] font-bold mb-6 sm:mb-8 mt-8 md:mt-12 lg:mt-16">
      Select School Kit</h1>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black  md:flex-row">
        <div className="">
          {/* <Collections /> */}
        </div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
  
      </div>
    </Suspense>
  );
}
