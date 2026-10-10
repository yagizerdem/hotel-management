import { Building2 } from 'lucide-react'
import RoomGrid, { FloorSummary } from '@/components/admin/dashboard/RoomGrid'
import PanelHeader from '@/components/common/PanelHeader'
import { Card } from '@/components/ui/card'

const FLOORS = [
  { floor: 4, name: '4TH FLOOR', info: '17 Rooms (10 Double, 6 Quad, 1 Royal)' },
  { floor: 3, name: '3RD FLOOR', info: '20 Rooms (10 Double, 10 Triple with Balcony)' },
  { floor: 2, name: '2ND FLOOR', info: '20 Rooms (10 Single, 10 Twin)' },
  { floor: 1, name: '1ST FLOOR', info: '20 Rooms (10 Single, 10 Triple)' },
] as const

type Props = {
  counts: { total: number; occupied: number; available: number; dirty: number; maintenance: number }
  occupancy: string
}

export default function FloorStatusPanel({ counts, occupancy }: Props) {
  const legend = [
    { marker: 'bg-secondary', label: `Dolu (${counts.occupied})` },
    { marker: 'bg-secondary-fixed', label: `Available (${counts.available})` },
    { marker: 'bg-tertiary-fixed-dim', label: `Kirli/Temizlik (${counts.dirty})` },
    { marker: 'bg-error', label: `Maintenance (${counts.maintenance})` },
  ]

  return (
    <Card className="gap-0 rounded-none p-3 shadow-sm ring-0">
      <PanelHeader icon={Building2} title={`Live Floor & Room Status (${counts.total} Rooms)`}>
        <span className="font-mono-data text-mono-data font-bold text-secondary">%{occupancy} Doluluk</span>
      </PanelHeader>
      <div className="flex items-center justify-between gap-1 py-1.5 px-2 bg-surface-container-lowest mb-2.5 text-[11px] font-label-sm uppercase">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 inline-block ${l.marker}`}></span>
            <span className="text-on-surface">{l.label}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2.5">
        {FLOORS.map((f) => (
          <div key={f.floor} className="bg-surface-container-low p-2">
            <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
              <span className="font-semibold text-primary flex items-center gap-1">
                <span className="text-secondary font-mono-data">{f.name}</span> • {f.info}
              </span>
              <FloorSummary floor={f.floor} />
            </div>
            <RoomGrid floor={f.floor} />
          </div>
        ))}
      </div>
    </Card>
  )
}
