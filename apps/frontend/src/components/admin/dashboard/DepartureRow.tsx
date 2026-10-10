import { Receipt } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Departure } from '@/data/hotel'
import { cn } from '@/lib/utils'

const badgeTone: Record<Departure['status'], string> = {
  waiting: 'bg-tertiary-fixed text-on-tertiary-fixed',
  late: 'bg-surface-container-highest text-primary',
  left: 'bg-secondary text-on-secondary',
}

const actionTone: Record<Departure['status'], string> = {
  waiting: 'bg-on-tertiary-container text-surface-container-lowest',
  late: 'bg-secondary text-on-secondary',
  left: '',
}

type Props = { departure: Departure; onCheckOut: (id: string) => void }

export default function DepartureRow({ departure, onCheckOut }: Props) {
  const left = departure.status === 'left'

  return (
    <TableRow
      className={cn(
        left ? 'bg-surface-container-low/40' : 'bg-surface-container-lowest',
        'hover:bg-surface-container-low',
      )}
    >
      <TableCell className="nw py-2 px-2.5 font-semibold text-primary">{departure.id}</TableCell>
      <TableCell className="py-2 px-2.5">
        <div className={cn('font-body-sm', left ? 'font-medium text-outline' : 'font-semibold text-on-surface')}>
          {departure.guest}
        </div>
        <div className="font-mono-data text-[10px] text-outline">{departure.detail}</div>
      </TableCell>
      <TableCell className="py-2 px-2.5 font-bold text-primary">
        {departure.room}
        {departure.roomType && (
          <span className="font-normal text-[11px] text-outline ml-1">{departure.roomType}</span>
        )}
      </TableCell>
      <TableCell
        className={cn(
          'py-2 px-2.5 text-right font-semibold',
          departure.positive || left ? 'text-secondary' : 'text-error',
        )}
      >
        {departure.amount}{' '}
        {departure.folio && (
          <span className={cn('block text-[10px] font-normal', departure.positive ? 'text-secondary' : 'text-outline')}>
            {departure.folio}
          </span>
        )}
      </TableCell>
      <TableCell className="py-2 px-2.5">
        <Badge className={cn('h-auto text-[10px] font-semibold', badgeTone[departure.status])}>
          {departure.badge}
        </Badge>
      </TableCell>
      <TableCell className="py-2 px-2.5 text-center">
        {left ? (
          <span className="text-outline font-label-sm text-label-sm flex items-center justify-center gap-1">
            <Receipt className="size-[14px]" /> Printed
          </span>
        ) : (
          <Button
            size="sm"
            className={cn(
              'h-auto px-2 py-1 font-label-sm text-label-sm font-semibold shadow-sm hover:opacity-90',
              actionTone[departure.status],
            )}
            onClick={() => onCheckOut(departure.id)}
          >
            {departure.action}
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
