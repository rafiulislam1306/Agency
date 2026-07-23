import React from "react";
import { CheckCircle2, DollarSign, Calendar, ChevronRight, HelpCircle } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import FAQAccordion from "@/components/FAQAccordion";

export default function PricingPage() {
  const adsFeatures = [
    "Campaign setup & ad copy design",
    "Keyword match-type optimizations",
    "Daily bid adjustments",
    "Conversion pixel tracking audit",
    "Weekly negative keyword reviews",
    "Jargon-free monthly reports"
  ];

  const seoFeatures = [
    "Google Business Profile optimization",
    "Local directory synchronization (20+ local citations)",
    "On-page local keyword optimization",
    "Review acquisition funnel configuration",
    "Local map pack rank monitoring",
    "Competitor footprint reviews"
  ];

  const pricingFactors = [
    { title: "Geographic Scope", desc: "Targeting a single local town is far less competitive than national or international keyword bidding." },
    { title: "Industry Competition", desc: "Certain categories (such as legal, finance, or HVAC) carry higher CPCs (cost-per-click) than local salons or e-commerce niches." },
    { title: "Campaign Ad Budgets", desc: "Managing higher ad volumes requires deeper manual monitoring, negative reviews, and more creative refreshes." },
    { title: "Current Search Presence", desc: "If you have a mature Google Business Profile, initial ranking setups take less time than launching a new brand." }
  ];

  const pricingFaqs = [
    {
      question: "Do you require long-term contracts?",
      answer: "No. We believe in earning your business month-to-month. There are no lock-in terms, and you can pause or cancel your management services with a 30-day notice."
    },
    {
      question: "What if the results don't meet expectations?",
      answer: "We inspect conversion patterns and search queries daily. If a specific campaign does not drive leads after 60 days, we pivot the target keywords or stop the campaign entirely to save your budget."
    },
    {
      question: "Can I start with a small budget?",
      answer: "Absolutely. We often recommend small businesses start with a budget of $500/month in Google Ads or a basic Local SEO map setup. You can scale up the investments once search results prove positive ROI."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-md">
            <DollarSign className="w-4 h-4 mr-1 text-brand-blue" aria-hidden="true" />
            Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue tracking-tight leading-tight">
            Custom Pricing Based on Your Situation
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            We don't have rigid, pre-packaged tiers because every market is different. We structure pricing around what will actually get you results.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          
          {/* Card 1: Google Ads */}
          <div className="border border-gray-100 rounded-3xl p-8 bg-white shadow-xs flex flex-col justify-between hover:border-brand-blue/30 transition-all duration-300">
            <div>
              <div className="border-b border-gray-100 pb-6 mb-6">
                <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider block w-fit mb-3">Google Ads</span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue">Paid Search Management</h3>
              </div>
              <ul className="space-y-3 mb-8">
                {adsFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-base text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-green mr-2.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-wider block">Typical Investment</span>
                <span className="text-lg font-bold text-brand-blue block mt-1">
                  $500 - $5,000/mo ad spend
                </span>
                <span className="text-sm text-gray-500 italic block mt-0.5">
                  + management fee (typically 15-25% of spend)
                </span>
              </div>
              <div className="bg-brand-blue/5 p-4 rounded-xl text-sm text-gray-600 font-medium">
                <span className="font-bold text-brand-blue block mb-1">Better Question:</span>
                &ldquo;What is your budget? We will design a strategy that works within it.&rdquo;
              </div>
              <CTAButton href="/contact" variant="primary" fullWidth>
                Book Free Audit to Discuss
              </CTAButton>
            </div>
          </div>

          {/* Card 2: Local SEO */}
          <div className="border border-gray-100 rounded-3xl p-8 bg-white shadow-xs flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
            <div>
              <div className="border-b border-gray-100 pb-6 mb-6">
                <span className="text-xs font-bold text-brand-green bg-green-50 px-2.5 py-1 rounded-md uppercase tracking-wider block w-fit mb-3">Local SEO</span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue">Maps & Organic Authority</h3>
              </div>
              <ul className="space-y-3 mb-8">
                {seoFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-base text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-green mr-2.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-wider block">Typical Investment</span>
                <span className="text-lg font-bold text-brand-blue block mt-1">
                  $500 - $2,000/mo retainer
                </span>
                <span className="text-sm text-gray-500 italic block mt-0.5">
                  (varies by local market competition)
                </span>
              </div>
              <div className="bg-brand-green/5 p-4 rounded-xl text-sm text-gray-600 font-medium">
                <span className="font-bold text-brand-green block mb-1">Better Question:</span>
                &ldquo;What is your service area? We will give you a realistic local estimate.&rdquo;
              </div>
              <CTAButton href="/contact" variant="primary" fullWidth>
                Book Free Audit to Discuss
              </CTAButton>
            </div>
          </div>

          {/* Card 3: Combined */}
          <div className="border border-brand-orange/20 rounded-3xl p-8 bg-slate-900 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-orange text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-bl-xl">
              Best Value
            </div>
            <div>
              <div className="border-b border-white/10 pb-6 mb-6">
                <span className="text-xs font-bold text-brand-orange bg-brand-orange/20 px-2.5 py-1 rounded-md uppercase tracking-wider block w-fit mb-3">Combined System</span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">Full Search Dominance</h3>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed mb-6 font-medium">
                Our combined system blends the immediate customer acquisition of Google Ads with the compounding, zero-cost map clicks of Local SEO. 
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "All features of Paid Search Management",
                  "All features of Maps & Organic SEO",
                  "Bundled, cost-effective pricing structure",
                  "Unified performance dashboard",
                  "Synced keyword target sharing"
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-start text-base text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-brand-green mr-2.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div>
                <span className="text-sm text-blue-300 font-bold uppercase tracking-wider block">Typical Investment</span>
                <span className="text-lg font-bold text-white block mt-1">
                  Custom Bundled Plan
                </span>
                <span className="text-sm text-blue-200 italic block mt-0.5">
                  Get discounted management fees when combined.
                </span>
              </div>
              <CTAButton href="/contact" variant="primary" fullWidth>
                Book Free Audit to Discuss
              </CTAButton>
            </div>
          </div>

        </div>

        {/* Pricing Factors Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">What Determines Your Price?</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto font-normal">
                We design quotes after evaluating your current search footprint. Here are the core variables we analyze:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingFactors.map((factor, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base mb-2">{factor.title}</h4>
                  <p className="text-base text-gray-600 leading-relaxed">{factor.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10 text-center text-sm text-gray-500">
              <strong className="text-brand-blue font-bold block mb-1">Why don't we list static pricing?</strong>
              What works for a local suburban plumber ($800/mo) won't deliver results for a metropolitan HVAC firm ($3,000/mo). We prefer providing honest numbers specific to your target geography.
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">Pricing FAQs</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Common questions regarding our billing, agreements, and trial terms.
            </p>
          </div>
          <FAQAccordion items={pricingFaqs} />
        </section>

        {/* Final CTA */}
        <section className="text-center pt-8 border-t border-gray-100 space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-blue">Get a Ballpark Price for Your Market</h3>
          <p className="text-gray-600 text-base max-w-md mx-auto">
            Book a free audit. We'll run competitor budgets and show you exactly what budget fits your growth targets.
          </p>
          <div className="pt-2">
            <CTAButton href="/contact" variant="primary" size="lg">
              Schedule Your Free Audit Call
            </CTAButton>
          </div>
        </section>

      </div>
    </div>
  );
}
