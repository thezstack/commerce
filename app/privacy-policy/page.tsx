import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for SchoolKits'
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>Welcome to SchoolKits ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected to it (collectively, the "Site").</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
        <p>Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Derivative Data</h3>
        <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Your Information</h2>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Create and manage your account.</li>
          <li>Process your orders and manage your transactions.</li>
          <li>Email you regarding your account or order.</li>
          <li>Send you product and service updates.</li>
          <li>Respond to your inquiries and customer service requests.</li>
          <li>Deliver targeted advertising, newsletters, and other information regarding promotions.</li>
          <li>Administer sweepstakes, promotions, and contests.</li>
          <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclosure of Your Information</h2>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">By Law or to Protect Rights</h3>
        <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Third-Party Service Providers</h3>
        <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Communications</h3>
        <p>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Affiliates</h3>
        <p>We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Tracking Technologies</h2>
        <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. For more information on how we use cookies, please refer to our Cookie Policy posted on the Site, which is incorporated into this Privacy Policy.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Websites</h2>
        <p>The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Security of Your Information</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
        <p>We do not knowingly collect information from children under the age of 13. If you are under the age of 13, please do not submit any personal information through the Site. If you have reason to believe that a child under the age of 13 has provided personal information to us, please contact us, and we will endeavor to delete that information from our databases.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
        <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <p className="mb-8">
          SchoolKits<br />
          Email: hello@schoolkits.org
        </p>
      </div>
    </div>
  );
}
