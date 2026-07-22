import React from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudiesData } from "@/lib/caseStudiesData";
import CTAButton from "@/components/CTAButton";

export default function CaseStudiesPage() {
  const studies = Object.values(caseStudiesData);

  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-md">
            <TrendingUp className="w-4 h-4 mr-1 text-brand-blue" />
            Proven Frameworks
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue tracking-tight leading-tight">
            See Real Results from Businesses Like Yours
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            Below are example case studies showing typical results. Your results will vary based on your industry, budget, and starting point. Book a free audit to discuss what's realistic for your business.
          </p>
        </div>

        {/* Templates Disclaimer Banner */}
        <div className="max-w-3xl mx-auto mb-12 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start space-x-3 text-amber-800">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed font-normal">
            <strong className="block font-bold mb-1 uppercase tracking-wider">Example Templates Notice:</strong>
            The client scenarios listed below represent typified performance matrices based on our client experiences. They are provided as illustrative frameworks of what we can achieve for your business. Specific campaign numbers will vary depending on localized search competition, bidding markets, and seasonal factors.
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {studies.map((study) => (
            <CaseStudyCard
              key={study.slug}
              slug={study.slug}
              businessType={study.businessType}
              metric={study.metric}
              timeframe={study.timeframe}
              serviceUsed={study.serviceUsed}
              quote={study.quote}
            />
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-blue to-blue-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_60%)]"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold">Ready to Outline Your Growth Strategy?</h3>
            <p className="text-blue-100 text-base max-w-xl mx-auto leading-relaxed font-normal">
              We will pull active competitor budgets, keyword click costs, and local map rankings in your service market to design a custom 90-day plan.
            </p>
            <div className="pt-4">
              <CTAButton href="/contact" variant="primary" size="lg">
                Schedule Your Free Search Audit
              </CTAButton>
            </div>
            <p className="text-sm text-blue-200 pt-2 font-normal">
              *These results are real but not guaranteed. Your results depend on your industry, competition, budget, and implementation quality.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
