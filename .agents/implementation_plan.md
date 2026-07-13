# Implementation Plan - Google Ads + Local SEO Agency Website

Build a conversion-focused, highly aesthetic, mobile-responsive website using Next.js, React, and Tailwind CSS. The primary goal is to drive free audit bookings via an embedded Calendly integration.

## Proposed Changes

### Project Scaffolding
Initialize the Next.js App Router project in the root workspace directory with TypeScript, Tailwind CSS, ESLint, and npm.

### Components
Create reusable UI components in the `components/` directory:
- **Navbar**: Sticky header with logo, desktop links, and a mobile hamburger menu. Includes a primary CTA button.
- **Footer**: Multi-column footer with site links, contact info, Calendly link, and social media placeholders.
- **CTAButton**: A component supporting primary (Orange) and secondary (White/Outline) styles with subtle hover animations.
- **FAQAccordion**: Interactive, smooth accordion for FAQ lists.
- **CaseStudyCard**: Visually appealing, clickable cards highlighting case study metrics and customer quotes.
- **CalendlyEmbed**: Inline embed widget or button modal wrapper for booking appointments.

### Pages
Implement the App Router structure as specified:
- **Homepage (`app/page.tsx`)**:
  - Hero Section (above-the-fold value prop, high-converting gradient, primary and secondary CTAs).
  - Problem Statement (3-column layout highlighting lead, ROI, and time pain points).
  - Services Overview (Google Ads vs. Local SEO two-column comparison with deep-dive bullets).
  - How It Works (3-step visual timeline showing audit, strategy, and results).
  - Case Studies Preview (cards showing results for E-commerce, Local HVAC, and SaaS).
  - FAQ (interactive Accordion).
  - Final CTA (strong conversion call-to-action).
- **Services (`app/services/page.tsx`)**:
  - Deep-dive into Google Ads and Local SEO.
  - Interactive comparison chart.
- **Case Studies (`app/case-studies/page.tsx` and `[slug]/page.tsx`)**:
  - Listing page displaying all 3 client success stories.
  - Individual template case study pages showing detailed metrics, situation, actions, results, and quotes. Clearly marked as `[TEMPLATE EXAMPLE]`.
- **About (`app/about/page.tsx`)**:
  - Trust-building content focused on value delivery, transparency, and a direct approach.
- **Pricing (`app/pricing/page.tsx`)**:
  - Transparent custom-pricing overview showing investment tiers, factors influencing cost, and FAQs.
- **Blog (`app/blog/page.tsx`)**:
  - Premium-looking "Coming Soon" placeholder featuring topics that will be covered to demonstrate expertise.
- **Contact (`app/contact/page.tsx`)**:
  - Calendly booking section, email links, phone placeholders, and an interactive contact form.

---

## Verification Plan

### Automated Verification
1. Run local development server: `npm run dev` to verify compile succeeds without errors.
2. Build the production application: `npm run build` to confirm output compilation, static page generation, and ESLint rule compliance.

### Manual Verification
- Test responsiveness of each page on mobile, tablet, and desktop viewports.
- Check interactive elements:
  - Navbar hamburger toggle on mobile.
  - Accordion expand/collapse on FAQ.
  - Case Study page routing and navigation.
  - Contact Form validations.
  - Calendly link navigation / modal trigger.
