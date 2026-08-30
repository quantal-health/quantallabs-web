"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Ellipsis,
  House,
  MessageSquare,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Container } from "@/components/marketing/section";
import { PhoneFrame } from "@/components/marketing/device-mock";
import { Reveal } from "@/components/motion/reveal";
import {
  SCREENS,
  SEED_MESSAGES,
  MEAL,
  type ChatMessage,
  type ScreenId,
  type TabId,
} from "./data";
import {
  AnalyzingScreen,
  CameraScreen,
  CheckinScreen,
  HelpScreen,
  HomeScreen,
  MealChooserScreen,
  MessagesScreen,
  ProfileScreen,
  ResultScreen,
  SplashScreen,
  TrendsScreen,
  type MealDraft,
  type NutritionState,
} from "./screens";

const EASE_ENTRANCE = [0.22, 1, 0.36, 1] as const;

/** Where we are + whether arrival should trigger auto-advance timers
 *  (in-app navigation does; the external stepper / screen list doesn't). */
type Nav = { id: ScreenId; auto: boolean };

/* ------------------------------ bottom tabs ------------------------------ */

const TABS: { id: TabId; label: string; target: ScreenId; icon: LucideIcon }[] =
  [
    { id: "home", label: "Home", target: "home", icon: House },
    { id: "log", label: "Log", target: "meal-chooser", icon: CirclePlus },
    { id: "trends", label: "Trends", target: "trends", icon: TrendingUp },
    { id: "messages", label: "Messages", target: "messages", icon: MessageSquare },
    { id: "more", label: "More", target: "profile", icon: Ellipsis },
  ];

function TabBar({
  activeTab,
  go,
}: {
  activeTab: TabId | null;
  go: (id: ScreenId) => void;
}) {
  return (
    <nav
      aria-label="Patient app tabs"
      className="flex h-14 shrink-0 items-stretch border-t border-[#e5e7eb] bg-white"
    >
      {TABS.map((t) => {
        const active = t.id === activeTab;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.target)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-w-11 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
              active ? "text-mv-green" : "text-[#6b7280] hover:text-[#111827]",
            )}
          >
            <t.icon aria-hidden className="size-5" strokeWidth={2} />
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------ ext. stepper ------------------------------ */

function Stepper({
  index,
  onJump,
}: {
  index: number;
  onJump: (id: ScreenId) => void;
}) {
  const prev = SCREENS[index - 1];
  const next = SCREENS[index + 1];
  const current = SCREENS[index];
  return (
    <div className="flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 shadow-soft">
      <button
        type="button"
        aria-label="Previous screen"
        disabled={!prev}
        onClick={() => prev && onJump(prev.id)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-paper-light text-ink transition-colors hover:bg-mv-green hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-paper-light disabled:hover:text-ink"
      >
        <ChevronLeft aria-hidden className="size-4" strokeWidth={2.5} />
      </button>
      <p
        aria-live="polite"
        className="min-w-[190px] text-center text-sm font-semibold"
      >
        Screen {index + 1} of {SCREENS.length}
        <span className="font-medium text-ink-muted">
          {" "}
          · {current?.label}
        </span>
      </p>
      <button
        type="button"
        aria-label="Next screen"
        disabled={!next}
        onClick={() => next && onJump(next.id)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-paper-light text-ink transition-colors hover:bg-mv-green hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-paper-light disabled:hover:text-ink"
      >
        <ChevronRight aria-hidden className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* ------------------------------ orchestrator ------------------------------ */

export function PatientDemo() {
  const reduced = useReducedMotion();
  const [nav, setNav] = React.useState<Nav>({ id: "splash", auto: true });
  const [nutrition, setNutrition] = React.useState<NutritionState>({
    meals: 1,
    kcal: MEAL.kcal,
    protein: MEAL.protein,
    fiber: MEAL.fiber,
  });
  const [messages, setMessages] = React.useState<ChatMessage[]>(SEED_MESSAGES);

  /** In-app navigation (tab bar, buttons inside screens) — timers allowed. */
  const go = React.useCallback((id: ScreenId) => setNav({ id, auto: true }), []);
  /** External navigation (stepper, screen list) — suppresses auto-advance. */
  const jump = React.useCallback(
    (id: ScreenId) => setNav({ id, auto: false }),
    [],
  );

  const index = Math.max(
    0,
    SCREENS.findIndex((s) => s.id === nav.id),
  );
  const current = SCREENS[index];

  const saveMeal = React.useCallback(
    (meal: MealDraft) => {
      setNutrition((n) => ({
        meals: n.meals + 1,
        kcal: n.kcal + meal.kcal,
        protein: n.protein + meal.protein,
        fiber: n.fiber + meal.fiber,
      }));
      go("home");
      toast(`Meal saved · +${meal.kcal} kcal`, {
        description: "Thanks — your edits help us improve over time.",
      });
    },
    [go],
  );

  const sendMessage = React.useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "me", text },
    ]);
  }, []);

  const submitCheckin = React.useCallback(() => {
    go("home");
    toast("Check-in logged — nice streak!", { description: "See you tomorrow." });
  }, [go]);

  const screen = (() => {
    switch (nav.id) {
      case "splash":
        return <SplashScreen auto={nav.auto} go={go} />;
      case "home":
        return <HomeScreen go={go} nutrition={nutrition} />;
      case "meal-chooser":
        return <MealChooserScreen go={go} nutrition={nutrition} />;
      case "camera":
        return <CameraScreen go={go} />;
      case "analyzing":
        return <AnalyzingScreen auto={nav.auto} go={go} />;
      case "result":
        return <ResultScreen go={go} onSave={saveMeal} />;
      case "trends":
        return <TrendsScreen />;
      case "messages":
        return <MessagesScreen go={go} messages={messages} onSend={sendMessage} />;
      case "checkin":
        return <CheckinScreen go={go} onSubmit={submitCheckin} />;
      case "profile":
        return <ProfileScreen go={go} />;
      case "help":
        return <HelpScreen go={go} />;
    }
  })();

  return (
    <Container>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Stage: phone + stepper */}
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-xl border border-line bg-paper-light px-4 py-8 sm:px-10 sm:py-12">
            <PhoneFrame className="w-full">
              <div className="flex h-[560px] flex-col bg-white">
                <div className="relative flex-1 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={nav.id}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduced ? { opacity: 1 } : { opacity: 0, x: -14 }}
                      transition={{
                        duration: reduced ? 0 : 0.22,
                        ease: EASE_ENTRANCE,
                      }}
                      className="absolute inset-0 flex flex-col bg-white"
                    >
                      {screen}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {current?.tabBar && <TabBar activeTab={current.tab} go={go} />}
              </div>
            </PhoneFrame>

            <Stepper index={index} onJump={jump} />

            <p className="max-w-xs text-center text-xs text-ink-muted">
              Tip: tap any green button or use the bottom tab bar to navigate
              the app like Jane would. The arrows above step through screens.
            </p>
          </div>
        </Reveal>

        {/* Numbered screen list (desktop) */}
        <Reveal index={1} className="hidden lg:block">
          <aside aria-label="Demo screens">
            <h2 className="text-eyebrow font-bold uppercase text-ink-muted">
              The 11 screens
            </h2>
            <ol className="mt-4 space-y-1">
              {SCREENS.map((s, i) => {
                const active = s.id === nav.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => jump(s.id)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                        active
                          ? "border-mv-green/40 bg-mv-green/10 font-semibold text-ink"
                          : "border-transparent text-ink-muted hover:bg-surface hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-medium",
                          active
                            ? "bg-mv-green text-white"
                            : "bg-paper-dark text-ink-muted",
                        )}
                      >
                        {i + 1}
                      </span>
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>
        </Reveal>
      </div>
    </Container>
  );
}
