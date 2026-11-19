"use client";

import React, { useState } from "react";
import {
  sampleWeeklyChangeLog,
  vbbPipelineStages,
} from "@/lib/agencyData";

export default function BottomLineReportPreview() {
  const [activeTab, setActiveTab] = useState<"pnl" | "vbb" | "changelog">("pnl");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Segmented header controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            CFO-Ready Pipeline Reporting · Sample Client View
          </p>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Money-In vs. Money-Out &amp; CRM Attribution
          </h3>
        </div>

        <div
          role="tablist"
          aria-label="Dashboard view selector"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "pnl"}
            onClick={() => setActiveTab("pnl")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "pnl"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            1-Page P&amp;L View
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "vbb"}
            onClick={() => setActiveTab("vbb")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "vbb"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            CRM &amp; VBB Signal Map
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "changelog"}
            onClick={() => setActiveTab("changelog")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "changelog"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Weekly Change Log
          </button>
        </div>
      </div>

      {activeTab === "pnl" ? (
        <div className="p-6 space-y-6">
          {/* 4-column strict financial KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">
                Google Ad Spend
              </span>
              <span className="text-2xl font-display font-bold text-slate-900 tabular-nums mt-1 block">
                $2,400
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Paid directly to Google
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">
                Flat Agency Fee
              </span>
              <span className="text-2xl font-display font-bold text-slate-900 tabular-nums mt-1 block">
                $950
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                0% markup on spend
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">
                Cost Per Qualified Lead (CPQL)
              </span>
              <span className="text-2xl font-display font-bold text-brand-blue tabular-nums mt-1 block">
                $64.42
              </span>
              <span className="text-xs text-slate-500 mt-1 block tabular-nums">
                52 qualified leads · -57% junk
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-xs text-emerald-800 font-medium block">
                Verified CRM Revenue
              </span>
              <span className="text-2xl font-display font-bold text-emerald-700 tabular-nums mt-1 block">
                $18,700
              </span>
              <span className="text-xs text-emerald-700 font-medium mt-1 block tabular-nums">
                7.79x Pipeline-to-Spend · 5.58x All-In
              </span>
            </div>
          </div>

          {/* Attribution breakdown */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Verified Source</th>
                  <th className="px-4 py-3 text-right font-semibold">SQLs / Calls</th>
                  <th className="px-4 py-3 text-right font-semibold">Closed Deals</th>
                  <th className="px-4 py-3 text-right font-semibold">Verified Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white tabular-nums">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    Exact-Match High-Intent Search (60% Split)
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">34</td>
                  <td className="px-4 py-3 text-right text-slate-700">15</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">$12,750</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    Google Business Profile (Map Pack)
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">18</td>
                  <td className="px-4 py-3 text-right text-slate-700">7</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">$5,950</td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="px-4 py-3 text-slate-500">
                    Blocked Bot, Consumer &amp; Out-of-Area Clicks
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">0 billed</td>
                  <td className="px-4 py-3 text-right text-slate-500">—</td>
                  <td className="px-4 py-3 text-right text-emerald-700 font-medium">
                    $940 saved
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Impressions never replace pipeline metrics. Dynamic call tracking and CRM offline conversion imports trace spend directly to CPQL, Pipeline-to-Spend, and Closed-Won Revenue.
          </p>
        </div>
      ) : activeTab === "vbb" ? (
        <div className="p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-sm text-slate-600 max-w-2xl">
              How we train Google&apos;s AI to act like a digital SDR: instead of bidding for cheap raw leads, we pass GCLID &amp; Enhanced Conversions from your CRM back into Target ROAS bidding.
            </p>
            <span className="text-xs font-semibold text-brand-blue whitespace-nowrap shrink-0 tabular-nums">
              30+ signals/mo Target ROAS threshold
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vbbPipelineStages.map((item) => (
              <div
                key={item.stage}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-brand-blue block">
                    {item.stage}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.trigger}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 space-y-0.5 tabular-nums">
                  <span className="text-sm font-display font-bold text-emerald-700 block">
                    {item.syntheticValue}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    {item.uploadWindow}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            By uploading Enhanced Conversions within Google&apos;s 63-day window (90 days for GCLID offline imports), bidding algorithms bid up on your true Ideal Customer Profile and abstain from low-fit clicks.
          </p>
        </div>
      ) : (
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            No &ldquo;set and forget&rdquo; retainers. Every week, your dashboard logs the exact manual optimizations completed across query control, GBP, CRM sync, and CRO:
          </p>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {sampleWeeklyChangeLog.map((entry) => (
              <div
                key={entry.date}
                className="p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-500 tabular-nums">
                    <span>{entry.date}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="text-brand-blue font-semibold">{entry.channel}</span>
                  </div>
                  <p className="text-sm text-slate-800">{entry.action}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap shrink-0 tabular-nums">
                  {entry.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
