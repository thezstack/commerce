import { Suspense } from 'react';

export default function SearchLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black  md:flex-row">
        <div className="">{/* <Collections /> */}</div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
      </div>
    </Suspense>
  );
}
