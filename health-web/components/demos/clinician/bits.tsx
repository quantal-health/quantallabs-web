import { cn } from "@/lib/utils";

/** Circular initials avatar — decorative (the adjacent text carries identity). */
export function PtAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white",
        className,
      )}
    >
      {initials}
    </span>
  );
}

/** In-dashboard view heading: h2 + optional muted suffix + sub line. */
export function ViewHeader({
  title,
  suffix,
  sub,
}: {
  title: string;
  suffix?: string;
  sub?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold tracking-tight">
        {title}
        {suffix && (
          <span className="font-normal text-ink-muted"> {suffix}</span>
        )}
      </h2>
      {sub && <p className="mt-1 text-sm text-ink-muted">{sub}</p>}
    </div>
  );
}

/** Bordered surface card used for every dashboard panel. */
export function DashCard({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("rounded-lg border border-line bg-surface p-4", className)}
    >
      {title && <h3 className="mb-3 text-[15px] font-semibold">{title}</h3>}
      {children}
    </section>
  );
}

/** Label / value row used by reports and settings. */
export function MetricRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2 text-sm last:border-b-0">
      <span className="text-ink-muted">{label}</span>
      <span className="text-right font-mono font-semibold tabular-nums">
        {value}
      </span>
    </div>
  );
}
