import ReservationRow from '@/components/admin/reservations/ReservationRow'
import ReservationPager from '@/components/admin/reservations/ReservationPager'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { LedgerStatus, Reservation } from '@/data/hotel'

const COLUMNS = [
  'RES NO',
  'GUEST INFO',
  'ROOM & FLOOR',
  'STAY DATES',
  'GUESTS',
  'BOARD',
  'KAYNAK',
  'TOTAL / PAYMENT',
  'DURUM',
  'ACTIONS',
]

type Props = {
  rows: Reservation[]
  total: number
  selectedId: string | null
  onSelect: (id: string) => void
  onStatusChange: (id: string, status: LedgerStatus) => void
}

export default function ReservationTable({ rows, total, selectedId, onSelect, onStatusChange }: Props) {
  return (
    <div className="flex-1 w-full overflow-x-auto bg-surface-container-lowest shadow-sm">
      <Table className="text-left">
        <TableHeader>
          <TableRow className="bg-surface-container hover:bg-surface-container text-on-surface font-label-sm text-label-sm tracking-wider uppercase select-none">
            {COLUMNS.map((h, i) => (
              <TableHead
                key={h}
                className={`h-auto py-2.5 px-3 font-semibold text-on-surface ${
                  i === COLUMNS.length - 1 ? 'text-center' : i === 7 ? 'text-right' : ''
                }`}
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-body-sm font-body-sm">
          {rows.map((r) => (
            <ReservationRow
              key={r.id}
              reservation={r}
              selected={r.id === selectedId}
              onSelect={onSelect}
              onStatusChange={onStatusChange}
            />
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={COLUMNS.length} className="py-8 text-center text-on-surface-variant">
                No reservations match the filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ReservationPager shown={rows.length} total={total} />
    </div>
  )
}
