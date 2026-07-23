"use client";

import React, { useState } from "react";
import { Mail, Phone, Clock, ShieldCheck, Send, CheckCircle, Linkedin, Twitter } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    businessType: "local-service",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simple mock submission delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({ businessName: "", email: "", businessType: "local-service", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-brand-blue tracking-tight leading-tight">
            Let's Talk About Growing Your Business
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            Book a strategy session directly on our calendar, or write us a message below. We look forward to helping you grow.
          </p>
        </div>

        {/* Double Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Form */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue border-b border-gray-100 pb-2">Direct Contact</h3>
              
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                <div className="bg-brand-blue/10 p-3 rounded-lg text-brand-blue">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Email us</span>
                  <a href="mailto:contact@leadgrowagency.com" className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">
                    contact@leadgrowagency.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                <div className="bg-brand-green/10 p-3 rounded-lg text-brand-green">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Call us</span>
                  <a href="tel:+15550199" className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">
                    +1 (555) 0199
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue border-b border-gray-100 pb-2">Send a Message</h3>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-5 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-brand-green mx-auto" aria-hidden="true" />
                  <h4 className="font-bold">Message Sent Successfully!</h4>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Thank you for reaching out. A strategy manager will review your submission and respond within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-brand-blue hover:underline pt-2 cursor-pointer block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
                  
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Houston HVAC Pro"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-dark focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-dark focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-dark focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all cursor-pointer"
                    >
                      <option value="local-service">Local Service Business (HVAC, Plumbing, Salon, etc.)</option>
                      <option value="ecommerce">E-commerce Store</option>
                      <option value="b2b-consulting">B2B, SaaS, or Consulting Agency</option>
                      <option value="other">Other / Multi-Location</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">
                      Message / Questions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your marketing goals or website..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-dark focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        <span className="text-sm">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm">Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Trust Signals */}
            <div className="space-y-3 bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
              <h4 className="font-display font-bold text-brand-blue text-sm flex items-center">
                <Clock className="w-4.5 h-4.5 mr-2 text-brand-orange" aria-hidden="true" />
                Working Guidelines
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-600 font-semibold">
                <li className="flex items-center"><ShieldCheck className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" aria-hidden="true" /> We respond to all written inquiries within 24 hours</li>
                <li className="flex items-center"><ShieldCheck className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" aria-hidden="true" /> Free, no-pressure consultation call</li>
                <li className="flex items-center"><ShieldCheck className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" aria-hidden="true" /> Honest evaluation - we'll tell you if search isn't right for you</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Calendly Embed */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-blue border-b border-gray-100 pb-2 flex items-center">
                <span className="mr-2">🗓️</span> Book Your Free Audit & Strategy Call
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Pick a slot that matches your availability. We'll run a baseline audit prior to our call so we can deliver maximum value.
              </p>
            </div>
            
            <CalendlyEmbed />
          </div>

        </div>

      </div>
    </div>
  );
}
