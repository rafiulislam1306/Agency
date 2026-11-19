"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
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
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden scroll-mt-24"
    >
      <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Interactive Pipeline &amp; CRO Unit-Economics Model
          </p>
          <h3 className="text-xl font-display font-bold text-slate-900 mt-0.5">
            Model Your CPQL, Landing Page CRO Lift &amp; Flat-Fee ROI
          </h3>
        </div>

        {/* Benchmark Presets */}
        <div
          role="group"
          aria-label="Industry benchmark presets"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto"
        >
          {industryBenchmarkPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedPresetId === preset.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
          <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
            <strong className="font-semibold text-slate-800">
              {activePreset.label} Benchmark:
            </strong>{" "}
            {activePreset.benchmarkNote}
          </p>

          <div>
            <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
              <label htmlFor="calc-budget">Monthly Google Ad Spend</label>
              <span className="tabular-nums text-brand-blue">
                ${monthlyBudget.toLocaleString()}/mo
              </span>
            </div>
            <input
              id="calc-budget"
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value))}
              className="w-full accent-brand-blue cursor-pointer"
            />
            <p className="text-xs text-slate-500 mt-1 tabular-nums">
              LeadGrow flat fee: ${currentProjection.flatManagementFee.toLocaleString()}/mo (0% of spend) vs. ~$
              {currentProjection.percentSpendAgencyFee.toLocaleString()}/mo at a 15% agency
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="calc-cpc">Average CPC</label>
                <span className="tabular-nums text-brand-blue">
                  ${avgCpc.toFixed(2)}
                </span>
              </div>
              <input
                id="calc-cpc"
                type="range"
                min={1.5}
                max={18}
                step={0.5}
                value={avgCpc}
                onChange={(e) => setAvgCpc(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="calc-cvr">Landing Page CVR</label>
                <span className="tabular-nums text-brand-blue">
                  {landingPageCvr.toFixed(1)}%
                </span>
              </div>
              <input
                id="calc-cvr"
                type="range"
                min={1.5}
                max={14}
                step={0.1}
                value={landingPageCvr}
                onChange={(e) => setLandingPageCvr(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setLandingPageCvr(activePreset.baselineCvr)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                Math.abs(landingPageCvr - activePreset.baselineCvr) < 0.05
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              Generic Homepage ({activePreset.baselineCvr}% CVR)
            </button>
            <button
              type="button"
              onClick={() => setLandingPageCvr(activePreset.optimizedCvr)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                Math.abs(landingPageCvr - activePreset.optimizedCvr) < 0.05
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              1:1 Message-Matched CRO ({activePreset.optimizedCvr}% CVR)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="calc-job">Avg. Customer Value</label>
                <span className="tabular-nums text-brand-blue">
                  ${avgDealValue.toLocaleString()}
                </span>
              </div>
              <input
                id="calc-job"
                type="range"
                min={150}
                max={12000}
                step={100}
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="calc-close">Lead-to-Close Rate</label>
                <span className="tabular-nums text-brand-blue">
                  {closeRate}%
                </span>
              </div>
              <input
                id="calc-close"
                type="range"
                min={10}
                max={100}
                step={5}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-6 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 block">
                Cost Per Qualified Lead
              </span>
              <span className="text-xl font-display font-bold text-brand-blue tabular-nums mt-1 block">
                ${currentProjection.costPerQualifiedLead.toLocaleString()} CPQL
              </span>
              <span className="text-xs text-slate-500 tabular-nums">
                ~{currentProjection.qualifiedLeads} qualified leads / ~
                {currentProjection.estimatedClicks} clicks
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 block">
                Total Monthly Cost
              </span>
              <span className="text-xl font-display font-bold text-slate-900 tabular-nums mt-1 block">
                ${currentProjection.totalInvestment.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 tabular-nums">
                ${monthlyBudget.toLocaleString()} spend + $
                {currentProjection.flatManagementFee.toLocaleString()} flat fee
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <span className="text-xs text-emerald-800 block">
                Projected Closed Revenue
              </span>
              <span className="text-xl font-display font-bold text-emerald-700 tabular-nums mt-1 block">
                ${currentProjection.projectedRevenue.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-700 font-medium tabular-nums">
                {currentProjection.pipelineToSpendRatio}x ad-spend ·{" "}
                {currentProjection.roasMultiple}x all-in ROAS
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 block">
                Break-Even &amp; Customers
              </span>
              <span className="text-xl font-display font-bold text-slate-900 tabular-nums mt-1 block">
                {currentProjection.breakEvenCustomers} to break even
              </span>
              <span className="text-xs text-slate-500 tabular-nums">
                Projected: {currentProjection.closedCustomers} won · Net{" "}
                {currentProjection.netProfitAfterMarketing >= 0 ? "+" : "-"}$
                {Math.abs(
                  currentProjection.netProfitAfterMarketing
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 text-xs text-slate-600 space-y-1.5 leading-relaxed tabular-nums">
            <p>
              <strong className="font-semibold text-slate-800">
                Why CRO &amp; VBB Beat Adding Budget:
              </strong>{" "}
              At your {activePreset.baselineCvr}% baseline homepage rate, CPQL is{" "}
              <strong>${baselineProjection.costPerQualifiedLead}</strong>. At{" "}
              <strong>{landingPageCvr.toFixed(1)}%</strong> landing page conversion, CPQL sits at{" "}
              <strong>${currentProjection.costPerQualifiedLead}</strong> on the exact same media spend.
            </p>
            {currentProjection.annualFeeSavingsVsPercentModel > 0 ? (
              <p className="text-emerald-700 font-medium">
                Flat-fee protection saves you $
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
