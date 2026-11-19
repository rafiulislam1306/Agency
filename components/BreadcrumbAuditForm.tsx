"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  AUDIT_PRIORITIES,
  AUDIT_BUDGET_BRACKETS,
  AUDIT_TIMELINES,
  POST_SUBMIT_ATTRIBUTION_OPTIONS,
  normalizeAuditUrl,
  validateAuditEmail,
  determineAuditRouting,
  type AuditPriorityId,
  type AuditBudgetId,
  type AuditTimelineId,
  type AuditRoutingDecision,
} from "@/lib/auditFormLogic";

interface BreadcrumbAuditFormProps {
  compact?: boolean;
}

export default function BreadcrumbAuditForm({
  compact = false,
}: BreadcrumbAuditFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Strictly 5 fields across 3 steps (no phone number, no account creation)
  const [priority, setPriority] = useState<AuditPriorityId | "">("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [budget, setBudget] = useState<AuditBudgetId | "">("");
  const [timeline, setTimeline] = useState<AuditTimelineId | "">("");
  const [email, setEmail] = useState("");

  const [stepError, setStepError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    domain: string;
    routing: AuditRoutingDecision;
  } | null>(null);

  // Optional post-submission attribution ("How did you hear about us?")
  const [selectedAttribution, setSelectedAttribution] = useState<string | null>(
    null
  );
  const [attributionSaved, setAttributionSaved] = useState(false);

  const emailPreview = email.trim() ? validateAuditEmail(email) : null;

  const handleStep1Continue = () => {
    setStepError("");
    if (!priority) {
      setStepError("Select your #1 growth priority so we audit the right signals.");
      return;
    }
    const urlCheck = normalizeAuditUrl(websiteUrl);
    if (!urlCheck.valid) {
      setStepError(
        "Enter your website domain (for example, yourcompany.com — no https:// required)."
      );
      return;
    }
    setStep(2);
  };

  const handleStep2Continue = () => {
    setStepError("");
    if (!budget) {
      setStepError("Select your current monthly search or growth budget.");
      return;
    }
    if (!timeline) {
      setStepError("Select your target implementation timeline.");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError("");

    const emailCheck = validateAuditEmail(email);
    if (!emailCheck.valid) {
      setStepError(
        emailCheck.message || "Please enter a valid work email address."
      );
      return;
    }

    if (!priority || !budget || !timeline) {
      setStepError("Please complete the prior audit questions before submitting.");
      return;
    }

    const urlCheck = normalizeAuditUrl(websiteUrl);
    if (!urlCheck.valid) {
      setStepError("Please enter a valid website URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditTrack: "breadcrumb-audit",
          priority,
          websiteUrl: urlCheck.normalized,
          monthlyBudget: budget,
          timeline,
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStepError(data.error || "Unable to submit your audit request.");
        return;
      }

      setSubmissionResult({
        referenceId: data.referenceId,
        domain: data.summary?.domain || urlCheck.domain,
        routing:
          data.routing || determineAuditRouting(priority, budget, timeline),
      });
    } catch {
      setStepError("Network error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAttribution = async (source: string) => {
    setSelectedAttribution(source);
    if (!submissionResult) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditTrack: "attribution-note",
          referenceId: submissionResult.referenceId,
          attributionSource: source,
        }),
      });
      setAttributionSaved(true);
    } catch {
      // Non-blocking optional telemetry
      setAttributionSaved(true);
    }
  };

  const resetForm = () => {
    setStep(1);
    setPriority("");
    setWebsiteUrl("");
    setBudget("");
    setTimeline("");
    setEmail("");
    setStepError("");
    setSubmissionResult(null);
    setSelectedAttribution(null);
    setAttributionSaved(false);
  };

  // Post-Submission Confirmation Screen
  if (submissionResult) {
    return (
      <div
        id="free-audit-confirmation"
        className={`bg-white rounded-2xl border border-slate-200 ${
          compact ? "p-6" : "p-6 sm:p-8"
        } text-slate-900 space-y-6`}
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-emerald-700 tabular-nums">
              Audit Request Confirmed · Ref {submissionResult.referenceId}
            </p>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              We&apos;re Auditing {submissionResult.domain}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your personalized teardown and prioritized fix scorecard will be sent to{" "}
              <strong className="text-slate-900">{email}</strong>.
            </p>
          </div>
        </div>

        {/* Routing Decision Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
          <div>
            <span className="text-slate-500 font-medium block">
              Assigned Track
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {submissionResult.routing.trackLabel}
            </span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">
              Reviewer Role
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {submissionResult.routing.specialistRole}
            </span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">
              Delivery SLA
            </span>
            <span className="font-bold text-emerald-700 mt-0.5 block tabular-nums">
              {submissionResult.routing.deliverySla}
            </span>
          </div>
        </div>

        {/* Matched Un-Gated Case Study */}
        <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-brand-blue">
              Recommended Case Study While We Audit Your Account
            </p>
            <p className="text-sm font-bold text-slate-900">
              {submissionResult.routing.matchedCaseStudy.title}
            </p>
            <p className="text-xs font-semibold text-emerald-700 tabular-nums">
              {submissionResult.routing.matchedCaseStudy.metric}
            </p>
          </div>
          <Link
            href={`/case-studies/${submissionResult.routing.matchedCaseStudy.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue/90 transition-colors whitespace-nowrap shrink-0"
          >
            Read Case Study
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Post-Submission Optional Attribution (zero pre-conversion friction) */}
        <div className="border-t border-slate-200 pt-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-slate-700">
              Quick optional question: How did you hear about LeadGrow?
            </p>
            {attributionSaved ? (
              <span className="text-xs font-semibold text-emerald-700">
                Thanks for sharing
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {POST_SUBMIT_ATTRIBUTION_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSaveAttribution(option)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedAttribution === option
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
          <span>Zero forced sales calls · Keep the full audit either way</span>
          <button
            type="button"
            onClick={resetForm}
            className="font-semibold text-brand-blue hover:underline cursor-pointer whitespace-nowrap shrink-0"
          >
            Audit another URL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 ${
        compact ? "p-6" : "p-6 sm:p-8"
      } text-slate-900 space-y-5`}
    >
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-brand-blue">
            {step === 1
              ? "Free Website & Ads Teardown · 45 Seconds"
              : step === 2
                ? "Step 2 of 3 · Scope & Timing"
                : "Last step! Where should we send your audit?"}
          </span>
          {step >= 2 ? (
            <span className="text-xs font-semibold text-slate-500 tabular-nums whitespace-nowrap shrink-0">
              {step === 2 ? "66% complete" : "Almost done"}
            </span>
          ) : null}
        </div>

        <h3 className="text-xl font-display font-bold text-slate-900">
          {step === 1
            ? "Get Your Free Website & Pipeline Leak Audit"
            : step === 2
              ? "Match Your Audit to the Right Senior Specialist"
              : "Last step! Enter Your Work Email"}
        </h3>

        <p className="text-sm text-slate-600">
          {step === 1
            ? "Start anonymously — pick your top priority and enter your URL. No phone number or account required."
            : step === 2
              ? "Two quick range selections help us benchmark your CPA, tracking stack, and Map Pack gaps accurately."
              : "We deliver a custom Loom video walkthrough + written fix scorecard with zero pitch pressure."}
        </p>

        {/* Research #5 rule: NO progress bar on Step 1; introduce progress bar starting on Step 2 */}
        {step >= 2 ? (
          <div
            className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3"
            role="progressbar"
            aria-valuenow={step === 2 ? 66 : 92}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Audit form progress"
          >
            <div
              className="h-full bg-brand-green transition-all duration-300"
              style={{ width: step === 2 ? "66%" : "92%" }}
            />
          </div>
        ) : null}
      </div>

      {/* Step 1: Anonymous / Zero-Threat (Q1 Priority + Q2 Permissive Website URL) */}
      {step === 1 ? (
        <div className="space-y-5">
          <fieldset className="space-y-2.5">
            <legend className="text-xs font-semibold text-slate-800">
              1. What is your #1 priority over the next 90 days? *
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AUDIT_PRIORITIES.map((item) => {
                const selected = priority === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPriority(item.id);
                      setStepError("");
                    }}
                    aria-pressed={selected}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
                      selected
                        ? "border-brand-blue bg-brand-blue/[0.06] ring-1 ring-brand-blue"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <span className="text-sm font-semibold text-slate-900 block leading-snug">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 block leading-snug">
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-1.5">
            <label
              htmlFor="breadcrumb-website-url"
              className="block text-xs font-semibold text-slate-800"
            >
              2. Which website URL should we audit? *
            </label>
            <div className="relative">
              <Globe
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="breadcrumb-website-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={websiteUrl}
                onChange={(e) => {
                  setWebsiteUrl(e.target.value);
                  if (stepError) setStepError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleStep1Continue();
                  }
                }}
                placeholder="yourcompany.com (no https:// needed)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue text-sm text-slate-900"
              />
            </div>
          </div>

          {stepError ? (
            <div className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
              {stepError}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleStep1Continue}
            className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap shrink-0"
          >
            <span>Continue to Scope</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {/* Step 2: Moderate-Threat Fit Filter (Q3 Budget + Q4 Timeline) */}
      {step === 2 ? (
        <div className="space-y-5">
          <fieldset className="space-y-2.5">
            <legend className="text-xs font-semibold text-slate-800">
              3. What is your monthly Google Ads / search marketing budget? *
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AUDIT_BUDGET_BRACKETS.map((item) => {
                const selected = budget === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setBudget(item.id);
                      setStepError("");
                    }}
                    aria-pressed={selected}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer space-y-0.5 ${
                      selected
                        ? "border-brand-blue bg-brand-blue/[0.06] ring-1 ring-brand-blue"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <span className="text-sm font-semibold text-slate-900 block tabular-nums">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="text-xs font-semibold text-slate-800">
              4. Target timeline for implementing improvements? *
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {AUDIT_TIMELINES.map((item) => {
                const selected = timeline === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTimeline(item.id);
                      setStepError("");
                    }}
                    aria-pressed={selected}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer space-y-0.5 ${
                      selected
                        ? "border-brand-blue bg-brand-blue/[0.06] ring-1 ring-brand-blue"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 block leading-snug">
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {stepError ? (
            <div className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
              {stepError}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setStepError("");
              }}
              className="px-4 py-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              onClick={handleStep2Continue}
              className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap shrink-0"
            >
              <span>Almost Done</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Step 3: "Last step!" — Work Email Isolated (5th and final field) */}
      {step === 3 ? (
        <form onSubmit={handleFinalSubmit} className="space-y-5">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <span>
              Auditing:{" "}
              <strong className="text-slate-900">
                {normalizeAuditUrl(websiteUrl).domain || websiteUrl}
              </strong>
            </span>
            <span className="text-brand-blue font-semibold">
              {AUDIT_PRIORITIES.find((p) => p.id === priority)?.label}
            </span>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="breadcrumb-work-email"
              className="block text-xs font-semibold text-slate-800"
            >
              5. Work Email (where we&apos;ll deliver your audit video &amp; PDF) *
            </label>
            <input
              id="breadcrumb-work-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (stepError) setStepError("");
              }}
              placeholder="name@yourcompany.com"
              className="w-full px-3.5 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue text-sm text-slate-900"
            />
            {emailPreview?.valid && emailPreview.isPersonalWebmail ? (
              <p className="text-xs text-amber-700">
                Work email preferred so we can verify domain ownership, though personal email is accepted.
              </p>
            ) : null}
          </div>

          {stepError ? (
            <div className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
              {stepError}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStep(2);
                setStepError("");
              }}
              className="px-4 py-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-60 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSubmitting ? "Submitting Request..." : "Send My Free Audit"}
              </span>
            </button>
          </div>
        </form>
      ) : null}

      {/* Partner & Security Badges Flanking the Form (Proof Element #5) */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
          <ShieldCheck
            className="w-3.5 h-3.5 text-brand-green shrink-0"
            aria-hidden="true"
          />
          Google Partner · GA4 &amp; sGTM Certified
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          No phone required · Zero spam
        </span>
      </div>
    </div>
  );
}
