import React from "react";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-brand-blue mx-auto" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: July 2026</p>
        </div>

        <div className="prose prose-blue text-sm text-gray-600 leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you submit a contact form or schedule an appointment via Calendly. This includes your name, business name, email address, phone number, and any project-specific notes you share.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">2. How We Use Your Information</h2>
            <p>
              We use the collected details to prepare for search audit strategy calls, communicate about requested services, send project updates, and refine our service delivery. We do not sell or trade your data to third-party brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">3. Third-Party Integrations</h2>
            <p>
              We use third-party platforms like Calendly to schedule discovery appointments. These services maintain separate privacy policies governing how scheduling information is stored. We recommend reviewing their respective privacy disclosures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">4. Contact Us</h2>
            <p>
              If you have any questions or concern regarding this policy, please reach out via email at{" "}
              <a href="mailto:contact@leadgrowagency.com" className="font-semibold text-brand-blue hover:underline">
                contact@leadgrowagency.com
              </a>.
            </p>
          </section>
        </div>

        <div className="text-center pt-8 border-t border-gray-100">
          <Link href="/" className="text-sm font-bold text-brand-blue hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
