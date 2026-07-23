import React from "react";
import { BookOpen, Calendar, ArrowRight, Rss } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function BlogPage() {
  const upcomingPosts = [
    {
      title: "Google Ads vs. Local SEO: Which is right for your business?",
      category: "Strategy Guide",
      summary: "A deep dive comparing initial setup costs, time to visibility, and the lifetime value of paid clicks versus map rankings."
    },
    {
      title: "5 critical mistakes wasting your Google Ads budget",
      category: "Google Ads",
      summary: "Most small business owners throw away 40% of their ad spend on default keyword match types and bad landing pages. Learn what to avoid."
    },
    {
      title: "How to dominate local search and maps in your market",
      category: "Local SEO",
      summary: "A step-by-step checklist to optimize your Google Business Profile and build citation authority that outranks local competitors."
    },
    {
      title: "The ROI reality check: What's actually possible?",
      category: "Analytics",
      summary: "Understanding cost-per-acquisition (CPA) math and setting realistic timeline expectations for your search marketing channels."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-md">
            <Rss className="w-4 h-4 mr-1 text-brand-blue" aria-hidden="true" />
            Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue tracking-tight leading-tight">
            Coming Soon: Resources for Growing Your Business from Google
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            We are compiling detailed guides, step-by-step optimization checklists, and case study breakdowns to help you acquire customers from Google Ads and maps.
          </p>
        </div>

        {/* Upcoming content outline grid */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl md:text-2xl font-display font-bold text-brand-blue border-b border-gray-100 pb-3">
            Topics We Are Researching Right Now:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingPosts.map((post, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-xs hover:shadow-sm transition-all">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <h3 className="font-display font-bold text-brand-blue text-lg mt-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {post.summary}
                </p>
                <div className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  Status: In Drafting <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-blue">Want to See These Optimization Steps Implemented Live?</h3>
          <p className="text-gray-600 text-base max-w-md mx-auto">
            Don't wait for the articles. Book your free strategy audit session today, and we'll walk you through these exact concepts on your own account.
          </p>
          <div className="pt-2">
            <CTAButton href="/contact" variant="primary" size="lg">
              Schedule Your Free Audit Call
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  );
}
