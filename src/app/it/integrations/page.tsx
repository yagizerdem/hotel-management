import { IntegrationSection } from "@/src/app/it/components/integrations/integration-section";
import { PageHeader } from "@/src/app/it/components/page-header";
import { integrationRuns, integrations } from "@/src/app/it/data/sample";

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Integrations"
        description="Outside services the hotel depends on: the governorship's guest report, the day's exchange rates and the T.C. identity number check."
      />
      {integrations.map((integration) => (
        <IntegrationSection
          key={integration.id}
          integration={integration}
          runs={integrationRuns.filter(
            (run) => run.integration === integration.id,
          )}
        />
      ))}
    </div>
  );
}
