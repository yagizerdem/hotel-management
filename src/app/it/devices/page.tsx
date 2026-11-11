import { DevicesBrowser } from "@/src/app/it/components/devices/devices-browser";
import { LocationsSummary } from "@/src/app/it/components/devices/locations-summary";
import { PageHeader } from "@/src/app/it/components/page-header";
import { devices } from "@/src/app/it/data/sample";

export default function DevicesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Devices"
        description="Every computer and server in the hotel, where it is and whether the app can reach it."
      />
      <LocationsSummary devices={devices} />
      <DevicesBrowser devices={devices} />
    </div>
  );
}
