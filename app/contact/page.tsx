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
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="eyebrow-mono text-trust">
            Dual-Track Conversion · Zero Pitch Pressure
          </p>
          <h1 className="type-hero font-display font-bold text-ink">
            Choose Your Track: Free 3-Step Audit or Live Strategy Call
          </h1>
          <p className="type-lead text-ink-secondary mx-auto">
            Want an async video &amp; scorecard teardown first? Complete the 45-second audit on the left (no phone number required). Ready to inspect your account live? Reserve a 30-minute diagnostic slot on the right.
          </p>

          {/* Independent Review Proof Bar (Combats 70% Contact Page Bounce Rate) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ink-secondary">
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink whitespace-nowrap">
              <Star
                className="w-3.5 h-3.5 fill-kpi-warning text-kpi-warning shrink-0"
                aria-hidden="true"
              />
              <span className="metric-tabular">4.9</span> Clutch (34)
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink whitespace-nowrap">
              <Star
                className="w-3.5 h-3.5 fill-kpi-warning text-kpi-warning shrink-0"
                aria-hidden="true"
              />
              <span className="metric-tabular">4.8</span> G2 (29)
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink whitespace-nowrap">
              <Star
                className="w-3.5 h-3.5 fill-kpi-warning text-kpi-warning shrink-0"
                aria-hidden="true"
              />
              <span className="metric-tabular">4.9</span> Google (48)
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-kpi-positive whitespace-nowrap">
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
              <p className="eyebrow-mono text-cta">
                Track 01 · Mid-Intent &amp; Researching
              </p>
              <h2 className="text-2xl font-display font-bold text-ink">
                Free 3-Step Website, Tracking &amp; Ads Audit
              </h2>
            </div>

            <BreadcrumbAuditForm />

            {/* Named Photo-Backed Proof Flanking the Form */}
            <div className="bento-card p-5 space-y-3">
              <p className="text-sm text-ink-secondary leading-relaxed italic">
                &ldquo;Within 24 hours of submitting our URL, Lin and Rafiul sent a 10-minute Loom uncovering a 48% GA4 tracking blind spot and $3,200/mo in wasted broad-match spend. Best zero-pressure audit we&apos;ve received.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border-hairline shrink-0">
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
                  <p className="text-xs font-bold text-ink">
                    David Miller
                  </p>
                  <p className="text-xs text-ink-muted">
                    VP of Operations · LoneStar Cooling &amp; Mechanical
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Track 2 (Right): High-Intent Direct Strategy Call Booking */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <p className="eyebrow-mono text-trust">
                Track 02 · High-Intent &amp; Ready to Evaluate
              </p>
              <h2 className="text-2xl font-display font-bold text-ink">
                Reserve a Live 30-Minute Diagnostic Call
              </h2>
            </div>

            <CalendlyEmbed />

            {/* Direct Contact Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3.5 bg-card p-4 rounded-[var(--radius-tile)] border border-border-hairline">
                <div className="bg-trust-tint p-2.5 rounded-[var(--radius-btn)] text-trust shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-ink-muted font-medium block">
                    Email senior team directly
                  </span>
                  <a
                    href="mailto:audit@leadgrowagency.com"
                    className="text-xs sm:text-sm font-semibold text-ink hover:text-trust transition-colors truncate block"
                  >
                    audit@leadgrowagency.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-card p-4 rounded-[var(--radius-tile)] border border-border-hairline">
                <div className="bg-kpi-positive-bg p-2.5 rounded-[var(--radius-btn)] text-kpi-positive shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs text-ink-muted font-medium block">
                    Direct line (Mon–Fri CT)
                  </span>
                  <a
                    href="tel:+17135550199"
                    className="text-xs sm:text-sm font-semibold text-ink hover:text-trust transition-colors metric-tabular"
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
