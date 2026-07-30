"use client";

import React, { useState } from "react";
import { Phone, Check, ShieldCheck, Clock, Lock, Sparkles, AlertTriangle, Snowflake } from "lucide-react";

export default function HvacEmergencyTemplate() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    issue: "AC is blowing warm air",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phoneNumber) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col justify-between selection:bg-brand-blue selection:text-white">
      {/* Header - Intentionally stripped of navigation to prevent bounces */}
      <header className="bg-white py-4 shadow-xs border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo (Identical to LeadGrow branding style but generic template logo) */}
          <div className="flex items-center space-x-2.5">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-2 rounded-xl text-white shadow-xs">
              <Snowflake className="w-5 h-5 animate-spin-slow" aria-hidden="true" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-blue-900">
              HVAC<span className="text-emerald-500">PROS</span>
            </span>
          </div>
          
          {/* Click-to-call Dispatch Number */}
          <a
            href="tel:+15550199"
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-full font-bold text-rose-600 text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-98 shadow-xs"
            aria-label="Call Dispatch Immediately"
          >
            <Phone className="w-4 h-4 fill-current animate-pulse" />
            <span className="hidden sm:inline">24/7 Dispatch:</span> (555) 0199
          </a>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow flex items-center py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: High-intent Copy & Social Proof */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-rose-100/70 border border-rose-200 text-rose-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              24/7 Emergency Dispatch Available
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Beat The Heat: <br />
              <span className="text-blue-600 drop-shadow-xs">Emergency AC Repair</span> <br />
              in <span className="underline decoration-emerald-500 decoration-wavy">[City Name]</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Don&apos;t suffer in a sweltering home. Our local, certified HVAC technicians are fully equipped and standing by to restore your cooling today.
            </p>

            {/* Checklist of guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { label: "60-Minute Response Guarantee", icon: Clock, desc: "On-time arrival or diagnostic is free" },
                { label: "Licensed & Insured Pros", icon: ShieldCheck, desc: "Certified techs you can trust" },
                { label: "No Hidden Emergency Fees", icon: Sparkles, desc: "Upfront pricing before work starts" },
                { label: "100% Satisfaction Guarantee", icon: Check, desc: "We fix it right the first time" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.label}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap gap-6 items-center opacity-70">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trusted By Local Homes:</div>
              <div className="flex gap-4 items-center">
                <span className="text-sm font-bold text-slate-500">⭐ 4.9/5 Google Rating</span>
                <span className="text-slate-300">|</span>
                <span className="text-sm font-bold text-slate-500">🛡️ BBB Accredited</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stateful Form Box */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 md:p-10 relative overflow-hidden">
              {/* Header colored bar for emphasis */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>

              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      Request Dispatch Now
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Or call <a href="tel:+15550199" className="font-bold text-blue-600 hover:underline">(555) 0199</a> for instant priority.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-slate-800 placeholder-slate-400 outline-hidden transition-all duration-200"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-slate-800 placeholder-slate-400 outline-hidden transition-all duration-200"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="issue" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Describe Cooling Emergency
                      </label>
                      <select
                        id="issue"
                        name="issue"
                        value={formData.issue}
                        onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-slate-800 outline-hidden transition-all duration-200 appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1em"
                        }}
                      >
                        <option>AC is blowing warm air</option>
                        <option>System won&apos;t turn on at all</option>
                        <option>Strange noise / loud grinding</option>
                        <option>AC is leaking water inside</option>
                        <option>Other HVAC emergency</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all duration-200 cursor-pointer text-lg tracking-wide uppercase mt-4 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5 fill-current" />
                      Get Help Now
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4">
                      <Lock className="w-3.5 h-3.5" />
                      Your data is 100% private and secure.
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      Dispatch Requested!
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                      Thanks, <span className="font-bold text-slate-800">{formData.fullName}</span>. A dispatch coordinator is calling you immediately on <span className="font-bold text-slate-800">{formData.phoneNumber}</span> to confirm your technician&apos;s arrival time.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 max-w-xs mx-auto">
                    <p className="text-xs text-slate-500 font-medium">
                      📞 Please keep your line clear for a call from <span className="text-blue-600 font-bold">(555) 0199</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: "", phoneNumber: "", issue: "AC is blowing warm air" });
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} HVACPROS. Certified Local Cooling Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
