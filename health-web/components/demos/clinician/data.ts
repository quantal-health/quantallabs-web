/**
 * Sample data for the clinician dashboard demo — fictional clinic
 * "Mountainview Medicine" and fictional patients. Mirrors the original
 * static demo (demo-clinician.html) exactly.
 */

/* ------------------------------- roster ---------------------------------- */

export type PatientStatus =
  | "titrating"
  | "stable"
  | "needs-review"
  | "pre-checkin";

export type Trend = "down" | "flat" | "up";

export type Patient = {
  id: string;
  initials: string;
  /** Token-based avatar tint (decorative; initials carry identity). */
  avatarClass: string;
  name: string;
  sex: "F" | "M";
  mrn: string;
  drug: string;
  week: number;
  weight: string;
  trend: Trend;
  trendVal: string;
  status: PatientStatus;
  statusLabel: string;
};

export const PATIENTS: Patient[] = [
  {
    id: "jane",
    initials: "JD",
    avatarClass: "bg-mv-green",
    name: "Jane Doe",
    sex: "F",
    mrn: "4082-A",
    drug: "Wegovy 0.5mg",
    week: 8,
    weight: "207.6 lb",
    trend: "down",
    trendVal: "−10.8 lb",
    status: "titrating",
    statusLabel: "Titrating",
  },
  {
    id: "marcus",
    initials: "MO",
    avatarClass: "bg-danger",
    name: "Marcus Okafor",
    sex: "M",
    mrn: "3117-B",
    drug: "Ozempic 1.0mg",
    week: 10,
    weight: "189.1 lb",
    trend: "down",
    trendVal: "−12.3 lb",
    status: "stable",
    statusLabel: "Stable",
  },
  {
    id: "priya",
    initials: "PA",
    avatarClass: "bg-mv-cyan",
    name: "Priya Iyer-Anand",
    sex: "F",
    mrn: "5530-C",
    drug: "Zepbound 5mg",
    week: 4,
    weight: "172.4 lb",
    trend: "down",
    trendVal: "−9.6 lb",
    status: "needs-review",
    statusLabel: "Needs review",
  },
  {
    id: "rosa",
    initials: "RP",
    avatarClass: "bg-warning",
    name: "Rosa Padilla",
    sex: "F",
    mrn: "2209-D",
    drug: "Wegovy 1.0mg",
    week: 16,
    weight: "162.8 lb",
    trend: "flat",
    trendVal: "−0.2 lb",
    status: "stable",
    statusLabel: "Stable",
  },
  {
    id: "david",
    initials: "DK",
    avatarClass: "bg-info",
    name: "David Kim",
    sex: "M",
    mrn: "6641-E",
    drug: "Mounjaro 7.5mg",
    week: 6,
    weight: "244.2 lb",
    trend: "down",
    trendVal: "−7.1 lb",
    status: "titrating",
    statusLabel: "Titrating",
  },
  {
    id: "linh",
    initials: "LT",
    avatarClass: "bg-mv-cyan",
    name: "Linh Tran",
    sex: "F",
    mrn: "1873-F",
    drug: "Wegovy 1.7mg",
    week: 12,
    weight: "194.0 lb",
    trend: "down",
    trendVal: "−15.2 lb",
    status: "stable",
    statusLabel: "Stable",
  },
  {
    id: "aaron",
    initials: "AB",
    avatarClass: "bg-warning",
    name: "Aaron Burton",
    sex: "M",
    mrn: "7420-G",
    drug: "Saxenda 3.0mg",
    week: 14,
    weight: "218.7 lb",
    trend: "flat",
    trendVal: "−0.5 lb",
    status: "pre-checkin",
    statusLabel: "Pre-checkin",
  },
  {
    id: "sienna",
    initials: "SP",
    avatarClass: "bg-mv-cyan",
    name: "Sienna Park",
    sex: "F",
    mrn: "3968-B",
    drug: "Ozempic 0.5mg",
    week: 2,
    weight: "198.3 lb",
    trend: "down",
    trendVal: "−2.1 lb",
    status: "titrating",
    statusLabel: "Titrating",
  },
  {
    id: "robert",
    initials: "RH",
    avatarClass: "bg-mv-green",
    name: "Robert Hayes",
    sex: "M",
    mrn: "5106-C",
    drug: "Mounjaro 5mg",
    week: 20,
    weight: "231.5 lb",
    trend: "flat",
    trendVal: "−0.8 lb",
    status: "pre-checkin",
    statusLabel: "Pre-checkin",
  },
  {
    id: "amara",
    initials: "AO",
    avatarClass: "bg-info",
    name: "Amara Olusola",
    sex: "F",
    mrn: "8215-D",
    drug: "Wegovy 0.25mg",
    week: 1,
    weight: "203.9 lb",
    trend: "flat",
    trendVal: "0.0 lb",
    status: "titrating",
    statusLabel: "Titrating",
  },
];

export const STATUS_TONE = {
  titrating: "info",
  stable: "success",
  "needs-review": "warning",
  "pre-checkin": "neutral",
} as const;

export type RosterFilter = "all" | PatientStatus;

export const ROSTER_FILTERS: { value: RosterFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "titrating", label: "On titration" },
  { value: "stable", label: "Stable" },
  { value: "needs-review", label: "Needs review" },
  { value: "pre-checkin", label: "Pre-checkin" },
];

/* --------------------------- Jane: weight chart --------------------------- */

export const WEIGHT_SERIES = [
  { week: "W1", lb: 218.4 },
  { week: "W2", lb: 216.8 },
  { week: "W3", lb: 215.2 },
  { week: "W4", lb: 213.0 },
  { week: "W5", lb: 212.1 },
  { week: "W6", lb: 210.4 },
  { week: "W7", lb: 208.9 },
  { week: "W8", lb: 207.6 },
];

/* --------------------------- Jane: activity feed -------------------------- */

export type FeedKind = "weight" | "meal" | "message" | "symptom";

export type FeedPart = { text: string; bold?: boolean; italic?: boolean };

export type FeedItem = {
  kind: FeedKind;
  parts: FeedPart[];
  badge?: string;
  time: string;
};

export const ACTIVITY: FeedItem[] = [
  {
    kind: "weight",
    parts: [{ text: "Logged weight: " }, { text: "207.6 lb", bold: true }],
    time: "Today, 8:14 AM · self-reported",
  },
  {
    kind: "meal",
    parts: [
      { text: "Logged meal: " },
      { text: "greek yogurt + granola, 290 kcal", bold: true },
    ],
    badge: "AI Vision · accepted unmodified",
    time: "Today, 9:02 AM",
  },
  {
    kind: "message",
    parts: [
      { text: "Sent message to Dr. Chen: " },
      {
        text: "“the nausea has stopped — should we still increase to 1.0mg next week?”",
        italic: true,
      },
    ],
    time: "Yesterday, 7:45 PM",
  },
  {
    kind: "meal",
    parts: [
      { text: "Logged meal: " },
      { text: "grilled chicken salad, 410 kcal", bold: true },
      { text: " (manual)" },
    ],
    time: "Yesterday, 12:30 PM",
  },
  {
    kind: "symptom",
    parts: [
      { text: "Logged side effect: " },
      { text: "nausea, mild", bold: true },
      { text: " · resolved next day" },
    ],
    time: "3 days ago · 2:10 PM",
  },
];

/* ------------------------------ Jane: SOAP -------------------------------- */

export const SOAP_NOTE = [
  {
    label: "Subjective",
    text: "Patient reports mild nausea on weeks 5–6, fully resolved by week 7. No vomiting, no GI distress, sleep stable.",
  },
  {
    label: "Objective",
    text: "8-week weight loss of 10.8 lb (4.9%). BMI dropped from 32.4 to 30.8. Adherence 96%. Wearable HR baseline stable.",
  },
  {
    label: "Assessment",
    text: "Tolerating 0.5mg Wegovy well. Clinically appropriate to consider titration to 1.0mg per manufacturer guidance.",
  },
  {
    label: "Plan",
    text: "Discuss titration at next visit (scheduled May 14). Continue food + weight logging. Patient knows to message me if nausea recurs at higher dose.",
  },
];

/* ------------------------------ Jane: logs -------------------------------- */

export type LogType = "meal" | "weight" | "symptom";

export const LOG_TONE = {
  meal: "warning",
  weight: "success",
  symptom: "danger",
} as const;

export const LOGS: {
  when: string;
  type: LogType;
  detail: string;
  source: string;
}[] = [
  { when: "Today, 9:02 AM", type: "meal", detail: "Greek yogurt + granola · 290 kcal", source: "AI Vision (accepted)" },
  { when: "Today, 8:14 AM", type: "weight", detail: "207.6 lb", source: "Manual" },
  { when: "Yesterday, 7:30 PM", type: "meal", detail: "Salmon + asparagus · 460 kcal", source: "Manual" },
  { when: "Yesterday, 12:30 PM", type: "meal", detail: "Grilled chicken salad · 410 kcal", source: "Manual" },
  { when: "Yesterday, 7:50 AM", type: "meal", detail: "Oatmeal w/ berries · 320 kcal", source: "Manual" },
  { when: "2 days ago, 8:02 AM", type: "weight", detail: "208.4 lb", source: "Manual" },
  { when: "3 days ago, 2:10 PM", type: "symptom", detail: "Nausea, mild", source: "Manual" },
  { when: "3 days ago, 8:08 AM", type: "weight", detail: "208.9 lb", source: "Manual" },
  { when: "4 days ago, 6:42 PM", type: "meal", detail: "Turkey wrap · 380 kcal", source: "AI Vision (edited from “panini”)" },
  { when: "5 days ago, 8:15 AM", type: "weight", detail: "209.6 lb", source: "Manual" },
];

/* --------------------------- Jane: message thread ------------------------- */

export type ThreadMessage = {
  from: "patient" | "clinician";
  text: string;
  time: string;
  unread?: boolean;
};

export const JANE_THREAD: ThreadMessage[] = [
  {
    from: "patient",
    text: "Hi Dr. Chen — I had two days of mild nausea last week but it's gone now. Sleep has been good. Down to 207 even.",
    time: "3 days ago · 4:18 PM",
  },
  {
    from: "clinician",
    text: "That's great progress, Jane. Mild nausea in the first weeks of titration is common and usually self-limiting. Good that it resolved. Keep logging meals and let me know if anything changes.",
    time: "3 days ago · 5:04 PM",
  },
  {
    from: "patient",
    text: "Thanks. One more thing — am I still on track to move up to 1.0mg next week?",
    time: "2 days ago · 9:22 AM",
  },
  {
    from: "clinician",
    text: "Let's discuss at your visit on the 14th. We'll go through your logs together. Bring any questions you have.",
    time: "2 days ago · 11:48 AM",
  },
  {
    from: "patient",
    text: "Hi Dr. Chen, the nausea has stopped — should we still increase to 1.0mg next week?",
    time: "Yesterday · 7:45 PM",
    unread: true,
  },
];

/** Prescriptive verbs blocked by the clinical-language check on send. */
export const FORBIDDEN_CLINICAL_TERMS = [
  "recommend",
  "should hold",
  "titrate up",
  "consider",
];

/* ------------------------------ Jane: notes ------------------------------- */

export const NOTES_TEXT = `Patient is highly engaged. 96% logging adherence. Down 4.9% in 8w which is on the higher end of typical for this population — confirms good med response.

Risk-aware around the titration step-up. The mild nausea fully resolved on its own which is reassuring.

For May 14 visit:
- Confirm BP / HR / weight in clinic.
- Discuss step to 1.0mg.
- Reinforce continued logging.
- Schedule next follow-up at week 12.`;

/* -------------------------------- inbox ----------------------------------- */

export type InboxThread = {
  patientId: string;
  name: string;
  initials: string;
  avatarClass: string;
  preview: string;
  time: string;
  unread: boolean;
};

export const INBOX: InboxThread[] = [
  {
    patientId: "jane",
    name: "Jane Doe",
    initials: "JD",
    avatarClass: "bg-mv-green",
    preview:
      "Hi Dr. Chen, the nausea has stopped — should we still increase to 1.0mg next week?",
    time: "Yesterday 7:45 PM",
    unread: true,
  },
  {
    patientId: "rosa",
    name: "Rosa Padilla",
    initials: "RP",
    avatarClass: "bg-warning",
    preview:
      "My pen feels like it might be empty — how do I tell? I have my next injection tomorrow.",
    time: "Yesterday 5:12 PM",
    unread: true,
  },
  {
    patientId: "david",
    name: "David Kim",
    initials: "DK",
    avatarClass: "bg-info",
    preview:
      "Some headaches this week — not bad, just wanted to let you know. Logged it in the app.",
    time: "2 days ago 11:08 AM",
    unread: true,
  },
  {
    patientId: "priya",
    name: "Priya Iyer-Anand",
    initials: "PA",
    avatarClass: "bg-mv-cyan",
    preview:
      "Thank you for the food guide PDF — really helpful. Down 6 lb so far this month!",
    time: "2 days ago 9:34 AM",
    unread: true,
  },
  {
    patientId: "marcus",
    name: "Marcus Okafor",
    initials: "MO",
    avatarClass: "bg-danger",
    preview: "Got it, will keep logging. See you at the 14th.",
    time: "3 days ago",
    unread: false,
  },
  {
    patientId: "linh",
    name: "Linh Tran",
    initials: "LT",
    avatarClass: "bg-mv-cyan",
    preview:
      "Got the form back to you. Question about insurance — does my plan cover it after refill 4?",
    time: "3 days ago",
    unread: false,
  },
  {
    patientId: "aaron",
    name: "Aaron Burton",
    initials: "AB",
    avatarClass: "bg-warning",
    preview: "All good here, no issues. Keep up the great work.",
    time: "4 days ago",
    unread: false,
  },
];

/* -------------------------------- tasks ----------------------------------- */

export const TREND_REVIEW_LIST = [
  "Jane Doe — −4.9% over 8w (loss)",
  "Marcus Okafor — −6.1% over 10w (loss)",
  "Priya Iyer-Anand — −5.3% over 4w (loss · faster than typical, consider review)",
  "Linh Tran — −5.5% over 12w (loss)",
  "+ 8 more",
];

export const NOT_LOGGED_LIST = [
  { name: "Aaron Burton", detail: "last log 9 days ago" },
  { name: "Robert Hayes", detail: "last log 11 days ago" },
  { name: "Sienna Park", detail: "last log 14 days ago" },
];

/* ------------------------------- reports ---------------------------------- */

export const DRUG_OUTCOMES = [
  { drug: "Wegovy", loss: 4.8, label: "−4.8%" },
  { drug: "Ozempic", loss: 4.1, label: "−4.1%" },
  { drug: "Zepbound", loss: 5.4, label: "−5.4%" },
  { drug: "Mounjaro", loss: 4.6, label: "−4.6%" },
  { drug: "Saxenda", loss: 2.6, label: "−2.6%" },
];

export const COMPLIANCE = [
  { label: "Patients logging weight ≥1×/week", num: 54, den: 60, pct: 90, warn: false },
  { label: "Patients logging meals ≥3×/week", num: 42, den: 60, pct: 70, warn: false },
  { label: "Patients with ≥1 message exchange / month", num: 48, den: 60, pct: 80, warn: false },
  { label: "Patients who logged ≥1 side effect", num: 22, den: 60, pct: 37, warn: true },
];

export const WORKLOAD: { label: string; value: string; countTo?: number }[] = [
  { label: "Messages handled this week", value: "37", countTo: 37 },
  { label: "Tasks closed this week", value: "14", countTo: 14 },
  { label: "Avg response time (24h coverage hours)", value: "2h 14min" },
  { label: "Visits completed this month", value: "22", countTo: 22 },
  { label: "Pending pre-visit forms", value: "3", countTo: 3 },
];

/**
 * Donut slices for panel composition. Colors validated for both themes with
 * the dataviz palette validator (mv-green / mv-cyan / #B8810F amber pass the
 * lightness band, chroma floor, CVD separation, and 3:1 surface contrast on
 * white and on the dark surface — the amber literal stays fixed across themes
 * on purpose; the theme's quantum-dark token flips too light in dark mode).
 */
export const PANEL_SLICES = [
  { name: "At maintenance dose", value: 38, color: "var(--color-mv-green)" },
  { name: "On titration (any drug)", value: 18, color: "var(--color-mv-cyan)" },
  { name: "Pending verification", value: 4, color: "#B8810F" },
];

export const PANEL_META = [
  { label: "Active patients", value: "60" },
  { label: "Avg weeks on therapy", value: "14.2" },
];

/* ------------------------------- settings --------------------------------- */

export const CLINIC_SETTINGS = [
  { k: "Display name", v: "Mountainview Medicine" },
  { k: "Custom domain", v: "mountainview-medicine.quantal.health" },
  { k: "Tier", v: "Pro" },
  { k: "Active clinicians", v: "4" },
  { k: "Active patients", v: "240" },
  { k: "Clinical template", v: "Weight Loss Clinic v1" },
];

export const PROFILE_SETTINGS = [
  { k: "Email", v: "sarah.chen@mountainview-medicine.com" },
  { k: "Role", v: "Owner · Clinician Admin" },
  { k: "NPI", v: "1234567890" },
  { k: "Notification preferences", v: "Email + in-app" },
];
