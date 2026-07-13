"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp } from "lucide-react";

interface CaseStudyCardProps {
  slug: string;
  businessType: string;
  metric: string;
  timeframe: string;
  serviceUsed: string;
  quote: string;
  bgColor?: string;
}

export default function CaseStudyCard({
  slug,
  businessType,
  metric,
  timeframe,
  serviceUsed,
  quote,
  bgColor = "bg-white",
}: CaseStudyCardProps) {
  return (
    <div
      className={`relative flex flex-col justify-between p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 ${bgColor}`}
    >
      {/* Template Tag */}
      <div className="absolute top-4 right-4 bg-brand-light text-brand-blue text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
        Template Example
      </div>

      <div>
        {/* Service Type Tag */}
        <div className="inline-flex items-center text-xs font-semibold text-brand-green bg-brand-green/10 rounded-md px-2.5 py-1 mb-4">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          {serviceUsed}
        </div>

        {/* Business Type */}
        <h3 className="text-xl font-bold text-brand-blue mb-2 group-hover:text-brand-blue-hover transition-colors">
          {businessType}
        </h3>

        {/* Metric */}
        <div className="text-3xl font-extrabold text-brand-green tracking-tight mb-1">
          {metric}
        </div>

        {/* Timeframe */}
        <div className="text-sm text-gray-500 mb-4 font-medium">
          Timeline: {timeframe}
        </div>

        {/* Client Quote */}
        <div className="relative pl-4 border-l-2 border-brand-orange/40 my-4 italic text-gray-600 text-sm leading-relaxed">
          <div className="absolute -left-1 -top-2 text-2xl text-brand-orange/20 select-none">“</div>
          &ldquo;{quote}&rdquo;
        </div>
      </div>

      {/* Action Link */}
      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        <Link
          href={`/case-studies/${slug}`}
          className="inline-flex items-center text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors cursor-pointer"
        >
          View Full Case Study
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
