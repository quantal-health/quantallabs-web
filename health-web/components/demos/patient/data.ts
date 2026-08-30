/**
 * Demo data for the Mountainview Medicine patient app.
 * All data is fictional — it mirrors the original static demo exactly.
 */

export type ScreenId =
  | "splash"
  | "home"
  | "meal-chooser"
  | "camera"
  | "analyzing"
  | "result"
  | "trends"
  | "messages"
  | "checkin"
  | "profile"
  | "help";

export type TabId = "home" | "log" | "trends" | "messages" | "more";

export type ScreenDef = {
  id: ScreenId;
  label: string;
  /** Bottom tab highlighted while this screen is active (null = none). */
  tab: TabId | null;
  /** Camera-flow screens are full-bleed and hide the tab bar. */
  tabBar: boolean;
};

export const SCREENS: ScreenDef[] = [
  { id: "splash", label: "Splash", tab: null, tabBar: false },
  { id: "home", label: "Home dashboard", tab: "home", tabBar: true },
  { id: "meal-chooser", label: "Log a meal", tab: "log", tabBar: true },
  { id: "camera", label: "AI vision capture", tab: "log", tabBar: false },
  { id: "analyzing", label: "Analyzing…", tab: "log", tabBar: false },
  { id: "result", label: "AI result + edit", tab: "log", tabBar: true },
  { id: "trends", label: "Trends", tab: "trends", tabBar: true },
  { id: "messages", label: "Messages", tab: "messages", tabBar: true },
  { id: "checkin", label: "Daily check-in", tab: "home", tabBar: true },
  { id: "profile", label: "Profile / More", tab: "more", tabBar: true },
  { id: "help", label: "Help & Support", tab: "more", tabBar: true },
];

/** The AI-detected demo meal (screen 6 defaults + the pre-logged breakfast). */
export const MEAL = {
  title: "Greek yogurt with granola",
  kcal: 290,
  protein: 18,
  fiber: 4,
};

/** Weekly weigh-ins W1 → W8 (Mar 14 — May 9): −10.8 lb, −5.0% of body weight. */
export const WEIGHT_SERIES: { week: string; lb: number }[] = [
  { week: "W1", lb: 218.4 },
  { week: "W2", lb: 216.8 },
  { week: "W3", lb: 215.2 },
  { week: "W4", lb: 213.0 },
  { week: "W5", lb: 212.1 },
  { week: "W6", lb: 210.4 },
  { week: "W7", lb: 208.9 },
  { week: "W8", lb: 207.6 },
];

/** Week the Wegovy dose stepped up to 0.5mg. */
export const TITRATION_WEEK = "W5";

export type ChatMessage = {
  id: number;
  from: "them" | "me";
  text: string;
  /** Optional timestamp divider rendered above this bubble. */
  meta?: string;
};

export const SEED_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    from: "them",
    meta: "Yesterday, 3:42 PM",
    text: "Hi Jane — how are the meals going this week? Any return of the nausea?",
  },
  {
    id: 2,
    from: "me",
    text: "Hi Dr. Chen, the nausea has stopped — should we still increase to 1.0mg next week?",
  },
  {
    id: 3,
    from: "them",
    text: "Great news. Yes, let’s plan to titrate up. I’ll send instructions in tomorrow’s check-in.",
  },
  {
    id: 4,
    from: "them",
    meta: "Today, 9:18 AM",
    text: "Saw your morning weight — nice steady decline. Keep the protein up at breakfast.",
  },
];

export const SLEEP_OPTIONS = [
  "5 hours",
  "6 hours",
  "7 hours",
  "8 hours",
  "9+ hours",
] as const;

export const SIDE_EFFECT_OPTIONS = [
  "Nausea",
  "Fatigue",
  "Headache",
  "None",
] as const;
