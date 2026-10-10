import { Luggage } from 'lucide-react'
import DepartureRow from '@/components/admin/dashboard/DepartureRow'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Departure } from '@/data/hotel'

const HEAD = 'h-auto py-1.5 px-2.5 font-semibold text-primary'

type Props = {
  departures: Departure[]
  remaining: number
  done: number
  onCheckOut: (id: string) => void
}

export default function DeparturesPanel({ departures, remaining, done, onCheckOut }: Props) {
  return (
    <Card className="gap-0 rounded-none py-0 shadow-sm ring-0">
      <div className="px-3 py-2 bg-primary text-surface-container-lowest flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Luggage className="size-[17px] text-tertiary-fixed-dim" />
          <span className="font-headline-sm text-headline-sm tracking-tight font-semibold">
            Today's Departures (Check-out List)
          </span>
          <span className="font-mono-data text-[10px] bg-primary-container text-surface-variant px-1.5 py-0.5 uppercase tracking-wide">
            10:00 - 12:00 Handover
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono-data text-mono-data text-on-primary-container">
          <span>
            Remaining: <strong className="text-tertiary-fixed-dim">{remaining}</strong>
          </span>
          <span>•</span>
          <span>
            Departed: <strong className="text-surface-container-lowest">{done}</strong>
          </span>
        </div>
      </div>
      <Table className="text-left font-body-sm text-body-sm">
        <TableHeader className="bg-surface-container font-label-sm text-label-sm uppercase">
          <TableRow className="hover:bg-surface-container">
            <TableHead className={HEAD}>Res. No</TableHead>
            <TableHead className={HEAD}>Guest Name</TableHead>
            <TableHead className={HEAD}>Room</TableHead>
            <TableHead className={`${HEAD} text-right`}>Folio / Extras</TableHead>
            <TableHead className={HEAD}>Status</TableHead>
            <TableHead className={`${HEAD} text-center`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-mono-data text-[12px] [&_td:not(.nw)]:whitespace-normal">
          {departures.map((departure) => (
            <DepartureRow key={departure.id} departure={departure} onCheckOut={onCheckOut} />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
