import type { ReactNode } from 'react'
import { Eye, Folder, Pencil, Printer, X } from 'lucide-react'
import { paymentTone, statusLabel, statusTone } from '@/components/admin/reservations/statusStyles'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { LedgerStatus, Reservation } from '@/data/hotel'
import { cn } from '@/lib/utils'

const textButton = 'h-6 px-2 font-label-sm text-[11px] uppercase tracking-wide'
const primaryText = `${textButton} bg-secondary text-on-secondary hover:bg-on-secondary-container`
const neutralText = `${textButton} bg-surface-container text-on-surface hover:bg-surface-variant`

type Props = {
  reservation: Reservation
  selected: boolean
  onSelect: (id: string) => void
  onStatusChange: (id: string, status: LedgerStatus) => void
}

function IconAction({ title, onClick, children }: { title: string; onClick?: () => void; children: ReactNode }) {
  return (
    <Button
      variant="secondary"
      size="icon-xs"
      title={title}
      aria-label={title}
      className="bg-surface-container text-on-surface hover:bg-surface-variant"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default function ReservationRow({ reservation: r, selected, onSelect, onStatusChange }: Props) {
  const select = () => onSelect(r.id)

  return (
    <TableRow
      className={cn('cursor-pointer', selected && 'bg-secondary/5 hover:bg-secondary/10')}
      onClick={select}
    >
      <TableCell className="py-2 px-3 font-mono-data text-mono-data font-semibold text-secondary">
        {r.id}
        <span className="block text-[10px] text-on-surface-variant font-normal">{r.createdAt}</span>
      </TableCell>
      <TableCell className="py-2 px-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-5 h-3.5 px-0 text-[9px] font-bold text-primary-container">
            {r.country}
          </Badge>
          <div>
            <div className="font-semibold text-on-surface">{r.guest}</div>
            <div className="text-[11px] font-mono-data text-on-surface-variant">{r.phone}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-2 px-3">
        <div className="font-medium text-on-surface">{r.room}</div>
        <div className="text-[11px] text-on-surface-variant">{r.roomInfo}</div>
      </TableCell>
      <TableCell className="py-2 px-3 font-mono-data text-mono-data">
        <div className="text-on-surface font-medium">{r.dates}</div>
        <span className="text-[11px] text-on-surface-variant">{r.nights}</span>
      </TableCell>
      <TableCell className="py-2 px-3">
        <span className="inline-flex items-center gap-1 font-mono-data">
          <r.paxIcon className="size-[14px] text-outline" />
          <span>{r.pax}</span>
        </span>
      </TableCell>
      <TableCell className="py-2 px-3">
        <Badge
          variant="secondary"
          className="bg-surface-container-high text-on-surface font-label-sm text-label-sm tracking-wider uppercase font-semibold"
        >
          {r.board}
        </Badge>
      </TableCell>
      <TableCell className="py-2 px-3">
        <div className="flex items-center gap-1 text-[11px]">
          <r.sourceIcon className="size-[14px] text-secondary" />
          <span className="font-medium">{r.source}</span>
        </div>
      </TableCell>
      <TableCell className="py-2 px-3 text-right font-mono-data text-mono-data">
        <div className="font-bold text-on-surface">{r.total}</div>
        <Badge className={cn('font-label-sm text-[10px] font-semibold uppercase', paymentTone[r.paymentTone])}>
          {r.payment}
        </Badge>
      </TableCell>
      <TableCell className="py-2 px-3">
        <Badge
          className={cn('font-label-sm text-label-sm font-semibold uppercase tracking-wider', statusTone[r.status])}
        >
          {statusLabel[r.status]}
        </Badge>
      </TableCell>
      <TableCell className="py-2 px-3 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center gap-1">
          {r.status === 'checkedIn' && (
            <>
              <IconAction title="Review & Folio" onClick={select}>
                <Eye />
              </IconAction>
              <IconAction title="Edit">
                <Pencil />
              </IconAction>
              <IconAction title="Print">
                <Printer />
              </IconAction>
            </>
          )}
          {r.status === 'confirmed' && (
            <>
              {r.arrivesToday ? (
                <Button className={primaryText} onClick={() => onStatusChange(r.id, 'checkedIn')}>
                  Check-In
                </Button>
              ) : (
                <Button variant="secondary" className={neutralText} onClick={select}>
                  Detay
                </Button>
              )}
              <IconAction title="Edit">
                <Pencil />
              </IconAction>
            </>
          )}
          {r.status === 'pending' && (
            <>
              <Button className={primaryText} onClick={() => onStatusChange(r.id, 'confirmed')}>
                Onayla
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                title="Cancel"
                aria-label="Cancel"
                className="text-error hover:bg-error-container"
                onClick={() => onStatusChange(r.id, 'cancelled')}
              >
                <X />
              </Button>
            </>
          )}
          {r.status === 'checkedOut' && (
            <>
              <Button variant="secondary" className={neutralText}>
                Fatura
              </Button>
              <IconAction title="Archive">
                <Folder />
              </IconAction>
            </>
          )}
          {r.status === 'cancelled' && (
            <Button variant="secondary" className={neutralText} onClick={() => onStatusChange(r.id, 'pending')}>
              Geri Al
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
