import { cn } from "@/lib/utils";

/**
 * The two mockup frames of the illustration system (spec §8): PhoneFrame and
 * BrowserFrame. Real UI renders inside; token-colored, no floating screenshots.
 */
export function PhoneFrame({
  className,
  children,
  label,
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn(
        "relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[42px] border-[6px] border-[#1B1A18] bg-white shadow-card dark:border-[#3a3733]",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[#1B1A18] dark:bg-[#3a3733]" />
      <div className="flex items-center justify-between px-7 pb-1 pt-3 font-mono text-[11px] font-medium text-[#1B1A18]">
        <span>9:41</span>
        <span aria-hidden>▪▪▪ ⚡</span>
      </div>
      {children}
    </div>
  );
}

export function BrowserFrame({
  className,
  children,
  url,
  label,
}: {
  className?: string;
  children: React.ReactNode;
  url: string;
  label?: string;
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-paper-light px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="flex-1 truncate rounded-md border border-line bg-surface px-3 py-1 text-center font-mono text-[11px] text-ink-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
