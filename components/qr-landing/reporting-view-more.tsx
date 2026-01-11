'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ReportingViewMoreProps = {
  totalOrders: string;
  monthlySales: string;
};

export default function ReportingViewMore({ totalOrders, monthlySales }: ReportingViewMoreProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setShowMore((prev) => !prev)}
        className="rounded-full border border-[#0B80A7] px-4 py-2 text-sm font-semibold text-[#0B80A7] transition hover:bg-white"
      >
        {showMore ? 'Hide extra metrics' : 'View more metrics'}
      </button>
      {showMore && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="border-[#E3EEF4] bg-white shadow-sm">
            <CardHeader className="pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#79909E]">Total orders</p>
              <CardTitle className="text-2xl text-[#0B2C3F]">{totalOrders}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-[#4C616E]">
              All-time orders across participating grades.
            </CardContent>
          </Card>
          <Card className="border-[#E3EEF4] bg-white shadow-sm">
            <CardHeader className="pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#79909E]">Monthly sales</p>
              <CardTitle className="text-2xl text-[#0B2C3F]">{monthlySales}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-[#4C616E]">
              Average monthly program revenue.
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
