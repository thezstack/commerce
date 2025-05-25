// app/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { submitContactForm } from '../app/[page]/actions';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitSuccess(true);
      } else {
        // Display the detailed error if available
        const errorMessage = result.details ? 
          `Error: ${result.error}. Details: ${result.details}` : 
          result.error;
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <p className="mb-6 text-sm sm:text-base lg:text-lg">
            Join SchoolKits in simplifying the back-to-school experience for your students, parents,
            and staff. We work closely with schools to create customized supply kits that meet exact
            classroom requirements, saving time and reducing stress for everyone involved.
          </p>
          <p className="mb-4 text-sm sm:text-base lg:text-lg">By partnering with SchoolKits, you'll:</p>
          <ul className="mb-6 space-y-2">
            {[
              "Streamline the supply procurement process",
              "Ensure all students have the right materials from day one",
              "Reduce administrative workload for teachers and staff",
              "Offer a convenient, hassle-free option for parents",
              "Support equal access to quality supplies for all students"
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
          {/* 
          <div>
            <h2 className="text-xl font-bold mb-2">Follow us on Social Media</h2>
            <div className="flex flex-col space-y-2">
              <a href="https://www.instagram.com" className="flex items-center text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                <img src="/instagram-icon.svg" alt="Instagram" className="w-5 h-5 mr-2" />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com" className="flex items-center text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
          */}
        </div>
        <div className="lg:w-1/2">
          <form action={handleSubmit} className="space-y-4">
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
              />
            </div>
            <div>
              <label htmlFor="school" className="mb-1 block text-sm font-medium">
                Name of your school
              </label>
              <input
                type="text"
                id="school"
                name="school"
                className="w-full rounded-md border p-2 text-sm"
              />
            </div>
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
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#0B80A7] px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#096c8c] sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
