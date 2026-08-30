"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/motion/count-up";

const EASE = [0.22, 1, 0.36, 1] as const;

const BARS = [
  {
    label: "Generic app",
    value: 42,
    barClass: "bg-ink-muted",
    trackClass: "bg-paper-dark",
  },
  {
    label: "Your branded app",
    value: 73,
    barClass: "bg-quantum",
    trackClass: "bg-quantum-soft",
  },
];

/**
 * Two-bar logging-consistency comparison (42% generic vs 73% branded).
 * Bars grow on scroll-into-view; reduced motion renders them at full height.
 * Values are permanently direct-labeled (contrast relief for the amber bar).
 */
export function LoggingConsistencyChart() {
  const reduced = useReducedMotion();
  return (
    <div className="w-full max-w-[360px]">
      <p className="text-sm font-bold">Weekly logging consistency</p>
      <p className="mt-1 text-xs text-ink-muted">
        % of patients logging at least 3x/week
      </p>
      <div
        role="img"
        aria-label="Bar chart: 42 percent of patients log at least three times a week in a generic app, versus 73 percent in a clinic-branded app."
        className="mt-6 flex items-end justify-center gap-8"
      >
        {BARS.map((b, i) => (
          <div key={b.label} className="flex w-24 flex-col items-center">
            <div
              className={`flex h-40 w-full items-end overflow-hidden rounded-md ${b.trackClass}`}
            >
              <motion.div
                className={`w-full rounded-t-[4px] ${b.barClass}`}
                initial={{ height: reduced ? `${b.value}%` : "0%" }}
                whileInView={{ height: `${b.value}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.15,
                  ease: EASE,
                }}
              />
            </div>
            <p className="mt-3 font-mono text-lg font-semibold tabular-nums">
              <CountUp to={b.value} suffix="%" />
            </p>
            <p className="mt-0.5 text-xs text-ink-muted">{b.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs italic leading-relaxed text-ink-muted">
        Real numbers will vary by clinic. The pattern — branded apps outperform
        generic ones — is consistent across healthcare research.
      </p>
    </div>
  );
}
