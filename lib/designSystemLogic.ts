/**
 * Signal Precision Design System v2026.1 & UX QA Pure Logic
 * Covers WCAG 2.1 AA contrast validation, concentric border radius math,
 * 7x7 GBP Geo-Grid benchmark telemetry, and Mobile Sticky CTA state rules.
 */

export interface GeoGridSummary {
  totalPins: number;
  top3Count: number;
  midPackCount: number;
  outsideCount: number;
  top3SharePct: number;
  averageRank: number;
}

export interface StickyCtaVisibilityInput {
  pathname: string;
  heroVisible: boolean;
  footerCtaVisible: boolean;
  inputFocused: boolean;
}

/**
 * 7x7 (49-pin) local service Geo-Grid matrix representing a verified
 * 6-month GBP Map Pack campaign outcome (Houston HVAC benchmark).
 */
export const GBP_7X7_BENCHMARK_GRID: readonly number[] = [
  5, 4, 3, 2, 3, 4, 6,
  4, 2, 2, 1, 2, 3, 5,
  3, 2, 1, 1, 1, 2, 3,
  2, 1, 1, 1, 1, 2, 3,
  3, 2, 1, 1, 1, 2, 4,
  4, 3, 2, 1, 2, 3, 5,
  6, 4, 3, 2, 3, 5, 7,
] as const;

export const SIGNAL_PRECISION_TOKENS = {
  lightCanvas: "#F8FAFC",
  lightCard: "#FFFFFF",
  lightSubtle: "#F1F5F9",
  lightInkPrimary: "#0F172A",
  lightInkSecondary: "#334155",
  lightInkMuted: "#475569",
  lightTrust: "#1D4ED8",
  lightCta: "#BA3A09",
  lightCtaHover: "#9A3412",
  lightPositive: "#0F766E",
  lightNegative: "#B91C1C",
  borderInteractive: "#64748B",
  darkCanvas: "#0B1120",
  darkCard: "#111C33",
  darkElevated: "#1A2744",
  darkInkPrimary: "#F8FAFC",
  darkInkSecondary: "#CBD5E1",
  darkInkMuted: "#94A3B8",
  darkTrust: "#60A5FA",
  darkCta: "#F97316",
  darkCtaInk: "#0B1120",
  darkPositive: "#2DD4BF",
  darkNegative: "#F87171",
} as const;

function hexToLinearChannel(hexByte: number): number {
  const srgb = hexByte / 255;
  return srgb <= 0.03928
    ? srgb / 12.92
    : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex: string): number {
  const cleaned = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    throw new Error(`Invalid 6-digit hex color: ${hex}`);
  }
  const r = hexToLinearChannel(parseInt(cleaned.slice(0, 2), 16));
  const g = hexToLinearChannel(parseInt(cleaned.slice(2, 4), 16));
  const b = hexToLinearChannel(parseInt(cleaned.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Computes WCAG 2.1 contrast ratio between two 6-digit hex colors (1.00 to 21.00).
 */
export function computeContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

/**
 * Signal Precision concentric nested framing rule:
 * r_inner = max(0, r_outer - bezel_padding)
 */
export function computeConcentricRadius(outerRadiusPx: number, bezelPx: number): number {
  return Math.max(0, outerRadiusPx - bezelPx);
}

/**
 * Summarizes any N-pin local Geo-Grid rank array into Top-3 Map Pack,
 * Mid-Pack (#4-#6), and Outside (#7+) cohorts.
 */
export function summarizeGeoGrid(ranks: readonly number[]): GeoGridSummary {
  if (ranks.length === 0) {
    return {
      totalPins: 0,
      top3Count: 0,
      midPackCount: 0,
      outsideCount: 0,
      top3SharePct: 0,
      averageRank: 0,
    };
  }
  let top3Count = 0;
  let midPackCount = 0;
  let outsideCount = 0;
  let sum = 0;

  for (const rank of ranks) {
    sum += rank;
    if (rank <= 3) {
      top3Count += 1;
    } else if (rank <= 6) {
      midPackCount += 1;
    } else {
      outsideCount += 1;
    }
  }

  return {
    totalPins: ranks.length,
    top3Count,
    midPackCount,
    outsideCount,
    top3SharePct: Math.round((top3Count / ranks.length) * 100),
    averageRank: Math.round((sum / ranks.length) * 10) / 10,
  };
}

/**
 * Mobile Sticky CTA visibility state machine (Research #7 UX QA rule):
 * - Hidden on dedicated conversion/template pages (/contact, /templates/*)
 * - Hidden whenever hero CTA sentinel or footer conversion sentinel is visible
 * - Suppressed while a form field is focused to avoid software keyboard collision
 */
export function shouldShowStickyCta(input: StickyCtaVisibilityInput): boolean {
  const path = input.pathname || "/";
  if (path === "/contact" || path.startsWith("/contact/") || path.startsWith("/templates")) {
    return false;
  }
  if (input.heroVisible || input.footerCtaVisible || input.inputFocused) {
    return false;
  }
  return true;
}
