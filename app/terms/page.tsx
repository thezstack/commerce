import React from 'react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for SchoolKits'
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
        <p>By accessing our website at SchoolKits, you are agreeing to be bound by these Terms of Service and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on SchoolKits's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Modify or copy the materials;</li>
          <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>Attempt to decompile or reverse engineer any software contained on SchoolKits's website;</li>
          <li>Remove any copyright or other proprietary notations from the materials; or</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by SchoolKits at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
        <p>The materials on SchoolKits's website are provided on an 'as is' basis. SchoolKits makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <p>Further, SchoolKits does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
        <p>In no event shall SchoolKits or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SchoolKits's website, even if SchoolKits or a SchoolKits authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Accuracy of Materials</h2>
        <p>The materials appearing on SchoolKits's website could include technical, typographical, or photographic errors. SchoolKits does not warrant that any of the materials on its website are accurate, complete or current. SchoolKits may make changes to the materials contained on its website at any time without notice. However SchoolKits does not make any commitment to update the materials.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
        <p>SchoolKits has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SchoolKits of the site. Use of any such linked website is at the user's own risk.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications</h2>
        <p>SchoolKits may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Purchases</h2>
        <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
        <p>You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
        <p>The service may employ the use of third-party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
        <p>We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.</p>
        <p>We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p className="mb-8">
          SchoolKits<br />
          Email: hello@schoolkits.org
        </p>
      </div>
    </div>
  );
}
