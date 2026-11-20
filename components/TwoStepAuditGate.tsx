"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Video,
} from "lucide-react";
import type { AuditBudgetId, AuditPriorityId } from "@/lib/auditFormLogic";
import {
  TWO_STEP_AD_SPEND_OPTIONS,
  TWO_STEP_AUDIT_PRIORITIES,
  validateTwoStepStep1,
  validateTwoStepStep2,
} from "@/lib/homepageBlueprintLogic";
import { readLeadDraft, writeLeadDraft } from "@/lib/uxQaLogic";
import CalendlyEmbed from "./CalendlyEmbed";

interface AuditConfirmation {
  referenceId: string;
  domain: string;
  priorityLabel: string;
  spendLabel: string;
  recommendedStudySlug: string;
  recommendedStudyTitle: string;
  recommendedStudyMetric: string;
}

export default function TwoStepAuditGate() {
  const [mode, setMode] = useState<"audit" | "call">("audit");
  const [step, setStep] = useState<1 | 2>(1);

  const [priority, setPriority] = useState<AuditPriorityId | "">(
    "scale-google-ads"
  );
  const [spend, setSpend] = useState<AuditBudgetId | "">("5k-15k");

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<AuditConfirmation | null>(
    null
  );

  // WCAG 2.2 SC 3.3.7 Redundant Entry: hydrate shared draft fields without double entry
  useEffect(() => {
    const syncDraft = () => {
      const draft = readLeadDraft();
      if (draft.websiteUrl) {
        setWebsiteUrl((prev) => (prev ? prev : draft.websiteUrl));
      }
      if (draft.email) {
        setEmail((prev) => (prev ? prev : draft.email));
      }
      if (draft.businessName) {
        setFirstName((prev) => (prev ? prev : draft.businessName));
      }
    };
    syncDraft();
    window.addEventListener("leadgrow:draft-updated", syncDraft);
    return () =>
      window.removeEventListener("leadgrow:draft-updated", syncDraft);
  }, []);

  // Support deep links to #book-audit (switch cleanly to live call) or #free-audit-form
  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === "#book-audit") {
        setMode("call");
      } else if (window.location.hash === "#free-audit-form") {
        setMode("audit");
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const handleContinueToStep2 = () => {
    const check = validateTwoStepStep1({ priority, spend });
    if (!check.valid) {
      setError(check.error || "Please complete both diagnostic selections.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const step1Check = validateTwoStepStep1({ priority, spend });
    if (!step1Check.valid) {
      setStep(1);
      setError(step1Check.error || "Please select an audit priority and spend.");
      return;
    }

    const step2Check = validateTwoStepStep2({ websiteUrl, email, firstName });
    if (!step2Check.valid) {
      setError(step2Check.error || "Please verify your details below.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditTrack: "breadcrumb-audit",
          priority,
          monthlyBudget: spend,
          timeline: "immediate",
          websiteUrl: step2Check.normalizedUrl || websiteUrl,
          email: email.trim(),
          businessName: firstName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error ||
            "Could not submit your audit request. Please double-check your domain and work email."
        );
        return;
      }

      const selectedPriority = TWO_STEP_AUDIT_PRIORITIES.find(
        (p) => p.id === priority
      );
      const selectedSpend = TWO_STEP_AD_SPEND_OPTIONS.find(
        (s) => s.id === spend
      );

      setConfirmation({
        referenceId: data.referenceId,
        domain: data.summary?.domain || step2Check.domain || websiteUrl,
        priorityLabel: selectedPriority?.label || "Revenue Audit",
        spendLabel: selectedSpend?.label || "$5K–$20K",
        recommendedStudySlug:
          data.routing?.recommendedCaseStudySlug || "ecommerce-store",
        recommendedStudyTitle:
          data.routing?.recommendedCaseStudyTitle ||
          "Zero-Waste Google Ads & Tracking Teardown",
        recommendedStudyMetric:
          data.routing?.recommendedCaseStudyMetric || "+247% sales growth",
      });
    } catch {
      setError(
        "Network error while sending your audit request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Anchor targets for both #free-audit-form and #book-audit */}
      <span id="free-audit-form" className="block -mt-20 pt-20" aria-hidden="true" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left 55% (7 cols): Two-Step Breadcrumb Micro-Audit Form (or optional Live Call switcher) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="eyebrow-mono text-kpi-positive">
                Section 08 · Free Senior Diagnostic
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                Get Your Free 12-Minute Video Account Audit
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setMode((prev) => (prev === "audit" ? "call" : "audit"));
                setError("");
              }}
              className="min-h-11 px-3.5 py-2 rounded-[var(--radius-btn)] border border-border-control bg-card text-xs font-semibold text-ink-secondary hover:text-ink hover:border-trust inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              {mode === "audit" ? (
                <>
                  <Calendar className="w-3.5 h-3.5 text-trust shrink-0" aria-hidden="true" />
                  Prefer a Live 30-Min Call?
                </>
              ) : (
                <>
                  <Video className="w-3.5 h-3.5 text-kpi-positive shrink-0" aria-hidden="true" />
                  Switch to Async Video Audit
                </>
              )}
            </button>
          </div>

          {mode === "call" ? (
            <CalendlyEmbed />
          ) : confirmation ? (
            <div
              data-testid="two-step-audit-confirmation"
              className="bento-card p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[var(--radius-tile)] bg-kpi-positive-bg border border-kpi-positive/30 text-kpi-positive flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <p className="tracking-id text-xs font-semibold text-kpi-positive">
                    Video Audit Queued · Ref {confirmation.referenceId}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-ink">
                    Your Senior Teardown for {confirmation.domain} Is Underway
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    A Principal Strategist has received your{" "}
                    <strong className="text-ink">{confirmation.priorityLabel}</strong>{" "}
                    diagnostic ({confirmation.spendLabel}/mo bracket). Your
                    custom 12-minute Loom video and prioritized fix list will
                    arrive in your inbox within 24 business hours.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="eyebrow-mono text-ink-muted block">
                    Matched Case Study While You Wait
                  </span>
                  <p className="text-sm font-display font-bold text-ink">
                    {confirmation.recommendedStudyTitle}
                  </p>
                  <span className="text-xs font-semibold text-kpi-positive metric-tabular">
                    {confirmation.recommendedStudyMetric}
                  </span>
                </div>
                <Link
                  href={`/case-studies/${confirmation.recommendedStudySlug}`}
                  className="min-h-11 px-4 py-2 rounded-[var(--radius-btn)] bg-trust text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-trust-hover whitespace-nowrap shrink-0 transition-colors"
                >
                  Read Teardown
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmation(null);
                  setStep(1);
                }}
                className="min-h-11 text-xs font-semibold text-ink-secondary hover:text-ink underline underline-offset-4 cursor-pointer"
              >
                Audit another domain
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bento-card p-6 sm:p-8 space-y-6"
            >
              {/* STEP 1: Zero PII & ZERO progress bar (per 2026 Blueprint Breadcrumb Technique) */}
              {step === 1 ? (
                <div className="space-y-6">
                  <fieldset className="space-y-3">
                    <legend className="text-base sm:text-lg font-display font-bold text-ink">
                      What should our senior team audit first?
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TWO_STEP_AUDIT_PRIORITIES.map((opt) => {
                        const selected = priority === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setPriority(opt.id);
                              setError("");
                            }}
                            className={`min-h-[68px] p-4 rounded-[var(--radius-tile)] border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1 ${
                              selected
                                ? "border-cta bg-cta/12 text-ink ring-1 ring-cta"
                                : "border-border-control bg-canvas text-ink-secondary hover:border-trust"
                            }`}
                          >
                            <span className="text-sm font-display font-bold text-ink block">
                              {opt.label}
                            </span>
                            <span className="text-xs text-ink-muted block">
                              {opt.helper}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-2.5">
                    <legend className="text-sm font-semibold text-ink">
                      Current monthly ad spend (to benchmark waste &amp; signal volume)
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TWO_STEP_AD_SPEND_OPTIONS.map((opt) => {
                        const selected = spend === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setSpend(opt.id);
                              setError("");
                            }}
                            className={`min-h-11 px-3 py-2.5 rounded-[var(--radius-btn)] border text-sm font-semibold metric-tabular transition-colors cursor-pointer ${
                              selected
                                ? "border-cta bg-cta text-cta-ink"
                                : "border-border-control bg-canvas text-ink-secondary hover:border-trust hover:text-ink"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {error ? (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="text-xs font-medium text-kpi-negative bg-kpi-negative-bg border border-kpi-negative/40 rounded-[var(--radius-btn)] px-3.5 py-2.5"
                    >
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleContinueToStep2}
                    className="w-full min-h-12 px-5 py-3 rounded-[var(--radius-btn)] bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>

                  <p className="text-xs text-ink-muted text-center">
                    No login credentials or ad-account access required at this step.
                  </p>
                </div>
              ) : (
                /* STEP 2: Progress bar introduced + strictly 3 explicitly labeled fields */
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-kpi-positive tracking-id">
                        Step 2 of 2 — Almost ready
                      </span>
                      <span className="text-ink-muted">
                        100% private · Zero SDR spam
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full rounded-full bg-canvas overflow-hidden border border-border-hairline"
                      role="progressbar"
                      aria-valuenow={2}
                      aria-valuemin={1}
                      aria-valuemax={2}
                      aria-label="Audit request progress: Step 2 of 2"
                    >
                      <div className="h-full w-full bg-kpi-positive transition-all duration-300" />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-[var(--radius-btn)] bg-canvas border border-border-hairline text-xs">
                    <span className="text-ink-secondary">
                      Focus:{" "}
                      <strong className="text-ink">
                        {
                          TWO_STEP_AUDIT_PRIORITIES.find(
                            (p) => p.id === priority
                          )?.label
                        }
                      </strong>{" "}
                      · Spend:{" "}
                      <strong className="text-ink metric-tabular">
                        {
                          TWO_STEP_AD_SPEND_OPTIONS.find((s) => s.id === spend)
                            ?.label
                        }
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError("");
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-trust hover:underline cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="two-step-url"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Website URL *
                      </label>
                      <input
                        id="two-step-url"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        required
                        value={websiteUrl}
                        aria-describedby={error ? "two-step-error" : undefined}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWebsiteUrl(val);
                          writeLeadDraft({ websiteUrl: val });
                          window.dispatchEvent(
                            new Event("leadgrow:draft-updated")
                          );
                        }}
                        placeholder="yourcompany.com"
                        className="w-full min-h-11 px-3.5 py-2.5 rounded-[var(--radius-input)] border border-border-control bg-canvas text-sm text-ink placeholder:text-ink-muted focus:border-trust"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="two-step-email"
                          className="block text-xs font-semibold text-ink mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="two-step-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          aria-describedby={
                            error ? "two-step-error" : undefined
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            setEmail(val);
                            writeLeadDraft({ email: val });
                            window.dispatchEvent(
                              new Event("leadgrow:draft-updated")
                            );
                          }}
                          placeholder="name@company.com"
                          className="w-full min-h-11 px-3.5 py-2.5 rounded-[var(--radius-input)] border border-border-control bg-canvas text-sm text-ink placeholder:text-ink-muted focus:border-trust"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="two-step-name"
                          className="block text-xs font-semibold text-ink mb-1.5"
                        >
                          First Name *
                        </label>
                        <input
                          id="two-step-name"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={firstName}
                          aria-describedby={
                            error ? "two-step-error" : undefined
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            setFirstName(val);
                            writeLeadDraft({ businessName: val });
                            window.dispatchEvent(
                              new Event("leadgrow:draft-updated")
                            );
                          }}
                          placeholder="Jordan"
                          className="w-full min-h-11 px-3.5 py-2.5 rounded-[var(--radius-input)] border border-border-control bg-canvas text-sm text-ink placeholder:text-ink-muted focus:border-trust"
                        />
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <div
                      id="two-step-error"
                      role="alert"
                      aria-live="polite"
                      className="text-xs font-medium text-kpi-negative bg-kpi-negative-bg border border-kpi-negative/40 rounded-[var(--radius-btn)] px-3.5 py-2.5"
                    >
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError("");
                      }}
                      className="sm:w-auto min-h-12 px-4 py-3 rounded-[var(--radius-btn)] border border-border-control bg-canvas text-ink-secondary hover:text-ink text-sm font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 min-h-12 px-5 py-3 rounded-[var(--radius-btn)] bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <span>
                        {isSubmitting
                          ? "Queuing Your Senior Audit..."
                          : "Send My Free Video Audit"}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Right 45% (5 cols): Explicit "What Happens in the Next 24 Hours" Expectation Card */}
        <aside className="lg:col-span-5 bento-card p-6 sm:p-7 space-y-6">
          <div className="space-y-1.5 border-b border-border-hairline pb-4">
            <p className="eyebrow-mono text-kpi-positive inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              Zero Sales Pressure · Explicit SLA
            </p>
            <h3 className="text-xl font-display font-bold text-ink">
              What Happens in the Next 24 Hours
            </h3>
          </div>

          <ol className="space-y-4">
            {[
              {
                window: "Hours 0–2",
                title: "Live Tag, Map Pack & Ad Auction Inspection",
                detail:
                  "A Principal Strategist inspects your live GA4/GTM container, Local Map Pack footprint, and landing page conversion leaks.",
              },
              {
                window: "Within 24 Hours",
                title: "Custom 12-Minute Senior Loom Video",
                detail:
                  "We send a screen-recorded teardown showing exact wasted spend, tracking gaps, and your top 3 revenue fixes—never handed off to an SDR.",
              },
              {
                window: "Your Call",
                title: "Keep the Action Plan Either Way",
                detail:
                  "Implement the checklist with your internal team or reply to book a 30-minute scope call. No follow-up spam sequences.",
              },
            ].map((item, idx) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-canvas border border-border-control text-xs font-mono font-bold text-kpi-positive flex items-center justify-center shrink-0 mt-0.5 metric-tabular">
                  {idx + 1}
                </span>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                    {item.window}
                  </span>
                  <h4 className="text-sm font-display font-bold text-ink">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Real Senior Strategist Headshot + Verified 4.9★ Credential */}
          <div className="pt-5 border-t border-border-hairline space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-control shrink-0">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Rafiul Islam, Founder & Principal Search Strategist"
                  fill
                  sizes="48px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-display font-bold text-ink truncate">
                  Audited personally by Rafiul Islam
                </p>
                <p className="text-xs text-ink-muted">
                  Founder &amp; Principal Strategist · Google Partner
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-[var(--radius-btn)] bg-canvas border border-border-hairline text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                <Star
                  className="w-3.5 h-3.5 fill-kpi-warning text-kpi-warning shrink-0"
                  aria-hidden="true"
                />
                <span className="metric-tabular">4.9★</span>
                <span className="text-ink-secondary font-normal">
                  across 111 Clutch, G2 &amp; Google reviews
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-kpi-positive font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                100% Owned
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
