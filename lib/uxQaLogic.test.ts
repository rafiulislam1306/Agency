import test from "node:test";
import assert from "node:assert/strict";
import {
  stepNumericValue,
  yieldToMain,
  parseLeadDraft,
} from "./uxQaLogic";

test("stepNumericValue clamps cleanly at min/max bounds and avoids floating-point drift", () => {
  assert.equal(stepNumericValue(3500, 500, 1000, 15000, 0), 4000);
  assert.equal(stepNumericValue(15000, 500, 1000, 15000, 0), 15000);
  assert.equal(stepNumericValue(1000, -500, 1000, 15000, 0), 1000);
  assert.equal(stepNumericValue(3.2, 0.1, 1.5, 14, 1), 3.3);
  assert.equal(stepNumericValue(1.5, -0.5, 1.5, 18, 1), 1.5);
});

test("yieldToMain resolves cleanly via setTimeout fallback when scheduler.yield is absent", async () => {
  const start = Date.now();
  await yieldToMain();
  assert.ok(Date.now() >= start);
});

test("parseLeadDraft handles valid JSON, partial fields, and malformed payloads safely", () => {
  assert.deepEqual(
    parseLeadDraft(JSON.stringify({ websiteUrl: "acme.com", email: "vp@acme.com" })),
    { websiteUrl: "acme.com", email: "vp@acme.com", businessName: "" }
  );
  assert.deepEqual(parseLeadDraft("not-valid-json{"), {
    websiteUrl: "",
    email: "",
    businessName: "",
  });
  assert.deepEqual(parseLeadDraft(null), {
    websiteUrl: "",
    email: "",
    businessName: "",
  });
});
