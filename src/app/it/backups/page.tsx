import { BackupNowButton } from "@/src/app/it/components/backup-now-button";
import { BackupsTable } from "@/src/app/it/components/backups/backups-table";
import { RestoreFromFile } from "@/src/app/it/components/backups/restore-from-file";
import { ScheduleForm } from "@/src/app/it/components/backups/schedule-form";
import { StorageMeter } from "@/src/app/it/components/backups/storage-meter";
import { PageHeader } from "@/src/app/it/components/page-header";
import { Panel } from "@/src/app/it/components/panel";
import {
  backupSchedule,
  backupStorage,
  backups,
} from "@/src/app/it/data/sample";

export default function BackupsPage() {
  const averageBackupBytes =
    backups.reduce((sum, b) => sum + b.sizeBytes, 0) /
    Math.max(1, backups.length);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Backups"
        description="Take a backup of the whole database, restore one, and decide when backups run on their own."
        action={<BackupNowButton />}
      />

      <Panel
        title="Backups"
        description="Newest first. Restoring takes a fresh backup before it replaces anything."
      >
        <BackupsTable backups={backups} />
      </Panel>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <Panel id="schedule" title="Schedule">
          <ScheduleForm initial={backupSchedule} />
        </Panel>

        <div className="flex flex-col gap-8">
          <Panel title="Storage">
            <StorageMeter
              usage={backupStorage}
              averageBackupBytes={averageBackupBytes}
            />
          </Panel>
          <Panel
            title="Restore from a file"
            description="For a backup kept outside this server."
          >
            <RestoreFromFile />
          </Panel>
        </div>
      </div>
    </div>
  );
}
