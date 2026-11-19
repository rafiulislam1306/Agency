import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeAuditUrl,
  validateAuditEmail,
  determineAuditRouting,
  AUDIT_PRIORITIES,
  AUDIT_BUDGET_BRACKETS,
  AUDIT_TIMELINES,
} from "./auditFormLogic";

test("permissive URL normalization accepts bare domains without https:// errors", () => {
  const bare = normalizeAuditUrl("lonestarhvac.com");
  assert.equal(bare.valid, true);
  assert.equal(bare.domain, "lonestarhvac.com");
  assert.equal(bare.normalized, "https://lonestarhvac.com/");

  const withWww = normalizeAuditUrl("www.northbridge.io/pricing");
  assert.equal(withWww.valid, true);
  assert.equal(withWww.domain, "northbridge.io");

  const invalid = normalizeAuditUrl("not-a-domain");
  assert.equal(invalid.valid, false);
});

test("work email validator catches malformed emails and flags personal webmail", () => {
  const work = validateAuditEmail("david@lonestarhvac.com");
  assert.equal(work.valid, true);
  assert.equal(work.isPersonalWebmail, false);

  const personal = validateAuditEmail("owner@gmail.com");
  assert.equal(personal.valid, true);
  assert.equal(personal.isPersonalWebmail, true);

  const bad = validateAuditEmail("invalid-email");
  assert.equal(bad.valid, false);
});

test("audit routing separates active high-budget pipeline from async benchmarking", () => {
  const priority = determineAuditRouting(
    "scale-google-ads",
    "15k-30k",
    "immediate"
  );
  assert.equal(priority.trackLabel, "Senior Strategist Priority Track");
  assert.equal(priority.matchedCaseStudy.slug, "saas-consulting");

  const asyncTrack = determineAuditRouting(
    "dominate-map-pack",
    "under-5k",
    "benchmarking"
  );
  assert.equal(asyncTrack.trackLabel, "Async Video & Written Scorecard Track");
  assert.equal(asyncTrack.matchedCaseStudy.slug, "local-service");
});

test("breadcrumb options stay compact and scannable", () => {
  assert.equal(AUDIT_PRIORITIES.length, 4);
  assert.equal(AUDIT_BUDGET_BRACKETS.length, 4);
  assert.equal(AUDIT_TIMELINES.length, 3);
});
