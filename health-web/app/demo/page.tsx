import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, File, Globe, SquareCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { DarkBand } from "@/components/marketing/dark-band";
import { FeatureCard, LiftCard } from "@/components/marketing/feature-card";
import { BrowserFrame, PhoneFrame } from "@/components/marketing/device-mock";
import { StatusPill } from "@/components/demos/status-pill";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Try the demo",
  description:
    "Click through working demos of the Quantal patient app, clinician dashboard, and admin console. No signup, no email — just click.",
};

/* ----------------------------------------------------------------------------
   Mini previews — real markup at mini scale (decorative; tiles are labelled by
   their body copy). Hardcoded hex inside phone screens is intentional: the
   Mountainview patient app stays light tenant-branded in both themes.
---------------------------------------------------------------------------- */

function PatientPreview() {
  return (
    <PhoneFrame className="!max-w-[186px] rounded-[28px] border-4">
      <div className="px-3 pt-1">
        <p className="text-[11px] font-bold text-[#1B1A18]">Hello, Jane</p>
        <p className="text-[9px] text-[#6B6863]">Week 8 · Wegovy 0.5mg</p>
        <div className="mt-2 rounded-lg bg-mv-green px-2.5 py-2">
          <p className="text-[9px] font-semibold text-white">Daily check-in</p>
          <p className="text-[8px] text-white/90">~60 seconds</p>
        </div>
        <div className="mt-2 rounded-lg border border-[#E8E2D2] bg-white p-2.5">
          <p className="text-[8px] font-semibold uppercase tracking-wide text-[#6B6863]">
            Today&apos;s weight
          </p>
          <p className="font-mono text-[15px] font-medium text-[#1B1A18]">
            207.6 <span className="text-[9px]">lb</span>
          </p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[8px] font-semibold text-[#15803D]">
          <span className="rounded-md bg-[#DCFCE7] py-1.5">📷 Snap a meal</span>
          <span className="rounded-md bg-[#DCFCE7] py-1.5">⚖️ Log weight</span>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-around border-t border-[#E8E2D2] bg-[#FAF7EE] px-6 py-2.5">
        <span className="size-1.5 rounded-full bg-mv-green" />
        <span className="size-1.5 rounded-full bg-[#C9C4BC]" />
        <span className="size-1.5 rounded-full bg-[#C9C4BC]" />
        <span className="size-1.5 rounded-full bg-[#C9C4BC]" />
      </div>
    </PhoneFrame>
  );
}

const ROSTER = [
  {
    initials: "JD",
    avatar: "bg-mv-green",
    name: "Jane Doe",
    drug: "Wegovy",
    status: "Titrating",
    tone: "success",
  },
  {
    initials: "MO",
    avatar: "bg-danger",
    name: "Marcus Okafor",
    drug: "Ozempic",
    status: "Stable",
    tone: "success",
  },
  {
    initials: "PA",
    avatar: "bg-mv-cyan",
    name: "Priya Iyer-Anand",
    drug: "Zepbound",
    status: "Review",
    tone: "warning",
  },
  {
    initials: "RP",
    avatar: "bg-warning",
    name: "Rosa Padilla",
    drug: "Wegovy",
    status: "Stable",
    tone: "success",
  },
] as const;

function ClinicianPreview() {
  return (
    <BrowserFrame url="mountainview-medicine.quantal.health" className="w-full">
      <div className="flex items-center justify-between bg-mv-green px-3 py-2">
        <span className="text-[11px] font-bold text-white">
          Mountainview Medicine
        </span>
        <span className="size-4 rounded-full bg-white/30" />
      </div>
      <div className="space-y-1.5 p-2.5">
        {ROSTER.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2 py-1.5"
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white ${r.avatar}`}
            >
              {r.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold leading-tight">
                {r.name}
              </p>
              <p className="truncate text-[9px] leading-tight text-ink-muted">
                {r.drug}
              </p>
            </div>
            <StatusPill tone={r.tone} className="px-1.5 py-0 text-[9px]">
              {r.status}
            </StatusPill>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

const ADMIN_NAV = ["Tier & Modules", "Branding", "Users"] as const;

function AdminPreview() {
  return (
    <BrowserFrame
      url="mountainview-medicine.quantal.health/admin"
      className="w-full"
    >
      <div className="flex">
        <div className="w-[86px] shrink-0 space-y-1 border-r border-line bg-paper-light p-1.5">
          {ADMIN_NAV.map((item) => (
            <span
              key={item}
              className={`block truncate rounded-md px-1.5 py-1 text-[8px] font-semibold ${
                item === "Branding"
                  ? "bg-mv-green/10 text-mv-green"
                  : "text-ink-muted"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-1 gap-2.5 p-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold leading-tight">Branding</p>
            <p className="text-[8px] text-ink-muted">Live preview</p>
            <div className="mt-1.5 rounded-md border border-line bg-surface p-1.5">
              <p className="text-[7px] font-semibold uppercase tracking-wide text-ink-soft">
                Primary
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="size-3.5 rounded bg-mv-green" />
                <span className="font-mono text-[8px]">#16a34a</span>
              </div>
            </div>
            <div className="mt-1.5 rounded-md border border-line bg-surface p-1.5">
              <p className="text-[7px] font-semibold uppercase tracking-wide text-ink-soft">
                Accent
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="size-3.5 rounded bg-mv-cyan" />
                <span className="font-mono text-[8px]">#0891b2</span>
              </div>
            </div>
          </div>
          <div className="w-[62px] shrink-0 self-start overflow-hidden rounded-lg border-2 border-[#1F2937] bg-white">
            <p className="bg-mv-green py-1 text-center text-[6px] font-bold text-white">
              Mountainview
            </p>
            <div className="m-1 rounded bg-[#FAF7EE] p-1">
              <p className="text-[5px] font-semibold uppercase text-[#6B6863]">
                Today
              </p>
              <p className="font-mono text-[8px] font-bold text-[#1B1A18]">
                207.6 lb
              </p>
            </div>
            <p className="mx-1 mb-1 rounded bg-[#DCFCE7] py-1 text-center text-[5px] font-semibold text-[#15803D]">
              Snap meal
            </p>
            <p className="mx-1 mb-1 rounded bg-[#DCFCE7] py-1 text-center text-[5px] font-semibold text-[#15803D]">
              Log weight
            </p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ----------------------------------------------------------------------------
   Persona tile — full-card link; preview scales slightly and the CTA arrow
   nudges right on hover (CSS transforms, reduced-motion safe).
---------------------------------------------------------------------------- */

function PersonaTile({
  href,
  eyebrow,
  title,
  description,
  preview,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  preview: React.ReactNode;
}) {
  return (
    <Link href={href} className="group block h-full rounded-2xl">
      <LiftCard className="flex h-full flex-col overflow-hidden p-0">
        <div
          aria-hidden
          className="flex min-h-[248px] items-center justify-center border-b border-line bg-gradient-to-br from-paper-light to-paper px-6 py-8"
        >
          <div className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
            {preview}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-eyebrow font-bold uppercase text-ink-muted">
            {eyebrow}
          </p>
          <h3 className="mt-2.5 text-h3 font-semibold">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
            {description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-quantum-dark dark:group-hover:text-quantum">
            Open demo
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </span>
        </div>
      </LiftCard>
    </Link>
  );
}

const TILES = [
  {
    href: "/demo/patient",
    eyebrow: "Patient app",
    title: "What your patients will see",
    description: "Log a meal, log a weight, message your team. Click around.",
    preview: <PatientPreview />,
  },
  {
    href: "/demo/clinician",
    eyebrow: "Clinician dashboard",
    title: "What your team will see",
    description: "Patient roster, weight trends, message inbox. Click around.",
    preview: <ClinicianPreview />,
  },
  {
    href: "/demo/admin",
    eyebrow: "Admin console",
    title: "What your practice administrator will see",
    description: "Configure tiers, branding, user roles. Click around.",
    preview: <AdminPreview />,
  },
];

const INFO_CARDS = [
  {
    icon: <SquareCheckBig />,
    title: "Real workflows",
    body: (
      <>
        Every screen you see is what your patients and team will actually use.
        We didn&apos;t build a special demo version — these are the real
        interfaces, with working forms, filters, charts, and message threads.
      </>
    ),
  },
  {
    icon: <File />,
    title: "Sample data",
    body: (
      <>
        We use a fictional clinic called <strong>Mountainview Medicine</strong>{" "}
        and a fictional patient <strong>Jane Doe</strong> for the demos. Your
        real data never goes here. Nothing you type or click is saved.
      </>
    ),
  },
  {
    icon: <Globe />,
    title: "Branded for our demo clinic",
    body: (
      <>
        The patient app and dashboards in the demo are styled in Mountainview
        Medicine&apos;s green. Your branding will look different — your colors,
        your logo, your name on the App Store.
      </>
    ),
  },
];

export default function DemoHubPage() {
  return (
    <>
      <Hero
        centered
        eyebrow={
          <span className="inline-block rounded-full bg-quantum-soft px-3 py-1.5 text-eyebrow font-bold uppercase text-quantum-dark dark:text-quantum">
            Try it right now
          </span>
        }
        title="Try Quantal Health right now."
        lead="No signup. No email. Just click through."
      />

      <Section className="pt-0 sm:pt-0">
        <h2 className="sr-only">Pick a demo</h2>
        <div className="grid gap-7 min-[900px]:grid-cols-3">
          {TILES.map((tile, i) => (
            <Reveal key={tile.href} index={i} className="h-full">
              <PersonaTile {...tile} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-y border-line bg-paper-light">
        <SectionHeader
          centered
          title="What's in the demos."
          lead="Everything you click is real. The data is fictional, the workflows are not."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {INFO_CARDS.map((card, i) => (
            <Reveal key={card.title} index={i} className="h-full">
              <FeatureCard icon={card.icon} title={card.title} className="h-full">
                {card.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <DarkBand>
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-2xl text-h2 font-bold sm:text-[2.125rem]">
            Like what you see?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-[#B8B3A8]">
            Talk to founders. We&apos;re onboarding our first design partners
            now.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">Talk to founders</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[rgba(244,239,226,0.3)] text-[#F4EFE2] hover:bg-[rgba(244,239,226,0.08)]"
            >
              <Link href="/for-clinics">For clinics</Link>
            </Button>
          </div>
        </Reveal>
      </DarkBand>
    </>
  );
}
