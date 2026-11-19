export interface BlogPlaybook {
  slug: string;
  category: string;
  readTime: string;
  updatedAt: string;
  title: string;
  summary: string;
  keyTakeaway: string;
  sections: {
    heading: string;
    paragraphs: string[];
    checklist?: string[];
  }[];
}

export const blogPlaybooks: BlogPlaybook[] = [
  {
    slug: "seal-5-google-ads-budget-leaks",
    category: "Query Control",
    readTime: "6 min read",
    updatedAt: "November 2026",
    title: "Precision Query Control: How to Seal the 5 Biggest Google Ads Leaks + 60/20/20 Split",
    summary:
      "Why default campaign settings quietly burn 40–60% of budgets on Broad Match, Search Partners, and educational searches—and the Exact/Phrase cross-pollination architecture that stops it.",
    keyTakeaway:
      "Turn off Search Partners, lock 'Presence' geo-targeting, allocate 60% of budget to High-Intent Exact/Phrase STAGs, and enforce a 4-category negative keyword matrix every Monday.",
    sections: [
      {
        heading: "Why 'Clicks But No Sales' Happens by Default",
        paragraphs: [
          "In narrow markets where clicks cost $5.42 to $15.00+, high CPCs are rarely the true problem—paying any amount for consumer, student, or job-seeker traffic is. Google's default campaign wizard optimizes for reach and volume, quietly draining 40–60% of monthly spend before qualified buyers ever enter the auction.",
          "With Enhanced CPC deprecated and Google pushing Broad Match everywhere, human discipline around query isolation is what separates profitable revenue engines from budget burn."
        ]
      },
      {
        heading: "The 60/20/20 Intent Split & Cross-Pollination Negatives",
        paragraphs: [
          "Structure your search spend by buyer funnel stage and protect high-intent ad groups with cross-pollination negative exacts:"
        ],
        checklist: [
          "60% High-Intent Commercial Campaigns: Exact & Phrase Match for '[Service] pricing', '[Brand] vs [Competitor]', and emergency 'near me' queries.",
          "20% Mid-Intent Problem Research & 20% Retargeting / Customer Match lists.",
          "Add Exact-Match versions of your core keywords as negative exacts inside Phrase-Match ad groups so clean commercial queries stay isolated.",
          "Disable 'Include Search Partners' and 'Include Display Network' and set Locations strictly to 'Presence: People IN your targeted locations'.",
          "Enforce a 4-category negative taxonomy weekly: Consumer ('free', 'cheap', 'diy'), Educational ('how to', 'tutorial'), Employment ('jobs', 'salary'), and Existing Customer ('login', 'support')."
        ]
      }
    ]
  },
  {
    slug: "value-based-bidding-crm-offline-conversions",
    category: "RevOps & Bidding",
    readTime: "7 min read",
    updatedAt: "November 2026",
    title: "From Raw Clicks to Closed Revenue: Configuring CRM Value-Based Bidding in Google Ads",
    summary:
      "Standard Smart Bidding treats a student PDF download the same as a signed contract. Learn how offline CRM conversion syncing turns Google's AI into an automated SDR.",
    keyTakeaway:
      "Capture GCLID and Enhanced Conversions on form submit, assign synthetic values to MQLs/SQLs/Opportunities within 63–90 days, and migrate from Target CPA to Target ROAS.",
    sections: [
      {
        heading: "Why Pure Media Buying Is Obsolete",
        paragraphs: [
          "Google's Smart Bidding algorithms now handle micro-bid adjustments automatically. The competitive advantage in 2026 belongs to the data fed back into the machine. When an agency optimizes only for 'Leads' inside Google Ads, the algorithm aggressively hunts for the cheapest, easiest conversions—often flooding sales teams with unqualifiable junk.",
          "By integrating your CRM (HubSpot, Salesforce, ServiceTitan, or Jobber) back into Google Ads, the algorithm learns the auction-time behavioral patterns of buyers who actually survive your sales qualification process."
        ]
      },
      {
        heading: "The 4-Step CRM Feedback Loop",
        paragraphs: [
          "Implement closed-loop Value-Based Bidding cleanly inside Google's attribution limits:"
        ],
        checklist: [
          "Step 1 (Identifier Capture): Store the Google Click ID (GCLID) and hashed first-party email/phone via Enhanced Conversions for Leads in hidden CRM fields.",
          "Step 2 (Synthetic Stage Valuation): Because B2B deals can take months to close, assign expected monetary values to early stages—for example $100 per MQL, $900 per SQL, and $3,000 per Opportunity.",
          "Step 3 (Respect Attribution Windows): Sync Enhanced Conversions for Leads within 63 days and traditional offline uploads within 90 days of the original ad click.",
          "Step 4 (Target ROAS Migration): Once a campaign logs 30+ value-based conversions per month, shift bidding from Maximize Conversions to Target ROAS so Google prices low-fit competitors out of the auction."
        ]
      }
    ]
  },
  {
    slug: "pmax-restraint-and-landing-page-cro",
    category: "PMax & CRO",
    readTime: "6 min read",
    updatedAt: "November 2026",
    title: "Taming Performance Max & Cutting CPA in Half With 1:1 Landing Page CRO",
    summary:
      "The media buyer controls the click, but the landing page controls the acquisition cost. How isolated PMax Asset Groups and 4 strict CRO heuristics double efficiency without adding budget.",
    keyTakeaway:
      "Never bundle all audiences in PMax, gate lead forms with 5–7 qualification fields to starve Display bots, and strip navigation from dedicated H1 message-matched landing pages.",
    sections: [
      {
        heading: "Stopping the PMax Display Spam Loop",
        paragraphs: [
          "Because Performance Max distributes ads across Search, YouTube, Display, Discover, and Gmail simultaneously, unrestrained PMax campaigns routinely chase cheap Display bot form fills. Top teams reject Google's suggestion to lump audiences together and instead isolate every Audience Signal into its own Asset Group.",
          "For even tighter B2B & high-intent targeting, feed custom segments built from competitor pricing and product URLs, and require structured multi-field qualification on lead forms so bots never corrupt PMax's learning loop."
        ]
      },
      {
        heading: "4 Landing Page CRO Heuristics That Halve CPA",
        paragraphs: [
          "Median landing page conversion sits around 6.6% overall (4.9% B2B services, 3.8% B2B SaaS). Moving a landing page from 2.5% to 5.8% effectively cuts your Customer Acquisition Cost in half:"
        ],
        checklist: [
          "Exact Headline (H1) Message Match: Mirror the exact promise of your search ad (+15–25% CVR lift; avoids the 40–60% 5-second bounce rate).",
          "1:1 Attention Ratio: Strip top site navigation and footer exits—single-CTA pages average 13.5% conversion vs. 10.5% on pages with 5+ links.",
          "Above-the-Fold Authority: Surface verified review counts, client proof, and clear response SLAs immediately above the scroll.",
          "Friction-Calibrated Forms: Use 5–7 specific qualification fields (work email, budget/scope, timeline) to slash unqualified inquiries by up to 57%."
        ]
      }
    ]
  },
  {
    slug: "gbp-first-local-seo-vs-filler-retainers",
    category: "Local SEO & Map Pack",
    readTime: "7 min read",
    updatedAt: "November 2026",
    title: "The 2026 Google Map Pack & Ask Maps Playbook: The 42% CTR Cliff, areaServed Schema & Review Velocity",
    summary:
      "Post-AI Overviews, Organic #1 CTR dropped to 19% while the Google Map Pack captures 42% of local clicks (+126% more traffic than #4–#10). Here is the exact technical checklist to win both Maps and Ask Maps.",
    keyTakeaway:
      "Pass the Primary Category 'IS a' vs. 'HAS a' test, build Proof-of-Work Service-Area Pages with areaServed JSON-LD, enforce no-gating weekly review velocity, and lock Cross-Surface Entity Coherence.",
    sections: [
      {
        heading: "Why Ranking #4 Costs You Tens of Thousands in Missed Revenue",
        paragraphs: [
          "Visibility inside Google's Local Map Pack is effectively binary: Top-3 listings capture 42% of all local clicks (#1: 17.6%, #2: 15.4%, #3: 15.1%) before a steep 29.6-point CTR cliff at position #4. With 75% of local buyers picking a business within 30 minutes—and 28% in under 5 minutes—sitting outside the 3-Pack hands emergency, high-ticket demand directly to competitors.",
          "Worse, most business owners suffer from proximity bias: searching from their own office shows them at #1, hiding the fact that they rank #8 to #12 just two miles away in higher-income suburbs."
        ]
      },
      {
        heading: "The 5 Technical Local Drivers for 2026 (Maps + Google Ask Maps)",
        paragraphs: [
          "With 45% of consumers now using conversational AI (ChatGPT, Gemini, Google Ask Maps) for local recommendations—yet 43% cross-checking those suggestions on Google Maps before calling—your website and GBP must reinforce one coherent entity:"
        ],
        checklist: [
          "Primary Category 'IS a' Test (~32% GBP weight): Choose what your business fundamentally IS ('Dentist', 'Roofing Contractor') rather than a high-margin add-on, then pair up to 9 strictly relevant secondary categories backed by real service pages.",
          "Evidence-Backed Service-Area Pages (~19% On-Page weight): Replace thin city-swap doorway pages with 5–10 core territory pages (600–1,000 words) featuring local climate/permit context, EXIF-geotagged job Proof of Work, and city-specific customer reviews.",
          "Modern areaServed JSON-LD Schema: Replace deprecated serviceArea markup with explicit areaServed City/AdministrativeArea entities matching your GBP name, phone, and hours character-for-character.",
          "Compliant Review Velocity (16%–20% weight): 47% of consumers reject businesses under 20 reviews and 74% prioritize reviews from the last 90 days. Automate polite SMS review links for every job (strictly zero review gating) and reply within 48 hours.",
          "Cross-Surface Entity Coherence for AI Overviews & Ask Maps: Sync identical NAP, hours, pricing transparency, and FAQPage schema across your GBP, canonical site, Apple Maps, and Yelp."
        ]
      }
    ]
  },
  {
    slug: "money-in-vs-money-out-reporting",
    category: "Attribution",
    readTime: "5 min read",
    updatedAt: "November 2026",
    title: "The Vanity Metric Trap: Building a CFO-Ready Pipeline & Attribution Dashboard",
    summary:
      "Impressions and click-through rates do not pay payroll. Learn how to connect dynamic call tracking and CRM invoices so your marketing report tracks CPQL, Pipeline-to-Spend, and LTV:CAC.",
    keyTakeaway:
      "Every ad dollar should trace through dynamic call tracking and CRM offline conversion sync straight to Cost Per Qualified Lead (CPQL), Pipeline-to-Spend, and verified booked revenue.",
    sections: [
      {
        heading: "Why Agencies Hide Behind 20-Page PDFs",
        paragraphs: [
          "When an agency sends a 20-page monthly deck celebrating '142,000 impressions' and 'up 32% in reach' while sales pipeline shrinks, you are looking at a smokescreen. Impressions are cheap; qualified buyers and closed-won revenue are what pay the bills.",
          "At LeadGrow, we separate internal diagnostic data (which our strategists use to bid and prune weekly) from client proof (which belongs strictly to board-level financial outcomes)."
        ]
      },
      {
        heading: "How Closed-Loop Attribution Works",
        paragraphs: [
          "You do not need an enterprise data warehouse to know which keywords make you money. Four components close the loop for any SMB or B2B firm:"
        ],
        checklist: [
          "Dynamic Number Insertion to map every inbound phone call back to the exact Google keyword or Map listing.",
          "Lead-quality tagging so spam calls and wrong-number dials are excluded from Cost Per Qualified Lead (CPQL) totals.",
          "Offline Conversion Import linking HubSpot, Salesforce, or ServiceTitan invoices back to Google Ads.",
          "A single-page monthly summary: Ad Spend · Flat Fee · CPQL · Pipeline-to-Spend Ratio · Verified Revenue · Net ROAS."
        ]
      }
    ]
  },
  {
    slug: "digital-bill-of-rights-asset-ownership",
    category: "Agency Accountability",
    readTime: "4 min read",
    updatedAt: "November 2026",
    title: "The Digital Bill of Rights: 4 Assets You Must Own Before Hiring Any Agency",
    summary:
      "Too many business owners discover they don't own their domain, Google Ads history, or Google Business Profile until they try to fire a vendor. Never sign a contract without these guarantees.",
    keyTakeaway:
      "Your credit card should pay Google directly, and your company email must be the Primary Owner on every platform—never settle for 'read-only' access.",
    sections: [
      {
        heading: "Stopping the Digital Hostage Crisis",
        paragraphs: [
          "If an agency insists on running your ads inside 'their proprietary ad account', registering your domain under their account, or charging a 'transfer fee' if you leave, walk away immediately. That is leverage designed to prevent you from firing them for poor performance.",
          "A trustworthy partner wants you to stay because of verifiable pipeline and Value-Based Bidding momentum—not because leaving means rebuilding your digital footprint from scratch."
        ]
      },
      {
        heading: "Non-Negotiable Ownership Checklist",
        paragraphs: [
          "Verify all four items in writing before your first campaign launches:"
        ],
        checklist: [
          "Google Ads: Created under your business email with your own payment method attached directly to Google (agency connects via Manager/MCC access).",
          "Google Business Profile: You are listed as Primary Owner; the agency holds Manager access only.",
          "Domain & Website Hosting: Registered in your company's registrar account so you control DNS and landing page code.",
          "GA4, GTM & CRM Logs: Admin rights belong to your company email, preserving your Value-Based Bidding algorithm history forever."
        ]
      }
    ]
  },
  {
    slug: "conversion-tracking-signal-loss-sgtm-2026",
    category: "Tracking & sGTM",
    readTime: "8 min read",
    updatedAt: "November 2026",
    title: "The 2026 Conversion Tracking & sGTM Guide: Why Browser Pixels Lose 35%–70% of Sales",
    summary:
      "Even after Chrome dropped its third-party cookie deadline, ad blockers, Safari 7-day CNAME caps, and June 2026 Consent Mode rules silently blind Smart Bidding. Here is how to right-size your stack.",
    keyTakeaway:
      "Reconcile real bank/CRM receipts against Google Ads first, stop duplicate 'Every' counting and micro-conversion Primary goals, and deploy Google Tag Gateway (+11% uplift) or same-origin sGTM right-sized to your ad spend.",
    sections: [
      {
        heading: "Why Browser Pixels Are a Broken Cash Register in 2026",
        paragraphs: [
          "Many owners assumed browser tracking healed when Google canceled Chrome's universal cookie deprecation and retired ten Privacy Sandbox APIs in October 2025. In reality, client-side JavaScript pixels fail across four overlapping layers: desktop ad blockers (~37% desktop vs. ~15% mobile), Safari ITP 7-day and CNAME/IP cloaking caps, iOS 26 / Safari 26 link tracking defenses, and regional privacy gates.",
          "Even on a clean US opt-out site, a typical multi-session business loses 34.5% of browser-tracked conversions—jumping to 57.4% if a misconfigured global GDPR banner blocks domestic visitors, and 70.5% on EEA/UK sites running Basic Consent Mode. Since Google's June 15, 2026 governance split, Consent Mode's ad_storage parameter exclusively governs what advertising data flows into Google Ads."
        ]
      },
      {
        heading: "The 4-Step Phase 0 Tracking Audit & Right-Sized Stack",
        paragraphs: [
          "Never launch ads first and 'fix tracking later'—paying full media spend while Smart Bidding calibrates on broken counts forces you to pay tuition twice when cleanup triggers a 14-to-30-day relearning window. Run this sequence first:"
        ],
        checklist: [
          "Reconcile 30–90 days of real Shopify, Stripe, or CRM receipts against Google Ads (healthy variance is 5%–10%; >15% missing proves signal loss, >15% excess proves duplicate tags or 'Every' lead counting).",
          "Audit Primary Goals & Custom Goals: strip page views, button taps, and duplicate GA4 imports out of Primary bidding columns so Smart Bidding stops chasing cheap clickers.",
          "Verify Enhanced Conversions match rates (>40% for leads, >60% for web checkouts) to catch silent double SHA-256 hashing bugs that display a green 'Recording' status at 0% match.",
          "Right-size infrastructure to ad spend: Google Tag Gateway ($0–low CDN, +11% uplift) for Google-only SMBs under $6k/mo; Managed sGTM + true same-origin reverse proxy + Meta CAPI ($20/mo infra) for $6k–$30k/mo brands; and sGTM + Google Data Manager API (OCI + VBB) for $30k+/mo pipelines."
        ]
      }
    ]
  }
];
