"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  MEAL,
  SIDE_EFFECT_OPTIONS,
  SLEEP_OPTIONS,
  TITRATION_WEEK,
  WEIGHT_SERIES,
  type ScreenId,
} from "./data";

/* ----------------------------------------------------------------------------
   The 11 screens of the Mountainview Medicine patient app. Everything inside
   the phone intentionally uses literal light tenant colors (never theme
   tokens): this is Mountainview's product UI and it stays light in both
   site themes.
---------------------------------------------------------------------------- */

export type Go = (id: ScreenId) => void;

export type NutritionState = {
  meals: number;
  kcal: number;
  protein: number;
  fiber: number;
};

export type MealDraft = { kcal: number; protein: number; fiber: number };

/* ------------------------------ shared bits ------------------------------ */

function MvButton({
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "w-full cursor-pointer rounded-xl bg-mv-green px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#15803d] active:scale-[0.99]",
        className,
      )}
      {...props}
    />
  );
}

function MvCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#e5e7eb] bg-white p-3.5 shadow-[0_1px_2px_rgb(17_24_39/0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function MvCardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
      {children}
    </p>
  );
}

function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-[#e5e7eb] bg-white px-3 py-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="flex size-8 cursor-pointer items-center justify-center rounded-full text-mv-green transition-colors hover:bg-[#f0fdf4]"
      >
        <ArrowLeft aria-hidden className="size-4" strokeWidth={2.5} />
      </button>
      <h2 className="text-sm font-semibold text-[#111827]">{title}</h2>
    </div>
  );
}

function Spinner({ className, label }: { className?: string; label: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "size-7 animate-spin rounded-full border-[3px] border-[#dcfce7] border-t-mv-green",
        className,
      )}
    />
  );
}

/** Stylized captured-meal placeholder (bowl of yogurt), pure CSS gradients. */
function FoodVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden", className)}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #fde68a 0%, transparent 35%), radial-gradient(circle at 70% 60%, #fef3c7 0%, transparent 30%), linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          inset: "18% 22%",
          background:
            "radial-gradient(circle, #ffffff 0%, #f3f4f6 60%, #d1d5db 100%)",
          boxShadow: "inset 0 0 30px rgb(0 0 0 / 0.1)",
        }}
      />
      <div
        className="absolute opacity-70"
        style={{
          top: "32%",
          left: "35%",
          width: "30%",
          height: "25%",
          borderRadius: "40%",
          background:
            "radial-gradient(ellipse, #92400e 0%, #b45309 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ------------------------------ 1 · Splash ------------------------------- */

export function SplashScreen({ auto, go }: { auto: boolean; go: Go }) {
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced || !auto) return;
    const t = window.setTimeout(() => go("home"), 1800);
    return () => window.clearTimeout(t);
  }, [reduced, auto, go]);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(160deg, #dcfce7 0%, #ffffff 100%)" }}
    >
      <div
        aria-hidden
        className="flex size-16 items-center justify-center rounded-[14px] bg-mv-green text-[28px] font-bold text-white shadow-md"
      >
        M
      </div>
      <h2 className="mt-4 text-lg font-bold text-[#111827]">
        Mountainview Medicine
      </h2>
      <p className="mt-1 text-sm text-[#6b7280]">Welcome back, Jane</p>
      {reduced ? (
        <MvButton onClick={() => go("home")} className="mt-6 w-auto px-6">
          Continue
        </MvButton>
      ) : (
        <Spinner className="mt-6" label="Loading" />
      )}
    </div>
  );
}

/* ------------------------------- 2 · Home -------------------------------- */

function QuickAction({
  emoji,
  label,
  onClick,
}: {
  emoji: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-[#bbf7d0] bg-[#dcfce7] px-3.5 py-3 text-left text-sm font-semibold text-[#15803d] transition-all hover:bg-[#bbf7d0] active:scale-[0.98]"
    >
      <span aria-hidden className="text-lg leading-none">
        {emoji}
      </span>
      {label}
    </button>
  );
}

export function HomeScreen({
  go,
  nutrition,
}: {
  go: Go;
  nutrition: NutritionState;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
      <h2 className="text-lg font-semibold text-[#111827]">Hello, Jane.</h2>
      <p className="text-xs text-[#6b7280]">
        Week 8 of your journey · Wegovy 0.5mg
      </p>

      <button
        type="button"
        onClick={() => go("checkin")}
        className="mt-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl bg-gradient-to-br from-mv-green to-[#15803d] px-3.5 py-2.5 text-left text-sm font-semibold text-white transition-transform active:scale-[0.98]"
      >
        <span>
          Daily check-in
          <span className="mt-0.5 block text-[11px] font-normal text-white/90">
            How are you feeling today? · ~60 seconds
          </span>
        </span>
        <span aria-hidden className="text-base">
          →
        </span>
      </button>

      <MvCard className="mt-3">
        <MvCardLabel>Today&apos;s weight</MvCardLabel>
        <p className="mt-1 font-mono text-2xl font-bold text-[#111827]">
          207.6{" "}
          <span className="font-sans text-sm font-medium text-[#6b7280]">
            lb
          </span>
        </p>
        <p className="mt-0.5 text-[11px] text-[#6b7280]">
          Logged this morning ·{" "}
          <span className="font-semibold text-mv-green">
            −1.3 lb from last week
          </span>
        </p>
      </MvCard>

      <MvCard className="mt-3">
        <MvCardLabel>Today&apos;s nutrition</MvCardLabel>
        <p className="mt-1 font-mono text-2xl font-bold text-[#111827]">
          {nutrition.kcal}{" "}
          <span className="font-sans text-sm font-medium text-[#6b7280]">
            / ~1500 kcal
          </span>
        </p>
        <p className="mt-0.5 text-[11px] text-[#6b7280]">
          {nutrition.meals} meal{nutrition.meals === 1 ? "" : "s"} logged ·{" "}
          {nutrition.protein}g protein · {nutrition.fiber}g fiber
        </p>
      </MvCard>

      <div className="mt-3 grid gap-2">
        <QuickAction
          emoji="📷"
          label="Snap a meal"
          onClick={() => go("meal-chooser")}
        />
        <QuickAction
          emoji="⚖️"
          label="Log weight"
          onClick={() =>
            toast("Weight logged", {
              description:
                "Today’s weight was already logged this morning — 207.6 lb.",
            })
          }
        />
        <QuickAction
          emoji="💬"
          label="Message Dr. Chen"
          onClick={() => go("messages")}
        />
      </div>
    </div>
  );
}

/* --------------------------- 3 · Meal chooser ---------------------------- */

export function MealChooserScreen({
  go,
  nutrition,
}: {
  go: Go;
  nutrition: NutritionState;
}) {
  return (
    <>
      <ScreenHeader title="Add a meal" onBack={() => go("home")} />
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <p className="mt-3.5 text-center text-xs text-[#6b7280]">
          How would you like to log this meal?
        </p>
        <div className="mt-3 grid gap-2.5">
          <button
            type="button"
            onClick={() => go("camera")}
            className="cursor-pointer rounded-[14px] border-2 border-[#dcfce7] bg-white px-3.5 py-4 text-center text-sm font-semibold text-[#111827] transition-colors hover:border-mv-green hover:bg-[#dcfce7]"
          >
            <span aria-hidden className="block text-3xl leading-none">
              📷
            </span>
            <span className="mt-2 block">Use AI Vision</span>
            <span className="mt-1 block text-[11px] font-normal text-[#6b7280]">
              ~30 seconds · we parse it for you
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              toast("Manual entry isn’t wired in this demo", {
                description: "In the real app it opens USDA database search.",
              })
            }
            className="cursor-pointer rounded-[14px] border-2 border-[#dcfce7] bg-white px-3.5 py-4 text-center text-sm font-semibold text-[#111827] transition-colors hover:border-mv-green hover:bg-[#dcfce7]"
          >
            <span aria-hidden className="block text-3xl leading-none">
              ✏️
            </span>
            <span className="mt-2 block">Manual entry</span>
            <span className="mt-1 block text-[11px] font-normal text-[#6b7280]">
              Search USDA database
            </span>
          </button>
        </div>

        <MvCard className="mt-4 bg-[#f9fafb]">
          <MvCardLabel>Today so far</MvCardLabel>
          <p className="mt-1.5 text-xs text-[#4b5563]">
            {nutrition.meals} meal{nutrition.meals === 1 ? "" : "s"} ·{" "}
            {nutrition.kcal} kcal · targets: ~1500 kcal, 90g protein
          </p>
        </MvCard>
      </div>
    </>
  );
}

/* ------------------------- 4 · Camera viewfinder -------------------------- */

export function CameraScreen({ go }: { go: Go }) {
  const reduced = useReducedMotion();
  const [flashing, setFlashing] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const capture = () => {
    if (flashing) return;
    if (reduced) {
      go("analyzing");
      return;
    }
    setFlashing(true);
    timer.current = window.setTimeout(() => go("analyzing"), 230);
  };

  return (
    <div className="flex flex-1 flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => go("meal-chooser")}
          className="cursor-pointer text-sm text-white"
        >
          Cancel
        </button>
        <span className="text-xs text-white/70">Lunch</span>
        <span aria-hidden className="w-11" />
      </div>

      <div
        className="relative flex-1 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)",
        }}
      >
        <div aria-hidden className="absolute inset-5">
          <span className="absolute left-0 top-0 size-6 rounded-tl-lg border-l-2 border-t-2 border-white/40" />
          <span className="absolute right-0 top-0 size-6 rounded-tr-lg border-r-2 border-t-2 border-white/40" />
          <span className="absolute bottom-0 left-0 size-6 rounded-bl-lg border-b-2 border-l-2 border-white/40" />
          <span className="absolute bottom-0 right-0 size-6 rounded-br-lg border-b-2 border-r-2 border-white/40" />
        </div>
        <div className="flex h-full flex-col items-center justify-center text-white/50">
          <Camera aria-hidden className="size-12 opacity-60" strokeWidth={1.5} />
          <p className="mt-2 text-sm">Frame your meal</p>
        </div>
        <AnimatePresence>
          {flashing && (
            <motion.div
              aria-hidden
              className="absolute inset-0 z-10 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, times: [0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center px-4 pb-6 pt-4">
        <button
          type="button"
          onClick={capture}
          aria-label="Capture meal photo"
          className="size-16 cursor-pointer rounded-full border-4 border-white bg-white/20 transition-all hover:bg-white/30 active:scale-90"
        />
      </div>
    </div>
  );
}

/* ----------------------------- 5 · Analyzing ------------------------------ */

export function AnalyzingScreen({ auto, go }: { auto: boolean; go: Go }) {
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced || !auto) return;
    const t = window.setTimeout(() => go("result"), 2000);
    return () => window.clearTimeout(t);
  }, [reduced, auto, go]);

  return (
    <div className="flex flex-1 flex-col bg-black text-white">
      <div className="px-4 py-3 text-xs text-white/70">Captured</div>
      <div className="relative flex-1">
        <FoodVisual className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 px-6 text-center">
          {!reduced && (
            <Spinner
              label="Analyzing"
              className="border-white/25 border-t-white"
            />
          )}
          <p className="text-sm font-semibold">Analyzing your meal…</p>
          <p className="text-[11px] text-white/75">
            Privacy info stripped on device.
          </p>
          {reduced && (
            <MvButton onClick={() => go("result")} className="mt-2 w-auto px-6">
              Continue
            </MvButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------- 6 · AI result + edit --------------------------- */

function MacroField({
  id,
  label,
  unit,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  max: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-lg bg-[#f9fafb] px-1.5 py-2 text-center">
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full border-0 bg-transparent text-center font-mono text-base font-bold text-[#111827] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="text-[10px] text-[#6b7280]">{unit}</span>
    </div>
  );
}

const CORRECTION_OPTIONS = [
  { value: "just_refining", label: "Just refining" },
  { value: "ai_got_it_wrong", label: "AI got it wrong" },
] as const;

export function ResultScreen({
  go,
  onSave,
}: {
  go: Go;
  onSave: (meal: MealDraft) => void;
}) {
  const reduced = useReducedMotion();
  const [kcal, setKcal] = React.useState(String(MEAL.kcal));
  const [protein, setProtein] = React.useState(String(MEAL.protein));
  const [fiber, setFiber] = React.useState(String(MEAL.fiber));
  const [intent, setIntent] =
    React.useState<(typeof CORRECTION_OPTIONS)[number]["value"]>("just_refining");
  const [showPrompt, setShowPrompt] = React.useState(false);

  // "Was this incorrect?" fades in a beat after the result lands.
  React.useEffect(() => {
    const t = window.setTimeout(() => setShowPrompt(true), 650);
    return () => window.clearTimeout(t);
  }, []);

  const num = (v: string) => Math.max(0, Number.parseInt(v, 10) || 0);

  return (
    <>
      <ScreenHeader title="Review your meal" onBack={() => go("meal-chooser")} />
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-3">
        <FoodVisual className="h-[120px] rounded-xl" />

        <div className="mt-3.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-2 py-0.5 text-[11px] font-semibold text-[#15803d]">
            <Check aria-hidden className="size-3" strokeWidth={3} />
            AI confidence: high
          </span>
          <h3 className="mt-1.5 text-base font-semibold text-[#111827]">
            Greek yogurt with granola
          </h3>
          <p className="mt-0.5 text-[11px] text-[#6b7280]">
            Detected 1 item · you can edit any field
          </p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <MacroField
            id="meal-kcal"
            label="Calories"
            unit="kcal"
            max={2000}
            value={kcal}
            onChange={setKcal}
          />
          <MacroField
            id="meal-protein"
            label="Protein"
            unit="grams"
            max={200}
            value={protein}
            onChange={setProtein}
          />
          <MacroField
            id="meal-fiber"
            label="Fiber"
            unit="grams"
            max={60}
            value={fiber}
            onChange={setFiber}
          />
        </div>

        {showPrompt && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-3.5 rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5"
          >
            <p id="pd-correction" className="text-xs font-semibold text-[#4b5563]">
              Was this incorrect?
            </p>
            <div
              role="group"
              aria-labelledby="pd-correction"
              className="mt-1.5 flex gap-1.5"
            >
              {CORRECTION_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={intent === o.value}
                  onClick={() => setIntent(o.value)}
                  className={cn(
                    "cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                    intent === o.value
                      ? "border-mv-green bg-mv-green text-white"
                      : "border-[#d1d5db] bg-white text-[#4b5563] hover:border-mv-green",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-[#6b7280]">
              Helps us tell &ldquo;portion tweak&rdquo; apart from &ldquo;model
              error&rdquo; · one tap, no follow-up.
            </p>
          </motion.div>
        )}

        <MvButton
          onClick={() =>
            onSave({ kcal: num(kcal), protein: num(protein), fiber: num(fiber) })
          }
          className="mt-3.5"
        >
          Save meal
        </MvButton>
      </div>
    </>
  );
}

/* ------------------------------- 7 · Trends ------------------------------- */

function WeightChart() {
  const reduced = useReducedMotion();
  return (
    <div
      className="mt-2 h-[150px] w-full"
      role="img"
      aria-label="Weight trend chart: 8 weekly points declining steadily from 218.4 pounds in week 1 to 207.6 pounds in week 8 — 10.8 pounds total. Dose stepped up to 0.5 milligrams in week 5."
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={WEIGHT_SERIES}
          margin={{ top: 14, right: 8, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="pd-weight-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f3f4f6" />
          <XAxis
            dataKey="week"
            ticks={["W1", "W4", "W8"]}
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[206, 220]}
            ticks={[208, 214, 220]}
            width={26}
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <ReferenceLine
            x={TITRATION_WEEK}
            stroke="#9ca3af"
            strokeDasharray="4 4"
            label={{
              value: "0.5mg ↑",
              position: "top",
              fontSize: 9,
              fill: "#6b7280",
            }}
          />
          <Area
            type="monotone"
            dataKey="lb"
            stroke="#16a34a"
            strokeWidth={2.5}
            fill="url(#pd-weight-fill)"
            dot={{ r: 2.5, fill: "#16a34a", strokeWidth: 0 }}
            activeDot={{ r: 4 }}
            isAnimationActive={!reduced}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendsScreen() {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
      <h2 className="text-lg font-semibold text-[#111827]">Your trends</h2>
      <p className="text-xs text-[#6b7280]">Weight, nutrition, side effects</p>

      <MvCard className="mt-3 p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <MvCardLabel>Weight (8 weeks)</MvCardLabel>
            <span className="mt-1.5 inline-block rounded-full bg-[#dcfce7] px-2.5 py-1 font-mono text-xs font-bold text-[#15803d]">
              −10.8 lb total
            </span>
          </div>
          <span className="text-[10px] text-[#6b7280]">Mar 14 — May 9</span>
        </div>
        <WeightChart />
        <div className="mt-1.5 flex justify-between text-[11px] text-[#6b7280]">
          <span>
            <strong className="block font-mono text-sm text-[#111827]">
              218.4 lb
            </strong>
            Starting
          </span>
          <span className="text-center">
            <strong className="block font-mono text-sm text-[#111827]">
              −5.0%
            </strong>
            Of body weight
          </span>
          <span className="text-right">
            <strong className="block font-mono text-sm text-[#111827]">
              207.6 lb
            </strong>
            Today
          </span>
        </div>
      </MvCard>

      <MvCard className="mt-3">
        <MvCardLabel>Nutrition (last 7 days)</MvCardLabel>
        <div className="mt-2 flex justify-between">
          <div>
            <p className="text-xs text-[#6b7280]">Avg calories</p>
            <p className="font-mono text-[17px] font-bold text-[#111827]">
              1,480{" "}
              <span className="font-sans text-[11px] font-normal text-[#6b7280]">
                kcal/day
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6b7280]">Avg protein</p>
            <p className="font-mono text-[17px] font-bold text-[#111827]">
              78{" "}
              <span className="font-sans text-[11px] font-normal text-[#6b7280]">
                g/day
              </span>
            </p>
          </div>
        </div>
      </MvCard>

      <MvCard className="mt-3">
        <MvCardLabel>Side effects</MvCardLabel>
        <div className="mt-1.5 flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-mv-green" />
          <span className="text-xs text-[#111827]">Mild nausea</span>
          <span className="ml-auto text-[11px] text-[#6b7280]">
            Resolved week 6
          </span>
        </div>
        <p className="mt-1.5 text-[11px] text-[#6b7280]">
          No active symptoms reported this week.
        </p>
      </MvCard>
    </div>
  );
}

/* ------------------------------ 8 · Messages ------------------------------ */

export function MessagesScreen({
  go,
  messages,
  onSend,
}: {
  go: Go;
  messages: { id: number; from: "them" | "me"; text: string; meta?: string }[];
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = React.useState("");
  const threadRef = React.useRef<HTMLDivElement>(null);
  const count = messages.length;

  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft("");
  };

  return (
    <>
      <ScreenHeader title="Dr. Sarah Chen, MD" onBack={() => go("home")} />
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-3">
        <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto py-1">
          <ul className="flex flex-col">
            {messages.map((m) => (
              <li key={m.id} className="flex flex-col">
                {m.meta && (
                  <p className="my-1.5 text-center text-[10px] text-[#6b7280]">
                    {m.meta}
                  </p>
                )}
                <p
                  className={cn(
                    "mb-2 max-w-[78%] rounded-xl px-2.5 py-2 text-xs leading-relaxed",
                    m.from === "me"
                      ? "self-end rounded-tr-[4px] bg-mv-green text-white"
                      : "self-start rounded-tl-[4px] bg-[#f3f4f6] text-[#111827]",
                  )}
                >
                  {m.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={submit}
          autoComplete="off"
          className="flex gap-1.5 border-t border-[#e5e7eb] pt-3"
        >
          <label htmlFor="pd-msg" className="sr-only">
            Message Dr. Chen
          </label>
          <input
            id="pd-msg"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message Dr. Chen…"
            className="min-w-0 flex-1 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#111827] placeholder:text-[#9ca3af]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-mv-green px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#15803d]"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

/* --------------------------- 9 · Daily check-in --------------------------- */

function ScaleGroup({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <>
      <p id={id} className="mt-3.5 text-xs font-semibold text-[#4b5563]">
        {label}
      </p>
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={onChange}
        aria-labelledby={id}
        orientation="horizontal"
        loop={false}
        className="mt-1.5 flex gap-1"
      >
        {["1", "2", "3", "4", "5"].map((n) => (
          <RadioGroupPrimitive.Item
            key={n}
            value={n}
            className="min-h-10 flex-1 cursor-pointer rounded-lg border border-[#e5e7eb] bg-white text-sm font-semibold text-[#4b5563] transition-colors hover:border-mv-green data-[state=checked]:border-mv-green data-[state=checked]:bg-mv-green data-[state=checked]:text-white"
          >
            {n}
          </RadioGroupPrimitive.Item>
        ))}
      </RadioGroupPrimitive.Root>
    </>
  );
}

export function CheckinScreen({
  go,
  onSubmit,
}: {
  go: Go;
  onSubmit: () => void;
}) {
  const [energy, setEnergy] = React.useState("4");
  const [hunger, setHunger] = React.useState("2");
  const [mood, setMood] = React.useState("4");
  const [sleep, setSleep] = React.useState<string>("7 hours");
  const [effects, setEffects] = React.useState<string[]>(["None"]);

  // "None" is exclusive: picking it clears the rest, picking anything else
  // clears "None".
  const toggleEffect = (name: string) => {
    setEffects((prev) => {
      if (name === "None") return ["None"];
      const rest = prev.filter((e) => e !== "None");
      return rest.includes(name)
        ? rest.filter((e) => e !== name)
        : [...rest, name];
    });
  };

  return (
    <>
      <ScreenHeader title="Daily check-in" onBack={() => go("home")} />
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <p className="mt-2.5 text-center text-xs text-[#6b7280]">
          How are you feeling today?
        </p>

        <ScaleGroup
          id="pd-energy"
          label="Energy"
          value={energy}
          onChange={setEnergy}
        />
        <ScaleGroup
          id="pd-hunger"
          label="Hunger"
          value={hunger}
          onChange={setHunger}
        />
        <ScaleGroup id="pd-mood" label="Mood" value={mood} onChange={setMood} />

        <label
          htmlFor="pd-sleep"
          className="mt-3.5 block text-xs font-semibold text-[#4b5563]"
        >
          Sleep last night
        </label>
        <select
          id="pd-sleep"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          className="mt-1.5 w-full cursor-pointer rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-2 text-xs text-[#111827]"
        >
          {SLEEP_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <p id="pd-effects" className="mt-3.5 text-xs font-semibold text-[#4b5563]">
          Side effects today
        </p>
        <div
          role="group"
          aria-labelledby="pd-effects"
          className="mt-1.5 flex flex-wrap gap-1.5"
        >
          {SIDE_EFFECT_OPTIONS.map((name) => {
            const selected = effects.includes(name);
            return (
              <button
                key={name}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleEffect(name)}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  selected
                    ? "border-mv-green bg-mv-green text-white"
                    : "border-[#e5e7eb] bg-white text-[#4b5563] hover:border-mv-green",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>

        <MvButton onClick={onSubmit} className="mt-4">
          Submit
        </MvButton>
        <p className="mt-2.5 text-center text-[10px] text-[#6b7280]">
          Most patients finish in under a minute.
        </p>
      </div>
    </>
  );
}

/* ------------------------------ 10 · Profile ------------------------------ */

function ProfileRow({
  label,
  value,
  danger = false,
  onClick,
}: {
  label: string;
  value?: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="text-xs font-medium text-[#4b5563]">{label}</span>
      <span
        className={cn(
          "text-xs font-semibold",
          danger ? "text-[#ef4444]" : "text-[#111827]",
        )}
      >
        {value ?? "›"}
      </span>
    </>
  );
  const base =
    "flex w-full items-center justify-between rounded-[10px] border border-[#e5e7eb] bg-white px-3.5 py-3";
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(base, "cursor-pointer text-left transition-colors hover:bg-[#f9fafb]")}
      >
        {inner}
      </button>
    );
  }
  return <div className={base}>{inner}</div>;
}

export function ProfileScreen({ go }: { go: Go }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
      <div
        aria-hidden
        className="mx-auto mt-2 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-mv-green to-[#15803d] text-2xl font-bold text-white"
      >
        JD
      </div>
      <h2 className="mt-1.5 text-center text-base font-bold text-[#111827]">
        Jane Doe
      </h2>
      <p className="mt-0.5 text-center text-xs text-[#6b7280]">
        Mountainview Medicine · member since March 2026
      </p>

      <div className="mt-3.5 space-y-2">
        <ProfileRow label="Active program" value="Wegovy 0.5 → 1.0mg" />
        <ProfileRow label="Care team" value="Dr. Sarah Chen" />
        <ProfileRow label="Connected wearable" value="Apple Health" />
        <ProfileRow label="Help & Support" onClick={() => go("help")} />
        <ProfileRow
          label="Privacy & data"
          onClick={() =>
            toast("Privacy & data isn’t wired in this demo", {
              description:
                "In the real app Jane can review and export everything we store.",
            })
          }
        />
        <ProfileRow
          label="Sign out"
          danger
          onClick={() => toast("This is a demo — Jane stays signed in.")}
        />
      </div>
    </div>
  );
}

/* --------------------------- 11 · Help & Support --------------------------- */

export function HelpScreen({ go }: { go: Go }) {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Support request sent — we’ll be in touch.", {
      description: "The Quantal support team responds within 1 business day.",
    });
    go("home");
  };

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#9ca3af]";

  return (
    <>
      <ScreenHeader title="Help & Support" onBack={() => go("profile")} />
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <p className="mt-3 text-xs text-[#4b5563]">
          Send a request to the Quantal support team. We respond within 1
          business day.
        </p>
        <form onSubmit={submit} className="mt-1">
          <label
            htmlFor="pd-help-subject"
            className="mt-2.5 block text-xs font-semibold text-[#4b5563]"
          >
            Subject
          </label>
          <input
            id="pd-help-subject"
            type="text"
            placeholder="What do you need help with?"
            className={fieldClass}
          />

          <label
            htmlFor="pd-help-desc"
            className="mt-3 block text-xs font-semibold text-[#4b5563]"
          >
            Description
          </label>
          <textarea
            id="pd-help-desc"
            placeholder="Tell us what’s happening…"
            className={cn(fieldClass, "min-h-[90px] resize-y")}
          />

          <MvButton type="submit" className="mt-3.5">
            Send support request
          </MvButton>
        </form>
      </div>
    </>
  );
}
