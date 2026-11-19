import React from "react";
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
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-slate-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-xs font-semibold text-brand-green">
            Operational Architecture · Revenue Infrastructure Over Vanity Clicks
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight leading-tight text-balance">
            Built Around Qualified Pipeline—Not Cheap Clicks
          </h1>
          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            With Enhanced CPC deprecated, manual bid tweaking is obsolete. We win by engineering superior query control, 1:1 CRO landing pages, CRM offline feedback loops, and Map Pack authority.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="#tracking-architecture"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/15 transition-colors whitespace-nowrap"
            >
              Phase 0 Tracking
            </a>
            <a
              href="#google-ads"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/15 transition-colors whitespace-nowrap"
            >
              Google Ads &amp; VBB
            </a>
            <a
              href="#cro-heuristics"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/15 transition-colors whitespace-nowrap"
            >
              Landing Page CRO
            </a>
            <a
              href="#local-seo"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/15 transition-colors whitespace-nowrap"
            >
              GBP-First Local SEO
            </a>
            <a
              href="#comparison"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/15 transition-colors whitespace-nowrap"
            >
              Compare Channels
            </a>
          </div>
        </div>
      </section>

      {/* Phase 0: Conversion Tracking, sGTM & Signal Recovery */}
      <section
        id="tracking-architecture"
        className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold text-brand-blue">
              00. Mandatory Phase 0 · Financial Control System for Paid Media
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              Fix the Cash Register Before Scaling Ad Spend
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              In 2026, standard browser pixels routinely lose 34.5% to 70.5% of real conversions to ad blockers, Safari 7-day/CNAME caps, and consent gates—or double-count form fills. Launching Google Ads on corrupted signals forces you to pay tuition twice: once while Smart Bidding learns the wrong buyers, and again during a 30-day relearning slump after cleanup.
            </p>
          </div>

          {/* 2026 Signal Loss & Recovery Benchmarks Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
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
                className="p-5 rounded-xl bg-white border border-slate-200 space-y-1"
              >
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-blue block">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-slate-900 block">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-600 block">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive 2026 Signal Loss & Payback Calculator */}
          <SignalLossCalculator />

          {/* 4 Tracking Failure Modes Table */}
          <div className="space-y-4">
            <div className="max-w-3xl space-y-1.5">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Four Tracking Failures That Silently Corrupt Smart Bidding
              </h3>
              <p className="text-sm text-slate-600">
                During Phase 0, we reconcile 30–90 days of real Shopify, Stripe, or CRM receipts against Google Ads and GA4 (healthy variance sits within 5%–10%) to eliminate every leak below:
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-100/70 text-slate-900">
                  <tr>
                    <th className="px-5 py-3.5 text-left font-bold">Failure Mode</th>
                    <th className="px-5 py-3.5 text-left font-bold">Technical Root Cause</th>
                    <th className="px-5 py-3.5 text-left font-bold">How Smart Bidding Misbehaves</th>
                    <th className="px-5 py-3.5 text-left font-bold">Financial Consequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TRACKING_FAILURE_MODES.map((row) => (
                    <tr key={row.mode}>
                      <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">
                        {row.mode}
                      </td>
                      <td className="px-5 py-4 text-slate-700">{row.rootCause}</td>
                      <td className="px-5 py-4 text-slate-700">{row.biddingBehavior}</td>
                      <td className="px-5 py-4 font-medium text-rose-700">
                        {row.financialConsequence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right-Sized Measurement Stack Table */}
          <div className="space-y-4">
            <div className="max-w-3xl space-y-1.5">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Right-Sized 2026 Measurement Architecture (Never Overbuilt)
              </h3>
              <p className="text-sm text-slate-600">
                Not every advertiser needs self-hosted Google Cloud Run. We match your stack to your monthly ad spend while enforcing post-June 15, 2026 <code className="text-xs font-mono text-slate-800">ad_storage</code> Consent Mode rules and true same-origin routing for Safari ITP:
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-100/70 text-slate-900">
                  <tr>
                    <th className="px-5 py-3.5 text-left font-bold">Architecture Option</th>
                    <th className="px-5 py-3.5 text-left font-bold">2026 Infra Cost</th>
                    <th className="px-5 py-3.5 text-left font-bold">Key Capabilities</th>
                    <th className="px-5 py-3.5 text-left font-bold">Candid Trade-Offs</th>
                    <th className="px-5 py-3.5 text-left font-bold">Best Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MEASUREMENT_STACK_OPTIONS.map((opt) => (
                    <tr key={opt.option}>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {opt.option}
                      </td>
                      <td className="px-5 py-4 text-slate-700 tabular-nums whitespace-nowrap">
                        {opt.monthlyInfra}
                      </td>
                      <td className="px-5 py-4 text-slate-700">{opt.capabilities}</td>
                      <td className="px-5 py-4 text-slate-600">{opt.tradeOffs}</td>
                      <td className="px-5 py-4 font-medium text-brand-blue">
                        {opt.bestFit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pre-Framing the Post-Fix Dip */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-brand-orange">
                Radical Candor · What to Expect After Repair
              </p>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Why Reported Conversions Can Dip Overnight While Bank Deposits Rise
              </h3>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Stripping duplicate tags, &ldquo;Every&rdquo; lead inflation, and Primary micro-conversions removes phantom numbers immediately. We pre-brief your team on three exact milestones so nobody panics during cleanup:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 tabular-nums">
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
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                >
                  <span className="text-xs font-bold text-brand-blue block">
                    {step.window}
                  </span>
                  <h4 className="text-sm font-display font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
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
        className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold text-brand-orange">
                01. Paid Search, PMax Restraint &amp; RevOps
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
                Zero-Waste Google Ads &amp; CRM Value-Based Bidding
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Standard Smart Bidding treats a student PDF download the same as a signed contract. We feed real CRM deal values back into Google Ads so the algorithm acts like an automated SDR—bidding strictly for your Ideal Customer Profile.
              </p>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h3 className="text-sm font-display font-bold text-slate-900">
                  Ideal For:
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Teams burned by cheap leads that never survive a sales call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span>High-CPC markets ($5–$15+/click) needing strict query isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
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
                  className="inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors whitespace-nowrap"
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
                  className="p-5 rounded-xl border border-slate-200 bg-white space-y-2"
                >
                  <h3 className="text-base font-display font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 60/20/20 Intent Split & 4-Category Negative Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 border-t border-slate-100">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-display font-bold text-slate-900">
                The 60 / 20 / 20 Intent Budget Allocation
              </h3>
              <p className="text-sm text-slate-600">
                Capital is deployed first against active buyer evaluation—never drowned in educational broad terms:
              </p>
              <div className="space-y-3">
                {queryControlAllocation.map((tier) => (
                  <div
                    key={tier.tier}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4"
                  >
                    <span className="text-lg font-display font-extrabold text-brand-blue tabular-nums shrink-0">
                      {tier.share}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-display font-bold text-slate-900">
                        {tier.tier}
                      </h4>
                      <p className="text-xs text-slate-600">{tier.intentFocus}</p>
                      <p className="text-xs text-slate-500 italic">{tier.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-display font-bold text-slate-900">
                4-Category Exclusionary Negative Matrix
              </h3>
              <p className="text-sm text-slate-600">
                We pre-emptively block non-buyer queries before budget disappears on dead clicks:
              </p>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {negativeExclusionMatrix.map((group) => (
                  <div key={group.category} className="p-4 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-sm font-display font-bold text-slate-900">
                        {group.category}
                      </h4>
                      <span className="text-xs font-medium text-brand-orange">
                        Blocked: {group.blockedTerms}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{group.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CRM VBB Pipeline Stages */}
          <div className="pt-10 border-t border-slate-100 space-y-5">
            <div className="max-w-3xl space-y-1.5">
              <h3 className="text-xl font-display font-bold text-slate-900">
                How CRM Value-Based Bidding (VBB) Trains Google&apos;s Algorithm
              </h3>
              <p className="text-sm text-slate-600">
                Because complex B2B and high-ticket sales cycles outlast immediate ad clicks, we pass synthetic stage values back within Google&apos;s 63-day Enhanced Conversions window:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vbbPipelineStages.map((stage) => (
                <div
                  key={stage.stage}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-brand-blue">{stage.stage}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{stage.trigger}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 tabular-nums">
                    <span className="text-sm font-bold text-emerald-700 block">
                      {stage.syntheticValue}
                    </span>
                    <span className="text-xs text-slate-500">{stage.uploadWindow}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ads 90-Day Timeline */}
          <div className="pt-10 border-t border-slate-100">
            <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-brand-orange" aria-hidden="true" />
              90-Day Execution &amp; Target ROAS Cadence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {adsTimeline.map((step) => (
                <div
                  key={step.period}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <span className="text-xs font-semibold text-brand-blue tabular-nums">
                    {step.period}
                  </span>
                  <h4 className="text-base font-display font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
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
        className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold text-brand-blue">
                02. Systemic Conversion Rate Optimization (CRO)
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
                The Media Buyer Controls the Click. The Landing Page Controls Your CPA.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Lifting landing page conversion from a generic 2.5% homepage to an optimized 5.8% halves your Cost Per Acquisition without raising your Google Ads budget by a dollar.
              </p>
            </div>
            <CTAButton href="/templates/hvac" variant="outline">
              Open Interactive 1:1 CRO Sample
            </CTAButton>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-100/70 text-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Landing Page Element</th>
                  <th className="px-6 py-4 text-left font-bold">CRO Execution Standard</th>
                  <th className="px-6 py-4 text-left font-bold">Measured Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {croHeuristics.map((row) => (
                  <tr key={row.element}>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {row.element}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{row.bestPractice}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">
                      {row.measuredImpact}
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
        className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* 2026 Local Map Pack Reality Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
            {localEcosystemMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
              >
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-blue block">
                  {metric.value}
                </span>
                <span className="text-sm font-bold text-slate-900 block">
                  {metric.label}
                </span>
                <span className="text-xs text-slate-600 block">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold text-brand-green-hover">
                03. Google Business Profile, Map Pack &amp; Ask Maps
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
                GBP-First Local Dominance
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Post-AI Overviews, organic #1 CTR fell to 19%—while Google&apos;s Local 3-Pack captures 42% of local clicks. Generic blog retainers don&apos;t make the phone ring. We engineer the exact signals that overcome office proximity bias and keep your business surfaced in both Google Maps and AI recommendations.
              </p>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h3 className="text-sm font-display font-bold text-slate-900">
                  Ideal For:
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Home services (HVAC, plumbing, roofing, electrical)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Medical, dental, legal, and storefront practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
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
                  className="inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors whitespace-nowrap"
                >
                  Calculate Missed Revenue
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {localSeoProtocol.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <h3 className="text-base font-display font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2026 Local Map Pack Ranking Factor Weights */}
          <div className="pt-10 border-t border-slate-100 space-y-6">
            <div className="max-w-3xl space-y-1.5">
              <p className="text-xs font-semibold text-slate-500">
                2026 Local Search Ranking Factors (Whitespark Industry Benchmark)
              </p>
              <h3 className="text-xl font-display font-bold text-slate-900">
                Where Our Monthly Execution Hours Actually Go
              </h3>
              <p className="text-sm text-slate-600">
                Traditional SEO agencies spend 80% of your budget on low-weight blog posts or bloated directories. We allocate effort directly to the weighted signals that move Map Pack grids:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localRankingWeights2026.map((item) => (
                <div
                  key={item.factor}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-display font-bold text-slate-900">
                      {item.factor}
                    </h4>
                    <span className="text-sm font-bold text-brand-blue tabular-nums shrink-0">
                      {item.weightLabel}
                    </span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full bg-slate-200 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full bg-brand-blue"
                      style={{ width: `${Math.min(100, item.percentBar * 2.8)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Missed Revenue & 5x5 Geo-Grid Simulator */}
          <div className="pt-4">
            <MapPackOpportunityWidget />
          </div>
        </div>
      </section>

      {/* Channel Comparison */}
      <section id="comparison" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Google Ads + VBB vs. GBP-First Local SEO
            </h2>
            <p className="text-base text-slate-600">
              How both channels work together to capture immediate SQLs while compounding zero-click-cost Map calls.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Dimension</th>
                  <th className="px-6 py-4 text-left font-bold">Zero-Waste Google Ads + CRO</th>
                  <th className="px-6 py-4 text-left font-bold">GBP-First Local SEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{row.ads}</td>
                    <td className="px-6 py-4 text-slate-700">{row.seo}</td>
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
