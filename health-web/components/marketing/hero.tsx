"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/marketing/section";

const EASE = [0.22, 1, 0.36, 1] as const;

function Stagger({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.56, delay: 0.08 + index * 0.09, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-quantum bg-quantum-soft px-3.5 py-1.5 text-xs font-semibold text-quantum-dark dark:text-quantum">
      <span className="size-1.5 rounded-full bg-quantum" aria-hidden />
      {children}
    </span>
  );
}

type HeroProps = {
  badge?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  /** Visual column — providing it switches to the split layout. */
  visual?: React.ReactNode;
  centered?: boolean;
  className?: string;
};

export function Hero({
  badge,
  eyebrow,
  title,
  lead,
  actions,
  visual,
  centered = false,
  className,
}: HeroProps) {
  const isSplit = Boolean(visual);
  return (
    <div className={cn("overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20", className)}>
      <Container>
        <div
          className={cn(
            isSplit &&
              "grid items-center gap-12 min-[860px]:grid-cols-[1.05fr_1fr]",
            centered && "mx-auto max-w-3xl text-center",
          )}
        >
          <div>
            {badge && <Stagger index={0}>{badge}</Stagger>}
            {eyebrow && <Stagger index={0}>{eyebrow}</Stagger>}
            <Stagger index={1}>
              <h1 className="mt-5 text-hero font-extrabold text-balance">
                {title}
              </h1>
            </Stagger>
            {lead && (
              <Stagger index={2}>
                <p
                  className={cn(
                    "mt-6 max-w-xl text-lead text-ink-muted",
                    centered && "mx-auto",
                  )}
                >
                  {lead}
                </p>
              </Stagger>
            )}
            {actions && (
              <Stagger
                index={3}
                className={cn(
                  "mt-8 flex flex-wrap gap-3",
                  centered && "justify-center",
                )}
              >
                {actions}
              </Stagger>
            )}
          </div>
          {visual && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="max-[859px]:order-first"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}
