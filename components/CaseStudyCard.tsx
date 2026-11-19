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
  bgColor = "bg-white",
}: CaseStudyCardProps) {
  return (
    <article
      className={`flex flex-col justify-between p-7 rounded-2xl border border-slate-200 transition-colors duration-150 hover:border-brand-blue/40 ${bgColor}`}
    >
      <div className="space-y-4">
        {/* Quiet unboxed metadata line */}
        <div className="text-xs font-medium text-slate-500">
          <span className="text-brand-green-hover font-semibold">{serviceUsed}</span>
          {region ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{region}</span>
            </>
          ) : null}
          <span aria-hidden="true"> · </span>
          <span className="tabular-nums">{timeframe}</span>
        </div>

        {/* Title & Metric */}
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold text-brand-blue">
            {businessType}
          </h3>
          <div className="text-3xl font-display font-extrabold text-slate-900 tracking-tight tabular-nums">
            {metric}
          </div>
        </div>

        {/* Clean quote without thick left border */}
        <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          &ldquo;{quote}&rdquo;
        </p>
        {quoteAuthor ? (
          <p className="text-xs text-slate-500 font-medium">— {quoteAuthor}</p>
        ) : null}
      </div>

      {/* Action Link */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          href={`/case-studies/${slug}`}
          className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors group"
        >
          View full case study
          <ArrowRight
            className="w-4 h-4 ml-1.5 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
