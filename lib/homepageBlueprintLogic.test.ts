import test from "node:test";
import assert from "node:assert/strict";
import {
  BENTO_4X3_TILES,
  validateBentoUnitConservation,
  computeMobileHeaderVisible,
  toggleFaqIndex,
  setAllFaqIndices,
  validateTwoStepStep1,
  validateTwoStepStep2,
} from "./homepageBlueprintLogic";

test("4x3 Bento Grid conserves exactly 12 flush units across 6 sequential DOM tiles", () => {
  const check = validateBentoUnitConservation(BENTO_4X3_TILES);
  assert.equal(check.valid, true);
  assert.equal(check.totalUnits, 12);
  assert.equal(check.domSequential, true);
});

test("partially persistent mobile header hides on downward reading scroll and reveals on upward scroll or open menu", () => {
  assert.equal(
    computeMobileHeaderVisible({
      scrollY: 40,
      prevScrollY: 10,
      currentlyVisible: true,
      menuOrDrawerOpen: false,
    }),
    true
  );

  assert.equal(
    computeMobileHeaderVisible({
      scrollY: 140,
      prevScrollY: 100,
      currentlyVisible: true,
      menuOrDrawerOpen: false,
    }),
    false
  );

  assert.equal(
    computeMobileHeaderVisible({
      scrollY: 120,
      prevScrollY: 140,
      currentlyVisible: false,
      menuOrDrawerOpen: false,
    }),
    true
  );

  // Never hide while menu or drawer is open
  assert.equal(
    computeMobileHeaderVisible({
      scrollY: 300,
      prevScrollY: 200,
      currentlyVisible: true,
      menuOrDrawerOpen: true,
    }),
    true
  );
});

test("multi-open FAQ helpers allow simultaneous open panels plus expand/collapse all", () => {
  let open = [0];
  open = toggleFaqIndex(open, 2);
  assert.deepEqual(open, [0, 2]);
  open = toggleFaqIndex(open, 0);
  assert.deepEqual(open, [2]);

  assert.deepEqual(setAllFaqIndices(6, true), [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(setAllFaqIndices(6, false), []);
});

test("two-step Breadcrumb micro-audit validates anonymous Step 1 and 3-field Step 2", () => {
  assert.equal(
    validateTwoStepStep1({ priority: "", spend: "5k-15k" }).valid,
    false
  );
  assert.equal(
    validateTwoStepStep1({ priority: "scale-google-ads", spend: "" }).valid,
    false
  );
  assert.equal(
    validateTwoStepStep1({ priority: "scale-google-ads", spend: "5k-15k" }).valid,
    true
  );

  const badUrl = validateTwoStepStep2({
    websiteUrl: "not a domain",
    email: "ops@company.com",
    firstName: "Alex",
  });
  assert.equal(badUrl.valid, false);

  const badName = validateTwoStepStep2({
    websiteUrl: "acme.com",
    email: "ops@acme.com",
    firstName: "A",
  });
  assert.equal(badName.valid, false);

  const valid = validateTwoStepStep2({
    websiteUrl: "acme.com",
    email: "ops@acme.com",
    firstName: "Alex",
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.domain, "acme.com");
});
