import { CircleCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Arrival } from '@/data/hotel'
import { cn } from '@/lib/utils'

const rowTone: Record<Arrival['status'], string> = {
  pending: 'bg-surface-container-lowest',
  vip: 'bg-surface-container-low/50',
  checkedIn: 'bg-surface-container-low/30',
}

const statusBadge: Record<Arrival['status'], { label: string; className: string }> = {
  pending: { label: 'PENDING', className: 'bg-surface-container-high text-on-surface' },
  vip: { label: 'VIP EXPECTED', className: 'bg-tertiary-fixed-dim text-on-tertiary' },
  checkedIn: { label: 'CHECKED IN', className: 'bg-secondary text-on-secondary' },
}

const boardTone: Record<Arrival['boardTone'], string> = {
  highlight: 'bg-secondary-fixed text-on-secondary-fixed',
  neutral: 'bg-surface-container-high text-on-surface',
}

function actionClass(arrival: Arrival) {
  if (arrival.status === 'vip') return 'bg-tertiary text-on-tertiary hover:opacity-90'
  if (arrival.unpaid) return 'bg-primary text-on-primary hover:bg-primary-container'
  return 'bg-secondary text-on-secondary shadow-sm hover:opacity-90'
}

type Props = { arrival: Arrival; onCheckIn: (id: string) => void }

export default function ArrivalRow({ arrival, onCheckIn }: Props) {
  const done = arrival.status === 'checkedIn'
  const badge = statusBadge[arrival.status]

  return (
    <TableRow className={cn(rowTone[arrival.status], 'hover:bg-surface-container-low')}>
      <TableCell className={cn('nw py-2 px-2.5 font-semibold', arrival.vip ? 'text-tertiary' : 'text-primary')}>
        {arrival.id}
      </TableCell>
      <TableCell className="py-2 px-2.5">
        <div
          className={cn(
            'font-body-sm font-semibold leading-tight',
            arrival.vip ? 'text-tertiary flex items-center gap-1' : 'text-on-surface',
          )}
        >
          {arrival.guest}
          {arrival.vip && (
            <Badge className="h-auto bg-tertiary-fixed text-on-tertiary-fixed text-[9px] px-1 font-bold">VIP</Badge>
          )}
        </div>
        <div className="font-mono-data text-[10px] text-outline">{arrival.detail}</div>
      </TableCell>
      <TableCell className="py-2 px-2.5">
        <Badge variant="secondary" className="h-auto bg-surface-container font-semibold text-primary px-1.5 py-0.5">
          {arrival.room}
        </Badge>
        <span
          className={cn(
            'font-body-sm ml-1',
            arrival.vip ? 'text-on-surface font-medium' : 'text-on-surface-variant',
          )}
        >
          {arrival.roomType}
        </span>
      </TableCell>
      <TableCell className="nw py-2 px-2.5 text-outline">{arrival.stay}</TableCell>
      <TableCell className="py-2 px-2.5">
        <Badge className={cn('h-auto text-[10px] font-semibold', boardTone[arrival.boardTone])}>
          {arrival.board}
        </Badge>
      </TableCell>
      <TableCell className="py-2 px-2.5">
        <Badge className={cn('h-auto text-[10px] font-semibold', badge.className)}>{badge.label}</Badge>
      </TableCell>
      <TableCell
        className={cn('py-2 px-2.5 text-right font-semibold', arrival.unpaid ? 'text-error' : 'text-secondary')}
      >
        {arrival.amount}{' '}
        {arrival.paymentLabel &&
          (arrival.unpaid ? (
            <span className="text-[10px] font-bold block text-error">{arrival.paymentLabel}</span>
          ) : (
            <span className="text-[10px] font-normal text-outline">{arrival.paymentLabel}</span>
          ))}
      </TableCell>
      <TableCell className="py-2 px-2.5 text-center">
        {done ? (
          <span className="text-secondary font-label-sm text-label-sm flex items-center justify-center gap-0.5">
            <CircleCheck className="size-[14px]" /> In Room
          </span>
        ) : (
          <Button
            size="sm"
            className={cn('h-auto px-2 py-1 font-label-sm text-label-sm font-semibold', actionClass(arrival))}
            onClick={() => onCheckIn(arrival.id)}
          >
            {arrival.action}
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
