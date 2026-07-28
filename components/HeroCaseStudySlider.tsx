"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Award, ChevronLeft } from "lucide-react";
import { caseStudiesData } from "@/lib/caseStudiesData";

export default function HeroCaseStudySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const studies = Object.values(caseStudiesData);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      handleNext();
    }, 5500);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  const changeSlide = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 200); // match transition duration
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % studies.length;
    changeSlide(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + studies.length) % studies.length;
    changeSlide(prevIndex);
  };

  const currentStudy = studies[currentIndex];

  const getSubTagColor = (slug: string) => {
    if (slug === "ecommerce-store") return "bg-blue-100/20 text-blue-200 border border-blue-500/20";
    if (slug === "saas-consulting") return "bg-orange-100/20 text-orange-200 border border-orange-500/20";
    return "bg-brand-green/20 text-brand-green border border-brand-green/20";
  };

  const getSubTagName = (slug: string) => {
    if (slug === "ecommerce-store") return "E-commerce Ads";
    if (slug === "saas-consulting") return "B2B Hybrid Search";
    return "Local HVAC SEO";
  };

  const getHeadlineText = (slug: string) => {
    if (slug === "ecommerce-store") return "+247% Sales ROI Secured";
    if (slug === "saas-consulting") return "$45K New Inbound Closed";
    return "$23,800/mo New Revenue";
  };

  const getSubheadlineText = (slug: string) => {
    if (slug === "ecommerce-store") return "Driven by Shopify search optimizations";
    if (slug === "saas-consulting") return "Lead pre-qualification funnels active";
    return "Acquired from Google Maps local pack";
  };

  return (
    <div 
      className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 lg:p-5 border border-white/10 shadow-lg text-left flex flex-col justify-start min-h-[430px] sm:min-h-[450px] lg:h-[415px] relative overflow-hidden group"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="absolute top-0 right-0 bg-brand-orange text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl z-10">
        Live Case Study
      </div>

      {/* Main card body with smooth fade transitions */}
      <div className={`space-y-4 lg:space-y-3 flex-grow transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"}`}>
        <div className="space-y-3 lg:space-y-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider block w-fit ${getSubTagColor(currentStudy.slug)}`}>
            {getSubTagName(currentStudy.slug)}
          </span>
          <div className="space-y-1">
            <span className="text-xs text-blue-200 uppercase font-bold tracking-wider block">Duration: {currentStudy.timeframe}</span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-snug">
              {getHeadlineText(currentStudy.slug)}
            </h3>
          </div>
        </div>

        <div className="space-y-3 lg:space-y-2.5 border-t border-white/10 pt-3 text-xs font-semibold">
          <div>
            <span className="text-3xl font-extrabold text-white tracking-tight">{currentStudy.metric}</span>
            <p className="text-sm text-blue-100 mt-1.5">{getSubheadlineText(currentStudy.slug)}</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center space-x-1.5 mb-1.5 text-brand-orange">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">Highlight Result</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="pr-2 w-full">
                <span className="text-xs text-blue-200 block mb-1">Client Feedback</span>
                <div className="h-[76px] sm:h-[68px] lg:h-[72px] flex items-center overflow-hidden">
                  <span className="text-sm font-bold text-white leading-relaxed block italic">
                    &ldquo;{currentStudy.quote}&rdquo;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer & Controls */}
      <div className="border-t border-white/10 pt-3 flex items-center justify-between mt-auto">
        <Link 
          href={`/case-studies/${currentStudy.slug}`} 
          className={`flex items-center text-sm font-bold text-brand-green hover:underline transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"}`}
        >
          Read Case Study <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Link>

        {/* Carousel controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/5 active:scale-95"
            aria-label="Previous Case Study"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Navigation dots */}
          <div className="flex space-x-1.5">
            {studies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => changeSlide(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? "bg-brand-green w-3" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/5 active:scale-95"
            aria-label="Next Case Study"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
