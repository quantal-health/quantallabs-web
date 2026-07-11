# Design spec — Any-specialization reframe of quantal-health.com

**Author:** Sky (design) · **From:** Morgan's repositioning research (task thread 8051a714)
**Status:** Ready for review → Atlas → Kedar sign-off, then Dev builds.
**Scope:** quantal-health.com only. Leave quantallabs.ai untouched.
**Theme:** UNCHANGED. This is a **messaging + IA reframe, not a re-theme.** Keep the
"Quantum Red on Paper" system exactly (tokens below). No new colors, fonts, or components
are required — only copy, one new section pattern, and one nav item.

Visual reference for the new/reframed sections: `design/reframe-mockup.html`
(self-contained, uses the live theme tokens; open it in a browser).

---

## The core idea (one sentence)

Quantal's three differentiators — the **branded patient app**, the **paired clinician
dashboard**, and the **dedicated per-clinic data environment** — are *already*
specialty-neutral. Only the surface copy is narrow. So we lift the headline to the neutral
platform value, keep GLP-1 as the **live, in-production flagship** (proof, not identity),
and add one section that makes "built to your specialization" concrete.

**Accuracy line (non-negotiable):** only GLP-1 is fully configured today. Everything else is
"built to your requirements / on request." Every specialty surface must mark **Live now** vs
**Built to request** so we never overstate what exists. This protects trust next to our HIPAA
claims.

---

## Theme tokens (preserve verbatim — do not change)

```
--ink:#1B1A18  --paper:#F4EFE2  --quantum:#E53535   (brand red / the quantum dot)
--ink-muted:#6B6863  --ink-soft:#C9C4BC
--paper-light:#FAF7EE  --paper-dark:#E8E2D2
--quantum-soft:#FBE4E1  --quantum-dark:#B4271F
--success:#10B981  --info:#2563EB  --warning:#F59E0B  --danger:#C81E1E
Type: Geist (display/headings) · Inter (body) · Geist Mono (eyebrows/data labels)
```
The red quantum dot stays the single signature accent (eyebrows, active nav, live-state dots).
Reuse it for the **"Live now"** status dot on specialty items — that's a perfect, on-brand fit.

---

## 1. HERO — neutral top-line, GLP-1 in the sub as proof

**Before** (`index.html`, ~line 358):
> eyebrow: *Now accepting design partners*
> h1: **The care platform GLP-1 clinics actually want.**
> lede: *Your brand. Your patients. Your data. A branded patient app and a clinician dashboard,
> purpose-built for weight-loss clinics treating patients on Wegovy, Ozempic, Zepbound,
> Mounjaro, and Saxenda …*

**After** (recommended — differentiator-led):
> eyebrow: **Now accepting design partners**  *(keep)*
> h1: **The care platform that ships as your clinic — not ours.**
> lede: **Your brand. Your patients. Your data.** A branded patient app and a clinician
> dashboard, in your name and built to your specialty — your listing on the App Store, your
> team's view of every patient, and your data in its own dedicated environment with its own
> database and encryption keys. **Live today with GLP-1 clinics; your modules next.**

Guardrail: the **headline must not name GLP-1** as the category. GLP-1 lives in the sub as
proof ("Live today with GLP-1 clinics"), not in the H1 as our identity.

Alternates (if the team prefers): (2) "Your clinic's own care platform — built to your
specialty." (3) "One clinical platform. Configured for your specialty."

Hero illustration: keep the Mountainview Medicine phone+dashboard SVG, but it now reads as
*an example*, not *the product*. No art change needed; the new specialty section carries the
breadth.

---

## 2. THREE PILLARS — keep; strip the last weight-loss phrasing

`index.html` ~line 495: "Your brand. Your team's tools. Your patients' data." — the substance
is already neutral. **Keep the section.** Only sweep any residual weight-loss wording in the
body copy (e.g. "the rhythm of GLP-1 care" → "the rhythm of your care model"). No layout change.

---

## 3. NEW SECTION — "Built to your specialization" (the load-bearing add)

Place it **directly after the three pillars**, before the Trust strip. This is what turns
"any specialization" from a claim into something concrete. Structure (see mockup):

- **eyebrow:** `Built to your requirements`  (mono eyebrow, existing style)
- **h2:** **Any specialization. Built to your requirements.**
- **intro:** *GLP-1 is where we went deep first — real clinics, live under their own brand.
  The same core platform configures to how your specialty works.*
- **Specialty grid** — cards/chips, each with a status marker:
  - **GLP-1 & metabolic care** — `● Live now` (red quantum dot)
  - Primary care · Behavioral health · Women's health · Cardiometabolic ·
    Endocrinology · Longevity · Chronic care · Pediatrics — each `Built to request` (muted)
  - The live-vs-request distinction must be visually obvious (dot + label), never blurred.
- **"How modules get built" 3-step strip** below the grid:
  1. **Map your workflow** — we learn how your specialty actually runs.
  2. **Configure the modules** — logging, wearables, trends, messaging, app shell, admin.
  3. **Ship as your branded app** — your name on the App Store, your dedicated environment.

Copy discipline: enumerate a **concrete specialty list** + "built to your requirements."
Never "we do everything / any specialty" as vague mush — that reads as vaporware and erases
the white-label moat.

---

## 4. REFRAME the GLP-1 / demo sections — relabel, do not delete

The GLP-1 story is **proof of execution** — buyers trust "live with real clinics" over "we can
build anything." Reframe, never delete.

- `index.html` "What you'll see" (~line 535): add a section label
  **"Live in production: our GLP-1 flagship"** with intro *"GLP-1 is where we went deep first.
  Here's what a live clinic runs today."*
- **AI Food Vision** tile is the one genuinely weight-loss-flavored feature — keep it, but
  caption it **"Example — built for our GLP-1 flagship"** so it reads as one configured module,
  not the whole product.
- Any "Mountainview" demo screen keeps a caption: **"Example: a GLP-1 clinic's dashboard."**

---

## 5. CTA — broaden without losing the founder-led voice

Bottom CTA (~line 642) "See it in action." → keep the founder-led framing (it fits a bespoke
platform), broaden the support copy:
> **See the GLP-1 flagship — then let's talk about yours.**
> Buttons: **Try the demo** (primary) · **Talk to founders** (secondary).
> Eyebrow/subcopy: *Now accepting design partners · Tell us about your clinic.*

---

## 6. NAV / IA — add "Who we serve"

Add one nav item so the hero can stay neutral while GLP-1 depth lives one click down
(Healthie pattern). Recommended label: **Who we serve** (alt: "Specialties").

New nav order: **Product · Who we serve · For Clinics · Security · Pricing · Demo · About**
+ persistent **Talk to founders** CTA.

Target for "Who we serve": for a first pass it can **anchor to the new
"Built to your specialization" section** on the homepage (`index.html#specializations`).
A dedicated page is a nice-to-have later, not required for this reframe.

No other IA change. The 11→15 page structure (incl. design-partner, privacy, terms) stays.

---

## 7. WHOLE-SITE COPY SWEEP (flag for Dev — do NOT stop at the homepage)

A homepage-only reframe will read inconsistent. `product.html` (~98 GLP-1 mentions) and the
demo pages are the most weight-loss-saturated. Rule for Dev on every page:

| Page | Move |
|---|---|
| `index.html` | Full reframe per sections 1–6 above. |
| `product.html` | Neutralize the platform/pillars framing; relabel GLP-1-specific modules as "flagship example." Keep feature depth, remove "weight-loss" as the default frame. |
| `for-clinics.html` | Lead with "your specialty, your brand"; GLP-1 as the proven example. |
| `demo.html` + `demo-*.html` | Caption demos as "Example: a GLP-1 clinic." Don't imply the demo is the only configuration. |
| `pricing.html` | Reframe tiers as platform tiers, not weight-loss tiers. (Note: Morgan flagged a separate accuracy issue here — "red-flag detection" claim + self-serve tiers contradict product docs; that's a copy-accuracy fix Dev/Atlas should confirm, adjacent to this reframe.) |
| `security.html` | Mostly neutral already; sweep any weight-loss examples. |
| `about.html`, `contact.html`, `design-partner.html` | Light sweep — replace "weight-loss/GLP-1 clinics" with "clinics" + GLP-1 as flagship where it appears. |

**Sweep rule of thumb:** where GLP-1 describes *the product's identity* → neutralize.
Where GLP-1 is *a named live example/proof* → keep and label it "Live now / flagship."

---

## What Dev receives

1. This spec (`design/reframe-spec.md`) — final copy + section-by-section instructions.
2. `design/reframe-mockup.html` — visual of the reframed hero + new specialty grid +
   reframed flagship band, on the real theme tokens.
3. No production code from design. Theme is unchanged; Dev edits copy + adds the one new
   section pattern shown in the mockup.
