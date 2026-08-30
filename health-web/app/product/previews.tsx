import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Product page — mini mock previews for the patient-app and admin-console
   feature cards. Token-colored, Mountainview-green tenant accents, built at
   mini scale from divs/inline SVG. All render inside FeatureCard's aria-hidden
   preview slot on a bg-paper-light surface, so tokens flip with the theme.
--------------------------------------------------------------------------- */

/* ----------------------------- Patient app ------------------------------ */

const MOODS = [
  { emoji: "😄", label: "Great", selected: false },
  { emoji: "🙂", label: "Good", selected: true },
  { emoji: "😐", label: "OK", selected: false },
  { emoji: "😣", label: "Rough", selected: false },
];

export function CheckInPreview() {
  return (
    <div className="p-4">
      <p className="text-xs font-bold">How are you feeling today, Jane?</p>
      <p className="mt-0.5 text-[10px] text-ink-muted">
        Tap one. Takes two seconds.
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {MOODS.map((m) => (
          <div
            key={m.label}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg border py-2.5",
              m.selected
                ? "border-mv-green bg-mv-green/10"
                : "border-line bg-surface",
            )}
          >
            <span className="text-lg leading-none">{m.emoji}</span>
            <span
              className={cn(
                "text-[9px] font-semibold",
                m.selected ? "text-mv-green" : "text-ink-muted",
              )}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const MACROS = [
  { label: "P", height: "h-12", color: "bg-mv-green/70" },
  { label: "C", height: "h-9", color: "bg-quantum/70" },
  { label: "F", height: "h-6", color: "bg-danger/60" },
];

export function FoodVisionPreview() {
  return (
    <div className="flex gap-3 p-4">
      <div className="flex w-24 shrink-0 flex-col items-center rounded-lg bg-[#1B1A18] p-2 dark:bg-[#3a3733]">
        <div className="relative h-[74px] w-full overflow-hidden rounded-md bg-quantum-soft">
          <span className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-quantum/70" />
          <span className="absolute left-2.5 top-3 size-4 rounded-full bg-mv-green" />
          <span className="absolute right-2.5 top-4 size-3 rounded-full bg-danger/60" />
        </div>
        <p className="mt-1.5 text-[9px] text-white/85">Tap to capture</p>
      </div>
      <div className="min-w-0 flex-1 rounded-lg border border-line bg-surface p-3">
        <p className="truncate text-xs font-bold">Grilled chicken bowl</p>
        <p className="text-[10px] text-ink-muted">~540 kcal · 42g protein</p>
        <div className="mt-2 flex items-end gap-3 border-t border-line pt-2">
          {MACROS.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1">
              <span className={cn("w-5 rounded-sm", m.height, m.color)} />
              <span className="text-[9px] text-ink-muted">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FOOD_ROWS = [
  { name: "Greek yogurt, plain · 1 cup", meta: "130 kcal · 22g protein" },
  { name: "Blueberries · 1/2 cup", meta: "42 kcal · 0g protein" },
];

export function ManualLogPreview() {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
        <Search className="size-3 text-ink-soft" />
        <span className="text-[10px] text-ink-muted">Search foods…</span>
      </div>
      {FOOD_ROWS.map((row) => (
        <div
          key={row.name}
          className="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2"
        >
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold">{row.name}</p>
            <p className="text-[9px] text-ink-muted">{row.meta}</p>
          </div>
          <span className="text-sm font-bold text-mv-green">+</span>
        </div>
      ))}
    </div>
  );
}

export function WearablesPreview() {
  return (
    <div className="flex items-center justify-center gap-3 p-4">
      <div className="flex flex-col items-center">
        <span className="h-2 w-8 rounded-t-md bg-[#1B1A18] dark:bg-[#3a3733]" />
        <div className="rounded-[12px] bg-[#1B1A18] p-1.5 dark:bg-[#3a3733]">
          <div className="flex h-16 w-14 flex-col items-center justify-center rounded-lg bg-mv-green/15">
            <span className="font-mono text-xs font-semibold text-mv-green">
              9,247
            </span>
            <span className="text-[9px] text-mv-green">steps</span>
          </div>
        </div>
        <span className="h-2 w-8 rounded-b-md bg-[#1B1A18] dark:bg-[#3a3733]" />
      </div>
      <svg viewBox="0 0 40 24" className="w-9 shrink-0 text-quantum" aria-hidden>
        <path
          d="M2 8 Q20 0 38 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
        <path
          d="M38 16 Q20 24 2 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
      </svg>
      <div className="rounded-lg border border-line bg-surface px-3 py-2 text-center">
        <p className="text-[8px] font-bold uppercase tracking-wider text-ink-soft">
          Today
        </p>
        <p className="font-mono text-sm font-semibold">9,247</p>
        <p className="text-[9px] text-ink-muted">steps</p>
        <div className="my-1.5 border-t border-line" />
        <p className="font-mono text-xs font-semibold">412</p>
        <p className="text-[9px] text-ink-muted">kcal burned</p>
      </div>
    </div>
  );
}

const EFFECT_CHIPS = [
  "Headache",
  "Constipation",
  "Fatigue",
  "Heartburn",
  "None",
];

export function SideEffectsPreview() {
  return (
    <div className="p-4">
      <p className="rounded-md border border-line bg-surface px-3 py-2 text-xs font-bold">
        Any side effects today?
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-quantum bg-quantum-soft px-2.5 py-1 text-[10px] font-semibold text-quantum-dark dark:text-quantum">
          Mild nausea
        </span>
        {EFFECT_CHIPS.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] text-ink-muted"
          >
            {chip}
          </span>
        ))}
      </div>
      <p className="mt-2.5 text-[10px] text-ink-muted">
        Severity: mild → bothering me
      </p>
    </div>
  );
}

export function MessagingPreview() {
  return (
    <div className="p-4">
      <p className="rounded-lg bg-mv-green px-3 py-2 text-[11px] font-bold text-white">
        Dr. Sarah Chen — Care team
      </p>
      <div className="mt-2 max-w-[72%] rounded-xl rounded-bl-sm border border-line bg-surface px-3 py-2">
        <p className="text-[11px]">How is the nausea today?</p>
        <p className="mt-0.5 text-[9px] text-ink-soft">9:42 AM</p>
      </div>
      <div className="ml-auto mt-2 max-w-[72%] rounded-xl rounded-br-sm bg-quantum-soft px-3 py-2">
        <p className="text-[11px]">Better today, thanks!</p>
        <p className="mt-0.5 text-[9px] text-quantum-dark dark:text-quantum">
          Jane · 10:14 AM
        </p>
      </div>
    </div>
  );
}

export function TrendsPreview() {
  return (
    <div className="p-4">
      <p className="text-[9px] font-bold uppercase tracking-wider text-ink-soft">
        8 weeks on Wegovy
      </p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-xl font-medium">−10.8 lb</span>
        <span className="text-[10px] font-semibold text-mv-green">
          on track
        </span>
      </div>
      <svg viewBox="0 0 220 56" className="mt-2 w-full" aria-hidden>
        <line x1="0" y1="50" x2="220" y2="50" className="stroke-line" />
        <polyline
          points="4,8 34,13 64,18 94,24 124,31 154,38 184,43 214,47"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="214" cy="47" r="4" fill="#16a34a" />
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-ink-soft">
        <span>Wk 1</span>
        <span>Wk 8</span>
      </div>
    </div>
  );
}

const PLAN_STEPS = ["Weeks 9–12 — same dose", "Week 13 — titration check-in"];

export function CarePlanPreview() {
  return (
    <div className="p-4">
      <p className="text-[9px] font-bold uppercase tracking-wider text-ink-soft">
        Your care plan
      </p>
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between rounded-md border border-mv-green/40 bg-mv-green/10 px-2.5 py-2">
          <span className="text-[11px] font-semibold">
            Week 8 — Wegovy 1.0mg
          </span>
          <span className="text-[9px] font-semibold text-mv-green">
            current
          </span>
        </div>
        {PLAN_STEPS.map((step) => (
          <p
            key={step}
            className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10px] text-ink-muted"
          >
            {step}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Admin console ----------------------------- */

function MiniToggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-3.5 w-6 shrink-0 rounded-full",
        on ? "bg-mv-green" : "bg-ink-soft",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-2.5 rounded-full bg-white",
          on ? "right-0.5" : "left-0.5",
        )}
      />
    </span>
  );
}

const MODULE_ROWS = [
  { name: "AI Food Vision", on: true },
  { name: "Wearables sync", on: true },
  { name: "Aggregate practice reports", on: false },
];

export function ModulesPreview() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2">
        <span className="text-xs font-bold">Plan: Pro</span>
        <span className="text-[10px] font-semibold text-mv-green">Active</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {MODULE_ROWS.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-1.5"
          >
            <span className="text-[11px]">{row.name}</span>
            <MiniToggle on={row.on} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandingPreview() {
  return (
    <div className="p-4">
      <div className="rounded-lg border border-line bg-surface p-3.5">
        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-soft">
          Your brand
        </p>
        <p className="mt-1.5 text-sm font-bold">Mountainview Medicine</p>
        <p className="text-[10px] text-ink-muted">
          App name shown to patients
        </p>
        <div className="mt-3 flex items-center gap-2.5 border-t border-line pt-3">
          <span className="size-5 shrink-0 rounded-full bg-mv-green" />
          <span className="font-mono text-[10px] font-semibold">#16a34a</span>
          <span className="text-[10px] text-ink-muted">primary color</span>
          <span className="ml-auto rounded-md bg-ink px-2.5 py-1 text-[10px] font-semibold text-paper">
            Edit
          </span>
        </div>
      </div>
    </div>
  );
}

const TICKET_ROWS = [
  { title: "Patient can't sync Apple Watch", meta: "Open · 2h ago" },
  { title: "Add new clinician account", meta: "In progress · yesterday" },
  { title: "Quarterly access review", meta: "Scheduled · Jun 1" },
];

export function TicketsPreview() {
  return (
    <div className="p-4">
      <p className="text-xs font-bold">Support tickets · 3 open</p>
      <div className="mt-2 space-y-1.5">
        {TICKET_ROWS.map((row) => (
          <div
            key={row.title}
            className="rounded-md border border-line bg-surface px-3 py-1.5"
          >
            <p className="text-[11px] font-semibold">{row.title}</p>
            <p className="text-[9px] text-ink-muted">{row.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const TEAM_ROWS = [
  {
    initials: "SC",
    name: "Dr. Sarah Chen",
    role: "Clinician · admin",
    green: true,
  },
  { initials: "JM", name: "Jordan Miller, NP", role: "Clinician", green: false },
  {
    initials: "RP",
    name: "Rita Park",
    role: "Practice administrator",
    green: false,
  },
];

export function UsersPreview() {
  return (
    <div className="p-4">
      <p className="text-xs font-bold">Team · 6 members</p>
      <div className="mt-2 space-y-1.5">
        {TEAM_ROWS.map((row) => (
          <div
            key={row.initials}
            className="flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-1.5"
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                row.green
                  ? "bg-mv-green/15 text-mv-green"
                  : "bg-quantum-soft text-quantum-dark dark:text-quantum",
              )}
            >
              {row.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold">{row.name}</p>
              <p className="text-[9px] text-ink-muted">{row.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
