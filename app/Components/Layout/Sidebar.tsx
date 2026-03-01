"use client";

import { useEffect, useState } from "react";
import type { SvgIconComponent } from "@mui/icons-material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface SidebarItem {
  label: string;
  icon: SvgIconComponent;
}

const mainItems: SidebarItem[] = [
  { label: "Dashboard", icon: DashboardOutlinedIcon },
  { label: "Organization & Reg.", icon: ApartmentOutlinedIcon },
  { label: "Reporting", icon: AssessmentOutlinedIcon },
  { label: "Billing", icon: ReceiptLongOutlinedIcon },
  { label: "Account", icon: PersonOutlineOutlinedIcon },
  { label: "Storage", icon: StorageOutlinedIcon },
  { label: "Settings", icon: SettingsOutlinedIcon },
  { label: "Device Management", icon: DevicesOutlinedIcon },
  { label: "Productivity Report", icon: InsightsOutlinedIcon },
];

const supportItems: SidebarItem[] = [
  { label: "User Panel", icon: AccountBoxOutlinedIcon },
  { label: "Support", icon: ContactSupportOutlinedIcon },
];

function SidebarContent({
  onItemClick,
  onClose,
}: {
  onItemClick?: () => void;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between px-3">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">
          Snaarp
        </h1>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#d8dce6] text-[#4b5563] md:hidden"
            aria-label="Close sidebar"
          >
            <CloseRoundedIcon />
          </button>
        ) : null}
      </div>

      <nav className="mt-7 flex flex-col gap-1 text-sm text-[#6b7280]">
        {mainItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={onItemClick}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition ${
              label === "Dashboard"
                ? "bg-[#eef2ff] font-semibold text-[#4c6fff]"
                : "hover:bg-[#f7f8fc]"
            }`}
          >
            <Icon fontSize="small" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="my-5 h-px bg-[#eceef4]" />

      <nav className="flex flex-col gap-1 text-sm text-[#6b7280]">
        {supportItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={onItemClick}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#f7f8fc]"
          >
            <Icon fontSize="small" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2 rounded-2xl border border-[#e7e8ed] bg-[#f8f9fd] p-3">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="h-[30px] w-[30px] rounded-full object-cover"
          alt=""
        />
        <aside>
          <p className="text-sm font-semibold text-[#1f2937]">Chioma Snaarp</p>
          <p className="text-xs text-[#6b7280]">chioma@snaarp.com</p>
        </aside>
      </div>
    </>
  );
}

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const openSidebar = () => setIsMobileOpen(true);
    window.addEventListener("snaap:open-sidebar", openSidebar);
    return () => window.removeEventListener("snaap:open-sidebar", openSidebar);
  }, []);

  const closeSidebar = () => setIsMobileOpen(false);

  return (
    <>
      <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#e7e8ed] bg-white p-4 md:flex">
        <SidebarContent />
      </aside>

      <button
        type="button"
        onClick={closeSidebar}
        className={`fixed inset-0 z-[1290] bg-[#111827]/35 transition-opacity md:hidden ${
          isMobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-label="Close sidebar overlay"
      />

      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-[1300] flex h-screen w-[260px] flex-col border-r border-[#e7e8ed] bg-white p-4 transition-transform duration-200 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onItemClick={closeSidebar} onClose={closeSidebar} />
      </aside>
    </>
  );
}
