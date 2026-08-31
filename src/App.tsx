import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, stagger, staggerItem } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------- theme -- */
type Theme = "light" | "dark" | "system";
function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem("ql:theme");
      return t === "light" || t === "dark" ? t : "system";
    } catch {
      return "system";
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
      if (theme === "system") localStorage.removeItem("ql:theme");
      else localStorage.setItem("ql:theme", theme);
    } catch {
      /* storage unavailable — theme still applies for this view */
    }
  }, [theme]);
  const cycle = () =>
    setTheme((t) => (t === "system" ? "light" : t === "light" ? "dark" : "system"));
  return [theme, cycle];
}

/* ------------------------------------------------------------------ nav -- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, cycleTheme] = useTheme();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      className={"nav" + (scrolled ? " scrolled" : "")}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="wrap nav-in">
        <a href="#top" className="brand">
          Quantal Labs <span className="tag">AI</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#about" className="hide-sm">About</a>
          <a href="#health" className="hide-sm">Quantal Health</a>
          <a href="https://orcha.quantallabs.ai" className="hide-sm">Orcha Cloud</a>
          <a href="mailto:info@quantallabs.ai" className="hide-sm">Contact</a>
          <button className="theme-btn" onClick={cycleTheme} aria-label={`Theme: ${theme}`}>
            {theme}
          </button>
        </nav>
      </div>
    </motion.header>
  );
}

/* ----------------------------------------------------------------- hero -- */
function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 90]);
  const spin = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 120]);
  const item = staggerItem(reduced);
  return (
    <div className="hero" id="top">
      <motion.div className="hero-orb" style={{ y: drift }} />
      <motion.div className="hero-ring" style={{ rotate: spin }} aria-hidden="true" />
      <motion.div className="wrap" variants={stagger} initial="hidden" animate="show">
        <motion.p className="kicker" variants={item}>
          Quantal Labs · AI Division
        </motion.p>
        <motion.h1 variants={item} style={{ marginTop: 22 }}>
          Precision software
          <br />
          for modern medicine
        </motion.h1>
        <motion.p className="lead" variants={item}>
          Quantal AI democratizes AI for small businesses — making production-grade AI
          products accessible to the businesses that need them most. A division of
          Quantal Labs LLC.
        </motion.p>
        <motion.div className="cta-row" variants={item}>
          <a className="btn solid" href="#health">
            Quantal Health <span className="arr">→</span>
          </a>
          <a className="btn ghost" href="#sdk">
            Platform SDK <span className="arr">→</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- about -- */
function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal>
          <p className="kicker">About Quantal AI</p>
          <h2>Democratizing AI for small businesses</h2>
        </Reveal>
        <div className="split">
          <Reveal delay={0.08}>
            <p className="lead">
              Most AI breakthroughs land at large enterprises first. Quantal AI closes
              that gap.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="prose">
            <p>
              Quantal AI is a division of Quantal Labs LLC — built to make powerful,
              production-grade AI accessible to the small businesses that need it most
              but can rarely build it themselves, without a dedicated ML team or a
              nine-figure budget.
            </p>
            <p>
              We move vertical by vertical, building opinionated products rather than
              generic toolkits. Each product is compliance-ready, immediately useful,
              and designed around the real workflow of its users.
            </p>
            <p>
              <strong>Quantal Health</strong> is our first product — a HIPAA-compliant
              care platform for clinics, pairing a patient mobile app with a clinician
              dashboard and a modular white-label SDK that any clinic can run under
              their own brand.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- health -- */
const PILLARS = [
  {
    ico: "☤",
    t: "Clinically Grounded",
    p: "Every feature is specced with clinical input. Copy, alerts, and care protocols are signed off by licensed clinicians before shipping.",
  },
  {
    ico: "⛨",
    t: "HIPAA by Design",
    p: "PHI is protected end-to-end: encrypted at rest and in transit, isolated per clinic, and audit-logged on every access.",
  },
  {
    ico: "◱",
    t: "Modular & Customizable",
    p: "Each clinic enables only the modules they need. Branding, copy, and features are all configurable without a code release.",
  },
];
const FEATURES = [
  ["Patient Mobile App", "iOS & Android — daily health logging under the clinic's own brand."],
  ["Clinician Dashboard", "Web — patient roster, trend charts, structured alerts, messaging."],
  ["AI Food Vision", "Camera-based meal logging with calorie & macro estimates via AI."],
  ["Vitals & Symptoms", "Weight trends, energy, appetite, hydration — patient-entered or synced."],
  ["Secure Messaging", "Asynchronous patient ↔ clinician messaging, HIPAA-compliant."],
  ["Multi-Tenant Clinics", "Each clinic is fully isolated — patients, data, and branding stay separate."],
];
function Health() {
  const reduced = useReducedMotion();
  const item = staggerItem(reduced);
  return (
    <section id="health">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Quantal AI · Flagship Product</p>
          <h2>Quantal Health</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            A connected medication monitoring platform — native mobile app for patients,
            web dashboard for clinicians, built for real clinical workflows.
          </p>
        </Reveal>
        <motion.div
          className="grid3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PILLARS.map((c) => (
            <motion.div className="card" key={c.t} variants={item}>
              <span className="ico" aria-hidden="true">{c.ico}</span>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="feat-rows">
          {FEATURES.map(([t, p], i) => (
            <Reveal key={t} delay={i * 0.04}>
              <div className="feat-row">
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="badges">
            <span className="badge gold">HIPAA Compliant</span>
            <span className="badge">iOS</span>
            <span className="badge">Android</span>
            <span className="badge">Web Dashboard</span>
            <span className="badge">Design Partner Alpha</span>
          </div>
          <div className="cta-row">
            <a className="btn solid" href="https://quantal-health.com">
              Visit Quantal Health <span className="arr">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ sdk -- */
const MODULES =
  "auth logging.weight logging.symptoms logging.hydration logging.energy logging.appetite ai_vision manual_food wearables messaging notifications trends red_flags".split(
    " ",
  );
const SDK_ROWS = [
  ["White-Label Per Clinic", "Own bundle ID, own App Store listing, own brand — under the clinic's name, not Quantal's."],
  ["Modular Feature Toggles", "13+ modules toggled ON/OFF per tenant via admin console — no code release needed."],
  ["Runtime Branding", "Logo, primary color, font, welcome copy — fetched on first launch, no rebuild."],
  ["FHIR-Native Data Layer", "FHIR R4 native data model — interoperable, standards-compliant, and EHR-ready out of the box."],
  ["Multi-Provider AI", "Abstraction over Claude, GPT-4o, and Gemini — swap providers per tenant."],
  ["Jurisdiction-Agnostic", "HIPAA US by default, architected to extend to DPDP and other regimes per tenant config."],
  ["Build Pipeline", "Fastlane + per-tenant config produces N IPAs/AABs from one source tree, submitted under the clinic's App Store account."],
];
function Sdk() {
  const reduced = useReducedMotion();
  const item = staggerItem(reduced);
  return (
    <section id="sdk">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Platform SDK</p>
          <h2>
            One codebase.
            <br />N branded clinics.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            The Quantal Platform SDK is the customizable, FHIR-native healthcare
            framework that powers Quantal Health — and any future clinic-branded care
            application. Clinics don't install the SDK or write code: they get their own
            white-label app, generated from one source tree.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mono-label">Access tiers</p>
          <div className="tiers">
            {[
              ["Lite", "4 modules"],
              ["Standard", "9 modules"],
              ["Pro", "13 modules"],
            ].map(([t, m]) => (
              <div className="tier" key={t}>
                <b>{t}</b>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mono-label">Available modules</p>
          <motion.div
            className="modules"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {MODULES.map((m) => (
              <motion.span className="module" key={m} variants={item}>
                {m}
              </motion.span>
            ))}
          </motion.div>
        </Reveal>
        <div className="feat-rows">
          {SDK_ROWS.map(([t, p], i) => (
            <Reveal key={t} delay={i * 0.04}>
              <div className="feat-row">
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- contact -- */
function Contact() {
  return (
    <section className="band" id="contact">
      <div className="wrap">
        <Reveal>
          <p className="kicker" style={{ justifyContent: "center" }}>Design Partner Program</p>
          <h2>Build the next vertical with us</h2>
          <p className="lead">
            Clinics, partners, and small teams — if production-grade AI has felt out of
            reach, let's talk.
          </p>
          <div className="cta-row">
            <a className="btn solid" href="mailto:info@quantallabs.ai">
              info@quantallabs.ai <span className="arr">→</span>
            </a>
            <a className="btn ghost" href="https://quantal-health.com">
              Visit Quantal Health
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- footer -- */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <div className="brand">
              Quantal Labs <span className="tag">AI</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 12, maxWidth: "34ch" }}>
              Democratizing AI for small businesses. A division of Quantal Labs LLC.
            </p>
          </div>
          <div className="foot-cols">
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Quantal AI</a></li>
                <li><a href="mailto:info@quantallabs.ai">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Products</h4>
              <ul>
                <li><a href="#health">Quantal Health</a></li>
                <li><a href="#sdk">Platform SDK</a></li>
                <li><a href="https://orcha.quantallabs.ai">Orcha Cloud</a></li>
                <li><a href="mailto:info@quantallabs.ai">Design Partner Program</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="legal">
          © 2026 Quantal AI. All rights reserved. Quantal AI is a division of Quantal
          Labs LLC. Quantal Health is a product of Quantal AI.
        </p>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Health />
        <Sdk />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
