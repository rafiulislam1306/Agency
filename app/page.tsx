import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, ShieldCheck, Star } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import FAQAccordion from "@/components/FAQAccordion";
import CaseStudyCard from "@/components/CaseStudyCard";
import HeroCaseStudySlider from "@/components/HeroCaseStudySlider";
import BottomLineReportPreview from "@/components/BottomLineReportPreview";
import DualTrackLeadCapture from "@/components/DualTrackLeadCapture";
import { caseStudiesData } from "@/lib/caseStudiesData";
import {
  painPointsAndAntidotes,
  digitalBillOfRights,
} from "@/lib/agencyData";

const CLIENT_LOGOS = [
  { name: "LoneStar HVAC", sector: "Home Services · TX" },
  { name: "Northbridge Advisory", sector: "B2B Consulting · SG" },
  { name: "Kestrel Apparel", sector: "E-Commerce · UK" },
  { name: "Apex Roofworks", sector: "Commercial Trades · FL" },
  { name: "Vanguard Dental", sector: "Multi-Site Clinics · AZ" },
  { name: "Harborline SaaS", sector: "B2B Software · US" },
  { name: "Meridian Electrical", sector: "Service Trades · CO" },
];

export default function Home() {
  const studies = Object.values(caseStudiesData);

  const faqItems = [
    {
      question: "Do I keep full ownership of my Google Ads account, GBP, and domain?",
      answer:
        "Yes—100% from day one under our Digital Bill of Rights. Your business email is Primary Owner on your Google Business Profile, Google Analytics, and domain, and your card pays Google directly. We connect strictly via delegated Manager access so you are never held hostage.",
    },
    {
      question: "Why do you charge a flat monthly fee instead of a percentage of ad spend?",
      answer:
        "Percentage-of-spend pricing creates a conflict of interest: the agency makes more money simply by telling you to spend more, even if returns drop. A flat retainer aligns us around your Cost Per Acquisition and net profit.",
    },
    {
      question: "How do you stop wasted clicks, bots, and out-of-state inquiries?",
      answer:
        "Before scaling a single campaign, we seal leaks: Search Partners and Display Network are turned off on Search campaigns, location targeting is locked strictly to 'Presence: People IN your target area', keywords launch on Exact and Phrase match, and we prune search terms every Monday alongside landing-page bot filtering.",
    },
    {
      question: "How is your Local SEO different from agencies that just publish blog posts?",
      answer:
        "Local service buyers click the Google Maps 3-Pack—they rarely read generic 1,500-word blog posts. We focus on Relevance, Distance, and Prominence: primary and secondary GBP category precision, authentic geotagged fieldwork photos, automated SMS review velocity, citation cleanup, and manual suspension defense.",
    },
    {
      question: "Are we locked into a 12-month contract?",
      answer:
        "Never. Every partnership is month-to-month with a simple 30-day notice and a clear 90-day profitability benchmark. We also publish a weekly Change Log showing every manual optimization performed in your accounts.",
    },
    {
      question: "Why do you audit conversion tracking (GA4, Tag Gateway/sGTM, Consent Mode) before scaling ads?",
      answer:
        "In 2026, standard browser pixels lose 34.5% to 70.5% of real conversions to ad blockers, Safari 7-day caps, and consent gates—or double-count form fills. Fixing tracking in Phase 0 reconciles your real bank/CRM receipts against Google Ads (within 5%–10% variance) so Smart Bidding learns from verified revenue instead of phantom clicks.",
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

      {/* 1. Hero Section — Minto Pyramid [Outcome] for [ICP] + Dual CTA + Third-Party Review Bar */}
      <section className="relative bg-gradient-to-br from-brand-blue via-blue-950 to-slate-950 text-white py-16 md:py-22 overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-medium text-brand-green">
                Revenue-First Search Agency · Flat Retainers · 100% Client Asset Ownership
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-serif font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Predictable Qualified Pipeline for{" "}
                <span className="text-brand-green">
                  B2B &amp; High-Ticket Service Teams
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We seal 35%–70% conversion signal loss in Phase 0, then scale leak-proof Google Ads, 1:1 CRO landing pages, and Google Maps 3-Pack authority—tied directly to closed CRM revenue with zero ad-spend markups.
              </p>

              {/* Dual-Track CTAs for High-Intent vs. Mid-Intent Buyers */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-1">
                <CTAButton href="#book-audit" variant="primary" size="lg">
                  Book a Strategy Call
                </CTAButton>
                <CTAButton href="#free-audit-form" variant="white" size="lg">
                  Get Your Free Website Audit
                </CTAButton>
              </div>

              {/* Proof Element #4: Third-Party Review Scores & Partner Verification */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-blue-100">
                <a
                  href="#client-proof"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Star
                    className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-bold text-white tabular-nums">4.9</span>
                  <span>Clutch (34)</span>
                </a>
                <a
                  href="#client-proof"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Star
                    className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-bold text-white tabular-nums">4.8</span>
                  <span>G2 (29)</span>
                </a>
                <a
                  href="#client-proof"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Star
                    className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-bold text-white tabular-nums">4.9</span>
                  <span>Google (48)</span>
                </a>
                <span className="inline-flex items-center gap-1.5 text-brand-green font-medium whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Google Partner · sGTM Certified
                </span>
              </div>
            </div>

            <HeroCaseStudySlider />
          </div>

          {/* Full-width Fiduciary Guarantee Bar below Hero */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-blue-100">
            {[
              "100% Client Asset Ownership",
              "Flat Retainers (0% of Ad Spend)",
              "Phase 0 sGTM & CRM VBB Tracking",
              "Money-In vs. Money-Out Reporting",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-brand-green shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Element #1: Contextualized ICP Client Logo Strip Immediately Below Hero */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-xs font-semibold text-slate-500 text-center">
            Trusted by B2B SaaS, high-ticket home-service, healthcare, and e-commerce revenue teams
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className="px-3 py-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-center"
              >
                <span className="block text-sm font-display font-bold text-slate-800 tracking-tight">
                  {client.name}
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  {client.sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. The 5 Industry Failures vs. Our Antidotes */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <p className="text-xs font-semibold text-brand-orange">
              Why Most Businesses Lose Trust in Agencies
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              Five Broken Agency Practices—and the Revenue Infrastructure Built to Replace Them
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Owners don&apos;t hate Google Ads or SEO—they hate paying for unqualifiable junk leads, opaque percentage markups, and losing control of their own accounts.
            </p>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden">
            {painPointsAndAntidotes.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
              >
                <div className="lg:col-span-5 space-y-2">
                  <p className="text-xs font-semibold text-slate-400 tabular-nums">
                    {item.number}. Industry Failure
                  </p>
                  <h3 className="text-xl font-display font-bold text-slate-900">
                    {item.painTitle}
                  </h3>
                  <p className="text-sm text-slate-500 italic">
                    {item.ownerQuote}
                  </p>
                  <p className="text-sm text-slate-600 pt-1">
                    <span className="font-semibold text-slate-700">
                      Traditional cause:
                    </span>{" "}
                    {item.traditionalFailure}
                  </p>
                </div>

                <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-5 sm:p-6 space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-display font-bold text-brand-blue">
                      Our Antidote: {item.antidoteName}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item.antidoteSummary}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {item.technicalProof.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-brand-green shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Two Paths to Dominate Search — With Proof Element #2 (Outcome-Led Case Snippets Beside Claims) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <p className="text-xs font-semibold text-brand-blue">
              Revenue Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
              Architects of Pipeline—Not Just Media Buyers
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Combine leak-sealed Google Ads, 1:1 CRO landing pages, and CRM Value-Based Bidding with compounding Google Maps 3-Pack authority.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Google Ads */}
            <div className="p-7 sm:p-9 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold text-brand-orange">
                  Immediate Intent · Google Ads, PMax &amp; CRO
                </p>
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  Zero-Waste Google Ads + CRM Bidding
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  We control the click AND the landing page—training Google&apos;s AI on your closed CRM pipeline rather than flooding sales with cheap MQLs.
                </p>
                <ul className="space-y-3 pt-1">
                  {[
                    "60/20/20 intent allocation with Exact/Phrase STAGs & cross-pollination negatives",
                    "Phase 0 Tag Gateway / sGTM + CRM Value-Based Bidding mapped to SQLs",
                    "Isolated PMax Asset Groups with competitor URL segments & spam filters",
                    "Dedicated 1:1 message-matched landing pages that double conversion rates",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-brand-green shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Proof Element #2: Outcome-Led Case Snippet Adjacent to Service Claim */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 tabular-nums">
                      Verified Client Proof · -57% junk leads · 2x pipeline in 90 days
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      B2B SaaS &amp; Advisory Practice switched from Max Conversions to HubSpot Target ROAS.
                    </p>
                  </div>
                  <Link
                    href="/case-studies/saas-consulting"
                    className="text-xs font-semibold text-brand-blue hover:text-brand-orange whitespace-nowrap shrink-0 inline-flex items-center gap-1"
                  >
                    Read breakdown
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/services#google-ads"
                  className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors"
                >
                  Inspect Ads &amp; CRO Blueprint
                  <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </Link>
                <CTAButton href="/pricing" variant="outline" size="sm">
                  View Flat Pricing &amp; ROI
                </CTAButton>
              </div>
            </div>

            {/* Local SEO */}
            <div className="p-7 sm:p-9 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold text-brand-green-hover">
                  Compounding Authority · 42% Local Click Share
                </p>
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  GBP-First Map Pack &amp; Ask Maps Dominance
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Top-3 Map Pack listings win +126% more traffic and +93% more calls than #4–#10. We engineer GBP signals, Proof-of-Work Service-Area Pages, and AI entity coherence.
                </p>
                <ul className="space-y-3 pt-1">
                  {[
                    "Primary ('IS a' test) & secondary GBP category precision (~32% weight)",
                    "Proof-of-Work Service-Area Pages + modern areaServed JSON-LD schema",
                    "Compliant zero-gating SMS review velocity (4.5+ star floor, <90-day recency)",
                    "Cross-Surface Entity Coherence for Google Ask Maps & AI Overviews",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-brand-green shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Proof Element #2: Outcome-Led Case Snippet Adjacent to Service Claim */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 tabular-nums">
                      Verified Client Proof · +180% calls · +$23,800/mo in 6 months
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Houston HVAC contractor climbed from #7 avg to #1–#2 across 25-pin service grid.
                    </p>
                  </div>
                  <Link
                    href="/case-studies/local-service"
                    className="text-xs font-semibold text-brand-blue hover:text-brand-orange whitespace-nowrap shrink-0 inline-flex items-center gap-1"
                  >
                    Read breakdown
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/services#map-pack-calculator"
                  className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors"
                >
                  Calculate Missed Map Revenue
                  <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </Link>
                <CTAButton href="/templates/hvac" variant="outline" size="sm">
                  Inspect 1:1 CRO Landing Page
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom-Line Reporting & Digital Bill of Rights */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-brand-blue">
              Radical Transparency
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
              No 20-Page Vanity Decks. See Every Dollar Out, Every Dollar In, and Every Weekly Edit.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Preview the exact 1-page monthly financial summary and weekly manual Change Log every client receives.
            </p>
          </div>

          <BottomLineReportPreview />

          {/* Digital Bill of Rights */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue">
                  <ShieldCheck className="w-4 h-4 text-brand-green" aria-hidden="true" />
                  Contractual Guarantee
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  Our Digital Bill of Rights: You Never Lose Control of Your Business
                </h3>
              </div>
              <Link
                href="/about"
                className="text-sm font-semibold text-brand-blue hover:text-brand-orange whitespace-nowrap"
              >
                Meet the leadership team &amp; terms →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {digitalBillOfRights.map((right) => (
                <div
                  key={right.asset}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <h4 className="text-sm font-display font-bold text-slate-900">
                    {right.asset}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700">
                    Owner: {right.owner}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {right.guarantee}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Un-Gated Case Studies + Proof Element #3 (Named Photo-Backed Problem-Owner Proof) */}
      <section
        id="client-proof"
        className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold text-brand-green-hover">
                Un-Gated Buying-Committee Proof
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
                What Happens When Leaks Are Sealed and Attribution Is Closed
              </h2>
            </div>
            <CTAButton href="/case-studies" variant="outline">
              View All Case Studies
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Photo-Backed Named Executive Testimonial Banner */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <Image
                  src="/images/client-vp-portrait.jpg"
                  alt="David Miller, VP of Operations at LoneStar Cooling & Mechanical"
                  fill
                  sizes="64px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-base text-slate-800 leading-relaxed italic">
                  &ldquo;After two agencies burned $18,000 on generic clicks and withheld our ad account access, LeadGrow put everything under our own billing, rebuilt our GBP Map Pack footprint, and delivered +180% verified service calls in six months.&rdquo;
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  David Miller · VP of Operations, LoneStar Cooling &amp; Mechanical (Houston, TX) · Verified Clutch Review (5.0★)
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <CTAButton href="#free-audit-form" variant="primary" size="md">
                Get Your Free Website Audit
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Skeptical Buyer FAQ */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <p className="text-xs font-semibold text-brand-blue">
              Straight Answers
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Questions Business Owners Ask Before Signing Anything
            </h2>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 7. Dual-Track Conversion Section (3-Step Breadcrumb Free Audit + Live Strategy Call) */}
      <section
        id="book-audit"
        className="py-16 md:py-24 bg-brand-blue text-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DualTrackLeadCapture defaultTrack="audit" />
        </div>
      </section>
    </div>
  );
}
