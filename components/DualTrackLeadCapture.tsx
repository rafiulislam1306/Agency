"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, CheckCircle2, FileSearch, Star } from "lucide-react";
import BreadcrumbAuditForm from "@/components/BreadcrumbAuditForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";

interface DualTrackLeadCaptureProps {
  defaultTrack?: "audit" | "call";
}

const TRACKS = [
  { id: "audit", label: "Free 3-Step Audit" },
  { id: "call", label: "Book Strategy Call" },
] as const;

export default function DualTrackLeadCapture({
  defaultTrack = "audit",
}: DualTrackLeadCaptureProps) {
  const [activeTrack, setActiveTrack] = useState<"audit" | "call">(
    defaultTrack
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

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

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      nextIndex = (index + 1) % TRACKS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = TRACKS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveTrack(TRACKS[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Left Column: Value Framing + Independent Review Scores + Named Photo Testimonial */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <p className="eyebrow-mono text-kpi-positive">
            Two Ways to Start · Zero Pitch Pressure
          </p>
          <h2 className="type-h2 font-display font-bold text-ink">
            See Exactly Where Your Budget Is Leaking Before Spending Another Dollar
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Not ready for a live call? Request our 3-step async website &amp; ads teardown in 45 seconds. Ready to inspect your account live? Reserve a 30-minute strategy session with a senior specialist.
          </p>
        </div>

        <ul className="space-y-2.5 text-sm text-ink-secondary">
          {[
            "Receipt-to-Ads tracking check (GA4, Tag Gateway/sGTM & Consent Mode v2)",
            "Search Partners, Display & Broad-Match waste isolation",
            "GBP Map Pack 7×7 Geo-Grid & competitor category audit",
            "Break-even CPA math & prioritized fix list you keep either way",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2
                className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Independent Third-Party Review Scores */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {[
            { platform: "Clutch", score: "4.9", count: "34 reviews" },
            { platform: "G2", score: "4.8", count: "29 reviews" },
            { platform: "Google", score: "4.9", count: "48 reviews" },
          ].map((rev) => (
            <div
              key={rev.platform}
              className="dark-panel rounded-[var(--radius-tile)] px-3 py-2.5"
            >
              <div className="flex items-center gap-1 text-kpi-warning">
                <Star
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-ink metric-tabular">
                  {rev.score}
                </span>
              </div>
              <p className="text-xs font-semibold text-ink mt-0.5">
                {rev.platform}
              </p>
              <p className="text-[11px] text-ink-muted metric-tabular">
                {rev.count}
              </p>
            </div>
          ))}
        </div>

        {/* Named Photo-Backed Testimonial Adjacent to Form */}
        <div className="dark-panel rounded-[var(--radius-bento)] p-5 space-y-3">
          <p className="text-sm text-ink leading-relaxed italic">
            &ldquo;Their free teardown showed us 41% of our budget was hitting out-of-area clicks and broken GA4 events. We fixed tracking in week one and added $23,800/mo from Map Pack calls inside six months.&rdquo;
          </p>
          <div className="flex items-center gap-3 pt-1">
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
              <p className="text-xs font-bold text-ink">David Miller</p>
              <p className="text-xs text-ink-secondary">
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
          className="scroll-mt-24 grid grid-cols-2 gap-2 p-1.5 rounded-[var(--radius-tile)] bg-card border border-border-hairline"
          role="tablist"
          aria-label="Choose your audit format"
        >
          {TRACKS.map((track, idx) => {
            const selected = activeTrack === track.id;
            const Icon = track.id === "audit" ? FileSearch : Calendar;
            return (
              <button
                key={track.id}
                id={`${baseId}-track-${track.id}`}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-track-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTrack(track.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-11 px-3.5 py-2.5 rounded-[var(--radius-btn)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
                  selected
                    ? "bg-cta text-cta-ink font-bold"
                    : "text-ink-secondary hover:bg-subtle hover:text-ink"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{track.label}</span>
              </button>
            );
          })}
        </div>

        {/* Light-Surface Form Container inside dark conversion band (preserves high-clarity form readability) */}
        <div
          id={`${baseId}-track-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-track-${activeTrack}`}
          className="surface-light"
        >
          {activeTrack === "audit" ? <BreadcrumbAuditForm /> : <CalendlyEmbed />}
        </div>
      </div>
    </div>
  );
}
