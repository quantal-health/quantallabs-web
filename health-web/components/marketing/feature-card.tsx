import { cn } from "@/lib/utils";

/**
 * Hover-lift card per motion spec: translateY(-4px) + shadow soft→float, 180ms.
 */
export function LiftCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-[180ms] ease-out hover:-translate-y-1 hover:shadow-float",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  preview,
  title,
  children,
  className,
}: {
  icon?: React.ReactNode;
  preview?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <LiftCard className={cn("flex flex-col gap-4", className)}>
      {preview && (
        <div
          aria-hidden
          className="overflow-hidden rounded-xl border border-line bg-paper-light"
        >
          {preview}
        </div>
      )}
      {icon && (
        <div className="flex size-10 items-center justify-center rounded-xl bg-quantum-soft text-quantum-dark dark:text-quantum [&_svg]:size-5">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-h3 font-semibold">{title}</h3>
        {children && (
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {children}
          </p>
        )}
      </div>
    </LiftCard>
  );
}

export function StatCard({
  label,
  value,
  delta,
  className,
  onDark = false,
}: {
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        onDark
          ? "border-[rgba(244,239,226,0.1)] bg-[rgba(244,239,226,0.04)]"
          : "border-line bg-surface shadow-soft",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wider",
          onDark ? "text-[#7A7570]" : "text-ink-soft",
        )}
      >
        {label}
      </p>
      <p className="mt-2 font-mono text-2xl font-medium tabular-nums">
        {value}
      </p>
      {delta && (
        <p
          className={cn(
            "mt-1 text-sm",
            onDark ? "text-[#B8B3A8]" : "text-ink-muted",
          )}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
