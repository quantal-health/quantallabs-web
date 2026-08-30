"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashCard, ViewHeader } from "./bits";
import { NOT_LOGGED_LIST, TREND_REVIEW_LIST } from "./data";

function TaskCard({
  accent,
  title,
  meta,
  children,
}: {
  accent: "warning" | "green" | "success";
  title: string;
  meta: string;
  children?: React.ReactNode;
}) {
  return (
    <DashCard
      className={cn(
        "border-l-[3px]",
        accent === "warning" && "border-l-warning",
        accent === "green" && "border-l-mv-green",
        accent === "success" && "border-l-success",
      )}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-0.5 text-xs text-ink-muted">{meta}</p>
      {children}
    </DashCard>
  );
}

const RESOLUTIONS = {
  acknowledge: {
    toast: "Task acknowledged.",
    note: "Acknowledged — Jane's titration request stays on your queue until the visit.",
  },
  approve: {
    toast: "Marked for approval at the May 14 visit.",
    note: "Acknowledged — titration step-up will be approved at the May 14 visit.",
  },
  defer: {
    toast: "Deferred to the May 14 visit.",
    note: "Acknowledged — deferred to the May 14 visit.",
  },
} as const;

export function TasksView() {
  const [resolution, setResolution] = useState<keyof typeof RESOLUTIONS | null>(
    null,
  );

  const resolve = (key: keyof typeof RESOLUTIONS) => {
    setResolution(key);
    toast(RESOLUTIONS[key].toast);
  };

  return (
    <div>
      <ViewHeader
        title="Tasks"
        sub="Clinician work queue. Auto-generated from logs and scheduling rules."
      />

      <div className="space-y-3">
        <TaskCard
          accent={resolution ? "success" : "warning"}
          title="Review Jane Doe's titration request"
          meta="Patient asked about step-up to 1.0mg · scheduled visit May 14 · created yesterday"
        >
          {resolution ? (
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-success">
              <Check className="size-4 shrink-0" />
              {RESOLUTIONS[resolution].note}
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => resolve("acknowledge")}
              >
                Acknowledge
              </Button>
              <Button
                size="sm"
                className="bg-mv-green text-white hover:bg-mv-green/90"
                onClick={() => resolve("approve")}
              >
                Approve at visit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resolve("defer")}
              >
                Defer to visit
              </Button>
            </div>
          )}
        </TaskCard>

        <TaskCard
          accent="green"
          title="Weekly weight trend review for 12 patients (≥5% change)"
          meta="Auto-flagged · review their 30-day trends"
        >
          <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-ink-muted">
            {TREND_REVIEW_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast(
                  "In the full product this opens the 12-patient trend list. (Demo placeholder.)",
                )
              }
            >
              Open trend list
            </Button>
          </div>
        </TaskCard>

        <TaskCard
          accent="green"
          title="3 patients haven't logged in 7+ days"
          meta="Possible disengagement"
        >
          <ul className="mt-2.5 space-y-1.5 text-sm">
            {NOT_LOGGED_LIST.map((p) => (
              <li
                key={p.name}
                className="flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-xs text-ink-muted">— {p.detail}</span>
                <Button
                  variant="ghost"
                  size="xs"
                  className="text-mv-green hover:text-mv-green"
                  onClick={() => toast(`Check-in nudge sent to ${p.name}.`)}
                >
                  Nudge
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button
              size="sm"
              className="bg-mv-green text-white hover:bg-mv-green/90"
              onClick={() =>
                toast("Check-in message sent to Aaron, Robert, and Sienna.")
              }
            >
              Send check-in message
            </Button>
          </div>
        </TaskCard>
      </div>
    </div>
  );
}
