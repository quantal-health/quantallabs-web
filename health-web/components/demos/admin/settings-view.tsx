"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusPill } from "@/components/demos/status-pill";
import { CLINIC_SETTINGS, INFRA_ROWS } from "./data";
import { ViewHeader } from "./view-header";

export function SettingsView() {
  return (
    <div>
      <ViewHeader
        title="Settings"
        sub="Clinic-wide configuration for time zone, locale, hours, and infrastructure."
      />

      <div className="space-y-5">
        {/* Clinic identity */}
        <section className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-sm font-bold">Clinic identity</h3>
          <div className="mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="tenant-display">Clinic display name</Label>
              <Input
                id="tenant-display"
                defaultValue={CLINIC_SETTINGS.displayName}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="privacy-url">Privacy policy URL</Label>
              <Input
                id="privacy-url"
                defaultValue={CLINIC_SETTINGS.privacyUrl}
                className="mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* Locale & hours */}
        <section className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-sm font-bold">Locale &amp; hours</h3>
          <div className="mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="tz">Default time zone</Label>
              <Select defaultValue={CLINIC_SETTINGS.timeZone}>
                <SelectTrigger id="tz" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLINIC_SETTINGS.timeZones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="locale">Default locale</Label>
              <Select defaultValue={CLINIC_SETTINGS.locale}>
                <SelectTrigger id="locale" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLINIC_SETTINGS.locales.map((locale) => (
                    <SelectItem key={locale} value={locale}>
                      {locale}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="working-days">Clinic working hours</Label>
            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
              <Select defaultValue={CLINIC_SETTINGS.workingDays}>
                <SelectTrigger id="working-days" className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLINIC_SETTINGS.workingDaysOptions.map((days) => (
                    <SelectItem key={days} value={days}>
                      {days}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-ink-muted">from</span>
              <Label htmlFor="hours-from" className="sr-only">
                Working hours start
              </Label>
              <Input
                id="hours-from"
                defaultValue={CLINIC_SETTINGS.hoursFrom}
                className="w-[100px]"
              />
              <span className="text-xs text-ink-muted">to</span>
              <Label htmlFor="hours-to" className="sr-only">
                Working hours end
              </Label>
              <Input
                id="hours-to"
                defaultValue={CLINIC_SETTINGS.hoursTo}
                className="w-[100px]"
              />
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Used to compute messaging response times and notification quiet
              hours.
            </p>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-sm font-bold">Infrastructure</h3>
          <div className="mt-2">
            {INFRA_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-line py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{row.label}</p>
                  <p className="text-xs text-ink-muted">
                    <strong className="font-semibold text-ink">
                      {row.host}
                    </strong>
                    {row.detail && <> {row.detail}</>}
                  </p>
                </div>
                <StatusPill tone="success">{row.pill}</StatusPill>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Each clinic gets its own dedicated environment with custom domain
            support.
          </p>
        </section>
      </div>
    </div>
  );
}
