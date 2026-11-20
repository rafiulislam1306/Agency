"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import RangeStepper from "./RangeStepper";
import {
  calculateSignalLossAndRoi,
  MARKET_CONSENT_SCENARIOS,
  type MarketConsentScenarioId,
} from "@/lib/trackingLogic";

export default function SignalLossCalculator() {
  const [scenarioId, setScenarioId] =
    useState<MarketConsentScenarioId>("us-opt-out");
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(15000);
  const [desktopSharePercent, setDesktopSharePercent] = useState<number>(40);
  const [efficiencyGainPercent, setEfficiencyGainPercent] =
    useState<number>(15);

  const activeScenario =
    MARKET_CONSENT_SCENARIOS.find((s) => s.id === scenarioId) ||
    MARKET_CONSENT_SCENARIOS[0];

  const result = calculateSignalLossAndRoi({
    scenarioId,
    desktopSharePercent,
    safariSharePercent: 35,
    multiSessionSharePercent: 40,
    monthlyAdSpend,
    efficiencyGainPercent,
  });

  return (
    <div
      id="signal-loss-calculator"
      className="bento-card overflow-hidden scroll-mt-24"
    >
      {/* Header + Market / Consent Selector */}
      <div className="px-6 py-5 bg-canvas border-b border-border-hairline flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow-mono text-ink-muted">
            2026 Signal-Loss &amp; Phase 0 Payback Model · Browser Pixels vs. First-Party Infrastructure
          </p>
          <h3 className="type-h4 text-ink mt-0.5">
            Measure Your Conversion Blind Spot &amp; Repair Payback
          </h3>
        </div>

        <div
          role="group"
          aria-label="Market and consent scenarios"
          className="grid grid-cols-2 sm:flex sm:flex-nowrap items-center gap-1 p-1 bg-subtle border border-border-hairline rounded-[var(--radius-btn)] self-stretch sm:self-start xl:self-auto shrink-0"
        >
          {MARKET_CONSENT_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setScenarioId(scenario.id)}
              className={`min-h-11 px-3 py-2 text-xs font-semibold rounded-[var(--radius-input)] transition-colors whitespace-nowrap shrink-0 text-center cursor-pointer ${
                scenarioId === scenario.id
                  ? "bg-card text-ink shadow-[var(--shadow-whisper)] border border-border-hairline"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {scenario.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Controls & Signal Integrity Bar */}
        <div className="lg:col-span-6 space-y-6">
          <p className="caption-meta text-ink-secondary bg-subtle border border-border-hairline rounded-[var(--radius-btn)] px-3.5 py-2.5 leading-relaxed">
            <strong className="font-semibold text-ink">
              {activeScenario.label}:
            </strong>{" "}
            {activeScenario.explanation}
          </p>

          <div className="space-y-5">
            <div>
              <RangeStepper
                id="tracking-ad-spend"
                label="Monthly Paid Ad Spend"
                value={monthlyAdSpend}
                displayValue={`$${monthlyAdSpend.toLocaleString()}/mo`}
                min={2000}
                max={60000}
                step={1000}
                onChange={setMonthlyAdSpend}
              />
              <div className="flex justify-between text-xs text-ink-muted mt-1.5 metric-tabular">
                <span>$2k/mo (SMB)</span>
                <span>$15k/mo (Growth)</span>
                <span>$60k/mo (Scale)</span>
              </div>
            </div>

            <RangeStepper
              id="tracking-desktop-share"
              label="Desktop Traffic Share (37% vs. 15% mobile block)"
              value={desktopSharePercent}
              displayValue={`${desktopSharePercent}% desktop`}
              min={20}
              max={80}
              step={5}
              onChange={setDesktopSharePercent}
            />

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-ink-secondary">
                Conservative Ad-Efficiency Recovery After Repair
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((gain) => (
                  <button
                    key={gain}
                    type="button"
                    onClick={() => setEfficiencyGainPercent(gain)}
                    className={`min-h-11 px-2.5 py-2 text-xs font-semibold rounded-[var(--radius-btn)] border transition-colors whitespace-nowrap metric-tabular cursor-pointer ${
                      efficiencyGainPercent === gain
                        ? "bg-trust text-white border-trust"
                        : "bg-card text-ink-secondary border-border-control hover:border-trust hover:text-trust"
                    }`}
                  >
                    ▲ +{gain}% Lift
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Signal Integrity Waterfall Bar */}
          <div className="bento-card__visual-well p-4 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-bold text-ink">
                Browser Pixel Signal Integrity (35% Safari · 40% Multi-Session)
              </span>
              <span className="text-xs font-bold text-kpi-negative metric-tabular whitespace-nowrap">
                ▼ -{result.totalEffectiveLossPercent}% Lost
              </span>
            </div>

            <div
              className="h-3.5 w-full rounded-full overflow-hidden flex bg-border-hairline"
              aria-hidden="true"
            >
              <div
                className="bg-kpi-positive h-full"
                style={{ width: `${result.survivingSignalPercent}%` }}
              />
              <div
                className="bg-kpi-warning h-full"
                style={{ width: `${result.blendedAdBlockerLossPercent}%` }}
              />
              <div
                className="bg-cta h-full"
                style={{ width: `${result.safariMultiSessionLossPercent}%` }}
              />
              <div
                className="bg-kpi-negative h-full"
                style={{ width: `${result.consentDropLossPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs metric-tabular">
              <div>
                <span className="font-bold text-kpi-positive block">
                  ▲ {result.survivingSignalPercent}%
                </span>
                <span className="text-ink-muted">Surviving Signal</span>
              </div>
              <div>
                <span className="font-bold text-kpi-warning block">
                  ▼ -{result.blendedAdBlockerLossPercent}%
                </span>
                <span className="text-ink-muted">Ad Blockers</span>
              </div>
              <div>
                <span className="font-bold text-cta block">
                  ▼ -{result.safariMultiSessionLossPercent}%
                </span>
                <span className="text-ink-muted">Safari 7-Day Cap</span>
              </div>
              <div>
                <span className="font-bold text-kpi-negative block">
                  ▼ -{result.consentDropLossPercent}%
                </span>
                <span className="text-ink-muted">Consent Gate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Right-Sized Tier & Payback Financial Output */}
        <div className="lg:col-span-6 space-y-5">
          {/* 3 Aligned KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 metric-tabular">
            <div className="p-4 rounded-[var(--radius-tile)] bg-kpi-negative-bg border border-kpi-negative/25">
              <span className="text-xs font-semibold text-kpi-negative block">
                ▼ Browser Signal Loss
              </span>
              <span className="type-kpi-card text-kpi-negative mt-1 block whitespace-nowrap">
                -{result.totalEffectiveLossPercent}%
              </span>
              <span className="text-xs text-kpi-negative mt-0.5 block">
                {result.survivingSignalPercent}% visible to Ads AI
              </span>
            </div>

            <div className="p-4 rounded-[var(--radius-tile)] bg-kpi-positive-bg border border-kpi-positive/25">
              <span className="text-xs font-semibold text-kpi-positive block">
                ▲ Full Payback Time
              </span>
              <span className="type-kpi-card text-kpi-positive mt-1 block whitespace-nowrap">
                {result.paybackMonths} mo
              </span>
              <span className="text-xs text-kpi-positive mt-0.5 block">
                +${result.monthlyAdSavings.toLocaleString()}/mo saved spend
              </span>
            </div>

            <div className="p-4 rounded-[var(--radius-tile)] bg-subtle border border-border-hairline">
              <span className="text-xs font-medium text-ink-muted block">
                12-Month Net ROI
              </span>
              <span className="type-kpi-card text-trust mt-1 block whitespace-nowrap">
                +{result.net12MonthRoiPercent}%
              </span>
              <span className="text-xs text-ink-muted mt-0.5 block">
                ${result.annualAdSavings.toLocaleString()}/yr vs. $
                {result.recommendedTier.annualTco.toLocaleString()} TCO
              </span>
            </div>
          </div>

          {/* Auto-Matched Right-Sized Stack Card (Calibrated Midnight-Navy Dark Band) */}
          <div className="surface-dark p-6 rounded-[var(--radius-bento)] border border-border-hairline shadow-[var(--shadow-dark-edge)] space-y-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="eyebrow-mono text-kpi-positive">
                Right-Sized Stack · {result.recommendedTier.spendBand}
              </span>
              <span className="tracking-id text-xs font-semibold text-ink-secondary">
                ${result.recommendedTier.setupFee.toLocaleString()} setup · $
                {result.recommendedTier.annualTco.toLocaleString()} 12m TCO
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="type-h4 text-ink">
                {result.recommendedTier.name}
              </h4>
              <p className="text-sm text-trust font-medium">
                {result.recommendedTier.recommendedStack}
              </p>
              <p className="caption-meta text-ink-secondary leading-relaxed pt-1">
                {result.recommendedTier.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-ink-muted metric-tabular">
                Ongoing infra &amp; QA: ${result.monthlyOngoingCost}/mo · No bloated server overhead
              </span>
              <CTAButton href="/contact" variant="dark-primary" size="sm">
                Book Phase 0 Tracking Audit
              </CTAButton>
            </div>
          </div>

          <p className="caption-meta text-ink-muted leading-relaxed">
            Payback formula: Setup Fee / (Monthly Ad Savings − Monthly Ongoing Infra &amp; Maint). We reconcile your last 30–90 days of real Shopify, Stripe, or CRM receipts against Google Ads before recommending any tier.
          </p>
        </div>
      </div>
    </div>
  );
}
