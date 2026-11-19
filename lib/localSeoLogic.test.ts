import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateMapPackOpportunity,
  localVerticalPresets,
  GEO_GRID_BEFORE,
  GEO_GRID_AFTER,
} from "./localSeoLogic";

test("matches 2026 HVAC Map Pack #1 missed revenue benchmark math", () => {
  const result = calculateMapPackOpportunity({
    monthlySearches: 2000,
    avgJobValue: 5000,
    profileToLeadCvr: 5,
    closeRate: 30,
    currentRankBucket: "outside",
    targetPosition: 1,
    monthlyRetainer: 1100,
  });

  // 2,000 * 17.6% = 352 clicks -> 5% CVR = 17 leads -> 30% close = 5 booked jobs -> $25,000/mo
  assert.equal(result.targetMonthlyClicks, 352);
  assert.equal(result.targetMonthlyLeads, 17);
  assert.equal(result.targetBookedJobs, 5);
  assert.equal(result.targetMonthlyRevenue, 25000);
  assert.equal(result.currentBookedJobs, 0);
  assert.equal(result.missedMonthlyRevenue, 25000);
  assert.equal(result.jobsPerQuarterToBreakEven, 1);
});

test("demonstrates steep click drop-off between Map Pack Top 3 and outside positions", () => {
  const outside = calculateMapPackOpportunity({
    monthlySearches: 2000,
    avgJobValue: 2000,
    profileToLeadCvr: 5,
    closeRate: 30,
    currentRankBucket: "outside",
    targetPosition: 3,
    monthlyRetainer: 1000,
  });

  const finder = calculateMapPackOpportunity({
    monthlySearches: 2000,
    avgJobValue: 2000,
    profileToLeadCvr: 5,
    closeRate: 30,
    currentRankBucket: "finder",
    targetPosition: 1,
    monthlyRetainer: 1000,
  });

  assert.ok(outside.targetMonthlyClicks > outside.currentMonthlyClicks * 5);
  assert.ok(finder.targetMonthlyClicks > finder.currentMonthlyClicks * 3);
  assert.ok(outside.missedMonthlyRevenue > 0);
});

test("every vertical preset and geo-grid matrix is structurally valid", () => {
  for (const preset of localVerticalPresets) {
    const res = calculateMapPackOpportunity({
      monthlySearches: preset.monthlySearches,
      avgJobValue: preset.avgJobValue,
      profileToLeadCvr: preset.profileToLeadCvr,
      closeRate: preset.closeRate,
      currentRankBucket: "outside",
      targetPosition: 1,
      monthlyRetainer: preset.monthlyRetainer,
    });
    assert.ok(res.missedAnnualRevenue > 0);
    assert.ok(res.annualizedRoiMultiple > 1);
  }

  assert.equal(GEO_GRID_BEFORE.length, 5);
  assert.equal(GEO_GRID_AFTER.length, 5);
  // Center office pin is #1 before and after; outer ring improves significantly
  assert.equal(GEO_GRID_BEFORE[2][2], 1);
  assert.equal(GEO_GRID_AFTER[2][2], 1);
  assert.ok(GEO_GRID_AFTER[0][0] < GEO_GRID_BEFORE[0][0]);
});
