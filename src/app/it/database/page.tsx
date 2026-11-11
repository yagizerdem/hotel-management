import { ConnectionForm } from "@/src/app/it/components/database/connection-form";
import { DatabaseStats } from "@/src/app/it/components/database/database-stats";
import { HostsList } from "@/src/app/it/components/database/hosts-list";
import { SetupSteps } from "@/src/app/it/components/database/setup-steps";
import { PageHeader } from "@/src/app/it/components/page-header";
import { Panel } from "@/src/app/it/components/panel";
import {
  databaseHosts,
  databaseStats,
  setupSteps,
} from "@/src/app/it/data/sample";

export default function DatabasePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Database"
        description="Where the hotel's data lives. Move it to another server, check the connection, or set the app up on a new machine."
      />

      <Panel
        title="Servers"
        description="The app uses one server at a time. A standby server can take over if the main one is replaced."
      >
        <HostsList hosts={databaseHosts} />
      </Panel>

      <div className="grid gap-8 lg:grid-cols-2">
        <Panel
          title="Add a server"
          description="The server is saved only after the connection test passes."
        >
          <ConnectionForm />
        </Panel>
        <div className="flex flex-col gap-8">
          <Panel title="Contents">
            <DatabaseStats stats={databaseStats} />
          </Panel>
          <Panel
            title="Setup"
            description="Prepares an empty server for the app."
          >
            <SetupSteps steps={setupSteps} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
