import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";

interface PricingTier {
  id: string;
  stageLabel: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  highlighted?: boolean;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
}

const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "foundation-sprint",
    stageLabel: "One-Time Project · Low-Friction Start",
    name: "Foundation Sprint",
    price: "$1,500 – $3,500",
    cadence: "2–3 week fixed deliverable",
    summary:
      "Repair broken attribution and seal obvious ad waste before committing to any monthly retainer.",
    bullets: [
      "Phase 0 GA4 + Server-Side Tag Gateway / sGTM & Consent Mode v2",
      "Dynamic call tracking & CRM GCLID revenue reconciliation",
      "Google Ads waste teardown + GBP category & geo-grid baseline",
      "100% implemented inside your own containers and accounts",
    ],
    ctaLabel: "Book Tracking Sprint",
    ctaHref: "/contact",
  },
  {
    id: "growth-engine",
    stageLabel: "Most Popular · Dedicated Senior Retainer",
    name: "Growth Engine",
    price: "From $1,100",
    cadence: "/ month flat fee ($650–$1,250 range)",
    summary:
      "Senior-led Google Ads OR GBP-First Local SEO engineered to lower CPQL and grow booked revenue.",
    highlighted: true,
    bullets: [
      "Zero-Waste Search & segmented PMax OR full GBP Map Pack engine",
      "Weekly manual search-term pruning & published Change Log",
      "Bi-weekly senior Loom video walkthrough + 1-page P&L scorecard",
      "Ongoing GA4/sGTM conversion parity monitoring included",
    ],
    ctaLabel: "Get My Free Audit",
    ctaHref: "#free-audit-form",
  },
  {
    id: "full-funnel-scale",
    stageLabel: "Integrated Anchor · Multi-Channel Scale",
    name: "Full-Funnel Scale",
    price: "From $2,250",
    cadence: "/ month flat fee ($1,450–$2,250 range)",
    summary:
      "Compound Google Ads, Local Map Pack dominance, CRM Value-Based Bidding, and 1:1 CRO together.",
    bullets: [
      "Unified Google Ads + GBP Local SEO + Server-Side CRM VBB",
      "Dedicated nav-free 1:1 landing pages & quarterly CRO sprints",
      "Multi-location geo-grid tracking & suspension defense protocol",
      "Quarterly Business Reviews tied to closed-won CRM revenue",
    ],
    ctaLabel: "Scope Custom Program",
    ctaHref: "/pricing",
  },
];

export default function HomepagePricingSection() {
  return (
    <section
      id="pricing"
      className="cv-auto py-16 md:py-24 bg-canvas border-b border-border-hairline scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow-mono text-trust">
              Transparent Pricing &amp; Engagement Anchors
            </p>
            <h2 className="type-h2 font-display font-bold text-ink">
              Flat Monthly Retainers—0% Ad-Spend Markup
            </h2>
            <p className="type-lead text-ink-secondary">
              You pay Google directly and own every account. Choose a one-time
              tracking sprint or a month-to-month performance retainer aligned
              strictly to qualified pipeline.
            </p>
          </div>
          <Link
            href="/pricing#roi-calculator"
            className="min-h-11 px-4 py-2.5 rounded-[var(--radius-btn)] border border-border-control bg-card text-sm font-semibold text-ink hover:border-trust hover:text-trust inline-flex items-center gap-1.5 self-start md:self-auto whitespace-nowrap transition-colors"
          >
            Open Ad-Waste &amp; ROI Calculator
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        {/* Clean 3-Column Comparison Grid + Zero-Gap Attached Risk-Reversal & Proof Band */}
        <div className="rounded-[var(--radius-bento)] border border-border-hairline bg-card overflow-hidden shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border-hairline">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-6 sm:p-8 flex flex-col justify-between gap-6 ${
                  tier.highlighted
                    ? "bg-trust-tint/45 relative"
                    : "bg-card"
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span
                      className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[var(--radius-badge)] border ${
                        tier.highlighted
                          ? "bg-trust text-white border-trust"
                          : "bg-canvas text-ink-muted border-border-hairline"
                      }`}
                    >
                      {tier.stageLabel}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-ink">
                      {tier.name}
                    </h3>
                    <div className="pt-1">
                      <span className="text-3xl font-display font-extrabold text-ink metric-tabular tracking-tight">
                        {tier.price}
                      </span>
                      <span className="block text-xs text-ink-muted mt-0.5">
                        {tier.cadence}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {tier.summary}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-border-hairline">
                    {tier.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-ink-secondary"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.ctaHref}
                  className={`w-full min-h-12 px-5 py-3 rounded-[var(--radius-btn)] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors ${
                    tier.highlighted
                      ? "bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink"
                      : "border border-border-control bg-card text-ink hover:border-trust hover:text-trust"
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          {/* Zero-Gap Friction-Adjacent Proof & Risk-Reversal Band (Directly Attached) */}
          <div className="border-t border-border-hairline bg-canvas p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-border-hairline">
              <div className="flex items-start gap-3 max-w-2xl">
                <ShieldCheck
                  className="w-5 h-5 text-kpi-positive shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm text-ink font-medium leading-relaxed">
                  <strong>Flat monthly retainer—0% ad-spend markup.</strong> You
                  pay Google directly and retain 100% Primary Ownership of every
                  ad account, Google Business Profile, and GTM container from day
                  one.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-ink-secondary">
                <span>$0 Setup Fees on Retainers</span>
                <span aria-hidden="true" className="text-border-control">
                  ·
                </span>
                <span>No 12-Month Lock-Ins</span>
                <span aria-hidden="true" className="text-border-control">
                  ·
                </span>
                <span>30-Day Notice</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border-hairline shrink-0">
                  <Image
                    src="/images/client-vp-portrait.jpg"
                    alt="David Miller, VP of Operations at LoneStar Cooling & Mechanical"
                    fill
                    sizes="56px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-ink leading-relaxed italic">
                    &ldquo;Our retainer paid for itself in the first 3 weeks just
                    from sealing wasted broad-match spend—then Map Pack calls
                    added $23,800/mo in booked HVAC dispatch jobs.&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-ink-muted">
                    David Miller · VP of Operations, LoneStar Cooling &amp;
                    Mechanical (Houston, TX)
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
                  <Star
                    className="w-4 h-4 fill-kpi-warning text-kpi-warning shrink-0"
                    aria-hidden="true"
                  />
                  <span className="metric-tabular">4.9★</span>
                  <span className="text-xs font-medium text-ink-secondary">
                    (111 Clutch, G2 &amp; Google Reviews)
                  </span>
                </div>
                <Link
                  href="/pricing"
                  className="text-xs font-semibold text-trust hover:text-cta inline-flex items-center gap-1 transition-colors"
                >
                  Compare full deliverables &amp; fee table
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
