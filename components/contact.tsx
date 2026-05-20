// app/components/ContactForm.tsx
'use client';

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

    return () => {
      // Cleanup if component unmounts
      const script = document.querySelector('script[src*="recaptcha"]');
      if (script) {
        script.remove();
      }
    };
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
  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setValidationErrors([]);

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken();
      if (!recaptchaToken) {
        setError('reCAPTCHA verification failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Create request payload
      const formData = {
        fullName: fullNameRef.current?.value || '',
        email: emailRef.current?.value || '',
        school: resolvedSchool,
        message: [
          resolvedPersona ? `Persona: ${resolvedPersona}` : null,
          metadata?.schoolSlug ? `School slug: ${metadata.schoolSlug}` : null,
          messageRef.current?.value || ''
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

      if (result.success) {
        window.gtag?.('event', 'school_contact_form_submit', {
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
      <div className="mx-auto max-w-6xl p-4 text-center sm:p-6 lg:p-8">
        <h2 className="mb-4 text-2xl font-bold">Thank you for contacting us!</h2>
        <p>We have received your message and will get back to you soon.</p>
      </div>
    );
  }

  const inputClassName = (fieldName: string) =>
    `w-full rounded-md border p-2 text-sm ${
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
            <p className="mb-6 text-sm sm:text-base lg:text-lg">
              We work closely with schools to create customized supply kits that meet exact
              classroom requirements, saving time and reducing stress for everyone involved.
            </p>
            <p className="mb-4 text-sm sm:text-base lg:text-lg">
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
            <p className="mb-6 text-sm sm:text-base lg:text-lg">
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
          <div className="space-y-4">
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
              type="button"
              className="w-full rounded-full bg-[#0B80A7] px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#096c8c] sm:text-base"
              disabled={isSubmitting}
              onClick={handleFormSubmit}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
