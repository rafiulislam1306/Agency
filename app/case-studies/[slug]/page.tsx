import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Lightbulb,
  DollarSign
} from "lucide-react";
import { caseStudiesData } from "@/lib/caseStudiesData";
import CTAButton from "@/components/CTAButton";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudiesData[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-blue transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Case Studies
          </Link>
        </div>

        {/* Template Notification */}
        <div className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center space-x-3 text-amber-800">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            [TEMPLATE EXAMPLE - Results may vary based on industry and market]
          </span>
        </div>

        {/* Header Block */}
        <div className="border-b border-gray-100 pb-8 mb-10 space-y-4">
          <div className="inline-flex items-center text-xs font-bold text-brand-green bg-brand-green/10 rounded-md px-3 py-1">
            {study.serviceUsed}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue tracking-tight leading-tight">
            {study.businessType}
          </h1>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 font-semibold pt-2">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-brand-orange" /> Duration: {study.timeframe}</span>
            <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-brand-green" /> Goal: {study.goal}</span>
          </div>
        </div>

        {/* Highlight Metric Card */}
        <div className="bg-gradient-to-r from-brand-blue to-blue-950 rounded-2xl p-8 text-white mb-12 flex flex-col sm:flex-row justify-between items-center relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_60%)]"></div>
          <div className="relative z-10 space-y-1 text-center sm:text-left mb-6 sm:mb-0">
            <span className="text-xs text-blue-200 uppercase font-extrabold tracking-widest block">Primary Metric Achieved</span>
            <span className="text-3xl sm:text-4xl font-black text-brand-green tracking-tight">{study.metric}</span>
          </div>
          <div className="relative z-10">
            <CTAButton href="/contact" variant="white">
              Schedule Your Free Audit
            </CTAButton>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-12">
          
          {/* 1. Situation */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue flex items-center">
              The Situation
            </h2>
            <p className="text-gray-600 leading-relaxed text-base font-normal">
              {study.situation}
            </p>
          </div>

          {/* 2. What We Did */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue">
              Our Action Plan
            </h2>
            <div className="space-y-4">
              {study.whatWeDid.map((action, idx) => (
                <div key={idx} className="flex items-start bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-4 mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed font-normal">{action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. The Results */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue">
              The Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {study.results.map((result, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-5 bg-white shadow-xs">
                  <span className="text-sm text-gray-500 font-bold uppercase tracking-wider block">{result.label}</span>
                  <span className="text-xl font-extrabold text-brand-green block mt-1">{result.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Financial Impact (Conditionally Rendered for HVAC/Local SEO) */}
          {study.financialImpact && (
            <div className="bg-green-50/40 border border-green-100 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-extrabold text-brand-blue flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-brand-green" /> Detailed Financial Impact
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <span className="text-sm text-gray-500 font-bold block">Avg. Job Value</span>
                  <span className="text-lg font-bold text-brand-blue">{study.financialImpact.avgJobValue}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 font-bold block">Previous GBP Rev</span>
                  <span className="text-lg font-bold text-gray-500">{study.financialImpact.previousRevenue}/mo</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 font-bold block">Current GBP Rev</span>
                  <span className="text-lg font-bold text-brand-green">{study.financialImpact.currentRevenue}/mo</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 font-bold block">Net Increase</span>
                  <span className="text-lg font-bold text-brand-green">{study.financialImpact.additionalRevenue}/mo</span>
                </div>
              </div>
              <div className="border-t border-green-200/50 pt-4 flex flex-col sm:flex-row justify-between items-center gap-y-2">
                <span className="text-sm font-semibold text-gray-600">Calculated Annual Growth Revenue Impact:</span>
                <span className="text-xl font-black text-brand-green">{study.financialImpact.annualImpact}</span>
              </div>
            </div>
          )}

          {/* 5. Blockquote */}
          <div className="bg-gray-50 border-l-4 border-brand-orange rounded-r-2xl p-8 italic relative">
            <span className="absolute left-4 top-2 text-5xl text-brand-orange/15 select-none font-serif">&ldquo;</span>
            <p className="text-gray-600 leading-relaxed font-semibold text-base mb-4 relative z-10">
              {study.quote}
            </p>
            <cite className="text-xs text-gray-500 uppercase tracking-wider font-extrabold not-italic block">
              &mdash; {study.quoteAuthor}
            </cite>
          </div>

          {/* 6. Key Learnings */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-brand-orange" /> Key Takeaways
            </h2>
            <ul className="space-y-3">
              {study.keyLearnings.map((learning, idx) => (
                <li key={idx} className="flex items-start text-base text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-brand-green mr-3 flex-shrink-0 mt-0.5" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Footer CTA Block */}
          <div className="border-t border-gray-100 pt-12 text-center space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-blue">What is possible for your business?</h3>
            <p className="text-gray-600 text-base max-w-lg mx-auto font-normal">
              {study.nextStepsText}
            </p>
            <div className="pt-2">
              <CTAButton href="/contact" variant="primary" size="lg">
                {study.ctaLabel}
              </CTAButton>
            </div>
            <p className="text-sm text-gray-400">
              *Disclaimer: Example case studies represent typical results. Your results will vary depending on your starting baseline, industry competition, and local market size.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
