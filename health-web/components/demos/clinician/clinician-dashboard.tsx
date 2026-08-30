"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChartColumn,
  MessageSquare,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessagesView } from "./messages-view";
import { PatientDetailView, type DetailTab } from "./patient-detail-view";
import { ReportsView } from "./reports-view";
import { RosterView } from "./roster-view";
import { SettingsView } from "./settings-view";
import { TasksView } from "./tasks-view";

type DashView =
  | "patients"
  | "patient-detail"
  | "messages"
  | "tasks"
  | "reports"
  | "settings";

type NavItem = {
  view: Exclude<DashView, "patient-detail">;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

const WORKSPACE_NAV: NavItem[] = [
  { view: "patients", label: "Patients", icon: <Users />, badge: 60 },
  { view: "messages", label: "Messages", icon: <MessageSquare />, badge: 4 },
  { view: "tasks", label: "Tasks", icon: <SquareCheckBig />, badge: 3 },
  { view: "reports", label: "Reports", icon: <ChartColumn /> },
];

const PRACTICE_NAV: NavItem[] = [
  { view: "settings", label: "Settings", icon: <Settings /> },
];

function MountainviewMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="var(--color-mv-green)" />
      <path d="M8 22 L12 14 L16 18 L20 10 L24 22 Z" fill="white" />
    </svg>
  );
}

function DashHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line bg-surface px-4 py-3 sm:px-5">
      <p className="flex items-center gap-2.5 text-[15px] font-bold text-mv-green">
        <MountainviewMark />
        Mountainview Medicine
        <span className="hidden text-[13px] font-normal text-ink-muted sm:inline">
          · Provider Portal
        </span>
      </p>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-[13px] font-semibold leading-tight">
            Dr. Sarah Chen, MD
          </p>
          <p className="text-[11px] text-ink-muted">
            Founder · Lead Clinician
          </p>
        </div>
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mv-green text-xs font-semibold text-white"
        >
          SC
        </span>
        <button
          className="text-xs text-ink-muted transition-colors hover:text-mv-green"
          onClick={() =>
            toast("Sign out: returns to the sign-in page. (Demo placeholder.)")
          }
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

function SidebarLink({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors min-[820px]:mb-0.5 min-[820px]:w-full [&_svg]:size-4 [&_svg]:shrink-0",
        active
          ? "bg-mv-green/12 font-semibold text-ink [&_svg]:text-mv-green"
          : "text-ink-muted hover:bg-paper-dark hover:text-ink",
      )}
    >
      {item.icon}
      {item.label}
      {item.badge !== undefined && (
        <span className="rounded-full bg-mv-green px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white min-[820px]:ml-auto">
          {item.badge}
        </span>
      )}
    </button>
  );
}

function Sidebar({
  view,
  onNavigate,
}: {
  view: DashView;
  onNavigate: (view: NavItem["view"]) => void;
}) {
  // "patient-detail" lives under the Patients section of the sidebar.
  const activeNav = view === "patient-detail" ? "patients" : view;

  return (
    <nav
      aria-label="Provider portal"
      className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-line bg-paper-light px-2 py-2 min-[820px]:w-[220px] min-[820px]:flex-col min-[820px]:items-stretch min-[820px]:gap-0 min-[820px]:overflow-visible min-[820px]:border-b-0 min-[820px]:border-r min-[820px]:px-2 min-[820px]:py-4"
    >
      <p className="hidden px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-ink-soft min-[820px]:block">
        Workspace
      </p>
      {WORKSPACE_NAV.map((item) => (
        <SidebarLink
          key={item.view}
          item={item}
          active={activeNav === item.view}
          onSelect={() => onNavigate(item.view)}
        />
      ))}
      <p className="hidden px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft min-[820px]:block">
        Practice
      </p>
      {PRACTICE_NAV.map((item) => (
        <SidebarLink
          key={item.view}
          item={item}
          active={activeNav === item.view}
          onSelect={() => onNavigate(item.view)}
        />
      ))}
    </nav>
  );
}

/**
 * The interactive Mountainview Medicine provider portal — dashboard chrome in
 * theme tokens (first-class dark), tenant green as the only accent. Renders
 * inside a BrowserFrame on /demo/clinician.
 */
export function ClinicianDashboard() {
  const [view, setView] = useState<DashView>("patients");
  const [detailTab, setDetailTab] = useState<DetailTab>("overview");
  const reduced = useReducedMotion();

  const openJane = (tab: DetailTab = "overview") => {
    setDetailTab(tab);
    setView("patient-detail");
  };

  return (
    <div className="bg-paper-light text-ink">
      <DashHeader />
      <div className="flex min-h-[720px] flex-col min-[820px]:flex-row">
        <Sidebar view={view} onNavigate={setView} />
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
            >
              {view === "patients" && (
                <RosterView onOpenJane={() => openJane()} />
              )}
              {view === "patient-detail" && (
                <PatientDetailView
                  tab={detailTab}
                  onTabChange={setDetailTab}
                  onBack={() => setView("patients")}
                />
              )}
              {view === "messages" && (
                <MessagesView onOpenJaneThread={() => openJane("messages")} />
              )}
              {view === "tasks" && <TasksView />}
              {view === "reports" && <ReportsView />}
              {view === "settings" && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
