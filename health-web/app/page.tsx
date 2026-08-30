import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Lock,
  MessageSquare,
  ScanLine,
  Smartphone,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero, HeroBadge } from "@/components/marketing/hero";
import { HomeHeroVisual } from "@/components/marketing/home-hero-visual";
import { Section, SectionHeader } from "@/components/marketing/section";
import { DarkBand } from "@/components/marketing/dark-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Quantal Health — The care platform GLP-1 clinics actually want",
};

const PILLARS = [
  {
    icon: <Smartphone />,
    title: "Your branded patient app",
    body: "Your logo, colors and name in the App Store — patients on Wegovy, Ozempic, Zepbound, Mounjaro or Saxenda log into your clinic, not ours.",
  },
  {
    icon: <LayoutDashboard />,
    title: "Your clinician dashboard",
    body: "Roster, weight trends, side-effects and messaging for your whole team — every patient in one view.",
  },
  {
    icon: <Lock />,
    title: "Your dedicated environment",
    body: "Isolated, HIPAA-aligned data infrastructure per clinic. Your patients' data never shares a database with anyone else's.",
  },
];

const TRUST_ITEMS = [
  "HIPAA-aligned",
  "Now accepting design partners",
  "Built for GLP-1 clinics",
  "Encryption at every layer",
  "Dedicated environment per clinic",
  "Signed HIPAA data agreements",
];

function LoggingPreview() {
  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xl font-medium">207.6 lb</span>
        <span className="text-xs font-semibold text-mv-green">▼ 1.3</span>
      </div>
      <svg viewBox="0 0 200 48" className="mt-2 w-full" aria-hidden>
        <polyline
          points="0,10 30,14 60,13 90,22 120,26 150,32 180,36 200,40"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-1 text-[11px] text-ink-muted">
        One-tap daily weight &amp; feeling log
      </p>
    </div>
  );
}

function VisionPreview() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-mv-green/10 text-mv-green">
          <ScanLine className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">Greek yogurt with granola</p>
          <p className="text-[11px] text-ink-muted">AI confidence: high</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["290", "kcal"],
          ["18g", "protein"],
          ["4g", "fiber"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-lg border border-line bg-surface py-2">
            <p className="font-mono text-sm font-medium">{v}</p>
            <p className="text-[10px] text-ink-muted">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagingPreview() {
  return (
    <div className="space-y-2 p-4">
      <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-surface px-3 py-2 text-[12px] shadow-soft">
        Nausea has fully settled this week 👍
      </div>
      <div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-mv-green px-3 py-2 text-[12px] text-white">
        Great news, Jane — let&apos;s plan the 1.0mg step at Friday&apos;s
        visit.
      </div>
      <p className="text-[11px] text-ink-muted">
        HIPAA-aligned two-way care messaging
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero
        badge={<HeroBadge>Now accepting design partners</HeroBadge>}
        title="The care platform GLP-1 clinics actually want."
        lead="A branded patient app + clinician dashboard, purpose-built for the weekly rhythm of GLP-1 care — with your brand on the App Store and your patients' data in a dedicated environment."
        actions={
          <>
            <Button asChild variant="accent" size="lg">
              <Link href="/demo">Try the demo →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to founders</Link>
            </Button>
          </>
        }
        visual={<HomeHeroVisual />}
      />

      <Section>
        <SectionHeader
          centered
          title="Your brand. Your team's tools. Your patients' data."
          lead="One platform that ships as your clinic — replacing the generic tracking apps and the spreadsheets."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} index={i}>
              <FeatureCard icon={p.icon} title={p.title} className="h-full">
                {p.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <DarkBand className="py-12 sm:py-12">
        <Marquee>
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-12 text-sm font-semibold tracking-wide"
            >
              {item}
              <span aria-hidden className="text-quantum">
                ·
              </span>
            </span>
          ))}
        </Marquee>
        <p className="mt-6 text-center text-sm text-[#B8B3A8]">
          Signed HIPAA data agreements, encryption at every layer, and a
          dedicated environment for every clinic.
        </p>
      </DarkBand>

      <Section>
        <SectionHeader
          centered
          title="What you'll see when you try it."
          lead="Three of the modules your patients and team will rely on daily."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Daily logging",
              body: "Weight and feeling in one tap — designed for week-after-week consistency.",
              preview: <LoggingPreview />,
            },
            {
              title: "AI Food Vision",
              body: "Snap a meal, get the macros. Identifying info stripped on device.",
              preview: <VisionPreview />,
            },
            {
              title: "Care messaging",
              body: "A direct, HIPAA-aligned line between patients and your team.",
              preview: <MessagingPreview />,
            },
          ].map((c, i) => (
            <Reveal key={c.title} index={i}>
              <FeatureCard
                title={c.title}
                preview={c.preview}
                className="h-full"
              >
                {c.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="See it in action."
        lead="Click through a working demo with example clinic Mountainview Medicine and example patient Jane Doe. No signup, no email."
        actions={
          <>
            <Button asChild variant="accent" size="lg">
              <Link href="/demo">Try the demo →</Link>
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
