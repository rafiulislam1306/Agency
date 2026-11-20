import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import MapPackOpportunityWidget from "@/components/MapPackOpportunityWidget";
import SignalLossCalculator from "@/components/SignalLossCalculator";
import {
  queryControlAllocation,
  negativeExclusionMatrix,
  croHeuristics,
  vbbPipelineStages,
} from "@/lib/agencyData";
import { localRankingWeights2026 } from "@/lib/localSeoLogic";
import {
  TRACKING_FAILURE_MODES,
  MEASUREMENT_STACK_OPTIONS,
} from "@/lib/trackingLogic";

export const metadata: Metadata = {
  title: "Services | Revenue Infrastructure: Phase 0 Tracking, Google Ads, CRO & Local SEO",
  description:
    "Explore our Phase 0 conversion tracking & sGTM signal recovery, 60/20/20 query control, CRM Value-Based Bidding, 1:1 landing page CRO, and 2026 GBP-First Local Map Pack protocols.",
};

export default function ServicesPage() {
  const googleAdsProtocol = [
    {
      title: "CRM Value-Based Bidding (VBB)",
      desc: "We map GCLID and Enhanced Conversions from HubSpot, Salesforce, or ServiceTitan back into Google Ads—training Target ROAS to hunt for SQLs and signed revenue.",
    },
    {
      title: "60/20/20 Query & Intent Control",
      desc: "60% of capital locked on high-intent commercial searches via Exact/Phrase STAGs with cross-pollination negatives so broad traffic never cannibalizes buyer terms.",
    },
    {
      title: "Performance Max Restraint",
      desc: "We reject Google's bundled audience defaults—building isolated Asset Groups per buyer signal, targeting competitor URLs, and gating forms against Display bots.",
    },
    {
      title: "Dedicated 1:1 Landing Page CRO",
      desc: "Continuous A/B testing, exact Headline 1 message-match, and nav-free layouts included—because doubling conversion rate halves CPA without raising ad spend.",
    },
    {
      title: "Network & Geo Lockdown",
      desc: "Search Partners and Display Network disabled on Search campaigns; geo-targeting forced to 'Presence: People IN your location' plus invalid-click filtering.",
    },
    {
      title: "CFO-Ready Pipeline Reporting",
      desc: "Track Cost Per Qualified Lead (CPQL), Pipeline-to-Spend ratios, and LTV:CAC—translating every search dollar into board-level financial accountability.",
    },
  ];

  const localSeoProtocol = [
    {
      title: "Primary Category 'IS a' vs. 'HAS a' Audit",
      desc: "GBP signals drive ~32% of Map Pack rankings. We lock your Primary Category to what your business IS (the #1 weighted factor) and layer up to 9 high-intent secondary categories.",
    },
    {
      title: "Proof-of-Work Service-Area Pages (SAPs)",
      desc: "Instead of thin city-swap doorway pages, we build 600–1,000-word suburb pages featuring real completed jobs, local code nuances, and EXIF-geotagged field photos.",
    },
    {
      title: "Modern areaServed & FAQPage JSON-LD",
      desc: "We replace deprecated serviceArea markup with modern areaServed (City/AdministrativeArea) and FAQPage schema so Google Maps and AI parsers verify every zip code you serve.",
    },
    {
      title: "Compliant Zero-Gating Review Velocity",
      desc: "Post-job SMS prompts sent to every customer—strictly zero review gating per Google & FTC policy—sustaining a 4.5+ star floor, fresh <90-day recency, and <48-hour owner replies.",
    },
    {
      title: "Cross-Surface Ask Maps & AI Coherence",
      desc: "45% of buyers now ask AI tools (Gemini, Ask Maps, ChatGPT) and 43% cross-check Google Maps. We align NAP, hours, and service menus character-for-character across Google, Apple Maps, Yelp, and Bing.",
    },
    {
      title: "Manual GBP Suspension Defense",
      desc: "Hands-on manual reinstatement dossiers—utility bills, LLC filings, truck wraps, and storefront evidence—so an algorithmic suspension never wipes out your call volume.",
    },
  ];

  const localEcosystemMetrics = [
    {
      value: "42%",
      label: "Local Map Pack Click Share",
      detail: "#1 captures 17.6% · 29.6-pt cliff at #4",
    },
    {
      value: "+126%",
      label: "Traffic vs. Ranks #4–#10",
      detail: "+93% more calls, website clicks & directions",
    },
    {
      value: "75%",
      label: "Choose Within 30 Minutes",
      detail: "28% pick under 5 min · 73% start on mobile",
    },
    {
      value: "45%",
      label: "Use AI + Cross-Check Maps",
      detail: "68% require 4.0+ stars · 74% check <90d reviews",
    },
  ];

  const adsTimeline = [
    {
      period: "Days 1–7",
      title: "Ownership, Leak Seal & GCLID Setup",
      desc: "Verify client billing, shut off Search Partners/Display, deploy the 4-category negative matrix, and wire GTM + Enhanced Conversions.",
    },
    {
      period: "Weeks 2–4",
      title: "60/20/20 Launch & 1:1 CRO Pages",
      desc: "Launch Exact/Phrase STAGs and isolated PMax asset groups paired with message-matched, navigation-free landing pages.",
    },
    {
      period: "Month 2",
      title: "CRM Offline Sync & Split Testing",
      desc: "Sync MQL/SQL/Opportunity stages back to Google Ads; execute Monday search-term cleanups and friction-calibrated form refinements.",
    },
    {
      period: "Month 3+",
      title: "Target ROAS Transition & Scale",
      desc: "Once surpassing 30+ qualified conversion signals per month, migrate to Target ROAS and scale campaigns beating target CPQL.",
    },
  ];

  const comparisonRows = [
    {
      feature: "Time to First Qualified Pipeline",
      ads: "Days to 2 weeks",
      seo: "60 to 120 days (compounding)",
    },
    {
      feature: "Core Optimization Lever",
      ads: "Query isolation + CRM Value-Based Bidding + 1:1 CRO",
      seo: "GBP 'IS a' category, Proof-of-Work SAPs, areaServed schema & review velocity",
    },
    {
      feature: "Primary Failure Prevented",
      ads: "Bot/spam MQLs, broad-match bleed & homepage bounce",
      seo: "Proximity-bias invisibility, thin doorway pages & filler blog retainers",
    },
    {
      feature: "Asset Ownership",
      ads: "100% yours (client billing, CRM data & historical signals)",
      seo: "100% yours (Primary Owner on GBP & domain)",
    },
    {
      feature: "Monthly Proof Metric",
      ads: "CPQL, Pipeline-to-Spend & Closed-Won ROAS",
      seo: "Tracked GBP calls, <90-day review velocity & 5-mile Map Grid ranks",
    },
  ];

  return (
    <div className="bg-canvas min-h-screen">
      {/* Header Banner */}
      <section
        data-cta-sentinel="hero"
        className="surface-dark bg-canvas text-ink py-16 md:py-24 border-b border-border-hairline"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-5">
          <p className="eyebrow-mono text-kpi-positive">
            Operational Architecture · Revenue Infrastructure Over Vanity Clicks
          </p>
          <h1 className="type-hero font-display font-bold">
            Built Around Qualified Pipeline—Not Cheap Clicks
          </h1>
          <p className="type-lead text-ink-secondary mx-auto">
            With Enhanced CPC deprecated, manual bid tweaking is obsolete. We win by engineering superior query control, 1:1 CRO landing pages, CRM offline feedback loops, and Map Pack authority.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {[
              { href: "#tracking-architecture", label: "Phase 0 Tracking" },
              { href: "#google-ads", label: "Google Ads & VBB" },
              { href: "#cro-heuristics", label: "Landing Page CRO" },
              { href: "#local-seo", label: "GBP-First Local SEO" },
              { href: "#comparison", label: "Compare Channels" },
            ].map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="min-h-11 inline-flex items-center px-4 py-2 rounded-[var(--radius-btn)] bg-card hover:bg-subtle text-ink text-sm font-medium border border-border-control transition-colors whitespace-nowrap"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 0: Conversion Tracking, sGTM & Signal Recovery */}
      <section
        id="tracking-architecture"
        className="py-16 md:py-24 bg-canvas border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow-mono text-trust">
              00. Mandatory Phase 0 · Financial Control System for Paid Media
            </p>
            <h2 className="type-h2 font-display font-bold text-ink">
              Fix the Cash Register Before Scaling Ad Spend
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              In 2026, standard browser pixels routinely lose 34.5% to 70.5% of real conversions to ad blockers, Safari 7-day/CNAME caps, and consent gates—or double-count form fills. Launching Google Ads on corrupted signals forces you to pay tuition twice: once while Smart Bidding learns the wrong buyers, and again during a 30-day relearning slump after cleanup.
            </p>
          </div>

          {/* 2026 Signal Loss & Recovery Benchmarks Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 metric-tabular">
            {[
              {
                value: "34.5%–70.5%",
                label: "Browser Pixel Signal Loss",
                detail: "37% desktop ad-block · Safari 7-day cap · Consent gates",
              },
              {
                value: "+11%",
                label: "Google Tag Gateway Uplift",
                detail: "First-party domain routing via Cloudflare/CDN (Google Academy)",
              },
              {
                value: "-17.8%",
                label: "Lower Meta Cost / Result",
                detail: "Server-side CAPI lifts EMQ from 3.5–5.0 to 7.5–9.0",
              },
              {
                value: "0.8–5.0 mo",
                label: "Full Repair Payback",
                detail: "Right-sized $1.5k–$14.7k TCO at 10%–20% ad efficiency lift",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-[var(--radius-tile)] bg-card border border-border-hairline space-y-1"
              >
                <span className="type-kpi-card text-trust block">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-ink block">
                  {stat.label}
                </span>
                <span className="text-xs text-ink-muted block">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive 2026 Signal Loss & Payback Calculator */}
          <Suspense
            fallback={
              <div
                aria-busy="true"
                className="bento-card min-h-[540px] p-8 animate-pulse bg-subtle/60"
              />
            }
          >
            <SignalLossCalculator />
          </Suspense>

          {/* 4 Tracking Failure Modes Table */}
          <div className="space-y-4">
            <div className="max-w-3xl space-y-1.5">
              <h3 className="type-h3 font-display font-semibold text-ink">
                Four Tracking Failures That Silently Corrupt Smart Bidding
              </h3>
              <p className="text-sm text-ink-secondary">
                During Phase 0, we reconcile 30–90 days of real Shopify, Stripe, or CRM receipts against Google Ads and GA4 (healthy variance sits within 5%–10%) to eliminate every leak below:
              </p>
            </div>
            <div className="space-y-2">
              <p className="md:hidden caption-meta font-semibold text-ink-muted text-right">
                Scroll horizontally to inspect →
              </p>
              <div className="overflow-x-auto bento-card">
                <table className="min-w-full divide-y divide-border-hairline text-sm">
                  <thead className="bg-subtle text-ink">
                    <tr>
                      <th
                        scope="col"
                        className="sticky left-0 z-10 bg-subtle border-r border-border-hairline px-5 py-3.5 text-left font-bold"
                      >
                        Failure Mode
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        Technical Root Cause
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        How Smart Bidding Misbehaves
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        Financial Consequence
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-hairline bg-card">
                    {TRACKING_FAILURE_MODES.map((row) => (
                      <tr key={row.mode}>
                        <td className="sticky left-0 z-10 bg-card border-r border-border-hairline px-5 py-4 font-semibold text-ink whitespace-nowrap">
                          {row.mode}
                        </td>
                        <td className="px-5 py-4 text-ink-secondary">{row.rootCause}</td>
                        <td className="px-5 py-4 text-ink-secondary">{row.biddingBehavior}</td>
                        <td className="px-5 py-4 font-semibold text-kpi-negative">
                          ▼ {row.financialConsequence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right-Sized Measurement Stack Table */}
          <div className="space-y-4">
            <div className="max-w-3xl space-y-1.5">
              <h3 className="type-h3 font-display font-semibold text-ink">
                Right-Sized 2026 Measurement Architecture (Never Overbuilt)
              </h3>
              <p className="text-sm text-ink-secondary">
                Not every advertiser needs self-hosted Google Cloud Run. We match your stack to your monthly ad spend while enforcing post-June 15, 2026 <code className="type-code text-ink">ad_storage</code> Consent Mode rules and true same-origin routing for Safari ITP:
              </p>
            </div>
            <div className="space-y-2">
              <p className="md:hidden caption-meta font-semibold text-ink-muted text-right">
                Scroll horizontally to inspect →
              </p>
              <div className="overflow-x-auto bento-card">
                <table className="min-w-full divide-y divide-border-hairline text-sm">
                  <thead className="bg-subtle text-ink">
                    <tr>
                      <th
                        scope="col"
                        className="sticky left-0 z-10 bg-subtle border-r border-border-hairline px-5 py-3.5 text-left font-bold min-w-[152px]"
                      >
                        Architecture Option
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        2026 Infra Cost
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        Key Capabilities
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        Candid Trade-Offs
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-left font-bold">
                        Best Fit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-hairline bg-card">
                    {MEASUREMENT_STACK_OPTIONS.map((opt) => (
                      <tr key={opt.option}>
                        <td className="sticky left-0 z-10 bg-card border-r border-border-hairline px-5 py-4 font-semibold text-ink">
                          {opt.option}
                        </td>
                        <td className="px-5 py-4 text-ink-secondary metric-tabular whitespace-nowrap">
                          {opt.monthlyInfra}
                        </td>
                        <td className="px-5 py-4 text-ink-secondary">{opt.capabilities}</td>
                        <td className="px-5 py-4 text-ink-muted">{opt.tradeOffs}</td>
                        <td className="px-5 py-4 font-medium text-trust">
                          {opt.bestFit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pre-Framing the Post-Fix Dip */}
          <div className="p-6 sm:p-7 bento-card space-y-4">
            <div className="space-y-1">
              <p className="eyebrow-mono text-cta">
                Radical Candor · What to Expect After Repair
              </p>
              <h3 className="text-lg font-display font-bold text-ink">
                Why Reported Conversions Can Dip Overnight While Bank Deposits Rise
              </h3>
              <p className="text-sm text-ink-secondary max-w-3xl leading-relaxed">
                Stripping duplicate tags, &ldquo;Every&rdquo; lead inflation, and Primary micro-conversions removes phantom numbers immediately. We pre-brief your team on three exact milestones so nobody panics during cleanup:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 metric-tabular">
              {[
                {
                  window: "Day 1 (Cleanup)",
                  title: "Phantom Conversions Removed",
                  text: "Dashboard ROAS may dip on paper while real CRM/Stripe deposits stay steady or climb—proving duplicate counts are gone.",
                },
                {
                  window: "48–72 Hours",
                  title: "Match-Rate Verification",
                  text: "Confirm >40% Enhanced Conversions lead match rate (>60% checkout), Meta EMQ >7.0, and clean 6–8h offline indexing.",
                },
                {
                  window: "7–30 Days",
                  title: "Smart Bidding Recalibration",
                  text: "Allow 7–14 days for normal recalibration (up to 30 days on heavily polluted accounts) plus quarterly receipt reconciliations.",
                },
              ].map((step) => (
                <div
                  key={step.window}
                  className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline space-y-1.5"
                >
                  <span className="text-xs font-bold text-trust block">
                    {step.window}
                  </span>
                  <h4 className="text-sm font-display font-bold text-ink">
                    {step.title}
                  </h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 1: Zero-Waste Google Ads + CRM VBB */}
      <section
        id="google-ads"
        className="py-16 md:py-24 bg-card border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="eyebrow-mono text-cta">
                01. Paid Search, PMax Restraint &amp; RevOps
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                Zero-Waste Google Ads &amp; CRM Value-Based Bidding
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                Standard Smart Bidding treats a student PDF download the same as a signed contract. We feed real CRM deal values back into Google Ads so the algorithm acts like an automated SDR—bidding strictly for your Ideal Customer Profile.
              </p>

              <div className="p-5 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline space-y-2.5">
                <h3 className="text-sm font-display font-bold text-ink">
                  Ideal For:
                </h3>
                <ul className="space-y-2 text-sm text-ink-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Teams burned by cheap leads that never survive a sales call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5" aria-hidden="true" />
                    <span>High-CPC markets ($5–$15+/click) needing strict query isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Advertisers allocating $1,500+/mo directly to Google</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton href="/contact" variant="primary">
                  Get Free Leak Audit &amp; 90-Day Plan
                </CTAButton>
                <Link
                  href="/templates/hvac"
                  className="min-h-11 inline-flex items-center px-4 py-2.5 rounded-[var(--radius-btn)] border border-border-control text-sm font-semibold text-ink hover:border-trust hover:text-trust transition-colors whitespace-nowrap"
                >
                  Inspect 1:1 CRO Template
                  <ArrowUpRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {googleAdsProtocol.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-[var(--radius-tile)] border border-border-hairline bg-canvas space-y-2"
                >
                  <h3 className="text-base font-display font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 60/20/20 Intent Split & 4-Category Negative Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 border-t border-border-hairline">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="type-h3 font-display font-semibold text-ink">
                The 60 / 20 / 20 Intent Budget Allocation
              </h3>
              <p className="text-sm text-ink-secondary">
                Capital is deployed first against active buyer evaluation—never drowned in educational broad terms:
              </p>
              <div className="space-y-3">
                {queryControlAllocation.map((tier) => (
                  <div
                    key={tier.tier}
                    className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline flex items-start gap-4"
                  >
                    <span className="text-lg font-mono font-bold text-trust metric-tabular shrink-0">
                      {tier.share}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-display font-bold text-ink">
                        {tier.tier}
                      </h4>
                      <p className="text-xs text-ink-secondary">{tier.intentFocus}</p>
                      <p className="text-xs text-ink-muted italic">{tier.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="type-h3 font-display font-semibold text-ink">
                4-Category Exclusionary Negative Matrix
              </h3>
              <p className="text-sm text-ink-secondary">
                We pre-emptively block non-buyer queries before budget disappears on dead clicks:
              </p>
              <div className="divide-y divide-border-hairline border border-border-hairline rounded-[var(--radius-tile)] overflow-hidden bg-card">
                {negativeExclusionMatrix.map((group) => (
                  <div key={group.category} className="p-4 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-sm font-display font-bold text-ink">
                        {group.category}
                      </h4>
                      <span className="text-xs font-semibold text-cta">
                        Blocked: {group.blockedTerms}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary">{group.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CRM VBB Pipeline Stages */}
          <div className="pt-10 border-t border-border-hairline space-y-5">
            <div className="max-w-3xl space-y-1.5">
              <h3 className="type-h3 font-display font-semibold text-ink">
                How CRM Value-Based Bidding (VBB) Trains Google&apos;s Algorithm
              </h3>
              <p className="text-sm text-ink-secondary">
                Because complex B2B and high-ticket sales cycles outlast immediate ad clicks, we pass synthetic stage values back within Google&apos;s 63-day Enhanced Conversions window:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vbbPipelineStages.map((stage) => (
                <div
                  key={stage.stage}
                  className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-trust">{stage.stage}</h4>
                    <p className="text-xs text-ink-secondary leading-relaxed">{stage.trigger}</p>
                  </div>
                  <div className="pt-2 border-t border-border-hairline metric-tabular">
                    <span className="text-sm font-bold text-kpi-positive block">
                      ▲ {stage.syntheticValue}
                    </span>
                    <span className="text-xs text-ink-muted">{stage.uploadWindow}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ads 90-Day Timeline */}
          <div className="pt-10 border-t border-border-hairline">
            <h3 className="text-lg font-display font-bold text-ink flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-cta" aria-hidden="true" />
              90-Day Execution &amp; Target ROAS Cadence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {adsTimeline.map((step) => (
                <div
                  key={step.period}
                  className="p-5 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline space-y-2"
                >
                  <span className="tracking-id text-xs font-semibold text-trust">
                    {step.period}
                  </span>
                  <h4 className="text-base font-display font-bold text-ink">
                    {step.title}
                  </h4>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Systemic Landing Page CRO */}
      <section
        id="cro-heuristics"
        className="py-16 md:py-24 bg-canvas border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow-mono text-trust">
                02. Systemic Conversion Rate Optimization (CRO)
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                The Media Buyer Controls the Click. The Landing Page Controls Your CPA.
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                Lifting landing page conversion from a generic 2.5% homepage to an optimized 5.8% halves your Cost Per Acquisition without raising your Google Ads budget by a dollar.
              </p>
            </div>
            <CTAButton href="/templates/hvac" variant="outline">
              Open Interactive 1:1 CRO Sample
            </CTAButton>
          </div>

          <div className="overflow-x-auto bento-card">
            <table className="min-w-full divide-y divide-border-hairline text-sm">
              <thead className="bg-subtle text-ink">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-bold">Landing Page Element</th>
                  <th scope="col" className="px-6 py-4 text-left font-bold">CRO Execution Standard</th>
                  <th scope="col" className="px-6 py-4 text-left font-bold">Measured Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairline metric-tabular">
                {croHeuristics.map((row) => (
                  <tr key={row.element}>
                    <td className="px-6 py-4 font-semibold text-ink">
                      {row.element}
                    </td>
                    <td className="px-6 py-4 text-ink-secondary">{row.bestPractice}</td>
                    <td className="px-6 py-4 font-semibold text-kpi-positive">
                      ▲ {row.measuredImpact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Service 3: GBP-First Local Dominance */}
      <section
        id="local-seo"
        className="py-16 md:py-24 bg-card border-b border-border-hairline scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-14">
          {/* 2026 Local Map Pack Reality Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 metric-tabular">
            {localEcosystemMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-5 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline space-y-1"
              >
                <span className="type-kpi-card text-trust block">
                  {metric.value}
                </span>
                <span className="text-sm font-bold text-ink block">
                  {metric.label}
                </span>
                <span className="text-xs text-ink-muted block">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="eyebrow-mono text-kpi-positive">
                03. Google Business Profile, Map Pack &amp; Ask Maps
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                GBP-First Local Dominance
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                Post-AI Overviews, organic #1 CTR fell to 19%—while Google&apos;s Local 3-Pack captures 42% of local clicks. Generic blog retainers don&apos;t make the phone ring. We engineer the exact signals that overcome office proximity bias and keep your business surfaced in both Google Maps and AI recommendations.
              </p>

              <div className="p-5 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline space-y-2.5">
                <h3 className="text-sm font-display font-bold text-ink">
                  Ideal For:
                </h3>
                <ul className="space-y-2 text-sm text-ink-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Home services (HVAC, plumbing, roofing, electrical)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Medical, dental, legal, and storefront practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Owners ranking #1 at HQ but invisible 2 miles away</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton href="/contact" variant="primary">
                  Request Free Map Pack Audit
                </CTAButton>
                <a
                  href="#map-pack-calculator"
                  className="min-h-11 inline-flex items-center px-4 py-2.5 rounded-[var(--radius-btn)] border border-border-control text-sm font-semibold text-ink hover:border-trust hover:text-trust transition-colors whitespace-nowrap"
                >
                  Calculate Missed Revenue
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {localSeoProtocol.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-[var(--radius-tile)] border border-border-hairline bg-canvas space-y-2"
                >
                  <h3 className="text-base font-display font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2026 Local Map Pack Ranking Factor Weights */}
          <div className="pt-10 border-t border-border-hairline space-y-6">
            <div className="max-w-3xl space-y-1.5">
              <p className="eyebrow-mono text-ink-muted">
                2026 Local Search Ranking Factors (Whitespark Industry Benchmark)
              </p>
              <h3 className="type-h3 font-display font-semibold text-ink">
                Where Our Monthly Execution Hours Actually Go
              </h3>
              <p className="text-sm text-ink-secondary">
                Traditional SEO agencies spend 80% of your budget on low-weight blog posts or bloated directories. We allocate effort directly to the weighted signals that move Map Pack grids:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localRankingWeights2026.map((item) => (
                <div
                  key={item.factor}
                  className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline space-y-2.5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-display font-bold text-ink">
                      {item.factor}
                    </h4>
                    <span className="text-sm font-mono font-bold text-trust metric-tabular shrink-0">
                      {item.weightLabel}
                    </span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full bg-subtle overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full bg-trust"
                      style={{ width: `${Math.min(100, item.percentBar * 2.8)}%` }}
                    />
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Missed Revenue & 5x5 Geo-Grid Simulator */}
          <div className="pt-4 space-y-3">
            <Suspense
              fallback={
                <div
                  aria-busy="true"
                  className="bento-card min-h-[540px] p-8 animate-pulse bg-subtle/60"
                />
              }
            >
              <MapPackOpportunityWidget />
            </Suspense>
            <p className="caption-meta text-ink-muted">
              Compliance Notice: LeadGrow Agency is an independent agency. Google Business Profile optimization and Local SEO services are not verified, certified, or endorsed by Google.
            </p>
          </div>
        </div>
      </section>

      {/* Channel Comparison */}
      <section
        id="comparison"
        data-cta-sentinel="footer-cta"
        className="cv-auto py-16 md:py-24 bg-canvas scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-display font-bold text-ink">
              Google Ads + VBB vs. GBP-First Local SEO
            </h2>
            <p className="text-base text-ink-secondary">
              How both channels work together to capture immediate SQLs while compounding zero-click-cost Map calls.
            </p>
          </div>

          <div className="overflow-x-auto bento-card">
            <table className="min-w-full divide-y divide-border-hairline text-sm">
              <thead className="bg-subtle text-ink">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-bold">Dimension</th>
                  <th scope="col" className="px-6 py-4 text-left font-bold">Zero-Waste Google Ads + CRO</th>
                  <th scope="col" className="px-6 py-4 text-left font-bold">GBP-First Local SEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairline bg-card">
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-6 py-4 font-semibold text-ink">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-ink-secondary">{row.ads}</td>
                    <td className="px-6 py-4 text-ink-secondary">{row.seo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center pt-4">
            <CTAButton href="/pricing" variant="primary" size="lg">
              See Flat-Fee Pricing &amp; Pipeline ROI Model
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
