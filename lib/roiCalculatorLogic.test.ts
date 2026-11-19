import test from "node:test";
import assert from "node:assert/strict";
import {
  calculatePipelineEconomics,
  getFlatManagementFee,
  industryBenchmarkPresets,
} from "./roiCalculatorLogic";

test("flat management fee scales predictably in flat tiers rather than linear %", () => {
  assert.equal(getFlatManagementFee(1000), 750);
  assert.equal(getFlatManagementFee(2500), 950);
  assert.equal(getFlatManagementFee(5000), 1250);
  assert.equal(getFlatManagementFee(12000), 1650);
});

test("doubling landing page conversion rate halves cost per qualified lead", () => {
  const baseline = calculatePipelineEconomics({
    monthlyBudget: 5000,
    avgCpc: 10,
    landingPageCvr: 2.5,
    avgDealValue: 4500,
    closeRate: 25,
  });

  const optimized = calculatePipelineEconomics({
    monthlyBudget: 5000,
    avgCpc: 10,
    landingPageCvr: 5.0,
    avgDealValue: 4500,
    closeRate: 25,
  });

  assert.equal(baseline.estimatedClicks, 500);
  assert.equal(baseline.qualifiedLeads, 13); // Math.round(500 * 0.025) = 13
  assert.equal(optimized.qualifiedLeads, 25); // 500 * 0.05 = 25
  assert.ok(optimized.costPerQualifiedLead < baseline.costPerQualifiedLead);
  assert.ok(optimized.projectedRevenue > baseline.projectedRevenue);
});

test("high-spend accounts show positive annual fee savings vs 15% of spend agencies", () => {
  const highSpend = calculatePipelineEconomics({
    monthlyBudget: 12000,
    avgCpc: 12,
    landingPageCvr: 5.0,
    avgDealValue: 5000,
    closeRate: 25,
  });

  assert.equal(highSpend.flatManagementFee, 1650);
  assert.equal(highSpend.percentSpendAgencyFee, 1800);
  assert.equal(highSpend.annualFeeSavingsVsPercentModel, 1800);
  assert.ok(highSpend.breakEvenCustomers >= 1);
});

test("all industry benchmark presets produce valid positive projections", () => {
  for (const preset of industryBenchmarkPresets) {
    const result = calculatePipelineEconomics({
      monthlyBudget: 3000,
      avgCpc: preset.avgCpc,
      landingPageCvr: preset.optimizedCvr,
      avgDealValue: preset.avgDealValue,
      closeRate: preset.closeRate,
    });
    assert.ok(result.qualifiedLeads >= 1);
    assert.ok(result.projectedRevenue > 0);
    assert.ok(result.roasMultiple > 0);
  }
});
