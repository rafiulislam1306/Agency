import React from "react";
import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudiesData } from "@/lib/caseStudiesData";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Case Studies | Verified Revenue & Leak-Sealed Search Results",
  description:
    "Inspect how we seal wasted Google Ads spend, capture Google Maps 3-Pack calls, and prove Money-In vs. Money-Out ROI for SMBs.",
};

export default function CaseStudiesPage() {
  const studies = Object.values(caseStudiesData);

  return (
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div
          data-cta-sentinel="hero"
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <p className="eyebrow-mono text-kpi-positive">
            Verified Outcomes · Closed-Loop Attribution
          </p>
          <h1 className="type-hero font-display font-bold text-ink">
            Results Built on Sealed Leaks, Not Vanity Impressions
          </h1>
          <p className="type-lead text-ink-secondary mx-auto">
            Inspect the exact wasted-spend leaks we shut down, the Google Business Profile fixes we deployed, and the verified revenue tracked for each client.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {studies.map((study) => (
            <CaseStudyCard
              key={study.slug}
              slug={study.slug}
              businessType={study.businessType}
              region={study.region}
              metric={study.metric}
              timeframe={study.timeframe}
              serviceUsed={study.shortTag}
              quote={study.quote}
              quoteAuthor={study.quoteAuthor}
            />
          ))}
        </div>

        {/* Bottom CTA (.surface-dark proof band) */}
        <div
          data-cta-sentinel="footer-cta"
          className="surface-dark max-w-4xl mx-auto bg-canvas border border-border-hairline rounded-[var(--radius-bento)] p-8 sm:p-12 text-ink text-center space-y-5 shadow-[var(--shadow-dark-edge)]"
        >
          <h2 className="type-h2 font-display font-bold text-ink">
            Want to See Our Flat-Fee Retainers &amp; ROI Calculator?
          </h2>
          <p className="text-ink-secondary text-base max-w-xl mx-auto leading-relaxed">
            Zero percentage-of-spend markups, month-to-month terms, and 100% client ownership of every account from day one.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <CTAButton href="/pricing" variant="dark-primary" size="lg">
              View Flat-Fee Pricing
            </CTAButton>
            <CTAButton href="/contact" variant="white" size="lg">
              Book Free Leak Audit
            </CTAButton>
          </div>
          <p className="caption-meta text-ink-muted pt-2">
            *Illustrative benchmarks reflect documented optimization frameworks; outcomes depend on local market competition, close rate, and budget.
          </p>
        </div>
      </div>
    </div>
  );
}
