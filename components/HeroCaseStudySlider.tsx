"use client";

import React, { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { caseStudiesData } from "@/lib/caseStudiesData";

/**
 * Static Productized Proof Panel (Replaces auto-rotating HeroCaseStudySlider).
 * Research #6 & #7: Eliminates auto-rotation (WCAG 2.2.2 & carousel blindness)
 * and pairs a light-surface elevated ledger with WAI-ARIA APG keyboard tabs.
 */
const HERO_STUDY_ORDER = [
  { slug: "saas-consulting", label: "B2B SaaS" },
  { slug: "local-service", label: "Local HVAC" },
  { slug: "ecommerce-store", label: "E-Commerce" },
] as const;

export default function HeroCaseStudySlider() {
  const studies = HERO_STUDY_ORDER.map(({ slug, label }) => ({
    ...caseStudiesData[slug],
    tabLabel: label,
  })).filter((s) => Boolean(s.slug));

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const currentStudy = studies[activeIndex];

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % studies.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + studies.length) % studies.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = studies.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="lg:col-span-5 bento-card p-6 shadow-[var(--shadow-whisper)] flex flex-col justify-between gap-5 text-left">
      {/* Header & Manual WAI-ARIA APG Tab Switcher (Zero Auto-Rotation) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow-mono text-ink-muted">
            Verified Client Ledger · Live Proof
          </p>
          <span className="tracking-id text-xs font-semibold text-kpi-positive">
            0{activeIndex + 1}/0{studies.length}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Select verified client vertical"
          className="grid grid-cols-3 gap-1.5 p-1 rounded-[var(--radius-btn)] bg-subtle border border-border-hairline"
        >
          {studies.map((study, idx) => {
            const selected = idx === activeIndex;
            const tabId = `${baseId}-hero-tab-${idx}`;
            const panelId = `${baseId}-hero-panel`;
            return (
              <button
                key={study.slug}
                id={tabId}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-11 px-2.5 py-2 rounded-[var(--radius-input)] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selected
                    ? "bg-card text-ink shadow-[var(--shadow-whisper)] border border-border-hairline"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {study.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concentric Embedded Outcome Panel */}
      <div
        id={`${baseId}-hero-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-hero-tab-${activeIndex}`}
        className="bento-card__visual-well p-4 sm:p-5 space-y-4 bg-canvas"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 caption-meta text-ink-muted font-medium">
          <span>
            {currentStudy.shortTag}
            <span aria-hidden="true"> · </span>
            {currentStudy.region}
          </span>
          <span className="tracking-id font-semibold text-ink">
            {currentStudy.timeframe}
          </span>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-trust">
            {currentStudy.businessType}
          </p>
          <h2 className="type-kpi-card text-ink">
            {currentStudy.heroHeadline}
          </h2>
          <p className="text-sm font-semibold text-kpi-positive">
            ▲ {currentStudy.heroSubheadline}
          </p>
        </div>

        <div className="border-t border-border-hairline pt-3.5 space-y-2">
          <p className="eyebrow-mono text-ink-muted">Primary Leak Sealed</p>
          <p className="text-sm text-ink-secondary leading-relaxed flex items-start gap-2">
            <CheckCircle2
              className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{currentStudy.leaksSealed[0]}</span>
          </p>
        </div>

        <div className="border-t border-border-hairline pt-3.5 space-y-1">
          <p className="text-sm text-ink-secondary leading-relaxed italic">
            &ldquo;{currentStudy.quote}&rdquo;
          </p>
          <p className="caption-meta font-semibold text-ink-muted">
            — {currentStudy.quoteAuthor}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <span className="caption-meta text-ink-muted">
          Un-gated buying-committee breakdown
        </span>
        <Link
          href={`/case-studies/${currentStudy.slug}`}
          className="inline-flex items-center gap-1.5 min-h-11 px-2 text-sm font-semibold text-trust hover:text-trust-hover transition-colors whitespace-nowrap shrink-0 group"
        >
          <span>Inspect full case</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
