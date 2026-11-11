import { AccessTable } from "@/src/app/it/components/access/access-table";
import { AuditLog } from "@/src/app/it/components/access/audit-log";
import { PageHeader } from "@/src/app/it/components/page-header";
import { Panel } from "@/src/app/it/components/panel";
import { activity, staffAccess } from "@/src/app/it/data/sample";

export default function AccessPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Access and audit log"
        description="Decide who can take and restore backups, and see everything that was done in this panel."
      />
      <Panel
        title="Backup access"
        description="Only the IT account can change these. It always keeps both."
      >
        <AccessTable staff={staffAccess} />
      </Panel>
      <Panel id="audit" title="Audit log" description="Newest first">
        <AuditLog entries={activity} />
      </Panel>
    </div>
  );
}
