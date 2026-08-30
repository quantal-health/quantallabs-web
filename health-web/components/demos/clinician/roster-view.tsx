"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { StatusPill } from "@/components/demos/status-pill";
import { DashCard, PtAvatar, ViewHeader } from "./bits";
import {
  PATIENTS,
  ROSTER_FILTERS,
  STATUS_TONE,
  type Patient,
  type RosterFilter,
  type Trend,
} from "./data";

const TREND_ARROW: Record<Trend, string> = { down: "↓", flat: "→", up: "↑" };
const TREND_CLASS: Record<Trend, string> = {
  down: "text-success",
  flat: "text-ink-muted",
  up: "text-danger",
};

const CHIP_CLASS =
  "h-8 shrink-0 rounded-full border border-line-strong bg-surface px-3.5 text-xs font-medium text-ink-muted hover:border-mv-green hover:bg-surface hover:text-ink data-[state=on]:border-mv-green data-[state=on]:bg-mv-green data-[state=on]:font-semibold data-[state=on]:text-white";

function onlyJaneToast(p: Patient) {
  toast(`Only Jane Doe is fully populated in this demo`, {
    description: `In the full product this would open ${p.name}'s chart.`,
  });
}

function quickAction(action: "message" | "visit", p: Patient) {
  toast(
    action === "message"
      ? `Quick-action: open message composer for ${p.name}. (Demo placeholder.)`
      : `Quick-action: schedule a visit with ${p.name}. (Demo placeholder.)`,
  );
}

function RowActions({ patient }: { patient: Patient }) {
  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="xs"
        className="text-mv-green hover:text-mv-green"
        onClick={(e) => {
          e.stopPropagation();
          quickAction("message", patient);
        }}
      >
        Message
      </Button>
      <Button
        variant="ghost"
        size="xs"
        className="text-mv-green hover:text-mv-green"
        onClick={(e) => {
          e.stopPropagation();
          quickAction("visit", patient);
        }}
      >
        Visit
      </Button>
    </div>
  );
}

export function RosterView({ onOpenJane }: { onOpenJane: () => void }) {
  const [filter, setFilter] = useState<RosterFilter>("all");

  const visible =
    filter === "all" ? PATIENTS : PATIENTS.filter((p) => p.status === filter);

  const openPatient = (p: Patient) => {
    if (p.id === "jane") onOpenJane();
    else onlyJaneToast(p);
  };

  return (
    <div>
      <ViewHeader
        title="Active patients"
        suffix="· 60 total"
        sub="All Mountainview Medicine patients on Wegovy, Ozempic, Zepbound, Mounjaro, or Saxenda."
      />

      <ToggleGroup
        type="single"
        spacing={2}
        value={filter}
        onValueChange={(v) => {
          if (v) setFilter(v as RosterFilter);
        }}
        aria-label="Filter patients by status"
        className="mb-4 w-full flex-wrap justify-start"
      >
        {ROSTER_FILTERS.map((f) => (
          <ToggleGroupItem key={f.value} value={f.value} className={CHIP_CLASS}>
            {f.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Table ≥820px */}
      <div className="hidden overflow-hidden rounded-lg border border-line bg-surface min-[820px]:block">
        <Table>
          <TableHeader className="bg-paper-light">
            <TableRow className="hover:bg-transparent">
              {["Patient", "Drug · dose", "Wk", "Last weight", "Trend", "Status", "Actions"].map(
                (h) => (
                  <TableHead
                    key={h}
                    className="px-4 text-[11px] font-semibold uppercase tracking-wider text-ink-muted"
                  >
                    {h}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((p) => (
              <TableRow
                key={p.id}
                onClick={() => openPatient(p)}
                className="cursor-pointer"
              >
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <PtAvatar initials={p.initials} className={p.avatarClass} />
                    <div>
                      <button
                        className="block text-left text-sm font-semibold hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPatient(p);
                        }}
                      >
                        {p.name}
                      </button>
                      <p className="text-xs text-ink-muted">
                        {p.sex} · MRN {p.mrn}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 font-medium">{p.drug}</TableCell>
                <TableCell className="px-4 font-mono text-xs">
                  W{p.week}
                </TableCell>
                <TableCell className="px-4 font-mono text-xs">
                  {p.weight}
                </TableCell>
                <TableCell className="px-4">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold",
                      TREND_CLASS[p.trend],
                    )}
                  >
                    {TREND_ARROW[p.trend]} {p.trendVal}
                  </span>
                </TableCell>
                <TableCell className="px-4">
                  <StatusPill tone={STATUS_TONE[p.status]}>
                    {p.statusLabel}
                  </StatusPill>
                </TableCell>
                <TableCell className="px-4">
                  <RowActions patient={p} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Stacked cards <820px */}
      <div className="space-y-3 min-[820px]:hidden">
        {visible.map((p) => (
          <DashCard key={p.id} className="cursor-pointer">
            <div onClick={() => openPatient(p)}>
              <div className="flex items-center gap-3">
                <PtAvatar initials={p.initials} className={p.avatarClass} />
                <div className="min-w-0 flex-1">
                  <button
                    className="block text-left text-sm font-semibold hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPatient(p);
                    }}
                  >
                    {p.name}
                  </button>
                  <p className="text-xs text-ink-muted">
                    {p.sex} · MRN {p.mrn}
                  </p>
                </div>
                <StatusPill tone={STATUS_TONE[p.status]}>
                  {p.statusLabel}
                </StatusPill>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <dt className="text-ink-soft">Drug · dose</dt>
                  <dd className="mt-0.5 font-medium">{p.drug}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Week</dt>
                  <dd className="mt-0.5 font-mono">W{p.week}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Last weight</dt>
                  <dd className="mt-0.5 font-mono">{p.weight}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Trend</dt>
                  <dd
                    className={cn(
                      "mt-0.5 font-mono font-semibold",
                      TREND_CLASS[p.trend],
                    )}
                  >
                    {TREND_ARROW[p.trend]} {p.trendVal}
                  </dd>
                </div>
              </dl>
              <div className="mt-3 border-t border-line pt-2">
                <RowActions patient={p} />
              </div>
            </div>
          </DashCard>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <span>
          {filter === "all"
            ? "Showing 1–10 of 60 patients"
            : `Showing ${visible.length} of 60 patients`}
        </span>
        {filter === "all" && (
          <div className="flex flex-wrap gap-1">
            <Button variant="outline" size="xs" disabled>
              ‹ Prev
            </Button>
            <Button
              size="xs"
              className="bg-mv-green text-white hover:bg-mv-green/90"
              aria-current="page"
            >
              1
            </Button>
            {[2, 3, 4, 5, 6].map((n) => (
              <Button
                key={n}
                variant="outline"
                size="xs"
                onClick={() =>
                  toast("Only the first page is populated in this demo.")
                }
              >
                {n}
              </Button>
            ))}
            <Button
              variant="outline"
              size="xs"
              onClick={() =>
                toast("Only the first page is populated in this demo.")
              }
            >
              Next ›
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
