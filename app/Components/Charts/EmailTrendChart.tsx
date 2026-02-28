"use client";

import { useMemo, useState } from "react";
import type { EmailTrendPoint } from "../Types/widget";

interface EmailTrendChartProps {
  points: EmailTrendPoint[];
}

interface ChartPoint {
  x: number;
  y: number;
  data: EmailTrendPoint;
}

const monthLabelMap: Record<string, string> = {
  mar: "MARCH",
};

const toSmoothPath = (coords: ChartPoint[]): string => {
  if (coords.length === 0) {
    return "";
  }

  if (coords.length === 1) {
    return `M${coords[0].x},${coords[0].y}`;
  }

  let path = `M${coords[0].x},${coords[0].y}`;

  for (let index = 0; index < coords.length - 1; index += 1) {
    const p0 = coords[index - 1] ?? coords[index];
    const p1 = coords[index];
    const p2 = coords[index + 1];
    const p3 = coords[index + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }

  return path;
};

export default function EmailTrendChart({ points }: EmailTrendChartProps) {
  const width = 760;
  const height = 230;
  const paddingTop = 12;
  const paddingRight = 12;
  const paddingBottom = 28;
  const paddingLeft = 36;
  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;
  const yTicks = [7000, 5000, 3000, 1000];
  const yMax = 7000;
  const defaultActiveIndex = Math.max(
    0,
    points.findIndex((point) => point.id === "jul"),
  );
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const chartPoints = useMemo<ChartPoint[]>(() => {
    return points.map((point, index) => {
      const x =
        paddingLeft +
        (index / Math.max(points.length - 1, 1)) * Math.max(plotWidth, 1);
      const y =
        paddingTop + (1 - Math.min(point.sent, yMax) / yMax) * Math.max(plotHeight, 1);
      return { x, y, data: point };
    });
  }, [paddingLeft, paddingTop, plotHeight, plotWidth, points]);

  const linePath = useMemo(() => toSmoothPath(chartPoints), [chartPoints]);

  const areaPath = useMemo(() => {
    if (chartPoints.length === 0) {
      return "";
    }

    const first = chartPoints[0];
    const last = chartPoints[chartPoints.length - 1];
    return `${linePath} L${last.x},${paddingTop + plotHeight} L${first.x},${
      paddingTop + plotHeight
    } Z`;
  }, [chartPoints, linePath, paddingTop, plotHeight]);

  const activePoint = chartPoints[activeIndex];
  const activeData = points[activeIndex];
  const totalValue = activeData
    ? activeData.sent + activeData.received + activeData.unsent
    : 0;

  const tooltip = useMemo(() => {
    if (!activePoint) {
      return { left: 20, top: 20 };
    }

    const tooltipWidth = 126;
    const tooltipHeight = 92;
    const left = Math.min(
      width - tooltipWidth - 8,
      Math.max(8, activePoint.x - tooltipWidth / 2),
    );
    const top = Math.min(
      height - tooltipHeight - 8,
      Math.max(8, activePoint.y - tooltipHeight - 12),
    );

    return { left, top };
  }, [activePoint, height]);

  return (
    <div className="relative h-[230px] overflow-hidden rounded-xl">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Total email trend"
      >
        <defs>
          <linearGradient id="email-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c6fff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#4c6fff" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = paddingTop + (1 - tick / yMax) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={y}
                y2={y}
                stroke="#e3e8f3"
                strokeDasharray="4 7"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-[#98a2b3] text-[10px]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#email-area-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#6f8bff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {activePoint ? (
          <circle
            cx={activePoint.x}
            cy={activePoint.y}
            r="4"
            fill="#ffffff"
            stroke="#4c6fff"
            strokeWidth="2"
          />
        ) : null}

        {chartPoints.map((point, index) => {
          const previous = chartPoints[index - 1];
          const next = chartPoints[index + 1];
          const leftEdge = previous ? (previous.x + point.x) / 2 : point.x - plotWidth / 24;
          const rightEdge = next ? (next.x + point.x) / 2 : point.x + plotWidth / 24;

          return (
            <rect
              key={point.data.id}
              x={leftEdge}
              y={paddingTop}
              width={Math.max(8, rightEdge - leftEdge)}
              height={plotHeight}
              fill="transparent"
              onMouseEnter={() => setActiveIndex(index)}
            />
          );
        })}

        {chartPoints.map((point) => (
          <text
            key={`label-${point.data.id}`}
            x={point.x}
            y={height - 7}
            textAnchor="middle"
            className="fill-[#7b8394] text-[10px]"
          >
            {monthLabelMap[point.data.id] ?? point.data.month}
          </text>
        ))}
      </svg>

      {activeData ? (
        <div
          className="pointer-events-none absolute w-[126px] rounded-lg border border-[#d9dfec] bg-white/95 p-2 text-[10px] text-[#6b7280] shadow-sm"
          style={{
            left: `${(tooltip.left / width) * 100}%`,
            top: `${(tooltip.top / height) * 100}%`,
          }}
        >
          <p className="flex justify-between">
            <span>Sent</span>
            <span>{activeData.sent}</span>
          </p>
          <p className="mt-1 flex justify-between">
            <span>Received</span>
            <span>{activeData.received}</span>
          </p>
          <p className="mt-1 flex justify-between">
            <span>Unsent</span>
            <span>{activeData.unsent}</span>
          </p>
          <p className="mt-1 flex justify-between rounded bg-[#4c6fff] px-1 py-0.5 text-white">
            <span>Total</span>
            <span>{totalValue}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
