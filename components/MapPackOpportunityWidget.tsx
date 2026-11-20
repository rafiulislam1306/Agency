"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import RangeStepper from "./RangeStepper";
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
      return "bg-kpi-positive-bg border-kpi-positive/40 text-kpi-positive font-bold";
    }
    if (rank <= 7) {
      return "bg-kpi-warning-bg border-kpi-warning/40 text-kpi-warning font-semibold";
    }
    return "bg-kpi-negative-bg border-kpi-negative/30 text-kpi-negative font-medium";
  };

  return (
    <div
      id="map-pack-calculator"
      className="bento-card overflow-hidden scroll-mt-24"
    >
      {/* Header + Trade Selector */}
      <div className="px-6 py-5 bg-canvas border-b border-border-hairline flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow-mono text-ink-muted">
            Interactive Missed Revenue &amp; Proximity-Bias Model · 42% Map Pack Click Share
          </p>
          <h3 className="type-h4 text-ink mt-0.5">
            What Ranking Outside the Map Pack Costs You
          </h3>
        </div>

        <div
          role="group"
          aria-label="Local industry presets"
          className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-subtle border border-border-hairline rounded-[var(--radius-btn)] self-start xl:self-auto shrink-0"
        >
          {localVerticalPresets.map((preset) => (
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
        {/* Left: Missed Revenue Controls + Financial Output */}
        <div className="lg:col-span-7 space-y-6">
          <p className="caption-meta text-ink-secondary bg-subtle border border-border-hairline rounded-[var(--radius-btn)] px-3.5 py-2.5 leading-relaxed">
            <strong className="font-semibold text-ink">
              {activePreset.label}:
            </strong>{" "}
            {activePreset.contextNote}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <RangeStepper
              id="local-searches"
              label="Monthly Local Searches"
              value={monthlySearches}
              displayValue={`${monthlySearches.toLocaleString()}/mo`}
              min={400}
              max={6000}
              step={200}
              onChange={setMonthlySearches}
            />

            <RangeStepper
              id="local-aov"
              label="Average Ticket / Job Value"
              value={avgJobValue}
              displayValue={`$${avgJobValue.toLocaleString()}`}
              min={250}
              max={20000}
              step={250}
              onChange={setAvgJobValue}
            />
          </div>

          {/* Current Position vs Target Map Pack Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-ink-secondary">
                Current Suburb Visibility
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentRankBucket("outside")}
                  className={`flex-1 min-h-11 px-3 py-2 text-xs font-semibold rounded-[var(--radius-btn)] border transition-colors whitespace-nowrap cursor-pointer ${
                    currentRankBucket === "outside"
                      ? "bg-ink text-card border-ink"
                      : "bg-card text-ink-secondary border-border-control hover:border-trust hover:text-trust"
                  }`}
                >
                  Rank #8+ (Invisible)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentRankBucket("finder")}
                  className={`flex-1 min-h-11 px-3 py-2 text-xs font-semibold rounded-[var(--radius-btn)] border transition-colors whitespace-nowrap cursor-pointer ${
                    currentRankBucket === "finder"
                      ? "bg-ink text-card border-ink"
                      : "bg-card text-ink-secondary border-border-control hover:border-trust hover:text-trust"
                  }`}
                >
                  Rank #4–#6 (Finder)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-ink-secondary">
                Target 3-Pack Position (2026 CTR)
              </span>
              <div className="flex gap-1.5">
                {([1, 2, 3] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setTargetPosition(pos)}
                    className={`flex-1 min-h-11 px-2.5 py-2 text-xs font-semibold rounded-[var(--radius-btn)] border transition-colors whitespace-nowrap metric-tabular cursor-pointer ${
                      targetPosition === pos
                        ? "bg-trust text-white border-trust"
                        : "bg-card text-ink-secondary border-border-control hover:border-trust hover:text-trust"
                    }`}
                  >
                    #{pos} ({pos === 1 ? "17.6%" : pos === 2 ? "15.4%" : "15.1%"})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Output Cards (WCAG 1.4.1 Color + Directional Sign) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 metric-tabular">
            <div className="p-4 rounded-[var(--radius-tile)] bg-kpi-negative-bg border border-kpi-negative/25">
              <span className="text-xs font-semibold text-kpi-negative block">
                ▼ Missed Monthly Revenue
              </span>
              <span className="type-kpi-card text-kpi-negative mt-1 block">
                -${result.missedMonthlyRevenue.toLocaleString()}
              </span>
              <span className="text-xs text-kpi-negative mt-0.5 block">
                -${result.missedAnnualRevenue.toLocaleString()}/yr lost to rivals
              </span>
            </div>

            <div className="p-4 rounded-[var(--radius-tile)] bg-kpi-positive-bg border border-kpi-positive/25">
              <span className="text-xs font-semibold text-kpi-positive block">
                ▲ Target #{targetPosition} Pipeline
              </span>
              <span className="type-kpi-card text-kpi-positive mt-1 block whitespace-nowrap">
                +{result.targetBookedJobs}{" "}
                {result.targetBookedJobs === 1 ? "job" : "jobs"}/mo
              </span>
              <span className="text-xs text-kpi-positive mt-0.5 block">
                {result.targetMonthlyClicks} clicks · {result.targetMonthlyLeads} calls ({activePreset.closeRate}% close)
              </span>
            </div>

            <div className="p-4 rounded-[var(--radius-tile)] bg-subtle border border-border-hairline">
              <span className="text-xs font-medium text-ink-muted block">
                90-Day Payback Bar
              </span>
              <span className="type-kpi-card text-ink mt-1 block whitespace-nowrap">
                {result.jobsPerQuarterToBreakEven}{" "}
                {result.jobsPerQuarterToBreakEven === 1 ? "job" : "jobs"}
              </span>
              <span className="text-xs text-ink-muted mt-0.5 block">
                Every 90 days covers ${activePreset.monthlyRetainer.toLocaleString()}/mo retainer
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border-hairline">
            <p className="caption-meta text-ink-muted max-w-md leading-relaxed">
              Conservative assumptions: {activePreset.profileToLeadCvr}% profile-to-call conversion and {activePreset.closeRate}% close rate. Actual numbers are verified on your live market audit.
            </p>
            <CTAButton href="/contact" variant="primary" size="sm">
              Run My Real Zip-Code Grid
            </CTAButton>
          </div>
        </div>

        {/* Right: Interactive 5x5 Proximity-Bias Geo-Grid */}
        <div className="lg:col-span-5 bento-card__visual-well p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-ink">
                5-Mile Suburb Geo-Grid Simulation
              </span>
              <span className="text-xs text-ink-muted">Center = Office Pin</span>
            </div>

            <div
              role="group"
              aria-label="Geo-grid comparison toggle"
              className="grid grid-cols-2 gap-1 p-1 bg-card border border-border-hairline rounded-[var(--radius-btn)]"
            >
              <button
                type="button"
                onClick={() => setGridMode("before")}
                className={`min-h-11 px-2.5 py-2 text-xs font-semibold rounded-[var(--radius-input)] transition-colors whitespace-nowrap cursor-pointer ${
                  gridMode === "before"
                    ? "bg-ink text-card shadow-[var(--shadow-whisper)]"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Before (Proximity Bias)
              </button>
              <button
                type="button"
                onClick={() => setGridMode("after")}
                className={`min-h-11 px-2.5 py-2 text-xs font-semibold rounded-[var(--radius-input)] transition-colors whitespace-nowrap cursor-pointer ${
                  gridMode === "after"
                    ? "bg-kpi-positive text-white shadow-[var(--shadow-whisper)]"
                    : "text-ink-muted hover:text-ink"
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
                    className={`aspect-square rounded-[var(--radius-btn)] border flex flex-col items-center justify-center font-mono metric-tabular text-sm ${getCellStyle(
                      rank
                    )} ${isCenter ? "ring-2 ring-trust ring-offset-1" : ""}`}
                  >
                    <span>#{rank}</span>
                    {isCenter ? (
                      <span className="text-[10px] font-semibold text-trust leading-none mt-0.5">
                        HQ
                      </span>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>

          {/* Accessible Legend & Explanation */}
          <div className="space-y-2 pt-1 caption-meta text-ink-secondary">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-semibold text-kpi-positive">
                ▲ #1–#3: 42% Click Share
              </span>
              <span className="font-semibold text-kpi-warning">
                ● #4–#7: Local Finder
              </span>
              <span className="font-semibold text-kpi-negative">
                ▼ #8+: Invisible Zone
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
