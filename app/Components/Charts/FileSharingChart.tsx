"use client";

import { useMemo, useState } from "react";
import type { MonthlyFileShare } from "../Types/widget";

interface FileSharingChartProps {
  data: MonthlyFileShare[];
}

type SeriesKey = "public" | "linkOnly" | "withinOrg";

const SERIES: { key: SeriesKey; label: string; color: string }[] = [
  { key: "public", label: "Public", color: "#4c6fff" },
  { key: "linkOnly", label: "Anyone with link", color: "#7f95ff" },
  { key: "withinOrg", label: "Within Organisation", color: "#3147c6" },
];

const monthLabels: Record<string, string> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

const topRoundedBarPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string => {
  if (height <= 0) {
    return "";
  }

  const r = Math.max(0, Math.min(radius, width / 2, height));
  const right = x + width;
  const bottom = y + height;

  return [
    `M${x},${bottom}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${right - r},${y}`,
    `Q${right},${y} ${right},${y + r}`,
    `L${right},${bottom}`,
    "Z",
  ].join(" ");
};

export default function FileSharingChart({ data }: FileSharingChartProps) {
  const width = 780;
  const height = 252;
  const paddingTop = 16;
  const paddingRight = 10;
  const paddingBottom = 34;
  const paddingLeft = 30;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;
  const yMax = 100;
  const ticks = [100, 80, 60, 40, 20, 0];

  const defaultIndex = Math.max(
    0,
    data.findIndex((item) => item.id === "jun"),
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const layout = useMemo(() => {
    const groupWidth = innerWidth / Math.max(data.length, 1);
    const barWidth = Math.min(16, Math.max(10, groupWidth * 0.22));
    const barGap = Math.max(2, barWidth * 0.2);
    const totalBarsWidth = SERIES.length * barWidth + (SERIES.length - 1) * barGap;

    return data.map((item, index) => {
      const groupX = paddingLeft + index * groupWidth;
      const barsStartX = groupX + (groupWidth - totalBarsWidth) / 2;
      const centerX = groupX + groupWidth / 2;

      return {
        item,
        index,
        centerX,
        hitX: groupX,
        hitWidth: groupWidth,
        bars: SERIES.map((series, seriesIndex) => {
          const value = item[series.key];
          const barHeight = (value / yMax) * innerHeight;
          const x = barsStartX + seriesIndex * (barWidth + barGap);
          const y = paddingTop + innerHeight - barHeight;

          return { ...series, value, x, y, barWidth, barHeight };
        }),
      };
    });
  }, [data, innerHeight, innerWidth, paddingLeft, paddingTop]);

  const activeGroup = layout[activeIndex];
  const activePublic = activeGroup?.bars.find((bar) => bar.key === "public");

  return (
    <>
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[220px] w-full"
          role="img"
          aria-label="Monthly file sharing grouped bar chart"
        >
          {ticks.map((tick) => {
            const y = paddingTop + innerHeight - (tick / yMax) * innerHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  x2={width - paddingRight}
                  y1={y}
                  y2={y}
                  stroke="#d8deed"
                  strokeDasharray="5 7"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#94a0b8] text-[10px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {layout.map((group) => (
            <g key={group.item.id}>
              {group.bars.map((bar) => (
                <path
                  key={bar.key}
                  d={topRoundedBarPath(
                    bar.x,
                    bar.y,
                    bar.barWidth,
                    bar.barHeight,
                    bar.barWidth / 2,
                  )}
                  fill={bar.color}
                />
              ))}

              <text
                x={group.centerX}
                y={height - 8}
                textAnchor="middle"
                className="fill-[#7b8394] text-[10px]"
              >
                {group.item.month}
              </text>

              <rect
                x={group.hitX}
                y={paddingTop}
                width={group.hitWidth}
                height={innerHeight}
                fill="transparent"
                onMouseEnter={() => setActiveIndex(group.index)}
              />
            </g>
          ))}
        </svg>

        {activeGroup && activePublic ? (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-[#c8cfdd] bg-[#aeb6c5]/95 px-2 py-1 text-[10px] text-white shadow-sm"
            style={{
              left: `${(activeGroup.centerX / width) * 100}%`,
              top: `${Math.max(8, ((activePublic.y - 44) / height) * 100)}%`,
            }}
          >
            <p className="font-semibold tracking-wide">
              {monthLabels[activeGroup.item.id] ?? activeGroup.item.month}
            </p>
            <p className="text-[10px] text-[#eef2ff]">
              Public:{activeGroup.item.public}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-[#6b7280]">
        {SERIES.map((series) => (
          <span key={series.key} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: series.color }}
            />
            {series.label}
          </span>
        ))}
      </div>
    </>
  );
}
