export interface BuyingGroupMetric {
  stakeholder: string;
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  businessType: string;
  region: string;
  companySize: string;
  techStack: string;
  serviceUsed: string;
  relatedServiceHref: string;
  relatedServiceLabel: string;
  shortTag: string;
  timeframe: string;
  goal: string;
  metric: string;
  heroHeadline: string;
  heroSubheadline: string;
  disclosureNote: string;
  buyingGroupMetrics: [
    BuyingGroupMetric,
    BuyingGroupMetric,
    BuyingGroupMetric
  ];
  migrationRisk: {
    fearTitle: string;
    objection: string;
    howWeDeRisked: string;
  };
  quote: string;
  quoteAuthor: string;
  situation: string;
  hypothesis: string;
  leaksSealed: string[];
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
    businessType: "Independent Apparel Store",
    region: "London, UK",
    companySize: "14-person DTC brand ($1.4M ARR)",
    techStack: "Shopify Plus · Google Ads · Tag Gateway · GA4",
    serviceUsed: "Google Ads (Zero-Waste Search & Segmented PMax)",
    relatedServiceHref: "/services#phase-0-tracking",
    relatedServiceLabel: "Phase 0 Tracking & Zero-Waste Ads",
    shortTag: "Google Ads + PMax",
    timeframe: "90 days",
    goal: "Eliminate wasted ad spend and scale profitable online orders",
    metric: "+247% sales growth",
    heroHeadline: "+247% Sales Growth in 90 Days",
    heroSubheadline: "60% wasted broad-match spend eliminated; 4.9x verified ROAS",
    disclosureNote:
      "Client brand anonymized by mutual NDA; verified Shopify payout & Google Ads ledger data audited over 90 days.",
    buyingGroupMetrics: [
      {
        stakeholder: "Leadership / CFO",
        label: "Verified ROAS (Month 3)",
        value: "4.9x ROAS",
      },
      {
        stakeholder: "Marketing / Growth",
        label: "Customer Acquisition Cost",
        value: "$45 → $18 (-60%)",
      },
      {
        stakeholder: "Operations / E-Com",
        label: "Checkout Conversion Rate",
        value: "1.2% → 3.8%",
      },
    ],
    migrationRisk: {
      fearTitle: "Fear of Revenue Dip While Restructuring Live PMax & Pixels",
      objection:
        "The founder hesitated to touch live campaigns before peak seasonal sales, worried that turning off broad match and rebuilding Enhanced Conversions would reset learning and freeze daily cash flow.",
      howWeDeRisked:
        "We deployed Tag Gateway and SKU-level Enhanced Conversions in shadow mode during Week 1 (reconciling checkout receipts to within 4% variance) and shifted budget incrementally from non-converting Search Partners into margin-segmented Asset Groups without a single day of traffic outage.",
    },
    quote:
      "We went from 2–3 orders a week to 8–10, and for the first time I can see exact revenue next to every pound spent.",
    quoteAuthor: "Founder, Independent Apparel Store (London, UK)",
    situation:
      "This Shopify retailer had strong repeat-customer retention but was burning cash on in-house Google Ads campaigns. Over 60% of their daily budget was leaking into Display Network placements, Search Partners, and broad-match informational queries that produced clicks without checkouts.",
    hypothesis:
      "If we strip Search Partners and Display bleed, isolate PMax asset groups by SKU margin tier, and pass exact order revenue via Enhanced Conversions, Google's algorithm will reallocate existing budget strictly toward high-margin buyers.",
    leaksSealed: [
      "Disabled Search Partners and Display Network expansion on all Search campaigns",
      "Replaced broad-match keywords with strict Exact and Phrase match buyer terms",
      "Added 140+ negative keywords in week one and pruned search terms every Monday",
      "Configured Enhanced Conversions so checkout values mapped back to exact SKUs",
    ],
    whatWeDid: [
      "Audited 6 months of search term reports and paused 60% of non-converting spend on day one.",
      "Segmented Performance Max into isolated Asset Groups by product margin and buyer persona rather than bundling all SKUs into Google's default bucket.",
      "Applied strict Headline 1 message-match on mobile product landing pages with shipping/return guarantees above the fold.",
      "Connected Shopify order revenue directly to Google Ads Target ROAS bidding for closed-loop attribution.",
    ],
    results: [
      { label: "Customer Acquisition Cost", value: "$45 -> $18 (-60%)" },
      { label: "Checkout Conversion Rate", value: "1.2% -> 3.8%" },
      { label: "Month 1 Verified Revenue", value: "$2,100 (1.2x ROAS)" },
      { label: "Month 2 Verified Revenue", value: "$4,850 (3.1x ROAS)" },
      { label: "Month 3 Verified Revenue", value: "$7,200 (4.9x ROAS)" },
    ],
    keyLearnings: [
      "Sealing network and match-type leaks recovers budget faster than increasing ad spend.",
      "Margin-segmented PMax Asset Groups prevent high-volume low-margin items from eating budget.",
      "Enhanced Conversion revenue signals prevent bidding algorithms from chasing window-shoppers.",
    ],
    nextStepsText:
      "If your Google Ads account is generating clicks without verified checkouts, we can audit your search terms, PMax asset groups, and network settings live in 30 minutes.",
    ctaLabel: "Request Free Ads Leak Audit",
  },
  "local-service": {
    slug: "local-service",
    businessType: "Regional HVAC Contractor",
    region: "Houston, TX",
    companySize: "22 technicians · 11 service trucks",
    techStack: "Google Business Profile · ServiceTitan · CallRail · Next.js CRO",
    serviceUsed: "GBP-First Local SEO & 1:1 CRO Landing Pages",
    relatedServiceHref: "/services#local-seo",
    relatedServiceLabel: "GBP Map Pack & Proof-of-Work SAPs",
    shortTag: "Local SEO + CRO",
    timeframe: "6 months",
    goal: "Capture high-intent emergency calls from Google Maps",
    metric: "+180% phone calls",
    heroHeadline: "+180% Verified Service Calls",
    heroSubheadline:
      "$23,800/mo added revenue from Google Maps 3-pack rankings",
    disclosureNote:
      "Verified via CallRail dynamic numbers reconciled against ServiceTitan booked dispatch tickets over 180 days.",
    buyingGroupMetrics: [
      {
        stakeholder: "Leadership / Owner",
        label: "Net Added Monthly Revenue",
        value: "+$23,800 / mo",
      },
      {
        stakeholder: "Marketing / Local Search",
        label: "Google Maps 3-Pack Rank",
        value: "#7 avg → #1–#2",
      },
      {
        stakeholder: "Operations / Dispatch",
        label: "Verified Weekly Calls",
        value: "~5 → ~14 calls/wk",
      },
    ],
    migrationRisk: {
      fearTitle: "Fear of GBP Suspension or Losing Legacy Agency Assets",
      objection:
        "Their prior SEO vendor held manager control over their Google Business Profile and warned that editing primary categories or migrating landing pages could trigger an instant Google re-verification suspension.",
      howWeDeRisked:
        "We executed our Digital Bill of Rights handoff first—confirming the client's domain email as Primary Owner—and paced GBP category, citation, and Proof-of-Work SAP updates using compliance-checked documentation so zero suspension triggers occurred.",
    },
    quote:
      "Homeowners call us saying they found us first on Google Maps for emergency AC repair—without us paying for every single click.",
    quoteAuthor: "David Miller, VP of Operations · LoneStar Cooling (Houston, TX)",
    situation:
      "After paying a previous agency for generic blog posts that generated zero local phone calls, this Houston HVAC team was stuck outside the top 20 on Google Maps. Their Google Business Profile (GBP) had mismatched categories, only 2 outdated reviews, and paid clicks landed on a cluttered 7-link homepage.",
    hypothesis:
      "By realigning GBP categories around emergency intent, building consistent EXIF-geotagged fieldwork media + SMS review velocity, and routing paid overflow to a distraction-free 1:1 emergency landing page, call volume and dispatch revenue would compound without extra ad spend.",
    leaksSealed: [
      "Audited and corrected primary & secondary GBP categories to match emergency HVAC intent",
      "Replaced generic stock imagery with EXIF-tagged photos of actual trucks and technicians",
      "Cleaned up 30+ conflicting NAP citations across local and trade directories",
      "Removed homepage navigation exits from paid traffic using a single-goal emergency callback template",
    ],
    whatWeDid: [
      "Rebuilt their Google Business Profile around the three local ranking pillars: Relevance, Distance, and Prominence.",
      "Deployed city-specific emergency service landing pages with LocalBusiness schema and Headline 1 message match.",
      "Launched an automated post-job SMS review workflow that grew verified reviews from 2 to 28 in 6 months.",
      "Provided monthly 1-page call-and-revenue reports tracking booked dispatch jobs via dynamic call tracking.",
    ],
    results: [
      { label: "Google Maps Pack Position", value: "#7 avg -> #1–#2 Top Pack" },
      { label: "Verified Weekly Calls", value: "~5 calls -> ~14 calls" },
      { label: "Verified Google Reviews", value: "2 -> 28 reviews (4.8★)" },
      { label: "Added Monthly Revenue", value: "+$23,800 / month" },
    ],
    financialImpact: {
      avgJobValue: "$850",
      previousRevenue: "$17,000",
      currentRevenue: "$40,800",
      additionalRevenue: "$23,800",
      annualImpact: "$285,600",
    },
    keyLearnings: [
      "Blog volume does not rank a local trade business—Google Business Profile precision and review velocity do.",
      "Stripping distracting navigation on emergency landing pages lifts callback conversion rates immediately.",
      "Dynamic call tracking turns Local SEO from an abstract expense into verifiable dispatch revenue.",
    ],
    nextStepsText:
      "Want to see where your Google Business Profile ranks across your service zip codes compared to your top 3 local competitors?",
    ctaLabel: "Request Free Map Pack Audit",
  },
  "saas-consulting": {
    slug: "saas-consulting",
    businessType: "B2B SaaS & Advisory Practice",
    region: "Singapore",
    companySize: "38 employees · $6.5M ARR",
    techStack: "HubSpot Enterprise · Google Ads · sGTM · Data Manager API",
    serviceUsed: "CRM Value-Based Bidding & 1:1 CRO",
    relatedServiceHref: "/services#google-ads",
    relatedServiceLabel: "CRM Value-Based Bidding & 1:1 CRO",
    shortTag: "B2B VBB + CRO",
    timeframe: "90 days",
    goal: "Eliminate unqualified lead spam and train Google Ads on closed-won pipeline",
    metric: "-57% junk leads · 2x revenue",
    heroHeadline:
      "57% Fewer Unqualified Leads & 2x Closed-Won Pipeline in 90 Days",
    heroSubheadline:
      "Transitioned from Maximize Conversions to Target ROAS via CRM offline conversion sync",
    disclosureNote:
      "Client identity anonymized under enterprise advisory NDA; pipeline metrics reconciled directly from HubSpot closed-won deal stages.",
    buyingGroupMetrics: [
      {
        stakeholder: "Leadership / CFO",
        label: "Closed-Won Pipeline",
        value: "2x Revenue (15x ROI)",
      },
      {
        stakeholder: "Marketing / Demand",
        label: "Unqualified Lead Spam",
        value: "-57% Junk Leads",
      },
      {
        stakeholder: "Sales / RevOps",
        label: "Discovery Call SQL Rate",
        value: "20% → 60% SQLs",
      },
    ],
    migrationRisk: {
      fearTitle: "Sales Resistance to Longer Forms & CRM Engineering Overhead",
      objection:
        "Marketing feared that moving from a 2-field form to a 6-field qualification flow would tank top-of-funnel volume, while RevOps worried connecting HubSpot offline conversions would require weeks of engineering.",
      howWeDeRisked:
        "We deployed a standalone nav-free landing page in parallel as an A/B split test and implemented GCLID hidden fields + native HubSpot-to-Google Ads sync inside 5 business days—proving SQL volume rose even as junk volume dropped 57%.",
    },
    quote:
      "Transitioning Google Ads to bid on SQLs instead of raw form fills cut our wasted sales calls in half and doubled closed-won revenue inside 90 days.",
    quoteAuthor: "Managing Principal, B2B SaaS & Advisory Practice (Singapore)",
    situation:
      "This B2B advisory and software consultancy ran Maximize Conversions search campaigns that appeared healthy on paper ($42 CPL) but flooded sales with students, job seekers, and out-of-market inquiries—leaving only a 20% lead qualification rate and zero attribution across their 60-day sales cycle.",
    hypothesis:
      "If we introduce friction-calibrated 6-field qualification on a nav-free 1:1 landing page, block Consumer/Educational/Employment queries via a 4-category negative matrix, and sync HubSpot SQL ($900) and Opportunity ($3,000) values back via GCLID within 63 days, Target ROAS bidding will act like an automated SDR.",
    leaksSealed: [
      "Switched location targeting strictly to 'Presence: People IN Singapore'",
      "Deployed 4-category negative keyword taxonomy blocking consumer, academic, job, and support terms",
      "Replaced 2-field form with a 6-field B2B qualification filter (work email, team size, budget scope)",
      "Rebuilt campaign allocation around the 60/20/20 model with cross-pollination Exact/Phrase STAGs",
    ],
    whatWeDid: [
      "Connected GCLID hidden fields and Enhanced Conversions for Leads directly to HubSpot deal stages.",
      "Assigned synthetic dollar values ($100 MQL, $900 SQL, $3,000 Opportunity) and migrated bidding from Maximize Conversions to Target ROAS once surpassing 30 monthly qualified signals.",
      "Removed global navigation from ad landing pages and pinned exact-match query headlines above the fold.",
      "Replaced 20-page metric decks with CFO-ready CPQL, Pipeline-to-Spend, and LTV:CAC reporting.",
    ],
    results: [
      { label: "Unqualified Lead Volume", value: "-57% reduction in junk leads" },
      { label: "Closed-Won Pipeline", value: "+100% (2x revenue in 90 days)" },
      { label: "Sales Call Qualification Rate", value: "20% -> 60% qualified SQLs" },
      { label: "Attributed Retainer Value", value: "$45K closed (15x ROI)" },
    ],
    keyLearnings: [
      "Standard Smart Bidding treats a student download and a $45K deal identically unless CRM values are fed back.",
      "Adding intentional 5–7 field form friction improves algorithm quality by starving bots and tire-kickers.",
      "60/20/20 query isolation protects $10–$15 B2B CPCs strictly for active commercial buyers.",
    ],
    nextStepsText:
      "If your sales team is drowning in cheap MQLs that never close, let's map a CRM-connected Value-Based Bidding and landing page audit in 30 minutes.",
    ctaLabel: "Request Free Pipeline & Ads Plan",
  },
};
