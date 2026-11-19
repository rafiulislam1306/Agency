"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { caseStudiesData } from "@/lib/caseStudiesData";

export default function HeroCaseStudySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const studies = Object.values(caseStudiesData);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  }, []);

  const changeSlide = useCallback((newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 180);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % studies.length;
    changeSlide(nextIndex);
  }, [currentIndex, studies.length, changeSlide]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + studies.length) % studies.length;
    changeSlide(prevIndex);
  }, [currentIndex, studies.length, changeSlide]);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      handleNext();
    }, 6000);
  }, [stopAutoPlay, handleNext]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const currentStudy = studies[currentIndex];

  return (
    <div
      className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-left flex flex-col justify-between min-h-[400px]"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div
        className={`space-y-5 transition-opacity duration-200 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Unboxed quiet metadata header */}
        <div className="flex items-center justify-between gap-3 text-xs text-blue-200 font-medium">
          <span>
            {currentStudy.shortTag}
            <span aria-hidden="true"> · </span>
            {currentStudy.region}
            <span aria-hidden="true"> · </span>
            {currentStudy.timeframe}
          </span>
          <span className="tabular-nums text-blue-300">
            0{currentIndex + 1} / 0{studies.length}
          </span>
        </div>

        {/* Core verified headline */}
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-blue-100">
            {currentStudy.businessType}
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight tabular-nums">
            {currentStudy.heroHeadline}
          </h2>
          <p className="text-sm text-brand-green font-medium">
            {currentStudy.heroSubheadline}
          </p>
        </div>

        {/* Primary leak sealed + attribution proof */}
        <div className="border-t border-white/15 pt-4 space-y-2.5">
          <p className="text-xs font-semibold text-blue-200">
            Primary Leak Sealed
          </p>
          <p className="text-sm text-white/90 leading-relaxed">
            {currentStudy.leaksSealed[0]}
          </p>
        </div>

        {/* Attributable quote */}
        <div className="border-t border-white/15 pt-4 space-y-1.5">
          <p className="text-sm text-blue-50 leading-relaxed italic">
            &ldquo;{currentStudy.quote}&rdquo;
          </p>
          <p className="text-xs text-blue-200 font-medium">
            — {currentStudy.quoteAuthor}
          </p>
        </div>
      </div>

      {/* Footer & Controls */}
      <div className="border-t border-white/15 pt-4 mt-6 flex items-center justify-between gap-4">
        <Link
          href={`/case-studies/${currentStudy.slug}`}
          className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-white transition-colors whitespace-nowrap"
        >
          Read full breakdown
          <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous case study"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-1">
            {studies.map((study, idx) => (
              <button
                type="button"
                key={study.slug}
                onClick={() => changeSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? "bg-brand-green w-4" : "bg-white/30 w-1.5 hover:bg-white/50"
                }`}
                aria-label={`View ${study.businessType} case study`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next case study"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
