/**
 * Shared header row for each admin-console view: title + subtitle on the
 * left, optional action buttons on the right.
 */
export function ViewHeader({
  title,
  sub,
  actions,
}: {
  title: string;
  sub: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-0.5 text-sm text-ink-muted">{sub}</p>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
