"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PtAvatar, ViewHeader } from "./bits";
import { INBOX, type InboxThread } from "./data";

type InboxFilter = "unread" | "replied" | "archived";
type InboxSort = "recent" | "unread-first" | "az";

const CHIP_CLASS =
  "h-8 shrink-0 rounded-full border border-line-strong bg-surface px-3.5 text-xs font-medium text-ink-muted hover:border-mv-green hover:bg-surface hover:text-ink data-[state=on]:border-mv-green data-[state=on]:bg-mv-green data-[state=on]:font-semibold data-[state=on]:text-white";

export function MessagesView({ onOpenJaneThread }: { onOpenJaneThread: () => void }) {
  // No default filter so all 7 threads are visible on load; chips narrow it.
  const [filter, setFilter] = useState<InboxFilter | "">("");
  const [sort, setSort] = useState<InboxSort>("recent");

  let threads: InboxThread[] =
    filter === "unread"
      ? INBOX.filter((t) => t.unread)
      : filter === "replied"
        ? INBOX.filter((t) => !t.unread)
        : filter === "archived"
          ? []
          : [...INBOX];

  if (sort === "unread-first") {
    threads = [...threads].sort((a, b) => Number(b.unread) - Number(a.unread));
  } else if (sort === "az") {
    threads = [...threads].sort((a, b) => a.name.localeCompare(b.name));
  }

  const openThread = (t: InboxThread) => {
    if (t.patientId === "jane") onOpenJaneThread();
    else
      toast("Only Jane Doe is fully populated in this demo", {
        description: `In the full product this would open ${t.name}'s message thread.`,
      });
  };

  return (
    <div>
      <ViewHeader title="Messages" sub="Inbox across all 60 patients." />

      <ToggleGroup
        type="single"
        spacing={2}
        value={filter}
        onValueChange={(v) => setFilter(v as InboxFilter | "")}
        aria-label="Filter message threads"
        className="mb-4 w-full flex-wrap justify-start"
      >
        <ToggleGroupItem value="unread" className={CHIP_CLASS}>
          Unread (4)
        </ToggleGroupItem>
        <ToggleGroupItem value="replied" className={CHIP_CLASS}>
          Replied
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" className={CHIP_CLASS}>
          Archived
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="mb-3.5 flex items-center gap-2.5">
        <Label htmlFor="inbox-sort" className="text-xs text-ink-muted">
          Sort:
        </Label>
        <Select value={sort} onValueChange={(v) => setSort(v as InboxSort)}>
          <SelectTrigger id="inbox-sort" size="sm" className="w-44 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most recent</SelectItem>
            <SelectItem value="unread-first">Unread first</SelectItem>
            <SelectItem value="az">By patient (A–Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        {threads.length === 0 && (
          <p className="px-4 py-8 text-center text-sm italic text-ink-muted">
            No archived threads in this demo.
          </p>
        )}
        {threads.map((t) => (
          <button
            key={t.patientId}
            onClick={() => openThread(t)}
            className={cn(
              "flex w-full items-center gap-3 border-b border-line px-4 py-3 text-left transition-colors last:border-b-0",
              t.unread
                ? "bg-info/5 hover:bg-info/10"
                : "hover:bg-paper-light",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "size-2 shrink-0 rounded-full",
                t.unread ? "bg-mv-green" : "bg-transparent",
              )}
            />
            <PtAvatar initials={t.initials} className={t.avatarClass} />
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  "block text-sm",
                  t.unread ? "font-bold" : "font-semibold",
                )}
              >
                {t.name}
                {t.unread && <span className="sr-only"> (unread)</span>}
              </span>
              <span
                className={cn(
                  "block truncate text-xs",
                  t.unread ? "font-medium text-ink" : "text-ink-muted",
                )}
              >
                {t.preview}
              </span>
            </span>
            <span className="shrink-0 text-[11px] text-ink-soft">{t.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
