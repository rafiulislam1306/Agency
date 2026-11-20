/**
 * Pure logic & deterministic structural validators for the 2026 B2B Agency Homepage Blueprint:
 * - 12-column (4x3) Bento Grid unit-area conservation (4 + 2 + 2 + 1 + 2 + 1 = 12 units)
 * - Partially persistent mobile header scroll state machine
 * - Multi-open FAQ accordion + Expand All / Collapse All state helpers
 * - Two-step Breadcrumb Micro-Audit validation
 */

import {
  normalizeAuditUrl,
  validateAuditEmail,
  type AuditBudgetId,
  type AuditPriorityId,
} from "./auditFormLogic";

export interface BentoTileSpec {
  id: string;
  domOrder: number;
  title: string;
  colSpanDesktop: number; // out of 12 columns
  rowSpanDesktop: number; // out of 3 rows
  interactive: boolean;
}

export const BENTO_4X3_TILES: readonly BentoTileSpec[] = [
  {
    id: "google-ads",
    domOrder: 1,
    title: "Google Ads & Paid Search",
    colSpanDesktop: 6, // 2 Bento units wide
    rowSpanDesktop: 2, // 2 Bento units tall -> 4 units
    interactive: true,
  },
  {
    id: "local-seo-gbp",
    domOrder: 2,
    title: "Local SEO & Google Business Profile",
    colSpanDesktop: 6, // 2 units wide
    rowSpanDesktop: 1, // 1 unit tall -> 2 units
    interactive: true,
  },
  {
    id: "ga4-sgtm-tracking",
    domOrder: 3,
    title: "GA4 & Server-Side GTM Tracking",
    colSpanDesktop: 6, // 2 units wide
    rowSpanDesktop: 1, // 1 unit tall -> 2 units
    interactive: true,
  },
  {
    id: "client-retention-proof",
    domOrder: 4,
    title: "Client Retention Proof",
    colSpanDesktop: 3, // 1 unit wide
    rowSpanDesktop: 1, // 1 unit tall -> 1 unit
    interactive: false,
  },
  {
    id: "compounding-revenue-loop",
    domOrder: 5,
    title: "One Compounding Revenue Loop",
    colSpanDesktop: 6, // 2 units wide
    rowSpanDesktop: 1, // 1 unit tall -> 2 units
    interactive: true,
  },
  {
    id: "diagnostic-off-ramp",
    domOrder: 6,
    title: "Find Your Biggest Revenue Leak",
    colSpanDesktop: 3, // 1 unit wide
    rowSpanDesktop: 1, // 1 unit tall -> 1 unit
    interactive: true,
  },
] as const;

export function validateBentoUnitConservation(
  tiles: readonly BentoTileSpec[]
): {
  valid: boolean;
  totalUnits: number;
  domSequential: boolean;
} {
  // 1 Bento unit = 3 CSS columns x 1 row on a 12-col x 3-row (4x3) grid
  const totalUnits = tiles.reduce(
    (sum, t) => sum + (t.colSpanDesktop / 3) * t.rowSpanDesktop,
    0
  );
  const domSequential = tiles.every((t, idx) => t.domOrder === idx + 1);
  return {
    valid: totalUnits === 12 && tiles.length === 6 && domSequential,
    totalUnits,
    domSequential,
  };
}

/**
 * Partially persistent mobile header state machine:
 * - Always visible near top of page (<= 64px) or when any nav drawer/dropdown is open
 * - Hides smoothly on downward reading scrolls past 80px (delta > 8px)
 * - Immediately reveals on upward scroll (delta < -6px)
 */
export function computeMobileHeaderVisible(input: {
  scrollY: number;
  prevScrollY: number;
  currentlyVisible: boolean;
  menuOrDrawerOpen: boolean;
}): boolean {
  if (input.menuOrDrawerOpen || input.scrollY <= 64) {
    return true;
  }
  const delta = input.scrollY - input.prevScrollY;
  if (delta > 8 && input.scrollY > 80) {
    return false;
  }
  if (delta < -6) {
    return true;
  }
  return input.currentlyVisible;
}

/**
 * Multi-open FAQ state helpers (NN/g desktop & mobile accordion guidelines)
 */
export function toggleFaqIndex(
  openIndices: readonly number[],
  index: number
): number[] {
  if (openIndices.includes(index)) {
    return openIndices.filter((i) => i !== index);
  }
  return [...openIndices, index].sort((a, b) => a - b);
}

export function setAllFaqIndices(totalItems: number, expand: boolean): number[] {
  if (!expand || totalItems <= 0) return [];
  return Array.from({ length: totalItems }, (_, i) => i);
}

/**
 * Two-Step Breadcrumb Micro-Audit step options & validation
 */
export interface TwoStepPriorityOption {
  id: AuditPriorityId;
  label: string;
  helper: string;
}

export const TWO_STEP_AUDIT_PRIORITIES: readonly TwoStepPriorityOption[] = [
  {
    id: "scale-google-ads",
    label: "Google Ads Wasted Spend",
    helper: "Cut broad-match & Search Partner leaks",
  },
  {
    id: "dominate-map-pack",
    label: "Local SEO / GBP Rankings",
    helper: "Win Top-3 Map Pack & AI local answers",
  },
  {
    id: "fix-tracking",
    label: "GA4 & Server-Side Tracking",
    helper: "Fix 35%–70% signal loss & CRM parity",
  },
  {
    id: "increase-conversions",
    label: "Full-Funnel Audit",
    helper: "Audit Ads, GBP, tracking & CRO together",
  },
] as const;

export interface TwoStepSpendOption {
  id: AuditBudgetId;
  label: string;
}

export const TWO_STEP_AD_SPEND_OPTIONS: readonly TwoStepSpendOption[] = [
  { id: "under-5k", label: "<$5K" },
  { id: "5k-15k", label: "$5K–$20K" },
  { id: "15k-30k", label: "$20K–$50K" },
  { id: "30k-plus", label: "$50K+" },
] as const;

export function validateTwoStepStep1(input: {
  priority: AuditPriorityId | "";
  spend: AuditBudgetId | "";
}): { valid: boolean; error: string | null } {
  if (!input.priority) {
    return {
      valid: false,
      error: "Select what our senior team should audit first.",
    };
  }
  if (!input.spend) {
    return {
      valid: false,
      error: "Select your monthly ad spend bracket so we right-size the teardown.",
    };
  }
  return { valid: true, error: null };
}

export function validateTwoStepStep2(input: {
  websiteUrl: string;
  email: string;
  firstName: string;
}): {
  valid: boolean;
  error: string | null;
  normalizedUrl?: string;
  domain?: string;
} {
  const urlCheck = normalizeAuditUrl(input.websiteUrl);
  if (!urlCheck.valid) {
    return {
      valid: false,
      error: "Enter your website domain (for example, yourcompany.com).",
    };
  }
  const emailCheck = validateAuditEmail(input.email);
  if (!emailCheck.valid) {
    return {
      valid: false,
      error: emailCheck.message || "Enter a valid work email address.",
    };
  }
  if (input.firstName.trim().length < 2) {
    return {
      valid: false,
      error: "Enter your first name so our strategist can personalize your Loom video.",
    };
  }
  return {
    valid: true,
    error: null,
    normalizedUrl: urlCheck.normalized,
    domain: urlCheck.domain,
  };
}
