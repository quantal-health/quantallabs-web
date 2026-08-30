import type { Metadata } from "next";
import { MessageSquare, Newspaper, Shield, Star } from "lucide-react";
import { Hero } from "@/components/marketing/hero";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to founders. We're a small team — you'll talk to people who built it.",
};

const CONTACT_PATHS = [
  {
    icon: <MessageSquare />,
    title: "Talk to a founder",
    email: "founders@quantal.health",
    body: "General questions about the product, the company, or whether we're a fit for your clinic. This one goes straight to the founders' inbox — no triage, no gatekeeping.",
  },
  {
    icon: <Star />,
    title: "Apply as a design partner",
    email: "partners@quantal.health",
    body: "We're accepting design partners now. If your clinic treats GLP-1 patients and wants to help shape the product in exchange for white-glove onboarding, tell us a bit about your practice.",
  },
  {
    icon: <Shield />,
    title: "Security and compliance",
    email: "security@quantal.health",
    body: "HIPAA reviews, security questionnaires, vendor risk assessments — anything your security or compliance team needs from us. We aim to turn questionnaires around in one business day.",
  },
  {
    icon: <Newspaper />,
    title: "Press and media",
    email: "press@quantal.health",
    body: "We're not aggressively pursuing press, but we're happy to talk to journalists working on stories about GLP-1 care, weight-loss clinics, or healthcare software. We can usually return your call the same day.",
  },
];

const EXPECTATIONS = [
  "We respond within 1 business day — usually the same day.",
  "If a call makes sense, we'll set one up within the week.",
  "We don't send marketing email. Your contact details are not shared with anyone outside our team or sold to anyone, ever.",
  "If you'd rather not put your message in a form, every email above goes to a real person.",
];

function InfoHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.06em] text-quantum-dark dark:text-quantum">
      {children}
    </h2>
  );
}

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow={<Eyebrow>Contact</Eyebrow>}
        title="Talk to founders."
        lead="We're a small team. You'll talk to people who built it."
      />

      {/* Contact paths */}
      <Section>
        <SectionHeader
          title="Pick the path that fits"
          lead="Each of these goes to a real person on our team — not a queue, not a chatbot. If you're not sure which one applies, the founders' inbox is always a good default."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {CONTACT_PATHS.map((p, i) => (
            <Reveal key={p.title} index={i} className="h-full">
              <a
                href={`mailto:${p.email}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-[180ms] ease-out hover:-translate-y-1 hover:shadow-float"
              >
                <div
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-xl bg-quantum-soft text-quantum-dark dark:text-quantum [&_svg]:size-5"
                >
                  {p.icon}
                </div>
                <h3 className="mt-4 text-h3 font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {p.body}
                </p>
                <p className="mt-4 text-sm font-semibold text-quantum-dark dark:text-quantum">
                  {p.email}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Message form */}
      <Section>
        <SectionHeader
          centered
          title="Or send us a message"
          lead="Fill in the form and we'll route it to the right person on our team."
        />
        <Reveal className="mx-auto mt-10 w-full max-w-[720px]">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </Section>

      {/* Expectations + location */}
      <Section className="border-y border-line bg-paper-light">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <InfoHeading>What happens when you contact us</InfoHeading>
            <ul className="mt-5 space-y-3">
              {EXPECTATIONS.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.45em] size-2 rounded-full bg-quantum"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal index={1}>
            <InfoHeading>Where we are</InfoHeading>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink">
              We&apos;re a remote team distributed across the US. We meet over
              video by default.
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
              If you&apos;re in the US and want to meet in person — for a
              clinic visit, a security review, or just because face-to-face is
              better — we can travel. Just let us know.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
