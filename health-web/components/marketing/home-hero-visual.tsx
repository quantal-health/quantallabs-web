import { BrowserFrame, PhoneFrame } from "@/components/marketing/device-mock";

const ROSTER = [
  { name: "Jane Doe", drug: "Wegovy 0.5mg", delta: "−10.8 lb", status: "On track", tone: "text-mv-green bg-mv-green/10" },
  { name: "Marcus Okafor", drug: "Ozempic 1.0mg", delta: "−12.3 lb", status: "Stable", tone: "text-mv-green bg-mv-green/10" },
  { name: "Priya Iyer-Anand", drug: "Zepbound 5mg", delta: "−9.6 lb", status: "Review", tone: "text-warning bg-warning/10" },
  { name: "Rosa Padilla", drug: "Wegovy 1.0mg", delta: "−15.2 lb", status: "Stable", tone: "text-mv-green bg-mv-green/10" },
];

/** Split-hero illustration: clinician dashboard + overlapping patient phone (spec §5 Home). */
export function HomeHeroVisual() {
  return (
    <div className="relative pb-24 min-[860px]:pb-16">
      <BrowserFrame
        url="mountainview-medicine.quantal.health"
        label="Clinician dashboard preview showing the Mountainview Medicine patient roster"
        className="min-w-0"
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-mv-green text-[11px] font-bold text-white">
                M
              </span>
              <span className="text-[13px] font-semibold">
                Mountainview Medicine
              </span>
            </div>
            <span className="text-[11px] text-ink-muted">
              Active patients · 60
            </span>
          </div>
          <div className="mt-3 divide-y divide-line rounded-xl border border-line">
            {ROSTER.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between gap-2 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold">{r.name}</p>
                  <p className="truncate text-[11px] text-ink-muted">{r.drug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-[11px] text-ink-muted">
                    {r.delta}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.tone}`}
                  >
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>

      <PhoneFrame
        label="Patient app preview showing Jane Doe's daily check-in"
        className="absolute -bottom-2 right-0 !max-w-[170px] rounded-[30px] border-4 min-[860px]:-right-4"
      >
        <div className="px-3 pb-4 pt-1">
          <p className="text-[11px] font-bold text-[#1B1A18]">Hello, Jane</p>
          <p className="text-[9px] text-[#6B6863]">Week 8 · Wegovy 0.5mg</p>
          <div className="mt-2 rounded-lg bg-mv-green px-2.5 py-2 text-[9px] font-semibold text-white">
            Daily check-in · ~60 seconds
          </div>
          <div className="mt-2 rounded-lg border border-[#E8E2D2] bg-[#FAF7EE] p-2.5">
            <p className="text-[8px] font-semibold uppercase tracking-wide text-[#6B6863]">
              Today&apos;s weight
            </p>
            <p className="font-mono text-[15px] font-medium text-[#1B1A18]">
              207.6 <span className="text-[9px]">lb</span>
            </p>
            <p className="text-[8px] font-semibold text-mv-green">
              ▼ 1.3 lb this week
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[8px] font-semibold text-[#1B1A18]">
            <span className="rounded-md border border-[#E8E2D2] bg-white py-1.5">
              📷 Snap a meal
            </span>
            <span className="rounded-md border border-[#E8E2D2] bg-white py-1.5">
              ⚖️ Log weight
            </span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
