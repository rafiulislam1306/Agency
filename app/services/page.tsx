import React from "react";
import {
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Target,
  BarChart3,
  Search,
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function ServicesPage() {
  const googleAdsBullets = [
    { title: "Keyword Research", desc: "We identify terms with buying intent, eliminating wasted spend on informational searches." },
    { title: "Ad Copywriting & Design", desc: "Compelling text and visual ads that stand out from competitors and secure higher click rates." },
    { title: "Landing Page Strategy", desc: "A detailed layout review or creation of custom high-converting landing pages to secure leads." },
    { title: "Bid & Budget Management", desc: "Automated and manual bid adjustments to ensure your ads appear in top positions without overpaying." },
    { title: "Continuous A/B Testing", desc: "Testing ad copy, audiences, and designs weekly to iteratively reduce your cost-per-lead." },
    { title: "ROI Reporting Dashboard", desc: "Know exactly how much revenue each dollar of ad spend generated. No confusing traffic vanity metrics." }
  ];

  const localSeoBullets = [
    { title: "Google Business Profile (GBP)", desc: "Complete optimization of your GBP, including category refinement, photo additions, and services mapping." },
    { title: "Local Citations Building", desc: "We register and synchronize your Business Name, Address, and Phone (NAP) across 20+ top business directories." },
    { title: "On-Page Local SEO", desc: "Integrating geographic and service keywords naturally into your website structure to rank organically." },
    { title: "Review Management System", desc: "An automated feedback pipeline to generate and display positive Google reviews from your happy clients." },
    { title: "Local Link Authority", desc: "Securing references and mentions from local media and community sites to signal trust to Google." },
    { title: "Local Rank Tracker", desc: "Visual grid map reports showing exactly how your business ranks in Google Maps across your city." }
  ];

  const adsTimeline = [
    { period: "Week 1-2", title: "Audit & Strategy Setup", desc: "Competitor analysis, keyword gathering, campaign architecture, and tracking configurations." },
    { period: "Week 3-4", title: "Campaign Launch", desc: "Ads go live. Immediate visibility, real-time bid checking, and early negative keyword additions." },
    { period: "Month 2-3", title: "Optimization & Scaling", desc: "A/B testing, targeting refinement, and funnel adjustments to stabilize cost-per-lead." },
    { period: "Month 4+", title: "Profit Maximization", desc: "Scaling budgets on top performers, expanding into secondary search categories, and maximizing ROI." }
  ];

  const seoTimeline = [
    { period: "Month 1", title: "Foundation & GBP Setup", desc: "Detailed technical audit, keyword mapping, profile optimization, and initial citation submission." },
    { period: "Month 2-3", title: "Review Pipeline & Citations", desc: "Deploying review generation workflows, adding local directory listings, and publishing local page content." },
    { period: "Month 4-6", title: "Authority & Ranking Growth", desc: "Link building, keyword expansion, and map position optimizations. Leading to increased calls." },
    { period: "Month 6+", title: "Dominance & Maintenance", desc: "Maintaining top-3 ranking positions in the local pack, countering competitor actions, and continuing citation syncs." }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-950 text-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">Our Services</h1>
          <p className="text-lg text-blue-100 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
            Choose the path that fits your timeline and goals. We manage every detail, you focus on your new customers.
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <a
              href="#google-ads"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-lg border border-white/10 text-sm transition-all"
            >
              Google Ads
            </a>
            <a
              href="#local-seo"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-lg border border-white/10 text-sm transition-all"
            >
              Local SEO
            </a>
            <a
              href="#comparison"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-lg border border-white/10 text-sm transition-all"
            >
              Compare
            </a>
          </div>
        </div>
      </section>

      {/* Service 1: Google Ads */}
      <section id="google-ads" className="py-20 border-b border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-md">
                <Zap className="w-4.5 h-4.5 mr-1" />
                Immediate Visibility
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
                Get Immediate, Qualified Customers from Google Ads
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                We design and manage high-performing paid campaigns from end to end—so you acquire customers, not just clicks.
              </p>
              
              <div className="bg-brand-blue/5 rounded-2xl p-6 border border-brand-blue/10">
                <h4 className="font-display font-bold text-brand-blue flex items-center mb-3">
                  <Target className="w-5 h-5 mr-2 text-brand-orange" />
                  Who It's Best For:
                </h4>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2" /> Businesses needing leads today (can't wait months)</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2" /> High-margin service/product categories</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2" /> Companies with a dedicated monthly marketing spend ($500+)</li>
                </ul>
              </div>

              <div className="pt-2">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Schedule Your Free Ads Audit
                </CTAButton>
              </div>
            </div>

            {/* Right What We Do Grid */}
            <div className="lg:col-span-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue mb-6 border-b border-gray-100 pb-3">
                What We Do
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {googleAdsBullets.map((bullet, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-display font-bold text-brand-blue text-base flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                      {bullet.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{bullet.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Timeline & FAQ for Google Ads */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 pt-16 border-t border-gray-100">
            {/* Timeline */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue flex items-center mb-6">
                <Clock className="w-5 h-5 mr-2 text-brand-orange" /> Typical Implementation Timeline
              </h3>
              <div className="space-y-6 relative border-l-2 border-brand-blue/15 pl-6 ml-3">
                {adsTimeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[35px] top-0 bg-white border-2 border-brand-blue text-brand-blue font-bold text-xs rounded-full px-2 py-0.5 z-10">
                      {item.period}
                    </span>
                    <h4 className="font-display font-bold text-brand-blue text-base">{item.title}</h4>
                    <p className="text-base text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue flex items-center mb-6">
                <HelpCircle className="w-5 h-5 mr-2 text-brand-orange" /> Google Ads FAQs
              </h3>
              <div className="space-y-5">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base">What's the minimum budget?</h4>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    We typically recommend a minimum ad budget of $500–$2,000/month to collect sufficient market data and show meaningful sales results.
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base">Will my ads show up immediately?</h4>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Yes. Once setup is finalized and Google approves the copy, ads can go live within hours, putting you in front of searching customers instantly.
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base">How do you ensure good ROI?</h4>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    We start with tightly configured target keywords, limit broad match parameters, and install exact conversion tracking so we double-down only on what sells.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Service 2: Local SEO */}
      <section id="local-seo" className="py-20 bg-gray-50/50 border-b border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6 lg:order-last">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-md">
                <MapPin className="w-4.5 h-4.5 mr-1" />
                Long-Term Authority
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
                Get Found in Local Search—Google Maps, Listings, and Beyond
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                Your local customers search "[Your Business] near me" every single day. We build the authority systems that ensure they click on YOU.
              </p>
              
              <div className="bg-brand-green/5 rounded-2xl p-6 border border-brand-green/10">
                <h4 className="font-display font-bold text-brand-blue flex items-center mb-3">
                  <Target className="w-5 h-5 mr-2 text-brand-green" />
                  Who It's Best For:
                </h4>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2" /> Home service businesses (plumbers, HVAC, electricians, salons)</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2" /> Physical retail, clinics, or restaurants serving a local area</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2" /> Businesses aiming to reduce long-term dependencies on paid ads</li>
                </ul>
              </div>

              <div className="pt-2">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Schedule Your Free Local SEO Audit
                </CTAButton>
              </div>
            </div>

            {/* Right What We Do Grid */}
            <div className="lg:col-span-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue mb-6 border-b border-gray-100 pb-3">
                What We Do
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {localSeoBullets.map((bullet, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-brand-blue text-sm flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                      {bullet.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{bullet.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Timeline & FAQ for Local SEO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 pt-16 border-t border-gray-100">
            {/* Timeline */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue flex items-center mb-6">
                <Clock className="w-5 h-5 mr-2 text-brand-green" /> Typical Implementation Timeline
              </h3>
              <div className="space-y-6 relative border-l-2 border-brand-green/15 pl-6 ml-3">
                {seoTimeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[35px] top-0 bg-white border-2 border-brand-green text-brand-green font-bold text-xs rounded-full px-2 py-0.5 z-10">
                      {item.period}
                    </span>
                    <h4 className="font-display font-bold text-brand-blue text-base">{item.title}</h4>
                    <p className="text-base text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue flex items-center mb-6">
                <HelpCircle className="w-5 h-5 mr-2 text-brand-green" /> Local SEO FAQs
              </h3>
              <div className="space-y-5">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base">How long until I rank in Google Maps?</h4>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Map positioning typically sees positive growth within 60 to 90 days. Top-3 category spots usually consolidate between months 4 and 6.
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base">Do I need a physical storefront?</h4>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    No. We optimize Service Area Businesses (SABs) by defining your service boundaries correctly in Google, letting you rank without disclosing a home address.
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="font-display font-bold text-brand-blue text-base">What if my business has negative reviews?</h4>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    We deploy custom response scripts to de-escalate negative remarks and configure automated email templates that encourage happy clients to leave positive reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison Chart Section */}
      <section id="comparison" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
              Google Ads vs. Local SEO: Which is Right For You?
            </h2>
            <p className="text-gray-600 font-medium text-base">
              A quick breakdown of how these channels compare in speed, investment, and long-term value.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
            <table className="min-w-full divide-y divide-gray-200 text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-brand-blue uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-4 text-left font-bold text-brand-blue uppercase tracking-wider bg-blue-50/30">Google Ads</th>
                  <th className="px-6 py-4 text-left font-bold text-brand-blue uppercase tracking-wider bg-green-50/20">Local SEO</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {[
                  { feature: "Time to Results", ads: "Days / Weeks", seo: "2 - 6 Months" },
                  { feature: "Cost Model", ads: "Pay-per-click (Ad Spend + Management)", seo: "Flat Monthly Retainer" },
                  { feature: "Best for Volume", ads: "Immediate Lead Volume Boosts", seo: "Sustained Organic Map Visibility" },
                  { feature: "Effort to Maintain", ads: "High (Requires constant bid monitoring)", seo: "Medium (Periodic citation & review updates)" },
                  { feature: "ROI Timeline", ads: "Immediate validation, quick stabilization", seo: "Longer timeline but compounds over time" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-brand-dark">{row.feature}</td>
                    <td className="px-6 py-4 text-gray-600 bg-blue-50/10 font-medium">{row.ads}</td>
                    <td className="px-6 py-4 text-gray-600 bg-green-50/10 font-medium">{row.seo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-12 bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
            <h4 className="font-display font-bold text-brand-blue mb-2 text-base">Our Recommendation</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Many highly successful SMBs use <strong>BOTH</strong>. Google Ads capture hot, immediate searches while Local SEO builds an organic traffic engine that requires zero ongoing ad click costs. Let's discuss what fits your timeline in your free strategy call.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-blue">Not Sure Which Service You Need?</h3>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Book our free 30-min audit call. We'll run a diagnostic on both your local map footprint and current ad space to show you which has the highest growth potential.
          </p>
          <div className="pt-2">
            <CTAButton href="/contact" variant="primary" size="lg">
              Schedule Your Free Combined Audit
            </CTAButton>
          </div>
        </div>
      </section>

    </div>
  );
}
