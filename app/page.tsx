import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Search,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Award,
  AlertCircle
} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import FAQAccordion from "@/components/FAQAccordion";
import CaseStudyCard from "@/components/CaseStudyCard";

export default function Home() {
  const problemPoints = [
    {
      icon: <AlertCircle className="w-8 h-8 text-brand-orange" aria-hidden="true" />,
      title: "Not getting qualified leads",
      description: "Your website exists, but it sits idle and does not drive actual customers or phone calls to your business."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-orange" aria-hidden="true" />,
      title: "Unsure if Ads or SEO actually work",
      description: "Uncertainty about Return on Investment (ROI) keeps you from scaling. You don't want to waste budget on empty clicks."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-orange" aria-hidden="true" />,
      title: "Juggling too many things already",
      description: "You don't have 20+ hours a month to learn complex digital marketing algorithms. You need to focus on running your business."
    }
  ];

  const steps = [
    {
      number: "01",
      icon: <Search className="w-6 h-6 text-brand-blue" aria-hidden="true" />,
      title: "Free Audit + Call",
      description: "We audit your current Google Ads account or Local SEO search footprint and walk you through 3 specific growth opportunities in a free 30-min call."
    },
    {
      number: "02",
      icon: <FileText className="w-6 h-6 text-brand-blue" aria-hidden="true" />,
      title: "Custom 90-Day Strategy",
      description: "If it's a mutual fit, we design a custom 90-day plan showing exactly what optimizations we'll make and the expected result milestones."
    },
    {
      number: "03",
      icon: <TrendingUp className="w-6 h-6 text-brand-blue" aria-hidden="true" />,
      title: "Results & Scale",
      description: "We execute the campaigns and optimization. You receive simplified, jargon-free monthly reports mapping traffic directly to revenue."
    }
  ];

  const caseStudies = [
    {
      slug: "ecommerce-store",
      businessType: "E-commerce Store (UK)",
      metric: "+247% sales growth",
      timeframe: "First 90 days",
      serviceUsed: "Google Ads",
      quote: "We went from 2-3 orders/week to 8-10. Wish we'd done this sooner."
    },
    {
      slug: "local-service",
      businessType: "HVAC Contractor (USA)",
      metric: "+180% phone calls",
      timeframe: "6 months",
      serviceUsed: "Local SEO",
      quote: "Customers started calling us saying they found us on Google Maps. Game-changer."
    },
    {
      slug: "saas-consulting",
      businessType: "SaaS/Consulting (Singapore)",
      metric: "$45K revenue generated",
      timeframe: "From cold start",
      serviceUsed: "Google Ads + Local SEO",
      quote: "They treated our account like their own. Results speak louder than promises."
    }
  ];

  const faqItems = [
    {
      question: "How long until I see results?",
      answer: "Google Ads campaigns can drive qualified leads in a matter of days or weeks as ads go live immediately. Local SEO is a long-term asset and typically requires 2 to 3 months of optimization before showing ranking jumps. We outline custom timelines during your free audit."
    },
    {
      question: "What if I don't have a Google Business Profile yet?",
      answer: "No problem at all. We will set up, verify, and fully optimize your Google Business Profile (formerly Google My Business) from scratch as a core component of our Local SEO services."
    },
    {
      question: "How is this different from doing it myself?",
      answer: "While you can manage search campaigns yourself, staying current with search algorithms, bid strategies, and tracking setups takes 20+ hours a month. We handle all technical execution, copywriting, and bidding configurations, optimizing campaigns daily for maximum return on spend."
    },
    {
      question: "What's your typical pricing?",
      answer: "Our fees are customized based on your business size, service area, and growth goals. We do not require long-term lock-in contracts, preferring to earn your business month-to-month. We provide transparent ballpark pricing during your free call."
    },
    {
      question: "Do you work with my specific industry?",
      answer: "We partner with any business that has customers searching on Google Search or Google Maps. This includes local home services, e-commerce stores, retail outlets, medical clinics, and B2B consulting firms."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-gradient-to-br from-brand-blue via-blue-950 to-slate-900 text-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Decorative Grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" aria-hidden="true"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-sm font-semibold text-brand-green border border-white/10">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Risk-Free 30-Min Strategy Session</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.1]">
                Turn Google Searchers Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-teal-400">Paying Customers</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We help small & medium businesses acquire qualified leads and increase revenue through expert Google Ads management and Local SEO. Claim your free audit to see what's possible.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Schedule Your Free Audit
                </CTAButton>
                <CTAButton href="/case-studies" variant="white" size="lg">
                  See Example Results
                </CTAButton>
              </div>

              {/* Quick trust micro-copy */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-blue-200 font-semibold pt-4">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-1.5" aria-hidden="true" /> 100% Free Strategy Session</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-1.5" aria-hidden="true" /> No Credit Card Required</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-1.5" aria-hidden="true" /> 3 Specific Growth Ideas</span>
              </div>
            </div>

            {/* Visual element / Interactive Mockup on the right */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
                <div className="absolute -top-3 -left-3 bg-brand-green text-brand-blue font-extrabold px-3 py-1 rounded-lg text-xs uppercase tracking-wide">
                  Live Case Study Preview
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-xs text-blue-200 font-bold tracking-wider uppercase">Local HVAC Client</span>
                    <span className="text-xs bg-brand-green/20 text-brand-green px-2 py-0.5 rounded font-bold">Local SEO</span>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold text-white tracking-tight">+180% More Calls</span>
                    <p className="text-sm text-blue-100 mt-1.5">Acquired from Google Maps local searches in 6 months.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center space-x-1.5 mb-2 text-brand-orange">
                      <Award className="w-4 h-4" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-wider">Financial Impact</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-sm text-blue-200 block">Additional Revenue</span>
                        <span className="text-xl font-bold text-brand-green">$23,800/mo</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-blue-200 block">Annual ROI</span>
                        <span className="text-xl font-bold text-white">15x</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/case-studies/local-service" className="flex items-center justify-center text-base font-bold text-brand-green hover:underline pt-2">
                    Read HVAC Case Study <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Statement Section */}
      <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
              Most Small Businesses Leave Money on the Table
            </h2>
            <p className="text-lg text-gray-600 font-normal">
              Getting customers from Google shouldn't feel like gambling. Here are the core challenges we solve:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemPoints.map((point, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="bg-brand-orange/10 p-3 rounded-xl w-fit">
                    {point.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue">{point.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{point.description}</p>
                </div>
                <div className="mt-6 text-brand-blue text-xs font-bold uppercase tracking-wider border-t border-gray-50 pt-4">
                  We solve this.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Overview (Equal Emphasis) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
              Two Paths to Dominate Google Search
            </h2>
            <p className="text-lg text-gray-600 font-normal">
              We leverage both immediate paid search leads and long-term organic local presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Google Ads */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue">Google Ads (Paid Search)</h3>
                  <span className="text-xs font-bold text-brand-blue bg-blue-100/60 px-3 py-1 rounded-full uppercase tracking-wider w-fit">Immediate Leads</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-base mb-6">
                  Get in front of buyer-intent searchers the moment they search for your products or services.
                </p>
                <ul className="space-y-3.5 mb-8">
                  {[
                    "Reach customers actively searching for what you offer",
                    "Only pay when people click your ad (PPC)",
                    "A/B testing, bid adjustment, and landing page audit included",
                    "Typical result: 3-5x ROI in 90 days"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-base text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-green mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
                <Link href="/services#google-ads" className="inline-flex items-center justify-center sm:justify-start text-base font-bold text-brand-blue hover:text-brand-orange transition-colors">
                  Learn More About Google Ads <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
                <CTAButton href="/contact" variant="outline" size="sm" className="w-full sm:w-auto">
                  Get Ads Audit
                </CTAButton>
              </div>
            </div>

            {/* Local SEO */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue">Local SEO & Maps</h3>
                  <span className="text-xs font-bold text-brand-green bg-green-100/60 px-3 py-1 rounded-full uppercase tracking-wider w-fit">Sustained Authority</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-base mb-6">
                  Secure premium positions in local map packs and organic searches for searchers in your geographic area.
                </p>
                <ul className="space-y-3.5 mb-8">
                  {[
                    "Rank for '[Your Service] near me' and localized terms",
                    "Google Business Profile setup, optimization, and monthly maintenance",
                    "Review management workflow and local citations building",
                    "Typical result: 2-3x local search impressions in 180 days"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-base text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-green mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
                <Link href="/services#local-seo" className="inline-flex items-center justify-center sm:justify-start text-base font-bold text-brand-blue hover:text-brand-orange transition-colors">
                  Learn More About Local SEO <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
                <CTAButton href="/contact" variant="outline" size="sm" className="w-full sm:w-auto">
                  Get SEO Audit
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
              A Direct, Transparent Process
            </h2>
            <p className="text-lg text-gray-600 font-normal">
              We skip the complex acronyms and long setup periods. Here is our simple three-step approach:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connector Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-12 z-0"></div>

            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs relative z-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl font-black text-brand-blue/10">{step.number}</span>
                    <div className="bg-blue-50 p-2.5 rounded-lg">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                </div>
                {index === 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-50">
                    <Link href="/contact" className="inline-flex items-center text-sm font-bold text-brand-orange hover:underline uppercase tracking-wider">
                      Book Your Free Audit Now <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue font-semibold text-base">
              Flexible commitments &bull; Results-based pricing &bull; Monthly billing
            </span>
          </div>
        </div>
      </section>

      {/* 5. Social Proof Section (Case Studies Preview) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
                Typical Results From Businesses Like Yours
              </h2>
              <p className="text-lg text-gray-600 font-normal">
                Review example case studies showcasing performance models across industries.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <CTAButton href="/case-studies" variant="outline">
                See All Case Studies
              </CTAButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                slug={study.slug}
                businessType={study.businessType}
                metric={study.metric}
                timeframe={study.timeframe}
                serviceUsed={study.serviceUsed}
                quote={study.quote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-12 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 font-normal">
              Everything you need to know about working with us.
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-blue to-blue-950 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0,transparent_60%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
            Ready to Grow Your Business From Google?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-normal">
            Book your free 30-min Google Ads + Local SEO audit. You get a personalized strategy document with 3 concrete growth ideas. No pressure, no obligations.
          </p>
          
          <div className="pt-4">
            <CTAButton href="/contact" variant="primary" size="lg" className="px-10 py-5 text-lg">
              Schedule Your Free Audit
            </CTAButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200 font-semibold pt-4">
            <span>&bull; 100% Free Strategy Session</span>
            <span>&bull; No Credit Card Required</span>
            <span>&bull; 30 Minutes of Pure Value</span>
          </div>
        </div>
      </section>
    </div>
  );
}
