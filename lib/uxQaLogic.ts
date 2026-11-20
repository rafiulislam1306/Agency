/**
 * Pure UX & Performance QA helpers implementing the 2026 B2B Next.js + Tailwind QA Checklist:
 * - WCAG 2.2 SC 2.5.7 single-pointer numeric stepper clamping
 * - INP progressive main-thread yielding (scheduler.yield() with setTimeout fallback)
 * - WCAG 2.2 SC 3.3.7 Redundant Entry draft persistence across multi-track lead forms
 */

export interface LeadDraft {
  websiteUrl: string;
  email: string;
  businessName: string;
}

const LEAD_DRAFT_STORAGE_KEY = "leadgrow_audit_draft_v1";

/**
 * Deterministic numeric stepper with boundary clamping and floating-point rounding.
 * Powers single-pointer +/- controls alongside range sliders (WCAG 2.2 SC 2.5.7).
 */
export function stepNumericValue(
  current: number,
  delta: number,
  min: number,
  max: number,
  decimals = 0
): number {
  const factor = Math.pow(10, decimals);
  const raw = Math.round((current + delta) * factor) / factor;
  const clamped = Math.min(max, Math.max(min, raw));
  return Math.round(clamped * factor) / factor;
}

/**
 * Progressive main-thread yield helper for heavy client callbacks (INP protection).
 * Uses Baseline scheduler.yield() when available, falling back cleanly to setTimeout(0).
 */
export async function yieldToMain(): Promise<void> {
  const g = globalThis as typeof globalThis & {
    scheduler?: { yield?: () => Promise<void> };
  };
  if (g.scheduler && typeof g.scheduler.yield === "function") {
    return g.scheduler.yield();
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Parses a serialized lead draft safely for WCAG 2.2 SC 3.3.7 Redundant Entry auto-population.
 */
export function parseLeadDraft(raw: string | null): LeadDraft {
  const empty: LeadDraft = { websiteUrl: "", email: "", businessName: "" };
  if (!raw) return empty;
  try {
    const parsed = JSON.parse(raw) as Partial<LeadDraft>;
    return {
      websiteUrl: typeof parsed.websiteUrl === "string" ? parsed.websiteUrl : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      businessName:
        typeof parsed.businessName === "string" ? parsed.businessName : "",
    };
  } catch {
    return empty;
  }
}

export function readLeadDraft(): LeadDraft {
  if (typeof window === "undefined") {
    return { websiteUrl: "", email: "", businessName: "" };
  }
  try {
    return parseLeadDraft(window.sessionStorage.getItem(LEAD_DRAFT_STORAGE_KEY));
  } catch {
    return { websiteUrl: "", email: "", businessName: "" };
  }
}

export function writeLeadDraft(patch: Partial<LeadDraft>): void {
  if (typeof window === "undefined") return;
  try {
    const current = readLeadDraft();
    const next: LeadDraft = {
      websiteUrl:
        patch.websiteUrl !== undefined ? patch.websiteUrl : current.websiteUrl,
      email: patch.email !== undefined ? patch.email : current.email,
      businessName:
        patch.businessName !== undefined
          ? patch.businessName
          : current.businessName,
    };
    window.sessionStorage.setItem(LEAD_DRAFT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota or private-mode security errors
  }
}
