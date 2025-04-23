import React from 'react';

export const metadata = {
  title: 'Affiliate Disclosure',
  description: 'Affiliate Disclosure for SchoolKits'
};

export default function AffiliateDisclosure() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Affiliate Disclosure</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Affiliate Disclosure Statement</h2>
        <p>This Affiliate Disclosure is provided by SchoolKits ("we," "our," or "us") to inform you that this website contains affiliate links, which means we may receive a commission if you click on a link and make a purchase. This comes at no additional cost to you and helps support our website and content creation.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Partnerships</h2>
        <p>SchoolKits is a participant in various affiliate marketing programs, including but not limited to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Walmart Affiliate Program</li>
          <li>Target Affiliate Program</li>
          <li>Amazon Associates Program</li>
          <li>Other affiliate programs through Impact.com and similar affiliate networks</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
        <p>When you click on an affiliate link on our website, a cookie will be placed on your browser. If you purchase a product after clicking an affiliate link, we will receive a small commission from the retailer at no additional cost to you.</p>
        <p>These commissions help us maintain and improve our website and continue providing valuable content and services to our users.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Product Recommendations</h2>
        <p>We only recommend products that we believe will be valuable to our users. While we may receive commissions for recommending certain products, our opinions and reviews are always honest and unbiased.</p>
        <p>We strive to provide accurate and up-to-date information, but we make no representations or warranties about the completeness, reliability, or accuracy of the information on this website.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Identification of Affiliate Links</h2>
        <p>We aim to clearly identify affiliate links on our website. However, you should assume that any links to products or services on our website are affiliate links unless stated otherwise.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Acknowledgment</h2>
        <p>By using our website, you acknowledge that you understand this disclosure and that you may be supporting our website through your purchases via affiliate links.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Disclosure</h2>
        <p>We reserve the right to modify this Affiliate Disclosure at any time. Changes will be effective immediately upon posting on this page. We encourage you to review this Affiliate Disclosure periodically for any changes.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>If you have any questions about this Affiliate Disclosure, please contact us at:</p>
        <p className="mb-8">
          SchoolKits<br />
          Email: hello@schoolkits.org
        </p>
      </div>
    </div>
  );
}
