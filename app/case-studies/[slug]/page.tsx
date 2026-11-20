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
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm font-semibold text-ink-secondary hover:text-trust transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 mr-2 transition-transform duration-150 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to Case Studies
          </Link>
          <span className="text-xs font-mono font-medium text-ink-muted">
            Un-Gated Buying-Committee Brief · Shareable Internally
          </span>
        </div>

        {/* 1. Result-Led Headline (Numbers First) */}
        <div className="border-b border-border-hairline pb-8 space-y-4">
          <div className="text-xs font-mono font-medium text-ink-muted">
            <span className="text-kpi-positive font-semibold">
              {study.serviceUsed}
            </span>
            <span aria-hidden="true"> · </span>
            <span>{study.region}</span>
            <span aria-hidden="true"> · </span>
            <span className="metric-tabular">{study.timeframe}</span>
          </div>

          <h1 className="type-hero font-display font-extrabold text-ink">
            {study.heroHeadline}
          </h1>

          <p className="type-lead text-ink-secondary">
            <span className="font-semibold text-ink">
              {study.businessType}:
            </span>{" "}
            {study.heroSubheadline}
          </p>
        </div>

        {/* 2. 3-Metric Buying-Group Bar (Dark Technical Proof Surface for WCAG AAA KPI contrast) */}
        <section
          aria-label="Buying group outcomes"
          className="surface-dark rounded-bento border border-border-hairline p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-hairline pb-4">
            <div>
              <p className="eyebrow-mono text-kpi-positive">
                Verified Outcomes by Stakeholder Role
              </p>
              <p className="text-sm text-ink-secondary mt-1">{study.goal}</p>
            </div>
            <CTAButton href="/contact" variant="dark-primary" size="sm">
              Get Similar Audit
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {study.buyingGroupMetrics.map((item) => (
              <div
                key={item.stakeholder}
                className="dark-panel rounded-tile p-4 space-y-1.5"
              >
                <span className="eyebrow-mono text-ink-muted block">
                  {item.stakeholder}
                </span>
                <span className="type-kpi-card text-kpi-positive block">
                  {item.value}
                </span>
                <span className="text-xs text-ink-secondary block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 4-Second Qualification Metadata Panel + Anchored Jump Links */}
        <section
          aria-label="Qualification metadata"
          className="bg-subtle border border-border-hairline rounded-bento p-6 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div>
              <span className="text-ink-muted font-medium block">
                Industry &amp; Region
              </span>
              <span className="font-bold text-ink mt-1 block">
                {study.businessType} ({study.region})
              </span>
            </div>
            <div>
              <span className="text-ink-muted font-medium block">
                Company Profile
              </span>
              <span className="font-bold text-ink mt-1 block">
                {study.companySize}
              </span>
            </div>
            <div>
              <span className="text-ink-muted font-medium block">
                Service Delivered
              </span>
              <Link
                href={study.relatedServiceHref}
                className="font-bold text-trust hover:text-cta mt-1 inline-flex items-center gap-1 transition-colors"
              >
                {study.relatedServiceLabel}
                <ArrowRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </Link>
            </div>
            <div>
              <span className="text-ink-muted font-medium block">
                Tech Stack &amp; Timeframe
              </span>
              <span className="font-bold text-ink mt-1 block">
                {study.techStack} · {study.timeframe}
              </span>
            </div>
          </div>

          {/* Jump Links */}
          <div className="pt-4 border-t border-border-hairline flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-ink-secondary">
            <span className="text-ink-muted font-mono">Jump to:</span>
            <a href="#problem" className="hover:text-trust transition-colors">
              01. Problem
            </a>
            <a href="#hypothesis" className="hover:text-trust transition-colors">
              02. Hypothesis
            </a>
            <a href="#execution" className="hover:text-trust transition-colors">
              04. Execution
            </a>
            <a href="#results" className="hover:text-trust transition-colors">
              05. Results
            </a>
            <a href="#migration-risk" className="hover:text-trust transition-colors">
              06. Migration Risk
            </a>
          </div>
        </section>

        {/* 4. Answer-First CSR Narrative */}
        <section id="problem" className="space-y-3 scroll-mt-24">
          <h2 className="type-h3 font-display font-bold text-ink">
            01. The Problem
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed prose-measure">
            {study.situation}
          </p>
        </section>

        {/* Strategic Hypothesis */}
        <section
          id="hypothesis"
          className="bg-subtle rounded-bento border border-border-hairline p-6 sm:p-8 space-y-2.5 scroll-mt-24"
        >
          <h2 className="type-h4 font-display font-bold text-trust">
            02. Strategic Hypothesis
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            {study.hypothesis}
          </p>
        </section>

        {/* Leaks Sealed First */}
        <section className="bento-card p-6 sm:p-8 space-y-4">
          <h2 className="type-h4 font-display font-bold text-ink flex items-center gap-2">
            <ShieldAlert
              className="w-5 h-5 text-cta shrink-0"
              aria-hidden="true"
            />
            03. Immediate Leaks Sealed Before Scaling
          </h2>
          <ul className="space-y-2.5">
            {study.leaksSealed.map((leak) => (
              <li
                key={leak}
                className="flex items-start gap-2.5 text-sm sm:text-base text-ink-secondary"
              >
                <CheckCircle2
                  className="w-4 h-4 text-kpi-positive shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{leak}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Execution Plan */}
        <section id="execution" className="space-y-4 scroll-mt-24">
          <h2 className="type-h3 font-display font-bold text-ink">
            04. Technical Execution &amp; Attribution Steps
          </h2>
          <div className="space-y-3">
            {study.whatWeDid.map((action, idx) => (
              <div
                key={action}
                className="flex items-start gap-4 p-4 rounded-tile border border-border-hairline bg-card"
              >
                <span className="text-xs font-mono font-bold text-trust metric-tabular mt-1">
                  0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Results */}
        <section id="results" className="space-y-4 scroll-mt-24">
          <h2 className="type-h3 font-display font-bold text-ink">
            05. Pipeline &amp; Revenue Result
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.results.map((result) => (
              <div
                key={result.label}
                className="border border-border-hairline rounded-tile p-5 bg-card"
              >
                <span className="text-xs text-ink-muted font-medium block">
                  {result.label}
                </span>
                <span className="type-kpi-card text-kpi-positive block mt-1.5">
                  {result.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Impact if present */}
        {study.financialImpact ? (
          <section className="bg-kpi-positive-bg border border-border-hairline rounded-bento p-6 sm:p-8 space-y-5">
            <h3 className="type-h4 font-display font-bold text-ink">
              Bottom-Line Financial Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 metric-tabular">
              <div>
                <span className="text-xs text-ink-muted font-medium block">
                  Avg. Job Value
                </span>
                <span className="text-lg font-mono font-bold text-ink">
                  {study.financialImpact.avgJobValue}
                </span>
              </div>
              <div>
                <span className="text-xs text-ink-muted font-medium block">
                  Previous GBP Rev
                </span>
                <span className="text-lg font-mono font-bold text-ink-secondary">
                  {study.financialImpact.previousRevenue}/mo
                </span>
              </div>
              <div>
                <span className="text-xs text-ink-muted font-medium block">
                  Current GBP Rev
                </span>
                <span className="text-lg font-mono font-bold text-kpi-positive">
                  {study.financialImpact.currentRevenue}/mo
                </span>
              </div>
              <div>
                <span className="text-xs text-ink-muted font-medium block">
                  Net Monthly Gain
                </span>
                <span className="text-lg font-mono font-bold text-kpi-positive">
                  ▲ +{study.financialImpact.additionalRevenue}/mo
                </span>
              </div>
            </div>
            <div className="border-t border-border-hairline pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-sm font-medium text-ink-secondary">
                Annualized Map Pack Revenue Impact:
              </span>
              <span className="type-kpi-card text-kpi-positive">
                ▲ {study.financialImpact.annualImpact}/yr
              </span>
            </div>
          </section>
        ) : null}

        {/* 5. Migration Risk & Switching Objection Box */}
        <section
          id="migration-risk"
          className="bg-kpi-warning-bg border border-border-hairline rounded-bento p-6 sm:p-8 space-y-4 scroll-mt-24"
        >
          <div className="flex items-center gap-2 eyebrow-mono text-kpi-warning">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            06. Migration Risk &amp; Switching Objection Handled
          </div>
          <h2 className="type-h4 font-display font-bold text-ink">
            {study.migrationRisk.fearTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed">
            <div className="bg-card rounded-tile border border-border-hairline p-4 space-y-1.5">
              <span className="eyebrow-mono text-kpi-warning block">
                What Nearly Blocked the Switch
              </span>
              <p className="text-ink-secondary">{study.migrationRisk.objection}</p>
            </div>
            <div className="bg-card rounded-tile border border-border-hairline p-4 space-y-1.5">
              <span className="eyebrow-mono text-kpi-positive block">
                How We De-Risked Execution
              </span>
              <p className="text-ink-secondary">
                {study.migrationRisk.howWeDeRisked}
              </p>
            </div>
          </div>
        </section>

        {/* Client Quote (clean hairline box, no thick left border) */}
        <blockquote className="bg-subtle border border-border-hairline rounded-bento p-6 sm:p-8 space-y-3">
          <p className="text-base sm:text-lg text-ink leading-relaxed italic">
            &ldquo;{study.quote}&rdquo;
          </p>
          <cite className="text-xs text-ink-secondary font-semibold not-italic block">
            — {study.quoteAuthor}
          </cite>
          <p className="text-xs text-ink-muted pt-1">{study.disclosureNote}</p>
        </blockquote>

        {/* Key Learnings */}
        <section className="space-y-4">
          <h2 className="type-h3 font-display font-bold text-ink">
            Key Takeaways
          </h2>
          <ul className="space-y-2.5">
            {study.keyLearnings.map((learning) => (
              <li
                key={learning}
                className="flex items-start gap-2.5 text-base text-ink-secondary"
              >
                <CheckCircle2
                  className="w-4 h-4 text-kpi-positive shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-border-hairline pt-10 text-center space-y-5">
          <h3 className="type-h3 font-display font-bold text-ink">
            Want a Similar Breakdown for Your Business?
          </h3>
          <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto">
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
          <p className="text-xs text-ink-muted">
            *Results vary by industry competition, close rate, and local market size.
          </p>
        </section>
      </div>
    </div>
  );
}
