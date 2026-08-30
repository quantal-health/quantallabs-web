import { Apple, Play } from "lucide-react";
import { PhoneFrame } from "@/components/marketing/device-mock";

/* ---------------------------------------------------------------------------
   Product page — white-label commitment visual: a Mountainview-branded patient
   app inside a PhoneFrame, plus simple App Store / Google Play pill badges
   drawn from divs + lucide glyphs (no external assets). The phone screen stays
   light and tenant-branded in both themes, per the design-token rules.
--------------------------------------------------------------------------- */

function StoreBadge({
  eyebrow,
  name,
  icon,
}: {
  eyebrow: string;
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-[#1B1A18] px-4 py-2.5 dark:border dark:border-[rgba(244,239,226,0.18)]">
      <span aria-hidden className="text-white [&_svg]:size-5">
        {icon}
      </span>
      <span>
        <span className="block text-[10px] leading-tight text-[#C9C4BC]">
          {eyebrow}
        </span>
        <span className="block text-sm font-bold leading-tight text-white">
          {name}
        </span>
      </span>
    </div>
  );
}

function MountainviewScreen() {
  return (
    <div className="bg-white pb-6">
      <div className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-5 pb-4 pt-3 text-white">
        <p className="text-sm font-bold">Mountainview</p>
        <p className="text-[11px] text-white/85">
          Your weight-loss companion
        </p>
      </div>
      <div className="px-4 pt-4">
        <div className="rounded-xl bg-[#FAF7EE] p-3.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B6863]">
            Today
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold text-[#1B1A18]">
            207.6 lb
          </p>
          <p className="text-[11px] font-semibold text-[#10B981]">
            −1.2 this week
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#E8E2D2] bg-white py-3.5 text-center">
            <span className="text-base leading-none">📷</span>
            <p className="mt-1 text-[11px] font-semibold text-[#1B1A18]">
              Log meal
            </p>
          </div>
          <div className="rounded-xl border border-[#E8E2D2] bg-white py-3.5 text-center">
            <span className="text-base leading-none">⚖️</span>
            <p className="mt-1 text-[11px] font-semibold text-[#1B1A18]">
              Weigh in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhiteLabelVisual() {
  return (
    <div className="mx-auto w-full max-w-md">
      <PhoneFrame
        label="Mountainview Medicine's branded patient app home screen"
        className="max-w-[270px]"
      >
        <MountainviewScreen />
      </PhoneFrame>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <StoreBadge
          eyebrow="Download on the"
          name="App Store"
          icon={<Apple />}
        />
        <StoreBadge
          eyebrow="Get it on"
          name="Google Play"
          icon={<Play fill="currentColor" />}
        />
      </div>
      <p className="mx-auto mt-4 max-w-xs text-center text-sm text-ink-muted">
        <span className="font-semibold text-ink">
          Published by Mountainview Medicine.
        </span>{" "}
        Your developer account. Your listing. Your patients.
      </p>
    </div>
  );
}
