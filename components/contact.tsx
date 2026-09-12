// app/components/ContactForm.tsx
'use client';

import { Check, FileText, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import classroomStudents from '../media/tefa-classroom-students.png';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type ContactFormProps = {
  variant?: 'page' | 'modal';
  prefillSchool?: string;
  metadata?: { persona?: string; schoolSlug?: string };
  onSuccess?: () => void;
};

const ContactForm = ({
  variant = 'page',
  prefillSchool,
  metadata,
  onSuccess
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const searchParams = useSearchParams();

  const schoolFromQuery = useMemo(() => {
    const value = searchParams.get('school');
    return value ? value.trim() : '';
  }, [searchParams]);

  const personaFromQuery = useMemo(() => {
    const value = searchParams.get('persona');
    return value ? value.trim() : '';
  }, [searchParams]);

  const resolvedSchool = (prefillSchool || schoolFromQuery).trim();
  const resolvedPersona = (metadata?.persona || personaFromQuery).trim();

  const fieldErrors = useMemo(() => {
    return validationErrors.reduce<Record<string, string>>((errors, validationError) => {
      errors[validationError.field] = validationError.message;
      return errors;
    }, {});
  }, [validationErrors]);

  // References for form fields
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadedFile = useRef<{ file: File; url: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const selectFile = (files: FileList | null) => {
    if (isSubmitting || !files?.length) return;
    if (files.length > 1) {
      setValidationErrors([
        { field: 'supplyList', message: 'Please choose one supply list at a time.' }
      ]);
      return;
    }
    setSelectedFile(files[0]);
    uploadedFile.current = null;
    setValidationErrors((errors) => errors.filter(({ field }) => field !== 'supplyList'));
  };

  // Load the reCAPTCHA v3 script
  useEffect(() => {
    // Only load if not already loaded
    if (!window.grecaptcha && !document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcKwFErAAAAALq-9tSJhg_6-RPVD_qhfOUojw1l'
      }`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // reCAPTCHA is shared for the page lifetime. Keep a pending loader intact
    // when the dialog closes so reopening cannot strand a partially loaded API.
  }, []);

  // Function to get reCAPTCHA token
  const getRecaptchaToken = async (): Promise<string> => {
    if (!window.grecaptcha) {
      console.error('reCAPTCHA not loaded');
      return '';
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcKwFErAAAAALq-9tSJhg_6-RPVD_qhfOUojw1l',
        { action: 'contact_form' }
      );
      return token;
    } catch (error) {
      console.error('Error getting reCAPTCHA token:', error);
      return '';
    }
  };

  // Form submission handler with API endpoint
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    setValidationErrors([]);

    try {
      for (const input of [fullNameRef.current, emailRef.current, messageRef.current]) {
        if (input && !input.reportValidity()) return;
      }
      const file = selectedFile;
      if (file) {
        const allowedTypes = new Set([
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/csv',
          'image/jpeg',
          'image/png'
        ]);
        const fileError = !file.size
          ? 'This file is empty. Choose your supply list.'
          : file.size > 10 * 1024 * 1024
          ? 'Upload a file no larger than 10 MB.'
          : !allowedTypes.has(file.type)
          ? 'Upload a PDF, Word, Excel, CSV, JPG, or PNG file.'
          : '';
        if (fileError) {
          setValidationErrors([{ field: 'supplyList', message: fileError }]);
          return;
        }
      }
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken();
      if (!recaptchaToken) {
        setError('reCAPTCHA verification failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      let supplyListMessage = '';
      if (file) {
        if (uploadedFile.current?.file !== file) {
          const uploadData = new FormData();
          uploadData.append('file', file);
          const uploadResponse = await fetch('/api/quote-supply-list-upload', {
            method: 'POST',
            body: uploadData
          });
          const uploadResult = await uploadResponse.json().catch(() => null);
          if (!uploadResponse.ok || !uploadResult?.success || !uploadResult?.url) {
            setValidationErrors([
              {
                field: 'supplyList',
                message:
                  uploadResult?.error || 'Could not upload your supply list. Please try again.'
              }
            ]);
            return;
          }
          uploadedFile.current = { file, url: uploadResult.url };
        }
        supplyListMessage = `Supply list upload:\nFile: ${file.name}\nURL: ${uploadedFile.current.url}`;
      }

      // Create request payload
      const formData = {
        fullName: fullNameRef.current?.value || '',
        email: emailRef.current?.value || '',
        school: resolvedSchool,
        message: [
          resolvedPersona ? `Persona: ${resolvedPersona}` : null,
          metadata?.schoolSlug ? `School slug: ${metadata.schoolSlug}` : null,
          messageRef.current?.value || '',
          supplyListMessage
        ]
          .filter(Boolean)
          .join('\n\n'),
        recaptchaToken: recaptchaToken
      };

      // Send data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        window.gtag?.('event', 'school_contact_form_submit', {
          event_category: 'lead',
          event_label: resolvedPersona || 'contact_form'
        });
        window.gtag?.('event', 'ads_conversion_submit_lead_form', {
          event_category: 'lead',
          event_label: resolvedPersona || 'contact_form'
        });
        setSubmitSuccess(true);
        onSuccess?.();
      } else if (result.error) {
        // Display the error message from the server
        setError(result.validationErrors ? '' : result.error);

        // Handle validation errors if present
        if (result.validationErrors) {
          setValidationErrors(result.validationErrors);
        }
      } else {
        // Fallback error message
        setError('Failed to submit form. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div role="status" className="mx-auto max-w-6xl p-4 text-center sm:p-6 lg:p-8">
        <h2 className="mb-4 text-2xl font-bold">Thank you for contacting us!</h2>
        <p>We have received your message and will get back to you soon.</p>
      </div>
    );
  }

  const inputClassName = (fieldName: string) =>
    `w-full rounded-md border p-3 text-[16px] ${
      fieldErrors[fieldName]
        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:outline-red-500'
        : ''
    }`;

  const fieldErrorMessage = (fieldName: string) =>
    fieldErrors[fieldName] ? (
      <p id={`${fieldName}-error`} className="mt-1 text-sm text-red-600">
        {fieldErrors[fieldName]}
      </p>
    ) : null;

  return (
    <div
      className={
        variant === 'modal'
          ? "font-['Open Sans']"
          : "font-['Open Sans'] mx-auto max-w-6xl p-4 sm:p-6 lg:p-8"
      }
    >
      <div
        className={
          variant === 'modal' ? 'grid gap-4 sm:grid-cols-2' : 'flex flex-col gap-8 lg:flex-row'
        }
      >
        {variant === 'page' ? (
          <div className="lg:w-1/2">
            <h1 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">Partner with us</h1>
            {resolvedSchool ? (
              <p className="mb-3 text-sm text-gray-600">
                You’re reaching out about: <span className="font-semibold">{resolvedSchool}</span>
              </p>
            ) : null}
            <p className="mb-6 text-sm sm:text-[16px] lg:text-lg">
              We work closely with schools to create customized supply kits that meet exact
              classroom requirements, saving time and reducing stress for everyone involved.
            </p>
            <figure className="mb-6 overflow-hidden rounded-2xl border border-[#DCE9E8] bg-[#F0F7F6]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={classroomStudents}
                  alt="Students working together with notebooks and colorful school supplies in a bright classroom"
                  fill
                  sizes="(min-width: 1024px) 536px, (min-width: 640px) 90vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-medium text-[#073B4C] sm:px-5">
                A little less planning. A lot more learning.
              </figcaption>
            </figure>
            <p className="mb-4 text-sm sm:text-[16px] lg:text-lg">
              By partnering with SchoolKits, you'll:
            </p>
            <ul className="mb-6 space-y-2">
              {[
                'Ensure all students have the right materials from day one',
                'Reduce administrative workload for teachers and staff',
                'Offer a convenient, hassle-free option for parents'
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
            <p className="mb-6 text-sm sm:text-[16px] lg:text-lg">
              Let's work together to create a smoother back-to-school season. Fill out the form
              below to start the conversation about bringing SchoolKits to your school.
            </p>
          </div>
        ) : (
          <div className="sm:col-span-2">
            {resolvedSchool ? (
              <p className="mb-4 text-sm text-gray-600">
                About <span className="font-semibold">{resolvedSchool}</span>
              </p>
            ) : null}
          </div>
        )}

        <div className={variant === 'modal' ? 'sm:col-span-2' : 'lg:w-1/2'}>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-[#073B4C]">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={inputClassName('fullName')}
                required
                ref={fullNameRef}
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
              />
              {fieldErrorMessage('fullName')}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#073B4C]">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={inputClassName('email')}
                required
                ref={emailRef}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrorMessage('email')}
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-[#073B4C]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={variant === 'modal' ? 5 : 4}
                className={inputClassName('message')}
                required
                ref={messageRef}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
              />
              {fieldErrorMessage('message')}
            </div>
            <div>
              <p className="mb-2 flex items-center justify-between text-sm font-medium text-[#073B4C]">
                School supply list
                <span className="text-xs font-normal text-gray-500">Optional</span>
              </p>
              <div
                className={`relative rounded-xl border-2 border-dashed transition-colors ${
                  isSubmitting ? 'opacity-60' : ''
                } ${
                  isDragging
                    ? 'border-[#0B80A7] bg-[#E4F4FA]'
                    : fieldErrors.supplyList
                    ? 'border-red-400 bg-red-50'
                    : 'border-[#BCD7E1] bg-[#F5FAFC] hover:border-[#0B80A7] hover:bg-[#EDF7FA]'
                }`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  if (isSubmitting) return;
                  dragDepth.current += 1;
                  setIsDragging(true);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = isSubmitting ? 'none' : 'copy';
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  dragDepth.current = Math.max(0, dragDepth.current - 1);
                  if (!dragDepth.current) setIsDragging(false);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  dragDepth.current = 0;
                  setIsDragging(false);
                  selectFile(event.dataTransfer.files);
                }}
              >
                <input
                  id="supplyList"
                  name="supplyList"
                  type="file"
                  ref={fileRef}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                  className="sr-only"
                  tabIndex={-1}
                  aria-label="Choose school supply list"
                  onChange={(event) => {
                    selectFile(event.target.files);
                    event.target.value = '';
                  }}
                />
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => fileRef.current?.click()}
                  aria-describedby={`supplyList-help${
                    fieldErrors.supplyList ? ' supplyList-error' : ''
                  }`}
                  aria-invalid={Boolean(fieldErrors.supplyList)}
                  className="flex w-full flex-col items-center rounded-xl px-5 py-7 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B80A7] disabled:cursor-wait"
                >
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B80A7] shadow-sm ring-1 ring-[#DCECF2]">
                    <UploadCloud size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-[#073B4C]">
                    {isDragging
                      ? 'Drop your list here'
                      : selectedFile
                      ? 'Want to use a different list?'
                      : 'Drag & drop your supply list'}
                  </span>
                  <span className="mt-1 text-sm text-gray-500">
                    or{' '}
                    <span className="font-semibold text-[#0B80A7] underline underline-offset-4">
                      browse files
                    </span>
                  </span>
                  <span id="supplyList-help" className="mt-3 text-xs leading-5 text-gray-500">
                    PDF, Word, Excel, CSV, JPG or PNG · Up to 10 MB
                  </span>
                </button>
              </div>
              <div aria-live="polite">
                {selectedFile && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#DCE9E8] bg-white p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF7F3] text-[#238268]">
                      <FileText size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium text-[#073B4C]"
                        title={selectedFile.name}
                      >
                        {selectedFile.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                        <Check size={12} aria-hidden="true" /> Selected ·{' '}
                        {selectedFile.size < 1024 * 1024
                          ? `${Math.max(1, Math.round(selectedFile.size / 1024))} KB`
                          : `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      aria-label="Remove file"
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-[#0B80A7]"
                      onClick={() => {
                        setSelectedFile(null);
                        uploadedFile.current = null;
                        setValidationErrors((errors) =>
                          errors.filter(({ field }) => field !== 'supplyList')
                        );
                      }}
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>
                )}
                {fieldErrorMessage('supplyList')}
              </div>
            </div>
            <div className="my-4 text-xs text-gray-500">
              This form is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Privacy Policy
              </a>{' '}
              and
              <a
                href="https://policies.google.com/terms"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Terms of Service
              </a>{' '}
              apply.
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#0B80A7] px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#096c8c] sm:text-[16px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {error && (
              <p role="alert" className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
