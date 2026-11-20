"use client";

import React, { useId, useRef, useState } from "react";
import {
  sampleWeeklyChangeLog,
  vbbPipelineStages,
} from "@/lib/agencyData";

const REPORT_TABS = [
  { id: "pnl", label: "1-Page P&L View" },
  { id: "vbb", label: "CRM & VBB Signal Map" },
  { id: "changelog", label: "Weekly Change Log" },
] as const;

type ReportTabId = (typeof REPORT_TABS)[number]["id"];

export default function BottomLineReportPreview() {
  const [activeTab, setActiveTab] = useState<ReportTabId>("pnl");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % REPORT_TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + REPORT_TABS.length) % REPORT_TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = REPORT_TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveTab(REPORT_TABS[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const activeTabIndex = REPORT_TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="bento-card overflow-hidden">
      {/* Segmented header controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-canvas border-b border-border-hairline">
        <div>
          <p className="eyebrow-mono text-ink-muted">
            CFO-Ready Pipeline Reporting · Sample Client View
          </p>
          <h3 className="type-h4 text-ink mt-0.5">
            Money-In vs. Money-Out &amp; CRM Attribution
          </h3>
        </div>

        <div
          role="tablist"
          aria-label="Dashboard view selector"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-subtle border border-border-hairline rounded-[var(--radius-btn)] self-start lg:self-auto"
        >
          {REPORT_TABS.map((tab, idx) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`${baseId}-tab-${tab.id}`}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-11 px-3.5 py-2 text-xs font-semibold rounded-[var(--radius-input)] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selected
                    ? "bg-card text-ink shadow-[var(--shadow-whisper)] border border-border-hairline"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${REPORT_TABS[activeTabIndex].id}`}
      >
        {activeTab === "pnl" ? (
          <div className="p-5 sm:p-6 space-y-6">
            {/* 4-column strict financial KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline">
                <span className="text-xs text-ink-muted font-medium block">
                  Google Ad Spend
                </span>
                <span className="type-kpi-card text-ink mt-1 block">
                  $2,400
                </span>
                <span className="text-xs text-ink-muted mt-1 block">
                  Paid directly to Google
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline">
                <span className="text-xs text-ink-muted font-medium block">
                  Flat Agency Fee
                </span>
                <span className="type-kpi-card text-ink mt-1 block">
                  $950
                </span>
                <span className="text-xs text-ink-muted mt-1 block">
                  0% markup on spend
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline">
                <span className="text-xs text-ink-muted font-medium block">
                  Cost Per Qualified Lead (CPQL)
                </span>
                <span className="type-kpi-card text-trust mt-1 block">
                  $64.42
                </span>
                <span className="text-xs text-kpi-positive font-semibold mt-1 block metric-tabular">
                  ▼ -57% junk · 52 qualified leads
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-tile)] bg-kpi-positive-bg border border-kpi-positive/25">
                <span className="text-xs text-kpi-positive font-semibold block">
                  Verified CRM Revenue
                </span>
                <span className="type-kpi-card text-kpi-positive mt-1 block">
                  $18,700
                </span>
                <span className="text-xs text-kpi-positive font-semibold mt-1 block metric-tabular">
                  ▲ 7.79x Pipeline · 5.58x All-In
                </span>
              </div>
            </div>

            {/* Attribution breakdown */}
            <div className="overflow-x-auto border border-border-hairline rounded-[var(--radius-tile)]">
              <table className="min-w-full divide-y divide-border-hairline text-sm">
                <thead className="bg-subtle text-ink-secondary">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Verified Source
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      SQLs / Calls
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      Closed Deals
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      Verified Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-hairline bg-card metric-tabular">
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">
                      Exact-Match High-Intent Search (60% Split)
                    </td>
                    <td className="px-4 py-3 text-right text-ink-secondary">34</td>
                    <td className="px-4 py-3 text-right text-ink-secondary">15</td>
                    <td className="px-4 py-3 text-right font-semibold text-ink">
                      $12,750
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">
                      Google Business Profile (Map Pack)
                    </td>
                    <td className="px-4 py-3 text-right text-ink-secondary">18</td>
                    <td className="px-4 py-3 text-right text-ink-secondary">7</td>
                    <td className="px-4 py-3 text-right font-semibold text-ink">
                      $5,950
                    </td>
                  </tr>
                  <tr className="bg-canvas">
                    <td className="px-4 py-3 text-ink-muted">
                      Blocked Bot, Consumer &amp; Out-of-Area Clicks
                    </td>
                    <td className="px-4 py-3 text-right text-ink-muted">0 billed</td>
                    <td className="px-4 py-3 text-right text-ink-muted">—</td>
                    <td className="px-4 py-3 text-right text-kpi-positive font-semibold">
                      ▲ +$940 saved
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="caption-meta text-ink-muted">
              Impressions never replace pipeline metrics. Dynamic call tracking and CRM offline conversion imports trace spend directly to CPQL, Pipeline-to-Spend, and Closed-Won Revenue.
            </p>
          </div>
        ) : activeTab === "vbb" ? (
          <div className="p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-sm text-ink-secondary max-w-2xl">
                How we train Google&apos;s AI to act like a digital SDR: instead of bidding for cheap raw leads, we pass GCLID &amp; Enhanced Conversions from your CRM back into Target ROAS bidding.
              </p>
              <span className="tracking-id text-xs font-semibold text-trust whitespace-nowrap shrink-0">
                30+ signals/mo Target ROAS floor
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vbbPipelineStages.map((item) => (
                <div
                  key={item.stage}
                  className="p-4 rounded-[var(--radius-tile)] bg-canvas border border-border-hairline flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-trust block">
                      {item.stage}
                    </span>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {item.trigger}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border-hairline space-y-0.5 metric-tabular">
                    <span className="text-sm font-display font-bold text-kpi-positive block">
                      {item.syntheticValue}
                    </span>
                    <span className="text-xs text-ink-muted block">
                      {item.uploadWindow}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="caption-meta text-ink-muted">
              By uploading Enhanced Conversions within Google&apos;s 63-day window (90 days for GCLID offline imports), bidding algorithms bid up on your true Ideal Customer Profile and abstain from low-fit clicks.
            </p>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-sm text-ink-secondary">
              No &ldquo;set and forget&rdquo; retainers. Every week, your dashboard logs the exact manual optimizations completed across query control, GBP, CRM sync, and CRO:
            </p>
            <div className="divide-y divide-border-hairline border border-border-hairline rounded-[var(--radius-tile)] overflow-hidden">
              {sampleWeeklyChangeLog.map((entry) => (
                <div
                  key={entry.date}
                  className="p-4 bg-card flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-ink-muted metric-tabular">
                      <span className="tracking-id">{entry.date}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="text-trust font-semibold">
                        {entry.channel}
                      </span>
                    </div>
                    <p className="text-sm text-ink">{entry.action}</p>
                  </div>
                  <span className="text-xs font-semibold text-kpi-positive whitespace-nowrap shrink-0 metric-tabular">
                    ▲ {entry.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
