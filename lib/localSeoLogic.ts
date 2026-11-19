export interface LocalVerticalPreset {
  id: string;
  label: string;
  monthlySearches: number;
  avgJobValue: number;
  profileToLeadCvr: number;
  closeRate: number;
  monthlyRetainer: number;
  contextNote: string;
}

export interface LocalRankingWeight {
  factor: string;
  weightLabel: string;
  percentBar: number;
  focus: string;
}

export interface MapPackOpportunityInputs {
  monthlySearches: number;
  avgJobValue: number;
  profileToLeadCvr: number;
  closeRate: number;
  currentRankBucket: "outside" | "finder" | "top3";
  targetPosition: 1 | 2 | 3;
  monthlyRetainer: number;
}

export interface MapPackOpportunityResult {
  currentCtrPercent: number;
  targetCtrPercent: number;
  currentMonthlyClicks: number;
  targetMonthlyClicks: number;
  targetMonthlyLeads: number;
  currentBookedJobs: number;
  targetBookedJobs: number;
  currentMonthlyRevenue: number;
  targetMonthlyRevenue: number;
  missedMonthlyRevenue: number;
  missedAnnualRevenue: number;
  jobsPerQuarterToBreakEven: number;
  annualizedRoiMultiple: number;
}

export const MAP_PACK_CTR_BY_POSITION: Record<1 | 2 | 3, number> = {
  1: 17.6,
  2: 15.4,
  3: 15.1,
};

export const CURRENT_RANK_CTR: Record<"outside" | "finder" | "top3", number> = {
  outside: 1.5, // Position #8–#12+ (effectively invisible outside Map Pack)
  finder: 4.5, // Positions #4–#6 (Local Finder after the 29.6pt cliff)
  top3: 15.1, // Already #3, aiming for #1
};

export const localVerticalPresets: LocalVerticalPreset[] = [
  {
    id: "hvac",
    label: "HVAC Contractor",
    monthlySearches: 2000,
    avgJobValue: 5000,
    profileToLeadCvr: 5.0,
    closeRate: 30,
    monthlyRetainer: 1100,
    contextNote:
      "System replacements & urgent cooling dispatches. 75% of homeowners pick a contractor within 30 minutes.",
  },
  {
    id: "roofing",
    label: "Roofing Replacement",
    monthlySearches: 1200,
    avgJobValue: 14500,
    profileToLeadCvr: 4.0,
    closeRate: 25,
    monthlyRetainer: 1100,
    contextNote:
      "High-ticket storm & replacement jobs where a single booked roof pays for over a full year of Local SEO.",
  },
  {
    id: "plumbing",
    label: "Emergency Plumbing",
    monthlySearches: 2800,
    avgJobValue: 850,
    profileToLeadCvr: 6.0,
    closeRate: 45,
    monthlyRetainer: 950,
    contextNote:
      "73% mobile search initiation—homeowners tap-to-call the first 4.5+ star listing in the 3-Pack.",
  },
  {
    id: "dental-legal",
    label: "Dental / Legal Firm",
    monthlySearches: 1600,
    avgJobValue: 3200,
    profileToLeadCvr: 4.5,
    closeRate: 35,
    monthlyRetainer: 1100,
    contextNote:
      "45% of buyers cross-check AI recommendations against Google Map Pack reviews (4.5+ stars, 20+ recent reviews).",
  },
];

export const localRankingWeights2026: LocalRankingWeight[] = [
  {
    factor: "Google Business Profile (GBP) Signals",
    weightLabel: "~32%",
    percentBar: 32,
    focus:
      "Primary category ('IS a' vs. 'HAS a' test—the #1 weighted factor), relevant secondary categories, and complete service menus.",
  },
  {
    factor: "On-Page Website & Service-Area Pages",
    weightLabel: "~19%",
    percentBar: 19,
    focus:
      "Evidence-backed Service-Area Pages (600–1,000 words, local job Proof of Work) + areaServed JSON-LD schema.",
  },
  {
    factor: "Review Velocity & Reputation Signals",
    weightLabel: "16%–20%",
    percentBar: 18,
    focus:
      "Recency (<90 days), 4.5+ star floor, compliant SMS asks (zero review gating), and <48-hour owner responses.",
  },
  {
    factor: "Hyper-Local Link Signals",
    weightLabel: "~15%",
    percentBar: 15,
    focus:
      "Regional chambers, trade associations, local sponsorships, and community press citations.",
  },
  {
    factor: "Behavioral & Engagement Signals",
    weightLabel: "~8%",
    percentBar: 8,
    focus:
      "Tap-to-call clicks, direction requests, photo views, and profile dwell time validating real-world demand.",
  },
  {
    factor: "Citation Consistency (NAP Baseline)",
    weightLabel: "6%–7%",
    percentBar: 7,
    focus:
      "Character-for-character Name, Address, Phone & hours match across Apple Maps, Yelp, Bing, and directories.",
  },
];

// 5x5 multi-mile radius geo-grid showing classic office proximity bias vs. expanded dominance
export const GEO_GRID_BEFORE: number[][] = [
  [12, 11, 9, 10, 14],
  [10, 8, 6, 8, 12],
  [9, 5, 1, 6, 11],
  [11, 8, 7, 9, 13],
  [14, 12, 10, 12, 16],
];

export const GEO_GRID_AFTER: number[][] = [
  [3, 2, 2, 3, 4],
  [2, 2, 1, 2, 3],
  [2, 1, 1, 1, 2],
  [3, 2, 1, 2, 3],
  [4, 3, 2, 3, 4],
];

export function calculateMapPackOpportunity(
  inputs: MapPackOpportunityInputs
): MapPackOpportunityResult {
  const safeSearches = Math.max(100, inputs.monthlySearches);
  const safeAov = Math.max(100, inputs.avgJobValue);
  const safeCvr = Math.max(1, Math.min(25, inputs.profileToLeadCvr));
  const safeClose = Math.max(5, Math.min(90, inputs.closeRate));
  const safeRetainer = Math.max(500, inputs.monthlyRetainer);

  const currentCtrPercent = CURRENT_RANK_CTR[inputs.currentRankBucket];
  const targetCtrPercent = MAP_PACK_CTR_BY_POSITION[inputs.targetPosition];

  const currentMonthlyClicks = Math.round(
    safeSearches * (currentCtrPercent / 100)
  );
  const targetMonthlyClicks = Math.round(
    safeSearches * (targetCtrPercent / 100)
  );

  const currentMonthlyLeads = currentMonthlyClicks * (safeCvr / 100);
  const targetMonthlyLeadsRaw = targetMonthlyClicks * (safeCvr / 100);
  const targetMonthlyLeads = Math.max(1, Math.floor(targetMonthlyLeadsRaw));

  const currentBookedJobs = Math.floor(currentMonthlyLeads * (safeClose / 100));
  const targetBookedJobs = Math.max(
    1,
    Math.floor(targetMonthlyLeadsRaw * (safeClose / 100))
  );

  const currentMonthlyRevenue = currentBookedJobs * safeAov;
  const targetMonthlyRevenue = targetBookedJobs * safeAov;
  const missedMonthlyRevenue = Math.max(
    0,
    targetMonthlyRevenue - currentMonthlyRevenue
  );
  const missedAnnualRevenue = missedMonthlyRevenue * 12;

  const quarterlyRetainer = safeRetainer * 3;
  const jobsPerQuarterToBreakEven = Math.max(
    1,
    Math.ceil(quarterlyRetainer / safeAov)
  );

  const annualRetainer = safeRetainer * 12;
  const annualizedRoiMultiple = Number(
    (missedAnnualRevenue / annualRetainer).toFixed(1)
  );

  return {
    currentCtrPercent,
    targetCtrPercent,
    currentMonthlyClicks,
    targetMonthlyClicks,
    targetMonthlyLeads,
    currentBookedJobs,
    targetBookedJobs,
    currentMonthlyRevenue,
    targetMonthlyRevenue,
    missedMonthlyRevenue,
    missedAnnualRevenue,
    jobsPerQuarterToBreakEven,
    annualizedRoiMultiple,
  };
}
