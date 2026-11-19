export interface PainPointAntidote {
  id: string;
  number: string;
  painTitle: string;
  ownerQuote: string;
  traditionalFailure: string;
  antidoteName: string;
  antidoteSummary: string;
  technicalProof: string[];
}

export interface OwnershipRight {
  asset: string;
  owner: string;
  agencyAccess: string;
  guarantee: string;
}

export interface PricingPlan {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  flatFee: string;
  adSpendNote: string;
  billingModel: string;
  bestFor: string;
  highlighted?: boolean;
  features: string[];
  accountabilityGuarantee: string;
}

export interface ChangeLogEntry {
  date: string;
  channel: string;
  action: string;
  impact: string;
}

export interface BudgetSplitTier {
  share: string;
  tier: string;
  intentFocus: string;
  examples: string;
}

export interface NegativeTaxonomyGroup {
  category: string;
  blockedTerms: string;
  reason: string;
}

export interface CroHeuristicRow {
  element: string;
  bestPractice: string;
  measuredImpact: string;
}

export interface VbbPipelineStage {
  stage: string;
  trigger: string;
  syntheticValue: string;
  uploadWindow: string;
}

export interface MarketModelComparison {
  model: string;
  typicalCost: string;
  hiddenFlaw: string;
  leadGrowDifference: string;
}

export const painPointsAndAntidotes: PainPointAntidote[] = [
  {
    id: "wasted-spend",
    number: "01",
    painTitle: "Expensive Wasted Clicks & Broad-Match Bleed",
    ownerQuote: "\"We got plenty of clicks and out-of-state spam, but zero paying customers.\"",
    traditionalFailure: "Leaving Broad Match, Search Partners, and Display expansion on—draining $5–$15 clicks before buyers enter the market.",
    antidoteName: "Precision Query Control & 60/20/20 Split",
    antidoteSummary: "Before we attempt to scale your budget, we seal every leak and isolate high-intent commercial searches from educational noise.",
    technicalProof: [
      "Search Partners & Display Network disabled by default",
      "Geo-targeting locked to 'Presence: People IN your location'",
      "Exact & Phrase Match STAGs with cross-pollination negatives",
      "4-category negative taxonomy updated every Monday"
    ]
  },
  {
    id: "vanity-metrics",
    number: "02",
    painTitle: "The Vanity Metric & Unqualified Lead Trap",
    ownerQuote: "\"Smart Bidding flooded us with cheap form fills that never survived a single sales call.\"",
    traditionalFailure: "Optimizing Smart Bidding for raw clicks or unverified MQLs while sending expensive traffic to generic homepages.",
    antidoteName: "CRM Value-Based Bidding & 1-Page P&L",
    antidoteSummary: "We connect Google Ads directly to your CRM and call tracking so bidding optimizes for SQLs and closed revenue—not cheap spam.",
    technicalProof: [
      "GCLID & Enhanced Conversions synced back from CRM deals",
      "Target ROAS trained on SQL & Opportunity dollar values",
      "Dedicated 1:1 landing pages (no nav distractions, 5–7 qualification fields)",
      "1-page P&L report: Spend, Flat Fee, CPQL & Verified Revenue"
    ]
  },
  {
    id: "map-invisibility",
    number: "03",
    painTitle: "Invisible on Google Maps Despite Paying for SEO",
    ownerQuote: "\"We paid an SEO retainer for months and still didn't show up for 'near me' searches.\"",
    traditionalFailure: "Selling generic 1,500-word blog posts and low-tier backlinks while ignoring your Google Business Profile.",
    antidoteName: "GBP-First Local Dominance",
    antidoteSummary: "Hyper-local execution built around Google's three Map Pack pillars: Relevance, Distance, and Prominence.",
    technicalProof: [
      "Primary & secondary GBP category precision audits",
      "Real EXIF-geotagged fieldwork photo cadence (zero stock photos)",
      "Automated post-service SMS review generation",
      "NAP citation cleanup & manual GBP suspension defense"
    ]
  },
  {
    id: "digital-hostage",
    number: "04",
    painTitle: "Held Hostage by Your Own Agency",
    ownerQuote: "\"When we tried to leave, they refused to hand over our ad account and GBP.\"",
    traditionalFailure: "Registering client domains, GBP profiles, or ad accounts under agency emails and charging transfer buyout fees.",
    antidoteName: "Total Ownership ('Digital Bill of Rights')",
    antidoteSummary: "You legally own 100% of every digital asset from Day 1. We operate strictly via delegated Manager access.",
    technicalProof: [
      "Your billing card funds Google Ads directly—zero markup",
      "You remain Primary Owner of GBP, GA4, Domain & Hosting",
      "Historical ad data & negative lists stay in your account",
      "Fire us anytime with zero buyout or transfer fees"
    ]
  },
  {
    id: "predatory-retainers",
    number: "05",
    painTitle: "12-Month Lock-Ins & '% of Spend' Misalignment",
    ownerQuote: "\"Why should my agency get paid more just for telling me to spend more?\"",
    traditionalFailure: "Forcing 12-month contracts and 15–20% of ad spend fees that reward budget bloat over customer profitability.",
    antidoteName: "Flat-Fee RevOps & Pipeline Alignment",
    antidoteSummary: "Flat transparent retainers including dedicated landing page CRO, CRM tracking, and a weekly Change Log proving active work.",
    technicalProof: [
      "Flat monthly management fee—never a % of ad spend",
      "Month-to-month terms with simple 30-day notice",
      "Dedicated landing page CRO bundled into every growth tier",
      "Weekly Change Log documenting every optimization made"
    ]
  }
];

export const queryControlAllocation: BudgetSplitTier[] = [
  {
    share: "60%",
    tier: "High-Intent Commercial Evaluation",
    intentFocus: "Active buyers comparing vendors, pricing, or urgent local dispatch.",
    examples: "\"[Service] near me\", \"[Product] pricing\", \"[Brand] vs [Competitor]\", \"Request quote\""
  },
  {
    share: "20%",
    tier: "Mid-Intent Problem & Category Research",
    intentFocus: "Prospects diagnosing a technical problem before building a vendor shortlist.",
    examples: "\"Reduce AC repair wait time\", \"B2B pipeline attribution software\""
  },
  {
    share: "20%",
    tier: "Retargeting & First-Party Customer Match",
    intentFocus: "Re-engaging high-intent page visitors and past quote requests across Search & Display.",
    examples: "90-day website visitors, proposal-stage CRM lists, repeat-buyer audiences"
  }
];

export const negativeExclusionMatrix: NegativeTaxonomyGroup[] = [
  {
    category: "Consumer & Retail Intent",
    blockedTerms: "free, cheap, affordable, budget, discount, diy, parts only, home depot",
    reason: "Filters low-margin bargain hunters and DIY researchers from high-CPC auctions."
  },
  {
    category: "Educational & Academic Intent",
    blockedTerms: "tutorial, how to, certification, course, training, student, pdf, template",
    reason: "Stops paying $6–$15 per click for learners who have zero buying intent."
  },
  {
    category: "Employment & Recruiting",
    blockedTerms: "jobs, careers, salary, resume, hiring, internship, glassdoor",
    reason: "Prevents job applicants from draining acquisition capital."
  },
  {
    category: "Existing Customer & Support",
    blockedTerms: "login, customer support, help desk, billing phone, portal + Customer Match exclusion",
    reason: "Keeps current customers looking for support from clicking paid acquisition ads."
  }
];

export const croHeuristics: CroHeuristicRow[] = [
  {
    element: "Headline (H1) Message Match",
    bestPractice: "Mirror the exact promise of the search ad in Headline 1 immediately above the fold.",
    measuredImpact: "+15% to 25% CVR lift; avoids the 40–60% 5-second bounce rate"
  },
  {
    element: "1:1 Attention Ratio (No Nav Bar)",
    bestPractice: "Strip global top navigation and secondary footer exits from paid ad landing pages.",
    measuredImpact: "13.5% avg conversion vs. 10.5% on pages with 5+ links"
  },
  {
    element: "Above-the-Fold Authority",
    bestPractice: "Place verified review counts, client proof, and concrete service SLA above the scroll.",
    measuredImpact: "Reduces buyer skepticism before asking for a phone number or email"
  },
  {
    element: "Friction-Calibrated Lead Forms",
    bestPractice: "Use 5–7 structured qualification fields (work email, scope, timeline) for B2B & PMax.",
    measuredImpact: "Cuts unqualified leads by up to 57% and stops Display bot spam"
  }
];

export const vbbPipelineStages: VbbPipelineStage[] = [
  {
    stage: "01. Ad Click + Identifier Capture",
    trigger: "Prospect clicks exact-match search ad -> GCLID & hashed first-party email captured in hidden fields.",
    syntheticValue: "$0 (Raw signal logged)",
    uploadWindow: "Real-time via GTM & Enhanced Conversions"
  },
  {
    stage: "02. Marketing Qualified Lead (MQL)",
    trigger: "Visitor passes 5–7 field landing page filter or inbound tracked call exceeds 60s.",
    syntheticValue: "$100 assigned value",
    uploadWindow: "Within 24 hours"
  },
  {
    stage: "03. Sales Qualified Lead (SQL)",
    trigger: "Confirmed decision-maker, service zone match, and budget fit in HubSpot / Salesforce / ServiceTitan.",
    syntheticValue: "$900 assigned value",
    uploadWindow: "Within 7–14 days (< 63-day limit)"
  },
  {
    stage: "04. Opportunity / Closed-Won",
    trigger: "Proposal issued ($3,000 pipeline value) or signed invoice synced back for Target ROAS training.",
    syntheticValue: "$3,000+ / Actual Revenue",
    uploadWindow: "Within 30–90 days"
  }
];

export const marketModelComparisons: MarketModelComparison[] = [
  {
    model: "Legacy % of Ad Spend Agencies (10%–20%)",
    typicalCost: "Scales linearly with spend",
    hiddenFlaw: "Structurally rewarded for pushing Broad Match and higher ad budgets even when your ROAS falls.",
    leadGrowDifference: "0% of ad spend—our fee stays flat as you scale profitable campaigns."
  },
  {
    model: "Keyword-Only Mid-Tier Retainers",
    typicalCost: "$2,500–$3,500 / mo",
    hiddenFlaw: "Manages bids inside Google Ads without touching landing page CRO or CRM offline conversion sync.",
    leadGrowDifference: "Includes 1:1 CRO landing pages, GCLID/CRM feedback loops, and GBP execution."
  },
  {
    model: "Cheap Offshore / 'Set & Forget' Software",
    typicalCost: "$400–$800 / mo",
    hiddenFlaw: "Relies on default automation, zero negative pruning, and generic templates that flood sales with junk.",
    leadGrowDifference: "Weekly manual negative audits, competitor segment control, and senior strategist oversight."
  }
];

export const digitalBillOfRights: OwnershipRight[] = [
  {
    asset: "Google Ads Account & Historical Data",
    owner: "You (Client Admin & Direct Billing)",
    agencyAccess: "Manager Access via MCC",
    guarantee: "Your credit card pays Google directly. Every keyword, conversion signal, and negative list stays yours forever."
  },
  {
    asset: "Google Business Profile (GBP)",
    owner: "You (Primary Owner)",
    agencyAccess: "Manager Role",
    guarantee: "Your reviews, photos, and local Map Pack authority remain permanently under your business email."
  },
  {
    asset: "Domain, Website & Landing Pages",
    owner: "You (Registrar & Hosting Owner)",
    agencyAccess: "Collaborator / Developer Access",
    guarantee: "Never locked behind proprietary agency CMS traps or surprise buyout fees."
  },
  {
    asset: "GA4, GTM & CRM Conversion Logs",
    owner: "You (Account Administrator)",
    agencyAccess: "Analyst / Editor Access",
    guarantee: "Full ownership of first-party attribution data, call recordings, and offline CRM conversion feedback."
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "google-ads",
    tag: "Immediate Buyer Demand",
    name: "Zero-Waste Google Ads",
    subtitle: "Flat-fee search & PMax revenue architecture built to seal leaks before scaling.",
    flatFee: "$750 – $1,250 / mo",
    adSpendNote: "Flat retainer (0% of ad spend) · Recommended ad budget: $1,500–$6,000/mo paid directly to Google",
    billingModel: "Month-to-month · 90-day ROI benchmark",
    bestFor: "Businesses that need qualified calls & pipeline now without burning cash on broad-match waste.",
    features: [
      "60/20/20 intent split with Exact/Phrase STAGs & cross-pollination negatives",
      "Search Partners & Display off; strict 'Presence: IN location' geo-lock",
      "Isolated PMax Asset Groups with competitor URL signals & spam filters",
      "Dynamic call tracking + GCLID / Enhanced Conversions setup",
      "Weekly manual Account Change Log + 1-page Money-In / Money-Out report",
      "100% client ownership under our Digital Bill of Rights"
    ],
    accountabilityGuarantee: "If we haven't hit our agreed 90-day CPQL or lead-quality benchmark, you can walk away with zero penalties—and keep every campaign asset."
  },
  {
    id: "local-seo",
    tag: "Map Pack Authority",
    name: "GBP-First Local Dominance",
    subtitle: "Compounding Google Maps 3-Pack rankings without generic filler blog retainers.",
    flatFee: "$650 – $1,100 / mo",
    adSpendNote: "Flat monthly retainer · Zero ad spend required",
    billingModel: "Month-to-month · 30-day notice",
    bestFor: "Local service contractors, clinics, and multi-zip businesses tired of paying for invisible 'SEO'.",
    features: [
      "Primary ('IS a' test) & up to 9 relevant secondary GBP category precision",
      "Evidence-backed Service-Area Pages (600–1,000 words + EXIF jobsite proof)",
      "Modern areaServed JSON-LD & FAQPage schema for Google Maps + Ask Maps AI",
      "Compliant zero-gating SMS review velocity system + <48-hr owner responses",
      "Cross-surface NAP & hours coherence across GBP, Apple Maps, Yelp & Bing",
      "Multi-mile zip-code Geo-Grid rank tracking & manual GBP suspension defense"
    ],
    accountabilityGuarantee: "Every deliverable is logged monthly—local rank grid movement, reviews earned, citations verified, and tracked GBP calls."
  },
  {
    id: "hybrid-growth",
    tag: "Revenue Infrastructure",
    name: "Full Search + CRO & VBB Engine",
    subtitle: "Capture urgent searches with Zero-Waste Ads, 1:1 CRO landing pages, CRM Value-Based Bidding, and Map Pack authority.",
    flatFee: "$1,450 – $2,250 / mo",
    adSpendNote: "Bundled flat retainer (includes CRO & CRM RevOps · 0% of ad spend)",
    billingModel: "Month-to-month · Closed-loop CRM attribution",
    bestFor: "Established SMBs & B2B teams ready to train Google's AI on SQLs/closed revenue while owning the Maps 3-Pack.",
    highlighted: true,
    features: [
      "Complete Zero-Waste Google Ads + GBP-First Local Dominance execution",
      "Custom 1:1 message-matched landing pages + continuous A/B CRO testing included",
      "CRM Value-Based Bidding sync (HubSpot / Salesforce / ServiceTitan) for Target ROAS",
      "Friction-calibrated 5–7 field lead qualification forms cutting junk leads up to 57%",
      "CFO-ready Pipeline & Revenue Dashboard (CPQL, Pipeline-to-Spend, Weekly Change Log)",
      "Full Digital Bill of Rights asset ownership guarantee"
    ],
    accountabilityGuarantee: "One flat fee replacing separate PPC, CRO, and SEO vendors—with zero lock-in contracts and full closed-won attribution."
  }
];

export const sampleWeeklyChangeLog: ChangeLogEntry[] = [
  {
    date: "Mon, Nov 16",
    channel: "Google Ads Query Control",
    action: "Audited 184 search terms; added 27 cross-pollination & exclusion negatives ('diy', 'salary', 'parts only') across Consumer and Employment lists.",
    impact: "Saved ~$310/wk in non-buyer clicks"
  },
  {
    date: "Wed, Nov 18",
    channel: "GBP & Local Map Pack",
    action: "Uploaded 6 EXIF-geotagged jobsite photos, refined Winter Heating secondary category, and cleared 4 duplicate NAP citations.",
    impact: "Map Pack calls +19% WoW"
  },
  {
    date: "Fri, Nov 20",
    channel: "CRM VBB & Landing Page CRO",
    action: "Synced 9 SQLs ($8,100 pipeline) & 4 closed invoices ($8,420) via Offline Conversion Import; matched H1 copy to top ad group.",
    impact: "CPQL dropped from $64 to $48; CVR lifted 2.9% -> 5.4%"
  }
];
