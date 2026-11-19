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
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Point-of-View Header & Customer-Outcome Mission */}
        <div className="space-y-5 border-b border-slate-200 pb-12">
          <p className="text-xs font-semibold text-brand-blue">
            Our Fiduciary Thesis · Senior-Only Delivery
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Built for Operators Tired of Paying Percentage Markups for Unaccountable Agencies
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Buying committees don&apos;t need another polished sales deck followed by a junior account handoff. The senior specialists who audit your conversion tracking, Google Ads, and Map Pack on day one are the exact engineers executing inside your accounts every Monday.
          </p>

          {/* Verifiable Operational Traction & SLA Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {OPERATIONAL_TRACTION.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1"
              >
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-blue tabular-nums block">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-900 block leading-snug">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-500 block leading-snug">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Senior Leadership & Delivery Specialists (Named Humans Behind the Work) */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-brand-green-hover">
              Who Actually Touches Your Accounts
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Senior Strategists — Zero Post-Sale Bait-and-Switch
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We cap active client load per strategist so every search term report, sGTM container, and GBP ranking grid is reviewed manually each week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row items-start gap-5"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0">
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
                    <h3 className="text-lg font-display font-bold text-slate-900">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-blue">
                      {member.role}
                    </p>
                    <p className="text-[11px] font-medium text-emerald-700 mt-0.5">
                      {member.credentials}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Pod Governance Note */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-slate-900 block">
                  Dedicated Delivery Pod
                </span>
                <span className="text-slate-600">
                  Max 6 accounts per lead strategist for deep weekly execution.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-slate-900 block">
                  Published Weekly Change Logs
                </span>
                <span className="text-slate-600">
                  Every negative keyword, bid change &amp; GBP update documented.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-slate-900 block">
                  Certified Measurement Stack
                </span>
                <span className="text-slate-600">
                  Google Partner · GA4 · Stape sGTM · HubSpot RevOps.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Why We Built This Differently */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-slate-200 pt-12">
          <div className="md:col-span-4">
            <h2 className="text-xl font-display font-bold text-slate-900">
              Why the Industry Needed an Antidote
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Too many B2B and local service leaders spend thousands on retainers only to get automated PDF decks praising &ldquo;impressions&rdquo; while qualified pipeline stalls—or discover when trying to switch vendors that the agency registered their ad history or Google Business Profile under agency emails.
            </p>
            <p>
              We stripped away every misaligned agency habit: no 12-month lock-ins, no percentage-of-ad-spend markups, no junior &ldquo;set and forget&rdquo; handoffs, and no black-box asset ownership.
            </p>
          </div>
        </div>

        {/* 4. How We Operate */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-slate-200 pt-12">
          <div className="md:col-span-4">
            <h2 className="text-xl font-display font-bold text-slate-900">
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
                  className="w-5 h-5 text-brand-green shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Digital Bill of Rights Table */}
        <div className="border-t border-slate-200 pt-12 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue">
              <ShieldCheck className="w-4 h-4 text-brand-green" aria-hidden="true" />
              Contractual Protection
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              The Digital Bill of Rights
            </h2>
            <p className="text-sm text-slate-600">
              Enshrined in every client agreement so you never lose control of your digital footprint.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Asset</th>
                  <th className="px-4 py-3 text-left font-semibold">Legal Owner</th>
                  <th className="px-4 py-3 text-left font-semibold">Our Role</th>
                  <th className="px-4 py-3 text-left font-semibold">Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {digitalBillOfRights.map((row) => (
                  <tr key={row.asset}>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {row.asset}
                    </td>
                    <td className="px-4 py-3 text-emerald-700 font-medium">
                      {row.owner}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.agencyAccess}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.guarantee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-slate-900">
            Want an Honest Look at Your Current Search Setup?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
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
