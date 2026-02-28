"use client";

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

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#e7e8ed] bg-white p-4 md:flex">
      <h1 className="px-3 text-3xl font-semibold tracking-tight text-[#111827]">
        Snaarp
      </h1>

      <nav className="mt-7 flex flex-col gap-1 text-sm text-[#6b7280]">
        {mainItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
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
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#f7f8fc]"
          >
            <Icon fontSize="small" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-[#e7e8ed] bg-[#f8f9fd] p-3 flex gap-2 items-center">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-[30px] h-[30px] rounded-full  object-cover"
          alt=""
        />
        <aside>
          <p className="text-sm font-semibold text-[#1f2937]">Chioma Snaarp</p>
          <p className="text-xs text-[#6b7280]">chioma@snaarp.com</p>
        </aside>
      </div>
    </aside>
  );
}
