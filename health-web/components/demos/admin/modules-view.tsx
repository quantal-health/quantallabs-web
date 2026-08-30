"use client";

import { useState } from "react";
import { Info, ScanLine, TriangleAlert } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { StatusPill } from "@/components/demos/status-pill";
import { CURRENT_TIER, type AdminModule } from "./data";
import { ViewHeader } from "./view-header";

const POSTURES = [
  { value: "soft_only", label: "Soft only" },
  { value: "hard_only", label: "Hard only" },
  { value: "both", label: "Both" },
] as const;

function moduleStatus(m: AdminModule): {
  tone: "success" | "warning" | "neutral";
  label: string;
} {
  if (m.alwaysOn) return { tone: "success", label: "Active" };
  if (m.safety) {
    if (m.on && m.approved) return { tone: "success", label: "Active" };
    if (m.on) return { tone: "warning", label: "Pending Quantal review" };
    return { tone: "neutral", label: "Off" };
  }
  return m.on
    ? { tone: "success", label: "On" }
    : { tone: "neutral", label: "Off" };
}

export function ModulesView({
  modules,
  onPatch,
  cap,
  onCapChange,
  posture,
  onPostureChange,
}: {
  modules: readonly AdminModule[];
  onPatch: (id: string, patch: Partial<AdminModule>) => void;
  cap: string;
  onCapChange: (value: string) => void;
  posture: string;
  onPostureChange: (value: string) => void;
}) {
  const [pendingDisable, setPendingDisable] = useState<AdminModule | null>(
    null,
  );
  const [pendingSafety, setPendingSafety] = useState<AdminModule | null>(null);

  const aiVision = modules.find((m) => m.id === "food_ai");
  const showAiPanel = !!aiVision && aiVision.on && !!aiVision.approved;

  const capNumber = Number(cap);
  const capInvalid =
    cap.trim() === "" ||
    !Number.isFinite(capNumber) ||
    capNumber < 1 ||
    capNumber > 100;

  function handleToggle(m: AdminModule) {
    if (m.alwaysOn) {
      toast(`${m.name} is required for all tiers and cannot be disabled`);
      return;
    }
    if (!m.tiers.includes(CURRENT_TIER)) {
      toast(`${m.name} requires a higher tier — contact Quantal sales`);
      return;
    }
    if (m.safety) {
      if (m.on && m.approved) setPendingDisable(m);
      else setPendingSafety(m);
      return;
    }
    if (m.on) {
      setPendingDisable(m);
    } else {
      onPatch(m.id, { on: true });
      toast(
        `Module setting saved — patients see “${m.name}” on next app launch`,
      );
    }
  }

  function confirmDisable() {
    if (pendingDisable) {
      onPatch(pendingDisable.id, { on: false });
      toast(`“${pendingDisable.name}” disabled — patient data retained per HIPAA`);
    }
    setPendingDisable(null);
  }

  function confirmSafety() {
    if (pendingSafety) {
      onPatch(pendingSafety.id, { on: true, approved: false });
      toast(
        `Request submitted — “${pendingSafety.name}” pending Quantal Clinical Reviewer sign-off`,
      );
    }
    setPendingSafety(null);
  }

  function saveAiSettings() {
    if (capInvalid) {
      toast("Cap out of range — Pro ceiling is 1–100 scans/day");
      return;
    }
    toast(
      `AI Vision settings saved — cap ${capNumber}/day, posture: ${posture.replace("_", " ")}`,
    );
  }

  return (
    <div>
      <ViewHeader
        title="Tier & Modules"
        sub="Configure which capabilities are exposed to your patients and clinicians."
        actions={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                Request tier change
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tier change request</AlertDialogTitle>
                <AlertDialogDescription>
                  Your current tier is{" "}
                  <strong className="font-semibold text-ink">Pro</strong>. To
                  request a downgrade or discuss enterprise options, our team
                  will reach out within 1 business day.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex items-start gap-2.5 rounded-lg border border-info/30 bg-info/10 px-3.5 py-2.5 text-sm">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-info" />
                <p>
                  This opens a conversation with Quantal sales. Tier upgrades
                  require a contract amendment and may include compliance
                  re-review.
                </p>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    toast(
                      "Tier change request submitted — Quantal sales notified",
                    )
                  }
                >
                  Open conversation
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />

      {/* Tier card */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div>
            <p className="text-eyebrow font-bold uppercase text-ink-muted">
              Current tier
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-lg font-bold text-mv-green">
              Pro <StatusPill tone="success">Active</StatusPill>
            </p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-ink-muted">
            Tier governs the module ceiling. Self-serve modules toggle within
            your tier; safety-critical modules require Quantal review.
          </p>
        </div>
        <div
          role="img"
          aria-label="Tier progression: Lite and Standard included, Pro is the current tier"
          className="mt-4 grid h-9 grid-cols-3 gap-1 overflow-hidden rounded-full bg-paper-dark"
        >
          <div className="flex items-center justify-center bg-mv-green/60 text-xs font-semibold text-white">
            Lite
          </div>
          <div className="flex items-center justify-center bg-mv-green/80 text-xs font-semibold text-white">
            Standard
          </div>
          <div className="flex items-center justify-center bg-mv-green text-xs font-bold text-white">
            Pro
          </div>
        </div>
      </div>

      <h3 className="mt-6 text-base font-bold">Module configuration</h3>
      <p className="mb-3 mt-1 text-xs text-ink-muted">
        Tier governs the ceiling. Toggling a module ON requires it be available
        in your tier. Safety-critical modules are gated by Quantal Clinical
        Reviewer sign-off.
      </p>

      {/* Module table */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
        {modules.map((m) => {
          const inTier = m.tiers.includes(CURRENT_TIER);
          const status = moduleStatus(m);
          const locked = m.alwaysOn || !inTier;
          return (
            <div
              key={m.id}
              className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-paper-light/60 sm:grid-cols-[32px_minmax(0,1fr)_auto_auto] sm:gap-4 sm:px-5"
            >
              <span
                aria-hidden
                className="flex size-8 items-center justify-center rounded-md bg-paper-light text-sm"
              >
                {m.icon}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <span className="text-sm font-semibold">{m.name}</span>
                  {m.safety && (
                    <StatusPill tone="warning">Safety-critical</StatusPill>
                  )}
                  {!inTier && (
                    <StatusPill tone="neutral">Requires higher tier</StatusPill>
                  )}
                  <span className="sm:hidden">
                    <StatusPill tone={status.tone}>{status.label}</StatusPill>
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">{m.desc}</p>
              </div>
              <span className="hidden sm:block">
                <StatusPill tone={status.tone}>{status.label}</StatusPill>
              </span>
              {locked ? (
                <span
                  className="inline-flex cursor-not-allowed"
                  onClick={() => handleToggle(m)}
                >
                  <Switch
                    checked={m.on}
                    disabled
                    aria-label={`Toggle ${m.name}`}
                    className="pointer-events-none data-[state=checked]:bg-mv-green"
                  />
                </span>
              ) : (
                <Switch
                  checked={m.on}
                  onCheckedChange={() => handleToggle(m)}
                  aria-label={`Toggle ${m.name}`}
                  className="data-[state=checked]:bg-mv-green"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* AI Food Vision panel — only while the module is on + approved */}
      {showAiPanel && (
        <div className="mt-5 rounded-xl border border-mv-green/30 bg-mv-green/5 p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <ScanLine aria-hidden className="size-4 text-mv-green" />
            AI Food Vision — scan caps
          </h3>
          <p className="mt-1 text-xs text-ink-muted">
            Quantal sets the per-clinic ceiling (Pro: 1–100 scans/day per
            patient). You set the value within that ceiling.
          </p>
          <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="scan-cap">Daily per-patient limit</Label>
              <Input
                id="scan-cap"
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                value={cap}
                onChange={(e) => onCapChange(e.target.value)}
                aria-invalid={capInvalid || undefined}
                aria-describedby={capInvalid ? "scan-cap-error" : "scan-cap-hint"}
                className="mt-1.5"
              />
              {capInvalid ? (
                <p
                  id="scan-cap-error"
                  className="mt-1.5 text-xs font-medium text-danger"
                >
                  Cap out of range — Pro ceiling is 1–100 scans/day.
                </p>
              ) : (
                <p id="scan-cap-hint" className="mt-1.5 text-xs text-ink-muted">
                  Pro tier ceiling:{" "}
                  <strong className="text-ink">
                    100 scans/day per patient
                  </strong>
                  . Default = ceiling.
                </p>
              )}
            </div>
            <fieldset>
              <legend className="text-sm font-medium leading-none">
                Threshold posture
              </legend>
              <RadioGroup
                value={posture}
                onValueChange={onPostureChange}
                className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
              >
                {POSTURES.map((p) => (
                  <div key={p.value} className="flex items-center gap-2">
                    <RadioGroupItem id={`posture-${p.value}`} value={p.value} />
                    <Label
                      htmlFor={`posture-${p.value}`}
                      className="font-normal"
                    >
                      {p.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">
                <strong className="text-ink">Soft</strong>: warn patient near
                limit. <strong className="text-ink">Hard</strong>: block at
                cap. <strong className="text-ink">Both</strong>: warn, then
                block.
              </p>
            </fieldset>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              className="bg-mv-green text-white hover:bg-mv-green/85"
              onClick={saveAiSettings}
            >
              Save AI Vision settings
            </Button>
          </div>
        </div>
      )}

      {/* Disable-module confirmation */}
      <AlertDialog
        open={!!pendingDisable}
        onOpenChange={(open) => {
          if (!open) setPendingDisable(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable module?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDisable?.safety
                ? `Disabling “${pendingDisable.name}” hides this safety-critical workflow from patients and clinicians. Existing data is retained per HIPAA. Re-enabling requires a fresh Quantal Clinical Reviewer sign-off.`
                : pendingDisable
                  ? `Patients will lose access to “${pendingDisable.name}” on their next app launch. Their existing data remains in the database; nothing is deleted.`
                  : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-sm">
            <TriangleAlert
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-danger"
            />
            <p>
              <strong>
                Disabling this module hides it from your patients&apos; apps.
              </strong>{" "}
              Existing patient data is <strong>retained</strong> per HIPAA.
              Re-enabling restores patient access. Confirm?
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDisable}>
              Disable module
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Safety-critical enable request */}
      <AlertDialog
        open={!!pendingSafety}
        onOpenChange={(open) => {
          if (!open) setPendingSafety(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingSafety
                ? `Enable “${pendingSafety.name}”`
                : "Enable safety-critical module"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingSafety &&
                `Enabling “${pendingSafety.name}” requires Quantal Clinical Reviewer approval before it activates for your patients. Approval typically takes 3–5 business days. You’ll receive an email when reviewed.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-start gap-2.5 rounded-lg border border-warning/40 bg-warning/10 px-3.5 py-2.5 text-sm">
            <TriangleAlert
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-warning"
            />
            <p>
              Enabling this module requires{" "}
              <strong>Quantal Clinical Reviewer approval</strong> before it
              activates for your patients. Sign-off typically takes 3–5
              business days.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSafety}>
              Submit request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
