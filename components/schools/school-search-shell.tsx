'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import SchoolRequestActions from 'components/schools/school-request-actions';
import type { SchoolSearchResult } from 'lib/schools';

const MIN_SEARCH_LENGTH = 2;
const MAX_VISIBLE_RESULTS = 8;

const normalizeValue = (value: string | null | undefined) =>
  (value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const rankSchoolMatch = (school: SchoolSearchResult, normalizedQuery: string) => {
  const normalizedName = normalizeValue(school.name);
  const normalizedLocation = normalizeValue([school.city, school.state].filter(Boolean).join(' '));

  if (!normalizedName.includes(normalizedQuery) && !normalizedLocation.includes(normalizedQuery)) {
    return null;
  }

  if (normalizedName === normalizedQuery) return 0;
  if (normalizedName.startsWith(normalizedQuery)) return 1;
  if (normalizedName.split(' ').some((part) => part.startsWith(normalizedQuery))) return 2;
  if (normalizedLocation.startsWith(normalizedQuery)) return 3;
  if (normalizedName.includes(normalizedQuery)) return 4;
  return 5;
};

export default function SchoolSearchShell({
  initialQuery = '',
  schools
}: {
  initialQuery?: string;
  schools: SchoolSearchResult[];
}) {
  const [query, setQuery] = useState(initialQuery);

  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeValue(trimmedQuery);
  const showResults = trimmedQuery.length >= MIN_SEARCH_LENGTH;
  const results = useMemo(() => {
    if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
      return [];
    }

    return schools
      .map((school) => ({ school, rank: rankSchoolMatch(school, normalizedQuery) }))
      .filter((entry): entry is { school: SchoolSearchResult; rank: number } => entry.rank !== null)
      .sort((left, right) => {
        if (left.rank !== right.rank) {
          return left.rank - right.rank;
        }

        return left.school.name.localeCompare(right.school.name);
      })
      .slice(0, MAX_VISIBLE_RESULTS)
      .map((entry) => entry.school);
  }, [normalizedQuery, schools]);
  const hasResults = results.length > 0;

  return (
    <section className="mx-auto max-w-3xl px-2 py-0 sm:px-0">
      <div>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0B80A7]">School Finder</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Find your school
          </h1>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[#D9EEF4] bg-white/95 p-2 shadow-[0_12px_30px_rgba(11,128,167,0.08)] sm:rounded-3xl sm:p-3">
          <label htmlFor="school-search" className="sr-only">
            Search for your school
          </label>
          <div className="flex items-center gap-2 rounded-[1.1rem] border border-[#E6F3F7] bg-[linear-gradient(180deg,#FBFEFF_0%,#F6FBFD_100%)] px-3 py-2.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
            <Search className="h-4 w-4 shrink-0 text-[#0B80A7] sm:h-5 sm:w-5" />
            <input
              id="school-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for your school by name"
              autoComplete="off"
              className="w-full border-0 bg-transparent text-[16px] leading-6 text-black outline-none placeholder:text-sm placeholder:text-gray-500 sm:text-lg sm:placeholder:text-base"
            />
          </div>
        </div>

        {trimmedQuery.length > 0 && trimmedQuery.length < MIN_SEARCH_LENGTH ? (
          <div className="mt-8 text-center text-sm leading-6 text-gray-600">
            Enter at least {MIN_SEARCH_LENGTH} characters to search for your school.
          </div>
        ) : null}

        {showResults && hasResults ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#D9EEF4] bg-white/95 shadow-[0_12px_28px_rgba(11,128,167,0.08)]">
            <ul className="divide-y divide-[#EAF2F5]">
              {results.map((school) => (
                <li key={school.id}>
                  <Link
                    href={`/schools/${school.slug}`}
                    className="flex items-start gap-3 px-5 py-4 transition hover:bg-[#F7FCFE]"
                  >
                    {school.logoUrl ? (
                      <img
                        src={school.logoUrl}
                        alt={`${school.name} logo`}
                        className="mt-0.5 h-10 w-10 shrink-0 rounded-full border border-[#D9EEF4] bg-white object-contain p-1"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <p className="break-words text-base font-semibold leading-6 text-black">{school.name}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {[school.city, school.state].filter(Boolean).join(', ') || 'School record found'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showResults && !hasResults ? (
          <div className="mt-8 rounded-3xl border border-dashed border-[#D9EEF4] bg-white/95 px-6 py-8 text-center shadow-[0_10px_24px_rgba(11,128,167,0.06)]">
            <p className="text-lg font-semibold text-black">No matching school found</p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
              Try a shorter name or a different spelling. If you still can&apos;t find it, send us a quick request and we&apos;ll review it.
            </p>
            <SchoolRequestActions schoolName={trimmedQuery} context="school_not_found" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
