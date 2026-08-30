import { cn } from "@/lib/utils";
import { LiftCard } from "@/components/marketing/feature-card";

/* ---------------------------------------------------------------------------
   Product page — clinician-dashboard cards and mini mock previews. These live
   inside the always-dark DarkBand, so they use the on-dark card recipe
   (cream-tint borders/surfaces) plus the dark-band secondary text colors from
   the brief instead of theme tokens.
--------------------------------------------------------------------------- */

export function DarkFeatureCard({
  title,
  preview,
  children,
  className,
}: {
  title: string;
  preview: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <LiftCard
      className={cn(
        "flex h-full flex-col gap-4 border-[rgba(244,239,226,0.1)] bg-[rgba(244,239,226,0.04)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="overflow-hidden rounded-xl border border-[rgba(244,239,226,0.08)] bg-[rgba(0,0,0,0.25)]"
      >
        {preview}
      </div>
      <div>
        <h3 className="text-h3 font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#B8B3A8]">
          {children}
        </p>
      </div>
    </LiftCard>
  );
}

/* ------------------------------- Previews ------------------------------- */

const ROSTER_ROWS = [
  {
    initials: "JD",
    name: "Jane Doe",
    meta: "Wegovy 1.0mg · wk 8 · −10.8 lb",
    status: "on track",
    tone: "success",
  },
  {
    initials: "MR",
    name: "Maria Reyes",
    meta: "Zepbound 5mg · wk 4",
    status: "review",
    tone: "warning",
  },
  {
    initials: "AT",
    name: "Alex Tran",
    meta: "Ozempic 0.5mg · wk 12",
    status: "on track",
    tone: "success",
  },
] as const;

export function RosterPreview() {
  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between rounded-md bg-[rgba(244,239,226,0.06)] px-3 py-2">
        <span className="text-[11px] font-bold text-[#F4EFE2]">
          Patient roster · 240
        </span>
        <span className="text-[9px] text-[#B8B3A8]">12 need attention</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {ROSTER_ROWS.map((row) => (
          <div
            key={row.initials}
            className="flex items-center gap-2.5 rounded-md bg-[rgba(244,239,226,0.06)] px-3 py-2"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-quantum/20 text-[9px] font-bold text-quantum">
              {row.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-[#F4EFE2]">
                {row.name}
              </p>
              <p className="truncate text-[9px] text-[#B8B3A8]">{row.meta}</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold",
                row.tone === "success"
                  ? "bg-success/20 text-success"
                  : "bg-warning/25 text-warning",
              )}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PatientDetailPreview() {
  return (
    <div className="p-4">
      <p className="text-sm font-bold text-[#F4EFE2]">Jane Doe</p>
      <p className="text-[10px] text-[#B8B3A8]">
        47 · Wegovy · week 8 · Dr. Chen
      </p>
      <div className="mt-3 rounded-lg bg-[rgba(244,239,226,0.06)] p-3">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#7A7570]">
          8-week weight trend
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="font-mono text-sm font-semibold text-[#F4EFE2]">
            218.4 → 207.6
          </span>
          <span className="text-[10px] font-semibold text-success">
            −10.8 lb (−4.9%)
          </span>
        </div>
        <svg viewBox="0 0 220 44" className="mt-2 w-full" aria-hidden>
          <line
            x1="0"
            y1="40"
            x2="220"
            y2="40"
            stroke="rgba(244,239,226,0.15)"
          />
          <polyline
            points="4,6 34,9 64,12 94,17 124,22 154,28 184,32 214,37"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="214" cy="37" r="3.5" fill="#16a34a" />
        </svg>
      </div>
    </div>
  );
}

const INBOX_ROWS = [
  { name: "Jane Doe", snippet: "Better today, thanks!", time: "10:14 AM", unread: true },
  { name: "Maria Reyes", snippet: "When should I take it next?", time: "9:08 AM", unread: true },
  { name: "Alex Tran", snippet: "Thanks!", time: "Yesterday", unread: false },
];

export function InboxPreview() {
  return (
    <div className="p-4">
      <p className="text-[11px] font-bold text-[#F4EFE2]">Inbox · 14 unread</p>
      <div className="mt-2 space-y-1.5">
        {INBOX_ROWS.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-2.5 rounded-md bg-[rgba(244,239,226,0.06)] px-3 py-2"
          >
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                row.unread ? "bg-quantum" : "bg-transparent",
              )}
            />
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-[11px]",
                  row.unread
                    ? "font-bold text-[#F4EFE2]"
                    : "font-semibold text-[#B8B3A8]",
                )}
              >
                {row.name}
              </p>
              <p
                className={cn(
                  "truncate text-[9px]",
                  row.unread ? "text-[#B8B3A8]" : "text-[#7A7570]",
                )}
              >
                {row.snippet}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 text-[9px]",
                row.unread ? "text-[#B8B3A8]" : "text-[#7A7570]",
              )}
            >
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const QUEUE_ROWS = [
  {
    title: "Maria Reyes — week 4 review",
    meta: "Reported moderate nausea, 2 days",
    bar: "bg-danger",
  },
  {
    title: "Sam Patel — message reply",
    meta: "Question about meal timing",
    bar: "bg-warning",
  },
  {
    title: "Jane Doe — weekly check-in",
    meta: "On track, no action needed",
    bar: "bg-success",
  },
];

export function CareQueuePreview() {
  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-bold text-[#F4EFE2]">
          Today&apos;s care queue
        </p>
        <span className="text-[9px] text-[#B8B3A8]">May 10</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {QUEUE_ROWS.map((row) => (
          <div
            key={row.title}
            className="flex items-stretch gap-2.5 rounded-md bg-[rgba(244,239,226,0.06)] px-3 py-2"
          >
            <span className={cn("w-1 shrink-0 rounded-full", row.bar)} />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-[#F4EFE2]">
                {row.title}
              </p>
              <p className="truncate text-[9px] text-[#B8B3A8]">{row.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
