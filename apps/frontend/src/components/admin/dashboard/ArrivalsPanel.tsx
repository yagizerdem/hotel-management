import { ClipboardCheck } from 'lucide-react'
import ArrivalRow from '@/components/admin/dashboard/ArrivalRow'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ArrivalFilter } from '@/context/HotelProvider'
import type { Arrival } from '@/data/hotel'

const HEAD = 'h-auto py-1.5 px-2.5 font-semibold text-primary'

type Props = {
  arrivals: Arrival[]
  filters: { key: ArrivalFilter; label: string; count: number }[]
  filter: ArrivalFilter
  onFilterChange: (filter: ArrivalFilter) => void
  pending: number
  done: number
  onCheckIn: (id: string) => void
}

export default function ArrivalsPanel({ arrivals, filters, filter, onFilterChange, pending, done, onCheckIn }: Props) {
  return (
    <Card className="gap-0 rounded-none py-0 shadow-sm ring-0">
      <div className="px-3 py-2 bg-primary-container text-surface-container-lowest flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="size-[17px] text-secondary-fixed" />
          <span className="font-headline-sm text-headline-sm tracking-tight font-semibold">
            Today's Arrivals (Check-in List)
          </span>
          <span className="font-mono-data text-[10px] bg-primary text-secondary-fixed px-1.5 py-0.5 uppercase tracking-wide">
            14:00 Start
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono-data text-mono-data text-on-primary-container">
          <span>
            Pending: <strong className="text-surface-container-lowest">{pending}</strong>
          </span>
          <span>•</span>
          <span>
            Completed: <strong className="text-secondary-fixed">{done}</strong>
          </span>
        </div>
      </div>
      <div className="bg-surface-container-low px-3 py-1.5 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
        <Tabs value={filter} onValueChange={(v) => onFilterChange(v as ArrivalFilter)}>
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase text-outline">Filter:</span>
            <TabsList className="h-auto bg-transparent p-0 gap-2">
              {filters.map((f) => (
                <TabsTrigger
                  key={f.key}
                  value={f.key}
                  className="h-auto flex-none px-2 py-0.5 text-outline hover:bg-surface-container data-active:bg-surface-container-lowest data-active:text-primary data-active:shadow-sm data-active:font-semibold"
                >
                  {f.label} ({f.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        <span className="font-mono-data text-[11px] text-outline">Auto-synced: 12:44:02</span>
      </div>
      <Table className="text-left font-body-sm text-body-sm">
        <TableHeader className="bg-surface-container font-label-sm text-label-sm uppercase">
          <TableRow className="hover:bg-surface-container">
            <TableHead className={HEAD}>Res. No</TableHead>
            <TableHead className={HEAD}>Guest Name</TableHead>
            <TableHead className={HEAD}>Room & Type</TableHead>
            <TableHead className={HEAD}>Stay</TableHead>
            <TableHead className={HEAD}>Board</TableHead>
            <TableHead className={HEAD}>Status</TableHead>
            <TableHead className={`${HEAD} text-right`}>Balance</TableHead>
            <TableHead className={`${HEAD} text-center`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-mono-data text-[12px] [&_td:not(.nw)]:whitespace-normal">
          {arrivals.map((arrival) => (
            <ArrivalRow key={arrival.id} arrival={arrival} onCheckIn={onCheckIn} />
          ))}
        </TableBody>
      </Table>
      <div className="p-2 bg-surface-container-low flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
        <span>Toplam 14 rezervasyondan {arrivals.length}'i listeleniyor</span>
        <div className="flex gap-1">
          <Button size="xs" className="bg-surface-container-lowest text-primary shadow-sm font-semibold hover:bg-surface-container-lowest">
            1
          </Button>
          <Button variant="secondary" size="xs" className="bg-surface-container text-outline hover:text-primary">
            2
          </Button>
          <Button variant="secondary" size="xs" className="bg-surface-container text-outline hover:text-primary">
            3
          </Button>
        </div>
      </div>
    </Card>
  )
}
