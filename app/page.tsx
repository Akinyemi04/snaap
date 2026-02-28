"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import SortableList from "./Components/DnD/SortableList";
import FileSharingChart from "./Components/Charts/FileSharingChart";
import EmailTrendChart from "./Components/Charts/EmailTrendChart";
import ActiveUsersMap from "./Components/Maps/ActiveUsersMap";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import PowerOffOutlinedIcon from "@mui/icons-material/PowerOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import NorthEastOutlinedIcon from "@mui/icons-material/NorthEastOutlined";
import SouthWestOutlinedIcon from "@mui/icons-material/SouthWestOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

import {
  activeUsersByCountry,
  appActivityRows,
  cloudNetworkWidgets,
  deviceBreakdown,
  deviceManagementWidgets,
  emailSegments,
  emailTrend,
  monthlyFileShare,
  onlineUsers,
  productivityWidgets,
  storageSegments,
  webActivityRows,
} from "./Components/data/mockData";
import Header from "./Components/Layout/Header";
import { DonutSegment, Widget } from "./Components/Types/widget";
import SectionCard from "./Components/Widgets/SectionCard";
import StatCard from "./Components/Widgets/StatCard";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Bolt } from "@mui/icons-material";

const buildConicGradient = (segments: DonutSegment[]): string => {
  let start = 0;
  const parts = segments.map((segment) => {
    const end = start + segment.value;
    const part = `${segment.color} ${start}% ${end}%`;
    start = end;
    return part;
  });

  return `conic-gradient(${parts.join(", ")})`;
};

const parseTimeUsageToMinutes = (value: string): number => {
  const normalized = value.toLowerCase();
  const hoursMatch = normalized.match(/(\d+)\s*hour/);
  const minutesMatch = normalized.match(/(\d+)\s*minute/);
  const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;
  return hours * 60 + minutes;
};

const SortIndicator = () => (
  <span className="inline-flex flex-col items-center text-[#9aa3b2]">
    <KeyboardArrowUpIcon sx={{ fontSize: 12, marginBottom: -0.5 }} />
    <KeyboardArrowDownIcon sx={{ fontSize: 12, marginTop: -0.5 }} />
  </span>
);

const deviceIconByType = {
  Windows: "/devices/windows.svg",
  Mac: "/devices/mac.svg",
  Linux: "/devices/linux.svg",
} as const;

const ChromeLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path d="M12 12H21.5A9.5 9.5 0 0 0 7.25 3.77L12 12Z" fill="#EA4335" />
    <path d="M12 12L7.25 3.77A9.5 9.5 0 0 0 2.5 12H12Z" fill="#FBBC05" />
    <path d="M12 12H2.5A9.5 9.5 0 1 0 21.5 12H12Z" fill="#34A853" />
    <circle cx="12" cy="12" r="4.2" fill="#ffffff" />
    <circle cx="12" cy="12" r="3.2" fill="#4285F4" />
  </svg>
);

const GmailLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <rect
      x="2.5"
      y="4.5"
      width="19"
      height="15"
      rx="2"
      fill="#ffffff"
      stroke="#E5E7EB"
    />
    <path
      d="M4.5 8V17"
      stroke="#4285F4"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M19.5 8V17"
      stroke="#34A853"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M4.5 8L12 13.5L19.5 8"
      stroke="#EA4335"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 13.5L19.5 8"
      stroke="#FBBC05"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getActivityIcon = (activity: string) => {
  switch (activity) {
    case "Google Chrome":
      return <ChromeLogo />;
    case "Instagram":
      return <InstagramIcon sx={{ fontSize: 15 }} className="text-[#e1306c]" />;
    case "Microsoft Teams":
      return <MicrosoftIcon sx={{ fontSize: 15 }} className="text-[#6264a7]" />;
    case "YouTube":
      return <YouTubeIcon sx={{ fontSize: 16 }} className="text-[#ff0000]" />;
    case "Opera Mini":
      return (
        <PublicOutlinedIcon sx={{ fontSize: 15 }} className="text-[#ff1b2d]" />
      );
    case "WhatsApp":
      return <WhatsAppIcon sx={{ fontSize: 15 }} className="text-[#25d366]" />;
    default:
      return (
        <AppsOutlinedIcon sx={{ fontSize: 15 }} className="text-[#6b7280]" />
      );
  }
};

const getWebActivityIcon = (app: string) => {
  switch (app) {
    case "Chrome":
      return <ChromeLogo />;
    case "Gmail":
      return <GmailLogo />;
    case "Firefox":
      return (
        <PublicOutlinedIcon sx={{ fontSize: 15 }} className="text-[#ff7139]" />
      );
    case "Instagram":
      return <InstagramIcon sx={{ fontSize: 15 }} className="text-[#e1306c]" />;
    case "X.com":
      return <XIcon sx={{ fontSize: 14 }} className="text-[#111827]" />;
    case "Facebook":
      return <FacebookIcon sx={{ fontSize: 15 }} className="text-[#1877f2]" />;
    default:
      return (
        <AppsOutlinedIcon sx={{ fontSize: 15 }} className="text-[#6b7280]" />
      );
  }
};

export default function Home() {
  const [cloudWidgets, setCloudWidgets] =
    useState<Widget[]>(cloudNetworkWidgets);
  const [productivityCards, setProductivityCards] =
    useState<Widget[]>(productivityWidgets);
  const [appRows, setAppRows] = useState(appActivityRows);
  const [webRows, setWebRows] = useState(webActivityRows);

  const orderedStorageSegments = useMemo(() => {
    const chartOrder = [
      "free",
      "misc",
      "videos",
      "folders",
      "audios",
      "files",
      "apps",
    ] as const;
    const byId = new Map(
      storageSegments.map((segment) => [segment.id, segment]),
    );

    return chartOrder
      .map((id) => byId.get(id))
      .filter((segment): segment is DonutSegment => Boolean(segment));
  }, []);
  const storageLegendSegments = useMemo(() => {
    const legendOrder = [
      "files",
      "folders",
      "videos",
      "apps",
      "audios",
      "misc",
      "free",
    ] as const;
    const byId = new Map(
      storageSegments.map((segment) => [segment.id, segment]),
    );

    return legendOrder
      .map((id) => byId.get(id))
      .filter((segment): segment is DonutSegment => Boolean(segment));
  }, []);
  const storageChart = useMemo(
    () => buildConicGradient(orderedStorageSegments),
    [orderedStorageSegments],
  );
  const deviceCardsById = useMemo(
    () => new Map(deviceManagementWidgets.map((widget) => [widget.id, widget])),
    [],
  );
  const breakdownById = useMemo(
    () => new Map(deviceBreakdown.map((item) => [item.id, item.value])),
    [],
  );
  const devicesCard = deviceCardsById.get("devices");
  const usersCard = deviceCardsById.get("device-users");
  const emailsCard = deviceCardsById.get("emails");
  const appsCard = deviceCardsById.get("apps");
  const downloadsCard = deviceCardsById.get("downloads");
  const emailChart = useMemo(() => buildConicGradient(emailSegments), []);
  const usersByTimeUsage = useMemo(
    () =>
      [...onlineUsers].sort(
        (a, b) =>
          parseTimeUsageToMinutes(b.timeUsage) -
          parseTimeUsageToMinutes(a.timeUsage),
      ),
    [],
  );

  return (
    <main className="h-screen overflow-y-scroll flex-1 bg-[#f5f6fa] text-[#111827] px-2">
      <Header />
      <div className="space-y-6  ">
        <section className="  mt-4">
          <header className="round bg-white flex items-center justify-between px-4 py-3 mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <LanguageIcon /> Cloud Network
            </h2>
            <KeyboardArrowDownIcon />
          </header>

          <div className="grid items-stretch gap-4 xl:grid-cols-12">
            <div className="h-full xl:col-span-7">
              <SortableList
                items={cloudWidgets}
                onChange={setCloudWidgets}
                getId={(item) => item.id}
                className="grid h-full gap-4 sm:grid-cols-2 sm:auto-rows-[minmax(0,1fr)]"
                itemClassName="h-full cursor-grab active:cursor-grabbing"
                renderItem={(item) => (
                  <StatCard
                    title={item.title}
                    value={item.value}
                    change={item.change}
                    tone={item.tone}
                    trend={item.trend}
                    subtitle={item.subtitle}
                    icon={item.icon}
                  />
                )}
              />
            </div>

            <SectionCard
              title="Storage"
              icon={<StorageOutlinedIcon fontSize="small" />}
              className="h-full xl:col-span-5"
            >
              <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                <div className="flex items-start justify-center">
                  <div className="relative h-44 w-44 shrink-0">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundImage: storageChart,
                        transform: "rotate(-90deg)",
                      }}
                    />
                    <div className="absolute inset-6 rounded-full bg-white shadow-[inset_0_0_0_1px_#eef1f8]" />
                    <div className="absolute inset-9 rounded-full border-[3px] border-dashed border-[#4c6fff]" />
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div>
                        <strong className="text-2xl text-[#111827]">80%</strong>
                        <span className="block text-xs text-[#6b7280]">
                          Used
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-xl border border-[#facc15]/40 bg-[#dfb669]  text-sm text-[#5b6475]">
                    <div className=" mx-1 rounded-xl bg-white p-3">
                      <p className="font-semibold text-[#b97800]">Note</p>
                      <p className="mt-2 leading-5">
                        You&apos;ve almost reached your storage limit. You have
                        used 80% of your available storage.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-x-4 gap-y-2 text-xs text-[#6b7280] xl:flex-row flex-wrap">
                    {storageLegendSegments.map((segment) => (
                      <div key={segment.id} className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-[2px]"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span>{segment.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="rounded-xl border border-[#ccd7ff]  px-4 py-2.5 text-sm font-semibold text-[#4c6fff] flex items-center gap-2 "
                    >
                      <ElectricBoltIcon />
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="File Sharing"
              icon={<FolderOpenOutlinedIcon fontSize="small" />}
              subtitle="Keep track of files and how they're shared"
              action={
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#dde2ef] bg-[#edf1ff] text-[#4c6fff]"
                    aria-label="Bar chart view"
                  >
                    <BarChartOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#dde2ef] bg-white text-[#6b7280]"
                    aria-label="Line chart view"
                  >
                    <ShowChartOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    type="button"
                    className="flex h-8 items-center gap-1 rounded-lg border border-[#dde2ef] bg-white px-2.5 text-xs text-[#6b7280]"
                  >
                    Month
                    <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              }
              className="xl:col-span-7"
            >
              <FileSharingChart data={monthlyFileShare} />
            </SectionCard>

            <SectionCard
              title="Active Users"
              icon={<PersonOutlineOutlinedIcon fontSize="small" />}
              action={
                <button
                  type="button"
                  className="rounded-lg border border-[#dde2ef] bg-white px-2.5 py-1 text-xs text-[#6b7280]"
                >
                  Month
                </button>
              }
              className="xl:col-span-5"
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <ActiveUsersMap />

                <div className="space-y-3">
                  {activeUsersByCountry.map((country) => (
                    <div key={country.id}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Image
                            src={country.flag}
                            alt={`${country.country} flag`}
                            width={24}
                            height={16}
                            className="h-4 w-6 rounded-[2px] border border-[#e5e7eb] object-cover"
                          />
                          <span className="text-[#4b5563]">
                            {country.country}
                          </span>
                        </div>
                        <span className="text-xs text-[#7b8394]">
                          {country.usage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#eaedf4]">
                        <div
                          className="h-2 rounded-full bg-[#7cc85f]"
                          style={{ width: `${country.usage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e7e8ed] bg-[#f9fafe] p-3 sm:p-4">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <DevicesOutlinedIcon className="scale-90 p-1 bg-gray-100 rounded-lg " />
              <span>Device Management Dashboard</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-[#4c6fff] px-4 py-2 text-sm font-semibold text-white"
              >
                <ElectricBoltIcon />
                Upgrade Plan
              </button>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-xl border border-[#dde2ef] bg-white text-[#6b7280]"
                aria-label="Toggle device management section"
              >
                <KeyboardArrowDownIcon fontSize="small" />
              </button>
            </div>
          </header>

          <div className="grid gap-3 lg:grid-cols-4 lg:items-stretch">
            <div className="flex h-full flex-col gap-2">
              <div className="flex h-[226px] flex-col justify-between overflow-hidden rounded-xl border border-[#e7e8ed] bg-white">
                {devicesCard ? (
                  <div className="min-h-0 flex-1">
                    <StatCard
                      title={devicesCard.title}
                      value={devicesCard.value}
                      change={devicesCard.change}
                      tone={devicesCard.tone}
                      trend={devicesCard.trend}
                      subtitle={devicesCard.subtitle}
                      icon={devicesCard.icon}
                      compact
                      embedded
                    />
                  </div>
                ) : null}
                <div className="border-t border-[#eef1f8] p-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <PowerOutlinedIcon className="small" />
                        Plugged
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">
                        1,923
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <PowerOffOutlinedIcon className="small" />
                        Unplugged
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">
                        1,913
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[78px] rounded-xl border border-[#e7e8ed] bg-white p-2">
                <div className="grid h-full grid-cols-3 gap-2">
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <Image
                        src="/devices/windows.svg"
                        alt="Windows"
                        width={12}
                        height={12}
                      />
                      Windows
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("windows")} devices
                    </p>
                  </div>
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <Image
                        src="/devices/mac.svg"
                        alt="Mac"
                        width={12}
                        height={12}
                      />
                      Mac
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("mac")} devices
                    </p>
                  </div>
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <Image
                        src="/devices/linux.svg"
                        alt="Linux"
                        width={12}
                        height={12}
                      />
                      Linux
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("linux")} devices
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col gap-2">
              <div className="flex h-[226px] flex-col justify-between overflow-hidden rounded-xl border border-[#e7e8ed] bg-white">
                {usersCard ? (
                  <div className="min-h-0 flex-1">
                    <StatCard
                      title={usersCard.title}
                      value={usersCard.value}
                      change={usersCard.change}
                      tone={usersCard.tone}
                      trend={usersCard.trend}
                      subtitle={usersCard.subtitle}
                      icon={usersCard.icon}
                      compact
                      embedded
                    />
                  </div>
                ) : null}
                <div className="border-t border-[#eef1f8] p-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <CheckCircleOutlineOutlinedIcon className="text-[#84cc16] small !bg-green-100" />
                        Active
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">
                        592
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <HighlightOffOutlinedIcon className="text-[#ef4444] small !bg-red-100" />
                        Offline
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">
                        3,836
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[78px] rounded-xl border border-[#e7e8ed] bg-white p-2">
                <div className="grid h-full grid-cols-3 gap-2">
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <CorporateFareOutlinedIcon sx={{ fontSize: 12 }} />
                      Organizations
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("orgs")} users
                    </p>
                  </div>
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <ApartmentOutlinedIcon sx={{ fontSize: 12 }} />
                      Departments
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("departments")} users
                    </p>
                  </div>
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <Groups2OutlinedIcon sx={{ fontSize: 12 }} />
                      Groups
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("groups")} users
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col gap-2">
              <div className="flex h-[226px] flex-col justify-between overflow-hidden rounded-xl border border-[#e7e8ed] bg-white">
                {emailsCard ? (
                  <div className="min-h-0 flex-1">
                    <StatCard
                      title={emailsCard.title}
                      value={emailsCard.value}
                      change={emailsCard.change}
                      tone={emailsCard.tone}
                      trend={emailsCard.trend}
                      subtitle={emailsCard.subtitle}
                      icon={emailsCard.icon}
                      compact
                      embedded
                    />
                  </div>
                ) : null}
                <div className="border-t border-[#eef1f8] p-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <NorthEastOutlinedIcon className="small" />
                        Sent
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">
                        592
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <SouthWestOutlinedIcon className="small" />
                        Received
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">
                        3,836
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[78px] rounded-xl border border-[#e7e8ed] bg-white p-2">
                <div className="grid h-full grid-cols-2 gap-2">
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <MarkEmailReadOutlinedIcon sx={{ fontSize: 12 }} />
                      Read
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("read")} emails
                    </p>
                  </div>
                  <div className="h-full rounded-lg border border-[#eef1f8] px-2 py-1.5">
                    <p className="flex items-center gap-1 text-[10px] text-[#6b7280]">
                      <MarkEmailUnreadOutlinedIcon sx={{ fontSize: 12 }} />
                      Unsend
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#111827]">
                      {breakdownById.get("unsent")} emails
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[312px] flex-col gap-2">
              {appsCard ? (
                <div className="h-[152px] overflow-hidden rounded-lg border border-[#eef1f8] bg-white">
                  <StatCard
                    title={appsCard.title}
                    value={appsCard.value}
                    change={appsCard.change}
                    tone={appsCard.tone}
                    trend={appsCard.trend}
                    subtitle={appsCard.subtitle}
                    icon={appsCard.icon}
                    compact
                    embedded
                  />
                </div>
              ) : null}
              {downloadsCard ? (
                <div
                  className="h-[152px] overflow-hidden rounded-lg border border-[#eef1f8] bg-white"
                >
                  <StatCard
                    title={downloadsCard.title}
                    value={downloadsCard.value}
                    change={downloadsCard.change}
                    tone={downloadsCard.tone}
                    trend={downloadsCard.trend}
                    subtitle={downloadsCard.subtitle}
                    icon={downloadsCard.icon}
                    compact
                    embedded
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e7e8ed] bg-[#f9fafe] p-3 sm:p-4">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-1">
              {" "}
              <AssessmentOutlinedIcon className="small" /> Productivity Report
            </h2>
            <button
              type="button"
              className="rounded-xl bg-[#4c6fff] px-4 py-2 text-sm font-semibold flex items-center gap-2 text-white"
            >
              <Bolt />
              Upgrade Plan
            </button>
          </header>

          <SortableList
            items={productivityCards}
            onChange={setProductivityCards}
            getId={(item) => item.id}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            itemClassName="cursor-grab active:cursor-grabbing"
            renderItem={(item) => (
              <StatCard
                title={item.title}
                value={item.value}
                change={item.change}
                tone={item.tone}
                trend={item.trend}
                subtitle={item.subtitle}
                icon={item.icon}
                compact
              />
            )}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-12">
            <SectionCard
              title="Email Chart"
              icon={<MailOutlineOutlinedIcon fontSize="small" />}
              className="xl:col-span-4"
            >
              <div className="flex items-center justify-center">
                <div className="relative h-44 w-44 shrink-0">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundImage: emailChart,
                      transform: "rotate(-90deg)",
                    }}
                  />
                  <div className="absolute inset-6 rounded-full bg-white shadow-[inset_0_0_0_1px_#eef1f8]" />
                  <div className="absolute inset-9 rounded-full border-[3px] border-dashed border-[#4c6fff]" />
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <strong className="text-sm font-semibold text-[#4b5563]">
                      Email
                      <br />
                      Chart
                    </strong>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-4 text-xs text-[#6b7280]">
                {emailSegments.map((segment) => (
                  <span key={segment.id} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-[2px]"
                      style={{ backgroundColor: segment.color }}
                    />
                    {segment.label}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-center text-xs tracking-wide text-[#6b7280]">
                TOTAL EMAILS SENT
              </p>
              <p className="text-center text-3xl font-semibold text-[#111827]">
                5,421
              </p>
            </SectionCard>

            <SectionCard
              title="Total Email"
              icon={<MailOutlineOutlinedIcon fontSize="small" />}
              action={
                <button
                  type="button"
                  className="rounded-lg border border-[#dde2ef] bg-white px-2.5 py-1 text-xs text-[#6b7280] flex gap-2 items-center"
                >
                  Month
                  <KeyboardArrowDownIcon />
                </button>
              }
              className="xl:col-span-8"
            >
              <EmailTrendChart points={emailTrend} />
            </SectionCard>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e7e8ed] bg-[#f9fafe] p-3 sm:p-4">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Online Users</h2>
              <p className="text-xs text-[#6b7280]">
                View your comprehensive online users
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-[#dde2ef] bg-white px-2.5 py-1 text-xs text-[#6b7280] flex items-center"
            >
              All Organization <KeyboardArrowDownIcon />
            </button>
          </header>

          <div className="overflow-x-auto">
            <div className="min-w-[880px] rounded-xl border border-[#e7e8ed] bg-white ">
              <div className="grid grid-cols-[40px_1.4fr_1.2fr_1.2fr_0.8fr_1.2fr_1fr] gap-2 rounded-lg bg-[#f4f6fb] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <span />
                <span className="flex items-center gap-1">
                  <span>Name</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Location</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Organization</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Device</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Current Activity</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Time Usage</span>
                </span>
              </div>

              <div className="mt-1 space-y-1">
                {usersByTimeUsage.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[40px_1.4fr_1.2fr_1.2fr_0.8fr_1.2fr_1fr] gap-2 rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#f8f9fd]"
                  >
                    <span
                      className={`mt-2 inline-block h-2.5 w-2.5 rounded-full ${
                        user.status === "online"
                          ? "bg-[#22c55e]"
                          : "bg-[#d1d5db]"
                      }`}
                    />
                    <span className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e8ecff] text-[10px] font-semibold text-[#4c6fff]">
                        {user.avatar}
                      </span>
                      <span>{user.name}</span>
                    </span>
                    <span>{user.location}</span>
                    <span>{user.organization}</span>
                    <span className="flex items-center gap-1.5">
                      <Image
                        src={deviceIconByType[user.device]}
                        alt={user.device}
                        width={14}
                        height={14}
                      />
                      <span>{user.device}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {getActivityIcon(user.activity)}
                      <span>{user.activity}</span>
                    </span>
                    <span>{user.timeUsage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-12">
          <section className="rounded-2xl border border-[#e7e8ed] bg-[#f9fafe] p-3 sm:p-4 xl:col-span-8">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <ShieldOutlinedIcon sx={{ fontSize: 20 }} />
                  App Activity Report
                </h2>
                <p className="text-xs text-[#6b7280]">
                  View your comprehensive organizational web report
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-[#dde2ef] bg-white px-2.5 py-1 text-xs text-[#6b7280] flex items-center"
                >
                  All Organization <KeyboardArrowDownIcon />
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#dde2ef] bg-white px-2.5 py-1 text-xs text-[#6b7280] flex items-center gap-2 "
                >
                  Month <KeyboardArrowDownIcon />
                </button>
              </div>
            </header>

            <div className="rounded-xl border border-[#e7e8ed] bg-white ">
              <div className="grid grid-cols-[1.6fr_0.7fr_1fr_1.2fr] gap-2 rounded-lg bg-[#f4f6fb] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Application</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Total Users</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Total Number Of Hours</span>
                </span>
                <span className="flex items-center gap-1">
                  <SortIndicator />
                  <span>Date</span>
                </span>
              </div>
              <SortableList
                items={appRows}
                onChange={setAppRows}
                getId={(item) => item.id}
                className="mt-1 space-y-1"
                itemClassName="cursor-grab active:cursor-grabbing"
                renderItem={(row) => (
                  <div className="grid grid-cols-[1.6fr_0.7fr_1fr_1.2fr] gap-2 rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#f8f9fd]">
                    <span className="flex items-center gap-2">
                      <span className="grid h-4 w-4 place-items-center">
                        {getActivityIcon(row.application)}
                      </span>
                      <span>{row.application}</span>
                    </span>
                    <span>{row.totalUsers}</span>
                    <span>{row.totalHours}</span>
                    <span>{row.date}</span>
                  </div>
                )}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-[#e7e8ed] bg-[#f9fafe] p-3 sm:p-4 xl:col-span-4">
            <header className="mb-4 flex items-center justify-between">
              <aside>
                <h2 className="text-xl font-semibold flex items-center gap-2 ">
                  {" "}
                  <LanguageIcon className="small" /> Web Activity
                </h2>{" "}
                <p className="text-xs mt-2 text-gray-500">
                  View your comprehensive organizational web report
                </p>
              </aside>
              <button
                type="button"
                className="rounded-lg border border-[#dde2ef] bg-white px-2.5 py-1 text-xs text-[#6b7280] flex items-center"
              >
                Month <KeyboardArrowDownIcon />
              </button>
            </header>

            <div className="rounded-xl border border-[#e7e8ed] bg-white p-2">
              <SortableList
                items={webRows}
                onChange={setWebRows}
                getId={(item) => item.id}
                className="space-y-1"
                itemClassName="cursor-grab active:cursor-grabbing"
                renderItem={(row) => (
                  <div className="rounded-lg px-3 py-2 hover:bg-[#f8f9fd]">
                    <div className="mb-1 flex items-center justify-between text-sm text-[#374151]">
                      <span className="flex items-center gap-2">
                        <span className="grid h-4 w-4 place-items-center">
                          {getWebActivityIcon(row.app)}
                        </span>
                        <span>{row.app}</span>
                      </span>
                      <span>{row.duration}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#eaedf4]">
                      <div
                        className="h-2 rounded-full bg-[#7cc85f]"
                        style={{ width: `${row.usage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs text-[#7b8394]">
                      {row.usage}%
                    </p>
                  </div>
                )}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
