import { DoorOpen, RefreshCw, Refrigerator } from 'lucide-react'

const LEGEND = [
  { label: 'Occupied', marker: 'bg-primary-container' },
  { label: 'Arriving', marker: 'bg-secondary' },
  { label: 'Available & Clean', marker: 'bg-surface-container-lowest ring-1 ring-secondary' },
  { label: 'Dirty / Being Cleaned', marker: 'bg-tertiary-fixed' },
  { label: 'Faulty / Maintenance', marker: 'bg-error-container' },
  { label: 'Royal / VIP', marker: 'bg-on-tertiary-container' },
]

export default function InventoryLegend() {
  return (
    <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-space-sm bg-surface-container px-space-lg py-2">
      <div className="flex flex-wrap items-center gap-space-md font-body-sm text-body-sm text-on-surface">
        <span className="font-label-sm text-label-sm font-semibold text-outline uppercase">Legend:</span>
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className={`h-3 w-3 ${l.marker}`}></span> {l.label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-space-md font-mono-data text-mono-data text-outline">
        <span className="flex items-center gap-1">
          <DoorOpen className="size-[14px]" /> With Balcony (40 Rooms)
        </span>
        <span className="flex items-center gap-1">
          <Refrigerator className="size-[14px]" /> Minibar Stocked (58)
        </span>
        <span className="flex items-center gap-1">
          <RefreshCw className="size-[14px]" /> Auto-refresh: 30s
        </span>
      </div>
    </div>
  )
}
