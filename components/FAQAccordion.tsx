"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-colors duration-150 hover:border-slate-300"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left font-display font-semibold text-base sm:text-lg text-slate-900 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-brand-blue" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`transition-all duration-200 ease-out overflow-hidden ${
                isOpen ? "max-h-[420px] border-t border-slate-100" : "max-h-0"
              }`}
            >
              <div className="p-5 text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/50">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
