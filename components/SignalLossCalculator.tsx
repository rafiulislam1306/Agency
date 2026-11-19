"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
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
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden scroll-mt-24"
    >
      {/* Header + Market / Consent Selector */}
      <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            2026 Signal-Loss &amp; Phase 0 Payback Model · Browser Pixels vs. First-Party Infrastructure
          </p>
          <h3 className="text-xl font-display font-bold text-slate-900 mt-0.5">
            Measure Your Conversion Blind Spot &amp; Repair Payback
          </h3>
        </div>

        <div
          role="group"
          aria-label="Market and consent scenarios"
          className="grid grid-cols-2 sm:flex sm:flex-nowrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-stretch sm:self-start xl:self-auto shrink-0"
        >
          {MARKET_CONSENT_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setScenarioId(scenario.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 text-center cursor-pointer ${
                scenarioId === scenario.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
          <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
            <strong className="font-semibold text-slate-800">
              {activeScenario.label}:
            </strong>{" "}
            {activeScenario.explanation}
          </p>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="tracking-ad-spend">Monthly Paid Ad Spend</label>
                <span className="tabular-nums text-brand-blue">
                  ${monthlyAdSpend.toLocaleString()}/mo
                </span>
              </div>
              <input
                id="tracking-ad-spend"
                type="range"
                min={2000}
                max={60000}
                step={1000}
                value={monthlyAdSpend}
                onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 tabular-nums">
                <span>$2k/mo (SMB)</span>
                <span>$15k/mo (Growth)</span>
                <span>$60k/mo (Scale)</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-2 text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="tracking-desktop-share">
                  Desktop Traffic Share (37% vs. 15% mobile block)
                </label>
                <span className="tabular-nums text-brand-blue whitespace-nowrap shrink-0">
                  {desktopSharePercent}% desktop
                </span>
              </div>
              <input
                id="tracking-desktop-share"
                type="range"
                min={20}
                max={80}
                step={5}
                value={desktopSharePercent}
                onChange={(e) => setDesktopSharePercent(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">
                Conservative Ad-Efficiency Recovery After Repair
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((gain) => (
                  <button
                    key={gain}
                    type="button"
                    onClick={() => setEfficiencyGainPercent(gain)}
                    className={`px-2.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap tabular-nums cursor-pointer ${
                      efficiencyGainPercent === gain
                        ? "bg-brand-blue text-white border-brand-blue"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    +{gain}% Lift
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Signal Integrity Waterfall Bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-bold text-slate-900">
                Browser Pixel Signal Integrity (35% Safari · 40% Multi-Session)
              </span>
              <span className="text-xs font-bold text-rose-700 tabular-nums whitespace-nowrap">
                {result.totalEffectiveLossPercent}% Lost
              </span>
            </div>

            <div
              className="h-3.5 w-full rounded-full overflow-hidden flex bg-slate-200"
              aria-hidden="true"
            >
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${result.survivingSignalPercent}%` }}
              />
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${result.blendedAdBlockerLossPercent}%` }}
              />
              <div
                className="bg-orange-500 h-full"
                style={{ width: `${result.safariMultiSessionLossPercent}%` }}
              />
              <div
                className="bg-rose-600 h-full"
                style={{ width: `${result.consentDropLossPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs tabular-nums">
              <div>
                <span className="font-bold text-emerald-700 block">
                  {result.survivingSignalPercent}%
                </span>
                <span className="text-slate-600">Surviving Signal</span>
              </div>
              <div>
                <span className="font-bold text-amber-700 block">
                  -{result.blendedAdBlockerLossPercent}%
                </span>
                <span className="text-slate-600">Ad Blockers</span>
              </div>
              <div>
                <span className="font-bold text-orange-700 block">
                  -{result.safariMultiSessionLossPercent}%
                </span>
                <span className="text-slate-600">Safari 7-Day Cap</span>
              </div>
              <div>
                <span className="font-bold text-rose-700 block">
                  -{result.consentDropLossPercent}%
                </span>
                <span className="text-slate-600">Consent Gate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Right-Sized Tier & Payback Financial Output */}
        <div className="lg:col-span-6 space-y-5">
          {/* 3 Aligned KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <span className="text-xs font-medium text-rose-800 block">
                Browser Signal Loss
              </span>
              <span className="text-2xl font-display font-extrabold text-rose-700 mt-1 block whitespace-nowrap">
                {result.totalEffectiveLossPercent}%
              </span>
              <span className="text-xs text-rose-700 mt-0.5 block">
                {result.survivingSignalPercent}% visible to Ads AI
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-medium text-emerald-800 block">
                Full Payback Time
              </span>
              <span className="text-2xl font-display font-extrabold text-emerald-700 mt-1 block whitespace-nowrap">
                {result.paybackMonths} mo
              </span>
              <span className="text-xs text-emerald-700 mt-0.5 block">
                ${result.monthlyAdSavings.toLocaleString()}/mo saved spend
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-medium text-slate-600 block">
                12-Month Net ROI
              </span>
              <span className="text-2xl font-display font-extrabold text-brand-blue mt-1 block whitespace-nowrap">
                {result.net12MonthRoiPercent}%
              </span>
              <span className="text-xs text-slate-600 mt-0.5 block">
                ${result.annualAdSavings.toLocaleString()}/yr vs. $
                {result.recommendedTier.annualTco.toLocaleString()} TCO
              </span>
            </div>
          </div>

          {/* Auto-Matched Right-Sized Stack Card */}
          <div className="p-5 rounded-xl bg-slate-950 text-white space-y-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-xs font-semibold text-brand-green">
                Right-Sized Stack · {result.recommendedTier.spendBand}
              </span>
              <span className="text-xs font-semibold text-slate-300 tabular-nums">
                ${result.recommendedTier.setupFee.toLocaleString()} setup · $
                {result.recommendedTier.annualTco.toLocaleString()} 12m TCO
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-display font-bold text-white">
                {result.recommendedTier.name}
              </h4>
              <p className="text-sm text-blue-100 font-medium">
                {result.recommendedTier.recommendedStack}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {result.recommendedTier.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400 tabular-nums">
                Ongoing infra &amp; QA: ${result.monthlyOngoingCost}/mo · No bloated server overhead
              </span>
              <CTAButton href="/contact" variant="primary" size="sm">
                Book Phase 0 Tracking Audit
              </CTAButton>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Payback formula: Setup Fee / (Monthly Ad Savings − Monthly Ongoing Infra &amp; Maint). We reconcile your last 30–90 days of real Shopify, Stripe, or CRM receipts against Google Ads before recommending any tier.
          </p>
        </div>
      </div>
    </div>
  );
}
