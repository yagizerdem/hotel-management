import Link from "next/link";
import { ActivityList } from "@/src/app/it/components/activity-list";
import { BackupNowButton } from "@/src/app/it/components/backup-now-button";
import { DevicesTable } from "@/src/app/it/components/devices-table";
import { AttentionList } from "@/src/app/it/components/overview/attention-list";
import {
  StatusStrip,
  type StatusItem,
} from "@/src/app/it/components/overview/status-strip";
import { PageHeader } from "@/src/app/it/components/page-header";
import { Panel } from "@/src/app/it/components/panel";
import {
  activity,
  attentionItems,
  backups,
  databaseHosts,
  devices,
  integrations,
} from "@/src/app/it/data/sample";
import { formatBytes, formatDay, formatTime } from "@/src/app/it/lib/format";
import { textAction } from "@/src/app/it/lib/ui";

// The sample data is fixed on this day; use the real date once it's live.
const TODAY = new Date(2026, 10, 11);

export default function ItOverviewPage() {
  const host = databaseHosts.find((h) => h.active)!;
  const lastBackup = backups[0];
  const governorship = integrations.find((i) => i.id === "governorship")!;
  const rates = integrations.find((i) => i.id === "exchange-rates")!;
  const offline = devices.filter((d) => !d.online).length;

  const status: StatusItem[] = [
    {
      label: "Database",
      health: host.health,
      value: `Connected, ${host.latencyMs} ms`,
      context: host.host,
      href: "/it/database",
    },
    {
      label: "Last backup",
      health: lastBackup.verified ? "ok" : "warning",
      value: `${formatTime(lastBackup.createdAt)}, ${formatBytes(lastBackup.sizeBytes)}`,
      context: lastBackup.verified
        ? "Verified, can be restored"
        : "Not verified yet",
      href: "/it/backups",
    },
    {
      label: "Governorship report",
      health: governorship.health,
      value: governorship.lastRunAt
        ? `Sent at ${formatTime(governorship.lastRunAt)}`
        : "Not sent",
      context: "Yesterday's report failed",
      href: "/it/integrations#governorship",
    },
    {
      label: "Devices",
      health: offline ? "warning" : "ok",
      value: `${devices.length - offline} of ${devices.length} online`,
      context: offline ? `${offline} offline` : "All reachable",
      href: "/it/devices",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Overview"
        description={`System health for today, ${formatDay(TODAY)}. Exchange rates were updated at ${
          rates.lastRunAt ? formatTime(rates.lastRunAt) : "an unknown time"
        }.`}
        action={<BackupNowButton />}
      />

      <StatusStrip items={status} />

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <AttentionList items={attentionItems} />
        <Panel
          title="Recent activity"
          action={
            <Link href="/it/access#audit" className={textAction}>
              Full log
            </Link>
          }
        >
          <ActivityList entries={activity.slice(0, 5)} />
        </Panel>
      </div>

      <Panel
        title="Devices"
        description="Workstations and servers in the hotel"
        action={
          <Link href="/it/devices" className={textAction}>
            All devices
          </Link>
        }
      >
        <DevicesTable devices={devices} compact />
      </Panel>
    </div>
  );
}
