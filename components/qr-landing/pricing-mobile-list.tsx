'use client';

import { useState } from 'react';

type PricingItem = {
  item: string;
  schoolKits: string;
  retail: string;
};

type PricingMobileListProps = {
  items: PricingItem[];
  competitorName: string;
};

export default function PricingMobileList({ items, competitorName }: PricingMobileListProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 3);

  return (
    <div className="mt-8 grid gap-4 md:hidden">
      {visibleItems.map((item) => (
        <div key={item.item} className="rounded-2xl border border-[#E3EEF4] bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#79909E]">
            Grade bundle
          </div>
          <div className="mt-2 text-lg font-semibold text-[#0B2C3F]">{item.item}</div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#344D5A]">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-[#9AAAB4]">School Kits</div>
              <div className="mt-1 text-base font-semibold text-[#0B80A7]">{item.schoolKits}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-[#9AAAB4]">{competitorName}</div>
              <div className="mt-1 text-base font-semibold text-[#0B2C3F]">{item.retail}</div>
            </div>
          </div>
        </div>
      ))}
      {items.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="rounded-full border border-[#0B80A7] px-4 py-2 text-sm font-semibold text-[#0B80A7] transition hover:bg-white"
        >
          {showAll ? 'Show fewer' : `Show ${items.length - 3} more`}
        </button>
      )}
    </div>
  );
}
