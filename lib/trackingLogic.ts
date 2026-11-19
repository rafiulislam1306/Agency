export type MarketConsentScenarioId =
  | "us-opt-out"
  | "us-misconfigured-gdpr"
  | "eea-basic"
  | "eea-advanced";

export interface MarketConsentScenario {
  id: MarketConsentScenarioId;
  label: string;
  shortLabel: string;
  consentLossRate: number; // Effective fraction of pre-consent traffic lost to consent/banner gates
  consentSummary: string;
  explanation: string;
}

export interface SignalLossInputs {
  scenarioId: MarketConsentScenarioId;
  desktopSharePercent: number; // 0 - 100
  safariSharePercent: number; // 0 - 100
  multiSessionSharePercent: number; // 0 - 100
  monthlyAdSpend: number;
  efficiencyGainPercent: number; // e.g., 10, 15, 20
}

export interface TrackingTierSpec {
  id: "tier-1" | "tier-2" | "tier-3";
  name: string;
  spendBand: string;
  recommendedStack: string;
  setupFee: number;
  monthlyInfraCost: number;
  monthlyMaintenanceCost: number;
  annualTco: number;
  summary: string;
}

export interface SignalLossAndRoiResult {
  blendedAdBlockerLossPercent: number;
  safariMultiSessionLossPercent: number;
  consentDropLossPercent: number;
  survivingSignalPercent: number;
  totalEffectiveLossPercent: number;
  recommendedTier: TrackingTierSpec;
  monthlyAdSavings: number;
  annualAdSavings: number;
  monthlyOngoingCost: number;
  netMonthlyBenefit: number;
  paybackMonths: number;
  net12MonthRoiPercent: number;
}

export const MARKET_CONSENT_SCENARIOS: MarketConsentScenario[] = [
  {
    id: "us-opt-out",
    label: "US Site · Clean Opt-Out Setup",
    shortLabel: "US Opt-Out",
    consentLossRate: 0,
    consentSummary: "0.0% pre-opt-in gate (honors GPC)",
    explanation:
      "Even under lawful US opt-out rules, ad blockers and Safari 7-day caps still erase roughly a third of multi-session conversions.",
  },
  {
    id: "us-misconfigured-gdpr",
    label: "US Site · Misconfigured GDPR Banner",
    shortLabel: "US GDPR Bug",
    consentLossRate: 0.35,
    consentSummary: "35.0% unnecessary opt-in drop",
    explanation:
      "Deploying a global EU-style opt-in banner to US traffic needlessly blocks 30%–60% of lawful domestic conversions.",
  },
  {
    id: "eea-basic",
    label: "EEA / UK · Basic Consent Mode",
    shortLabel: "EEA Basic",
    consentLossRate: 0.55,
    consentSummary: "55.0% decline (0% modeled recovery)",
    explanation:
      "Basic Consent Mode blocks tags completely on declined sessions—starving Smart Bidding of over 70% of real customer signals.",
  },
  {
    id: "eea-advanced",
    label: "EEA / UK · Advanced Consent Mode",
    shortLabel: "EEA Advanced",
    consentLossRate: 0.275, // 55% decline with ~50% modeled recovery = 27.5% net residual consent loss
    consentSummary: "55.0% decline (~50% modeled recovery)",
    explanation:
      "Advanced Consent Mode sends cookieless pings that recover 30%–70% of unconsented signals while enforcing June 2026 ad_storage rules.",
  },
];

export const TRACKING_TIERS: TrackingTierSpec[] = [
  {
    id: "tier-1",
    name: "Tier 1: Local / SMB",
    spendBand: "Up to $6,000/mo ad spend",
    recommendedStack:
      "Google Tag Gateway (Cloudflare/CDN) + Enhanced Conversions + Clean GA4 Goals",
    setupFee: 1500,
    monthlyInfraCost: 0,
    monthlyMaintenanceCost: 0,
    annualTco: 1500,
    summary:
      "Zero server DevOps overhead. Delivers +11% first-party Google signal uplift and seals duplicate tag/micro-conversion leaks.",
  },
  {
    id: "tier-2",
    name: "Tier 2: Growth Multi-Channel",
    spendBand: "$6,000 – $30,000/mo ad spend",
    recommendedStack:
      "Managed sGTM (Stape Pro) + Same-Origin Proxy + Enhanced Conversions + Meta CAPI",
    setupFee: 3500,
    monthlyInfraCost: 20,
    monthlyMaintenanceCost: 250,
    annualTco: 6740,
    summary:
      "Restores Safari cookies beyond 7 days, lifts Meta EMQ to 7.5–9.0 (-17.8% cost/result), and improves Core Web Vitals.",
  },
  {
    id: "tier-3",
    name: "Tier 3: Scale / B2B Pipeline",
    spendBand: "$30,000+/mo ad spend",
    recommendedStack:
      "sGTM (Stape Biz / GCP) + Google Data Manager API (OCI) + CRM Value-Based Bidding",
    setupFee: 7500,
    monthlyInfraCost: 100,
    monthlyMaintenanceCost: 500,
    annualTco: 14700,
    summary:
      "Feeds verified SQLs, closed revenue, margins, and spam/refund retractions back to Google Ads (18%–65% pipeline CPA gain).",
  },
];

export interface TrackingFailureMode {
  mode: string;
  rootCause: string;
  biddingBehavior: string;
  financialConsequence: string;
}

export const TRACKING_FAILURE_MODES: TrackingFailureMode[] = [
  {
    mode: "Silent Underreporting",
    rootCause:
      "Ad blockers (37% desktop / 15% mobile), Safari 7-day & CNAME/IP caps, and Basic Consent Mode",
    biddingBehavior:
      "Underestimates conversion rates on high-margin desktop & multi-week Safari buyers",
    financialConsequence:
      "Cuts bids on profitable keywords and starves learning stability below 30–50 conv/mo",
  },
  {
    mode: "Inflated Overcounting",
    rootCause:
      "Lead count set to 'Every' (30% of cases), duplicate gtag+GTM (26%), thank-you refreshes (18%), GA4 + Ads overlap",
    biddingBehavior:
      "Sees phantom efficiency and bids aggressively on campaigns generating duplicate fires",
    financialConsequence:
      "Overbids unprofitable auctions while overstating ROAS on executive reports",
  },
  {
    mode: "Signal Pollution",
    rootCause:
      "Page views, button taps, or raw form fills marked Primary—or silently promoted by Custom Goals (67% of contractor accounts)",
    biddingBehavior:
      "Follows the path of least resistance and hunts cheap clickers instead of paying customers",
    financialConsequence:
      "High lead volume on dashboards paired with collapsing sales close rates",
  },
  {
    mode: "CRM / Value Blindness",
    rootCause:
      "No Offline Conversion Import, dropped gclid, <6h upload timing, or double SHA-256 hashing (green 'Recording' at 0% match)",
    biddingBehavior:
      "7-day bidding myopia treats a $0 spam inquiry identically to a $50,000 signed contract",
    financialConsequence:
      "Scales low-margin or bot leads while starving high-ACV pipeline opportunities",
  },
];

export interface MeasurementStackOption {
  option: string;
  monthlyInfra: string;
  capabilities: string;
  tradeOffs: string;
  bestFit: string;
}

export const MEASUREMENT_STACK_OPTIONS: MeasurementStackOption[] = [
  {
    option: "Google Tag Gateway (Cloudflare / CDN)",
    monthlyInfra: "$0–low CDN tier",
    capabilities:
      "First-party Google tag delivery from your own domain; +11% signal & conversion uplift (Google Academy)",
    tradeOffs: "Covers GA4 & Google Ads only; no Meta/TikTok routing or PII scrubbing",
    bestFit: "Local SMBs & Google-only advertisers ($1.5k–$5k/mo spend)",
  },
  {
    option: "Managed sGTM (Stape, TAGGRS, Addingwell)",
    monthlyInfra: "$17–$200+/mo",
    capabilities:
      "Multi-channel server routing, same-origin Safari cookie extension, Core Web Vitals speed gain",
    tradeOffs:
      "Request billing counts scripts/bots; Shopify app proxy currently strips forwarded cookies",
    bestFit: "Growth ecommerce & multi-channel brands ($5k–$30k+/mo spend)",
  },
  {
    option: "Self-Hosted sGTM (Google Cloud Run)",
    monthlyInfra: "~$90–$300+/mo",
    capabilities: "Full GCP ownership (2+ always-on instances), custom security & enterprise scale",
    tradeOffs: "Requires cloud DevOps; unexcluded request logs can add $100+/mo in billing",
    bestFit: "Mid-market & enterprise teams with in-house cloud engineering",
  },
  {
    option: "CRM + Data Manager API (OCI + VBB)",
    monthlyInfra: "Included in CRM / sGTM",
    capabilities:
      "Feeds SQLs, closed revenue, margins & formal refund retractions back to Google Ads (18%–65% CPA lift)",
    tradeOffs:
      "Requires clean gclid capture, 6–8h indexing wait window, and >40% Enhanced Conversions match rate",
    bestFit: "B2B, home services, legal & high-ACV sales pipelines",
  },
];

export function selectRightSizedTier(monthlyAdSpend: number): TrackingTierSpec {
  if (monthlyAdSpend <= 6000) {
    return TRACKING_TIERS[0];
  }
  if (monthlyAdSpend <= 30000) {
    return TRACKING_TIERS[1];
  }
  return TRACKING_TIERS[2];
}

export function calculateSignalLossAndRoi(
  inputs: SignalLossInputs
): SignalLossAndRoiResult {
  const scenario =
    MARKET_CONSENT_SCENARIOS.find((s) => s.id === inputs.scenarioId) ||
    MARKET_CONSENT_SCENARIOS[0];

  const desktopFrac = Math.max(0, Math.min(1, inputs.desktopSharePercent / 100));
  const safariFrac = Math.max(0, Math.min(1, inputs.safariSharePercent / 100));
  const multiSessionFrac = Math.max(
    0,
    Math.min(1, inputs.multiSessionSharePercent / 100)
  );
  const safeSpend = Math.max(1000, inputs.monthlyAdSpend);
  const gainFrac = Math.max(0.05, Math.min(0.4, inputs.efficiencyGainPercent / 100));

  // 2026 device blocking benchmarks: 37% desktop, 15% mobile
  const adBlockerLossFrac = desktopFrac * 0.37 + (1 - desktopFrac) * 0.15;
  const afterAdBlocker = 1 - adBlockerLossFrac;

  // Sequential Safari 7-day multi-session loss
  const safariLossFrac = afterAdBlocker * safariFrac * multiSessionFrac;
  const preConsentSurviving = afterAdBlocker - safariLossFrac;

  // Consent / Banner sequential impact
  const consentDropFrac = preConsentSurviving * scenario.consentLossRate;
  const survivingSignalFrac = Math.max(0, preConsentSurviving - consentDropFrac);
  const totalLossFrac = 1 - survivingSignalFrac;

  const recommendedTier = selectRightSizedTier(safeSpend);
  const monthlyAdSavings = Math.round(safeSpend * gainFrac);
  const annualAdSavings = monthlyAdSavings * 12;
  const monthlyOngoingCost =
    recommendedTier.monthlyInfraCost + recommendedTier.monthlyMaintenanceCost;
  const netMonthlyBenefit = monthlyAdSavings - monthlyOngoingCost;

  const paybackMonths =
    netMonthlyBenefit > 0
      ? Number((recommendedTier.setupFee / netMonthlyBenefit).toFixed(1))
      : 99;

  const net12MonthRoiPercent = Math.round(
    ((annualAdSavings - recommendedTier.annualTco) / recommendedTier.annualTco) *
      100
  );

  return {
    blendedAdBlockerLossPercent: Number((adBlockerLossFrac * 100).toFixed(1)),
    safariMultiSessionLossPercent: Number((safariLossFrac * 100).toFixed(1)),
    consentDropLossPercent: Number((consentDropFrac * 100).toFixed(1)),
    survivingSignalPercent: Number((survivingSignalFrac * 100).toFixed(1)),
    totalEffectiveLossPercent: Number((totalLossFrac * 100).toFixed(1)),
    recommendedTier,
    monthlyAdSavings,
    annualAdSavings,
    monthlyOngoingCost,
    netMonthlyBenefit,
    paybackMonths,
    net12MonthRoiPercent,
  };
}
