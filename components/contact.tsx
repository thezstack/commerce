// app/components/ContactForm.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{field: string, message: string}[]>([]);
  const searchParams = useSearchParams();

  const schoolFromQuery = useMemo(() => {
    const value = searchParams.get('school');
    return value ? value.trim() : '';
  }, [searchParams]);

  const personaFromQuery = useMemo(() => {
    const value = searchParams.get('persona');
    return value ? value.trim() : '';
  }, [searchParams]);
  
  // References for form fields
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  // Load the reCAPTCHA v3 script
  useEffect(() => {
    // Only load if not already loaded
    if (!window.grecaptcha && !document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcKwFErAAAAALq-9tSJhg_6-RPVD_qhfOUojw1l'}`;
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
        {action: 'contact_form'}
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
        school: schoolFromQuery,
        message: [
          personaFromQuery ? `Persona: ${personaFromQuery}` : null,
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
      } else if (result.error) {
        // Display the error message from the server
        setError(result.error);
        
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

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 font-['Open Sans']">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-1/2">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">Partner with us</h1>
          {schoolFromQuery ? (
            <p className="mb-3 text-sm text-gray-600">
              You’re reaching out about: <span className="font-semibold">{schoolFromQuery}</span>
            </p>
          ) : null}
          <p className="mb-6 text-sm sm:text-base lg:text-lg">
          We work closely with schools to create customized supply kits that meet exact
            classroom requirements, saving time and reducing stress for everyone involved.
          </p>
          <p className="mb-4 text-sm sm:text-base lg:text-lg">By partnering with SchoolKits, you'll:</p>
          <ul className="mb-6 space-y-2">
            {[
              "Ensure all students have the right materials from day one",
              "Reduce administrative workload for teachers and staff",
              "Offer a convenient, hassle-free option for parents"
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
            Let's work together to create a smoother back-to-school season. Fill out the form below to start the conversation about bringing SchoolKits to your school.
          </p>
        </div>
        <div className="lg:w-1/2">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full rounded-md border p-2 text-sm"
                required
                ref={fullNameRef}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border p-2 text-sm"
                required
                ref={emailRef}
              />
            </div>
            {/* School field removed as requested */}
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-md border p-2 text-sm"
                required
                ref={messageRef}
              ></textarea>
            </div>
            {/* reCAPTCHA v3 is invisible and doesn't need a UI component */}
            <div className="my-4 text-xs text-gray-500">
              This form is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and
              <a href="https://policies.google.com/terms" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> Terms of Service</a> apply.
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
            
            {validationErrors.length > 0 && (
              <div className="mt-2 text-sm text-red-500">
                <ul>
                  {validationErrors.map((err, index) => (
                    <li key={index}>{err.field}: {err.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
