import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 bg-canvas">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-14 h-14 rounded-bento bg-card border border-border-hairline shadow-whisper text-trust flex items-center justify-center mx-auto">
          <SearchX className="w-7 h-7" aria-hidden="true" />
        </div>
        <p className="eyebrow-mono text-ink-muted">HTTP 404 · Page Not Found</p>
        <h1 className="type-h2 font-display font-extrabold text-ink">
          That URL Doesn&apos;t Exist—But Your Ad Spend Leaks Might
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed">
          The page you requested may have moved or been archived. Return to the homepage or jump directly into our free 3-step website, tracking, and Google Ads teardown.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <CTAButton href="/contact" variant="primary" size="lg">
            Get Your Free Website Audit
          </CTAButton>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 min-h-12 px-5 py-3 rounded-btn border border-border-control bg-card text-ink hover:bg-subtle text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
