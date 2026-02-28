import type { SvgIconComponent } from "@mui/icons-material";

export type WidgetTone = "positive" | "negative" | "neutral";

export interface Widget {
  id: string;
  title: string;
  value: string;
  change: string;
  tone: WidgetTone;
  trend: number[];
  icon?: SvgIconComponent;
  subtitle?: string;
}

export interface CountryUsage {
  id: string;
  flag: string;
  country: string;
  usage: number;
}

export interface MonthlyFileShare {
  id: string;
  month: string;
  public: number;
  linkOnly: number;
  withinOrg: number;
}

export interface EmailTrendPoint {
  id: string;
  month: string;
  sent: number;
  received: number;
  unsent: number;
}

export interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  location: string;
  organization: string;
  device: "Windows" | "Mac" | "Linux";
  activity: string;
  timeUsage: string;
  status: "online" | "idle";
}

export interface AppActivityRow {
  id: string;
  application: string;
  totalUsers: number;
  totalHours: string;
  date: string;
}

export interface WebActivityRow {
  id: string;
  app: string;
  usage: number;
  duration: string;
}

export interface BreakdownItem {
  id: string;
  label: string;
  value: string;
}

export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
}
