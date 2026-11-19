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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Subtle Demo Notice Bar + CRO Anatomy Toggle */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span>
            Sample High-Converting Google Ads Landing Page (1:1 Attention Ratio CRO)
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowCroNotes((prev) => !prev)}
              aria-expanded={showCroNotes}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              {showCroNotes ? "Hide CRO Anatomy" : "Inspect 4 CRO Heuristics"}
            </button>
            <Link
              href="/services#cro-heuristics"
              className="inline-flex items-center gap-1 text-brand-green hover:text-white font-semibold whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Back to Services
            </Link>
          </div>
        </div>
        {showCroNotes ? (
          <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-300">
            <div>
              <strong className="text-white block">1. 1:1 Attention Ratio</strong>
              Global nav links &amp; footer exits removed (13.5% vs 10.5% CVR).
            </div>
            <div>
              <strong className="text-white block">2. Strict H1 Message Match</strong>
              Headline mirrors emergency search query (+15–25% CVR lift).
            </div>
            <div>
              <strong className="text-white block">3. Above-the-Fold Authority</strong>
              4.9/5 rating, BBB A+, and 60-min SLA shown before form ask.
            </div>
            <div>
              <strong className="text-white block">4. Enhanced Conversion Routing</strong>
              Dispatch form maps directly to Google Ads offline conversion value.
            </div>
          </div>
        ) : null}
      </div>

      {/* Distraction-free Header */}
      <header className="bg-white py-4 border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-blue p-2 rounded-lg text-white">
              <Snowflake className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
              Gulf Coast <span className="text-brand-blue">HVAC</span>
            </span>
          </div>

          <a
            href="tel:+17135550199"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover rounded-lg font-semibold text-white text-sm transition-colors whitespace-nowrap"
            aria-label="Call 24/7 Dispatch"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">24/7 Dispatch:</span>
            <span className="tabular-nums">(713) 555-0199</span>
          </a>
        </div>
      </header>

      {/* Main Conversion Split */}
      <main className="flex-grow flex items-center py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold text-brand-orange">
              Same-Day Emergency Dispatch · Greater Houston Area
            </p>

            <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
              Emergency AC Repair in{" "}
              <span className="text-brand-blue">Greater Houston</span>—Dispatched in 60 Minutes
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
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
                  className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-slate-900 text-sm">
                      {item.label}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs font-semibold text-slate-500">
              <span>4.9 / 5 Verified Google Rating (280+ Reviews)</span>
              <span aria-hidden="true"> · </span>
              <span>BBB A+ Accredited</span>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-display font-bold text-slate-900">
                      Request Priority Dispatch
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Or call{" "}
                      <a
                        href="tel:+17135550199"
                        className="font-semibold text-brand-blue hover:underline tabular-nums"
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
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-lg text-sm text-slate-900 focus:outline-none"
                        placeholder="Jordan Taylor"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-lg text-sm text-slate-900 focus:outline-none"
                        placeholder="(713) 555-0142"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="issue"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-lg text-sm text-slate-900 focus:outline-none cursor-pointer"
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
                      className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3.5 rounded-lg transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Request Immediate Callback
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Demo template — no dispatch SMS is sent.</span>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-5">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      Callback Request Simulated
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      In a live client deployment,{" "}
                      <span className="font-semibold text-slate-900">
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
                    className="text-xs text-brand-blue hover:underline font-semibold cursor-pointer"
                  >
                    Reset demo form
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>
            Sample Conversion Landing Page built by LeadGrow Agency · Distraction-free layout engineered for Google Ads traffic.
          </p>
        </div>
      </footer>
    </div>
  );
}
