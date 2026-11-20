"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import RangeStepper from "./RangeStepper";
import {
  calculatePipelineEconomics,
  industryBenchmarkPresets,
  type IndustryBenchmarkPreset,
} from "@/lib/roiCalculatorLogic";

export default function ROICalculator() {
  const defaultPreset = industryBenchmarkPresets[1]; // B2B Services shows dramatic CRO + VBB delta
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    defaultPreset.id
  );
  const [monthlyBudget, setMonthlyBudget] = useState<number>(3500);
  const [avgCpc, setAvgCpc] = useState<number>(defaultPreset.avgCpc);
  const [landingPageCvr, setLandingPageCvr] = useState<number>(
    defaultPreset.optimizedCvr
  );
  const [avgDealValue, setAvgDealValue] = useState<number>(
    defaultPreset.avgDealValue
  );
  const [closeRate, setCloseRate] = useState<number>(defaultPreset.closeRate);

  const activePreset =
    industryBenchmarkPresets.find((p) => p.id === selectedPresetId) ||
    defaultPreset;

  const applyPreset = (preset: IndustryBenchmarkPreset) => {
    setSelectedPresetId(preset.id);
    setAvgCpc(preset.avgCpc);
    setLandingPageCvr(preset.optimizedCvr);
    setAvgDealValue(preset.avgDealValue);
    setCloseRate(preset.closeRate);
  };

  const baselineProjection = calculatePipelineEconomics({
    monthlyBudget,
    avgCpc,
    landingPageCvr: activePreset.baselineCvr,
    avgDealValue,
    closeRate,
  });

  const currentProjection = calculatePipelineEconomics({
    monthlyBudget,
    avgCpc,
    landingPageCvr,
    avgDealValue,
    closeRate,
  });

  return (
    <div
      id="roi-calculator"
      className="bento-card overflow-hidden scroll-mt-24"
    >
      <div className="px-6 py-5 bg-canvas border-b border-border-hairline flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="eyebrow-mono text-ink-muted">
            Interactive Pipeline &amp; CRO Unit-Economics Model
          </p>
          <h3 className="type-h4 text-ink mt-0.5">
            Model Your CPQL, Landing Page CRO Lift &amp; Flat-Fee ROI
          </h3>
        </div>

        {/* Benchmark Presets */}
        <div
          role="group"
          aria-label="Industry benchmark presets"
          className="flex flex-wrap items-center gap-1 p-1 bg-subtle border border-border-hairline rounded-[var(--radius-btn)] self-start lg:self-auto"
        >
          {industryBenchmarkPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`min-h-11 px-3 py-2 text-xs font-semibold rounded-[var(--radius-input)] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedPresetId === preset.id
                  ? "bg-card text-ink shadow-[var(--shadow-whisper)] border border-border-hairline"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          <p className="caption-meta text-ink-secondary bg-subtle border border-border-hairline rounded-[var(--radius-btn)] px-3.5 py-2.5 leading-relaxed">
            <strong className="font-semibold text-ink">
              {activePreset.label} Benchmark:
            </strong>{" "}
            {activePreset.benchmarkNote}
          </p>

          <div>
            <RangeStepper
              id="calc-budget"
              label="Monthly Google Ad Spend"
              value={monthlyBudget}
              displayValue={`$${monthlyBudget.toLocaleString()}/mo`}
              min={1000}
              max={15000}
              step={500}
              onChange={setMonthlyBudget}
            />
            <p className="caption-meta text-ink-muted mt-1.5 metric-tabular">
              LeadGrow flat fee: ${currentProjection.flatManagementFee.toLocaleString()}/mo (0% of spend) vs. ~$
              {currentProjection.percentSpendAgencyFee.toLocaleString()}/mo at a 15% agency
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RangeStepper
              id="calc-cpc"
              label="Average CPC"
              value={avgCpc}
              displayValue={`$${avgCpc.toFixed(2)}`}
              min={1.5}
              max={18}
              step={0.5}
              decimals={2}
              onChange={setAvgCpc}
            />

            <RangeStepper
              id="calc-cvr"
              label="Landing Page CVR"
              value={landingPageCvr}
              displayValue={`${landingPageCvr.toFixed(1)}%`}
              min={1.5}
              max={14}
              step={0.1}
              decimals={1}
              onChange={setLandingPageCvr}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setLandingPageCvr(activePreset.baselineCvr)}
              className={`min-h-11 px-3.5 py-2 text-xs font-semibold rounded-[var(--radius-input)] border transition-colors whitespace-nowrap shrink-0 cursor-pointer metric-tabular ${
                Math.abs(landingPageCvr - activePreset.baselineCvr) < 0.05
                  ? "border-ink bg-ink text-card"
                  : "border-border-control bg-card text-ink-secondary hover:border-trust hover:text-trust"
              }`}
            >
              Generic Homepage ({activePreset.baselineCvr}% CVR)
            </button>
            <button
              type="button"
              onClick={() => setLandingPageCvr(activePreset.optimizedCvr)}
              className={`min-h-11 px-3.5 py-2 text-xs font-semibold rounded-[var(--radius-input)] border transition-colors whitespace-nowrap shrink-0 cursor-pointer metric-tabular ${
                Math.abs(landingPageCvr - activePreset.optimizedCvr) < 0.05
                  ? "border-trust bg-trust text-white"
                  : "border-border-control bg-card text-ink-secondary hover:border-trust hover:text-trust"
              }`}
            >
              1:1 Message-Matched CRO ({activePreset.optimizedCvr}% CVR)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RangeStepper
              id="calc-job"
              label="Avg. Customer Value"
              value={avgDealValue}
              displayValue={`$${avgDealValue.toLocaleString()}`}
              min={150}
              max={12000}
              step={100}
              onChange={setAvgDealValue}
            />

            <RangeStepper
              id="calc-close"
              label="Lead-to-Close Rate"
              value={closeRate}
              displayValue={`${closeRate}%`}
              min={10}
              max={100}
              step={5}
              onChange={setCloseRate}
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-6 bento-card__visual-well p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-[var(--radius-btn)] border border-border-hairline">
              <span className="text-xs text-ink-muted block">
                Cost Per Qualified Lead
              </span>
              <span className="type-kpi-card text-trust mt-1 block">
                ${currentProjection.costPerQualifiedLead.toLocaleString()}
              </span>
              <span className="text-xs text-ink-muted metric-tabular">
                ~{currentProjection.qualifiedLeads} qualified leads / ~
                {currentProjection.estimatedClicks} clicks
              </span>
            </div>

            <div className="bg-card p-4 rounded-[var(--radius-btn)] border border-border-hairline">
              <span className="text-xs text-ink-muted block">
                Total Monthly Cost
              </span>
              <span className="type-kpi-card text-ink mt-1 block">
                ${currentProjection.totalInvestment.toLocaleString()}
              </span>
              <span className="text-xs text-ink-muted metric-tabular">
                ${monthlyBudget.toLocaleString()} spend + $
                {currentProjection.flatManagementFee.toLocaleString()} flat fee
              </span>
            </div>

            <div className="bg-kpi-positive-bg p-4 rounded-[var(--radius-btn)] border border-kpi-positive/25">
              <span className="text-xs font-semibold text-kpi-positive block">
                Projected Closed Revenue
              </span>
              <span className="type-kpi-card text-kpi-positive mt-1 block">
                ${currentProjection.projectedRevenue.toLocaleString()}
              </span>
              <span className="text-xs text-kpi-positive font-semibold metric-tabular">
                ▲ {currentProjection.pipelineToSpendRatio}x ad-spend ·{" "}
                {currentProjection.roasMultiple}x all-in ROAS
              </span>
            </div>

            <div className="bg-card p-4 rounded-[var(--radius-btn)] border border-border-hairline">
              <span className="text-xs text-ink-muted block">
                Break-Even &amp; Customers
              </span>
              <span className="type-kpi-card text-ink mt-1 block">
                {currentProjection.breakEvenCustomers} to break even
              </span>
              <span className="text-xs text-ink-muted metric-tabular">
                Projected: {currentProjection.closedCustomers} won · Net{" "}
                {currentProjection.netProfitAfterMarketing >= 0 ? "▲ +" : "▼ -"}$
                {Math.abs(
                  currentProjection.netProfitAfterMarketing
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-card rounded-[var(--radius-btn)] border border-border-hairline p-4 caption-meta text-ink-secondary space-y-1.5 leading-relaxed metric-tabular">
            <p>
              <strong className="font-semibold text-ink">
                Why CRO &amp; VBB Beat Adding Budget:
              </strong>{" "}
              At your {activePreset.baselineCvr}% baseline homepage rate, CPQL is{" "}
              <strong className="font-semibold text-ink">${baselineProjection.costPerQualifiedLead}</strong>. At{" "}
              <strong className="font-semibold text-ink">{landingPageCvr.toFixed(1)}%</strong> landing page conversion, CPQL sits at{" "}
              <strong className="font-semibold text-ink">${currentProjection.costPerQualifiedLead}</strong> on the exact same media spend.
            </p>
            {currentProjection.annualFeeSavingsVsPercentModel > 0 ? (
              <p className="text-kpi-positive font-semibold">
                ▲ Flat-fee protection saves you +$
                {currentProjection.annualFeeSavingsVsPercentModel.toLocaleString()}
                /year compared to a traditional 15%-of-ad-spend retainer.
              </p>
            ) : null}
          </div>

          <CTAButton href="/contact" variant="primary" fullWidth>
            Model This For Your Exact Margins (Free Plan)
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
