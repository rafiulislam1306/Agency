"use client";

import React, { useEffect, useState } from "react";
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
import { readLeadDraft, writeLeadDraft } from "@/lib/uxQaLogic";

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

  // WCAG 2.2 SC 3.3.7 Redundant Entry: hydrate previously entered URL/email post-mount (zero SSR mismatch)
  useEffect(() => {
    const syncDraft = () => {
      const draft = readLeadDraft();
      if (draft.websiteUrl) {
        setWebsiteUrl((prev) => (prev ? prev : draft.websiteUrl));
      }
      if (draft.email) {
        setEmail((prev) => (prev ? prev : draft.email));
      }
    };
    syncDraft();
    window.addEventListener("leadgrow:draft-updated", syncDraft);
    return () => window.removeEventListener("leadgrow:draft-updated", syncDraft);
  }, []);

  const emailPreview = email.trim() ? validateAuditEmail(email) : null;

  const handleStep1Continue = () => {
    setStepError("");
    if (!priority) {
      setStepError(
        "Select your #1 growth priority so we audit the right signals."
      );
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
      setStepError(
        "Please complete the prior audit questions before submitting."
      );
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
        className={`bento-card ${
          compact ? "p-6" : "p-6 sm:p-8"
        } text-ink space-y-6`}
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-[var(--radius-tile)] bg-kpi-positive-bg text-kpi-positive flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="tracking-id text-xs font-semibold text-kpi-positive">
              Audit Request Confirmed · Ref {submissionResult.referenceId}
            </p>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ink">
              We&apos;re Auditing {submissionResult.domain}
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Your personalized teardown and prioritized fix scorecard will be sent to{" "}
              <strong className="text-ink">{email}</strong>.
            </p>
          </div>
        </div>

        {/* Routing Decision Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-canvas border border-border-hairline rounded-[var(--radius-tile)] p-4 text-xs">
          <div>
            <span className="text-ink-muted font-medium block">
              Assigned Track
            </span>
            <span className="font-bold text-ink mt-0.5 block">
              {submissionResult.routing.trackLabel}
            </span>
          </div>
          <div>
            <span className="text-ink-muted font-medium block">
              Reviewer Role
            </span>
            <span className="font-bold text-ink mt-0.5 block">
              {submissionResult.routing.specialistRole}
            </span>
          </div>
          <div>
            <span className="text-ink-muted font-medium block">
              Delivery SLA
            </span>
            <span className="font-bold text-kpi-positive mt-0.5 block metric-tabular">
              {submissionResult.routing.deliverySla}
            </span>
          </div>
        </div>

        {/* Matched Un-Gated Case Study */}
        <div className="rounded-[var(--radius-tile)] border border-trust/25 bg-trust-tint p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-trust">
              Recommended Case Study While We Audit Your Account
            </p>
            <p className="text-sm font-bold text-ink">
              {submissionResult.routing.matchedCaseStudy.title}
            </p>
            <p className="text-xs font-semibold text-kpi-positive metric-tabular">
              ▲ {submissionResult.routing.matchedCaseStudy.metric}
            </p>
          </div>
          <Link
            href={`/case-studies/${submissionResult.routing.matchedCaseStudy.slug}`}
            className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 py-2.5 rounded-[var(--radius-btn)] bg-trust text-white text-xs font-semibold hover:bg-trust-hover transition-colors whitespace-nowrap shrink-0"
          >
            Read Case Study
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Post-Submission Optional Attribution */}
        <div className="border-t border-border-hairline pt-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-ink-secondary">
              Quick optional question: How did you hear about LeadGrow?
            </p>
            {attributionSaved ? (
              <span className="text-xs font-semibold text-kpi-positive">
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
                className={`min-h-11 px-3.5 py-2 rounded-[var(--radius-btn)] border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedAttribution === option
                    ? "border-trust bg-trust text-white"
                    : "border-border-control bg-card text-ink-secondary hover:border-trust hover:text-trust"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
          <span>Zero forced sales calls · Keep the full audit either way</span>
          <button
            type="button"
            onClick={resetForm}
            className="min-h-11 px-2 font-semibold text-trust hover:underline cursor-pointer whitespace-nowrap shrink-0"
          >
            Audit another URL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bento-card ${
        compact ? "p-6" : "p-6 sm:p-8"
      } text-ink space-y-5`}
    >
      {/* Header */}
      <div className="space-y-1.5 border-b border-border-hairline pb-4">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow-mono text-trust">
            {step === 1
              ? "Free Website & Ads Teardown · 45 Seconds"
              : step === 2
                ? "Step 2 of 3 · Scope & Timing"
                : "Last step! Where should we send your audit?"}
          </span>
          {step >= 2 ? (
            <span className="tracking-id text-xs font-semibold text-ink-muted whitespace-nowrap shrink-0">
              {step === 2 ? "66%" : "92%"}
            </span>
          ) : null}
        </div>

        <h3 className="text-xl font-display font-bold text-ink">
          {step === 1
            ? "Get Your Free Website & Pipeline Leak Audit"
            : step === 2
              ? "Match Your Audit to the Right Senior Specialist"
              : "Last step! Enter Your Work Email"}
        </h3>

        <p className="text-sm text-ink-secondary">
          {step === 1
            ? "Start anonymously — pick your top priority and enter your URL. No phone number or account required."
            : step === 2
              ? "Two quick range selections help us benchmark your CPA, tracking stack, and Map Pack gaps accurately."
              : "We deliver a custom Loom video walkthrough + written fix scorecard with zero pitch pressure."}
        </p>

        {/* Research #5 rule: NO progress bar on Step 1; introduce progress bar starting on Step 2 */}
        {step >= 2 ? (
          <div
            className="w-full h-1.5 bg-subtle rounded-full overflow-hidden mt-3"
            role="progressbar"
            aria-valuenow={step === 2 ? 66 : 92}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Audit form progress"
          >
            <div
              className="h-full bg-kpi-positive transition-[width] duration-300"
              style={{ width: step === 2 ? "66%" : "92%" }}
            />
          </div>
        ) : null}
      </div>

      {/* Step 1: Anonymous / Zero-Threat (Q1 Priority + Q2 Permissive Website URL) */}
      {step === 1 ? (
        <div className="space-y-5">
          <fieldset className="space-y-2.5">
            <legend className="text-xs font-semibold text-ink">
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
                    className={`min-h-14 p-3.5 rounded-[var(--radius-tile)] border text-left transition-colors cursor-pointer space-y-1 ${
                      selected
                        ? "border-trust bg-trust-tint ring-1 ring-trust"
                        : "border-border-control bg-card hover:border-trust hover:bg-canvas"
                    }`}
                  >
                    <span className="text-sm font-semibold text-ink block leading-snug">
                      {item.label}
                    </span>
                    <span className="text-xs text-ink-muted block leading-snug">
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
              className="block text-xs font-semibold text-ink"
            >
              2. Which website URL should we audit? *
            </label>
            <div className="relative">
              <Globe
                className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="breadcrumb-website-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={websiteUrl}
                aria-invalid={stepError ? true : undefined}
                aria-describedby={stepError ? "breadcrumb-step1-error" : undefined}
                onChange={(e) => {
                  const nextUrl = e.target.value;
                  setWebsiteUrl(nextUrl);
                  writeLeadDraft({ websiteUrl: nextUrl });
                  window.dispatchEvent(new Event("leadgrow:draft-updated"));
                  if (stepError) setStepError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleStep1Continue();
                  }
                }}
                placeholder="yourcompany.com (no https:// needed)"
                className="w-full min-h-11 pl-10 pr-3.5 py-2.5 rounded-[var(--radius-input)] border border-border-control bg-card focus:border-trust text-sm text-ink placeholder:text-ink-muted"
              />
            </div>
          </div>

          {stepError ? (
            <div
              id="breadcrumb-step1-error"
              role="alert"
              aria-live="polite"
              className="text-xs font-medium text-kpi-negative bg-kpi-negative-bg border border-kpi-negative/40 rounded-[var(--radius-btn)] px-3.5 py-2.5"
            >
              {stepError}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleStep1Continue}
            className="w-full min-h-12 bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold py-3 px-5 rounded-[var(--radius-btn)] transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap shrink-0"
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
            <legend className="text-xs font-semibold text-ink">
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
                    className={`min-h-14 p-3 rounded-[var(--radius-tile)] border text-left transition-colors cursor-pointer space-y-0.5 ${
                      selected
                        ? "border-trust bg-trust-tint ring-1 ring-trust"
                        : "border-border-control bg-card hover:border-trust hover:bg-canvas"
                    }`}
                  >
                    <span className="text-sm font-semibold text-ink block metric-tabular">
                      {item.label}
                    </span>
                    <span className="text-xs text-ink-muted block">
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="text-xs font-semibold text-ink">
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
                    className={`min-h-14 p-3 rounded-[var(--radius-tile)] border text-left transition-colors cursor-pointer space-y-0.5 ${
                      selected
                        ? "border-trust bg-trust-tint ring-1 ring-trust"
                        : "border-border-control bg-card hover:border-trust hover:bg-canvas"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-ink block">
                      {item.label}
                    </span>
                    <span className="text-xs text-ink-muted block leading-snug">
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {stepError ? (
            <div
              role="alert"
              className="text-xs font-medium text-kpi-negative bg-kpi-negative-bg border border-kpi-negative/40 rounded-[var(--radius-btn)] px-3.5 py-2.5"
            >
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
              className="min-h-12 px-4 py-3 rounded-[var(--radius-btn)] border border-border-control text-ink hover:bg-canvas text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              onClick={handleStep2Continue}
              className="flex-1 min-h-12 bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold py-3 px-5 rounded-[var(--radius-btn)] transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap shrink-0"
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
          <div className="rounded-[var(--radius-tile)] bg-canvas border border-border-hairline p-3.5 text-xs text-ink-secondary flex flex-wrap items-center justify-between gap-2">
            <span>
              Auditing:{" "}
              <strong className="text-ink">
                {normalizeAuditUrl(websiteUrl).domain || websiteUrl}
              </strong>
            </span>
            <span className="text-trust font-semibold">
              {AUDIT_PRIORITIES.find((p) => p.id === priority)?.label}
            </span>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="breadcrumb-work-email"
              className="block text-xs font-semibold text-ink"
            >
              5. Work Email (where we&apos;ll deliver your audit video &amp; PDF) *
            </label>
            <input
              id="breadcrumb-work-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              aria-invalid={stepError ? true : undefined}
              aria-describedby={stepError ? "breadcrumb-step3-error" : undefined}
              onChange={(e) => {
                const nextEmail = e.target.value;
                setEmail(nextEmail);
                writeLeadDraft({ email: nextEmail });
                window.dispatchEvent(new Event("leadgrow:draft-updated"));
                if (stepError) setStepError("");
              }}
              placeholder="name@yourcompany.com"
              className="w-full min-h-11 px-3.5 py-2.5 rounded-[var(--radius-input)] border border-border-control bg-card focus:border-trust text-sm text-ink placeholder:text-ink-muted"
            />
            {emailPreview?.valid && emailPreview.isPersonalWebmail ? (
              <p className="text-xs text-kpi-warning">
                Work email preferred so we can verify domain ownership, though personal email is accepted.
              </p>
            ) : null}
          </div>

          {stepError ? (
            <div
              id="breadcrumb-step3-error"
              role="alert"
              aria-live="polite"
              className="text-xs font-medium text-kpi-negative bg-kpi-negative-bg border border-kpi-negative/40 rounded-[var(--radius-btn)] px-3.5 py-2.5"
            >
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
              className="min-h-12 px-4 py-3 rounded-[var(--radius-btn)] border border-border-control text-ink hover:bg-canvas text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 min-h-12 bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold py-3 px-5 rounded-[var(--radius-btn)] transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-60 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSubmitting ? "Submitting Request..." : "Send My Free Audit"}
              </span>
            </button>
          </div>
        </form>
      ) : null}

      {/* Partner & Security Badges Flanking the Form */}
      <div className="pt-4 border-t border-border-hairline flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5 font-medium text-ink-secondary">
          <ShieldCheck
            className="w-3.5 h-3.5 text-kpi-positive shrink-0"
            aria-hidden="true"
          />
          Google Partner · GA4 &amp; sGTM Certified
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-ink-muted shrink-0" aria-hidden="true" />
          No phone required · Zero spam
        </span>
      </div>
    </div>
  );
}
