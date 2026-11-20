import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LeadGrow Agency handles audit submissions, website URLs, analytics, and your data privacy rights.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border-hairline pb-6 space-y-2">
          <h1 className="type-hero font-display font-extrabold text-ink">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono font-medium text-ink-muted">
            Last updated: November 2026
          </p>
        </div>

        <div className="text-base text-ink-secondary leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="type-h4 font-display font-bold text-ink">
              1. Information We Collect
            </h2>
            <p>
              We collect only the information you voluntarily submit when requesting a search leak audit or contacting our team, including your business name, work email address, website or Google Business Profile URL, and notes describing your marketing goals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h4 font-display font-bold text-ink">
              2. How We Use Your Information
            </h2>
            <p>
              We use submitted details strictly to prepare your diagnostic audit, respond to inquiries, and—if you engage our services—configure client-owned advertising and analytics properties. We never sell, rent, or broker client contact or performance data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h4 font-display font-bold text-ink">
              3. Client Data &amp; Platform Access
            </h2>
            <p>
              All Google Ads, Google Analytics, and Google Business Profile properties accessed during an audit or engagement remain legally owned by you under your business email. Read-only audit permissions can be revoked by you at any moment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h4 font-display font-bold text-ink">
              4. Data Deletion &amp; Contact
            </h2>
            <p>
              You may request deletion or export of any contact details held by LeadGrow Agency at any time by emailing{" "}
              <a
                href="mailto:audit@leadgrowagency.com"
                className="font-semibold text-trust hover:underline"
              >
                audit@leadgrowagency.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-border-hairline">
          <Link
            href="/"
            className="text-sm font-semibold text-trust hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
