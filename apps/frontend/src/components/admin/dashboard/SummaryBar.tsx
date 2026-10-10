import type { ReactNode } from 'react'
import { LayoutGrid, LogIn, LogOut, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  arrivalsDone: number
  departuresDone: number
  available: number
  occupied: number
  occupancy: string
  dirty: number
  maintenance: number
  maintenanceList: string
}

function Chip({ label, marker, children }: { label: string; marker: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
      <span className={cn('w-1.5 h-3', marker)}></span>
      <span className="font-label-sm text-label-sm uppercase text-outline">{label}:</span>
      {children}
    </div>
  )
}

export default function SummaryBar(p: Props) {
  const value = 'font-mono-data text-mono-data font-semibold'
  const done = 'font-mono-data text-mono-data text-on-surface-variant font-medium'
  const slash = 'text-outline-variant font-mono-data text-mono-data'

  return (
    <Card className="w-full flex-row flex-wrap items-center justify-between gap-2 rounded-none p-2.5 shadow-sm ring-0">
      <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-[720px]">
        <Chip label="Arrivals" marker="bg-secondary">
          <span className={cn(value, 'text-secondary')}>14 Expected</span>
          <span className={slash}>/</span>
          <span className={done}>{p.arrivalsDone} Tamam</span>
        </Chip>
        <Chip label="Departures" marker="bg-on-tertiary-container">
          <span className={cn(value, 'text-on-tertiary-container')}>11 Expected</span>
          <span className={slash}>/</span>
          <span className={done}>{p.departuresDone} Tamam</span>
        </Chip>
        <Chip label="Available" marker="bg-secondary">
          <span className={cn(value, 'text-secondary')}>{p.available} Oda (Temiz)</span>
        </Chip>
        <Chip label="Occupied" marker="bg-primary">
          <span className={cn(value, 'text-primary')}>
            {p.occupied} Oda (%{p.occupancy})
          </span>
        </Chip>
        <Chip label="Cleaning" marker="bg-tertiary-fixed-dim">
          <span className={cn(value, 'text-on-surface')}>{p.dirty} Oda</span>
        </Chip>
        <Chip label="Maintenance" marker="bg-error">
          <span className={cn(value, 'text-error')}>
            {p.maintenance} Oda <span className="text-outline font-normal">({p.maintenanceList})</span>
          </span>
        </Chip>
      </div>
      <div className="flex items-center gap-1.5">
        <Button size="sm" className="bg-secondary text-on-secondary font-label-sm text-label-sm shadow-sm">
          <Plus />
          + New Reservation [F2]
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm"
        >
          <LogIn className="text-secondary" />
          Quick Check-in
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm"
        >
          <LogOut className="text-on-tertiary-container" />
          Quick Check-out
        </Button>
        <Button
          size="sm"
          className="bg-primary-container text-surface-container-lowest hover:bg-primary font-label-sm text-label-sm"
        >
          <LayoutGrid />
          Room Matrix
        </Button>
      </div>
    </Card>
  )
}
