import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  Check,
  ClipboardCheck,
  Clock,
  Layers,
  Rocket,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Table,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero, HeroBadge } from "@/components/marketing/hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { DarkBand } from "@/components/marketing/dark-band";
import { FeatureCard, LiftCard } from "@/components/marketing/feature-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { BrowserFrame, PhoneFrame } from "@/components/marketing/device-mock";
import { StatusPill } from "@/components/demos/status-pill";
import { Reveal } from "@/components/motion/reveal";
import { LoggingConsistencyChart } from "./logging-chart";

export const metadata: Metadata = {
  title: "For Clinics — Quantal Health",
};

/* ----------------------------------------------------------------- data */

const PROBLEMS = [
  {
    icon: <Table />,
    title: "Tracking weight and side effects across 200+ patients in spreadsheets",
    body: "Your team is copy-pasting weekly weigh-ins from text messages into a shared Google Sheet. Every Friday, someone has to triage who's plateauing, who's nauseous, who never replied. It's slow, error-prone, and impossible to scale past a few hundred patients.",
  },
  {
    icon: <AppWindow />,
    title: "Patients aren't logging because the apps you've tried are generic",
    body: "You've recommended one of the off-the-shelf weight-loss apps. Adoption is mixed. Patients don't see your logo, don't feel your clinic's tone, and drop off in week three. Your retention numbers tell the story.",
  },
  {
    icon: <ShieldAlert />,
    title: "Compliance burden is growing faster than your team",
    body: "Every new vendor means another data agreement to negotiate, another security review, another set of access logs to keep. Your clinic manager is now part-time HIPAA paralegal, and you don't even have a dedicated IT person.",
  },
  {
    icon: <Rocket />,
    title: "Your competitors are launching their own branded apps",
    body: "The clinic across town just rolled out an app with their name on it. Patients notice. You've gotten quotes from app development shops — six figures and twelve months — and that's before any healthcare-grade infrastructure work. It feels out of reach.",
  },
];

const KEEP_CONTROL = [
  {
    title: "Your patients' data",
    body: "Lives in your own dedicated environment. We don't pool data across clinics; what's yours stays yours.",
  },
  {
    title: "Your brand",
    body: "Your app, your name, your colors, your logo — in your own App Store and Play Store accounts.",
  },
  {
    title: "Your relationship with patients",
    body: "Quantal stays out of the way. Your patients see your clinic, message your team, and never see our brand.",
  },
  {
    title: "Your scaling decisions",
    body: "Add patients when you're ready. Move tiers when you outgrow one. We grow with you, not the other way around.",
  },
];

const WE_HANDLE = [
  {
    title: "All the infrastructure",
    body: "Your environment, monitored 24/7 by our operations team. You never see a server, a console, or an alert.",
  },
  {
    title: "All the compliance documentation",
    body: "HIPAA agreements, downstream vendor agreements, activity logs, annual recovery drills — drafted, executed, and kept current.",
  },
  {
    title: "App Store and Play Store submissions",
    body: "We publish on your behalf — submission, review responses, updates, all of it. You enroll your developer accounts; we operate them.",
  },
  {
    title: "Updates and security patches",
    body: "Deployed automatically on a cadence you set. Critical patches go out within hours; feature releases on your schedule.",
  },
];

const TIMELINE = [
  {
    dot: "W0",
    title: "Kickoff",
    body: "Sign contract. Meet your onboarding lead. Map your workflows.",
    done: true,
  },
  {
    dot: "W1–3",
    title: "Developer accounts",
    body: "Apple Developer enrollment. We walk you through every step.",
  },
  {
    dot: "W4",
    title: "Environment + app",
    body: "Your environment provisioned. Your branded app submitted for review.",
  },
  {
    dot: "W5–6",
    title: "Store review",
    body: "App Store and Play Store review. We respond to reviewer questions.",
  },
  {
    dot: "Live",
    title: "First patients",
    body: "Your team logs in. Your first patients onboard. We stay close.",
  },
];

const OUTCOMES = [
  {
    icon: <Clock />,
    title: "Friday triage compresses from hours to minutes",
    body: "Your team stops reading every weight log to find the patients who need a check-in. The dashboard surfaces them. You spend the time you save on the patients themselves, not on hunting for them.",
  },
  {
    icon: <TrendingUp />,
    title: "Patient logging climbs in week two",
    body: "Patients see your branding the moment they open the app, recognize your team in the messaging thread, and stick with logging because it feels like part of their care — not a generic side task. Adoption climbs measurably and stays there.",
  },
  {
    icon: <Layers />,
    title: "One platform replaces four tools",
    body: "The shared spreadsheet, the SMS thread for clinic-to-patient messaging, the third-party patient education app, and whatever home-grown admin sheet you maintain — they all collapse into one dashboard your team actually opens.",
  },
  {
    icon: <ClipboardCheck />,
    title: "Compliance reviews stop being a fire drill",
    body: "When a payer or partner asks for your data-handling documentation, you forward what we've already prepared. Activity logs, vendor agreements, and recovery drill records are kept current — you're not scrambling to assemble them from memory.",
  },
];

const TESTIMONIALS = [
  {
    initials: "MD",
    role: "Medical Director",
    org: "Independent weight-loss practice",
    quote:
      "Quantal handles the technology so I can focus on patient care. I'm a clinician, not an IT manager — that boundary alone made it worth it.",
  },
  {
    initials: "CO",
    role: "Clinic Owner",
    org: "Multi-provider practice",
    quote:
      "Our patients log more consistently in our branded app than they did in any of the generic ones we tried. They feel like the app belongs to our clinic — because it does.",
  },
  {
    initials: "PA",
    role: "Practice Administrator",
    org: "Established clinic, four clinicians",
    quote:
      "Compliance no longer eats my Tuesdays. The agreements get signed, the logs get kept, the drills happen — and I just hear about them in the monthly summary.",
  },
];

/* ------------------------------------------------------ solution visuals */

const ROSTER_ROWS = [
  {
    name: "Jane Doe",
    detail: "Wegovy 1.0mg · Wk 8 · −10.8 lb",
    dot: "bg-success",
    flagged: false,
  },
  {
    name: "Maria Lopez",
    detail: "Zepbound 5mg · Wk 4 · −4.2 lb",
    dot: "bg-success",
    flagged: false,
  },
  {
    name: "Robert Chen",
    detail: "No log in 9 days · check in",
    dot: "bg-warning",
    flagged: true,
  },
];

function RosterMock() {
  return (
    <BrowserFrame
      url="yourclinic.quantal.health"
      label="Clinician dashboard mock: a patient roster of 240 active patients with one patient flagged for a check-in"
      className="w-full max-w-[400px]"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold">Patient roster</p>
          <span className="text-[11px] text-ink-muted">240 active</span>
        </div>
        <div className="mt-3 space-y-2">
          {ROSTER_ROWS.map((r) => (
            <div
              key={r.name}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                r.flagged ? "border-warning" : "border-line"
              }`}
            >
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-quantum-soft text-[10px] font-bold text-quantum-dark dark:text-quantum"
              >
                {r.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold">{r.name}</p>
                <p className="truncate text-[11px] text-ink-muted">
                  {r.detail}
                </p>
              </div>
              <span
                aria-hidden
                className={`size-2 shrink-0 rounded-full ${r.dot}`}
              />
            </div>
          ))}
          <div className="rounded-lg border border-line px-3 py-2 text-[11px] text-ink-muted">
            + 237 more
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function BrandedPhoneMock() {
  return (
    <PhoneFrame
      label="Branded patient app mock: the Mountainview Medicine home screen with today's weight and a log button"
      className="!max-w-[210px] rounded-[34px] border-4"
    >
      <div className="pb-5">
        <div className="mt-1 bg-mv-green px-4 py-2.5">
          <p className="text-[11px] font-bold text-white">
            Mountainview Medicine
          </p>
        </div>
        <div className="px-4 pt-3">
          <p className="text-[15px] font-bold text-[#1B1A18]">Hi, Jane</p>
          <p className="text-[10px] text-[#6B6863]">Week 8 — keep going</p>
          <div className="mt-3 rounded-lg bg-[#F4EFE2] p-3">
            <p className="text-[9px] text-[#6B6863]">Current weight</p>
            <p className="font-mono text-lg font-semibold text-[#1B1A18]">
              207.6 lb
            </p>
          </div>
          <div className="mt-3 rounded-lg bg-mv-green py-2.5 text-center text-[11px] font-semibold text-white">
            Log today&apos;s weight
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const COMPLIANCE_LINES = [
  "99.5% uptime target",
  "Annual disaster-recovery drill",
  "Activity logs on every read and write",
];

function ComplianceMock() {
  return (
    <div className="flex w-full max-w-[320px] flex-col items-center text-center">
      <span
        aria-hidden
        className="flex size-20 items-center justify-center rounded-full border-2 border-quantum bg-quantum-soft text-quantum-dark dark:text-quantum"
      >
        <ShieldCheck className="size-9" />
      </span>
      <p className="mt-4 text-sm font-bold">HIPAA agreements</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        Signed with us. Signed with every vendor downstream. You sign once.
      </p>
      <ul className="mt-5 w-full space-y-2 text-left">
        {COMPLIANCE_LINES.map((line) => (
          <li
            key={line}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-medium"
          >
            <Check aria-hidden className="size-3.5 shrink-0 text-success" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

const SOLUTIONS = [
  {
    title: "One dashboard, every patient at a glance",
    body: "Your team sees one screen with every patient on the roster: current weight, last log, current dose, days since you've heard from them, and any flags worth a closer look. Click a name and you're inside their full history — weight trend, doses, symptoms, messages — in seconds. No more rebuilding context from a spreadsheet row.",
    visual: <RosterMock />,
  },
  {
    title: "Your patients use YOUR app",
    body: "Branded with your clinic name, your colors, your logo. It lives in your own App Store and Play Store accounts — not in a Quantal-branded marketplace. Patients open the app and see your practice, not us. Loyalty stays with you, where it belongs.",
    visual: <BrandedPhoneMock />,
  },
  {
    title: "Patients log more because the app feels like yours",
    body: "When the app on a patient's phone matches the clinic they walked into, adoption goes up. They recognize your branding from their last visit, the tone matches your team, and check-ins feel like an extension of care — not another generic wellness tracker. Manual food logging, wearables sync, symptom tracking, two-way messaging with your team — it's all there.",
    visual: <LoggingConsistencyChart />,
  },
  {
    title: "Compliance is built in — not a checklist you maintain",
    body: "We sign HIPAA-compliant data agreements with every vendor that touches your patients' data — cloud infrastructure, hosting, monitoring, AI providers, all of it. You sign one agreement with us; we handle the rest. Activity logs for every read and write of patient data are kept and queryable. Annual disaster-recovery drill. 99.5% uptime target. Your clinic manager gets her Tuesdays back.",
    visual: <ComplianceMock />,
  },
];

/* ------------------------------------------------------------- sections */

function DarkListColumn({
  icon,
  title,
  intro,
  items,
  chipClass,
}: {
  icon: React.ReactNode;
  title: string;
  intro: string;
  items: { title: string; body: string }[];
  chipClass: string;
}) {
  return (
    <div>
      <Reveal>
        <h2 className="flex items-center gap-3 text-h3 font-bold sm:text-2xl">
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-quantum text-[#1B1A18] [&_svg]:size-5"
          >
            {icon}
          </span>
          {title}
        </h2>
        <p className="mt-4 max-w-md text-[#B8B3A8]">{intro}</p>
      </Reveal>
      <ul className="mt-6">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="border-b border-[rgba(244,239,226,0.12)] py-4 last:border-b-0 last:pb-0"
          >
            <Reveal index={i} className="flex gap-4">
              <span
                aria-hidden
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${chipClass}`}
              >
                <Check className="size-3.5" />
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#B8B3A8]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ForClinicsPage() {
  return (
    <>
      {/* 1 · Hero */}
      <Hero
        badge={<HeroBadge>For clinic owners and admins</HeroBadge>}
        title="Built for the way your clinic actually works."
        lead="If you run a weight-loss clinic prescribing GLP-1 medications, you've probably stitched together spreadsheets, group texts, and three different patient apps to keep up. Quantal replaces all of that with one platform — branded as your clinic, owned by your clinic, run for you behind the scenes. Your patients see your name on the app icon. Your team sees one dashboard instead of seven tabs. Compliance, hosting, security, and store submissions stop being your problem."
        actions={
          <>
            <Button asChild variant="accent" size="lg">
              <Link href="/demo/clinician">Try the clinician demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to founders</Link>
            </Button>
          </>
        }
      />

      {/* 2 · Problems */}
      <Section className="border-y border-line bg-paper-light">
        <SectionHeader
          title="The problems clinics tell us about."
          lead="We've spent the last year sitting with clinic owners, medical directors, and front-office leads at weight-loss practices across the country. Every conversation surfaced some version of these four pain points. They're the reason Quantal exists, and they're the lens we use when we decide what to build next."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} index={i} className="h-full">
              <FeatureCard icon={p.icon} title={p.title} className="h-full">
                {p.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 · Solutions */}
      <Section>
        <SectionHeader
          title="How Quantal Health solves them."
          lead="One purpose-built platform replaces the spreadsheets, the messaging app, the patient education app, and the admin tools. We didn't add features for the sake of a feature list — every module exists because a clinic owner told us they needed it. Here's how it lands in your practice."
        />
        {SOLUTIONS.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={s.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i === 0 ? "mt-14" : "mt-20 md:mt-28"
              }`}
            >
              <Reveal className={flip ? undefined : "md:order-2"}>
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-line bg-paper-light p-6 shadow-soft sm:p-8">
                  {s.visual}
                </div>
              </Reveal>
              <Reveal index={1} className={flip ? "md:order-first" : undefined}>
                <h3 className="text-h3 font-bold sm:text-[1.625rem] sm:leading-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">
                  {s.body}
                </p>
              </Reveal>
            </div>
          );
        })}
      </Section>

      {/* 4 · Keep control vs handled */}
      <DarkBand>
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <DarkListColumn
            icon={<Check />}
            title="What you keep control of"
            intro="The things that matter to your practice — your patients, your brand, your relationship — stay yours. Always."
            items={KEEP_CONTROL}
            chipClass="bg-quantum text-[#1B1A18]"
          />
          <DarkListColumn
            icon={<Settings2 />}
            title="What we handle for you"
            intro="Everything else — the parts that don't make your clinic better but consume time and risk if done wrong."
            items={WE_HANDLE}
            chipClass="bg-[#F4EFE2] text-[#1B1A18]"
          />
        </div>
      </DarkBand>

      {/* 5 · Onboarding timeline */}
      <Section className="bg-paper-light">
        <SectionHeader
          title="Onboarding timeline."
          lead="From signed contract to first patient logging in their branded app — typically 5 to 6 weeks. Most of the calendar is App Store review (which we navigate for you), not engineering. Your operational lift during onboarding is small: a handful of decisions, a few signatures, and one Apple Developer enrollment we walk you through screen by screen."
        />
        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 rounded-full bg-line-strong min-[760px]:block"
          />
          <ol className="grid gap-9 min-[760px]:grid-cols-5 min-[760px]:gap-4">
            {TIMELINE.map((step, i) => (
              <li key={step.dot} className="relative">
                {i < TIMELINE.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -bottom-9 left-7 top-14 w-0.5 -translate-x-1/2 rounded-full bg-line-strong min-[760px]:hidden"
                  />
                )}
                <Reveal
                  index={i}
                  className="flex items-start gap-4 min-[760px]:flex-col min-[760px]:items-center min-[760px]:gap-0 min-[760px]:text-center"
                >
                  <span
                    className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-quantum font-mono text-xs font-bold shadow-soft ${
                      step.done ? "bg-quantum text-[#1B1A18]" : "bg-surface"
                    }`}
                  >
                    {step.dot}
                  </span>
                  <div className="min-[760px]:mt-4">
                    <h3 className="text-[15px] font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-ink-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm italic text-ink-muted">
            After the first cohort, subsequent updates and feature rollouts are
            dramatically faster — we&apos;ve done this end-to-end and the
            playbook is in place.
          </p>
        </Reveal>
      </Section>

      {/* 6 · First 90 days */}
      <Section>
        <SectionHeader
          title="What changes for your team in the first 90 days."
          lead="The platform itself is the easy part. The real value shows up in how your week looks once it's running. Here's what design partners report after their first three months."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.title} index={i} className="h-full">
              <FeatureCard icon={o.icon} title={o.title} className="h-full">
                {o.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 · Testimonials */}
      <Section className="border-y border-line bg-paper-light">
        <SectionHeader
          title="What clinics tell us they value."
          lead="We're early — these reflect what design partners and prospective customers have shared in conversation. Real attributed testimonials will replace these as cohorts launch."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.initials} index={i} className="h-full">
              <LiftCard className="flex h-full flex-col">
                <div>
                  <StatusPill tone="neutral">
                    Design-partner conversation
                  </StatusPill>
                </div>
                <blockquote className="mt-4 flex-1 text-[17px] font-medium leading-relaxed">
                  <span
                    aria-hidden
                    className="mr-0.5 text-quantum-dark dark:text-quantum"
                  >
                    &ldquo;
                  </span>
                  {t.quote}
                  <span
                    aria-hidden
                    className="ml-0.5 text-quantum-dark dark:text-quantum"
                  >
                    &rdquo;
                  </span>
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-quantum-soft text-sm font-bold text-quantum-dark dark:text-quantum"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.role}</p>
                    <p className="text-xs text-ink-muted">{t.org}</p>
                  </div>
                </div>
              </LiftCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8 · Final CTA */}
      <CtaBand
        title="Ready to see it in your clinic?"
        lead="The fastest way to know if Quantal fits your practice is to see it. Try the clinician demo, then book 30 minutes with our founders to talk through what your rollout would look like."
        actions={
          <>
            <Button asChild variant="accent" size="lg">
              <Link href="/demo/clinician">Try the clinician demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to founders</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
