'use client';

import { Maximize2, X } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

type TefaFinderScreenshotProps = {
  image: StaticImageData;
};

export default function TefaFinderScreenshot({ image }: TefaFinderScreenshotProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group block w-full overflow-hidden rounded-lg border border-[#D9EEF4] bg-white text-left shadow-[0_14px_34px_rgba(11,128,167,0.08)] transition hover:border-[#0B80A7]"
        >
          <div className="relative">
            <Image
              src={image}
              alt="TEFA Finder search results showing School Kits Supply under Supplies"
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="h-auto w-full"
              priority={false}
            />
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-[#073B4C] shadow-lg">
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
              Enlarge
            </div>
          </div>
        </button>
      </div>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged TEFA Finder screenshot"
          className="fixed inset-0 z-[100] bg-[#073B4C]/90 p-3 sm:p-6"
        >
          <button
            type="button"
            aria-label="Close enlarged screenshot"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#073B4C] shadow-xl transition hover:bg-[#EAF8FC]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Close screenshot overlay"
            onClick={() => setIsOpen(false)}
            className="flex h-full w-full items-center justify-center"
          >
            <span className="max-h-full max-w-full overflow-auto rounded-lg bg-white p-2 shadow-2xl">
              <Image
                src={image}
                alt="TEFA Finder search results showing School Kits Supply under Supplies"
                sizes="100vw"
                className="h-auto max-h-[calc(100vh-5rem)] w-auto max-w-full"
              />
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
}
