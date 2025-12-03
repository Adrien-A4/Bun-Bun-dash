"use client";
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="flex justify-between items-center w-full py-3 text-left group focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: '#3a2a13' }}
      >
        <h3 className="text-lg font-semibold group-hover:text-[#b86b00] transition-colors" style={{ color: '#3a2a13' }}>{question}</h3>
        <FiChevronDown className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: '#b86b00' }} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-3' : 'max-h-0'}`}
        style={{ color: '#7a4a00' }}>
        <p>{answer}</p>
      </div>
    </div>
  );
}