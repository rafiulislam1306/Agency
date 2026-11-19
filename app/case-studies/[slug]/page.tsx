import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { caseStudiesData } from "@/lib/caseStudiesData";
import CTAButton from "@/components/CTAButton";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData[slug];
  if (!study) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${study.businessType} (${study.metric})`,
    description: `${study.heroHeadline} — ${study.heroSubheadline}. ${study.goal}.`,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudiesData[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 mr-2 transition-transform duration-150 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to Case Studies
          </Link>
          <span className="text-xs font-medium text-slate-500">
            Un-Gated Buying-Committee Brief · Shareable Internally
          </span>
        </div>

        {/* 1. Result-Led Headline (Numbers First) */}
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="text-xs font-medium text-slate-500">
            <span className="text-brand-green-hover font-semibold">
              {study.serviceUsed}
            </span>
            <span aria-hidden="true"> · </span>
            <span>{study.region}</span>
            <span aria-hidden="true"> · </span>
            <span className="tabular-nums">{study.timeframe}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            {study.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600">
            <span className="font-semibold text-slate-800">
              {study.businessType}:
            </span>{" "}
            {study.heroSubheadline}
          </p>
        </div>

        {/* 2. 3-Metric Buying-Group Bar (Leadership / Marketing / Operations) */}
        <section
          aria-label="Buying group outcomes"
          className="bg-brand-blue rounded-2xl p-6 sm:p-8 text-white space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
            <div>
              <p className="text-xs font-semibold text-brand-green">
                Verified Outcomes by Stakeholder Role
              </p>
              <p className="text-sm text-blue-100 mt-0.5">{study.goal}</p>
            </div>
            <CTAButton href="/contact" variant="white" size="sm">
              Get Similar Audit
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {study.buyingGroupMetrics.map((item) => (
              <div
                key={item.stakeholder}
                className="rounded-xl bg-white/10 border border-white/15 p-4 space-y-1"
              >
                <span className="text-[11px] font-semibold text-blue-200 block">
                  {item.stakeholder}
                </span>
                <span className="text-2xl font-display font-extrabold text-brand-green block tabular-nums">
                  {item.value}
                </span>
                <span className="text-xs text-blue-100 block">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 4-Second Qualification Metadata Panel + Anchored Jump Links */}
        <section
          aria-label="Qualification metadata"
          className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">
                Industry &amp; Region
              </span>
              <span className="font-bold text-slate-900 mt-1 block">
                {study.businessType} ({study.region})
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">
                Company Profile
              </span>
              <span className="font-bold text-slate-900 mt-1 block">
                {study.companySize}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">
                Service Delivered
              </span>
              <Link
                href={study.relatedServiceHref}
                className="font-bold text-brand-blue hover:text-brand-orange mt-1 inline-flex items-center gap-1"
              >
                {study.relatedServiceLabel}
                <ArrowRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </Link>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">
                Tech Stack &amp; Timeframe
              </span>
              <span className="font-bold text-slate-900 mt-1 block">
                {study.techStack} · {study.timeframe}
              </span>
            </div>
          </div>

          {/* Jump Links */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
            <span className="text-slate-400">Jump to:</span>
            <a href="#problem" className="hover:text-brand-blue">
              01. Problem
            </a>
            <a href="#hypothesis" className="hover:text-brand-blue">
              02. Hypothesis
            </a>
            <a href="#execution" className="hover:text-brand-blue">
              04. Execution
            </a>
            <a href="#results" className="hover:text-brand-blue">
              05. Results
            </a>
            <a href="#migration-risk" className="hover:text-brand-blue">
              06. Migration Risk
            </a>
          </div>
        </section>

        {/* 4. Answer-First CSR Narrative */}
        <section id="problem" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            01. The Problem
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {study.situation}
          </p>
        </section>

        {/* Strategic Hypothesis */}
        <section
          id="hypothesis"
          className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-2.5 scroll-mt-24"
        >
          <h2 className="text-xl font-display font-bold text-brand-blue">
            02. Strategic Hypothesis
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {study.hypothesis}
          </p>
        </section>

        {/* Leaks Sealed First */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert
              className="w-5 h-5 text-brand-orange shrink-0"
              aria-hidden="true"
            />
            03. Immediate Leaks Sealed Before Scaling
          </h2>
          <ul className="space-y-2.5">
            {study.leaksSealed.map((leak) => (
              <li
                key={leak}
                className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700"
              >
                <CheckCircle2
                  className="w-4 h-4 text-brand-green shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{leak}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Execution Plan */}
        <section id="execution" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            04. Technical Execution &amp; Attribution Steps
          </h2>
          <div className="space-y-3">
            {study.whatWeDid.map((action, idx) => (
              <div
                key={action}
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white"
              >
                <span className="text-xs font-bold text-brand-blue tabular-nums mt-1">
                  0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Results */}
        <section id="results" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            05. Pipeline &amp; Revenue Result
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.results.map((result) => (
              <div
                key={result.label}
                className="border border-slate-200 rounded-xl p-5 bg-white"
              >
                <span className="text-xs text-slate-500 font-medium block">
                  {result.label}
                </span>
                <span className="text-xl font-display font-bold text-emerald-700 block mt-1 tabular-nums">
                  {result.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Impact if present */}
        {study.financialImpact ? (
          <section className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-display font-bold text-slate-900">
              Bottom-Line Financial Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 tabular-nums">
              <div>
                <span className="text-xs text-slate-600 font-medium block">
                  Avg. Job Value
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {study.financialImpact.avgJobValue}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-600 font-medium block">
                  Previous GBP Rev
                </span>
                <span className="text-lg font-bold text-slate-600">
                  {study.financialImpact.previousRevenue}/mo
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-600 font-medium block">
                  Current GBP Rev
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  {study.financialImpact.currentRevenue}/mo
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-600 font-medium block">
                  Net Monthly Gain
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  +{study.financialImpact.additionalRevenue}/mo
                </span>
              </div>
            </div>
            <div className="border-t border-emerald-200 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-sm font-medium text-slate-700">
                Annualized Map Pack Revenue Impact:
              </span>
              <span className="text-xl font-display font-extrabold text-emerald-700 tabular-nums">
                {study.financialImpact.annualImpact}/yr
              </span>
            </div>
          </section>
        ) : null}

        {/* 5. Migration Risk & Switching Objection Box (Research #5 Section 4) */}
        <section
          id="migration-risk"
          className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-24"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            06. Migration Risk &amp; Switching Objection Handled
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            {study.migrationRisk.fearTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed">
            <div className="bg-white rounded-xl border border-amber-200/80 p-4 space-y-1.5">
              <span className="text-xs font-semibold text-amber-800 block">
                What Nearly Blocked the Switch
              </span>
              <p className="text-slate-700">{study.migrationRisk.objection}</p>
            </div>
            <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-1.5">
              <span className="text-xs font-semibold text-emerald-700 block">
                How We De-Risked Execution
              </span>
              <p className="text-slate-700">
                {study.migrationRisk.howWeDeRisked}
              </p>
            </div>
          </div>
        </section>

        {/* Client Quote (clean hairline box, no thick left border) */}
        <blockquote className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed italic">
            &ldquo;{study.quote}&rdquo;
          </p>
          <cite className="text-xs text-slate-600 font-semibold not-italic block">
            — {study.quoteAuthor}
          </cite>
          <p className="text-xs text-slate-500 pt-1">{study.disclosureNote}</p>
        </blockquote>

        {/* Key Learnings */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Key Takeaways
          </h2>
          <ul className="space-y-2.5">
            {study.keyLearnings.map((learning) => (
              <li
                key={learning}
                className="flex items-start gap-2.5 text-base text-slate-700"
              >
                <CheckCircle2
                  className="w-4 h-4 text-brand-green shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-slate-200 pt-10 text-center space-y-5">
          <h3 className="text-2xl font-display font-bold text-slate-900">
            Want a Similar Breakdown for Your Business?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            {study.nextStepsText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton href="/contact" variant="primary" size="lg">
              {study.ctaLabel}
            </CTAButton>
            <CTAButton href={study.relatedServiceHref} variant="outline" size="lg">
              Explore {study.relatedServiceLabel}
            </CTAButton>
          </div>
          <p className="text-xs text-slate-400">
            *Results vary by industry competition, close rate, and local market size.
          </p>
        </section>
      </div>
    </div>
  );
}
