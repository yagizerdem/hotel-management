// Placeholder data so the IT panel can be designed before the backend
// exists. Every screen reads from here; replace these with server calls
// that return the same types from @/src/app/it/lib/types.

import type {
  ActivityEntry,
  AttentionItem,
  Backup,
  BackupSchedule,
  DatabaseHost,
  DatabaseStats,
  Device,
  Integration,
  IntegrationRun,
  SetupStep,
  StaffAccess,
  StorageUsage,
} from "@/src/app/it/lib/types";

const MB = 1024 * 1024;
const GB = 1024 * MB;

function at(day: number, hour: number, minute = 0) {
  return new Date(2026, 10, day, hour, minute);
}

export const currentUser = {
  name: "Selahattin Karadibag",
  title: "IT specialist",
};

export const attentionItems: AttentionItem[] = [
  {
    id: "att-1",
    severity: "error",
    title: "Governorship report for 10 November failed twice",
    detail: "The service answered with a timeout. Next try at 12:00.",
    action: { label: "Retry now", href: "/it/integrations#governorship" },
  },
  {
    id: "att-2",
    severity: "warning",
    title: "Pool snack bar PC is offline",
    detail: "Last seen today at 08:42.",
    action: { label: "View device", href: "/it/devices" },
  },
  {
    id: "att-3",
    severity: "warning",
    title: "Backup storage is 81% full",
    detail: "About 9 more daily backups fit at the current size.",
    action: { label: "Manage storage", href: "/it/backups#schedule" },
  },
];

export const activity: ActivityEntry[] = [
  {
    id: "act-1",
    at: at(11, 9, 30),
    actor: "System",
    action: "Fetched exchange rates",
    target: "TCMB, 4 currencies",
    result: "success",
  },
  {
    id: "act-2",
    at: at(11, 6, 0),
    actor: "System",
    action: "Sent governorship report",
    target: "11 November, 214 guests",
    result: "success",
  },
  {
    id: "act-3",
    at: at(11, 3, 0),
    actor: "Schedule",
    action: "Created a backup",
    target: "412 MB, verified",
    result: "success",
  },
  {
    id: "act-4",
    at: at(10, 17, 10),
    actor: "Selahattin Karadibag",
    action: "Tested a restore",
    target: "Backup of 9 November",
    result: "success",
  },
  {
    id: "act-5",
    at: at(10, 12, 0),
    actor: "System",
    action: "Sent governorship report",
    target: "10 November",
    result: "failure",
  },
  {
    id: "act-6",
    at: at(3, 22, 15),
    actor: "Selahattin Karadibag",
    action: "Changed the database host",
    target: "to mongo-primary",
    result: "success",
  },
  {
    id: "act-7",
    at: at(3, 9, 2),
    actor: "Selahattin Karadibag",
    action: "Gave restore access",
    target: "Gülay Aydınlık",
    result: "success",
  },
];

export const backups: Backup[] = [
  {
    id: "bk-1111",
    createdAt: at(11, 3, 0),
    kind: "scheduled",
    sizeBytes: 412 * MB,
    durationSeconds: 94,
    createdBy: "Schedule",
    verified: true,
    location: "Server 1, D:\\Backups",
  },
  {
    id: "bk-1110",
    createdAt: at(10, 3, 0),
    kind: "scheduled",
    sizeBytes: 409 * MB,
    durationSeconds: 91,
    createdBy: "Schedule",
    verified: true,
    location: "Server 1, D:\\Backups",
  },
  {
    id: "bk-1109b",
    createdAt: at(9, 16, 48),
    kind: "manual",
    sizeBytes: 407 * MB,
    durationSeconds: 97,
    createdBy: "Selahattin Karadibag",
    verified: true,
    location: "Server 1, D:\\Backups",
  },
  {
    id: "bk-1109",
    createdAt: at(9, 3, 0),
    kind: "scheduled",
    sizeBytes: 406 * MB,
    durationSeconds: 90,
    createdBy: "Schedule",
    verified: false,
    location: "Server 1, D:\\Backups",
  },
  {
    id: "bk-1103",
    createdAt: at(3, 22, 5),
    kind: "before-restore",
    sizeBytes: 398 * MB,
    durationSeconds: 88,
    createdBy: "Selahattin Karadibag",
    verified: true,
    location: "Server 1, D:\\Backups",
  },
];

export const backupSchedule: BackupSchedule = {
  enabled: true,
  frequency: "daily",
  time: "03:00",
  weekday: 0,
  keepLast: 30,
  destination: "Server 1, D:\\Backups",
};

export const backupStorage: StorageUsage = {
  usedBytes: 12.9 * GB,
  totalBytes: 16 * GB,
};

export const databaseHosts: DatabaseHost[] = [
  {
    id: "db-1",
    name: "mongo-primary",
    host: "mongo-primary.bilge.local",
    port: 27017,
    database: "bilge_hotel",
    role: "primary",
    active: true,
    lastCheckedAt: at(11, 10, 14),
    latencyMs: 18,
    health: "ok",
  },
  {
    id: "db-2",
    name: "server-1",
    host: "srv1.bilge.local",
    port: 27017,
    database: "bilge_hotel",
    role: "standby",
    active: false,
    lastCheckedAt: at(11, 10, 14),
    latencyMs: 42,
    health: "ok",
  },
];

export const databaseStats: DatabaseStats = {
  version: "MongoDB 8.0",
  sizeBytes: 1.6 * GB,
  collections: [
    { name: "reservations", label: "Reservations", documents: 18_402 },
    { name: "roomnights", label: "Room nights", documents: 96_115 },
    { name: "guests", label: "Guests", documents: 11_870 },
    { name: "charges", label: "Extra charges", documents: 42_310 },
    { name: "payments", label: "Payments", documents: 19_006 },
    { name: "rooms", label: "Rooms", documents: 87 },
    { name: "employees", label: "Employees", documents: 45 },
    { name: "authorityreports", label: "Governorship reports", documents: 731 },
  ],
};

export const setupSteps: SetupStep[] = [
  {
    id: "connect",
    title: "Connect to a database server",
    detail: "Enter the host and test the connection.",
    done: true,
  },
  {
    id: "create",
    title: "Create the hotel database",
    detail: "Creates the collections and indexes the app needs.",
    done: true,
  },
  {
    id: "rooms",
    title: "Load rooms and room types",
    detail: "The 4 floors and their rooms as described by the hotel.",
    done: true,
  },
  {
    id: "admin",
    title: "Create the first manager account",
    detail: "This account can then invite the rest of the staff.",
    done: true,
  },
  {
    id: "backup",
    title: "Turn on scheduled backups",
    detail: "A daily backup at night, when the hotel is quietest.",
    done: true,
  },
];

export const integrations: Integration[] = [
  {
    id: "governorship",
    name: "Governorship guest report",
    purpose:
      "Sends the identity details of every staying guest to the governorship each day.",
    endpoint: "https://kbs.antalya.gov.tr/services/GuestReport",
    protocol: "XML web service (SOAP)",
    schedule: "Daily at 06:00, retries every 2 hours",
    health: "error",
    lastRunAt: at(11, 6, 0),
    lastResult: "Today's report was sent. The 10 November report failed.",
    nextRunAt: at(11, 12, 0),
  },
  {
    id: "exchange-rates",
    name: "Exchange rates",
    purpose:
      "Fetches the day's TRY rates so prices can be shown in EUR, USD and GBP.",
    endpoint: "https://www.tcmb.gov.tr/kurlar/today.xml",
    protocol: "XML over HTTPS",
    schedule: "Weekdays at 09:30",
    health: "ok",
    lastRunAt: at(11, 9, 30),
    lastResult: "4 currencies updated.",
    nextRunAt: at(12, 9, 30),
  },
  {
    id: "national-id",
    name: "T.C. identity number check",
    purpose:
      "Looks up and verifies a guest's T.C. identity number at check-in when it isn't on their ID card.",
    endpoint: "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx",
    protocol: "SOAP web service",
    schedule: "On demand, from reception",
    health: "ok",
    lastRunAt: at(11, 10, 2),
    lastResult: "Last lookup answered in 640 ms.",
  },
];

export const integrationRuns: IntegrationRun[] = [
  {
    id: "run-1",
    integration: "national-id",
    startedAt: at(11, 10, 2),
    durationMs: 640,
    result: "success",
    summary: "Identity number verified",
    attempt: 1,
  },
  {
    id: "run-2",
    integration: "exchange-rates",
    startedAt: at(11, 9, 30),
    durationMs: 1_210,
    result: "success",
    summary: "EUR, USD, GBP and RUB updated",
    attempt: 1,
  },
  {
    id: "run-3",
    integration: "governorship",
    startedAt: at(11, 6, 0),
    durationMs: 4_850,
    result: "success",
    summary: "11 November, 214 guests, reference KBS-2026-311-0042",
    attempt: 1,
  },
  {
    id: "run-4",
    integration: "governorship",
    startedAt: at(10, 12, 0),
    durationMs: 30_000,
    result: "failure",
    summary: "10 November: no answer within 30 seconds",
    attempt: 2,
  },
  {
    id: "run-5",
    integration: "governorship",
    startedAt: at(10, 6, 0),
    durationMs: 30_000,
    result: "failure",
    summary: "10 November: no answer within 30 seconds",
    attempt: 1,
  },
];

function pc(
  id: string,
  name: string,
  location: string,
  ip: string,
  online = true,
  lastSeenAt = at(11, 10, 14),
): Device {
  return {
    id,
    name,
    kind: "workstation",
    location,
    os: "Windows XP Home Edition",
    ipAddress: ip,
    onDomain: true,
    online,
    lastSeenAt,
    role: "Staff workstation",
  };
}

export const devices: Device[] = [
  {
    id: "srv-1",
    name: "Server 1",
    kind: "server",
    location: "Server room",
    os: "Windows Server 2003",
    ipAddress: "10.0.0.2",
    onDomain: true,
    online: true,
    lastSeenAt: at(11, 10, 14),
    role: "Domain, mail server and backups",
  },
  {
    id: "srv-2",
    name: "Server 2",
    kind: "server",
    location: "Server room",
    os: "Windows XP Professional",
    ipAddress: "10.0.0.3",
    onDomain: false,
    online: true,
    lastSeenAt: at(11, 10, 14),
    role: "Guest wireless internet only",
  },
  pc("pc-r1", "Reception 1", "Reception", "10.0.1.11"),
  pc("pc-r2", "Reception 2", "Reception", "10.0.1.12"),
  pc("pc-r3", "Reception 3", "Reception", "10.0.1.13"),
  pc("pc-r4", "Reception 4", "Reception", "10.0.1.14"),
  pc("pc-bar", "Bar", "Lobby bar", "10.0.2.11"),
  pc("pc-snack", "Pool snack bar", "Pool", "10.0.2.12", false, at(11, 8, 42)),
  pc("pc-m1", "Office 1", "Management offices", "10.0.3.11"),
  pc("pc-m2", "Office 2", "Management offices", "10.0.3.12"),
  pc("pc-m3", "Office 3", "Management offices", "10.0.3.13"),
  pc("pc-m4", "Office 4", "Management offices", "10.0.3.14"),
  pc(
    "pc-m5",
    "Office 5",
    "Management offices",
    "10.0.3.15",
    false,
    at(10, 18, 5),
  ),
  pc("pc-m6", "Office 6", "Management offices", "10.0.3.16"),
];

export const staffAccess: StaffAccess[] = [
  {
    id: "u-it",
    name: "Selahattin Karadibag",
    email: "it@bilgehotel.com",
    role: "it_admin",
    canBackup: true,
    canRestore: true,
    lastSignInAt: at(11, 8, 1),
  },
  {
    id: "u-owner",
    name: "Sakıp Bilge",
    email: "sakip.bilge@bilgehotel.com",
    role: "manager",
    canBackup: true,
    canRestore: false,
    lastSignInAt: at(10, 19, 40),
  },
  {
    id: "u-hr",
    name: "Selahattin Alkomut",
    email: "hr@bilgehotel.com",
    role: "manager",
    canBackup: false,
    canRestore: false,
    lastSignInAt: at(11, 9, 12),
  },
  {
    id: "u-sales",
    name: "Levent Sişarpsoy",
    email: "sales@bilgehotel.com",
    role: "manager",
    canBackup: false,
    canRestore: false,
    lastSignInAt: at(9, 15, 0),
  },
  {
    id: "u-rec",
    name: "Gülay Aydınlık",
    email: "reception@bilgehotel.com",
    role: "receptionist",
    canBackup: true,
    canRestore: false,
    lastSignInAt: at(11, 7, 55),
  },
];
