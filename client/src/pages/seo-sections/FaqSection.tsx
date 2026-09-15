import React, { useState } from 'react';
import { FAQS } from '../../data/seoPageData';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#1A120B]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions — Varanasi Tour & Travel Agency
          </h2>
          <p className="text-slate-400 text-lg">
            Direct answers to the most common questions about traveling in Varanasi, booking tours, and choosing the
            right travel agency. Optimized for Google's People Also Ask and AI Overview answers.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-[#23160f]">
              <button
                className="w-full text-left flex justify-between items-center px-6 py-5 hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <h3 className="text-white font-semibold text-lg pr-8 m-0">{faq.q}</h3>
                <span
                  className={`material-symbols-outlined text-primary transition-transform duration-300 flex-shrink-0 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              <div
                id={`faq-answer-${idx}`}
                className={`overflow-hidden transition-all duration-300 px-6 ${
                  openFaq === idx ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
