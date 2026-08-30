import type { Metadata } from "next";
import { Check, ClipboardCheck, FileText, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/hero";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { DarkBand } from "@/components/marketing/dark-band";
import { FeatureCard, StatCard } from "@/components/marketing/feature-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IsolationDiagram } from "./isolation-diagram";

export const metadata: Metadata = {
  title: "Security & HIPAA — Quantal Health",
  description:
    "How Quantal Health protects your patients' data. HIPAA from day one — built in, not bolted on.",
};

const SECURITY_EMAIL = "security@quantal.health";

const PILLARS = [
  {
    icon: <Shield />,
    title: "Your data lives in your own environment",
    body: "Each clinic gets its own dedicated, isolated infrastructure. Your patients' records don't sit in a shared database next to anyone else's.",
  },
  {
    icon: <Lock />,
    title: "Encrypted everywhere",
    body: "Patient data is encrypted at rest using your clinic's own dedicated encryption keys, and encrypted in transit using TLS — every connection, every time.",
  },
  {
    icon: <ClipboardCheck />,
    title: "Activity logged for every access",
    body: "Every time a patient record is opened — by your team or ours — it's recorded. You can see who accessed what, when, and why.",
  },
  {
    icon: <FileText />,
    title: "HIPAA-compliant agreements with every vendor",
    body: "We don't work with infrastructure or AI vendors who can't sign HIPAA-compliant data agreements. You sign one with us; we maintain the rest of the chain.",
  },
];

const DAY_ONE_CHECKLIST = [
  {
    lead: "Patient data stays out of places it doesn't belong.",
    body: "We don't store patient information in browser logs, error reports, push notification text, SMS messages, web addresses, or analytics events. Even our own developers don't see patient names or weights when they're debugging the system.",
  },
  {
    lead: "Clinical AI requests route through our backend.",
    body: "When a patient takes a photo of their injection site, that photo never goes directly from the patient's phone to an AI provider. It flows through our servers, where we strip identifying information before any AI ever sees it.",
  },
  {
    lead: "HIPAA agreements with every link in the chain.",
    body: "Our cloud infrastructure provider, our monitoring tools, our AI providers — every vendor that could conceivably touch your patient data has signed a HIPAA-compliant data agreement with us.",
  },
  {
    lead: "One agreement covers everything.",
    body: "Your clinic signs one HIPAA-compliant data agreement with us. We handle every downstream agreement so you don't have to chase paperwork from our vendors.",
  },
];

const RISKS = [
  {
    risk: "A patient's phone is lost or stolen",
    response:
      "All patient data lives in the cloud, not on the device. A stolen phone means no patient data exposed — there's nothing on the phone to steal.",
  },
  {
    risk: "Inappropriate access by someone on your team",
    response:
      "Every patient record access is logged. You can audit who on your team looked at which patient and when. If a clinician views a patient outside their care panel, you can find it.",
  },
  {
    risk: "A cloud misconfiguration exposes data",
    response:
      "Each clinic has its own encrypted environment. A misconfiguration in one clinic's setup cannot expose another clinic's data. The blast radius of any single mistake is contained to that one clinic.",
  },
  {
    risk: "A vendor without a HIPAA agreement gets involved",
    response:
      "We never use a vendor that hasn't signed a HIPAA-compliant data agreement with us. Your agreement with us covers our entire vendor chain — no surprise gaps.",
  },
  {
    risk: "A breach happens and notification is late",
    response:
      "We have a documented process to notify you within the legally required window. We've drafted the notification templates in advance so the clock doesn't start before we're ready to act.",
  },
  {
    risk: "Patient data shows up somewhere it shouldn't",
    response:
      "Our entire platform is engineered to never put patient data in places it doesn't belong — not in logs, not in URLs, not in notifications, not in analytics. We test for this continuously.",
  },
];

const HONESTY_PARAGRAPHS = [
  "We want to be honest about this, because plenty of vendors are not.",
  "Our team has administrative access to operate the platform. That's necessary because we run it for you — when something breaks at 3 a.m., a Quantal engineer needs the ability to investigate. Pretending otherwise would be misleading.",
  "What we don't do is read your patient data unless you ask us to. We don't browse charts. We don't run analytics across your patient population. The only times anyone on our team would look at a specific patient's record are: you've asked us to investigate something, you've reported a bug we need to reproduce, or there's an active security incident we're responding to.",
  "And when any of that happens, every access is logged in your activity log. You can see exactly when one of us touched a patient record, who it was, and why. There are no hidden hatches.",
];

export default function SecurityPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Hero
        centered
        eyebrow={<Eyebrow>Security &amp; HIPAA</Eyebrow>}
        title="Your patients' data, protected by design."
        lead="We built Quantal Health for HIPAA from day one — not bolted it on later."
      />

      {/* 2 — Trust pillars */}
      <Section className="pt-0 sm:pt-0">
        <h2 className="sr-only">How we protect your patients&apos; data</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} index={i}>
              <FeatureCard icon={p.icon} title={p.title} className="h-full">
                {p.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Dedicated environment explainer */}
      <Section>
        <SectionHeader
          title="What “your data lives in your own environment” actually means."
          lead="Most software-as-a-service products mix every customer's data into one big shared database, and rely on software rules to keep them apart. We don't do that."
        />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Reveal>
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
              <p>
                When your clinic signs up with Quantal Health, we set you up
                with your own dedicated cloud environment — your own database,
                your own application servers, your own encryption keys. Your
                patients&apos; records live in infrastructure that nobody
                else&apos;s clinic touches.
              </p>
              <p>
                When a patient at Mountainview Medicine logs their weight, that
                data goes to Mountainview&apos;s own dedicated database. It
                never sits next to data from any other clinic. There&apos;s no
                shared table where a software bug could accidentally show one
                clinic&apos;s patient to another clinic&apos;s clinician —
                because the other clinic&apos;s data isn&apos;t even in the
                same place.
              </p>
              <p className="border-l-[3px] border-quantum pl-5 text-lg font-medium text-ink italic sm:text-xl sm:leading-relaxed">
                If your clinic ever leaves us, we hand you the keys to your
                environment, including a final snapshot of all your data. No
                lock-in, no awkward export.
              </p>
            </div>
          </Reveal>
          <IsolationDiagram />
        </div>
      </Section>

      {/* 4 — HIPAA from day one */}
      <Section className="border-y border-line bg-paper-light">
        <SectionHeader
          title="What we mean by “HIPAA from day one.”"
          lead="HIPAA isn't a checkbox we ticked at the end. It shaped how we wrote the code. A few specifics:"
        />
        <ul className="mt-12 grid gap-4">
          {DAY_ONE_CHECKLIST.map((item, i) => (
            <li key={item.lead}>
              <Reveal index={i}>
                <div className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                    <Check aria-hidden className="size-3.5" />
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed">
                    <strong className="font-semibold">{item.lead}</strong>{" "}
                    {item.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5 — Risk table */}
      <Section>
        <SectionHeader
          title="How we protect against common HIPAA risks."
          lead="A clinic's compliance officer will recognize this list. Here's how we've designed the system to handle each one."
        />
        <Reveal className="mt-12">
          {/* Desktop: two-column table */}
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-soft sm:block">
            <Table>
              <TableHeader>
                <TableRow className="border-line-strong bg-paper-light hover:bg-paper-light">
                  <TableHead className="h-auto px-5 py-4 text-xs font-semibold tracking-wider text-ink-muted uppercase">
                    The risk
                  </TableHead>
                  <TableHead className="h-auto px-5 py-4 text-xs font-semibold tracking-wider text-ink-muted uppercase">
                    How Quantal handles it
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RISKS.map((r) => (
                  <TableRow key={r.risk} className="border-line">
                    <TableCell className="w-[38%] px-5 py-4 align-top font-semibold whitespace-normal">
                      {r.risk}
                    </TableCell>
                    <TableCell className="px-5 py-4 align-top leading-relaxed whitespace-normal text-ink-muted">
                      {r.response}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Mobile: stacked label/value cards */}
          <div className="space-y-4 sm:hidden">
            {RISKS.map((r) => (
              <div
                key={r.risk}
                className="rounded-xl border border-line bg-surface p-5 shadow-soft"
              >
                <p className="text-xs font-semibold tracking-wider text-ink-soft uppercase">
                  The risk
                </p>
                <p className="mt-1 font-semibold">{r.risk}</p>
                <p className="mt-4 text-xs font-semibold tracking-wider text-ink-soft uppercase">
                  How Quantal handles it
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {r.response}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 6 — Recovery commitments */}
      <Section className="border-y border-line bg-paper-light">
        <SectionHeader
          title="If something goes wrong."
          lead="No system runs forever without an incident. We've designed our recovery process so that, when one happens, you'd notice as little disruption as possible."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Reveal index={0}>
            <StatCard
              className="h-full"
              label="Back online quickly"
              value={<CountUp to={4} suffix=" hours" />}
              delta="If your environment goes down, we restore it within 4 hours. We test this commitment annually so it's not just a promise on paper."
            />
          </Reveal>
          <Reveal index={1}>
            <StatCard
              className="h-full"
              label="Minimal data loss"
              value={<CountUp to={1} suffix=" hour" />}
              delta="Your data is backed up continuously. In a worst-case incident, you wouldn't lose more than 1 hour of patient data."
            />
          </Reveal>
          <Reveal index={2}>
            <StatCard
              className="h-full"
              label="Full backups, every day"
              value="Daily"
              delta="A complete snapshot of your environment is taken every day and stored separately, encrypted, and tested for restore-ability."
            />
          </Reveal>
        </div>
      </Section>

      {/* 7 — Honesty block */}
      <Section>
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface p-7 shadow-card sm:p-12">
            <h2 className="text-h2 font-bold sm:text-[2.125rem]">
              Who at Quantal can access your data.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed">
              {HONESTY_PARAGRAPHS.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-ink-muted">
              <strong className="font-semibold">What&apos;s next:</strong>{" "}
              we&apos;re working on giving customers cryptographic guarantees
              that even our team cannot access patient data without your
              explicit, per-incident consent. That&apos;s on the roadmap;
              it&apos;s not shipped yet. We&apos;d rather tell you what
              we&apos;re building than claim we already offer it.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 8 — Compliance-team callout */}
      <DarkBand>
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-h2 font-bold sm:text-[2.125rem]">
              For your compliance team.
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#B8B3A8]">
              If your security or compliance reviewer needs deeper detail —
              specific regulatory section citations, our subprocessor list with
              HIPAA agreement dates, breach-notification service-level
              commitments, or our recovery time and recovery point objectives —
              we have a security questionnaire we can share under NDA.
            </p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#B8B3A8]">
              Email us and we&apos;ll send it over within one business day.
            </p>
            <div className="mt-8">
              <Button asChild variant="accent" size="lg">
                <a href={`mailto:${SECURITY_EMAIL}`}>
                  Email {SECURITY_EMAIL}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </DarkBand>

      {/* 9 — Bottom CTA */}
      <CtaBand
        title="Have a security question we didn't answer?"
        lead="Get straight answers from our security team — no marketing fluff."
        actions={
          <Button asChild variant="accent" size="lg">
            <a href={`mailto:${SECURITY_EMAIL}`}>Talk to security at Quantal</a>
          </Button>
        }
      />
    </>
  );
}
