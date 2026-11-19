"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import {
  calculateMapPackOpportunity,
  localVerticalPresets,
  GEO_GRID_BEFORE,
  GEO_GRID_AFTER,
  type LocalVerticalPreset,
} from "@/lib/localSeoLogic";

export default function MapPackOpportunityWidget() {
  const defaultPreset = localVerticalPresets[0]; // HVAC Contractor
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    defaultPreset.id
  );
  const [monthlySearches, setMonthlySearches] = useState<number>(
    defaultPreset.monthlySearches
  );
  const [avgJobValue, setAvgJobValue] = useState<number>(
    defaultPreset.avgJobValue
  );
  const [currentRankBucket, setCurrentRankBucket] = useState<
    "outside" | "finder"
  >("outside");
  const [targetPosition, setTargetPosition] = useState<1 | 2 | 3>(1);
  const [gridMode, setGridMode] = useState<"before" | "after">("before");

  const activePreset =
    localVerticalPresets.find((p) => p.id === selectedPresetId) ||
    defaultPreset;

  const applyPreset = (preset: LocalVerticalPreset) => {
    setSelectedPresetId(preset.id);
    setMonthlySearches(preset.monthlySearches);
    setAvgJobValue(preset.avgJobValue);
  };

  const result = calculateMapPackOpportunity({
    monthlySearches,
    avgJobValue,
    profileToLeadCvr: activePreset.profileToLeadCvr,
    closeRate: activePreset.closeRate,
    currentRankBucket,
    targetPosition,
    monthlyRetainer: activePreset.monthlyRetainer,
  });

  const activeGrid = gridMode === "before" ? GEO_GRID_BEFORE : GEO_GRID_AFTER;

  const getCellStyle = (rank: number) => {
    if (rank <= 3) {
      return "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
    }
    if (rank <= 7) {
      return "bg-amber-50 border-amber-300 text-amber-900 font-semibold";
    }
    return "bg-rose-50 border-rose-200 text-rose-900 font-medium";
  };

  return (
    <div
      id="map-pack-calculator"
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden scroll-mt-24"
    >
      {/* Header + Trade Selector */}
      <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            Interactive Missed Revenue &amp; Proximity-Bias Model · 42% Map Pack Click Share
          </p>
          <h3 className="text-xl font-display font-bold text-slate-900 mt-0.5">
            What Ranking Outside the Map Pack Costs You
          </h3>
        </div>

        <div
          role="group"
          aria-label="Local industry presets"
          className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start xl:self-auto shrink-0"
        >
          {localVerticalPresets.map((preset) => (
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
        {/* Left: Missed Revenue Controls + Financial Output */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
            <strong className="font-semibold text-slate-800">
              {activePreset.label}:
            </strong>{" "}
            {activePreset.contextNote}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="local-searches">Monthly Local Searches</label>
                <span className="tabular-nums text-brand-blue">
                  {monthlySearches.toLocaleString()}/mo
                </span>
              </div>
              <input
                id="local-searches"
                type="range"
                min={400}
                max={6000}
                step={200}
                value={monthlySearches}
                onChange={(e) => setMonthlySearches(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="local-aov">Average Ticket / Job Value</label>
                <span className="tabular-nums text-brand-blue">
                  ${avgJobValue.toLocaleString()}
                </span>
              </div>
              <input
                id="local-aov"
                type="range"
                min={250}
                max={20000}
                step={250}
                value={avgJobValue}
                onChange={(e) => setAvgJobValue(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
            </div>
          </div>

          {/* Current Position vs Target Map Pack Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">
                Current Suburb Visibility
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentRankBucket("outside")}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    currentRankBucket === "outside"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  Rank #8+ (Invisible)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentRankBucket("finder")}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    currentRankBucket === "finder"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  Rank #4–#6 (Finder)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">
                Target 3-Pack Position (2026 CTR)
              </span>
              <div className="flex gap-1.5">
                {([1, 2, 3] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setTargetPosition(pos)}
                    className={`flex-1 px-2.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap tabular-nums cursor-pointer ${
                      targetPosition === pos
                        ? "bg-brand-blue text-white border-brand-blue"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    #{pos} ({pos === 1 ? "17.6%" : pos === 2 ? "15.4%" : "15.1%"})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <span className="text-xs font-medium text-rose-800 block">
                Missed Monthly Revenue
              </span>
              <span className="text-2xl font-display font-extrabold text-rose-700 mt-1 block">
                ${result.missedMonthlyRevenue.toLocaleString()}/mo
              </span>
              <span className="text-xs text-rose-700 mt-0.5 block">
                ${result.missedAnnualRevenue.toLocaleString()}/yr going to rivals
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-medium text-emerald-800 block">
                Target #{targetPosition} Pipeline
              </span>
              <span className="text-2xl font-display font-extrabold text-emerald-700 mt-1 block whitespace-nowrap">
                {result.targetBookedJobs}{" "}
                {result.targetBookedJobs === 1 ? "job" : "jobs"}/mo
              </span>
              <span className="text-xs text-emerald-700 mt-0.5 block">
                {result.targetMonthlyClicks} clicks · {result.targetMonthlyLeads} calls ({activePreset.closeRate}% close)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-medium text-slate-600 block">
                90-Day Payback Bar
              </span>
              <span className="text-2xl font-display font-extrabold text-slate-900 mt-1 block whitespace-nowrap">
                {result.jobsPerQuarterToBreakEven}{" "}
                {result.jobsPerQuarterToBreakEven === 1 ? "job" : "jobs"}
              </span>
              <span className="text-xs text-slate-600 mt-0.5 block">
                Every 90 days covers ${activePreset.monthlyRetainer.toLocaleString()}/mo retainer
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Conservative assumptions: {activePreset.profileToLeadCvr}% profile-to-call conversion and {activePreset.closeRate}% close rate. Actual numbers are verified on your live market audit.
            </p>
            <CTAButton href="/contact" variant="primary" size="sm">
              Run My Real Zip-Code Grid
            </CTAButton>
          </div>
        </div>

        {/* Right: Interactive 5x5 Proximity-Bias Geo-Grid */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-900">
                5-Mile Suburb Geo-Grid Simulation
              </span>
              <span className="text-xs text-slate-500">Center = Office Pin</span>
            </div>

            <div
              role="group"
              aria-label="Geo-grid comparison toggle"
              className="grid grid-cols-2 gap-1 p-1 bg-slate-200/80 rounded-lg"
            >
              <button
                type="button"
                onClick={() => setGridMode("before")}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  gridMode === "before"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Before (Proximity Bias)
              </button>
              <button
                type="button"
                onClick={() => setGridMode("after")}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  gridMode === "after"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                After (GBP + SAPs)
              </button>
            </div>
          </div>

          {/* 5x5 Rank Matrix */}
          <div
            className="grid grid-cols-5 gap-2"
            aria-label={
              gridMode === "before"
                ? "Before optimization map rank grid showing rank 1 at office and ranks 8 to 16 in suburbs"
                : "After optimization map rank grid showing top 3 ranks across target suburbs"
            }
          >
            {activeGrid.flatMap((row, rIdx) =>
              row.map((rank, cIdx) => {
                const isCenter = rIdx === 2 && cIdx === 2;
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`aspect-square rounded-lg border flex flex-col items-center justify-center tabular-nums text-sm ${getCellStyle(
                      rank
                    )} ${isCenter ? "ring-2 ring-brand-blue ring-offset-1" : ""}`}
                  >
                    <span>#{rank}</span>
                    {isCenter ? (
                      <span className="text-[10px] font-semibold text-brand-blue leading-none mt-0.5">
                        HQ
                      </span>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>

          {/* Accessible Legend & Explanation */}
          <div className="space-y-2 pt-1 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-semibold text-emerald-800">
                #1–#3: 42% Click Share
              </span>
              <span className="font-medium text-amber-800">
                #4–#7: Local Finder
              </span>
              <span className="font-medium text-rose-800">
                #8+: Invisible Zone
              </span>
            </div>
            <p className="leading-relaxed">
              {gridMode === "before"
                ? "Proximity bias trap: You rank #1 sitting at your office (HQ), while ranking #8–#16 just two miles away where high-ticket homeowners search."
                : "After Primary Category alignment, Proof-of-Work Service-Area Pages, areaServed schema, and weekly review velocity: Top-3 visibility expands across surrounding suburbs."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
