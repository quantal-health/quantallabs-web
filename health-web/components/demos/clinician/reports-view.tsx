"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { CountUp } from "@/components/motion/count-up";
import { DashCard, MetricRow, ViewHeader } from "./bits";
import {
  COMPLIANCE,
  DRUG_OUTCOMES,
  PANEL_META,
  PANEL_SLICES,
  WORKLOAD,
} from "./data";

const TOOLTIP_STYLE: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  boxShadow: "var(--shadow-card)",
  fontSize: 12,
  color: "var(--ink)",
};

function OutcomesCard() {
  return (
    <DashCard title="Patient outcomes · avg weight change at week 8">
      <div
        role="img"
        aria-label="Bar chart of average weight change at week 8 by drug: Wegovy minus 4.8 percent, Ozempic minus 4.1 percent, Zepbound minus 5.4 percent, Mounjaro minus 4.6 percent, Saxenda minus 2.6 percent. 60 patients, average loss 4.4 percent."
      >
        <ResponsiveContainer width="100%" height={210}>
          <BarChart
            data={DRUG_OUTCOMES}
            margin={{ top: 22, right: 8, bottom: 0, left: 8 }}
          >
            <XAxis
              dataKey="drug"
              tickLine={false}
              axisLine={{ stroke: "var(--line)" }}
              tick={{ fill: "var(--ink-muted)", fontSize: 11 }}
              interval={0}
            />
            <YAxis hide domain={[0, 6.2]} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={{ color: "var(--ink-muted)", fontWeight: 600 }}
              cursor={{ fill: "var(--paper-dark)", opacity: 0.45 }}
              formatter={(value) => [`−${value}% at week 8`, "Avg change"]}
            />
            <Bar
              dataKey="loss"
              fill="var(--color-mv-green)"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            >
              <LabelList
                dataKey="label"
                position="top"
                fill="var(--ink)"
                fontSize={11}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        n = 60. Avg loss 4.4% at week 8. Anonymized aggregates only.
      </p>
    </DashCard>
  );
}

function ComplianceCard() {
  return (
    <DashCard title="Compliance metrics">
      <div className="space-y-4">
        {COMPLIANCE.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-ink-muted">{m.label}</span>
              <span className="shrink-0 font-mono font-semibold tabular-nums">
                {m.num} / {m.den} (<CountUp to={m.pct} />
                %)
              </span>
            </div>
            <Progress
              value={m.pct}
              aria-label={`${m.label}: ${m.num} of ${m.den} patients (${m.pct}%)`}
              className={cn(
                "mt-1.5 h-1.5 bg-paper-dark",
                m.warn
                  ? "[&>[data-slot=progress-indicator]]:bg-warning"
                  : "[&>[data-slot=progress-indicator]]:bg-mv-green",
              )}
            />
          </div>
        ))}
      </div>
    </DashCard>
  );
}

function WorkloadCard() {
  return (
    <DashCard title="Provider workload — Dr. Chen">
      {WORKLOAD.map((row) => (
        <MetricRow
          key={row.label}
          label={row.label}
          value={
            row.countTo !== undefined ? <CountUp to={row.countTo} /> : row.value
          }
        />
      ))}
    </DashCard>
  );
}

function PanelCard() {
  return (
    <DashCard title="Patient panel composition">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div
          role="img"
          aria-label="Donut chart of the patient panel: 60 active patients — 38 at maintenance dose, 18 on titration, plus 4 pending verification. Average 14.2 weeks on therapy."
          className="relative h-[176px] w-[176px] shrink-0"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Pie
                data={PANEL_SLICES}
                dataKey="value"
                nameKey="name"
                innerRadius={56}
                outerRadius={82}
                paddingAngle={2}
                stroke="var(--surface)"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {PANEL_SLICES.map((slice) => (
                  <Cell key={slice.name} fill={slice.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-semibold">
              <CountUp to={60} />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              patients
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1 basis-52">
          <MetricRow label={PANEL_META[0].label} value={PANEL_META[0].value} />
          {PANEL_SLICES.map((slice) => (
            <MetricRow
              key={slice.name}
              label={slice.name}
              value={
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-2.5 rounded-[3px]"
                    style={{ background: slice.color }}
                  />
                  {slice.value}
                </span>
              }
            />
          ))}
          <MetricRow label={PANEL_META[1].label} value={PANEL_META[1].value} />
        </div>
      </div>
    </DashCard>
  );
}

export function ReportsView() {
  return (
    <div>
      <ViewHeader
        title="Reports"
        sub="Aggregate dashboards across all 60 Mountainview Medicine patients."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <OutcomesCard />
        <ComplianceCard />
        <WorkloadCard />
        <PanelCard />
      </div>
    </div>
  );
}
