"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashCard, MetricRow, ViewHeader } from "./bits";
import { CLINIC_SETTINGS, PROFILE_SETTINGS } from "./data";

export function SettingsView() {
  return (
    <div>
      <ViewHeader
        title="Settings"
        sub="Personal and clinic settings. Most administrative functions live in the admin console."
      />

      <div className="space-y-3">
        <DashCard title="Your clinic — Mountainview Medicine">
          {CLINIC_SETTINGS.map((row) => (
            <MetricRow
              key={row.k}
              label={row.k}
              value={
                row.k === "Custom domain" ? (
                  <span className="break-all text-xs">{row.v}</span>
                ) : (
                  row.v
                )
              }
            />
          ))}
        </DashCard>

        <DashCard title="Your profile — Dr. Sarah Chen">
          {PROFILE_SETTINGS.map((row) => (
            <MetricRow key={row.k} label={row.k} value={row.v} />
          ))}
          <MetricRow
            label="2FA"
            value={<span className="text-success">Enabled</span>}
          />
        </DashCard>

        <DashCard className="border-info/40 border-l-[3px] border-l-info bg-info/8">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-info">
            <Info className="size-4 shrink-0" />
            Need to change clinic config?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Branding, billing, user management, integrations, module
            enablement, and clinical template selection all live in the admin
            console. Switch to the admin role (Maria Rodriguez) to access.
          </p>
          <Button
            asChild
            size="sm"
            className="mt-3 bg-mv-green text-white hover:bg-mv-green/90"
          >
            <Link href="/demo/admin">Open admin console →</Link>
          </Button>
        </DashCard>
      </div>
    </div>
  );
}
