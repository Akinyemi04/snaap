"use client";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Header() {
  return (
    <header className="sticky top-0 z-[1200] border-[#e7e8ed] bg-white rounded-2xl px-4 py-4 backdrop-blur-sm sm:px-2 mt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="relative w-full max-w-2xl flex items-center gap-2">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search for users, groups or settings"
            className="w-full rounded-xl border border-[#d8dce6] bg-white py-2.5 pl-9 pr-4 text-sm text-[#111827] outline-none transition focus:border-[#5b73ff]"
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8dce6] bg-white text-[#4b5563]"
            aria-label="Notifications"
          >
            <NotificationsIcon />
          </button>
          <div className="rounded-xl border border-[#d8dce6] bg-white px-3 py-2 text-xs text-[#4b5563]">
            Agent Code:{" "}
            <span className="font-semibold text-[#5b73ff]">
              0365023774724y3b38
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
