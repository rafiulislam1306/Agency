import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Database,
  Globe,
  MapPin,
  RefreshCw,
  Server,
  TrendingUp,
} from "lucide-react";
import {
  GBP_7X7_BENCHMARK_GRID,
  summarizeGeoGrid,
} from "@/lib/designSystemLogic";

const GOOGLE_ADS_LEDGER = [
  {
    segment: "Exact High-Intent (60%)",
    cpql: "$61.20",
    delta: "▼ -44%",
  },
  {
    segment: "PMax Asset Groups (20%)",
    cpql: "$74.80",
    delta: "▲ 2.1x SQL",
  },
  {
    segment: "Blocked Broad / Bots",
    cpql: "$0.00",
    delta: "▼ -57% junk",
  },
] as const;

const COMPACT_GEO_PINS = GBP_7X7_BENCHMARK_GRID.slice(0, 21);

function getPinStyle(rank: number): string {
  if (rank <= 3) {
    return "bg-kpi-positive text-white border-kpi-positive";
  }
  if (rank <= 6) {
    return "bg-kpi-warning-bg text-kpi-warning border-kpi-warning/40";
  }
  return "bg-border-hairline text-ink-secondary border-border-strong";
}

/**
 * Section 3: 12-Column (4x3) Asymmetric Bento Grid (12 flush units, 6 sequential DOM cells):
 * - Unit math: 4 (2x2) + 2 (2x1) + 2 (2x1) + 1 (1x1) + 2 (2x1) + 1 (1x1) = 12 flush units
 * - Spacing geometry: 16px gutter (gap-4), uniform 20px border-radius, 24-28px interior padding
 * - Elastic row baseline: lg:auto-rows-[minmax(220px,auto)] (zero grid-auto-flow: dense)
 * - Heydon Pickering single-target stretched links inside semantic <ul>/<li> markup
 */
export default function BentoServiceShowcase() {
  const geoSummary = summarizeGeoGrid(GBP_7X7_BENCHMARK_GRID);

  return (
    <section
      id="services"
      aria-labelledby="bento-architecture-heading"
      className="py-16 md:py-24 bg-canvas border-b border-border-hairline scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="eyebrow-mono text-trust">
            Three Integrated Channels · One Closed-Loop System
          </p>
          <h2 id="bento-architecture-heading" className="type-h2 text-ink">
            Google Ads, Local SEO &amp; First-Party Tracking Engineered Together
          </h2>
          <p className="type-lead text-ink-secondary">
            Paid search captures active demand, Google Business Profile compounds Map Pack calls, and server-side tracking proves every dollar in your CRM.
          </p>
        </div>

        {/* Semantic <ul>/<li> 12-col (4x3) Bento Grid: 16px gutter, 20px radius, zero grid-auto-flow: dense */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)] gap-4"
        >
          {/* DOM #1 — 2x2 Hero Anchor (6 cols x 2 rows = 4 units, Top-Left 80% attention zone) */}
          <li className="@container relative md:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[280px] rounded-[20px] border border-border-hairline bg-card p-6 sm:p-7 shadow-[var(--shadow-whisper)] hover:border-border-strong transition-colors flex flex-col justify-between gap-5 focus-within:outline-2 focus-within:outline-trust focus-within:outline-offset-2 group">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="eyebrow-mono text-trust">
                  01 · Core Acquisition
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-kpi-positive metric-tabular">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Avg. -38.7% Cost per SQL
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="type-h3 text-ink">
                  <Link
                    href="/services#google-ads"
                    className="after:content-[''] after:absolute after:inset-0 focus:outline-none"
                  >
                    Google Ads &amp; Paid Search
                  </Link>
                </h3>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Intent-segmented Search, PMax, and LSA campaigns tied directly to offline CRM revenue—with zero broad-match bleed.
                </p>
              </div>

              {/* Clean CPA / SQL Micro-Ledger */}
              <div className="rounded-[12px] border border-border-hairline bg-canvas p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">
                    60 / 20 / 20 Query Control Ledger
                  </span>
                  <span className="tracking-id text-ink-muted">
                    tROAS · CRM VBB
                  </span>
                </div>
                <div className="divide-y divide-border-hairline rounded-[8px] border border-border-hairline bg-card text-xs metric-tabular">
                  {GOOGLE_ADS_LEDGER.map((row) => (
                    <div
                      key={row.segment}
                      className="px-3 py-2 flex items-center justify-between gap-2"
                    >
                      <span className="font-medium text-ink">{row.segment}</span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-ink-secondary">{row.cpql}</span>
                        <span className="font-semibold text-kpi-positive">
                          {row.delta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border-hairline flex items-center justify-between text-sm font-semibold text-trust">
              <span>Explore Google Ads</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-150 ease-[var(--ease-out-snappy)] motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </div>
          </li>

          {/* DOM #2 — 2x1 Tier-2 Pillar (6 cols x 1 row = 2 units, Top-Right) */}
          <li className="@container relative lg:col-span-6 lg:row-span-1 rounded-[20px] border border-border-hairline bg-card p-6 sm:p-7 shadow-[var(--shadow-whisper)] hover:border-border-strong transition-colors flex flex-col justify-between gap-4 focus-within:outline-2 focus-within:outline-trust focus-within:outline-offset-2 group">
            <div className="grid grid-cols-1 @sm:grid-cols-12 gap-4 items-center">
              <div className="@sm:col-span-7 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow-mono text-kpi-positive">
                    02 · Local Map Pack
                  </span>
                  <span className="text-xs font-semibold text-kpi-positive metric-tabular">
                    32% Local Pack Weight
                  </span>
                </div>
                <h3 className="type-h4 text-ink">
                  <Link
                    href="/services#local-seo"
                    className="after:content-[''] after:absolute after:inset-0 focus:outline-none"
                  >
                    Local SEO &amp; Google Business Profile
                  </Link>
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Category precision, Proof-of-Work service pages, and review velocity built for Map Pack &amp; AI local answers.
                </p>
              </div>

              {/* Compact Geo-Grid Visual */}
              <div className="@sm:col-span-5 rounded-[12px] border border-border-hairline bg-canvas p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="inline-flex items-center gap-1 font-semibold text-ink">
                    <MapPin className="w-3 h-3 text-kpi-positive" aria-hidden="true" />
                    Geo-Grid
                  </span>
                  <span className="font-bold text-kpi-positive metric-tabular">
                    {geoSummary.top3SharePct}% Top-3
                  </span>
                </div>
                <div
                  className="grid grid-cols-7 gap-1"
                  role="img"
                  aria-label={`Local Geo-Grid showing ${geoSummary.top3SharePct} percent Top-3 Map Pack coverage`}
                >
                  {COMPACT_GEO_PINS.map((rank, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-[4px] border flex items-center justify-center text-[10px] font-mono font-bold metric-tabular ${getPinStyle(
                        rank
                      )}`}
                    >
                      {rank}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-border-hairline flex items-center justify-between text-xs font-semibold">
              <span className="text-kpi-positive metric-tabular">
                ▲ +180% verified service calls
              </span>
              <span className="inline-flex items-center gap-1 text-trust">
                Explore Local SEO
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </div>
          </li>

          {/* DOM #3 — 2x1 Tier-2 Pillar (6 cols x 1 row = 2 units, Mid-Right, Dark Proof Surface) */}
          <li className="@container relative lg:col-span-6 lg:row-span-1 surface-dark rounded-[20px] border border-border-hairline p-6 sm:p-7 shadow-[var(--shadow-dark-edge)] hover:border-border-strong transition-colors flex flex-col justify-between gap-4 focus-within:outline-2 focus-within:outline-trust focus-within:outline-offset-2 group">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="eyebrow-mono text-kpi-positive">
                  03 · Phase 0 Attribution
                </span>
                <span className="tracking-id text-xs font-semibold text-kpi-positive">
                  +34.5%–70.5% Signal Recovery
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="type-h4 text-ink">
                  <Link
                    href="/services#tracking-architecture"
                    className="after:content-[''] after:absolute after:inset-0 focus:outline-none"
                  >
                    GA4 &amp; Server-Side GTM Tracking
                  </Link>
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  First-party subdomain containers and Consent Mode v2 reconciling real CRM receipts within 5% variance.
                </p>
              </div>

              {/* 3-Node Data-Flow Schematic */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="dark-panel rounded-[8px] px-2.5 py-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-trust shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-ink truncate">Click / Call</span>
                </div>
                <div className="dark-panel-elevated rounded-[8px] px-2.5 py-2 flex items-center gap-1.5 border-trust/40">
                  <Server className="w-3.5 h-3.5 text-kpi-positive shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-ink truncate">1P sGTM</span>
                </div>
                <div className="dark-panel rounded-[8px] px-2.5 py-2 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-kpi-positive shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-ink truncate">Ads + CRM</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-border-hairline flex items-center justify-between text-xs font-semibold">
              <span className="tracking-id text-ink-muted">
                SHA-256 Enhanced Conversions
              </span>
              <span className="inline-flex items-center gap-1 text-trust">
                Explore Tracking
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </div>
          </li>

          {/* DOM #4 — 1x1 Metric Only (3 cols x 1 row = 1 unit, Bottom-Left, Non-Interactive) */}
          <li className="lg:col-span-3 lg:row-span-1 rounded-[20px] border border-border-hairline bg-card p-6 sm:p-7 shadow-[var(--shadow-whisper)] flex flex-col justify-center gap-2">
            <span className="type-kpi-hero text-trust metric-tabular">
              92.4%
            </span>
            <p className="text-sm font-display font-bold text-ink leading-snug">
              Annual Client Retention Rate
            </p>
          </li>

          {/* DOM #5 — 2x1 Synergy (6 cols x 1 row = 2 units, Bottom-Center) */}
          <li className="relative lg:col-span-6 lg:row-span-1 rounded-[20px] border border-border-hairline bg-card p-6 sm:p-7 shadow-[var(--shadow-whisper)] hover:border-border-strong transition-colors flex flex-col justify-between gap-4 focus-within:outline-2 focus-within:outline-trust focus-within:outline-offset-2 group">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RefreshCw
                  className="w-4 h-4 text-trust shrink-0"
                  aria-hidden="true"
                />
                <span className="eyebrow-mono text-trust">
                  Closed-Loop Synergy
                </span>
              </div>
              <h3 className="type-h4 text-ink">
                <Link
                  href="#process"
                  className="after:content-[''] after:absolute after:inset-0 focus:outline-none"
                >
                  One Compounding Revenue Loop
                </Link>
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Server-side conversion signals train Google Smart Bidding on closed CRM deals while Map Pack review velocity lowers your paid acquisition cost.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-trust">
              <span>See our 30-60-90 rollout</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </div>
          </li>

          {/* DOM #6 — 1x1 High-Contrast Action Tile (3 cols x 1 row = 1 unit, Bottom-Right) */}
          <li className="relative lg:col-span-3 lg:row-span-1 surface-dark rounded-[20px] border border-border-hairline p-6 sm:p-7 shadow-[var(--shadow-dark-edge)] hover:border-trust transition-colors flex flex-col justify-between gap-4 focus-within:outline-2 focus-within:outline-trust focus-within:outline-offset-2 group">
            <div className="space-y-1.5">
              <span className="eyebrow-mono text-kpi-positive">
                Free 12-Min Audit
              </span>
              <h3 className="type-h4 text-ink">
                <Link
                  href="#free-audit-form"
                  className="after:content-[''] after:absolute after:inset-0 focus:outline-none"
                >
                  Find Your Biggest Revenue Leak
                </Link>
              </h3>
            </div>
            <span className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 py-2 rounded-[var(--radius-btn)] bg-cta text-cta-ink text-xs font-bold whitespace-nowrap">
              <span>Get Free Audit</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
