'use client';

import clsx from 'clsx';
import { useState } from 'react';

type SchoolRequestActionsProps = {
  schoolName: string;
  schoolSlug?: string;
  context: 'kits_unavailable' | 'school_not_found';
};

export default function SchoolRequestActions({
  schoolName,
  schoolSlug,
  context
}: SchoolRequestActionsProps) {
  const [isSubmitting, setIsSubmitting] = useState<'parent' | 'school_admin' | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitRequest = async (persona: 'parent' | 'school_admin') => {
    setIsSubmitting(persona);
    setError('');

    try {
      const response = await fetch('/api/school-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          schoolName,
          schoolSlug,
          persona,
          context
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || 'Failed to submit request. Please try again.');
        return;
      }

      setSubmitSuccess(true);
    } catch (requestError) {
      console.error('School request failed:', requestError);
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(null);
    }
  };

  if (submitSuccess) {
    return (
      <div className="mt-6 rounded-3xl border border-[#D9EEF4] bg-[#F8FCFD] px-6 py-5 text-center">
        <p className="text-base font-semibold text-black">Request sent</p>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          We received your request for <span className="font-semibold">{schoolName}</span> and will follow up internally.
        </p>
      </div>
    );
  }

  const buttonClasses =
    'rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#0B80A7]/20';

  return (
    <div className="mt-6">
      <p className="text-sm leading-6 text-gray-600">
        Let us know who you are and we&apos;ll send this request to our team right away.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => submitRequest('parent')}
          disabled={Boolean(isSubmitting)}
          className={clsx(buttonClasses, 'bg-custom-blue text-white hover:bg-[#096B8C]', {
            'cursor-not-allowed opacity-70': Boolean(isSubmitting)
          })}
        >
          {isSubmitting === 'parent' ? 'Sending...' : "I'm a parent"}
        </button>
        <button
          type="button"
          onClick={() => submitRequest('school_admin')}
          disabled={Boolean(isSubmitting)}
          className={clsx(buttonClasses, 'border border-[#D9EEF4] bg-white text-black hover:bg-[#F8FCFD]', {
            'cursor-not-allowed opacity-70': Boolean(isSubmitting)
          })}
        >
          {isSubmitting === 'school_admin' ? 'Sending...' : "I'm a teacher or admin"}
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-[#B42318]">{error}</p> : null}
    </div>
  );
}
