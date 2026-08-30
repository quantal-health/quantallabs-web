import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Hero } from "@/components/marketing/hero";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { DarkBand } from "@/components/marketing/dark-band";
import { LiftCard } from "@/components/marketing/feature-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Quantal Health",
};

/* ----------------------------------------------------------------------------
   Tier data — copy preserved from the original pricing.html tier cards.
---------------------------------------------------------------------------- */

type TierFeature = { text: string; note?: string };
type TierGroup = { header: string; items: TierFeature[] };
type Tier = {
  name: string;
  tagline: string;
  blurb: string;
  groups: TierGroup[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Lite",
    tagline: "For small practices getting started",
    blurb:
      "The essentials to move off spreadsheets and into a branded patient app, without changing how your team works.",
    groups: [
      {
        header: "Patient app (basic)",
        items: [
          { text: "Weight logging" },
          { text: "Notifications and reminders" },
          { text: "In-app messaging with your care team" },
        ],
      },
      {
        header: "Clinician dashboard (basic)",
        items: [
          { text: "Patient roster" },
          { text: "Per-patient view with weight history" },
        ],
      },
      {
        header: "Capacity & support",
        items: [
          {
            text: "Up to 50 patients",
            note: "(soft limit, contact sales for more)",
          },
          { text: "Email support, 24-hour response, business hours" },
          { text: "Standard onboarding (4-6 weeks)" },
        ],
      },
    ],
  },
  {
    name: "Standard",
    tagline: "For growing practices",
    blurb:
      "The full clinical workflow — wearables, food logging, symptom tracking, and the dashboard your team will actually use every day.",
    featured: true,
    groups: [
      {
        header: "Everything in Lite, plus:",
        items: [
          { text: "Manual food logging" },
          { text: "Wearables sync (Apple HealthKit + Google Health Connect)" },
          { text: "Symptom tracking" },
          { text: "Trends and insights for clinicians" },
          { text: "Two-way care messaging" },
        ],
      },
      {
        header: "Capacity & support",
        items: [
          {
            text: "Up to 250 patients",
            note: "(soft limit, contact sales for more)",
          },
          { text: "Email + Slack support" },
        ],
      },
    ],
  },
  {
    name: "Pro",
    tagline: "For larger practices",
    blurb:
      "Everything in Standard, plus AI-powered features and clinical safety tooling for high-volume programs.",
    groups: [
      {
        header: "Everything in Standard, plus:",
        items: [
          { text: "AI Food Vision — snap a meal, get the macros" },
          { text: "Red-flag pattern detection (clinical safety alerts)" },
          { text: "Higher patient capacity" },
        ],
      },
      {
        header: "Capacity & support",
        items: [
          { text: "Priority support" },
          { text: "Dedicated onboarding lead" },
          { text: "Custom branding flexibility" },
        ],
      },
    ],
  },
];

/* ----------------------------------------------------------------------------
   Universal commitments — the on-dark "included with every tier" grid.
---------------------------------------------------------------------------- */

const COMMITMENTS: { title: string; body: string }[] = [
  {
    title: "Your branded app",
    body: "In your own App Store and Play Store accounts. Your name, your logo, your colors.",
  },
  {
    title: "Your dedicated, HIPAA-compliant environment",
    body: "We don't pool patient data across clinics. Your data lives in its own environment.",
  },
  {
    title: "HIPAA-compliant data agreements",
    body: "Signed with us. Signed with every downstream vendor we work with.",
  },
  {
    title: "99.5% uptime target",
    body: "Tracked monthly. We publish status to you in your monthly summary.",
  },
  {
    title: "4-hour recovery time objective",
    body: "In the unlikely event of an outage, full recovery within four hours.",
  },
  {
    title: "Quantal Ops handles infrastructure",
    body: "You never see a server, a console, or an alert. We run it; you practice medicine.",
  },
  {
    title: "Annual disaster-recovery drill",
    body: "We test recovery against your environment every year and share the results.",
  },
  {
    title: "Activity logs for every patient-data read and write",
    body: "Queryable on request. The receipts exist if you ever need them.",
  },
];

/* ----------------------------------------------------------------------------
   FAQ — all 7 questions and full answers from the original page.
---------------------------------------------------------------------------- */

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "Can I switch tiers later?",
    a: [
      "Yes, anytime. Upgrades take effect immediately; downgrades take effect at your next annual renewal. There are no penalties or lock-ins for moving between tiers.",
    ],
  },
  {
    q: "What if I outgrow Pro?",
    a: [
      "Talk to us. We have an enterprise tier for larger groups, multi-location practices, and clinics with complex clinical workflows. Pricing is custom and the conversation is direct with our founders.",
    ],
  },
  {
    q: "Is there a free trial?",
    a: [
      "No traditional free trial — provisioning a dedicated environment and submitting a branded app to the stores is real work that takes weeks. But our design partner program offers reduced terms for qualified clinics willing to onboard with us during the first cohort. See the section below.",
    ],
  },
  {
    q: "How is this different from buying a phone app from a development shop?",
    a: [
      "Different in many ways. With a development shop, you typically pay a six-figure project fee, wait 9-12 months for a custom build, and then own a piece of software you also have to operate, secure, patch, host, and keep HIPAA-compliant — usually by hiring an engineering team or outsourcing to a managed services firm.",
      "With Quantal: you own the App Store listing, you own the data, you own the branding — and you keep all of it if you ever leave us. We handle operations, security, hosting, patches, compliance, and store submissions on your behalf, on a known annual fee. The economics and the timeline are not comparable.",
    ],
  },
  {
    q: "What if I want to leave?",
    a: [
      "We hand you everything: an export of your data, a transfer of your App Store and Play Store listings, and a transition of the cloud resources we operated for your environment. There's a 30-day grace period during which we keep your environment running so you can complete the transition without disruption to your patients.",
      "No data hostage situations. No surprise off-boarding fees. The exit is documented in the contract you sign.",
    ],
  },
  {
    q: "Do I need any technical staff to use Quantal?",
    a: [
      "No. The whole point is that you don't. We handle infrastructure, deployments, monitoring, and store submissions. Your clinical and front-office teams use the dashboard; that's it. If you have technical staff, they're welcome in the conversation, but they aren't required.",
    ],
  },
  {
    q: "Who actually owns the data?",
    a: [
      "You do. Patient data is collected under your clinic's name, lives in your dedicated environment, and is governed by your privacy notice. We process it on your behalf under a HIPAA-compliant data agreement. If you leave, the data leaves with you.",
    ],
  },
];

/* ----------------------------------------------------------------------------
   Local pieces
---------------------------------------------------------------------------- */

function FeatCheck() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-quantum-soft text-quantum-dark dark:text-quantum"
    >
      <Check className="size-3" strokeWidth={3.5} />
    </span>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl bg-surface p-7 transition-all duration-[180ms] ease-out hover:-translate-y-1 hover:shadow-float",
        tier.featured
          ? "border-2 border-quantum shadow-float"
          : "border border-line shadow-soft",
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-quantum bg-quantum-soft px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-quantum-dark dark:text-quantum">
          ★ Most popular
        </span>
      )}
      <h3 className="text-eyebrow font-bold uppercase text-quantum-dark dark:text-quantum">
        {tier.name}
      </h3>
      <p className="mt-2.5 text-2xl font-bold leading-tight tracking-tight">
        {tier.tagline}
      </p>
      <p className="mt-3 text-[0.9375rem] leading-normal text-ink-muted">
        {tier.blurb}
      </p>
      <div className="mt-6 border-y border-line py-3.5">
        <p className="text-base font-semibold">Contact sales for pricing</p>
        <p className="mt-1 text-[0.8125rem] text-ink-muted">
          One-time setup + annual platform fee
        </p>
      </div>
      <ul className="mt-2 flex-1">
        {tier.groups.map((group) => (
          <li key={group.header} className="pt-4 first:pt-3">
            <p className="pb-1 text-[0.9375rem] font-bold">{group.header}</p>
            <ul>
              {group.items.map((item) => (
                <li
                  key={item.text}
                  className="flex gap-3 py-2 text-[0.9375rem] leading-snug"
                >
                  <FeatCheck />
                  <span>
                    {item.text}
                    {item.note && (
                      <>
                        {" "}
                        <em className="text-sm font-medium not-italic text-ink-muted">
                          {item.note}
                        </em>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Button
        asChild
        variant={tier.featured ? "accent" : "outline"}
        size="lg"
        className="mt-7 w-full"
      >
        <Link href="/contact">Talk to sales</Link>
      </Button>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Page
---------------------------------------------------------------------------- */

export default function PricingPage() {
  return (
    <>
      <Hero
        centered
        eyebrow={<Eyebrow>Pricing</Eyebrow>}
        title="Pricing that scales with your practice."
        lead="Three tiers. Pick the one that fits your patient volume and clinical workflow. Move up or down anytime as your practice grows."
      />

      {/* Tier cards */}
      <Section className="pt-2 sm:pt-2">
        <h2 className="sr-only">Compare the three tiers</h2>
        <div className="grid items-stretch gap-6 pt-4 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal
              key={tier.name}
              index={i}
              className={cn(
                "h-full",
                tier.featured && "max-md:order-first md:-translate-y-2",
              )}
            >
              <TierCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Universal commitments */}
      <DarkBand>
        <SectionHeader
          centered
          onDark
          title="What's included with every tier."
          lead="The commitments below are universal — they don't change between Lite, Standard, and Pro. They're how we operate, not features we sell."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((c, i) => (
            <Reveal key={c.title} index={i} className="h-full">
              <div className="flex h-full gap-3.5 rounded-xl border border-[rgba(244,239,226,0.1)] bg-[rgba(244,239,226,0.04)] p-5">
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-quantum text-[#1B1A18]"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-bold leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#B8B3A8]">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </DarkBand>

      {/* Fee structure */}
      <Section className="bg-paper-light">
        <SectionHeader
          centered
          title="How fees work."
          lead="Two charges, no surprises. We don't believe in usage meters that punish you for growing your practice."
        />
        <div className="mx-auto mt-12 grid max-w-[980px] gap-6 md:grid-cols-2">
          <Reveal index={0} className="h-full">
            <LiftCard className="h-full p-8">
              <span className="inline-block rounded-full bg-quantum-soft px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-quantum-dark dark:text-quantum">
                One-time
              </span>
              <h3 className="mt-4 text-h3 font-bold sm:text-[1.375rem]">
                Setup fee
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                Covers your first 2-4 weeks of onboarding: your Apple Developer
                enrollment guidance, your dedicated environment provisioning,
                and your first app submission to the App Store and Play Store.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                This is paid once, at kickoff. There&apos;s no recurring
                component.
              </p>
            </LiftCard>
          </Reveal>
          <Reveal index={1} className="h-full">
            <LiftCard className="h-full p-8">
              <span className="inline-block rounded-full bg-quantum-soft px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-quantum-dark dark:text-quantum">
                Recurring
              </span>
              <h3 className="mt-4 text-h3 font-bold sm:text-[1.375rem]">
                Annual platform fee
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                Covers ongoing operations, releases (typically 6-8 per year),
                security patches, and the full lifecycle of your app and
                environment.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                All fees scale with patient volume — your sales contact will
                price based on your specifics, not a published rate card.
              </p>
            </LiftCard>
          </Reveal>
        </div>
        <Reveal>
          <p className="mx-auto mt-10 max-w-[720px] text-center text-[0.9375rem] italic text-ink-muted">
            No per-patient overage fees buried in fine print. If you outgrow
            your tier, you move tiers — that&apos;s the conversation.
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader
          centered
          title="Frequently asked questions"
          lead="The questions clinic owners ask before signing. If yours isn't here, just ask."
        />
        <Reveal className="mx-auto mt-10 max-w-[820px]">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-[1.0625rem]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pb-6 text-base leading-relaxed text-ink-muted">
                  {faq.a.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="max-w-[720px]">
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      {/* Design-partner callout — the one gradient on the site */}
      <Section className="py-10 sm:py-14">
        <Reveal>
          <div className="mx-auto max-w-[980px] rounded-[22px] bg-gradient-to-br from-quantum to-quantum-soft p-9 text-center text-[#1B1A18] shadow-card dark:to-[#FBE9C0] sm:p-14">
            <span className="inline-block rounded-full bg-[#1B1A18] px-3.5 py-2 text-eyebrow font-bold uppercase text-quantum">
              Limited cohort
            </span>
            <h2 className="mx-auto mt-6 max-w-xl text-h2 font-bold sm:text-[2.125rem]">
              Become a design partner.
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[1.0625rem] leading-relaxed">
              We&apos;re currently accepting design partners — practices
              willing to onboard with us during the first cohort. Discounted
              terms in exchange for monthly product calls and feedback that
              shapes the platform. If you&apos;ve ever wanted real input into
              the tools you use, this is that moment.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-[#1B1A18] text-[#F4EFE2] hover:bg-[#1B1A18]/85"
            >
              <Link href="/contact">Apply to be a design partner</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <CtaBand
        title="Ready to talk specifics?"
        lead="Pricing depends on your patient volume, tier, and onboarding scope. The fastest path to a real number is a 30-minute call with our founders."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">Talk to founders to discuss pricing</Link>
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
