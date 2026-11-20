"use client";

import React, { useTransition } from "react";
import { Minus, Plus } from "lucide-react";
import { stepNumericValue } from "@/lib/uxQaLogic";

interface RangeStepperProps {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  decimals?: number;
  onChange: (nextValue: number) => void;
  ariaValueText?: string;
}

/**
 * WCAG 2.2 SC 2.5.7 (Dragging Movements) & SC 2.5.8 (Target Size) compliant range control:
 * Pairs a native range slider with 44x44px single-pointer decrement/increment buttons
 * and wraps state transitions in useTransition for smooth INP responsiveness.
 */
export default function RangeStepper({
  id,
  label,
  value,
  displayValue,
  min,
  max,
  step,
  decimals = 0,
  onChange,
  ariaValueText,
}: RangeStepperProps) {
  const [, startTransition] = useTransition();

  const commitValue = (next: number) => {
    startTransition(() => {
      onChange(next);
    });
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
        <label htmlFor={id}>{label}</label>
        <span className="metric-tabular text-trust whitespace-nowrap shrink-0">
          {displayValue}
        </span>
      </div>

      <div className="flex items-center gap-2 pointer-coarse:gap-3">
        <button
          type="button"
          onClick={() =>
            commitValue(stepNumericValue(value, -step, min, max, decimals))
          }
          disabled={atMin}
          aria-label={`Decrease ${label}`}
          className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-[var(--radius-btn)] border border-border-control bg-card text-ink hover:border-trust hover:text-trust hover:bg-trust-tint transition-[background-color,border-color,color,scale] duration-150 ease-[var(--ease-out-snappy)] motion-safe:active:scale-[0.97] motion-reduce:transition-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Minus className="w-4 h-4" aria-hidden="true" />
        </button>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={ariaValueText || displayValue}
          onChange={(e) => commitValue(Number(e.target.value))}
          className="w-full min-h-11 accent-trust cursor-pointer"
        />

        <button
          type="button"
          onClick={() =>
            commitValue(stepNumericValue(value, step, min, max, decimals))
          }
          disabled={atMax}
          aria-label={`Increase ${label}`}
          className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-[var(--radius-btn)] border border-border-control bg-card text-ink hover:border-trust hover:text-trust hover:bg-trust-tint transition-[background-color,border-color,color,scale] duration-150 ease-[var(--ease-out-snappy)] motion-safe:active:scale-[0.97] motion-reduce:transition-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
