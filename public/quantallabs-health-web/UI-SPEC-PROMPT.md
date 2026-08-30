# Prompt: Design the UI spec for the Quantal Health website rebuild

You are a senior product/web designer. Produce a complete, implementation-ready **UI specification** for rebuilding the Quantal Health marketing website as a modern React application. The current site is 11 hand-written static HTML pages; the rebuild must keep the **same brand colors and content** but deliver a **fresh, modern look and feel** using the current best-practice web stack.

---

## 1. Product context

**Quantal Health** is a white-label care platform for GLP-1 weight-loss clinics (patients on Wegovy, Ozempic, Zepbound, Mounjaro, Saxenda). It ships as: a branded patient mobile app + a clinician dashboard + an admin console, with a dedicated HIPAA-aligned data environment per clinic. It is a product of parent studio **Quantal Labs** (corporate site at quantallabs.ai; this subsite is served at `quantallabs.ai/quantallabs-health-web/`). Current stage: early, founder-led, "Now accepting design partners."

Demo tenant used throughout: fictional clinic **Mountainview Medicine** (green `#16a34a`, secondary cyan `#0891b2`, Pro tier) with personas **Jane Doe** (patient, Wegovy 0.5→1.0mg, week 8, 218.4→207.6 lb), **Dr. Sarah Chen, MD** (clinician), **Maria Rodriguez** (practice admin).

## 2. Hard constraints

1. **Keep the existing brand palette exactly** (token values in §4). The warm paper/ink/amber identity is the brand — do not replace it with generic SaaS blue/purple or default shadcn zinc.
2. **Keep all existing page content and copy** (inventory in §6–7). You may propose light copy tightening, but no page, section, or claim may be dropped without flagging it.
3. **Three-way theme**: Light / Dark / System, user-selectable and persisted. Both themes are first-class; dark token values are given in §4.
4. Target implementation (design must be compatible, you are NOT writing code):
   - **Next.js (latest, App Router, React Server Components), static export** — deployed on GitHub Pages under the subpath `/quantallabs-health-web/` (all assets/links must tolerate a basePath).
   - **Tailwind CSS v4** (`@theme` design tokens) + **shadcn/ui** (Radix primitives) + **lucide-react** icons + **Motion** (Framer Motion) for animation + **next-themes** for theming.
   - Marketing pages must be fully statically rendered (SEO); the three interactive demos may be client components.
5. **Responsive is mandatory** — the current site has NO mobile nav (links simply disappear below 900px). The redesign must specify a proper mobile menu and mobile layouts for every screen, including the two desktop-app demos.
6. **Accessibility**: WCAG AA contrast in both themes, visible focus states, reduced-motion variants, semantic landmarks.

## 3. Design direction

"Modern look and feel" while keeping the brand recognizable:
- Confident type hierarchy (large editorial headlines), generous whitespace, restrained borders/shadows.
- Subtle motion: scroll-reveal, hover micro-interactions, animated numbers/charts in demos; never decorative for its own sake.
- Replace the current hand-drawn inline-SVG product mockups with a consistent, polished mockup/illustration system (specify its style).
- Modern component patterns where they improve the page (e.g., sticky section nav, bento-style feature grids, marquee logo/trust strips) — your call, justify choices.

## 4. Design tokens (must be preserved)

### Palette — light theme
| Token | Value | Role |
|---|---|---|
| ink | `#1B1A18` | primary text, dark bands |
| ink-muted | `#6B6863` | secondary text |
| ink-soft | `#C9C4BC` | muted text |
| paper | `#F4EFE2` | page background |
| paper-light | `#FAF7EE` | alt background |
| paper-dark | `#E8E2D2` | borders, tinted bands |
| surface / bg-clean | `#FFFFFF` | cards, elevated surfaces |
| border-strong | `#D4CFC2` | strong borders |
| quantum | `#E8A412` | brand accent (amber/gold) |
| quantum-dark | `#B8810F` | accent hover/active |
| quantum-soft | `#FBE9C0` | accent tint |
| success | `#10B981` · info `#2563EB` · warning `#F59E0B` · danger `#EF4444` | status |

### Palette — dark theme
| Token | Value |
|---|---|
| bg | `#1B1A18` |
| surface / bg-clean | `#252320` |
| paper-light | `#1F1D1B` · paper-dark `#2C2A27` |
| text | `#F4EFE2` · text-secondary `#B8B3A8` · text-muted `#7A7570` |
| border | `rgba(244,239,226,0.10)` · border-strong `rgba(244,239,226,0.18)` |

### Typography & misc
- **Inter** (300–900) for everything; **Geist Mono** (400/500) available for numeric/code accents.
- Current scale: hero `clamp(2.75rem, 5vw, 4.5rem)`, body-large `1.25rem`, body `1rem`, small `.875rem`, eyebrow `.75rem` uppercase. You may refine the scale.
- Soft layered shadows (e.g. `0 4px 8px rgb(27 26 24 / .08), 0 12px 32px rgb(27 26 24 / .06)`), 1200px max content width.
- Logo: inline-SVG open ring with a single **red** dot at lower-right (stylized "Q") + wordmark "**Quantal** Health" (+ italic "by Quantal AI"); white-stroke variant on dark.
- Demo-tenant tokens (used only inside demos): Mountainview green `#16a34a`, cyan `#0891b2`.

## 5. Shared chrome (all pages)

- **Header**: sticky translucent blurred bar; nav links **Product, For Clinics, Security, Pricing, Demo, About**; theme toggle (gear → Light/Dark/System panel, persisted); dark CTA button **"Talk to founders"** → Contact. Subpages currently show a "← Quantal Labs" back link to the corporate site — decide a cleaner treatment and make it consistent.
- **Footer**: dark ink band; logo + tagline "Care platform for weight-loss clinics, white-labeled for your practice."; columns **Product** (Overview, For Clinics, Pricing, Try the demo), **Trust** (Security & HIPAA, Contact), **Company** (About, Talk to founders); bottom bar "© 2026 Quantal Labs. All rights reserved." + "Now accepting design partners."
- Known inconsistencies to FIX in the redesign: no mobile menu; Contact absent from top nav; back-link present only on some pages; footer markup/heading color differs on Contact page.

## 6. Screen inventory — marketing pages (8)

### 6.1 Home (`/`)
1. Hero — badge "Now accepting design partners"; H1 "The care platform GLP-1 clinics actually want."; split layout with product illustration (dashboard + phone, Mountainview-branded); CTAs **Try the demo** (primary) / **Talk to founders**.
2. Three-pillar grid — "Your brand. Your team's tools. Your patients' data." → cards: branded patient app / clinician dashboard / dedicated environment.
3. Dark trust band — HIPAA-aligned · accepting design partners · built for GLP-1 clinics; encryption + dedicated environment line.
4. "What you'll see when you try it." — 3 cards with product previews: Daily logging / AI Food Vision / Care messaging.
5. Bottom CTA — "See it in action." (demo uses Mountainview + Jane Doe, no signup); dual CTA.

### 6.2 Product (`/product`)
1. Hero — "Everything your patients need to stay on track. Everything your clinicians need to follow along."
2. **Patient app** — 8 feature cards w/ mock previews: Daily check-in, AI Food Vision, Manual food logging, Wearables sync, Side-effect tracking, Two-way messaging, Progress trends & insights, Care plan in plain language.
3. **Clinician dashboard** (dark section) — 4 cards: patient roster, per-patient detail, message inbox, daily care queue.
4. **Admin console** — 4 cards: plan/module config, branding config, support ticket inbox, user management.
5. White-label commitment — "Onboarding in weeks, not quarters." / "It's your product, end to end."; checklist + branded-phone visual w/ App Store & Play badges.
6. "One platform. Three audiences." — 3 narrative day-in-the-life paragraphs.
7. Bottom CTA — **Try the patient demo** / **Try the clinician demo** / Talk to founders.

### 6.3 For Clinics (`/for-clinics`)
1. Hero — "Built for the way your clinic actually works." + dual CTA (clinician demo / founders).
2. 4 problem cards (spreadsheets at 200+ patients, generic apps kill logging, compliance burden, competitors launching branded apps).
3. 4 alternating text/visual solution rows — incl. the 42% vs 73% logging-consistency bar chart and 99.5% uptime.
4. Dark split — "What you keep control of" vs "What we handle for you" (4 checks each).
5. Onboarding timeline — 5 steps: W0 Kickoff → W1-3 Developer accounts → W4 Environment + app → W5-6 Store review → Live.
6. "First 90 days" — 4 outcome cards.
7. 3 testimonial cards (marked as design-partner conversations, not yet attributed).
8. Final CTA.

### 6.4 Pricing (`/pricing`)
1. Hero — "Pricing that scales with your practice."
2. 3 tier cards, middle ("Standard") elevated w/ "Most popular" badge. **No numeric prices** — every tier reads "Contact sales for pricing" + "One-time setup + annual platform fee". Lite (≤50 patients, basic app + dashboard), Standard (≤250, +food logging, wearables, symptoms, insights, messaging), Pro (+AI Food Vision, red-flag detection, priority support). CTAs "Talk to sales".
3. Dark "What's included with every tier" — 8 universal commitment cards (branded app, dedicated HIPAA environment, agreements, 99.5% uptime, 4-hour RTO, ops handled, annual DR drill, activity logs).
4. "How fees work." — Setup fee (one-time) + Annual platform fee (recurring) cards; no per-patient overage.
5. FAQ accordion — 7 questions (switch tiers, outgrow Pro, free trial, vs dev shop, leaving, technical staff, data ownership).
6. Design-partner callout (gradient card, "Limited cohort") — **Apply to be a design partner**.
7. Final CTA.

### 6.5 Security (`/security`)
1. Hero — "Your patients' data, protected by design."
2. 4 trust-pillar cards (dedicated environment, encrypted everywhere, activity logging, HIPAA agreements with every vendor).
3. Environment explainer — prose + pull-quote ("we hand you the keys… no lock-in") + **isolation diagram** (3 clinics, fully separated stacks).
4. "HIPAA from day one" — 4-item checklist (no PHI in logs/URLs/analytics; AI requests stripped of identifying info; vendor agreements; one agreement covers downstream).
5. Risk table — 6 rows: risk → how Quantal handles it.
6. Recovery stat cards — 4 hours (restore) / 1 hour (max data loss) / Daily (tested backups).
7. Honesty block — who at Quantal can access data + roadmap note (future cryptographic consent, not yet shipped).
8. Dark compliance callout — security questionnaire under NDA via security@ email.
9. Bottom CTA — "Talk to security at Quantal."

### 6.6 About (`/about`)
Centered hero "Why we built Quantal Health." → mission prose → 4 differentiator cards (white-label all the way down; built for GLP-1 workflow; HIPAA by design; founder-led) → team section (2 anonymous founder cards + dark "An honest note." callout) → Quantal Labs context → "The window is open." → CTA (founders / demo).

### 6.7 Contact (`/contact`)
Hero "Talk to founders." → 4 mailto option cards (founder / design partner / security / press) → message form (Name*, Email*, Practice, Inquiry type select, Message*; client-side validation; success state "Thanks — we'll be in touch.") → expectations strip (1-business-day reply, no marketing email; remote US team).

### 6.8 Demo hub (`/demo`)
Hero "Try Quantal Health right now. No signup. No email." → 3 large persona-picker tiles (patient / clinician / admin), each with a live-looking preview, description, and arrow CTA → "What's in the demos" (real workflows, fictional sample data, Mountainview branding) → dark CTA band.

## 7. Screen inventory — interactive demos (3)

These are fake-but-clickable product demos, currently vanilla JS + hand-drawn inline SVG. Rebuild as client-side React using real components. All wrapped in marketing chrome (intro header "All data is fictional", "← Back to demos", outro cross-linking the other demos).

### 7.1 Patient app demo (`/demo/patient`)
- **Shell**: centered iPhone frame (notch, status bar), Mountainview-green theming, 5-tab bottom bar (Home, Log, Trends, Messages, More), plus external prev/next stepper ("screen X of 11").
- **11 screens**: Splash (auto-advance) → Home dashboard (check-in banner; Today's weight 207.6 lb −1.3; nutrition 290/~1500 kcal; quick actions Snap a meal / Log weight / Message Dr. Chen) → Meal chooser (AI Vision vs manual USDA entry) → Camera viewfinder (shutter + flash) → Analyzing (spinner, "privacy info stripped on device", auto-advance) → AI result ("Greek yogurt with granola", high-confidence chip, editable macros 290 kcal/18g protein/4g fiber, "Was this incorrect?" prompt) → Trends (8-week SVG weight chart −10.8 lb, nutrition & side-effect cards) → Messages (thread with Dr. Chen, send appends bubble) → Daily check-in (1–5 scales for energy/hunger/mood, sleep select, side-effect chips w/ exclusive "None") → Profile (program, care team, Apple Health, support, sign out) → Help & support form.
- Behaviors to keep: auto-advance timers, shutter flash, saving a meal updates Home's calorie total + toast, single/multi-select input logic.

### 7.2 Clinician dashboard demo (`/demo/clinician`)
- **Shell**: desktop browser frame (`mountainview-medicine.quantal.health`); header w/ Dr. Sarah Chen identity; left sidebar — Workspace: Patients (60), Messages (4), Tasks (3), Reports; Practice: Settings.
- **Views**: Roster (status filter chips; table: patient, drug·dose, week, last weight, trend arrow, status pill, actions; 10 named sample patients, "1–10 of 60") → Patient detail for Jane Doe with 4 tabs (Overview: 4 stat cards + weight chart w/ titration marker + activity feed + SOAP care plan; Logs table; Messages thread with clinical-language guard on send; private Notes) → Message inbox (unread/replied/archived chips, 7 threads) → Tasks (urgent titration review w/ Acknowledge/Approve/Defer; ≥5% weight-change review list; inactive-patient list) → Reports (per-drug bar chart, compliance progress bars, provider workload, panel composition) → Settings (clinic + profile, link to admin demo).
- Currently non-Jane rows fire `alert()` placeholders — the spec must replace all alert() interactions with proper UI (e.g. toast "Only Jane Doe is populated in this demo").

### 7.3 Admin console demo (`/demo/admin`)
- **Shell**: browser frame (`…/admin`); sidebar with Mountainview tenant badge (Pro pill) + views: Tier & Modules, Branding, User Management, Support Tickets, Settings.
- **Views**: Tier & Modules (Lite→Standard→Pro progress; 11-module table with toggles; safety-critical modules require an approval modal; disable requires HIPAA confirm modal; AI Vision scan-cap panel with validation) → **Branding (marquee interaction)**: logo, primary/secondary color pickers, app name, font select, patient-facing copy — all live-updating an iPhone preview; Reset + "Save & build" (modal: "4–6 weeks first build cycle") → Users table (10 named users, roles admin/clinician/ops/view-only, status pills) → Support tickets (3 collapsible threads w/ replies) → Settings (clinic identity, locale/hours, infrastructure/domains with status pills).

## 8. Required deliverable — the UI spec

Produce a single spec document containing:

1. **Design tokens**: full Tailwind v4 `@theme` token sheet (both themes) derived from §4; spacing/radius/shadow scales; refined type scale.
2. **Component inventory**: every reusable component mapped to its shadcn/ui base (or marked custom) — e.g. Header, MobileNav, ThemeToggle, Hero, Eyebrow, FeatureCard, BentoGrid, DarkBand, StatCard, Timeline, TestimonialCard, PricingTier, FAQ (Accordion), ContactForm, DemoTile, PhoneFrame, BrowserFrame, DataTable, StatusPill, ChartCard, Toast, ConfirmModal…— with variants, states, and which pages use them.
3. **Per-screen layout specs**: for each of the 11 screens — layout grid, section order, component composition, responsive behavior (mobile/tablet/desktop), and dark-theme notes. Wireframe-level detail is enough; pixel mocks optional.
4. **Motion spec**: page-level and micro-interactions, durations/easings, reduced-motion fallbacks.
5. **Illustration/mockup system**: how product previews are produced consistently (style, framing, light/dark handling).
6. **Chart approach** for the demos (library vs hand-built SVG in React) and specs for each chart.
7. **Accessibility notes** per component category.
8. **Open questions / flagged deviations** — anything you changed or think should change (copy, IA, section order), listed explicitly for approval.

Out of scope: backend, real auth, CMS, new pages, rewriting brand copy.
