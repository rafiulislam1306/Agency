export interface CaseStudy {
  slug: string;
  businessType: string;
  serviceUsed: string;
  timeframe: string;
  goal: string;
  metric: string;
  quote: string;
  quoteAuthor: string;
  situation: string;
  whatWeDid: string[];
  results: {
    label: string;
    value: string;
  }[];
  financialImpact?: {
    avgJobValue: string;
    previousRevenue: string;
    currentRevenue: string;
    additionalRevenue: string;
    annualImpact: string;
  };
  keyLearnings: string[];
  nextStepsText: string;
  ctaLabel: string;
}

export const caseStudiesData: Record<string, CaseStudy> = {
  "ecommerce-store": {
    slug: "ecommerce-store",
    businessType: "E-commerce Fashion Store (UK-based)",
    serviceUsed: "Google Ads (Paid Search)",
    timeframe: "90 days",
    goal: "Increase online sales from paid search",
    metric: "+247% sales growth",
    quote: "We went from 2-3 orders/week to 8-10. Wish we'd done this sooner.",
    quoteAuthor: "Shopify Store Owner, London",
    situation: "The client had a Shopify store with high-quality products but was struggling to get consistent online sales. They had attempted running Google Ads campaigns in-house but ran into issues with keyword bidding, tracking, and ad delivery, leading to negative returns on ad spend. They were close to shutting down paid ads entirely, thinking the search channel didn't work for their niche.",
    whatWeDid: [
      "Conducted a thorough keyword and account audit, identifying that 60% of budget was being wasted on irrelevant informational searches rather than commercial-intent keywords.",
      "Restructured their Shopping campaigns into tightly themed Smart Shopping and Performance Max campaigns, focusing bidding exclusively on high-margin product lines.",
      "Optimized product landing pages to improve mobile load speeds, simplify the checkout process, and introduce trust elements.",
      "A/B tested 15+ ad creatives and copy variations, optimizing bidding algorithms for maximum Return on Ad Spend (ROAS)."
    ],
    results: [
      { label: "Customer Acquisition Cost", value: "Reduced from $45 to $18" },
      { label: "Sales Conversion Rate", value: "Increased from 1.2% to 3.8%" },
      { label: "Month 1 Revenue", value: "$2,100 (1.2x ROAS)" },
      { label: "Month 2 Revenue", value: "$4,850 (3.1x ROAS)" },
      { label: "Month 3 Revenue", value: "$7,200 (4.9x ROAS)" }
    ],
    keyLearnings: [
      "Keyword quality and alignment outweigh sheer traffic volume.",
      "Landing page experience and checkout friction represent 50% of the campaign success.",
      "Iterative testing of ad angles is crucial—pre-conceived customer assumptions rarely match bidding data."
    ],
    nextStepsText: "If you are running e-commerce Google Ads campaigns without clear, measurable profitability, a free strategy session could save you thousands in wasted click spend.",
    ctaLabel: "Get Your Google Ads Audit"
  },
  "local-service": {
    slug: "local-service",
    businessType: "HVAC Contractor (USA - Texas)",
    serviceUsed: "Local SEO & Google Maps",
    timeframe: "6 months",
    goal: "Increase phone calls from local service searches",
    metric: "+180% phone calls",
    quote: "People call us saying 'I found you on Google Maps when I searched for emergency HVAC.' That's new. We love it.",
    quoteAuthor: "General Manager, Houston HVAC",
    situation: "This Texas-based HVAC contractor was getting occasional calls from existing clients but wanted to establish a predictable, inbound lead source. The majority of their business was driven by offline word-of-mouth or legacy print flyers. Online, their Google Business Profile was unoptimized, had only 2 reviews, and didn't appear in the top 20 maps listings for Houston-area heating or cooling searches.",
    whatWeDid: [
      "Fully optimized their Google Business Profile: uploaded professional high-res photos of their service team, categorized services accurately, and filled out localized attributes.",
      "Built 30+ high-authority local citations and business profile listings across platforms like Yelp, HomeAdvisor, and localized directories.",
      "Optimized their website's on-page content, creating localized landing pages targeting specific Houston neighborhoods and common emergency service keywords.",
      "Set up an automated, post-service text notification system that prompted satisfied customers to leave a star rating and written review on their Google Business Profile."
    ],
    results: [
      { label: "Google Maps Position", value: "#7 average -> #1 spot" },
      { label: "Weekly Google Calls", value: "~5 calls -> ~12 calls" },
      { label: "Review Count", value: "2 reviews -> 28 positive reviews" },
      { label: "Average Review Rating", value: "4.1 stars -> 4.8 stars" }
    ],
    financialImpact: {
      avgJobValue: "$850",
      previousRevenue: "$17,000",
      currentRevenue: "$40,800",
      additionalRevenue: "$23,800",
      annualImpact: "$285,600"
    },
    keyLearnings: [
      "Many local contractors severely underestimate the call volume generated by Google Maps rankings.",
      "Positive reviews act as an immediate conversion multiplier—customer trust starts before they call.",
      "Local SEO requires consistency; while map ranking adjustments take months, the resulting authority is a lasting inbound channel."
    ],
    nextStepsText: "For service companies, map visibility is your highest-yield marketing asset. Claim your free map diagnostic and search audit today.",
    ctaLabel: "Get Your Local SEO Audit"
  },
  "saas-consulting": {
    slug: "saas-consulting",
    businessType: "Freelance SEO Consultant (Singapore)",
    serviceUsed: "Google Ads + Local SEO (Hybrid)",
    timeframe: "4 months",
    goal: "Build consistent client acquisition pipeline",
    metric: "$45K revenue generated",
    quote: "It feels like real inbound marketing—people finding me because I'm solving their problem. Way better than always chasing.",
    quoteAuthor: "Independent SEO Consultant, Singapore",
    situation: "The consultant was relying solely on cold outreach (emails, LinkedIn messages) to source clients. This resulted in highly inconsistent income, low lead qualification (only 20% of leads met budget requirements), and hours of wasted sales calls. They wanted to build a predictable system where business owners looking for search services found them organically and through highly targeted ads.",
    whatWeDid: [
      "Designed a hybrid search acquisition model: combined high-intent paid Google Search Ads with localized organic consulting SEO.",
      "Built landing pages offering a free 'SEO Blueprint mini-audit' that qualified prospects before they could schedule a discovery call.",
      "Ran Google Ads campaigns with a tightly controlled daily budget ($800/month) targeting high-intent consulting searches in Singapore.",
      "Created 3 comprehensive local resource guides addressing how Singaporean companies can optimize their organic visibility."
    ],
    results: [
      { label: "Monthly Search Leads", value: "2-3 leads -> 8-10 leads" },
      { label: "Lead Qualification Rate", value: "20% -> 60% qualified" },
      { label: "Clients Acquired", value: "4 new clients closed" },
      { label: "Consistent Income", value: "$12,000/month average" },
      { label: "Month 4 Hybrid ROI", value: "15x return on ad spend" }
    ],
    keyLearnings: [
      "B2B service models benefit heavily from pre-call qualification filters to save sales team resources.",
      "Even low Google Ads budgets ($800/mo) deliver when restricted to exact-match transactional search terms.",
      "Using local search positioning establishes consulting authority faster than cold outreach."
    ],
    nextStepsText: "If you are a consultant or B2B professional struggling to build a predictable, warm client flow, schedule a free diagnostic call to inspect your search footprint.",
    ctaLabel: "Schedule Free Hybrid Audit"
  }
};
