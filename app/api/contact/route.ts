import { NextRequest, NextResponse } from "next/server";
import {
  normalizeAuditUrl,
  validateAuditEmail,
  determineAuditRouting,
  type AuditPriorityId,
  type AuditBudgetId,
  type AuditTimelineId,
} from "@/lib/auditFormLogic";

interface ContactPayload {
  auditTrack?: "breadcrumb-audit" | "strategy-call" | "attribution-note";
  businessName?: string;
  email?: string;
  websiteUrl?: string;
  priority?: AuditPriorityId;
  businessType?: string;
  primaryPain?: string;
  monthlyBudget?: string;
  timeline?: AuditTimelineId;
  crmSetup?: string;
  preferredSlot?: string;
  message?: string;
  attributionSource?: string;
  referenceId?: string;
}

const VALID_PRIORITIES = new Set<AuditPriorityId>([
  "increase-conversions",
  "fix-tracking",
  "scale-google-ads",
  "dominate-map-pack",
]);

const VALID_BUDGETS = new Set<AuditBudgetId>([
  "under-5k",
  "5k-15k",
  "15k-30k",
  "30k-plus",
]);

const VALID_TIMELINES = new Set<AuditTimelineId>([
  "immediate",
  "3-6-months",
  "benchmarking",
]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    // Optional post-submission attribution capture (never gates initial submission)
    if (body.auditTrack === "attribution-note" && body.referenceId) {
      return NextResponse.json({
        success: true,
        referenceId: body.referenceId,
        attributionSource: body.attributionSource?.trim() || null,
        updatedAt: new Date().toISOString(),
      });
    }

    // Track B: 3-Step Breadcrumb Technique Free Website & Ads Audit (strictly 5 fields)
    if (body.auditTrack === "breadcrumb-audit") {
      const emailCheck = validateAuditEmail(body.email || "");
      if (!emailCheck.valid) {
        return NextResponse.json(
          { error: emailCheck.message || "Please enter a valid work email address." },
          { status: 400 }
        );
      }

      const urlCheck = normalizeAuditUrl(body.websiteUrl || "");
      if (!urlCheck.valid) {
        return NextResponse.json(
          { error: "Please enter a valid website domain (e.g. yourcompany.com)." },
          { status: 400 }
        );
      }

      const priority: AuditPriorityId =
        body.priority && VALID_PRIORITIES.has(body.priority)
          ? body.priority
          : "increase-conversions";
      const budget: AuditBudgetId =
        body.monthlyBudget && VALID_BUDGETS.has(body.monthlyBudget as AuditBudgetId)
          ? (body.monthlyBudget as AuditBudgetId)
          : "5k-15k";
      const timeline: AuditTimelineId =
        body.timeline && VALID_TIMELINES.has(body.timeline)
          ? body.timeline
          : "immediate";

      const routing = determineAuditRouting(priority, budget, timeline);
      const referenceId = `WEB-${Date.now().toString(36).toUpperCase()}`;

      return NextResponse.json({
        success: true,
        referenceId,
        receivedAt: new Date().toISOString(),
        routing,
        summary: {
          auditTrack: "breadcrumb-audit",
          priority,
          websiteUrl: urlCheck.normalized,
          domain: urlCheck.domain,
          monthlyBudget: budget,
          timeline,
          email: (body.email || "").trim().toLowerCase(),
          isPersonalWebmail: emailCheck.isPersonalWebmail,
        },
      });
    }

    // Track A: Direct Strategy Call Booking or General Contact
    const businessName = body.businessName?.trim() || "";
    const email = body.email?.trim() || "";
    const message = body.message?.trim() || "";

    if (!businessName || businessName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your business name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (!message && !body.preferredSlot) {
      return NextResponse.json(
        { error: "Please describe your goals or select an audit time slot." },
        { status: 400 }
      );
    }

    const referenceId = `AUD-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      referenceId,
      receivedAt: new Date().toISOString(),
      summary: {
        auditTrack: "strategy-call",
        businessName,
        email,
        websiteUrl: body.websiteUrl?.trim() || null,
        businessType: body.businessType || "local-service",
        primaryPain: body.primaryPain || "wasted-spend",
        monthlyBudget: body.monthlyBudget || "1500-5000",
        crmSetup: body.crmSetup || "none-yet",
        preferredSlot: body.preferredSlot || null,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload. Please try again." },
      { status: 400 }
    );
  }
}
