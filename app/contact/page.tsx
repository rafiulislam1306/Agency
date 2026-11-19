import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, ShieldCheck, Star } from "lucide-react";
import BreadcrumbAuditForm from "@/components/BreadcrumbAuditForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Free Website Audit & Strategy Call",
  description:
    "Request a 3-step async website, tracking, and Google Ads teardown in 45 seconds—or reserve a live 30-minute diagnostic call with a senior strategist.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-semibold text-brand-blue">
            Dual-Track Conversion · Zero Pitch Pressure
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Choose Your Track: Free 3-Step Audit or Live Strategy Call
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Want an async video &amp; scorecard teardown first? Complete the 45-second audit on the left (no phone number required). Ready to inspect your account live? Reserve a 30-minute diagnostic slot on the right.
          </p>

          {/* Independent Review Proof Bar (Combats 70% Contact Page Bounce Rate) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 whitespace-nowrap">
              <Star
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span className="tabular-nums">4.9</span> Clutch (34)
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 whitespace-nowrap">
              <Star
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span className="tabular-nums">4.8</span> G2 (29)
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 whitespace-nowrap">
              <Star
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span className="tabular-nums">4.9</span> Google (48)
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              &lt;4h Senior Strategist SLA
            </span>
          </div>
        </div>

        {/* Dual-Track Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Track 1 (Left): Mid-Intent 3-Step Breadcrumb Website & Ads Audit */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-brand-orange">
                Track 01 · Mid-Intent &amp; Researching
              </p>
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Free 3-Step Website, Tracking &amp; Ads Audit
              </h2>
            </div>

            <BreadcrumbAuditForm />

            {/* Named Photo-Backed Proof Flanking the Form */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed italic">
                &ldquo;Within 24 hours of submitting our URL, Lin and Rafiul sent a 10-minute Loom uncovering a 48% GA4 tracking blind spot and $3,200/mo in wasted broad-match spend. Best zero-pressure audit we&apos;ve received.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src="/images/client-vp-portrait.jpg"
                    alt="David Miller, VP of Operations at LoneStar Cooling"
                    fill
                    sizes="44px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    David Miller
                  </p>
                  <p className="text-xs text-slate-600">
                    VP of Operations · LoneStar Cooling &amp; Mechanical
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Track 2 (Right): High-Intent Direct Strategy Call Booking */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-brand-blue">
                Track 02 · High-Intent &amp; Ready to Evaluate
              </p>
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Reserve a Live 30-Minute Diagnostic Call
              </h2>
            </div>

            <CalendlyEmbed />

            {/* Direct Contact Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="bg-brand-blue/10 p-2.5 rounded-lg text-brand-blue shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-500 font-medium block">
                    Email senior team directly
                  </span>
                  <a
                    href="mailto:audit@leadgrowagency.com"
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-brand-blue transition-colors truncate block"
                  >
                    audit@leadgrowagency.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-700 shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Direct line (Mon–Fri CT)
                  </span>
                  <a
                    href="tel:+17135550199"
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-brand-blue transition-colors tabular-nums"
                  >
                    +1 (713) 555-0199
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
