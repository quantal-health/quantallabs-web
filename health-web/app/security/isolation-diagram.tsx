import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const LAYERS = ["App", "API", "Database"] as const;

const STACKS = [
  {
    name: "Mountainview Medicine",
    dot: "bg-mv-green",
    rule: "border-t-mv-green",
  },
  {
    name: "Cedarvale Health",
    dot: "bg-info",
    rule: "border-t-info",
  },
  {
    name: "Pinegrove Wellness",
    dot: "bg-quantum-dark",
    rule: "border-t-quantum-dark",
  },
] as const;

function SeparatedGutter() {
  return (
    <div aria-hidden className="sm:self-stretch">
      {/* Mobile: horizontal dashed divider between stacked cards */}
      <div className="flex items-center gap-2.5 py-1 sm:hidden">
        <span className="flex-1 border-t border-dashed border-line-strong" />
        <span className="text-[10px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
          fully separated
        </span>
        <span className="flex-1 border-t border-dashed border-line-strong" />
      </div>
      {/* Desktop: vertical dashed gutter between columns */}
      <div className="hidden h-full flex-col items-center gap-2.5 sm:flex">
        <span className="w-px flex-1 border-l border-dashed border-line-strong" />
        <span className="text-[10px] font-semibold tracking-[0.12em] text-ink-soft uppercase [writing-mode:vertical-rl]">
          fully separated
        </span>
        <span className="w-px flex-1 border-l border-dashed border-line-strong" />
      </div>
    </div>
  );
}

/**
 * Three clinic environments, drawn as fully separated infrastructure stacks —
 * the visual for "your data lives in your own environment."
 */
export function IsolationDiagram({ className }: { className?: string }) {
  return (
    <figure
      aria-label="Diagram: three clinics, each running its own fully separated app, API and database"
      className={cn(
        "rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        {STACKS.map((stack, i) => (
          <Fragment key={stack.name}>
            {i > 0 && <SeparatedGutter />}
            <Reveal index={i} className="min-w-0 sm:flex-1">
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border border-t-2 border-line bg-paper-light p-4",
                  stack.rule,
                )}
              >
                <div className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 size-2.5 shrink-0 rounded-full",
                      stack.dot,
                    )}
                  />
                  <p className="text-[13px] leading-tight font-bold">
                    {stack.name}
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-1.5">
                  {LAYERS.map((layer) => (
                    <div
                      key={layer}
                      className="rounded-md border border-line bg-surface px-2 py-1.5 text-center text-[11px] font-medium text-ink-muted"
                    >
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Fragment>
        ))}
      </div>
      <figcaption className="mt-5 text-center text-[13px] leading-relaxed text-ink-muted">
        Three clinics. Three completely separate environments. No shared
        database, no cross-tenant queries.
      </figcaption>
    </figure>
  );
}
