"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WEIGHT_SERIES } from "./data";

const TOOLTIP_STYLE: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  boxShadow: "var(--shadow-card)",
  fontSize: 12,
  color: "var(--ink)",
};

/** Jane's 8-week weight trend — single mv-green series over theme tokens. */
export function JaneWeightChart() {
  return (
    <div
      role="img"
      aria-label="Area chart of Jane Doe's weight over 8 weeks: 218.4 pounds at week 1, when Wegovy 0.5 milligrams started, declining steadily to 207.6 pounds at week 8 — down 10.8 pounds."
    >
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={WEIGHT_SERIES}
          margin={{ top: 18, right: 16, bottom: 0, left: 0 }}
        >
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={{ stroke: "var(--line)" }}
            tick={{ fill: "var(--ink-muted)", fontSize: 11 }}
          />
          <YAxis
            domain={[204, 220]}
            ticks={[205, 210, 215, 220]}
            tickLine={false}
            axisLine={false}
            width={36}
            tick={{ fill: "var(--ink-muted)", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={{ color: "var(--ink-muted)", fontWeight: 600 }}
            cursor={{ stroke: "var(--line-strong)" }}
          />
          <ReferenceLine
            x="W1"
            stroke="var(--info)"
            strokeDasharray="3 3"
            label={{
              value: "Wegovy 0.5mg start",
              position: "insideTopLeft",
              fill: "var(--info)",
              fontSize: 10,
            }}
          />
          <Area
            type="monotone"
            dataKey="lb"
            name="Weight"
            unit=" lb"
            stroke="var(--color-mv-green)"
            strokeWidth={2}
            fill="var(--color-mv-green)"
            fillOpacity={0.12}
            dot={{
              r: 3.5,
              fill: "var(--color-mv-green)",
              stroke: "var(--surface)",
              strokeWidth: 2,
            }}
            activeDot={{ r: 5, stroke: "var(--surface)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
