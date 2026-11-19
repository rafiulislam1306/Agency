export type AuditPriorityId =
  | "increase-conversions"
  | "fix-tracking"
  | "scale-google-ads"
  | "dominate-map-pack";

export type AuditBudgetId = "under-5k" | "5k-15k" | "15k-30k" | "30k-plus";

export type AuditTimelineId = "immediate" | "3-6-months" | "benchmarking";

export interface AuditOption<T extends string> {
  id: T;
  label: string;
  helper: string;
}

export const AUDIT_PRIORITIES: AuditOption<AuditPriorityId>[] = [
  {
    id: "increase-conversions",
    label: "Increase demo & lead conversions",
    helper: "Landing page CRO, form qualification & bounce reduction",
  },
  {
    id: "fix-tracking",
    label: "Fix tracking, GA4 & sGTM signal loss",
    helper: "Receipt-to-Ads reconciliation, Tag Gateway & Consent Mode",
  },
  {
    id: "scale-google-ads",
    label: "Scale zero-waste Google Ads & VBB",
    helper: "60/20/20 query isolation, PMax restraint & CRM offline sync",
  },
  {
    id: "dominate-map-pack",
    label: "Dominate Google Maps 3-Pack & AI search",
    helper: "GBP category precision, Proof-of-Work SAPs & review velocity",
  },
];

export const AUDIT_BUDGET_BRACKETS: AuditOption<AuditBudgetId>[] = [
  {
    id: "under-5k",
    label: "Under $5k / mo",
    helper: "Local SMB or early-stage search program",
  },
  {
    id: "5k-15k",
    label: "$5k – $15k / mo",
    helper: "Active regional or B2B acquisition budget",
  },
  {
    id: "15k-30k",
    label: "$15k – $30k / mo",
    helper: "Multi-channel growth & sGTM / CRO optimization",
  },
  {
    id: "30k-plus",
    label: "$30k+ / mo",
    helper: "High-ACV pipeline, Data Manager API & full RevOps",
  },
];

export const AUDIT_TIMELINES: AuditOption<AuditTimelineId>[] = [
  {
    id: "immediate",
    label: "Immediately / This quarter",
    helper: "Priority review with a senior strategist",
  },
  {
    id: "3-6-months",
    label: "3–6 months",
    helper: "Async Loom walkthrough & prioritized scorecard",
  },
  {
    id: "benchmarking",
    label: "Just benchmarking",
    helper: "Async competitive benchmark — zero sales pressure",
  },
];

export const POST_SUBMIT_ATTRIBUTION_OPTIONS = [
  "Google Search",
  "ChatGPT / Gemini / Perplexity",
  "LinkedIn / Podcast / Dark Social",
  "Clutch / G2 Reviews",
  "Peer or Client Referral",
];

const PERSONAL_WEBMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
]);

export function normalizeAuditUrl(raw: string): {
  valid: boolean;
  normalized: string;
  domain: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { valid: false, normalized: "", domain: "" };
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    const hostname = parsed.hostname.toLowerCase();
    // Require at least one dot and a 2+ char TLD
    if (!hostname.includes(".") || hostname.endsWith(".")) {
      return { valid: false, normalized: "", domain: "" };
    }
    const parts = hostname.split(".");
    const tld = parts[parts.length - 1];
    if (tld.length < 2) {
      return { valid: false, normalized: "", domain: "" };
    }
    return {
      valid: true,
      normalized: parsed.toString(),
      domain: hostname.replace(/^www\./, ""),
    };
  } catch {
    return { valid: false, normalized: "", domain: "" };
  }
}

export function validateAuditEmail(raw: string): {
  valid: boolean;
  isPersonalWebmail: boolean;
  message?: string;
} {
  const trimmed = raw.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmed || !emailRegex.test(trimmed)) {
    return {
      valid: false,
      isPersonalWebmail: false,
      message: "Please enter a valid work email address.",
    };
  }
  const domain = trimmed.split("@")[1] || "";
  const isPersonalWebmail = PERSONAL_WEBMAIL_DOMAINS.has(domain);
  return { valid: true, isPersonalWebmail };
}

export interface AuditRoutingDecision {
  trackLabel: string;
  deliverySla: string;
  specialistRole: string;
  matchedCaseStudy: {
    slug: string;
    title: string;
    metric: string;
  };
}

export function determineAuditRouting(
  priority: AuditPriorityId,
  budget: AuditBudgetId,
  timeline: AuditTimelineId
): AuditRoutingDecision {
  const isHighIntent =
    timeline === "immediate" && budget !== "under-5k";

  const specialistByPriority: Record<AuditPriorityId, string> = {
    "increase-conversions": "Head of Analytics & CRO",
    "fix-tracking": "Server-Side Tracking & Attribution Lead",
    "scale-google-ads": "Principal Google Ads & RevOps Strategist",
    "dominate-map-pack": "Local Map Pack & Entity SEO Lead",
  };

  const caseStudyByPriority: Record<
    AuditPriorityId,
    { slug: string; title: string; metric: string }
  > = {
    "increase-conversions": {
      slug: "saas-consulting",
      title: "B2B SaaS & Advisory: 1:1 CRO & CRM VBB",
      metric: "-57% junk leads · 2x revenue",
    },
    "fix-tracking": {
      slug: "ecommerce-store",
      title: "Independent Apparel Store: Leak Seal & Enhanced Conversions",
      metric: "+247% sales · 4.9x ROAS",
    },
    "scale-google-ads": {
      slug: "saas-consulting",
      title: "B2B SaaS & Advisory: 60/20/20 & Target ROAS",
      metric: "-57% junk leads · 2x revenue",
    },
    "dominate-map-pack": {
      slug: "local-service",
      title: "Regional HVAC Contractor: Map Pack 3-Pack Dominance",
      metric: "+180% calls · +$23,800/mo",
    },
  };

  return {
    trackLabel: isHighIntent
      ? "Senior Strategist Priority Track"
      : "Async Video & Written Scorecard Track",
    deliverySla: isHighIntent ? "Within 24 business hours" : "Within 48 hours",
    specialistRole: specialistByPriority[priority],
    matchedCaseStudy: caseStudyByPriority[priority],
  };
}
