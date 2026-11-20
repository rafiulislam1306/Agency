import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import FAQAccordion from "@/components/FAQAccordion";
import ROICalculator from "@/components/ROICalculator";
import {
  pricingPlans,
  digitalBillOfRights,
  marketModelComparisons,
} from "@/lib/agencyData";
import { TRACKING_TIERS } from "@/lib/trackingLogic";

export const metadata: Metadata = {
  title: "Flat-Fee Pricing | Zero % of Spend & Month-to-Month Terms",
  description:
    "Transparent flat monthly retainers with zero percentage-of-spend markups, zero 12-month lock-ins, a 90-day ROI benchmark, and 100% client asset ownership.",
};

export default function PricingPage() {
  const pricingFaqs = [
    {
      question: "Why don't you charge a percentage of my Google Ad spend?",
      answer:
        "Charging 15–25% of ad spend misaligns incentives—it rewards an agency for telling you to spend more even when your margins drop. Our flat monthly retainer stays predictable so our only lever to keep you as a client is profitable growth.",
    },
    {
      question: "Are there any 12-month lock-in contracts or setup hostages?",
      answer:
        "Never. Every engagement is month-to-month with a 30-day cancellation notice and an agreed 90-day ROI benchmark. Under our Digital Bill of Rights, your card pays Google directly and you remain Primary Owner of every account from day one.",
    },
    {
      question: "How do I know work is actually happening after Month 1?",
      answer:
        "Every client receives a weekly Account Change Log showing exact search terms pruned, negative keywords added, GBP media uploaded, and conversion updates—never a 'set and forget' retainer.",
    },
    {
      question: "What determines where my flat fee falls within the range?",
      answer:
        "Scope depends on service zip-code competition, number of service lines/campaigns, and whether you operate a single location or multiple branches. We confirm your exact flat retainer in writing during your free audit.",
    },
    {
      question: "Can we start with a standalone Phase 0 Tracking Audit & Repair Sprint first?",
      answer:
        "Yes. If you want proof on your own ledger before committing to an ongoing monthly retainer, we offer a standalone Phase 0 Tracking Sprint ($1,500–$7,500 setup right-sized to your monthly ad spend). We reconcile your bank/CRM receipts against Google Ads, fix duplicate tags, deploy Tag Gateway or same-origin sGTM, and verify Enhanced Conversions match rates—reaching full payback in 0.8 to 5.0 months.",
    },
  ];

  return (
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div
          data-cta-sentinel="hero"
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <p className="eyebrow-mono text-trust">
            Flat-Fee Accountability · 0% of Ad Spend · No Annual Lock-Ins
          </p>
          <h1 className="type-hero font-display font-bold text-ink">
            Flat Monthly Retainers Aligned With Your Profit—Not Your Ad Spend
          </h1>
          <p className="type-lead text-ink-secondary mx-auto">
            Traditional agencies charge percentages of spend and lock you into 12-month contracts. We charge one flat monthly rate, work month-to-month, and put every account in your legal ownership.
          </p>
        </div>

        {/* 3 Flat-Fee Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {pricingPlans.map((plan) => {
            const isHighlighted = Boolean(plan.highlighted);
            return (
              <div
                key={plan.id}
                className={`rounded-[var(--radius-bento)] p-7 sm:p-8 flex flex-col justify-between border ${
                  isHighlighted
                    ? "surface-dark bg-canvas text-ink border-border-hairline shadow-[var(--shadow-dark-edge)]"
                    : "bg-card text-ink border-border-hairline shadow-[var(--shadow-whisper)]"
                }`}
              >
                <div className="space-y-6">
                  <div className="pb-6 border-b border-border-hairline space-y-2">
                    <p
                      className={`eyebrow-mono ${
                        isHighlighted ? "text-kpi-positive" : "text-trust"
                      }`}
                    >
                      {plan.tag} · {plan.billingModel}
                    </p>
                    <h2 className="text-2xl font-display font-bold text-ink">
                      {plan.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {plan.subtitle}
                    </p>
                  </div>

                  <div>
                    <div className="type-kpi-card text-ink">
                      {plan.flatFee}
                    </div>
                    <p className="text-xs mt-1.5 leading-relaxed text-ink-muted">
                      {plan.adSpendNote}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-ink-secondary"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-8 border-t border-border-hairline space-y-4">
                  <p className="text-xs leading-relaxed text-ink-secondary">
                    <strong className="font-semibold text-ink">Accountability:</strong>{" "}
                    {plan.accountabilityGuarantee}
                  </p>
                  <CTAButton
                    href="/contact"
                    variant={isHighlighted ? "dark-primary" : "primary"}
                    fullWidth
                  >
                    Book Free Audit &amp; Scope Quote
                  </CTAButton>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive ROI & Break-Even Calculator (Granular Suspense boundary for selective hydration) */}
        <Suspense
          fallback={
            <div
              aria-busy="true"
              className="bento-card min-h-[540px] p-8 animate-pulse bg-subtle/60"
            />
          }
        >
          <ROICalculator />
        </Suspense>

        <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="eyebrow-mono text-kpi-positive">
              Local Service Businesses · 42% Map Pack Click Share
            </p>
            <p className="text-sm font-medium text-ink">
              Want to model how much monthly revenue you lose sitting at Rank #8 vs. the Google Maps 3-Pack?
            </p>
          </div>
          <CTAButton href="/services#map-pack-calculator" variant="outline" size="sm">
            Open Map Pack Missed Revenue Model
          </CTAButton>
        </div>

        {/* Standalone Phase 0: Tracking Audit & Repair Sprint */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <p className="eyebrow-mono text-trust">
                Standalone Diagnostic Option · Zero Retainer Required
              </p>
              <h2 className="type-h2 font-display font-bold text-ink">
                Phase 0: Conversion Tracking Audit &amp; Repair Sprint
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Not ready for a monthly retainer? Fix the broken cash register first. Right-sized to your monthly ad spend, every tier reaches full payback in 0.8 to 5.0 months under conservative 10%–20% ad-efficiency gains.
              </p>
            </div>
            <CTAButton href="/services#signal-loss-calculator" variant="outline" size="sm">
              Model Your Signal Loss &amp; Payback
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TRACKING_TIERS.map((tier, idx) => {
              const paybackLabels = [
                "2.5–5.0 mo payback · 140%–380% 12m ROI",
                "1.3–2.8 mo payback · 167%–434% 12m ROI",
                "0.8–1.7 mo payback · 308%–716% 12m ROI",
              ];
              return (
                <div
                  key={tier.id}
                  className="p-6 bento-card flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <p className="eyebrow-mono text-trust">
                      {tier.spendBand}
                    </p>
                    <h3 className="text-lg font-display font-bold text-ink">
                      {tier.name}
                    </h3>
                    <div className="metric-tabular">
                      <span className="type-kpi-card text-ink">
                        ${tier.setupFee.toLocaleString()} setup
                      </span>
                      <span className="block text-xs text-ink-muted mt-0.5">
                        ${tier.annualTco.toLocaleString()} 12-month TCO ($
                        {tier.monthlyInfraCost}/mo infra · $
                        {tier.monthlyMaintenanceCost}/mo QA)
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-ink bg-canvas border border-border-hairline rounded-[var(--radius-btn)] p-3 leading-relaxed">
                      {tier.recommendedStack}
                    </p>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {tier.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-hairline space-y-3">
                    <p className="text-xs font-semibold text-kpi-positive metric-tabular">
                      ▲ {paybackLabels[idx]}
                    </p>
                    <CTAButton href="/contact" variant="outline" size="sm" fullWidth>
                      Request Phase 0 Tracking Audit
                    </CTAButton>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Traditional Pricing Models Break Down */}
        <section className="cv-auto space-y-6">
          <div className="max-w-3xl space-y-2">
            <p className="eyebrow-mono text-cta">
              2026 Agency Market Comparison
            </p>
            <h2 className="type-h2 font-display font-bold text-ink">
              Why Keyword-Only &amp; Percentage-of-Spend Retainers Fail
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              With Google automating micro-bidding, paying an agency simply to pull keyword levers—or paying 15% of ad spend without landing page CRO and CRM attribution—leaves money on the table.
            </p>
          </div>

          <div className="space-y-2">
            <p className="md:hidden caption-meta font-semibold text-ink-muted text-right">
              Scroll horizontally to compare →
            </p>
            <div className="overflow-x-auto bento-card">
              <table className="min-w-full divide-y divide-border-hairline text-sm">
                <thead className="bg-subtle text-ink">
                  <tr>
                    <th
                      scope="col"
                      className="sticky left-0 z-10 bg-subtle border-r border-border-hairline px-5 sm:px-6 py-4 text-left font-bold min-w-[148px]"
                    >
                      Agency Model
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-bold">
                      Typical Cost
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-bold">
                      Structural Flaw
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-bold">
                      LeadGrow Standard
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-hairline bg-card">
                  {marketModelComparisons.map((row) => (
                    <tr key={row.model}>
                      <td className="sticky left-0 z-10 bg-card border-r border-border-hairline px-5 sm:px-6 py-4 font-semibold text-ink">
                        {row.model}
                      </td>
                      <td className="px-6 py-4 text-ink-secondary metric-tabular whitespace-nowrap">
                        {row.typicalCost}
                      </td>
                      <td className="px-6 py-4 text-ink-secondary">
                        {row.hiddenFlaw}
                      </td>
                      <td className="px-6 py-4 font-semibold text-kpi-positive">
                        ▲ {row.leadGrowDifference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Included Digital Bill of Rights */}
        <section className="bento-card p-7 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <p className="eyebrow-mono text-trust">
              Included With Every Plan
            </p>
            <h2 className="type-h2 font-display font-bold text-ink">
              The Digital Bill of Rights
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              We earn your business every month through verified revenue—never by locking your accounts under agency emails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {digitalBillOfRights.map((item) => (
              <div
                key={item.asset}
                className="bg-canvas p-5 rounded-[var(--radius-tile)] border border-border-hairline space-y-1.5"
              >
                <h3 className="text-sm font-display font-bold text-ink">
                  {item.asset}
                </h3>
                <p className="text-xs font-semibold text-kpi-positive">
                  {item.owner}
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {item.guarantee}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section data-cta-sentinel="footer-cta" className="cv-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="type-h2 font-display font-bold text-ink">
              Pricing &amp; Contract FAQs
            </h2>
            <p className="text-sm text-ink-secondary">
              Clear answers about flat retainers, ad spend ownership, and cancellation terms.
            </p>
          </div>
          <FAQAccordion items={pricingFaqs} />
        </section>
      </div>
    </div>
  );
}
