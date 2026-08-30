/**
 * Content data for the Mountainview Medicine admin-console demo.
 * Mirrors the original static demo exactly — every name, ticket, and
 * setting is fictional.
 */

export type Tier = "lite" | "standard" | "pro";

export const CURRENT_TIER: Tier = "pro";

export type AdminModule = {
  id: string;
  /** Emoji glyph shown in the module table. */
  icon: string;
  name: string;
  desc: string;
  /** Tiers this module is available in — tier governs the ceiling. */
  tiers: readonly Tier[];
  on: boolean;
  /** Gated by Quantal Clinical Reviewer sign-off. */
  safety: boolean;
  /** Required in every tier; the toggle is locked. */
  alwaysOn?: boolean;
  /** Safety-critical modules only: Clinical Reviewer sign-off granted. */
  approved?: boolean;
};

export const MODULES: readonly AdminModule[] = [
  {
    id: "auth",
    icon: "🔐",
    name: "Auth",
    desc: "Patient + clinician sign-in",
    tiers: ["lite", "standard", "pro"],
    on: true,
    safety: false,
    alwaysOn: true,
  },
  {
    id: "log_weight",
    icon: "⚖️",
    name: "Logging — weight",
    desc: "Weekly self-reported weight",
    tiers: ["lite", "standard", "pro"],
    on: true,
    safety: false,
    alwaysOn: true,
  },
  {
    id: "log_symptoms",
    icon: "📋",
    name: "Logging — symptoms",
    desc: "Nausea, fatigue, GI tracking",
    tiers: ["standard", "pro"],
    on: true,
    safety: false,
  },
  {
    id: "log_other",
    icon: "💧",
    name: "Logging — hydration / energy / appetite",
    desc: "Lifestyle observations",
    tiers: ["standard", "pro"],
    on: true,
    safety: false,
  },
  {
    id: "food_manual",
    icon: "🍽️",
    name: "Manual food logging",
    desc: "Patient-entered meals + macros",
    tiers: ["standard", "pro"],
    on: true,
    safety: false,
  },
  {
    id: "food_ai",
    icon: "📸",
    name: "AI Food Vision",
    desc: "Photo-based meal recognition",
    tiers: ["pro"],
    on: true,
    safety: true,
    approved: true,
  },
  {
    id: "wearables",
    icon: "⌚",
    name: "Wearables (HealthKit / Health Connect)",
    desc: "Apple Health + Google Health Connect ingest",
    tiers: ["standard", "pro"],
    on: true,
    safety: false,
  },
  {
    id: "messaging",
    icon: "💬",
    name: "Messaging",
    desc: "Patient ↔ clinician async messaging",
    tiers: ["standard", "pro"],
    on: true,
    safety: true,
    approved: true,
  },
  {
    id: "notifications",
    icon: "🔔",
    name: "Notifications",
    desc: "Push + email reminders",
    tiers: ["lite", "standard", "pro"],
    on: true,
    safety: false,
  },
  {
    id: "trends",
    icon: "📈",
    name: "Trends & Insights",
    desc: "Weight trajectory, projections",
    tiers: ["standard", "pro"],
    on: true,
    safety: false,
  },
  {
    id: "red_flag",
    icon: "🚩",
    name: "Red-flag rules engine",
    desc: "Automated symptom triage",
    tiers: ["pro"],
    on: false,
    safety: true,
    approved: false,
  },
];

/* ---------------------------------------------------------------- users -- */

export type UserStatus = "Active" | "Invited" | "Inactive";

export const USER_STATUS_TONE: Record<
  UserStatus,
  "success" | "info" | "neutral"
> = {
  Active: "success",
  Invited: "info",
  Inactive: "neutral",
};

export type AdminUser = {
  initials: string;
  name: string;
  isYou?: boolean;
  role: string;
  email: string;
  lastActive: string;
  status: UserStatus;
  /** Decorative avatar tint — token classes so both themes stay correct. */
  avatarClass: string;
};

export const USERS: readonly AdminUser[] = [
  {
    initials: "SC",
    name: "Dr. Sarah Chen",
    role: "Founder + Clinician",
    email: "sarah.chen@mountainview-medicine.com",
    lastActive: "Just now",
    status: "Active",
    avatarClass: "bg-info",
  },
  {
    initials: "MP",
    name: "Dr. Marcus Patel",
    role: "Clinician",
    email: "marcus.patel@mountainview-medicine.com",
    lastActive: "12 min ago",
    status: "Active",
    avatarClass: "bg-mv-cyan",
  },
  {
    initials: "JW",
    name: "Dr. Jennifer Wong",
    role: "Clinician",
    email: "jennifer.wong@mountainview-medicine.com",
    lastActive: "2 hours ago",
    status: "Active",
    avatarClass: "bg-danger",
  },
  {
    initials: "MR",
    name: "Maria Rodriguez",
    isYou: true,
    role: "Admin",
    email: "maria.rodriguez@mountainview-medicine.com",
    lastActive: "Now",
    status: "Active",
    avatarClass: "bg-mv-green",
  },
  {
    initials: "DK",
    name: "David Kim, NP",
    role: "Clinician",
    email: "david.kim@mountainview-medicine.com",
    lastActive: "Yesterday",
    status: "Active",
    avatarClass: "bg-warning",
  },
  {
    initials: "PA",
    name: "Priya Anand",
    role: "Ops",
    email: "priya.anand@mountainview-medicine.com",
    lastActive: "3 hours ago",
    status: "Active",
    avatarClass: "bg-success",
  },
  {
    initials: "RT",
    name: "Rachel Thompson",
    role: "View-only",
    email: "rachel.thompson@mountainview-medicine.com",
    lastActive: "Yesterday",
    status: "Active",
    avatarClass: "bg-info",
  },
  {
    initials: "TG",
    name: "Tomás García",
    role: "Ops",
    email: "tomas.garcia@mountainview-medicine.com",
    lastActive: "5 days ago",
    status: "Invited",
    avatarClass: "bg-mv-cyan",
  },
  {
    initials: "LB",
    name: "Linda Brennan",
    role: "Front-desk staff",
    email: "linda.brennan@mountainview-medicine.com",
    lastActive: "1 hour ago",
    status: "Active",
    avatarClass: "bg-success",
  },
  {
    initials: "EM",
    name: "Dr. Evan Mitchell",
    role: "Clinician (PRN)",
    email: "evan.mitchell@mountainview-medicine.com",
    lastActive: "2 weeks ago",
    status: "Inactive",
    avatarClass: "bg-quantum-dark",
  },
];

/* -------------------------------------------------------------- tickets -- */

export type TicketMessage = { author: string; time: string; body: string };

export type TicketAction =
  | { type: "reply"; label: string }
  | { type: "toast"; label: string; message: string };

export type Ticket = {
  id: string;
  num: number;
  subject: string;
  status: "Open" | "In Progress" | "Closed";
  tone: "danger" | "warning" | "neutral";
  submittedBy: string;
  time: string;
  actions: readonly TicketAction[];
  messages: readonly TicketMessage[];
};

export const TICKETS: readonly Ticket[] = [
  {
    id: "t1",
    num: 1,
    subject: "Patient app crashes when logging weight",
    status: "Open",
    tone: "danger",
    submittedBy: "Submitted by Jane Doe",
    time: "2 hours ago",
    actions: [
      { type: "toast", label: "Mark in-progress", message: "Marked in-progress" },
      { type: "reply", label: "Reply" },
      { type: "toast", label: "Close", message: "Ticket closed" },
    ],
    messages: [
      {
        author: "Jane Doe (patient)",
        time: "2 hours ago",
        body: "When I tap “save” on the weight log screen, the whole app crashes. I’m using iPhone 14, iOS 17.4. Happens every time after I enter my weekly weight.",
      },
    ],
  },
  {
    id: "t2",
    num: 2,
    subject: "Question about AI Vision accuracy",
    status: "In Progress",
    tone: "warning",
    submittedBy: "Submitted by Dr. Chen",
    time: "Yesterday",
    actions: [
      { type: "reply", label: "Reply" },
      { type: "toast", label: "Close", message: "Ticket closed" },
    ],
    messages: [
      {
        author: "Dr. Sarah Chen",
        time: "Yesterday",
        body: "Several patients are reporting that AI Vision is undercounting their meal portions. Can we get an accuracy report for the last 30 days?",
      },
      {
        author: "Quantal support",
        time: "8 hours ago",
        body: "Hi Dr. Chen — pulling the metrics for your clinic now. Will share a CSV by end of day. Brief context: AI Vision provides estimates patients can edit; correction rate is the right signal to watch.",
      },
    ],
  },
  {
    id: "t3",
    num: 3,
    subject: "Notifications not arriving",
    status: "Closed",
    tone: "neutral",
    submittedBy: "Submitted by patient (anon)",
    time: "4 days ago",
    actions: [{ type: "toast", label: "Reopen", message: "Ticket reopened" }],
    messages: [
      {
        author: "Patient (anonymous)",
        time: "4 days ago",
        body: "I haven’t been getting reminder notifications for my weekly weight log.",
      },
      {
        author: "Quantal support",
        time: "3 days ago",
        body: "Resolved: device-level notification permission was disabled in iOS settings. Patient was guided to re-enable. Closing ticket.",
      },
    ],
  },
];

/* ------------------------------------------------------------- branding -- */

export type BrandingConfig = {
  primary: string;
  secondary: string;
  appName: string;
  font: string;
  welcome: string;
  disclaimer: string;
};

export const BRANDING_DEFAULTS: BrandingConfig = {
  primary: "#16a34a",
  secondary: "#0891b2",
  appName: "Mountainview Medicine",
  font: "Inter",
  welcome:
    "Welcome to your weight management journey at Mountainview Medicine.",
  disclaimer:
    "This app does not provide medical advice. Information shown is for tracking purposes only. Always consult your clinician for medical decisions. Your data is protected under HIPAA and stored on Mountainview Medicine's behalf by Quantal Health.",
};

export const FONT_OPTIONS = [
  "Inter",
  "SF Pro",
  "Roboto",
  "Open Sans",
  "Lato",
] as const;

export const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

/* ------------------------------------------------------------- settings -- */

export const CLINIC_SETTINGS = {
  displayName: "Mountainview Medicine",
  privacyUrl: "https://mountainview-medicine.com/privacy",
  timeZone: "US/Eastern",
  timeZones: ["US/Eastern", "US/Central", "US/Mountain", "US/Pacific"],
  locale: "en-US",
  locales: ["en-US", "es-US"],
  workingDays: "Mon–Fri",
  workingDaysOptions: ["Mon–Fri", "Mon–Sat"],
  hoursFrom: "8:00 AM",
  hoursTo: "5:00 PM",
} as const;

export type InfraRow = {
  label: string;
  host: string;
  detail?: string;
  pill: string;
};

export const INFRA_ROWS: readonly InfraRow[] = [
  {
    label: "Custom apex domain",
    host: "mountainview-medicine.com",
    detail: "· CNAME verified · TLS active",
    pill: "Configured",
  },
  {
    label: "Patient app subdomain",
    host: "app.mountainview-medicine.com",
    detail: "→ Quantal-managed",
    pill: "Active",
  },
  {
    label: "Admin console subdomain",
    host: "mountainview-medicine.quantal.health/admin",
    pill: "Active",
  },
];
