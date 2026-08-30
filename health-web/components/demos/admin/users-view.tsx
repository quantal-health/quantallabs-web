"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusPill } from "@/components/demos/status-pill";
import { cn } from "@/lib/utils";
import { USERS, USER_STATUS_TONE, type AdminUser } from "./data";
import { ViewHeader } from "./view-header";

function Avatar({ user }: { user: AdminUser }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white",
        user.avatarClass,
      )}
    >
      {user.initials}
    </span>
  );
}

function UserName({ user }: { user: AdminUser }) {
  return (
    <span className="text-sm font-medium">
      {user.name}
      {user.isYou && (
        <span className="ml-1 text-xs font-normal text-ink-muted">(you)</span>
      )}
    </span>
  );
}

export function UsersView() {
  return (
    <div>
      <ViewHeader
        title="User Management"
        sub="Manage clinic staff, clinicians, and admins. Roles control what each user sees."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("Manage roles — opens role matrix")}
            >
              Manage roles
            </Button>
            <Button
              size="sm"
              className="bg-mv-green text-white hover:bg-mv-green/85"
              onClick={() =>
                toast("Invite sent (demo) — would email an invitation link")
              }
            >
              Invite user
            </Button>
          </>
        }
      />

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-line bg-surface shadow-soft md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-paper-light hover:bg-paper-light">
              {["User", "Role", "Email", "Last active", "Status"].map(
                (head) => (
                  <TableHead
                    key={head}
                    className="px-4 text-xs font-semibold uppercase tracking-wider text-ink-muted"
                  >
                    {head}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.email} className="border-line">
                <TableCell className="px-4 py-3">
                  <span className="flex items-center gap-2.5">
                    <Avatar user={user} />
                    <UserName user={user} />
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm">
                  {user.role}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-ink-muted">
                  {user.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-ink-muted">
                  {user.lastActive}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusPill tone={USER_STATUS_TONE[user.status]}>
                    {user.status}
                  </StatusPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {USERS.map((user) => (
          <div
            key={user.email}
            className="rounded-xl border border-line bg-surface p-4 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <Avatar user={user} />
              <div className="min-w-0 flex-1">
                <UserName user={user} />
                <p className="text-xs text-ink-muted">{user.role}</p>
              </div>
              <StatusPill tone={USER_STATUS_TONE[user.status]}>
                {user.status}
              </StatusPill>
            </div>
            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="shrink-0 text-ink-muted">Email</dt>
                <dd className="truncate font-medium">{user.email}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="shrink-0 text-ink-muted">Last active</dt>
                <dd className="font-medium">{user.lastActive}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-ink-muted">
        Roles available: <strong className="text-ink">admin</strong> ·{" "}
        <strong className="text-ink">clinician</strong> ·{" "}
        <strong className="text-ink">ops</strong> ·{" "}
        <strong className="text-ink">view-only</strong>.
      </p>
    </div>
  );
}
