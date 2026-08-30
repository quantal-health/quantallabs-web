import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Lock, Palette, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/hero";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { FeatureCard, LiftCard } from "@/components/marketing/feature-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built Quantal Health: a purpose-built care platform for weight-loss clinics treating GLP-1 patients.",
};

const DIFFERENTIATORS = [
  {
    icon: <Palette />,
    title: "White-label all the way down",
    body: "Your brand on the App Store. Your colors in the patient app. Your clinic's data in its own dedicated environment. Patients don't download “Quantal” — they download your clinic's app.",
  },
  {
    icon: <ClipboardCheck />,
    title: "Built for the GLP-1 workflow specifically",
    body: "Not a generic chronic-care platform with weight-loss bolted on. Every screen, every alert, every report is designed for the way GLP-1 clinics actually work — titration, side-effect monitoring, plateau response, the whole arc.",
  },
  {
    icon: <Lock />,
    title: "HIPAA-aligned by design, not bolted on",
    body: "Encryption, access controls, activity logs, signed agreements with every vendor that touches your data — engineered into the foundation, not layered on later. You get the trust signal without doing the engineering work.",
  },
  {
    icon: <Users />,
    title: "Founder-led — you talk to the people who built it",
    body: "You're not getting handed off to a regional account manager. When you have a question, you talk to a founder. When you need a feature, the engineer who builds it knows your name.",
  },
];

const FOUNDERS = [
  {
    title: "Founder & CTO",
    role: "Building Quantal full-time",
    body: "Software engineer with a background in healthcare infrastructure. Building Quantal Health as the founding engineer — designing the platform, writing the code, sitting with design partners to learn what their clinicians actually need.",
  },
  {
    title: "Co-founder",
    role: "Clinical advisor & product",
    body: "Clinician with direct experience in weight management and GLP-1 care. Shapes the clinical workflow inside the product, advises on safety guardrails, and ensures we are building for how clinicians actually practice — not how we imagine they do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        centered
        eyebrow={<Eyebrow>About</Eyebrow>}
        title="Why we built Quantal Health."
        lead="A small team building the care platform that GLP-1 clinics deserve — and that, frankly, didn't exist yet."
      />

      {/* Mission */}
      <Section>
        <div className="mx-auto max-w-[62ch]">
          <Reveal>
            <Eyebrow className="mb-4">The mission</Eyebrow>
            <h2 className="text-h2 font-bold sm:text-[2.125rem]">
              Better tools for the clinics doing the most important work in
              weight management today.
            </h2>
          </Reveal>
          <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
            <Reveal index={1}>
              <p>
                GLP-1 medications — Wegovy, Ozempic, Zepbound, Mounjaro,
                Saxenda — are{" "}
                <strong className="font-semibold text-ink">
                  fundamentally changing how weight management works
                </strong>
                . The clinical results are real. Demand has exploded.
                Specialized weight-loss clinics are scaling faster than any
                other corner of primary care.
              </p>
            </Reveal>
            <Reveal index={2}>
              <p>
                But the tooling has not kept up. Most clinics doing this work
                today are duct-taping their workflow together: a generic
                patient-tracking app downloaded from the App Store, a couple of
                shared spreadsheets, an email thread for side-effect questions,
                and a phone for the urgent stuff.{" "}
                <strong className="font-semibold text-ink">
                  None of it was built for what GLP-1 care actually looks like.
                </strong>
              </p>
            </Reveal>
            <Reveal index={3}>
              <p>
                We&apos;re building the alternative. A care platform
                purpose-built for clinics treating GLP-1 patients — designed
                around the rhythm of weekly weigh-ins, daily food logs,
                side-effect monitoring, and the messaging cadence between
                visits. White-labeled, so it ships as your clinic, not as ours.
                HIPAA-aligned by design, not bolted on.{" "}
                <strong className="font-semibold text-ink">
                  Now accepting design partners.
                </strong>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Differentiators */}
      <Section className="border-y border-line bg-paper-light">
        <SectionHeader
          centered
          eyebrow="What makes us different"
          title="Four things you'll find in Quantal that you won't find elsewhere."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} index={i} className="h-full">
              <FeatureCard icon={d.icon} title={d.title} className="h-full">
                {d.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="The team"
            title="A small team. By design."
            lead="We're early. We answer our own emails. You'll talk to founders."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.title} index={i} className="h-full">
                <LiftCard className="h-full p-8">
                  <div
                    aria-hidden
                    className="flex size-20 items-center justify-center rounded-full bg-quantum-soft text-2xl font-bold tracking-tight text-quantum-dark dark:text-quantum"
                  >
                    QH
                  </div>
                  <h3 className="mt-5 text-h3 font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-quantum-dark dark:text-quantum">
                    {f.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {f.body}
                  </p>
                </LiftCard>
              </Reveal>
            ))}
          </div>
          <Reveal index={2} className="mt-8">
            <div className="rounded-2xl bg-[#1B1A18] p-8 text-[#F4EFE2] shadow-card sm:p-10 dark:bg-[#252320]">
              <h3 className="text-h3 font-semibold">An honest note.</h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#B8B3A8]">
                We&apos;re a small team with a clear focus. We&apos;re not
                pretending to be enterprise-scale yet. What you get instead is
                fast turnaround, a direct line to the people building the
                product, and a platform shaped by the first clinics we work
                with — not by a roadmap committee.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Quantal Labs context */}
      <Section className="border-y border-line bg-paper-light">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-4">Part of Quantal Labs</Eyebrow>
            <h2 className="text-h2 font-bold sm:text-[2.125rem]">
              Quantal Health is part of Quantal Labs.
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-muted">
              Quantal Labs is a small studio building purpose-built
              infrastructure for healthcare verticals — categories where the
              existing tools were either built for a different era of medicine
              or were never built at all. Quantal Health is our focused entry
              into weight management. We picked this category because the
              clinical impact of GLP-1 medications is real, the clinics doing
              this work are growing fast, and the gap between what they need
              and what&apos;s available is wide.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Why now */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-4">Why now</Eyebrow>
            <h2 className="text-h2 font-bold sm:text-[2.125rem]">
              The window is open.
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-muted">
              This is a category-defining moment for weight management.{" "}
              <strong className="font-semibold text-ink">
                The medications work.
              </strong>{" "}
              Patients are seeking out specialized clinics in numbers that
              didn&apos;t exist three years ago. The clinics succeeding right
              now are the ones investing in patient experience and clinical
              workflow before they hit a wall — not after. We&apos;re building
              the platform that lets a four-clinician practice run like a much
              bigger one, without losing the personal relationship that makes
              patients choose them in the first place.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Want to talk?"
        lead="We're picking our first design partners now. If your clinic treats GLP-1 patients and you want a real say in shaping the product, we'd love to hear from you."
        actions={
          <>
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">Talk to founders</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">Try the demo first</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
