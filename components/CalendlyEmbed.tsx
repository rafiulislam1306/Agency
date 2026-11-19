"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock } from "lucide-react";

interface CalendlyEmbedProps {
  url?: string;
}

const AUDIT_SLOTS = [
  "Tomorrow · 10:00 AM CT",
  "Tomorrow · 2:00 PM CT",
  "Thu · 11:30 AM CT",
  "Thu · 3:30 PM CT",
  "Fri · 10:00 AM CT",
  "Fri · 1:30 PM CT",
];

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const configuredUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || "";
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSlot, setSelectedSlot] = useState(AUDIT_SLOTS[0]);
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [primaryPain, setPrimaryPain] = useState("wasted-spend");
  const [crmSetup, setCrmSetup] = useState("none-yet");
  const [monthlyAdSpend, setMonthlyAdSpend] = useState("1500-5000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  if (configuredUrl && !configuredUrl.includes("your-link") && !configuredUrl.includes("acme-demos")) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-white min-h-[650px]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
            <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-brand-blue" />
            <p className="mt-4 text-sm text-slate-600 font-medium">
              Loading audit calendar...
            </p>
          </div>
        )}
        <iframe
          src={`${configuredUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=1e3a8a`}
          width="100%"
          height="680px"
          style={{ width: "100%", height: "680px", border: "0" }}
          onLoad={() => setIsLoading(false)}
          title="Schedule your free 30-minute leak audit & marketing plan"
        />
      </div>
    );
  }

  const handleBookAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          email,
          websiteUrl,
          primaryPain,
          crmSetup,
          monthlyBudget: monthlyAdSpend,
          preferredSlot: selectedSlot,
          message: `Booked 30-min Leak Audit & Custom 90-Day Marketing Plan for ${selectedSlot} (CRM: ${crmSetup}, Budget: ${monthlyAdSpend})`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not reserve slot. Please check your details.");
        return;
      }
      setConfirmationId(data.referenceId);
    } catch {
      setError("Network error while reserving your audit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmationId) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-slate-900 space-y-5">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-emerald-700 tabular-nums">
            Audit &amp; Marketing Plan Confirmed · Ref {confirmationId}
          </p>
          <h3 className="text-2xl font-display font-bold text-slate-900">
            Your Free 90-Day Plan &amp; Audit Is Reserved
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We reserved <strong>{selectedSlot}</strong> for{" "}
            <strong>{businessName}</strong> and sent calendar details to{" "}
            <strong>{email}</strong>. Ahead of the call, we will prepare your account leak audit, a message-match review of your landing pages, and a CRM pipeline forecast—yours to keep either way.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setConfirmationId(null);
            setBusinessName("");
            setWebsiteUrl("");
            setEmail("");
          }}
          className="text-sm font-semibold text-brand-blue hover:underline cursor-pointer"
        >
          Schedule for another business
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleBookAudit}
      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 space-y-5"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900">
            Get Your Free Leak Audit &amp; 90-Day Search Plan
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Includes a live ad leak teardown, landing page message-match score, and CRM pipeline forecast.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 whitespace-nowrap shrink-0">
          <Clock className="w-4 h-4 text-brand-blue" aria-hidden="true" />
          30 min
        </span>
      </div>

      {/* Time slots */}
      <div className="space-y-2.5">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Calendar className="w-4 h-4 text-brand-blue" aria-hidden="true" />
          1. Pick a Time Slot
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {AUDIT_SLOTS.map((slot) => (
            <button
              type="button"
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-3.5 py-2.5 rounded-lg border text-left text-sm font-medium transition-colors cursor-pointer tabular-nums ${
                selectedSlot === slot
                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue font-semibold"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostic inputs (5-7 calibrated fields matching our B2B CRO guidelines) */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="audit-business"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Business Name *
            </label>
            <input
              id="audit-business"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Lone Star Cooling"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label
              htmlFor="audit-email"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Work Email *
            </label>
            <input
              id="audit-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@company.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="audit-url"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Website or Landing Page URL
            </label>
            <input
              id="audit-url"
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourbusiness.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label
              htmlFor="audit-pain"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Primary Bottleneck
            </label>
            <select
              id="audit-pain"
              value={primaryPain}
              onChange={(e) => setPrimaryPain(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue cursor-pointer"
            >
              <option value="wasted-spend">Wasted clicks / broad-match bleed</option>
              <option value="broken-tracking">Broken tracking / duplicate conversions / signal loss</option>
              <option value="unqualified-leads">Cheap leads that don&apos;t convert to SQLs</option>
              <option value="map-invisibility">Invisible in Google Maps 3-Pack</option>
              <option value="incomplete-attribution">No CRM / offline revenue attribution</option>
              <option value="asset-ownership">Need clean setup we own 100%</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="audit-budget"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Monthly Google Ad Spend
            </label>
            <select
              id="audit-budget"
              value={monthlyAdSpend}
              onChange={(e) => setMonthlyAdSpend(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue cursor-pointer"
            >
              <option value="under-1500">Under $1,500 / mo (or Local SEO only)</option>
              <option value="1500-5000">$1,500 – $5,000 / mo</option>
              <option value="5000-15000">$5,000 – $15,000 / mo</option>
              <option value="15000-plus">$15,000+ / mo</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="audit-crm"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Current CRM / Lead Tracking
            </label>
            <select
              id="audit-crm"
              value={crmSetup}
              onChange={(e) => setCrmSetup(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue cursor-pointer"
            >
              <option value="hubspot">HubSpot</option>
              <option value="salesforce">Salesforce</option>
              <option value="servicetitan-jobber">ServiceTitan / Jobber / Housecall Pro</option>
              <option value="call-tracking">Call Tracking / Spreadsheets</option>
              <option value="none-yet">No closed-loop tracking yet</option>
            </select>
          </div>
        </div>
      </div>

      {error ? (
        <div className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3 rounded-lg transition-colors duration-150 cursor-pointer text-sm disabled:opacity-60"
      >
        {isSubmitting ? "Preparing Your Audit Slot..." : "Claim Free Leak Audit & 90-Day Plan"}
      </button>

      <p className="text-xs text-slate-500 text-center">
        Zero obligation · We never touch billing · Keep your custom search &amp; landing-page teardown either way.
      </p>
    </form>
  );
}
