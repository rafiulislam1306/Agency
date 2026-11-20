import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Globe,
  MapPin,
  Server,
  TrendingDown,
} from "lucide-react";

const COST_PER_SQL_STEPS = [
  { label: "Baseline", value: "$194", heightClass: "h-16", tone: "bg-border-strong" },
  { label: "Day 30", value: "$158", heightClass: "h-12", tone: "bg-trust/60" },
  { label: "Day 60", value: "$134", heightClass: "h-10", tone: "bg-trust" },
  { label: "Day 90", value: "$119", heightClass: "h-8", tone: "bg-kpi-positive" },
] as const;

const MINI_MAP_GRID = [
  1, 2, 1, 2, 3,
  2, 1, 1, 1, 2,
  1, 1, 1, 2, 3,
  2, 1, 2, 3, 4,
  3, 2, 3, 4, 5,
] as const;

/**
 * Self-Evident Productized Hero Proof Card (Right 45% of Split-Screen Hero):
 * Renders zero-CLS SSR deliverables legible in <2 seconds without explanatory captions:
 * 1. Google Ads Cost-per-SQL trend curve ($194 -> $119, -38.7%)
 * 2. Minimalist 5x5 Local Map Pack coverage grid (22/25 Top-3 pins)
 * 3. 3-Node Server-Side GA4 / CRM Verified status strip
 */
export default function HeroProofCard() {
  const top3Count = MINI_MAP_GRID.filter((r) => r <= 3).length;

  return (
    <div
      aria-label="Productized agency deliverables preview: Google Ads Cost per SQL, Local Map Pack coverage, and Server-Side GA4 verification"
      className="bento-card p-5 sm:p-6 shadow-[var(--shadow-floating)] space-y-4 text-left"
    >
      {/* Top Status Bar */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-border-hairline">
        <span className="eyebrow-mono text-ink-muted">
          Live Client Deliverable Snapshot
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kpi-positive metric-tabular">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          CRM Verified
        </span>
      </div>

      {/* Deliverable 1 + 2 Side-by-Side Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* 1. Google Ads Cost-per-SQL Trend */}
        <div className="bento-card__visual-well p-3.5 bg-canvas flex flex-col justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted block">
              Google Ads · Cost / SQL
            </span>
            <div className="flex items-baseline gap-2 metric-tabular">
              <span className="text-xl font-mono font-bold text-ink">
                $119
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-kpi-positive">
                <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
                -38.7%
              </span>
            </div>
          </div>

          <div
            className="grid grid-cols-4 gap-2 items-end pt-2"
            aria-label="Cost per SQL dropped from 194 dollars at baseline to 119 dollars at day 90"
          >
            {COST_PER_SQL_STEPS.map((step) => (
              <div
                key={step.label}
                className="flex flex-col items-center gap-1 metric-tabular"
              >
                <span className="text-[10px] font-mono font-semibold text-ink-secondary">
                  {step.value}
                </span>
                <div
                  className={`w-full rounded-t-[4px] ${step.heightClass} ${step.tone}`}
                  aria-hidden="true"
                />
                <span className="text-[10px] text-ink-muted whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Local Map Pack 5x5 Pin-Grid */}
        <div className="bento-card__visual-well p-3.5 bg-canvas flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted whitespace-nowrap">
              <MapPin className="w-3 h-3 text-kpi-positive shrink-0" aria-hidden="true" />
              Map Pack
            </span>
            <span className="text-xs font-mono font-bold text-kpi-positive metric-tabular whitespace-nowrap shrink-0">
              {top3Count}/25 Top-3
            </span>
          </div>

          <div
            className="grid grid-cols-5 gap-1.5"
            role="img"
            aria-label={`5 by 5 local Map Pack grid showing ${top3Count} of 25 service-area pins ranked in the top 3`}
          >
            {MINI_MAP_GRID.map((rank, idx) => {
              const isTop3 = rank <= 3;
              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-[4px] flex items-center justify-center text-[11px] font-mono font-bold metric-tabular ${
                    isTop3
                      ? "bg-kpi-positive text-white"
                      : "bg-kpi-warning-bg text-kpi-warning border border-kpi-warning/40"
                  }`}
                >
                  {rank}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deliverable 3: 3-Node Server-Side GA4 / CRM Verified Status */}
      <div className="surface-dark rounded-[var(--radius-tile)] p-3.5 border border-border-hairline space-y-2.5">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="font-semibold text-ink uppercase tracking-wider">
            Server-Side GA4 &amp; CRM Attribution
          </span>
          <span className="font-semibold text-kpi-positive metric-tabular">
            3.8% Variance · OK
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="dark-panel rounded-[var(--radius-input)] px-2.5 py-2 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-trust shrink-0" aria-hidden="true" />
            <span className="font-semibold text-ink truncate">Click / Call</span>
          </div>
          <div className="dark-panel-elevated rounded-[var(--radius-input)] px-2.5 py-2 flex items-center gap-1.5 border-trust/40">
            <Server className="w-3.5 h-3.5 text-kpi-positive shrink-0" aria-hidden="true" />
            <span className="font-semibold text-ink truncate">1P sGTM</span>
          </div>
          <div className="dark-panel rounded-[var(--radius-input)] px-2.5 py-2 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-kpi-positive shrink-0" aria-hidden="true" />
            <span className="font-semibold text-ink truncate">Ads + CRM</span>
          </div>
        </div>
      </div>

      {/* Quiet bottom proof line */}
      <div className="flex items-center justify-between gap-2 text-xs text-ink-muted pt-0.5">
        <span>Audited live across client accounts</span>
        <a
          href="#case-studies"
          className="inline-flex items-center gap-1 font-semibold text-trust hover:text-trust-hover whitespace-nowrap"
        >
          <span>Full teardowns</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
