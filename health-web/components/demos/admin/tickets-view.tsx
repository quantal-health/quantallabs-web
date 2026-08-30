"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusPill } from "@/components/demos/status-pill";
import { cn } from "@/lib/utils";
import { TICKETS, type Ticket, type TicketMessage } from "./data";
import { ViewHeader } from "./view-header";

const EASE_ENTRANCE = [0.22, 1, 0.36, 1] as const;

function TicketRow({
  ticket,
  messages,
  open,
  onToggle,
  onReply,
}: {
  ticket: Ticket;
  messages: readonly TicketMessage[];
  open: boolean;
  onToggle: () => void;
  onReply: (id: string, body: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const reduced = useReducedMotion();
  const canReply = ticket.actions.some((a) => a.type === "reply");

  function sendReply() {
    const body = draft.trim();
    if (!body) return;
    onReply(ticket.id, body);
    setDraft("");
  }

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`thread-${ticket.id}`}
        className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-left transition-colors hover:bg-paper-light sm:px-5"
      >
        <span className="font-mono text-xs text-ink-muted">#{ticket.num}</span>
        <span className="min-w-0 flex-1 text-sm font-medium">
          {ticket.subject}
        </span>
        <StatusPill tone={ticket.tone}>{ticket.status}</StatusPill>
        <span className="hidden text-xs text-ink-muted md:inline">
          {ticket.submittedBy}
        </span>
        <span className="hidden text-xs text-ink-muted sm:inline">
          {ticket.time}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-ink-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`thread-${ticket.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.26,
              ease: EASE_ENTRANCE,
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-line bg-paper-light px-4 py-4 sm:px-5">
              <h3 className="text-sm font-bold">
                #{ticket.num} — {ticket.subject}
              </h3>
              <p className="mt-0.5 text-xs text-ink-muted md:hidden">
                {ticket.submittedBy} · {ticket.time}
              </p>
              <div className="mt-3 space-y-2">
                {messages.map((msg, i) => (
                  <div
                    key={`${msg.author}-${i}`}
                    className="rounded-lg border border-line bg-surface px-3 py-2.5"
                  >
                    <p className="text-xs font-semibold text-ink-muted">
                      {msg.author} · {msg.time}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed">
                      {msg.body}
                    </p>
                  </div>
                ))}
              </div>
              {canReply && (
                <>
                  <Label htmlFor={`reply-${ticket.id}`} className="sr-only">
                    Reply to ticket #{ticket.num}
                  </Label>
                  <Textarea
                    id={`reply-${ticket.id}`}
                    placeholder="Reply to ticket..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="mt-3 bg-surface"
                    rows={2}
                  />
                </>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {ticket.actions.map((action) =>
                  action.type === "reply" ? (
                    <Button
                      key={action.label}
                      size="sm"
                      disabled={!draft.trim()}
                      className="bg-mv-green text-white hover:bg-mv-green/85"
                      onClick={sendReply}
                    >
                      {action.label}
                    </Button>
                  ) : (
                    <Button
                      key={action.label}
                      size="sm"
                      variant="outline"
                      onClick={() => toast(action.message)}
                    >
                      {action.label}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TicketsView({
  threads,
  onReply,
}: {
  threads: Record<string, TicketMessage[]>;
  onReply: (id: string, body: string) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <ViewHeader
        title="Support tickets — your clinic"
        sub="Tickets submitted by patients, clinicians, and staff at Mountainview Medicine. Click to expand thread."
        actions={
          <Button
            size="sm"
            className="bg-mv-green text-white hover:bg-mv-green/85"
            onClick={() =>
              toast("New ticket form — admin can submit on behalf of a patient")
            }
          >
            New ticket
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
        {TICKETS.map((ticket) => (
          <TicketRow
            key={ticket.id}
            ticket={ticket}
            messages={threads[ticket.id] ?? ticket.messages}
            open={openId === ticket.id}
            onToggle={() =>
              setOpenId((id) => (id === ticket.id ? null : ticket.id))
            }
            onReply={onReply}
          />
        ))}
      </div>
    </div>
  );
}
