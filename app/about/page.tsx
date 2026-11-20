import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Clock, Award, Users } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { digitalBillOfRights } from "@/lib/agencyData";

export const metadata: Metadata = {
  title: "About & Leadership | Fiduciary Search Marketing for SMBs & B2B",
  description:
    "Meet the senior strategists behind LeadGrow Agency. Built around total client asset ownership, flat retainers, Phase 0 sGTM tracking, and <4h response SLAs.",
};

const OPERATIONAL_TRACTION = [
  {
    value: "140+",
    label: "Live Account & Tracking Audits Delivered",
    detail: "Across B2B SaaS, HVAC, healthcare & DTC",
  },
  {
    value: "<4 hrs",
    label: "Senior Strategist Response SLA",
    detail: "Direct Slack & email — no junior handoffs",
  },
  {
    value: "4.9★",
    label: "Verified Clutch & Google Average",
    detail: "111 verified third-party client reviews",
  },
  {
    value: "100%",
    label: "Client Asset & Data Ownership",
    detail: "Contractual Digital Bill of Rights from day 1",
  },
];

const LEADERSHIP_TEAM = [
  {
    name: "Rafiul Islam",
    role: "Founder & Principal Search Strategist",
    credentials: "Google Ads Certified · 60/20/20 & VBB Architect",
    bio: "Leads account architecture, CRM Value-Based Bidding transitions, and leak-audit teardowns. Built LeadGrow to replace percentage-of-spend agencies with senior-only execution.",
    image: "/images/founder-portrait.jpg",
    alt: "Rafiul Islam, Founder and Principal Search Strategist at LeadGrow Agency",
  },
  {
    name: "Lin Chen",
    role: "Head of Analytics, sGTM & CRO",
    credentials: "GA4 · Server-Side GTM · Consent Mode v2 Specialist",
    bio: "Owns Phase 0 signal recovery, Tag Gateway & sGTM deployments, Enhanced Conversions match-rate auditing, and 1:1 message-matched landing page conversion experiments.",
    image: "/images/delivery-lead-portrait.jpg",
    alt: "Lin Chen, Head of Analytics, sGTM and CRO at LeadGrow Agency",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
        {/* 1. Point-of-View Header & Customer-Outcome Mission */}
        <div
          data-cta-sentinel="hero"
          className="space-y-5 border-b border-border-hairline pb-12"
        >
          <p className="eyebrow-mono text-trust">
            Our Fiduciary Thesis · Senior-Only Delivery
          </p>
          <h1 className="type-hero font-display font-bold text-ink">
            Built for Operators Tired of Paying Percentage Markups for Unaccountable Agencies
          </h1>
          <p className="type-lead text-ink-secondary">
            Buying committees don&apos;t need another polished sales deck followed by a junior account handoff. The senior specialists who audit your conversion tracking, Google Ads, and Map Pack on day one are the exact engineers executing inside your accounts every Monday.
          </p>

          {/* Verifiable Operational Traction & SLA Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {OPERATIONAL_TRACTION.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[var(--radius-tile)] bg-card border border-border-hairline p-4 space-y-1"
              >
                <span className="type-kpi-card text-trust block">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-ink block leading-snug">
                  {stat.label}
                </span>
                <span className="text-[11px] text-ink-muted block leading-snug">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Senior Leadership & Delivery Specialists (Named Humans Behind the Work) */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="eyebrow-mono text-kpi-positive">
              Who Actually Touches Your Accounts
            </p>
            <h2 className="type-h2 font-display font-bold text-ink">
              Senior Strategists — Zero Post-Sale Bait-and-Switch
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              We cap active client load per strategist so every search term report, sGTM container, and GBP ranking grid is reviewed manually each week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.name}
                className="bento-card p-6 flex flex-col sm:flex-row items-start gap-5"
              >
                <div className="relative w-24 h-24 rounded-[var(--radius-tile)] overflow-hidden border border-border-hairline shrink-0">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-display font-bold text-ink">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-trust">
                      {member.role}
                    </p>
                    <p className="text-[11px] font-medium text-kpi-positive mt-0.5">
                      {member.credentials}
                    </p>
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Pod Governance Note */}
          <div className="rounded-[var(--radius-tile)] bg-card border border-border-hairline p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-trust shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-ink block">
                  Dedicated Delivery Pod
                </span>
                <span className="text-ink-secondary">
                  Max 6 accounts per lead strategist for deep weekly execution.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-trust shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-ink block">
                  Published Weekly Change Logs
                </span>
                <span className="text-ink-secondary">
                  Every negative keyword, bid change &amp; GBP update documented.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-trust shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-ink block">
                  Certified Measurement Stack
                </span>
                <span className="text-ink-secondary">
                  Google Partner · GA4 · Stape sGTM · HubSpot RevOps.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Why We Built This Differently */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-border-hairline pt-12">
          <div className="md:col-span-4">
            <h2 className="text-xl font-display font-bold text-ink">
              Why the Industry Needed an Antidote
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base text-ink-secondary leading-relaxed">
            <p>
              Too many B2B and local service leaders spend thousands on retainers only to get automated PDF decks praising &ldquo;impressions&rdquo; while qualified pipeline stalls—or discover when trying to switch vendors that the agency registered their ad history or Google Business Profile under agency emails.
            </p>
            <p>
              We stripped away every misaligned agency habit: no 12-month lock-ins, no percentage-of-ad-spend markups, no junior &ldquo;set and forget&rdquo; handoffs, and no black-box asset ownership.
            </p>
          </div>
        </div>

        {/* 4. How We Operate */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-border-hairline pt-12">
          <div className="md:col-span-4">
            <h2 className="text-xl font-display font-bold text-ink">
              Our Four-Step Operating Standard
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            {[
              {
                title: "01. Phase 0 Signal Recovery & Leak Audit",
                text: "We reconcile bank/CRM receipts against Google Ads and GA4 first—fixing broken tracking, Consent Mode v2, Search Partners, and GBP categories before scaling spend.",
              },
              {
                title: "02. Day-One Asset Ownership Setup",
                text: "Every ad account, GA4 property, sGTM container, and Google Business Profile is created under your company email with your card paying Google directly.",
              },
              {
                title: "03. Weekly Manual Change Logs",
                text: "Every week, you see the exact negative keywords added, bids tuned, Proof-of-Work pages shipped, and landing-page CRO tests deployed.",
              },
              {
                title: "04. 1-Page Money-In vs. Money-Out Reporting",
                text: "Monthly summaries track Ad Spend, Flat Fee, Qualified SQLs/Calls, and Verified CRM Revenue—never vanity impressions.",
              },
            ].map((step) => (
              <div key={step.title} className="flex items-start gap-3.5">
                <CheckCircle2
                  className="w-5 h-5 text-kpi-positive shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display font-bold text-ink text-base">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-secondary mt-1 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Digital Bill of Rights Table */}
        <div className="border-t border-border-hairline pt-12 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 eyebrow-mono text-trust">
              <ShieldCheck className="w-4 h-4 text-kpi-positive" aria-hidden="true" />
              Contractual Protection
            </div>
            <h2 className="type-h2 font-display font-bold text-ink">
              The Digital Bill of Rights
            </h2>
            <p className="text-sm text-ink-secondary">
              Enshrined in every client agreement so you never lose control of your digital footprint.
            </p>
          </div>

          <div className="overflow-x-auto bento-card">
            <table className="min-w-full divide-y divide-border-hairline text-sm">
              <thead className="bg-subtle text-ink">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Asset</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Legal Owner</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Our Role</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairline bg-card">
                {digitalBillOfRights.map((row) => (
                  <tr key={row.asset}>
                    <td className="px-4 py-3 font-semibold text-ink">
                      {row.asset}
                    </td>
                    <td className="px-4 py-3 text-kpi-positive font-semibold">
                      {row.owner}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">
                      {row.agencyAccess}
                    </td>
                    <td className="px-4 py-3 text-ink-secondary">{row.guarantee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          data-cta-sentinel="footer-cta"
          className="bento-card p-8 text-center space-y-4"
        >
          <h3 className="text-2xl font-display font-bold text-ink">
            Want an Honest Look at Your Current Search Setup?
          </h3>
          <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto">
            Start with our 45-second free website audit or reserve a live 30-minute diagnostic call with Rafiul &amp; Lin. We will tell you straight whether Google Ads or Local SEO makes financial sense for your margins.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton href="/contact" variant="primary" size="lg">
              Get Free Website Audit or Book Call
            </CTAButton>
            <CTAButton href="/case-studies" variant="outline" size="lg">
              Inspect Un-Gated Case Studies
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
