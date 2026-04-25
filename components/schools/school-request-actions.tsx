'use client';

import clsx from 'clsx';
import type { FormEvent } from 'react';
import { useState } from 'react';

type SchoolRequestActionsProps = {
  schoolName: string;
  schoolSlug?: string;
  context: 'kits_unavailable' | 'school_not_found';
};

type SchoolRequestPersona = 'parent' | 'school_admin';

export default function SchoolRequestActions({
  schoolName,
  schoolSlug,
  context
}: SchoolRequestActionsProps) {
  const [isSubmitting, setIsSubmitting] = useState<SchoolRequestPersona | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<SchoolRequestPersona | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [error, setError] = useState('');

  const selectPersona = (persona: SchoolRequestPersona) => {
    setSelectedPersona(persona);
    setError('');
  };

  const submitRequest = async (persona: SchoolRequestPersona) => {
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
          context,
          contactName,
          contactEmail,
          contactMessage
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

  const submitContactRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPersona) return;
    await submitRequest(selectedPersona);
  };

  if (submitSuccess) {
    return (
      <div className="mt-6 rounded-3xl border border-[#D9EEF4] bg-[#F8FCFD] px-6 py-5 text-center">
        <p className="text-base font-semibold text-black">Request sent</p>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          We received your request for <span className="font-semibold">{schoolName}</span> and will
          follow up soon.
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
          onClick={() => selectPersona('parent')}
          disabled={Boolean(isSubmitting)}
          className={clsx(buttonClasses, 'bg-custom-blue text-white hover:bg-[#096B8C]', {
            'cursor-not-allowed opacity-70': Boolean(isSubmitting)
          })}
        >
          I&apos;m a parent
        </button>
        <button
          type="button"
          onClick={() => selectPersona('school_admin')}
          disabled={Boolean(isSubmitting)}
          className={clsx(
            buttonClasses,
            'border border-[#D9EEF4] bg-white text-black hover:bg-[#F8FCFD]',
            {
              'cursor-not-allowed opacity-70': Boolean(isSubmitting)
            }
          )}
        >
          {isSubmitting === 'school_admin' ? 'Sending...' : "I'm a teacher or admin"}
        </button>
      </div>
      {selectedPersona ? (
        <form
          onSubmit={submitContactRequest}
          className="mx-auto mt-5 max-w-xl rounded-2xl border border-[#D9EEF4] bg-white p-5 text-left"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-black">
              Name
              <input
                type="text"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                autoComplete="name"
                required
                className="mt-2 w-full rounded-xl border border-[#D9EEF4] px-4 py-3 text-sm text-black outline-none transition focus:border-[#0B80A7] focus:ring-2 focus:ring-[#0B80A7]/20"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-medium text-black">
              Email
              <input
                type="email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-[#D9EEF4] px-4 py-3 text-sm text-black outline-none transition focus:border-[#0B80A7] focus:ring-2 focus:ring-[#0B80A7]/20"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-medium text-black">
            Message
            <textarea
              value={contactMessage}
              onChange={(event) => setContactMessage(event.target.value)}
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-[#D9EEF4] px-4 py-3 text-sm text-black outline-none transition focus:border-[#0B80A7] focus:ring-2 focus:ring-[#0B80A7]/20"
              placeholder="Tell us what school or grade you need help with."
            />
          </label>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={Boolean(isSubmitting)}
              className={clsx(buttonClasses, 'bg-custom-blue text-white hover:bg-[#096B8C]', {
                'cursor-not-allowed opacity-70': Boolean(isSubmitting)
              })}
            >
              {isSubmitting ? 'Sending...' : 'Send request'}
            </button>
          </div>
        </form>
      ) : null}
      {error ? <p className="mt-3 text-sm text-[#B42318]">{error}</p> : null}
    </div>
  );
}
