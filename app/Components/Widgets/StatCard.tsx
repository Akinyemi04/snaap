"use client";

import type { SvgIconComponent } from "@mui/icons-material";
import { WidgetTone } from "../Types/widget";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  tone: WidgetTone;
  trend: number[];
  subtitle?: string;
  compact?: boolean;
  embedded?: boolean;
  icon?: SvgIconComponent;
}

const toneStyles: Record<
  WidgetTone,
  { text: string; line: string; fill: string }
> = {
  positive: {
    text: "text-[#22c55e]",
    line: "#22c55e",
    fill: "rgba(34, 197, 94, 0.15)",
  },
  negative: {
    text: "text-[#ef4444]",
    line: "#ef4444",
    fill: "rgba(239, 68, 68, 0.15)",
  },
  neutral: {
    text: "text-[#6b7280]",
    line: "#64748b",
    fill: "rgba(100, 116, 139, 0.12)",
  },
};

const toSparkPoints = (
  values: number[],
  width: number,
  height: number,
): string => {
  if (values.length === 0) {
    return "";
  }

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = Math.max(maxValue - minValue, 1);

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * width;
      const y = height - ((value - minValue) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
};

const toAreaPath = (
  values: number[],
  width: number,
  height: number,
): string => {
  const points = toSparkPoints(values, width, height);
  if (!points) {
    return "";
  }

  const firstPoint = points.split(" ")[0];
  const lastPoint = points.split(" ").at(-1);

  if (!firstPoint || !lastPoint) {
    return "";
  }

  const [, firstY] = firstPoint.split(",");
  const [lastX] = lastPoint.split(",");

  return `M0,${height} L0,${firstY} ${points
    .split(" ")
    .map((point) => `L${point}`)
    .join(" ")} L${lastX},${height} Z`;
};

export default function StatCard({
  title,
  value,
  change,
  tone,
  trend,
  subtitle = "Compared to last week",
  compact = false,
  embedded = false,
  icon: Icon,
}: StatCardProps) {
  const toneStyle = toneStyles[tone];
  const arrow = tone === "positive" ? "↑" : tone === "negative" ? "↓" : "•";
  const sparklinePoints = toSparkPoints(trend, 180, compact ? 48 : 56);
  const sparklineArea = toAreaPath(trend, 180, compact ? 48 : 56);
  const productivityTitles = new Set([
    "Hours Productivity",
    "Days Activity",
    "Web Activity",
  ]);
  const valueWithUnit = value.match(/^([\d,]+)\s+(.+)$/);
  const styleUnitText =
    compact && productivityTitles.has(title) && Boolean(valueWithUnit);
  const valueTextClass = styleUnitText
    ? "text-lg font-semibold"
    : compact
      ? "text-xl"
      : "text-3xl";

  return (
    <article
      className={`flex items-start gap-2 ${
        embedded
          ? compact
            ? "p-3"
            : "p-4"
          : `h-full rounded-2xl border border-[#e7e8ed] bg-white ${
              compact ? "p-4" : "p-5"
            }`
      }`}
    >
      <section className="min-w-0 flex-1 pr-2">
        <div className="mb-2 flex items-start gap-2 text-sm font-medium text-[#4b5563]">
          {Icon ? (
            <span className="grid h-5 w-5 place-items-center rounded-md bg-[#f3f4f6] text-[#4b5563]">
              <Icon sx={{ fontSize: 14 }} />
            </span>
          ) : null}
          <span className="lg:text-nowrap">{title}</span>
        </div>

        <div className="mb-3 flex items-center gap-3">
          <strong className={`${valueTextClass} text-[#111827]`}>
            {styleUnitText && valueWithUnit ? (
              <>
                {valueWithUnit[1]}{" "}
                <span className="text-sm font-medium text-[#4b5563]">
                  {valueWithUnit[2]}
                </span>
              </>
            ) : (
              value
            )}
          </strong>
          <span
            className={`rounded-full bg-[#f8fafc] px-1 py-1 text-xs font-semibold text-nowrap ${toneStyle.text}`}
          >
            {arrow} {change}
          </span>
        </div>

        <p className="mb-2 text-xs text-[#6b7280]">{subtitle}</p>
      </section>

      <svg
        className="w-[40%] min-w-[108px] max-w-[170px] flex-none self-end"
        width="180"
        height={compact ? 52 : 60}
        viewBox={`0 0 180 ${compact ? 48 : 56}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${title} trend line`}
      >
        <path d={sparklineArea} fill={toneStyle.fill} />
        <polyline
          points={sparklinePoints}
          fill="none"
          stroke={toneStyle.line}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </article>
  );
}
