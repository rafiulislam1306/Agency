"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, CheckCircle2, FileSearch, Star } from "lucide-react";
import BreadcrumbAuditForm from "@/components/BreadcrumbAuditForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";

interface DualTrackLeadCaptureProps {
  defaultTrack?: "audit" | "call";
}

export default function DualTrackLeadCapture({
  defaultTrack = "audit",
}: DualTrackLeadCaptureProps) {
  const [activeTrack, setActiveTrack] = useState<"audit" | "call">(
    defaultTrack
  );

  // Sync tab with anchor hash when users click Hero CTAs (#free-audit-form vs #book-audit)
  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#book-audit") {
        setActiveTrack("call");
      } else if (window.location.hash === "#free-audit-form") {
        setActiveTrack("audit");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Left Column: Value Framing + Independent Review Scores + Named Photo Testimonial */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-brand-green">
            Two Ways to Start · Zero Pitch Pressure
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight leading-tight text-white text-balance">
            See Exactly Where Your Budget Is Leaking Before Spending Another Dollar
          </h2>
          <p className="text-base text-blue-100 leading-relaxed">
            Not ready for a live call? Request our 3-step async website &amp; ads teardown in 45 seconds. Ready to inspect your account live? Reserve a 30-minute strategy session with a senior specialist.
          </p>
        </div>

        <ul className="space-y-2.5 text-sm text-blue-100">
          {[
            "Receipt-to-Ads tracking check (GA4, Tag Gateway/sGTM & Consent Mode v2)",
            "Search Partners, Display & Broad-Match waste isolation",
            "GBP Map Pack 5×5 Geo-Grid & competitor category audit",
            "Break-even CPA math & prioritized fix list you keep either way",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2
                className="w-4 h-4 text-brand-green shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Independent Third-Party Review Scores (Proof Element #4) */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {[
            { platform: "Clutch", score: "4.9", count: "34 reviews" },
            { platform: "G2", score: "4.8", count: "29 reviews" },
            { platform: "Google", score: "4.9", count: "48 reviews" },
          ].map((rev) => (
            <div
              key={rev.platform}
              className="rounded-xl bg-white/10 border border-white/15 px-3 py-2.5"
            >
              <div className="flex items-center gap-1 text-amber-300">
                <Star
                  className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-white tabular-nums">
                  {rev.score}
                </span>
              </div>
              <p className="text-xs font-semibold text-white mt-0.5">
                {rev.platform}
              </p>
              <p className="text-[11px] text-blue-200 tabular-nums">
                {rev.count}
              </p>
            </div>
          ))}
        </div>

        {/* Named Photo-Backed Testimonial Adjacent to Form (Proof Element #3) */}
        <div className="rounded-2xl bg-slate-950/50 border border-white/15 p-5 space-y-3">
          <p className="text-sm text-blue-50 leading-relaxed italic">
            &ldquo;Their free teardown showed us 41% of our budget was hitting out-of-area clicks and broken GA4 events. We fixed tracking in week one and added $23,800/mo from Map Pack calls inside six months.&rdquo;
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0">
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
              <p className="text-xs font-bold text-white">David Miller</p>
              <p className="text-xs text-blue-200">
                VP of Operations · LoneStar Cooling &amp; Mechanical
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dual-Track Intent Switcher */}
      <div className="lg:col-span-7 space-y-4">
        <div
          id="free-audit-form"
          className="scroll-mt-24 grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-white/10 border border-white/15"
          role="tablist"
          aria-label="Choose your audit format"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === "audit"}
            onClick={() => setActiveTrack("audit")}
            className={`px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              activeTrack === "audit"
                ? "bg-white text-brand-blue shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <FileSearch className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Free 3-Step Audit</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === "call"}
            onClick={() => setActiveTrack("call")}
            className={`px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              activeTrack === "call"
                ? "bg-white text-brand-blue shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Book Strategy Call</span>
          </button>
        </div>

        {activeTrack === "audit" ? <BreadcrumbAuditForm /> : <CalendlyEmbed />}
      </div>
    </div>
  );
}
