import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateSignalLossAndRoi,
  MARKET_CONSENT_SCENARIOS,
  TRACKING_TIERS,
} from "./trackingLogic";

test("matches 2026 compounding signal-loss scenarios across US and EEA/UK", () => {
  const base = {
    desktopSharePercent: 40,
    safariSharePercent: 35,
    multiSessionSharePercent: 40,
    monthlyAdSpend: 15000,
    efficiencyGainPercent: 10,
  };

  const usClean = calculateSignalLossAndRoi({ ...base, scenarioId: "us-opt-out" });
  assert.equal(usClean.blendedAdBlockerLossPercent, 23.8);
  assert.equal(usClean.safariMultiSessionLossPercent, 10.7);
  assert.equal(usClean.survivingSignalPercent, 65.5);
  assert.equal(usClean.totalEffectiveLossPercent, 34.5);

  const usGdprBug = calculateSignalLossAndRoi({
    ...base,
    scenarioId: "us-misconfigured-gdpr",
  });
  assert.equal(usGdprBug.survivingSignalPercent, 42.6);
  assert.equal(usGdprBug.totalEffectiveLossPercent, 57.4);

  const eeaBasic = calculateSignalLossAndRoi({ ...base, scenarioId: "eea-basic" });
  assert.equal(eeaBasic.survivingSignalPercent, 29.5);
  assert.equal(eeaBasic.totalEffectiveLossPercent, 70.5);

  const eeaAdvanced = calculateSignalLossAndRoi({
    ...base,
    scenarioId: "eea-advanced",
  });
  assert.equal(eeaAdvanced.survivingSignalPercent, 47.5);
  assert.equal(eeaAdvanced.totalEffectiveLossPercent, 52.5);
});

test("matches 3-tier Phase 0 Tracking ROI payback benchmarks at 10% and 20% ad efficiency gains", () => {
  const shared = {
    scenarioId: "us-opt-out" as const,
    desktopSharePercent: 40,
    safariSharePercent: 35,
    multiSessionSharePercent: 40,
  };

  // Tier 1: $3,000/mo spend, $1,500 TCO
  const t1Low = calculateSignalLossAndRoi({
    ...shared,
    monthlyAdSpend: 3000,
    efficiencyGainPercent: 10,
  });
  assert.equal(t1Low.recommendedTier.id, "tier-1");
  assert.equal(t1Low.paybackMonths, 5.0);
  assert.equal(t1Low.net12MonthRoiPercent, 140);

  const t1High = calculateSignalLossAndRoi({
    ...shared,
    monthlyAdSpend: 3000,
    efficiencyGainPercent: 20,
  });
  assert.equal(t1High.paybackMonths, 2.5);
  assert.equal(t1High.net12MonthRoiPercent, 380);

  // Tier 2: $15,000/mo spend, $6,740 TCO
  const t2Low = calculateSignalLossAndRoi({
    ...shared,
    monthlyAdSpend: 15000,
    efficiencyGainPercent: 10,
  });
  assert.equal(t2Low.recommendedTier.id, "tier-2");
  assert.equal(t2Low.paybackMonths, 2.8);
  assert.equal(t2Low.net12MonthRoiPercent, 167);

  const t2High = calculateSignalLossAndRoi({
    ...shared,
    monthlyAdSpend: 15000,
    efficiencyGainPercent: 20,
  });
  assert.equal(t2High.paybackMonths, 1.3);
  assert.equal(t2High.net12MonthRoiPercent, 434);

  // Tier 3: $50,000/mo spend, $14,700 TCO
  const t3Low = calculateSignalLossAndRoi({
    ...shared,
    monthlyAdSpend: 50000,
    efficiencyGainPercent: 10,
  });
  assert.equal(t3Low.recommendedTier.id, "tier-3");
  assert.equal(t3Low.paybackMonths, 1.7);
  assert.equal(t3Low.net12MonthRoiPercent, 308);

  const t3High = calculateSignalLossAndRoi({
    ...shared,
    monthlyAdSpend: 50000,
    efficiencyGainPercent: 20,
  });
  assert.equal(t3High.paybackMonths, 0.8);
  assert.equal(t3High.net12MonthRoiPercent, 716);
});

test("every market scenario and tracking tier has valid boundaries", () => {
  assert.equal(MARKET_CONSENT_SCENARIOS.length, 4);
  assert.equal(TRACKING_TIERS.length, 3);
  for (const tier of TRACKING_TIERS) {
    assert.equal(
      tier.annualTco,
      tier.setupFee + (tier.monthlyInfraCost + tier.monthlyMaintenanceCost) * 12
    );
  }
});
