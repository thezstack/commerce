'use client';

import { useEffect, useId, useState } from 'react';

type WindowWithGtag = Window & {
  gtag?: (command: 'event', eventName: string, params?: Record<string, string>) => void;
};

const recaptchaSiteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcKwFErAAAAALq-9tSJhg_6-RPVD_qhfOUojw1l';

const maxSupplyListFileSize = 10 * 1024 * 1024;
const allowedSupplyListFileTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'image/jpeg',
  'image/png'
]);

export default function QuoteRequestForm() {
  const fileInputId = useId();
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [notes, setNotes] = useState('');
  const [supplyListFile, setSupplyListFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!window.grecaptcha && !document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const getRecaptchaToken = async () => {
    if (!window.grecaptcha) return '';

    try {
      return await window.grecaptcha.execute(recaptchaSiteKey, { action: 'quote_request_form' });
    } catch {
      return '';
    }
  };

  const uploadSupplyListFile = async () => {
    if (!supplyListFile) return null;

    const uploadFormData = new FormData();
    uploadFormData.append('file', supplyListFile);

    const response = await fetch('/api/quote-supply-list-upload', {
      method: 'POST',
      body: uploadFormData
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Could not upload the supply list. Please try again.');
    }

    return {
      fileName: result.fileName as string,
      fileSize: result.fileSize as number,
      mimeType: result.mimeType as string,
      url: result.url as string
    };
  };

  const submitQuoteRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const trimmedContactInfo = contactInfo.trim();
    const contactEmail = trimmedContactInfo.includes('@')
      ? trimmedContactInfo
      : 'phone-only-lead@schoolkits.org';

    if (!trimmedContactInfo) {
      setError('Enter an email or phone number.');
      setIsSubmitting(false);
      return;
    }

    if (!supplyListFile) {
      setError('Upload a school supply list.');
      setIsSubmitting(false);
      return;
    }

    if (supplyListFile.size > maxSupplyListFileSize) {
      setError('Upload a file smaller than 10 MB.');
      setIsSubmitting(false);
      return;
    }

    if (!allowedSupplyListFileTypes.has(supplyListFile.type)) {
      setError('Upload a PDF, Word, Excel, CSV, JPG, or PNG file.');
      setIsSubmitting(false);
      return;
    }

    const recaptchaToken = await getRecaptchaToken();
    if (!recaptchaToken) {
      setError('reCAPTCHA verification failed. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const uploadedFile = await uploadSupplyListFile();
      const trimmedNotes = notes.trim();
      const messageWithFile = [
        'Quote request landing page',
        `Preferred contact: ${trimmedContactInfo}`,
        trimmedNotes ? `Notes: ${trimmedNotes}` : null,
        uploadedFile
          ? [
              'Supply list upload:',
              `File: ${uploadedFile.fileName}`,
              `Type: ${uploadedFile.mimeType}`,
              `Size: ${uploadedFile.fileSize} bytes`,
              `URL: ${uploadedFile.url}`
            ].join('\n')
          : null
      ]
        .filter(Boolean)
        .join('\n\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: contactEmail,
          school: '',
          message: messageWithFile,
          recaptchaToken
        })
      });
      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Could not send the request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      (window as WindowWithGtag).gtag?.('event', 'school_quote_request_submit', {
        event_category: 'lead',
        event_label: 'one_hour_quote_page'
      });
      (window as WindowWithGtag).gtag?.('event', 'ads_conversion_submit_lead_form', {
        event_category: 'lead',
        event_label: 'one_hour_quote_page'
      });
      setSuccess(true);
    } catch {
      setError('Could not send the request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-[#CFE8F0] bg-white p-6 text-[#073B4C] shadow-sm">
        <h2 className="text-2xl font-bold">Request received</h2>
        <p className="mt-3 text-sm leading-6 text-[#315565]">
          Thanks. We have your supply list and will review it within one business hour during the
          workday.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitQuoteRequest}
      className="rounded-lg border border-[#CFE8F0] bg-white p-5 shadow-xl shadow-[#073B4C]/10"
    >
      <div className="grid gap-4">
        <label className="text-sm font-semibold text-[#073B4C]">
          First and last name
          <input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-1 w-full rounded-md border border-[#D7EEF5] px-3 py-2 text-sm font-normal outline-none focus:border-[#0B80A7]"
          />
        </label>
        <label className="text-sm font-semibold text-[#073B4C]">
          Email or phone
          <input
            required
            placeholder="name@school.org or 555-555-5555"
            value={contactInfo}
            onChange={(event) => setContactInfo(event.target.value)}
            className="mt-1 w-full rounded-md border border-[#D7EEF5] px-3 py-2 text-sm font-normal outline-none focus:border-[#0B80A7]"
          />
        </label>
        <div className="text-sm font-semibold text-[#073B4C]">
          <span>School supply list</span>
          <input
            id={fileInputId}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,image/jpeg,image/png"
            onChange={(event) => setSupplyListFile(event.target.files?.[0] || null)}
            className="sr-only"
          />
          <label
            htmlFor={fileInputId}
            className="mt-1 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-[#D7EEF5] bg-white px-3 py-3 text-left text-sm font-normal outline-none transition hover:border-[#0B80A7] focus:border-[#0B80A7]"
          >
            <span className={supplyListFile ? 'text-[#073B4C]' : 'text-[#8A9AA3]'}>
              {supplyListFile ? supplyListFile.name : 'Choose supply list file'}
            </span>
            <span className="cursor-pointer rounded-full bg-[#E7F7FB] px-3 py-1.5 text-xs font-bold text-[#0B80A7]">
              Browse
            </span>
          </label>
          <span className="mt-1 block text-xs font-normal leading-5 text-[#647985]">
            PDF, Word, Excel, CSV, JPG, or PNG. Max 10 MB.
          </span>
        </div>
        <label className="text-sm font-semibold text-[#073B4C]">
          Notes <span className="font-normal text-[#647985]">(optional)</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Add school name, grade range, timing, or anything we should know."
            className="mt-1 w-full resize-none rounded-md border border-[#D7EEF5] px-3 py-2 text-sm font-normal outline-none focus:border-[#0B80A7]"
          />
        </label>
      </div>
      <p className="mt-4 text-xs leading-5 text-[#647985]">
        This form is protected by reCAPTCHA. Please do not include student personal information.
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded-full bg-[#0B80A7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#096c8c] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending request...' : 'Send quote request'}
      </button>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
