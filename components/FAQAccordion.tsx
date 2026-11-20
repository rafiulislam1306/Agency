"use client";

import React, { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  setAllFaqIndices,
  toggleFaqIndex,
} from "@/lib/homepageBlueprintLogic";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

/**
 * NN/g Multi-Open Objection FAQ Accordion:
 * - Full-row clickable <button aria-expanded> with crisp caret signifier
 * - Allows multiple panels open simultaneously for side-by-side comparison
 * - Includes global Expand All / Collapse All toggle
 */
export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const baseId = useId();

  const allExpanded = items.length > 0 && openIndices.length === items.length;

  const handleToggleItem = (index: number) => {
    setOpenIndices((prev) => toggleFaqIndex(prev, index));
  };

  const handleToggleAll = () => {
    setOpenIndices(setAllFaqIndices(items.length, !allExpanded));
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 pb-1">
        <span className="caption-meta text-ink-muted metric-tabular">
          {openIndices.length} of {items.length} expanded
        </span>
        <button
          type="button"
          onClick={handleToggleAll}
          className="inline-flex items-center justify-center min-h-11 px-3.5 py-2 rounded-[var(--radius-btn)] border border-border-control bg-card text-xs font-semibold text-ink hover:border-trust hover:text-trust transition-colors cursor-pointer"
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const buttonId = `${baseId}-faq-btn-${index}`;
        const panelId = `${baseId}-faq-panel-${index}`;

        return (
          <div
            key={item.question}
            className="border border-border-hairline rounded-[var(--radius-tile)] overflow-hidden bg-card transition-colors duration-150 hover:border-border-strong"
          >
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => handleToggleItem(index)}
                className="w-full min-h-12 flex items-center justify-between gap-4 p-5 text-left font-display font-semibold text-base sm:text-lg text-ink bg-card hover:bg-canvas transition-colors cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-180 text-trust" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t border-border-hairline bg-canvas"
            >
              <div className="p-5 text-sm sm:text-base text-ink-secondary leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
