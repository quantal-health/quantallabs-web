"use client";

import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PhoneFrame } from "@/components/marketing/device-mock";
import {
  FONT_OPTIONS,
  HEX_COLOR_RE,
  type BrandingConfig,
} from "./data";
import { ViewHeader } from "./view-header";

/** Branding form state — `primary`/`secondary` always hold the last VALID
 *  color; the `*Hex` fields hold the raw text-input value. */
export type BrandingState = BrandingConfig & {
  primaryHex: string;
  secondaryHex: string;
};

const PREVIEW_TABS = ["Home", "Log", "Trends", "Messages"] as const;

/* -------------------------------------------------------------------------
   Live phone preview. Hardcoded hex inside the phone screen is intentional:
   the Mountainview patient app always renders the tenant's LIGHT branding,
   in both site themes.
------------------------------------------------------------------------- */
function AppPreviewScreen({
  branding,
  initial,
}: {
  branding: BrandingState;
  initial: string;
}) {
  const fontStack = `"${branding.font}", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  return (
    <div className="flex flex-col" style={{ fontFamily: fontStack }}>
      {/* App header — background = primary color */}
      <div
        className="flex items-center gap-2 px-3.5 py-2"
        style={{ backgroundColor: branding.primary }}
      >
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-white text-[11px] font-bold"
          style={{ color: branding.primary }}
        >
          {initial}
        </span>
        <span className="min-w-0 flex-1 truncate text-xs font-semibold text-white">
          {branding.appName}
        </span>
      </div>
      {/* Welcome card — body copy driven by the Welcome text field */}
      <div className="mx-2.5 mt-2.5 rounded-[10px] bg-white p-3 shadow-[0_1px_2px_rgba(17,24,39,0.08)]">
        <p
          className="text-[11px] font-bold"
          style={{ color: branding.primary }}
        >
          Welcome back, Jane
        </p>
        <p className="mt-1 text-[10px] leading-snug text-[#4b5563]">
          {branding.welcome}
        </p>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 py-2.5">
        <div className="rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(17,24,39,0.08)]">
          <p className="text-[8px] font-semibold uppercase tracking-[0.05em] text-[#6b7280]">
            Today&apos;s weight
          </p>
          <p className="mt-0.5 font-mono text-[11px] font-bold text-[#111827]">
            207.6 lb{" "}
            <span style={{ color: branding.primary }}>↓ 1.3 lb</span>
          </p>
        </div>
        {/* Medication tile — secondary-color accent */}
        <div
          className="rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(17,24,39,0.08)]"
          style={{ borderLeft: `3px solid ${branding.secondary}` }}
        >
          <p
            className="text-[8px] font-semibold uppercase tracking-[0.05em]"
            style={{ color: branding.secondary }}
          >
            Wegovy 0.5mg
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-[#111827]">
            Week 8 · titrating
          </p>
        </div>
      </div>
      {/* Tab bar — active tab tinted primary */}
      <div className="mt-auto flex justify-around border-t border-[#e5e7eb] bg-white px-1 pb-3 pt-1.5">
        {PREVIEW_TABS.map((tab, i) => (
          <span
            key={tab}
            className="flex flex-1 flex-col items-center gap-0.5 text-[8px] font-medium"
            style={{ color: i === 0 ? branding.primary : "#6b7280" }}
          >
            <span aria-hidden className="size-3 rounded-[4px] bg-current opacity-85" />
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Fires a subtle scale pulse (1 → 1.015 → 1) whenever `version` changes.
 *  Reduced motion → no pulse. */
function PulsingPreview({
  version,
  className,
  children,
}: {
  version: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (reduced) return;
    controls.start({
      scale: [1, 1.015, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  }, [version, reduced, controls]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
}

function ColorField({
  id,
  label,
  colorValue,
  hexValue,
  valid,
  onPicker,
  onHex,
}: {
  id: string;
  label: string;
  colorValue: string;
  hexValue: string;
  valid: boolean;
  onPicker: (value: string) => void;
  onHex: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          type="color"
          id={id}
          value={colorValue}
          onChange={(e) => onPicker(e.target.value)}
          className="h-9 w-10 shrink-0 cursor-pointer rounded-md border border-line-strong bg-transparent p-1"
        />
        <Input
          value={hexValue}
          onChange={(e) => onHex(e.target.value)}
          aria-label={`${label} hex value`}
          aria-invalid={!valid || undefined}
          spellCheck={false}
          className="font-mono"
        />
      </div>
      {!valid && (
        <p className="mt-1.5 text-xs font-medium text-danger">
          Enter a valid hex color (#RRGGBB).
        </p>
      )}
    </div>
  );
}

export function BrandingView({
  branding,
  version,
  onPatch,
  onReset,
}: {
  branding: BrandingState;
  version: number;
  onPatch: (patch: Partial<BrandingState>) => void;
  onReset: () => void;
}) {
  const primaryValid = HEX_COLOR_RE.test(branding.primaryHex.trim());
  const secondaryValid = HEX_COLOR_RE.test(branding.secondaryHex.trim());
  const initial = (branding.appName.trim().charAt(0) || "M").toUpperCase();

  function handleHexInput(field: "primary" | "secondary", raw: string) {
    const patch: Partial<BrandingState> =
      field === "primary" ? { primaryHex: raw } : { secondaryHex: raw };
    const value = raw.trim();
    if (HEX_COLOR_RE.test(value)) {
      if (field === "primary") patch.primary = value;
      else patch.secondary = value;
    }
    onPatch(patch);
  }

  function handlePicker(field: "primary" | "secondary", value: string) {
    onPatch(
      field === "primary"
        ? { primary: value, primaryHex: value }
        : { secondary: value, secondaryHex: value },
    );
  }

  const preview = <AppPreviewScreen branding={branding} initial={initial} />;

  return (
    <div>
      <ViewHeader
        title="Branding"
        sub="Your patient app is white-labeled. Edit your colors, logo, copy, and font; preview updates in real time."
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-7">
        {/* Form column */}
        <div className="space-y-5">
          <section className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <h3 className="text-sm font-bold">Logo &amp; identity</h3>

            <div className="mt-4">
              <p className="text-sm font-medium">Logo</p>
              <div className="mt-1.5 rounded-lg border-2 border-dashed border-line-strong bg-paper-light p-4">
                <div className="flex items-center justify-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-[10px] text-xl font-extrabold text-white"
                    style={{ backgroundColor: branding.primary }}
                  >
                    {initial}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      mountainview-logo.svg
                    </p>
                    <p className="text-xs text-ink-muted">
                      Drag to replace · PNG / SVG · Max 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-2">
              <ColorField
                id="primary-color"
                label="Primary color"
                colorValue={branding.primary}
                hexValue={branding.primaryHex}
                valid={primaryValid}
                onPicker={(v) => handlePicker("primary", v)}
                onHex={(v) => handleHexInput("primary", v)}
              />
              <ColorField
                id="secondary-color"
                label="Secondary color"
                colorValue={branding.secondary}
                hexValue={branding.secondaryHex}
                valid={secondaryValid}
                onPicker={(v) => handlePicker("secondary", v)}
                onHex={(v) => handleHexInput("secondary", v)}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-3">
                <Label htmlFor="app-name">App name</Label>
                <span className="font-mono text-xs text-ink-muted">
                  {branding.appName.length}/30
                </span>
              </div>
              <Input
                id="app-name"
                value={branding.appName}
                maxLength={30}
                onChange={(e) => onPatch({ appName: e.target.value })}
                className="mt-1.5"
              />
              <p className="mt-1.5 text-xs text-ink-muted">
                Max 30 chars — Apple display-name limit.
              </p>
            </div>

            <div className="mt-4">
              <Label htmlFor="font-family">Font family</Label>
              <Select
                value={branding.font}
                onValueChange={(v) => onPatch({ font: v })}
              >
                <SelectTrigger id="font-family" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <h3 className="text-sm font-bold">Patient-facing copy</h3>

            <div className="mt-4">
              <Label htmlFor="welcome-text">Welcome screen text</Label>
              <Textarea
                id="welcome-text"
                rows={2}
                value={branding.welcome}
                onChange={(e) => onPatch({ welcome: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="disclaimer-text">Disclaimer text</Label>
              <p className="mt-0.5 text-xs text-ink-muted">
                HIPAA-compliant boilerplate; review with counsel.
              </p>
              <Textarea
                id="disclaimer-text"
                rows={4}
                value={branding.disclaimer}
                onChange={(e) => onPatch({ disclaimer: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-2.5">
            <Button variant="ghost" onClick={onReset}>
              Reset to defaults
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="accent">Save &amp; build</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Kick off a build?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Estimated{" "}
                    <strong className="font-semibold text-ink">
                      4–6 weeks
                    </strong>{" "}
                    for the first build cycle (Apple/Google review).
                    Subsequent updates take{" "}
                    <strong className="font-semibold text-ink">
                      3–5 days
                    </strong>
                    . You&apos;ll receive a notification when the build is
                    submitted and again when it&apos;s live.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex items-start gap-2.5 rounded-lg border border-info/30 bg-info/10 px-3.5 py-2.5 text-sm">
                  <Info
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-info"
                  />
                  <p>
                    Building your branded app triggers our build pipeline and
                    submission to your App Store / Play Store accounts under
                    your developer account.
                  </p>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="accent"
                    onClick={() =>
                      toast(
                        "Build pipeline triggered — first cycle ETA 4–6 weeks",
                      )
                    }
                  >
                    Confirm &amp; build
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Desktop live preview — sticky beside the form */}
        <div className="hidden lg:block">
          <div className="lg:sticky lg:top-24">
            <PulsingPreview
              version={version}
              className="mx-auto w-full max-w-[260px]"
            >
              <PhoneFrame
                label="Live preview of the branded patient app"
                className="max-w-[260px] bg-[#f9fafb]"
              >
                {preview}
              </PhoneFrame>
            </PulsingPreview>
            <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
              Live preview — updates as you edit. Patients see this on next
              app launch.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: mini preview pins to the bottom of the viewport while the
          form scrolls (decorative duplicate of the desktop preview). */}
      <div
        aria-hidden
        className="pointer-events-none sticky bottom-4 z-20 mt-6 flex justify-end lg:hidden"
      >
        <PulsingPreview version={version} className="w-[176px]">
          <PhoneFrame className="max-w-[176px] rounded-[30px] border-4 bg-[#f9fafb] shadow-float">
            {preview}
          </PhoneFrame>
        </PulsingPreview>
      </div>
    </div>
  );
}
