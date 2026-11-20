"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
  slug: string;
  businessType: string;
  region?: string;
  metric: string;
  timeframe: string;
  serviceUsed: string;
  quote: string;
  quoteAuthor?: string;
  bgColor?: string;
}

export default function CaseStudyCard({
  slug,
  businessType,
  region,
  metric,
  timeframe,
  serviceUsed,
  quote,
  quoteAuthor,
  bgColor = "bg-card",
}: CaseStudyCardProps) {
  return (
    <article
      className={`bento-card bento-card--interactive flex flex-col justify-between p-6 sm:p-8 ${bgColor}`}
    >
      <div className="space-y-4">
        {/* Quiet unboxed metadata line */}
        <div className="caption-meta font-medium text-ink-muted">
          <span className="text-kpi-positive font-semibold">{serviceUsed}</span>
          {region ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{region}</span>
            </>
          ) : null}
          <span aria-hidden="true"> · </span>
          <span className="tracking-id">{timeframe}</span>
        </div>

        {/* Title & Metric */}
        <div className="space-y-1">
          <h3 className="type-h4 text-trust">
            {businessType}
          </h3>
          <div className="type-kpi-card text-ink">
            {metric}
          </div>
        </div>

        {/* Clean quote without thick left border */}
        <p className="text-sm text-ink-secondary leading-relaxed pt-3 border-t border-border-hairline">
          &ldquo;{quote}&rdquo;
        </p>
        {quoteAuthor ? (
          <p className="caption-meta text-ink-muted font-medium">— {quoteAuthor}</p>
        ) : null}
      </div>

      {/* Action Link */}
      <div className="mt-6 pt-4 border-t border-border-hairline">
        <Link
          href={`/case-studies/${slug}`}
          className="inline-flex items-center min-h-11 text-sm font-semibold text-trust hover:text-trust-hover transition-colors group"
        >
          <span>View full case study</span>
          <ArrowRight
            className="w-4 h-4 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
