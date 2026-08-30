"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_ENTRANCE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  /** Stagger index — 60ms per sibling per the motion spec. */
  index?: number;
  delay?: number;
  className?: string;
};

/** Scroll-reveal: opacity 0→1 + 14px rise, 480ms, once. Reduced-motion → opacity only. */
export function Reveal({ children, index = 0, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.48,
        delay: delay + index * 0.06,
        ease: EASE_ENTRANCE,
      }}
    >
      {children}
    </motion.div>
  );
}
