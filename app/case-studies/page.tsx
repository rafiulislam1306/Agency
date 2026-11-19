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
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-semibold text-brand-green-hover">
            Verified Outcomes · Closed-Loop Attribution
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Results Built on Sealed Leaks, Not Vanity Impressions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
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

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto bg-brand-blue rounded-2xl p-8 sm:p-12 text-white text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Want to See Our Flat-Fee Retainers &amp; ROI Calculator?
          </h2>
          <p className="text-blue-100 text-base max-w-xl mx-auto leading-relaxed">
            Zero percentage-of-spend markups, month-to-month terms, and 100% client ownership of every account from day one.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <CTAButton href="/pricing" variant="primary" size="lg">
              View Flat-Fee Pricing
            </CTAButton>
            <CTAButton href="/contact" variant="white" size="lg">
              Book Free Leak Audit
            </CTAButton>
          </div>
          <p className="text-xs text-blue-200 pt-2">
            *Illustrative benchmarks reflect documented optimization frameworks; outcomes depend on local market competition, close rate, and budget.
          </p>
        </div>
      </div>
    </div>
  );
}
