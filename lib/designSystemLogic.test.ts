import test from "node:test";
import assert from "node:assert/strict";
import {
  GBP_7X7_BENCHMARK_GRID,
  SIGNAL_PRECISION_TOKENS,
  computeContrastRatio,
  computeConcentricRadius,
  summarizeGeoGrid,
  shouldShowStickyCta,
} from "./designSystemLogic";

test("Signal Precision palette satisfies WCAG 2.1 AA contrast floors across light and dark surfaces", () => {
  // Light Primary CTA (#FFFFFF on #BA3A09) must exceed 4.5:1 (spec: 5.68:1)
  const lightCtaRatio = computeContrastRatio(
    "#FFFFFF",
    SIGNAL_PRECISION_TOKENS.lightCta
  );
  assert.ok(lightCtaRatio >= 5.5, `Expected >= 5.5, got ${lightCtaRatio}`);

  // Dark Primary CTA (#0B1120 on #F97316) must exceed 4.5:1 (spec: 6.72:1)
  const darkCtaRatio = computeContrastRatio(
    SIGNAL_PRECISION_TOKENS.darkCtaInk,
    SIGNAL_PRECISION_TOKENS.darkCta
  );
  assert.ok(darkCtaRatio >= 6.5, `Expected >= 6.5, got ${darkCtaRatio}`);

  // Muted caption (#475569) on subtle well (#F1F5F9) must pass WCAG 1.4.3 (>= 4.5:1)
  const mutedOnSubtleRatio = computeContrastRatio(
    SIGNAL_PRECISION_TOKENS.lightInkMuted,
    SIGNAL_PRECISION_TOKENS.lightSubtle
  );
  assert.ok(
    mutedOnSubtleRatio >= 6.5,
    `Expected >= 6.5, got ${mutedOnSubtleRatio}`
  );

  // Interactive border (#64748B) vs card surface (#FFFFFF) must pass SC 1.4.11 (>= 3.0:1)
  const interactiveBorderRatio = computeContrastRatio(
    SIGNAL_PRECISION_TOKENS.borderInteractive,
    SIGNAL_PRECISION_TOKENS.lightCard
  );
  assert.ok(
    interactiveBorderRatio >= 4.5,
    `Expected >= 4.5, got ${interactiveBorderRatio}`
  );

  // Teal positive (#0F766E) on light card (#FFFFFF) & (#2DD4BF) on dark card (#111C33)
  assert.ok(
    computeContrastRatio(
      SIGNAL_PRECISION_TOKENS.lightPositive,
      SIGNAL_PRECISION_TOKENS.lightCard
    ) >= 5.0
  );
  assert.ok(
    computeContrastRatio(
      SIGNAL_PRECISION_TOKENS.darkPositive,
      SIGNAL_PRECISION_TOKENS.darkCard
    ) >= 9.0
  );
});

test("computeConcentricRadius enforces nested framing rule and floors at zero", () => {
  assert.equal(computeConcentricRadius(16, 8), 8);
  assert.equal(computeConcentricRadius(12, 16), 0);
});

test("GBP 7x7 benchmark grid has 49 pins with dominant Top-3 Map Pack coverage", () => {
  assert.equal(GBP_7X7_BENCHMARK_GRID.length, 49);
  const summary = summarizeGeoGrid(GBP_7X7_BENCHMARK_GRID);
  assert.equal(summary.totalPins, 49);
  assert.equal(
    summary.top3Count + summary.midPackCount + summary.outsideCount,
    49
  );
  assert.ok(summary.top3SharePct >= 65);
  assert.ok(summary.averageRank <= 3.2);
});

test("shouldShowStickyCta respects route exclusions, dual sentinels, and input focus suppression", () => {
  // Visible mid-scroll on homepage
  assert.equal(
    shouldShowStickyCta({
      pathname: "/",
      heroVisible: false,
      footerCtaVisible: false,
      inputFocused: false,
    }),
    true
  );

  // Hidden on /contact and /templates/*
  assert.equal(
    shouldShowStickyCta({
      pathname: "/contact",
      heroVisible: false,
      footerCtaVisible: false,
      inputFocused: false,
    }),
    false
  );
  assert.equal(
    shouldShowStickyCta({
      pathname: "/templates/hvac",
      heroVisible: false,
      footerCtaVisible: false,
      inputFocused: false,
    }),
    false
  );

  // Hidden when hero CTA or footer CTA is visible
  assert.equal(
    shouldShowStickyCta({
      pathname: "/",
      heroVisible: true,
      footerCtaVisible: false,
      inputFocused: false,
    }),
    false
  );
  assert.equal(
    shouldShowStickyCta({
      pathname: "/services",
      heroVisible: false,
      footerCtaVisible: true,
      inputFocused: false,
    }),
    false
  );

  // Suppressed while typing in a form field
  assert.equal(
    shouldShowStickyCta({
      pathname: "/pricing",
      heroVisible: false,
      footerCtaVisible: false,
      inputFocused: true,
    }),
    false
  );
});
