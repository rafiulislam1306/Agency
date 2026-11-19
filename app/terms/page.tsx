import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Digital Bill of Rights",
  description:
    "LeadGrow Agency terms of service, 100% client asset ownership guarantee, and month-to-month cancellation policy.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
            Terms of Service &amp; Digital Bill of Rights
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Last updated: November 2026
          </p>
        </div>

        <div className="text-base text-slate-600 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-display font-bold text-slate-900">
              1. 100% Client Asset Ownership (Digital Bill of Rights)
            </h2>
            <p>
              Clients retain sole primary ownership of all domains, website hosting, Google Ads accounts, historical campaign data, negative keyword lists, Google Business Profiles, and Google Analytics properties. LeadGrow Agency operates strictly via delegated Manager or Editor permissions and never charges buyout or transfer fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-bold text-slate-900">
              2. Month-to-Month Terms &amp; Flat-Fee Billing
            </h2>
            <p>
              Unless explicitly superseded by a custom pilot agreement, management retainers operate month-to-month with a 30-day written cancellation notice and zero annual lock-in penalties. Media spend is billed directly by Google to the client&apos;s own payment method without agency markup.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-bold text-slate-900">
              3. Free Diagnostic Audits
            </h2>
            <p>
              Free 30-minute search and Map Pack audits carry zero purchase obligation. Recommendations and ROI models represent good-faith diagnostic estimates based on current account settings and public market data, not guarantees of third-party search engine rankings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-bold text-slate-900">
              4. Contact
            </h2>
            <p>
              Questions regarding these terms or client ownership clauses may be directed to{" "}
              <a
                href="mailto:audit@leadgrowagency.com"
                className="font-semibold text-brand-blue hover:underline"
              >
                audit@leadgrowagency.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <Link
            href="/"
            className="text-sm font-semibold text-brand-blue hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
