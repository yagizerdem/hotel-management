import {
  ActivityIcon,
  ArchiveRestoreIcon,
  DatabaseIcon,
  MonitorIcon,
  PlugIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";

export const itNav: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/it", label: "Overview", icon: ActivityIcon },
  { href: "/it/backups", label: "Backups", icon: ArchiveRestoreIcon },
  { href: "/it/database", label: "Database", icon: DatabaseIcon },
  { href: "/it/integrations", label: "Integrations", icon: PlugIcon },
  { href: "/it/devices", label: "Devices", icon: MonitorIcon },
  { href: "/it/access", label: "Access and audit log", icon: ShieldCheckIcon },
];

export function isActive(pathname: string, href: string) {
  return href === "/it" ? pathname === "/it" : pathname.startsWith(href);
}
