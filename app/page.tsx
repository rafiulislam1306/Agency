import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Star,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import HeroProofCard from "@/components/HeroProofCard";
import BentoServiceShowcase from "@/components/BentoServiceShowcase";
import BottomLineReportPreview from "@/components/BottomLineReportPreview";
import HomepagePricingSection from "@/components/HomepagePricingSection";
import FAQAccordion from "@/components/FAQAccordion";
import TwoStepAuditGate from "@/components/TwoStepAuditGate";
import { digitalBillOfRights } from "@/lib/agencyData";

interface HomepageCaseStudyCard {
  slug: string;
  vertical: string;
  services: string;
  timeframe: string;
  kpiPrimaryLabel: string;
  kpiPrimaryValue: string;
  kpiSecondaryLabel: string;
  kpiSecondaryValue: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  avatarSrc?: string;
}

const HOMEPAGE_CASE_STUDIES: readonly HomepageCaseStudyCard[] = [
  {
    slug: "ecommerce-store",
    vertical: "DTC Apparel · London, UK",
    services: "Google Ads + PMax",
    timeframe: "90 Days",
    kpiPrimaryLabel: "Customer Acquisition Cost",
    kpiPrimaryValue: "$45 → $18",
    kpiSecondaryLabel: "Verified ROAS (Month 3)",
    kpiSecondaryValue: "4.9x ROAS",
    quote:
      "We went from 2–3 orders a week to 8–10, and for the first time I can see exact revenue next to every pound spent.",
    quoteAuthor: "Founder (Under NDA)",
    quoteRole: "Independent Apparel Store · Shopify Plus",
  },
  {
    slug: "local-service",
    vertical: "Regional HVAC · Houston, TX",
    services: "Local SEO + GBP + CRO",
    timeframe: "6 Months",
    kpiPrimaryLabel: "Google Maps 3-Pack",
    kpiPrimaryValue: "#7 → #1–#2",
    kpiSecondaryLabel: "Added Monthly Revenue",
    kpiSecondaryValue: "+$23,800/mo",
    quote:
      "Homeowners call us saying they found us first on Google Maps for emergency AC repair—without paying for every click.",
    quoteAuthor: "David Miller",
    quoteRole: "VP of Operations · LoneStar Cooling",
    avatarSrc: "/images/client-vp-portrait.jpg",
  },
  {
    slug: "saas-consulting",
    vertical: "B2B SaaS & Advisory · Singapore",
    services: "B2B VBB + sGTM Tracking",
    timeframe: "90 Days",
    kpiPrimaryLabel: "Discovery Call SQL Rate",
    kpiPrimaryValue: "20% → 60%",
    kpiSecondaryLabel: "Unqualified Lead Spam",
    kpiSecondaryValue: "-57% Junk",
    quote:
      "Training Google Ads on HubSpot SQLs instead of raw form fills cut wasted sales calls in half and doubled pipeline.",
    quoteAuthor: "Managing Principal",
    quoteRole: "B2B Advisory Practice · HubSpot Enterprise",
  },
];

const ONBOARDING_PHASES = [
  {
    window: "Days 1–30",
    title: "Audit, Tracking & Leak Plugging",
    summary:
      "Seal 35%–70% conversion signal loss in Phase 0, lock client ownership on every account, and cut broad-match & Search Partner bleed without halting live lead flow.",
    proofBadge: "Zero-Downtime Shadow Cutover",
    proofDetail:
      "\"They migrated our GBP and pixels with zero traffic dip and stopped $940/mo in bot clicks during week one.\"",
  },
  {
    window: "Days 31–60",
    title: "Campaign & Local Re-Architecture",
    summary:
      "Launch 60/20/20 Exact/Phrase Search, margin-segmented PMax, EXIF-verified GBP updates, and distraction-free 1:1 landing pages synced to CRM deal stages.",
    proofBadge: "5%–10% CRM Parity Target",
    proofDetail:
      "Every qualified call and form fill reconciles directly against HubSpot, Salesforce, or ServiceTitan receipts.",
  },
  {
    window: "Days 61–90",
    title: "First QBR & Profitable Scaling",
    summary:
      "Shift mature campaigns onto CRM Value-Based Bidding (Target ROAS), expand winning geo-grid zip codes, and review hard Money-In vs. Money-Out profit.",
    proofBadge: "90-Day Profitability Benchmark",
    proofDetail:
      "Month-to-month terms mean we earn renewal every 30 days through measurable net pipeline growth.",
  },
];

export default function Home() {
  const faqItems = [
    {
      question:
        "Do I keep full ownership of my Google Ads account, GBP, and GA4 container?",
      answer:
        "Yes—100% from day one under our Digital Bill of Rights. Your company email stays Primary Owner on Google Ads, Google Business Profile, GA4, and GTM, and your card pays Google directly. We connect strictly through delegated manager permissions so you are never locked out.",
    },
    {
      question:
        "Why do you charge a flat monthly fee instead of a percentage of ad spend?",
      answer:
        "Percentage-of-spend retainers reward agencies for telling you to spend more even when margins shrink. A flat monthly retainer aligns our senior strategists strictly around lowering your Cost Per Qualified Lead (CPQL) and increasing closed-won profit.",
    },
    {
      question:
        "Are we locked into a 12-month contract, or can we leave if results lag?",
      answer:
        "Never locked in. Every retainer is month-to-month with a straightforward 30-day notice and a clear 90-day profitability benchmark. You can also start with a one-time Foundation Sprint to validate our tracking and audit work before any retainer.",
    },
    {
      question:
        "How do you stop wasted clicks, bots, and out-of-area inquiries in Google Ads?",
      answer:
        "We turn off Search Partners and Display Network expansion on Search campaigns, lock location targeting strictly to 'Presence: People IN your target area', build Exact/Phrase match architectures with a 4-category negative taxonomy, and prune search terms every Monday.",
    },
    {
      question:
        "Why fix GA4 and server-side tracking before scaling Google Ads spend?",
      answer:
        "In 2026, browser-only pixels lose 34.5% to 70.5% of real conversions to ad blockers, Safari ITP caps, and consent gates—causing Smart Bidding to optimize on incomplete or junk signals. Deploying first-party Tag Gateway / sGTM and CRM offline imports reconciles conversions within 5%–10% of actual receipts.",
    },
    {
      question:
        "Who actually manages our account after we sign—a senior strategist or a junior coordinator?",
      answer:
        "The same senior strategist who audits your account manages it directly. We cap client load per strategist, publish a weekly manual Change Log of every edit made, and send bi-weekly Loom walkthroughs directly from the specialist running your campaigns.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* SECTION 2: Above-the-Fold 55/45 Split Hero + Fold-Bridging 3-Column Credential Bar */}
      <section
        data-cta-sentinel="hero"
        className="relative bg-canvas text-ink pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-border-hairline overflow-x-clip"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_65%,transparent_100%)]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left ~55% (7 cols on 12-col grid) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <a
                href="https://partnersdirectory.withgoogle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-badge)] bg-card border border-border-hairline text-xs font-semibold text-ink hover:border-trust hover:text-trust transition-colors"
              >
                <Award
                  className="w-3.5 h-3.5 text-kpi-positive shrink-0"
                  aria-hidden="true"
                />
                <span>2026 Google Premier Partner</span>
                <span aria-hidden="true" className="text-border-control">
                  •
                </span>
                <span className="inline-flex items-center gap-1 metric-tabular">
                  <Star
                    className="w-3 h-3 fill-kpi-warning text-kpi-warning shrink-0"
                    aria-hidden="true"
                  />
                  4.9★ Clutch &amp; Google
                </span>
                <ExternalLink
                  className="w-3 h-3 text-ink-muted shrink-0"
                  aria-hidden="true"
                />
              </a>

              {/* 9-Word Concrete H1 */}
              <h1 className="type-hero font-display font-bold text-ink">
                Google Ads, Local SEO &amp; Tracking Built for{" "}
                <span className="text-trust">Revenue</span>
              </h1>

              {/* 21-Word Plain-English Subheadline (<= 55ch measure) */}
              <p className="type-lead text-ink-secondary max-w-[55ch]">
                We fix broken GA4 attribution, eliminate wasted Google Ads
                spend, and capture Google Map Pack leads—tied directly to closed
                CRM revenue.
              </p>

              {/* CTA Pair: Solid Primary + High-Contrast Outline Secondary (16px gap) */}
              <div className="flex flex-col sm:flex-row gap-4 pt-1">
                <CTAButton href="#free-audit-form" variant="primary" size="lg">
                  Get My Free Account Audit
                </CTAButton>
                <CTAButton href="#case-studies" variant="outline" size="lg">
                  See Verified Case Studies →
                </CTAButton>
              </div>

              {/* Risk-Reversal Microcopy directly beneath CTAs */}
              <p className="text-xs sm:text-sm text-ink-muted font-medium">
                Custom 12-min Loom audit in 24h · Flat retainers, 0% ad-spend
                markup · No 12-month lock-in
              </p>
            </div>

            {/* Right ~45% (5 cols on 12-col grid): Static Zero-CLS Productized Proof Card */}
            <div className="lg:col-span-5">
              <HeroProofCard />
            </div>
          </div>

          {/* Fold-Bridging 3-Column Verifiable Credential & Precision Metric Strip (Replaces unrecognized SMB logo wall) */}
          <div className="mt-10 pt-6 border-t border-border-hairline grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://partnersdirectory.withgoogle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-[var(--radius-tile)] bg-card border border-border-hairline hover:border-trust transition-colors flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <span className="eyebrow-mono text-kpi-positive block">
                  Verifiable Credential
                </span>
                <span className="text-sm font-display font-bold text-ink group-hover:text-trust transition-colors block">
                  2026 Google Premier Partner (Top 3%)
                </span>
              </div>
              <ExternalLink
                className="w-4 h-4 text-ink-muted group-hover:text-trust shrink-0"
                aria-hidden="true"
              />
            </a>

            <a
              href="#case-studies"
              className="group p-4 rounded-[var(--radius-tile)] bg-card border border-border-hairline hover:border-trust transition-colors flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5 min-w-0">
                <span className="eyebrow-mono text-ink-muted block">
                  Clutch · G2 · Google
                </span>
                <span className="text-sm font-display font-bold text-ink inline-flex items-center gap-1.5 metric-tabular whitespace-nowrap">
                  <Star
                    className="w-4 h-4 fill-kpi-warning text-kpi-warning shrink-0"
                    aria-hidden="true"
                  />
                  4.9★ across 111 Verified Reviews
                </span>
              </div>
              <ArrowRight
                className="w-4 h-4 text-ink-muted group-hover:text-trust shrink-0"
                aria-hidden="true"
              />
            </a>

            <div className="p-4 rounded-[var(--radius-tile)] bg-card border border-border-hairline flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="eyebrow-mono text-ink-muted block">
                  Audited Performance Scale
                </span>
                <span className="text-sm font-display font-bold text-ink metric-tabular block">
                  $18.4M Ad Spend Audited · 92.4% Retention
                </span>
              </div>
              <ShieldCheck
                className="w-4 h-4 text-kpi-positive shrink-0"
                aria-hidden="true"
              />
            </div>
          </div>
          <p className="caption-meta text-ink-muted mt-3">
            Independent agency · Google Business Profile &amp; Local SEO
            services are not verified, certified, or endorsed by Google.
          </p>
        </div>
      </section>

      {/* SECTION 3: 12-Column (4x3) Asymmetric Service & System Bento Grid */}
      <BentoServiceShowcase />

      {/* SECTION 4: Static 3-Column Metric-First Case Studies (Zero Carousels) */}
      <section
        id="case-studies"
        className="cv-auto py-16 md:py-24 bg-canvas border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="eyebrow-mono text-kpi-positive">
                Verified Client Outcomes · All 3 Core Channels
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                Before &amp; After Revenue Proof—Not Vanity Clicks
              </h2>
              <p className="type-lead text-ink-secondary">
                Every result below reconciles directly against client CRM,
                checkout, or CallRail dispatch ledgers.
              </p>
            </div>
            <CTAButton href="/case-studies" variant="outline">
              View All Case Studies →
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {HOMEPAGE_CASE_STUDIES.map((study) => (
              <article
                key={study.slug}
                className="bento-card p-6 sm:p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-5">
                  {/* Layer 1: Metadata Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-border-hairline text-xs">
                    <span className="font-semibold text-ink">
                      {study.vertical}
                    </span>
                    <span className="tracking-id text-ink-muted">
                      {study.services} · {study.timeframe}
                    </span>
                  </div>

                  {/* Layer 2: Two Bold Unrounded Before -> After KPIs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline">
                      <span className="text-[11px] font-medium text-ink-muted block">
                        {study.kpiPrimaryLabel}
                      </span>
                      <span className="text-xl sm:text-2xl font-display font-extrabold text-kpi-positive metric-tabular tracking-tight mt-1 block">
                        {study.kpiPrimaryValue}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline">
                      <span className="text-[11px] font-medium text-ink-muted block">
                        {study.kpiSecondaryLabel}
                      </span>
                      <span className="text-xl sm:text-2xl font-display font-extrabold text-ink metric-tabular tracking-tight mt-1 block">
                        {study.kpiSecondaryValue}
                      </span>
                    </div>
                  </div>

                  {/* Layer 3: Concise Attributed Executive Quote */}
                  <blockquote className="space-y-3">
                    <p className="text-sm text-ink-secondary leading-relaxed italic">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <footer className="flex items-center gap-3">
                      {study.avatarSrc ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border-hairline shrink-0">
                          <Image
                            src={study.avatarSrc}
                            alt={`${study.quoteAuthor}, ${study.quoteRole}`}
                            fill
                            sizes="36px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : null}
                      <div className="text-xs">
                        <span className="font-bold text-ink block">
                          {study.quoteAuthor}
                        </span>
                        <span className="text-ink-muted block">
                          {study.quoteRole}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </div>

                {/* Layer 4: Low-Friction Teardown Link */}
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="pt-4 border-t border-border-hairline min-h-11 text-sm font-semibold text-trust hover:text-cta inline-flex items-center justify-between gap-2 transition-colors"
                >
                  <span>Read the 3-Min Teardown</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Anti-Black-Box Reporting & Senior Team Block (Aligned 2-Column, Zero Decorative Zigzag) */}
      <section
        id="reporting"
        className="cv-auto py-16 md:py-24 bg-card border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: 3 Scannable Accountability Pledges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <p className="eyebrow-mono text-trust">
                  Anti-Black-Box Accountability
                </p>
                <h2 className="type-h2 font-display font-bold text-ink">
                  Senior Specialists, Live P&amp;L Visibility, Zero Vanity Decks
                </h2>
                <p className="type-lead text-ink-secondary">
                  You never get handed off to a junior coordinator or buried in
                  20-page impression PDFs. Every dollar spent maps to CRM
                  pipeline and logged weekly actions.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  {
                    title: "100% Client-Owned Ad, GBP & GA4 Accounts",
                    body: "Your business remains Primary Owner on every platform under our Digital Bill of Rights—we operate strictly via delegated manager access.",
                  },
                  {
                    title: "Bi-Weekly Senior Strategist Looms & QBRs",
                    body: "Every two weeks, the principal strategist managing your campaigns walks you through wins, wasted-spend cuts, and next tests on video.",
                  },
                  {
                    title: "Closed-Loop CRM Revenue Attribution",
                    body: "Server-side GTM and offline GCLID imports tie Google Ads & Map Pack calls directly to HubSpot, Salesforce, or ServiceTitan revenue.",
                  },
                ].map((pledge) => (
                  <li
                    key={pledge.title}
                    className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline flex items-start gap-3"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-kpi-positive shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <h3 className="text-sm font-display font-bold text-ink">
                        {pledge.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                        {pledge.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-trust hover:text-cta transition-colors"
              >
                Read our full Digital Bill of Rights &amp; team roster
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>

            {/* Right Column: Real Senior Strategist Portraits + Live Scorecard Preview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Rafiul Islam",
                    role: "Founder & Principal Search Strategist",
                    focus: "Zero-Waste Google Ads · Local GBP Architecture",
                    image: "/images/founder-portrait.jpg",
                  },
                  {
                    name: "Lin Chen",
                    role: "Head of Analytics, sGTM & CRO",
                    focus: "Phase 0 Server-Side Tracking · CRM VBB · CRO",
                    image: "/images/delivery-lead-portrait.jpg",
                  },
                ].map((member) => (
                  <div
                    key={member.name}
                    className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline flex items-center gap-3.5"
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border-hairline shrink-0">
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-display font-bold text-ink truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-trust truncate">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-ink-muted mt-0.5 truncate">
                        {member.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Suspense
                fallback={
                  <div
                    aria-busy="true"
                    className="bento-card min-h-[420px] p-8 animate-pulse bg-subtle/60"
                  />
                }
              >
                <BottomLineReportPreview />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Transparent Pricing & Engagement Anchors + Zero-Gap Risk Reversal */}
      <HomepagePricingSection />

      {/* SECTION 7: Linear 30-60-90 Onboarding Timeline + Open Risk Reversal + Multi-Open FAQ */}
      <section
        id="process"
        className="cv-auto py-16 md:py-24 bg-card border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
          {/* Linear 3-Column 30-60-90 Day Timeline */}
          <div className="space-y-10">
            <div className="max-w-2xl space-y-3">
              <p className="eyebrow-mono text-trust">
                Predictable 90-Day Rollout
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                How We Switch Your Accounts Cleanly—Without Lead-Flow Downtime
              </h2>
              <p className="type-lead text-ink-secondary">
                No vague &ldquo;discovery quarters.&rdquo; Every milestone is
                sequenced so measurement is fixed first and profitable scale
                compounds by Day 90.
              </p>
            </div>

            <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ONBOARDING_PHASES.map((phase, idx) => (
                <li
                  key={phase.window}
                  className="bento-card p-6 sm:p-7 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="eyebrow-mono text-trust">
                        {phase.window}
                      </span>
                      <span className="tracking-id text-xs font-bold text-ink-muted">
                        0{idx + 1} / 03
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-ink">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {phase.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-hairline space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kpi-positive">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {phase.proofBadge}
                    </span>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {phase.proofDetail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Open Visible Ownership & Contract Guarantee Banner (Never hidden solely inside collapsed FAQs) */}
          <div className="rounded-[var(--radius-bento)] bg-canvas border border-border-hairline p-6 sm:p-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-border-hairline">
              <div className="space-y-1">
                <p className="eyebrow-mono text-kpi-positive inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  Written Risk-Reversal Guarantee
                </p>
                <h3 className="text-xl font-display font-bold text-ink">
                  Our Digital Bill of Rights: Zero Hostage Assets, Zero Annual Lock-Ins
                </h3>
              </div>
              <span className="text-xs font-semibold text-ink-muted">
                Included in every engagement agreement
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {digitalBillOfRights.map((right) => (
                <div
                  key={right.asset}
                  className="p-4 rounded-[var(--radius-tile)] bg-card border border-border-hairline space-y-1.5"
                >
                  <h4 className="text-sm font-display font-bold text-ink">
                    {right.asset}
                  </h4>
                  <p className="text-xs font-semibold text-kpi-positive">
                    Owner: {right.owner}
                  </p>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {right.guarantee}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Open Objection-Handling FAQ Accordion */}
          <div id="faq" className="scroll-mt-24 space-y-8">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <p className="eyebrow-mono text-trust">
                Objection-Handling FAQ
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                Straight Answers Before You Request an Audit
              </h2>
            </div>

            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* SECTION 8: Two-Step Breadcrumb Audit Gate (.surface-dark completes calibrated 20% dark budget) */}
      <section
        id="book-audit"
        data-cta-sentinel="footer-cta"
        className="surface-dark py-16 md:py-24 bg-canvas text-ink scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Suspense
            fallback={
              <div
                aria-busy="true"
                className="bento-card min-h-[520px] p-8 animate-pulse bg-subtle/40"
              />
            }
          >
            <TwoStepAuditGate />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
