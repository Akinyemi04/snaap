"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  icon?: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  icon,
  subtitle,
  action,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={`rounded-2xl border border-[#e7e8ed] bg-white p-4 sm:p-5 ${className ?? ""}`}
    >
      {(title || action) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title ? (
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1f2937]">
                {icon ? (
                  <span className="text-[#6b7280] p-1 rounded-lg bg-gray-100">
                    {icon}
                  </span>
                ) : null}
                <span>{title}</span>
              </h3>
            ) : null}
            {subtitle ? (
              <p className="mt-1 text-xs text-[#6b7280]">{subtitle}</p>
            ) : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
