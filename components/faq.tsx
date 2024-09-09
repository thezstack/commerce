"use client"
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 shadow-sm bg-white">
      <button
        className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
        onClick={onClick}
      >
        <span>{question}</span>
        <svg
          className={`h-6 w-6 transform ${isOpen ? 'rotate-180' : ''} text-[#0B80A7]`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 border-t border-gray-200">
          <p className="text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'parents' | 'schools'>('parents');

  const parentFAQs: FAQItem[] = [
    {
      question: "How do we get our School Kit?",
      answer: "We deliver directly to your child's classroom before school starts. This ensures that all supplies are ready for the first day of school."
    },
    {
      question: "Can you label my child's school kit?",
      answer: "Yes, we label all kits with your child's name."
    },
    {
      question: "When do I need to order by?",
      answer: "We recommend ordering at least 3 weeks before the school year starts to ensure timely delivery. However, specific cut-off dates may vary by school, so please check your school's information page."
    },
    {
      question: "What if I'm not satisfied with the quality of the supplies?",
      answer: "We stand behind the quality of our products. If you're not satisfied, please contact our customer service within 30 days of receiving your kit, and we'll make it right."
    },
    {
      question: "Can I customize the kit contents?",
      answer: "The kit contents are standardized based on your school's requirements."
    }
  ];

  const schoolFAQs: FAQItem[] = [
    {
      question: "How does the School Kit program benefit our school?",
      answer: "Our School Kit program saves time for teachers and administrators, ensures all students have the right supplies."
    },
    {
      question: "How do we set up a School Kit program for our school?",
      answer: "Contact our school partnership team to set up a consultation. We'll guide you through the process of creating custom supply lists, setting up your school's ordering page, and managing deliveries."
    },
    {
      question: "Can we customize the supply lists for each grade or class?",
      answer: "Absolutely! We work with your teachers to create custom lists for each grade level or even specific classes if needed."
    },
    {
      question: "How are the kits delivered to the school?",
      answer: "We coordinate bulk delivery of all kits to your school before the school year starts. Kits are sorted by class for easy distribution."
    },
    {
      question: "Is there a minimum number of participants required?",
      answer: "While there's no strict minimum, the program is most effective with broad participation. We can discuss strategies to encourage participation during our consultation."
    }
  ];

  const activeFAQs = activeTab === 'parents' ? parentFAQs : schoolFAQs;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-full ${activeTab === 'parents' ? 'bg-[#0B80A7] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveTab('parents')}
        >
          For parents
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${activeTab === 'schools' ? 'bg-[#0B80A7] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveTab('schools')}
        >
          For schools
        </button>
      </div>
      {activeFAQs.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={index === openItem}
          onClick={() => setOpenItem(index === openItem ? null : index)}
        />
      ))}
    </div>
  );
};

export default FAQ;