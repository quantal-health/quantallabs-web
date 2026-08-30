"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * 30s linear loop; pauses on hover. Under reduced-motion the animation is
 * globally disabled (globals.css) and the content wraps statically.
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden motion-reduce:overflow-visible",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div
          className="flex shrink-0 items-center gap-12 motion-reduce:hidden"
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
