import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { blogPlaybooks } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Playbooks & Resources | Zero-Waste Ads & Local SEO Guides",
  description:
    "Step-by-step checklists for sealing Google Ads budget leaks, ranking in the Google Maps 3-Pack, setting up closed-loop attribution, and protecting digital ownership.",
};

export default function BlogPage() {
  return (
    <div className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div data-cta-sentinel="hero" className="max-w-3xl space-y-4">
          <p className="eyebrow-mono text-trust">
            SMB Field Playbooks · Actionable Checklists
          </p>
          <h1 className="type-hero font-display font-bold text-ink">
            Practical Guides to Stop Wasting Search Budget
          </h1>
          <p className="type-lead text-ink-secondary">
            No fluff or theory. Read the exact leak-sealing, Google Business Profile, attribution, and asset-ownership checklists we run for every client.
          </p>
        </div>

        {/* Playbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPlaybooks.map((post) => (
            <article
              key={post.slug}
              className="bento-card bento-card--interactive flex flex-col justify-between p-7"
            >
              <div className="space-y-3">
                <div className="eyebrow-mono text-ink-muted">
                  <span className="text-kpi-positive font-semibold">
                    {post.category}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{post.updatedAt}</span>
                </div>

                <h2 className="text-xl font-display font-bold text-ink leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-trust transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-ink-secondary leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-hairline">
                <Link
                  href={`/blog/${post.slug}`}
                  className="min-h-11 inline-flex items-center text-sm font-semibold text-trust hover:text-cta transition-colors group"
                >
                  Read full checklist
                  <ArrowRight
                    className="w-4 h-4 ml-1.5 transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Block */}
        <div
          data-cta-sentinel="footer-cta"
          className="bento-card p-8 sm:p-10 text-center space-y-4"
        >
          <h3 className="text-2xl font-display font-bold text-ink">
            Want Us to Run These Checklists on Your Live Account?
          </h3>
          <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto">
            Book a 30-minute diagnostic call and we will audit your Google Ads settings and Google Business Profile with you live.
          </p>
          <div className="pt-2">
            <CTAButton href="/contact" variant="primary" size="lg">
              Schedule Free Leak Audit
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
