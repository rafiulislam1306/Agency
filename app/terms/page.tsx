import React from "react";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-brand-blue mx-auto" aria-hidden="true" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: July 2026</p>
        </div>

        <div className="prose prose-blue text-base text-gray-600 leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">2. Free Audit & Consultation Scope</h2>
            <p>
              The Google Ads and Local SEO audits offered through this website are 100% free and carry no active purchase obligation. Audits represent structural diagnostic recommendations based on public search footprints and are not guarantees of future ranking gains.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">3. Intellectual Property</h2>
            <p>
              All branding elements, layout designs, and text copy on this site are the intellectual property of LeadGrow Agency. Copying, republishing, or mimicking design schemes for other commercial marketing agencies is prohibited without consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">4. Contact Information</h2>
            <p>
              If you have any questions regarding these terms, you may contact us directly at{" "}
              <a href="mailto:contact@leadgrowagency.com" className="font-semibold text-brand-blue hover:underline">
                contact@leadgrowagency.com
              </a>.
            </p>
          </section>
        </div>

        <div className="text-center pt-8 border-t border-gray-100">
          <Link href="/" className="text-sm font-bold text-brand-blue hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
