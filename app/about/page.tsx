import React from "react";
import { CheckCircle2, Search, Target, ShieldCheck, Compass } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-md">
            <Compass className="w-4 h-4 mr-1 text-brand-blue" />
            Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue tracking-tight leading-tight">
            We Help Small Businesses Grow From Google
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We're a lean team focused on one thing: getting SMBs real customers from Google Ads and Local Search. No fluff, no workshops—just results. That's it.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-16">
          
          {/* Section 1: Why We Do This */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-gray-100 pt-12">
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-blue uppercase tracking-wider">
                Why We Do This
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-gray-600 leading-relaxed text-base font-normal">
                We've seen too many small business owners throw money at marketing agencies that build complex, confusing funnels but deliver zero revenue. Google Ads and Local SEO work—when executed with precision. We handle the technical configurations, bidding structures, and keyword updates so you can focus on running your business.
              </p>
            </div>
          </div>

          {/* Section 2: How We Work */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-gray-100 pt-12">
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-blue uppercase tracking-wider">
                How We Work
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              {[
                { title: "Audit & Analysis", text: "We audit your current situation in a 30-minute free call to identify exactly where competitors are outperforming you." },
                { title: "Custom Strategy", text: "We draft a custom 90-day execution roadmap based on actual search volume and conversion data—never on general guesses." },
                { title: "Execute & Report Monthly", text: "We deploy the strategy, check keyword performance daily, and send clean, jargon-free monthly reports mapping traffic directly to leads." },
                { title: "Optimize & Pivot", text: "We adjust your bidding budgets weekly, scaling high-performing phrases and shifting capital away from poor matches." }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mr-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-brand-blue text-base">{step.title}</h4>
                    <p className="text-base text-gray-600 mt-1 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Who We Help */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-gray-100 pt-12 border-b border-gray-100 pb-12">
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-blue uppercase tracking-wider">
                Who We Help
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-gray-600 leading-relaxed text-base font-normal">
                We partner with established businesses with websites and/or Google Business Profiles that want to capture active demand. If your ideal customer is searching Google or looking at local maps to solve their problems, we can build the acquisition pipeline to reach them.
              </p>
            </div>
          </div>

          {/* Core CTA */}
          <div className="text-center pt-8 space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-blue">Want to See If We Can Help You?</h3>
            <p className="text-base text-gray-600 max-w-md mx-auto">
              Schedule a free 30-min audit session. We'll show you exactly how many people search for your services and how many leads you could capture.
            </p>
            <div className="pt-2">
              <CTAButton href="/contact" variant="primary" size="lg">
                Schedule Your Free Audit
              </CTAButton>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
