"use client";

import { useState } from "react";
import { ArrowLeft, MessageSquare, Scale, TriangleAlert, Utensils } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { StatCard } from "@/components/marketing/feature-card";
import { StatusPill } from "@/components/demos/status-pill";
import { DashCard, PtAvatar } from "./bits";
import {
  ACTIVITY,
  FORBIDDEN_CLINICAL_TERMS,
  JANE_THREAD,
  LOGS,
  LOG_TONE,
  NOTES_TEXT,
  SOAP_NOTE,
  type FeedKind,
  type ThreadMessage,
} from "./data";
import { JaneWeightChart } from "./weight-chart";

export type DetailTab = "overview" | "logs" | "messages" | "notes";

/* ------------------------------- overview -------------------------------- */

const FEED_ICON: Record<FeedKind, { icon: React.ReactNode; tint: string }> = {
  weight: { icon: <Scale className="size-4" />, tint: "bg-mv-green/12 text-mv-green" },
  meal: { icon: <Utensils className="size-4" />, tint: "bg-warning/15 text-warning" },
  message: { icon: <MessageSquare className="size-4" />, tint: "bg-info/12 text-info" },
  symptom: { icon: <TriangleAlert className="size-4" />, tint: "bg-danger/12 text-danger" },
};

function OverviewTab() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Weight delta"
          value={<span className="text-success">−10.8 lb</span>}
          delta="Over 8 weeks (−4.9%)"
          className="border-mv-green/40 bg-mv-green/8"
        />
        <StatCard label="Avg daily kcal" value="1,420" delta="Last 7 days" />
        <StatCard
          label="Avg sleep"
          value="7.2h"
          delta="Last 7 days · wearable-derived"
        />
        <StatCard
          label="Side effects"
          value={<span className="text-base">Mild nausea (resolved)</span>}
          delta="No active symptoms"
        />
      </div>

      <DashCard className="mt-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[15px] font-semibold">Weight trend · 8 weeks</h3>
          <span className="font-mono text-xs text-ink-muted">
            218.4 lb → 207.6 lb · −10.8 lb
          </span>
        </div>
        <JaneWeightChart />
      </DashCard>

      <DashCard title="Recent activity" className="mt-4">
        <div className="divide-y divide-line">
          {ACTIVITY.map((item, i) => (
            <div key={i} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
              <span
                aria-hidden
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full",
                  FEED_ICON[item.kind].tint,
                )}
              >
                {FEED_ICON[item.kind].icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm">
                  {item.parts.map((part, j) =>
                    part.bold ? (
                      <strong key={j}>{part.text}</strong>
                    ) : part.italic ? (
                      <em key={j}>{part.text}</em>
                    ) : (
                      <span key={j}>{part.text}</span>
                    ),
                  )}
                  {item.badge && (
                    <StatusPill tone="info" className="ml-1.5 align-middle">
                      {item.badge}
                    </StatusPill>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </DashCard>

      <DashCard title="Care plan" className="mt-4">
        <div className="rounded-md border-l-[3px] border-mv-green bg-paper-light px-3.5 py-3 text-sm leading-relaxed">
          {SOAP_NOTE.map((s) => (
            <p key={s.label} className="mb-1.5 last:mb-0">
              <strong>{s.label}:</strong> {s.text}
            </p>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          Last updated by Dr. Sarah Chen · 2 days ago
        </p>
      </DashCard>
    </div>
  );
}

/* --------------------------------- logs ---------------------------------- */

function LogsTab() {
  return (
    <DashCard title="Patient logs · last 7 days" className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {["When", "Type", "Detail", "Source"].map((h) => (
              <TableHead
                key={h}
                className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {LOGS.map((log, i) => (
            <TableRow key={i}>
              <TableCell className="px-3 text-xs text-ink-muted">
                {log.when}
              </TableCell>
              <TableCell className="px-3">
                <StatusPill tone={LOG_TONE[log.type]}>{log.type}</StatusPill>
              </TableCell>
              <TableCell className="px-3 text-sm">{log.detail}</TableCell>
              <TableCell className="px-3 text-xs text-ink-muted">
                {log.source}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashCard>
  );
}

/* ------------------------------- messages -------------------------------- */

function Bubble({ msg }: { msg: ThreadMessage }) {
  const fromPatient = msg.from === "patient";
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[70%]",
        fromPatient
          ? "rounded-bl-sm bg-paper-dark"
          : "ml-auto rounded-br-sm bg-mv-green text-white",
        msg.unread && "border-2 border-mv-green",
      )}
    >
      {msg.text}
      <div className="mt-1 text-[10px] opacity-75">
        {msg.time}
        {msg.unread && (
          <>
            {" "}
            · <strong>unread</strong>
          </>
        )}
      </div>
    </div>
  );
}

function MessagesTab() {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<ThreadMessage[]>([]);

  const violations = FORBIDDEN_CLINICAL_TERMS.filter((term) =>
    draft.toLowerCase().includes(term),
  );
  const blocked = violations.length > 0;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || blocked) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setSent((prev) => [
      ...prev,
      { from: "clinician", text, time: `Just now · ${time}` },
    ]);
    setDraft("");
  };

  return (
    <DashCard>
      <div className="space-y-2.5">
        {[...JANE_THREAD, ...sent].map((msg, i) => (
          <Bubble key={i} msg={msg} />
        ))}
      </div>

      {blocked && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-xs leading-relaxed text-danger"
        >
          <strong>Clinical-language check:</strong> prescriptive language
          detected (&ldquo;{violations.join("”, “")}&rdquo;). Clinical
          directives must go through a visit note — rephrase to send.
        </div>
      )}

      <form
        onSubmit={send}
        className="mt-4 flex gap-2 border-t border-line pt-4"
      >
        <Label htmlFor="jane-reply" className="sr-only">
          Reply to Jane
        </Label>
        <Input
          id="jane-reply"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Reply to Jane (clinical-language check on send)…"
          className="h-10"
          aria-invalid={blocked || undefined}
        />
        <Button
          type="submit"
          size="sm"
          disabled={blocked || !draft.trim()}
          className="h-10 bg-mv-green text-white hover:bg-mv-green/90"
        >
          Send
        </Button>
      </form>
    </DashCard>
  );
}

/* --------------------------------- notes --------------------------------- */

function NotesTab() {
  return (
    <DashCard title="Private clinician notes">
      <p className="-mt-1 mb-3 text-sm text-ink-muted">
        Visible only to assigned care team. Not part of patient-facing record.
      </p>
      <Label htmlFor="jane-notes" className="sr-only">
        Private clinician notes
      </Label>
      <Textarea
        id="jane-notes"
        defaultValue={NOTES_TEXT}
        placeholder="Type private notes here…"
        className="min-h-[220px] resize-y text-sm leading-relaxed"
      />
    </DashCard>
  );
}

/* ------------------------------ detail view ------------------------------ */

export function PatientDetailView({
  tab,
  onTabChange,
  onBack,
}: {
  tab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-mv-green"
      >
        <ArrowLeft className="size-3.5" /> Back to patients
      </button>

      <div className="mb-4 flex flex-wrap items-start gap-4 border-b border-line pb-4">
        <PtAvatar
          initials="JD"
          className="size-14 bg-mv-green text-lg"
        />
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight">
            Jane Doe{" "}
            <span className="font-normal text-ink-muted">
              · 47 · MRN 4082-A
            </span>
          </h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            Wegovy 0.5mg → 1.0mg titration · Week 8 · Started March 2026
          </p>
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast(
                "Schedule visit: opens calendar with Jane's available slots. (Demo placeholder.)",
              )
            }
          >
            Schedule visit
          </Button>
          <Button
            size="sm"
            className="bg-mv-green text-white hover:bg-mv-green/90"
            onClick={() => onTabChange("messages")}
          >
            Message Jane
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => onTabChange(v as DetailTab)}>
        <div className="overflow-x-auto">
          <TabsList className="w-max min-w-full justify-start bg-paper-dark sm:min-w-0">
            {(["overview", "logs", "messages", "notes"] as const).map((t) => (
              <TabsTrigger key={t} value={t} className="px-4 capitalize">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-3">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="logs" className="mt-3">
          <LogsTab />
        </TabsContent>
        {/* forceMount keeps the draft + sent replies alive across tab switches */}
        <TabsContent
          value="messages"
          forceMount
          className="mt-3 data-[state=inactive]:hidden"
        >
          <MessagesTab />
        </TabsContent>
        <TabsContent
          value="notes"
          forceMount
          className="mt-3 data-[state=inactive]:hidden"
        >
          <NotesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
