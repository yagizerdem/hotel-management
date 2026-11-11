// View models for the IT panel. They describe what each screen shows, so
// the backend can fill them in later without the components changing.

export type Health = "ok" | "warning" | "error" | "unknown";

export type Severity = "error" | "warning" | "info";

export type AttentionItem = {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  action: { label: string; href: string };
};

export type ActivityEntry = {
  id: string;
  at: Date;
  actor: string;
  action: string;
  target?: string;
  result: "success" | "failure";
};

export type BackupKind = "scheduled" | "manual" | "before-restore";

export type Backup = {
  id: string;
  createdAt: Date;
  kind: BackupKind;
  sizeBytes: number;
  durationSeconds: number;
  createdBy: string;
  verified: boolean;
  location: string;
};

export type BackupSchedule = {
  enabled: boolean;
  frequency: "daily" | "weekly";
  time: string;
  weekday: number;
  keepLast: number;
  destination: string;
};

export type StorageUsage = {
  usedBytes: number;
  totalBytes: number;
};

export type DatabaseHost = {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  role: "primary" | "standby";
  active: boolean;
  lastCheckedAt: Date;
  latencyMs?: number;
  health: Health;
};

export type DatabaseStats = {
  version: string;
  sizeBytes: number;
  collections: { name: string; label: string; documents: number }[];
};

export type SetupStep = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
};

export type IntegrationId = "governorship" | "exchange-rates" | "national-id";

export type Integration = {
  id: IntegrationId;
  name: string;
  purpose: string;
  endpoint: string;
  protocol: string;
  schedule: string;
  health: Health;
  lastRunAt?: Date;
  lastResult: string;
  nextRunAt?: Date;
};

export type IntegrationRun = {
  id: string;
  integration: IntegrationId;
  startedAt: Date;
  durationMs: number;
  result: "success" | "failure";
  summary: string;
  attempt: number;
};

export type DeviceKind = "workstation" | "server";

export type Device = {
  id: string;
  name: string;
  kind: DeviceKind;
  location: string;
  os: string;
  ipAddress: string;
  onDomain: boolean;
  online: boolean;
  lastSeenAt: Date;
  role: string;
};

export type StaffAccess = {
  id: string;
  name: string;
  email: string;
  role: "receptionist" | "manager" | "it_admin";
  canBackup: boolean;
  canRestore: boolean;
  lastSignInAt?: Date;
};
