"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Check,
  ShieldCheck,
  Clock,
  Lock,
  Sparkles,
  Snowflake,
  ArrowLeft,
} from "lucide-react";

export default function HvacEmergencyTemplate() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    issue: "AC is blowing warm air",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCroNotes, setShowCroNotes] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.phoneNumber.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col justify-between">
      {/* Subtle Demo Notice Bar + CRO Anatomy Toggle */}
      <div className="surface-dark bg-canvas text-ink-secondary text-xs py-2.5 px-4 border-b border-border-hairline">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span>
            Sample High-Converting Google Ads Landing Page (1:1 Attention Ratio CRO)
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowCroNotes((prev) => !prev)}
              aria-expanded={showCroNotes}
              className="min-h-11 px-3 py-1.5 rounded-[var(--radius-btn)] bg-card hover:bg-subtle border border-border-control text-ink font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              {showCroNotes ? "Hide CRO Anatomy" : "Inspect 4 CRO Heuristics"}
            </button>
            <Link
              href="/services#cro-heuristics"
              className="min-h-11 inline-flex items-center gap-1 text-kpi-positive hover:text-ink font-semibold whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Back to Services
            </Link>
          </div>
        </div>
        {showCroNotes ? (
          <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-border-hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-ink-secondary">
            <div>
              <strong className="text-ink block">1. 1:1 Attention Ratio</strong>
              Global nav links &amp; footer exits removed (13.5% vs 10.5% CVR).
            </div>
            <div>
              <strong className="text-ink block">2. Strict H1 Message Match</strong>
              Headline mirrors emergency search query (+15–25% CVR lift).
            </div>
            <div>
              <strong className="text-ink block">3. Above-the-Fold Authority</strong>
              4.9/5 rating, BBB A+, and 60-min SLA shown before form ask.
            </div>
            <div>
              <strong className="text-ink block">4. Enhanced Conversion Routing</strong>
              Dispatch form maps directly to Google Ads offline conversion value.
            </div>
          </div>
        ) : null}
      </div>

      {/* Distraction-free Header */}
      <header className="bg-card py-4 border-b border-border-hairline sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-trust p-2 rounded-[var(--radius-btn)] text-white">
              <Snowflake className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-ink">
              Gulf Coast <span className="text-trust">HVAC</span>
            </span>
          </div>

          <a
            href="tel:+17135550199"
            className="min-h-11 inline-flex items-center gap-2 px-4 py-2 bg-cta hover:bg-cta-hover active:bg-cta-active rounded-[var(--radius-btn)] font-semibold text-cta-ink text-sm transition-colors whitespace-nowrap"
            aria-label="Call 24/7 Dispatch"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">24/7 Dispatch:</span>
            <span className="metric-tabular">(713) 555-0199</span>
          </a>
        </div>
      </header>

      {/* Main Conversion Split */}
      <main className="flex-grow flex items-center py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="eyebrow-mono text-cta">
              Same-Day Emergency Dispatch · Greater Houston Area
            </p>

            <h1 className="type-hero font-display font-bold text-ink">
              Emergency AC Repair in{" "}
              <span className="text-trust">Greater Houston</span>—Dispatched in 60 Minutes
            </h1>

            <p className="type-lead text-ink-secondary">
              Licensed, background-checked HVAC technicians stocked with common parts so your cooling is restored on the first visit—with upfront flat-rate pricing before any repair begins.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  label: "60-Minute Dispatch Window",
                  icon: Clock,
                  desc: "On-time arrival or diagnostic fee waived",
                },
                {
                  label: "Licensed & Insured Techs",
                  icon: ShieldCheck,
                  desc: "State-certified specialists you can verify",
                },
                {
                  label: "Upfront Flat-Rate Quote",
                  icon: Sparkles,
                  desc: "Zero surprise overtime or hidden dispatch fees",
                },
                {
                  label: "2-Year Repair Warranty",
                  icon: Check,
                  desc: "Parts and labor backed in writing",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-3 bg-card p-4 rounded-[var(--radius-tile)] border border-border-hairline"
                >
                  <div className="shrink-0 w-9 h-9 rounded-[var(--radius-btn)] bg-kpi-positive-bg text-kpi-positive flex items-center justify-center">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-ink text-sm">
                      {item.label}
                    </h2>
                    <p className="text-xs text-ink-muted mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs font-semibold text-ink-muted">
              <span>4.9 / 5 Verified Google Rating (280+ Reviews)</span>
              <span aria-hidden="true"> · </span>
              <span>BBB A+ Accredited</span>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-5 w-full">
            <div className="bento-card p-6 sm:p-8 shadow-[var(--shadow-whisper)]">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-display font-bold text-ink">
                      Request Priority Dispatch
                    </h2>
                    <p className="text-sm text-ink-muted mt-1">
                      Or call{" "}
                      <a
                        href="tel:+17135550199"
                        className="font-semibold text-trust hover:underline metric-tabular"
                      >
                        (713) 555-0199
                      </a>{" "}
                      for immediate routing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full min-h-11 px-3.5 py-2.5 bg-card border border-border-control focus:border-trust rounded-[var(--radius-input)] text-sm text-ink placeholder:text-ink-muted"
                        placeholder="Jordan Taylor"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="w-full min-h-11 px-3.5 py-2.5 bg-card border border-border-control focus:border-trust rounded-[var(--radius-input)] text-sm text-ink placeholder:text-ink-muted"
                        placeholder="(713) 555-0142"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="issue"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Cooling Issue
                      </label>
                      <select
                        id="issue"
                        name="issue"
                        value={formData.issue}
                        onChange={(e) =>
                          setFormData({ ...formData, issue: e.target.value })
                        }
                        className="w-full min-h-11 px-3.5 py-2.5 bg-card border border-border-control focus:border-trust rounded-[var(--radius-input)] text-sm text-ink cursor-pointer"
                      >
                        <option>AC is blowing warm air</option>
                        <option>System won&apos;t turn on</option>
                        <option>Loud noise or electrical smell</option>
                        <option>Water leaking inside unit</option>
                        <option>Other urgent HVAC issue</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full min-h-12 bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold py-3.5 rounded-[var(--radius-btn)] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Request Immediate Callback
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted pt-1">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Demo template — no dispatch SMS is sent.</span>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-5">
                  <div className="w-12 h-12 bg-kpi-positive-bg text-kpi-positive rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-ink">
                      Callback Request Simulated
                    </h2>
                    <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                      In a live client deployment,{" "}
                      <span className="font-semibold text-ink">
                        {formData.fullName}
                      </span>{" "}
                      ({formData.phoneNumber}) would be routed to dispatch and logged as an Enhanced Conversion in Google Ads.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        phoneNumber: "",
                        issue: "AC is blowing warm air",
                      });
                    }}
                    className="min-h-11 px-3 text-xs text-trust hover:underline font-semibold cursor-pointer"
                  >
                    Reset demo form
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border-hairline py-5 text-center text-xs text-ink-muted">
        <div className="max-w-6xl mx-auto px-6">
          <p>
            Sample Conversion Landing Page built by LeadGrow Agency · Distraction-free layout engineered for Google Ads traffic.
          </p>
        </div>
      </footer>
    </div>
  );
}
