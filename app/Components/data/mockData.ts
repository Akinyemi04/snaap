import {
  AppActivityRow,
  BreakdownItem,
  CountryUsage,
  DonutSegment,
  EmailTrendPoint,
  MonthlyFileShare,
  OnlineUser,
  WebActivityRow,
  Widget,
} from "../Types/widget";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

export const cloudNetworkWidgets: Widget[] = [
  {
    id: "users",
    title: "Users",
    value: "3,836",
    change: "5%",
    icon: Person2OutlinedIcon,
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [92, 90, 88, 87, 84, 82, 77, 74, 70],
  },
  {
    id: "groups",
    title: "Groups",
    icon: Groups2OutlinedIcon,
    value: "316",
    change: "23%",
    tone: "positive",
    subtitle: "Compared to last week",
    trend: [41, 44, 47, 53, 58, 63, 66, 70, 72],
  },
  {
    id: "uploads",
    title: "Uploads",
    value: "316",
    change: "23%",
    icon: FileUploadOutlinedIcon,
    tone: "positive",
    subtitle: "Compared to last week",
    trend: [30, 32, 35, 39, 45, 50, 56, 59, 64],
  },
  {
    id: "departments",
    title: "Departments",
    value: "316",
    icon: PeopleOutlinedIcon,
    change: "23%",
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [83, 80, 77, 75, 72, 67, 61, 57, 52],
  },
];

export const monthlyFileShare: MonthlyFileShare[] = [
  { id: "jan", month: "JAN", public: 44, linkOnly: 24, withinOrg: 36 },
  { id: "feb", month: "FEB", public: 58, linkOnly: 34, withinOrg: 47 },
  { id: "mar", month: "MAR", public: 50, linkOnly: 29, withinOrg: 40 },
  { id: "apr", month: "APR", public: 56, linkOnly: 34, withinOrg: 44 },
  { id: "may", month: "MAY", public: 72, linkOnly: 42, withinOrg: 61 },
  { id: "jun", month: "JUN", public: 78, linkOnly: 50, withinOrg: 66 },
  { id: "jul", month: "JUL", public: 76, linkOnly: 47, withinOrg: 63 },
  { id: "aug", month: "AUG", public: 52, linkOnly: 30, withinOrg: 41 },
  { id: "sep", month: "SEP", public: 56, linkOnly: 33, withinOrg: 45 },
  { id: "oct", month: "OCT", public: 60, linkOnly: 35, withinOrg: 48 },
  { id: "nov", month: "NOV", public: 74, linkOnly: 46, withinOrg: 62 },
  { id: "dec", month: "DEC", public: 51, linkOnly: 30, withinOrg: 43 },
];

export const activeUsersByCountry: CountryUsage[] = [
  { id: "uk", flag: "/flags/gb.svg", country: "United Kingdom", usage: 78 },
  { id: "ng", flag: "/flags/ng.svg", country: "Nigeria", usage: 61 },
  { id: "uae", flag: "/flags/ae.svg", country: "United Arab Emirates", usage: 45 },
  { id: "ca", flag: "/flags/ca.svg", country: "Canada", usage: 59 },
  {
    id: "usa",
    flag: "/flags/us.svg",
    country: "United States of America",
    usage: 78,
  },
];

export const storageSegments: DonutSegment[] = [
  { id: "files", label: "Files", value: 18, color: "#f97316" },
  { id: "apps", label: "Apps", value: 14, color: "#3b82f6" },
  { id: "folders", label: "Folders", value: 12, color: "#eab308" },
  { id: "audios", label: "Audios", value: 10, color: "#f43f5e" },
  { id: "videos", label: "Videos", value: 16, color: "#84cc16" },
  { id: "misc", label: "Miscellaneous", value: 10, color: "#6366f1" },
  { id: "free", label: "Available Space", value: 20, color: "#e5e7eb" },
];

export const deviceManagementWidgets: Widget[] = [
  {
    id: "devices",
    title: "Number Of Devices",
    icon: DevicesOutlinedIcon,
    value: "3,836",
    change: "23%",
    tone: "positive",
    subtitle: "Compared to last week",
    trend: [22, 25, 28, 32, 36, 41, 47, 53, 58],
  },
  {
    id: "device-users",
    title: "Users",
    icon: Person2OutlinedIcon,
    value: "3,836",
    change: "15%",
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [86, 84, 82, 80, 77, 73, 68, 62, 55],
  },
  {
    id: "emails",
    title: "Emails",
    icon: EmailOutlinedIcon,
    value: "316",
    change: "23%",
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [74, 72, 69, 66, 63, 60, 56, 51, 46],
  },
  {
    id: "apps",
    title: "Number of Apps",
    icon: AppsOutlinedIcon,
    value: "316",
    change: "23%",
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [66, 64, 62, 60, 58, 54, 50, 47, 41],
  },
  {
    id: "downloads",
    title: "Number of Downloads",
    icon: DownloadOutlinedIcon,
    value: "316",
    change: "23%",
    tone: "positive",
    subtitle: "Compared to last week",
    trend: [30, 34, 38, 43, 49, 54, 59, 61, 64],
  },
];

export const deviceBreakdown: BreakdownItem[] = [
  { id: "windows", label: "Windows devices", value: "1,403" },
  { id: "mac", label: "Mac devices", value: "632" },
  { id: "linux", label: "Linux devices", value: "1,801" },
  { id: "orgs", label: "Organizations", value: "1,403" },
  { id: "departments", label: "Departments", value: "632" },
  { id: "groups", label: "Groups", value: "1,801" },
  { id: "read", label: "Read emails", value: "1,403" },
  { id: "unsent", label: "Unsent emails", value: "632" },
];

export const productivityWidgets: Widget[] = [
  {
    id: "hours-productivity",
    title: "Hours Productivity",
    icon: AccessTimeOutlinedIcon,
    value: "576 Hrs",
    change: "15%",
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [88, 86, 83, 80, 76, 72, 67, 60, 52],
  },
  {
    id: "days-activity",
    title: "Days Activity",
    icon: CalendarMonthOutlinedIcon,
    value: "267 Days",
    change: "15%",
    tone: "positive",
    subtitle: "Compared to last week",
    trend: [30, 34, 37, 40, 45, 50, 54, 58, 62],
  },
  {
    id: "users-productivity",
    title: "Users",
    icon: Person2OutlinedIcon,
    value: "3,836",
    change: "15%",
    tone: "negative",
    subtitle: "Compared to last week",
    trend: [89, 86, 84, 81, 77, 73, 69, 62, 56],
  },
  {
    id: "web-activity",
    title: "Web Activity",
    icon: LanguageOutlinedIcon,
    value: "178 Activities",
    change: "15%",
    tone: "positive",
    subtitle: "Compared to last week",
    trend: [19, 22, 25, 29, 33, 36, 39, 42, 47],
  },
];

export const emailSegments: DonutSegment[] = [
  { id: "sent", label: "Sent", value: 50, color: "#f59e0b" },
  { id: "received", label: "Received", value: 40, color: "#4f46e5" },
  { id: "unsent", label: "Unsent", value: 10, color: "#d1d5db" },
];

export const emailTrend: EmailTrendPoint[] = [
  { id: "jan", month: "JAN", sent: 200, received: 150, unsent: 60 },
  { id: "feb", month: "FEB", sent: 430, received: 210, unsent: 74 },
  { id: "mar", month: "MAR", sent: 350, received: 220, unsent: 81 },
  { id: "apr", month: "APR", sent: 820, received: 520, unsent: 130 },
  { id: "may", month: "MAY", sent: 1150, received: 860, unsent: 190 },
  { id: "jun", month: "JUN", sent: 1670, received: 1230, unsent: 280 },
  { id: "jul", month: "JUL", sent: 2600, received: 1710, unsent: 377 },
  { id: "aug", month: "AUG", sent: 3110, received: 2390, unsent: 492 },
  { id: "sep", month: "SEP", sent: 4320, received: 3170, unsent: 540 },
  { id: "oct", month: "OCT", sent: 5100, received: 3890, unsent: 553 },
  { id: "nov", month: "NOV", sent: 5810, received: 4430, unsent: 597 },
  { id: "dec", month: "DEC", sent: 5421, received: 4680, unsent: 512 },
];

export const onlineUsers: OnlineUser[] = [
  {
    id: "u-1",
    name: "Annette Black",
    avatar: "AB",
    location: "Ottawa, Canada",
    organization: "MSBM, Ottawa",
    device: "Windows",
    activity: "Google Chrome",
    timeUsage: "3 hours 12 minutes",
    status: "online",
  },
  {
    id: "u-2",
    name: "Floyd Miles",
    avatar: "FM",
    location: "Lagos, Nigeria",
    organization: "MSBM, Lagos",
    device: "Windows",
    activity: "Instagram",
    timeUsage: "2 hours 8 minutes",
    status: "online",
  },
  {
    id: "u-3",
    name: "Ronald Richards",
    avatar: "RR",
    location: "Dubai, UAE",
    organization: "MSBM, Dubai",
    device: "Mac",
    activity: "Microsoft Teams",
    timeUsage: "6 hours 45 minutes",
    status: "idle",
  },
  {
    id: "u-4",
    name: "Guy Hawkins",
    avatar: "GH",
    location: "London, UK",
    organization: "MSBM, London",
    device: "Windows",
    activity: "Instagram",
    timeUsage: "1 hour 30 minutes",
    status: "online",
  },
  {
    id: "u-5",
    name: "Jane Cooper",
    avatar: "JC",
    location: "Frankfurt, Germany",
    organization: "MSBM, Frankfurt",
    device: "Mac",
    activity: "Google Chrome",
    timeUsage: "9 hours 10 minutes",
    status: "online",
  },
  {
    id: "u-6",
    name: "Leslie Alexander",
    avatar: "LA",
    location: "Rome, Italy",
    organization: "MSBM, Rome",
    device: "Windows",
    activity: "YouTube",
    timeUsage: "45 minutes",
    status: "idle",
  },
  {
    id: "u-7",
    name: "Albert Black",
    avatar: "AL",
    location: "Calgary, Canada",
    organization: "MSBM, Calgary",
    device: "Linux",
    activity: "Opera Mini",
    timeUsage: "45 minutes",
    status: "online",
  },
  {
    id: "u-8",
    name: "Cody Fisher",
    avatar: "CF",
    location: "Lagos, Nigeria",
    organization: "MSBM, Lagos",
    device: "Windows",
    activity: "Microsoft Teams",
    timeUsage: "45 minutes",
    status: "online",
  },
  {
    id: "u-9",
    name: "Dianne Russell",
    avatar: "DR",
    location: "London, UK",
    organization: "MSBM, London",
    device: "Linux",
    activity: "YouTube",
    timeUsage: "45 minutes",
    status: "online",
  },
];

export const appActivityRows: AppActivityRow[] = [
  {
    id: "a-1",
    application: "Google Chrome",
    totalUsers: 34,
    totalHours: "3 hours 12 minutes",
    date: "2024-06-26 16:33:49",
  },
  {
    id: "a-2",
    application: "YouTube",
    totalUsers: 12,
    totalHours: "2 hours 8 minutes",
    date: "2024-05-26 12:45:41",
  },
  {
    id: "a-3",
    application: "Microsoft Teams",
    totalUsers: 16,
    totalHours: "6 hours 45 minutes",
    date: "2024-05-21 16:26:21",
  },
  {
    id: "a-4",
    application: "WhatsApp",
    totalUsers: 49,
    totalHours: "1 hour 30 minutes",
    date: "2024-05-26 16:33:49",
  },
  {
    id: "a-5",
    application: "Opera Mini",
    totalUsers: 3,
    totalHours: "9 hours 10 minutes",
    date: "2024-05-21 10:28:21",
  },
  {
    id: "a-6",
    application: "Instagram",
    totalUsers: 22,
    totalHours: "45 minutes",
    date: "2024-05-26 12:45:41",
  },
];

export const webActivityRows: WebActivityRow[] = [
  { id: "w-1", app: "Chrome", usage: 78, duration: "5 hours 12 minutes" },
  { id: "w-2", app: "Gmail", usage: 61, duration: "2 hours 24 minutes" },
  { id: "w-3", app: "Firefox", usage: 45, duration: "40 minutes" },
  { id: "w-4", app: "Instagram", usage: 78, duration: "5 hours 6 minutes" },
  { id: "w-5", app: "X.com", usage: 59, duration: "1 hour 8 minutes" },
  { id: "w-6", app: "Facebook", usage: 61, duration: "3 hours 1 minute" },
];
