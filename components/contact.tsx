// app/components/ContactForm.tsx
'use client'

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
        throw new Error(result.error);
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitSuccess) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for contacting us!</h2>
        <p>We have received your message and will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Partner with us</h1>
          <p className="mb-6 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Email</h2>
            <p className="text-sm sm:text-base">hello@schoolkits.org</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Socials</h2>
            <div className="flex flex-col space-y-2">
              <a href="#" className="flex items-center text-sm sm:text-base">
                {/* <img src="/instagram-icon.svg" alt="Instagram" className="w-5 h-5 mr-2" /> */}
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center text-sm sm:text-base">
                {/* <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5 mr-2" /> */}
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block mb-1 text-sm font-medium">Full name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName"
                className="w-full border rounded-md p-2 text-sm" 
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="w-full border rounded-md p-2 text-sm" 
                required
              />
            </div>
            <div>
              <label htmlFor="school" className="block mb-1 text-sm font-medium">Name of your school</label>
              <input 
                type="text" 
                id="school" 
                name="school"
                className="w-full border rounded-md p-2 text-sm" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows={4}
                className="w-full border rounded-md p-2 text-sm" 
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#0B80A7] text-white py-3 px-4 rounded-full text-sm sm:text-base font-medium hover:bg-[#096c8c] transition-colors duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>

  );
};

export default ContactForm;