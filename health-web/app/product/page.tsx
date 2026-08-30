import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/hero";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { DarkBand } from "@/components/marketing/dark-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import {
  BrandingPreview,
  CarePlanPreview,
  CheckInPreview,
  FoodVisionPreview,
  ManualLogPreview,
  MessagingPreview,
  ModulesPreview,
  SideEffectsPreview,
  TicketsPreview,
  TrendsPreview,
  UsersPreview,
  WearablesPreview,
} from "./previews";
import {
  CareQueuePreview,
  DarkFeatureCard,
  InboxPreview,
  PatientDetailPreview,
  RosterPreview,
} from "./clinician-previews";
import { WhiteLabelVisual } from "./white-label-visual";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Everything your patients need to stay on track. Everything your clinicians need to follow along. The Quantal Health product overview.",
};

const PATIENT_FEATURES = [
  {
    title: "Daily check-in",
    body: "Patients log their weight and how they're feeling in one tap each morning. No scrolling, no menu diving — adherence stays high because the friction stays low. The data lands in your clinician dashboard the same morning, so anyone falling off shows up immediately rather than weeks later at their next visit.",
    preview: <CheckInPreview />,
    wide: true,
  },
  {
    title: "AI Food Vision",
    body: "Snap a photo of any meal and the app estimates calories, protein, carbs, and fat in seconds. Built so patients log every meal — not just the easy ones. Patients can confirm or correct the estimate before saving, which keeps the data honest and trains the model on the foods your specific patient population actually eats.",
    preview: <FoodVisionPreview />,
    wide: true,
  },
  {
    title: "Manual food logging",
    body: "For prepackaged foods, recipes, or anything the camera can't capture cleanly — a fast searchable food database backs up the AI. Common items are one tap; barcode scanning handles the rest. Patients always have a path to log a meal, even if the camera picks the wrong dish.",
    preview: <ManualLogPreview />,
    wide: false,
  },
  {
    title: "Wearables sync",
    body: "Apple Watch, Apple Health, and Android health platforms feed steps, activity, and heart rate into the app — no manual entry needed for the data patients are already collecting. Activity trends sit alongside weight and food in the clinician view, so your team can see the full picture without asking patients to copy numbers between apps.",
    preview: <WearablesPreview />,
    wide: false,
  },
  {
    title: "Side-effect tracking",
    body: "Patients flag side effects with severity in seconds. Your team sees the pattern early and can intervene before someone considers stopping their medication. The most common GLP-1 side effects are pre-listed, so logging is one tap rather than a freeform note.",
    preview: <SideEffectsPreview />,
    wide: true,
  },
  {
    title: "Two-way messaging",
    body: "HIPAA-aligned messaging between patients and your care team — replacing personal cell numbers, generic patient portals, and email back-and-forth that nobody loves. Every conversation is captured in the patient's record, searchable later, and routed to the right clinician without anyone juggling a personal device.",
    preview: <MessagingPreview />,
    wide: true,
  },
  {
    title: "Progress trends and insights",
    body: "Patients see their weight curve, weekly averages, and milestones in an honest, non-shaming way. Designed to keep motivation high without overpromising results, and to give your team a shared view of progress when they meet for the next visit.",
    preview: <TrendsPreview />,
    wide: false,
  },
  {
    title: "Their care plan, in plain language",
    body: "Patients see where they are in their plan — current dose, what's coming next, and what their care team is watching for. No more confusion between visits, no more phone calls asking “wait, am I supposed to bump up next week or the week after?”",
    preview: <CarePlanPreview />,
    wide: false,
  },
];

const CLINICIAN_FEATURES = [
  {
    title: "Patient roster with status at a glance",
    body: "Sort by who needs attention today. Filter by medication, by week of titration, by assigned clinician. The patients who need follow-up surface to the top automatically — based on their recent check-ins, side-effect reports, and unread messages.",
    preview: <RosterPreview />,
  },
  {
    title: "Per-patient detail view",
    body: "Weight trends, food logs, side effects, message history, and clinician notes — all on one page. Click into a patient and you have everything you need to make a call, write a reply, or update a plan, without rummaging through three other systems.",
    preview: <PatientDetailPreview />,
  },
  {
    title: "Message inbox across all patients",
    body: "Every patient message in one queue. Triage by urgency, route to the right clinician, and clear the inbox without juggling tabs. Templates for common replies, so your team doesn't retype the same answer about meal timing fourteen times a day.",
    preview: <InboxPreview />,
  },
  {
    title: "Daily care queue",
    body: "A prioritized list of who to see today: urgent follow-ups first, then scheduled check-ins, then routine messages. Designed to make a clinician's morning a one-screen operation, so the day starts with a clear plan rather than thirty minutes of triage.",
    preview: <CareQueuePreview />,
  },
];

const ADMIN_FEATURES = [
  {
    title: "Plan and module configuration",
    body: "Turn modules on or off based on your plan and your workflow. Your admin controls what your clinicians and patients see, so you can roll out new capabilities to a small pilot group before opening them up to your full patient population.",
    preview: <ModulesPreview />,
  },
  {
    title: "Branding configuration",
    body: "Upload your logo, set your primary color, name your app. Changes propagate to the patient app and the dashboard immediately, ready for a new App Store push. No engineering ticket, no waiting on a release window — your brand is something your team controls.",
    preview: <BrandingPreview />,
  },
  {
    title: "Support ticket inbox",
    body: "One place for your admin team to handle clinician requests, patient escalations, and our team's responses — without bouncing through email. Every ticket carries the context of which patient or clinician it touches, so your admins can act without a thirty-minute archeology dig.",
    preview: <TicketsPreview />,
  },
  {
    title: "User management",
    body: "Add or remove clinicians and admins. Set roles. Run quarterly access reviews. The activity trail is captured automatically, so when a compliance review asks who had access to what and when, you have the answer in one click instead of an afternoon of spreadsheet work.",
    preview: <UsersPreview />,
  },
];

const COMMITMENTS = [
  "Your branded app published in your own App Store and Google Play developer accounts.",
  "Your patients see your name, your logo, and your colors on every screen — never ours.",
  "Your patient data lives in its own dedicated environment — never co-mingled with another clinic.",
  "Four to six weeks to your first cohort of patients. Faster on every cohort after that.",
];

const DAY_IN_LIFE = [
  "A patient opens your branded app in the morning, taps in their weight, snaps a photo of breakfast, and sees a quick note from their care team. The whole interaction takes under two minutes. Behind the scenes, that data lands in the clinician dashboard the same morning — sitting alongside the patient's eight-week trend, their last side-effect report, and the messages from earlier in the week.",
  "A clinician opens the dashboard at the start of clinic. The daily care queue is already organized: who needs urgent follow-up, who has a scheduled check-in, who sent a routine message that can be batched. They reply, update plans, and clear the queue without bouncing between tabs. The activity is captured automatically, so when the practice does its quarterly review, the audit trail writes itself.",
  "An admin opens the console once a week to handle the configuration work — adding a new clinician to the team, turning on a new module for a pilot group, reviewing support tickets. Branding changes propagate to the patient app and the dashboard the moment the admin saves them, ready for the next App Store push. The platform is built so the right people can change the right things — without anyone needing to file an engineering ticket to update a logo.",
];

export default function ProductPage() {
  return (
    <>
      <Hero
        centered
        eyebrow={<Eyebrow>Product overview</Eyebrow>}
        title="Everything your patients need to stay on track. Everything your clinicians need to follow along."
        lead="Quantal Health is a paired patient app and clinician dashboard, white-labeled for your clinic and built specifically for the rhythm of GLP-1 care. Here's what's inside the box, organized the way your team will actually use it: the patient experience, the clinician dashboard, the admin console, and the white-label commitment that ties them together."
      />

      {/* ------------------------------ Patient app ----------------------- */}
      <Section id="patient-app">
        <SectionHeader
          eyebrow="For patients"
          title="The patient app — your brand on every screen."
          lead="Designed around the rhythm of a GLP-1 program: weekly weigh-ins, daily food logs, side-effect check-ins, and a direct line to your care team. Every screen is white-labeled, so patients see your clinic name on the App Store, your logo on the home screen, and your colors throughout. The app does the heavy lifting; your brand gets the credit."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PATIENT_FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              index={i % 4}
              className={cn(f.wide && "sm:col-span-2")}
            >
              <FeatureCard
                title={f.title}
                preview={f.preview}
                className="h-full"
              >
                {f.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------- Clinician dashboard ------------------- */}
      <DarkBand id="clinician-dashboard">
        <SectionHeader
          onDark
          eyebrow="For your clinical team"
          title="The clinician dashboard — every patient, in one view."
          lead="Built for clinicians who actually work with GLP-1 patients all day. Triage, message, and follow up without leaving the app — and without bouncing between three browser tabs and a paper sticky-note system to keep track of who needs a call back."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CLINICIAN_FEATURES.map((f, i) => (
            <Reveal key={f.title} index={i % 2}>
              <DarkFeatureCard title={f.title} preview={f.preview}>
                {f.body}
              </DarkFeatureCard>
            </Reveal>
          ))}
        </div>
      </DarkBand>

      {/* ----------------------------- Admin console ---------------------- */}
      <Section id="admin-console">
        <SectionHeader
          eyebrow="For practice admins"
          title="The admin console — settings that belong to you."
          lead="The configuration layer for your clinic. What's enabled, what's branded, who has access. The console is designed so a practice administrator — not an engineer — can run it day to day, with the changes taking effect across the patient app and the clinician dashboard immediately."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {ADMIN_FEATURES.map((f, i) => (
            <Reveal key={f.title} index={i % 2}>
              <FeatureCard
                title={f.title}
                preview={f.preview}
                className="h-full"
              >
                {f.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------ White-label commitment ------------------ */}
      <Section id="white-label" className="border-y border-line bg-paper-light">
        <SectionHeader
          centered
          eyebrow="The white-label commitment"
          title="Onboarding in weeks, not quarters."
          lead="The first cohort of patients on Mountainview Medicine's branded app went live in under six weeks. Once your branding, your developer accounts, and your team are set up, every cohort after that is faster — because the heavy lifting only happens once."
        />
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl font-bold">
              It&apos;s your product, end to end.
            </h3>
            <p className="mt-4 text-lead text-ink-muted">
              We build the platform. You ship it as your own. Your patients
              download an app from your developer account, see your name in the
              App Store search results, and never see ours.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {COMMITMENTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 py-3.5 text-[1.0625rem] text-ink-muted"
                >
                  <Check
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-quantum-dark dark:text-quantum"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal index={1}>
            <WhiteLabelVisual />
          </Reveal>
        </div>
      </Section>

      {/* -------------------------- How it fits together ------------------ */}
      <Section id="how-it-fits">
        <SectionHeader
          centered
          eyebrow="How it fits together"
          title="One platform. Three audiences. Designed to feel native to each."
        />
        <div className="mx-auto mt-10 max-w-[780px] space-y-6">
          {DAY_IN_LIFE.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} index={i}>
              <p className="text-[1.0625rem] leading-[1.7] text-ink-muted">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------- CTA ----------------------------- */}
      <CtaBand
        title="See it the way your patients and clinicians will."
        lead="Try the demos right now — interactive, no signup, no email required."
        actions={
          <>
            <Button asChild variant="accent" size="lg">
              <Link href="/demo/patient">Try the patient demo</Link>
            </Button>
            <Button asChild variant="default" size="lg">
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
