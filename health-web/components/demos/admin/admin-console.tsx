"use client";

import { useCallback, useState } from "react";
import {
  LayoutGrid,
  LifeBuoy,
  Palette,
  Settings,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { BrowserFrame } from "@/components/marketing/device-mock";
import { StatusPill } from "@/components/demos/status-pill";
import { cn } from "@/lib/utils";
import {
  BRANDING_DEFAULTS,
  MODULES,
  TICKETS,
  type AdminModule,
  type TicketMessage,
} from "./data";
import { ModulesView } from "./modules-view";
import { BrandingView, type BrandingState } from "./branding-view";
import { UsersView } from "./users-view";
import { TicketsView } from "./tickets-view";
import { SettingsView } from "./settings-view";

const VIEWS = [
  { id: "modules", label: "Tier & Modules", icon: LayoutGrid },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "users", label: "User Management", icon: Users },
  { id: "tickets", label: "Support Tickets", icon: LifeBuoy },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

const INITIAL_BRANDING: BrandingState = {
  ...BRANDING_DEFAULTS,
  primaryHex: BRANDING_DEFAULTS.primary,
  secondaryHex: BRANDING_DEFAULTS.secondary,
};

/**
 * Interactive admin-console demo for Mountainview Medicine. All mutable
 * state (modules, branding, ticket threads) lives here so edits survive
 * switching between views. Console chrome uses theme tokens; only the
 * in-preview patient phone stays light tenant-branded.
 */
export function AdminConsole() {
  const reduced = useReducedMotion();
  const [view, setView] = useState<ViewId>("modules");

  // Tier & Modules
  const [modules, setModules] = useState<AdminModule[]>(() =>
    MODULES.map((m) => ({ ...m })),
  );
  const [aiCap, setAiCap] = useState("100");
  const [aiPosture, setAiPosture] = useState("both");

  const patchModule = useCallback(
    (id: string, patch: Partial<AdminModule>) => {
      setModules((ms) =>
        ms.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      );
    },
    [],
  );

  // Branding — `brandingVersion` bumps on every edit to drive the preview's
  // scale pulse.
  const [branding, setBranding] = useState<BrandingState>(INITIAL_BRANDING);
  const [brandingVersion, setBrandingVersion] = useState(0);

  const patchBranding = useCallback((patch: Partial<BrandingState>) => {
    setBranding((b) => ({ ...b, ...patch }));
    setBrandingVersion((v) => v + 1);
  }, []);

  const resetBranding = useCallback(() => {
    setBranding(INITIAL_BRANDING);
    setBrandingVersion((v) => v + 1);
    toast("Branding reset to Mountainview Medicine defaults");
  }, []);

  // Support tickets — replies append to the thread.
  const [threads, setThreads] = useState<Record<string, TicketMessage[]>>(
    () => Object.fromEntries(TICKETS.map((t) => [t.id, [...t.messages]])),
  );

  const addReply = useCallback((ticketId: string, body: string) => {
    setThreads((prev) => ({
      ...prev,
      [ticketId]: [
        ...(prev[ticketId] ?? []),
        { author: "Maria Rodriguez (admin)", time: "Just now", body },
      ],
    }));
    toast("Reply sent");
  }, []);

  return (
    <BrowserFrame
      url="mountainview-medicine.quantal.health/admin"
      className="overflow-clip"
    >
      <div className="grid md:min-h-[720px] md:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="flex flex-col border-b border-line bg-paper-light md:border-b-0 md:border-r">
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-4">
            <span
              aria-hidden
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mv-green text-sm font-bold text-white"
            >
              M
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">
                Mountainview Medicine
              </p>
              <StatusPill tone="quantum" className="mt-1">
                PRO
              </StatusPill>
            </div>
          </div>
          <nav
            aria-label="Admin console sections"
            className="flex gap-1 overflow-x-auto p-2 md:flex-col md:gap-0.5 md:overflow-visible md:px-0 md:py-2"
          >
            {VIEWS.map((v) => {
              const active = v.id === view;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors md:w-full md:rounded-none md:border-l-[3px] md:border-transparent md:px-4 md:py-2.5",
                    active
                      ? "bg-mv-green/10 font-semibold text-mv-green md:border-mv-green md:bg-surface"
                      : "text-ink-muted hover:bg-paper-dark/60 hover:text-ink md:hover:bg-surface",
                  )}
                >
                  <v.icon aria-hidden className="size-4 opacity-85" />
                  {v.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Active view — 200ms fade on switch */}
        <div className="min-w-0 p-4 sm:p-5 md:p-7">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: reduced ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {view === "modules" && (
              <ModulesView
                modules={modules}
                onPatch={patchModule}
                cap={aiCap}
                onCapChange={setAiCap}
                posture={aiPosture}
                onPostureChange={setAiPosture}
              />
            )}
            {view === "branding" && (
              <BrandingView
                branding={branding}
                version={brandingVersion}
                onPatch={patchBranding}
                onReset={resetBranding}
              />
            )}
            {view === "users" && <UsersView />}
            {view === "tickets" && (
              <TicketsView threads={threads} onReply={addReply} />
            )}
            {view === "settings" && <SettingsView />}
          </motion.div>
        </div>
      </div>
    </BrowserFrame>
  );
}
