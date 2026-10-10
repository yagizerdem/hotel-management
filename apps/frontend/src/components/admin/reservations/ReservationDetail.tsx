import { DoorClosed, Printer, X } from 'lucide-react'
import DetailActions from '@/components/admin/reservations/detail/DetailActions'
import DetailFolio from '@/components/admin/reservations/detail/DetailFolio'
import DetailGuest from '@/components/admin/reservations/detail/DetailGuest'
import { detailChip, statusTone } from '@/components/admin/reservations/statusStyles'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { LedgerStatus, Reservation } from '@/data/hotel'
import { cn } from '@/lib/utils'

type Props = {
  reservation: Reservation
  onClose: () => void
  onStatusChange: (id: string, status: LedgerStatus) => void
}

export default function ReservationDetail({ reservation: r, onClose, onStatusChange }: Props) {
  const d = r.details

  return (
    <Card className="w-full 2xl:w-[460px] shrink-0 gap-0 rounded-none py-0 shadow-sm ring-0">
      <CardHeader className="flex-row items-center justify-between bg-primary p-space-md text-on-primary">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider font-semibold">
              SELECTED DETAIL CARD
            </span>
            <Badge className={cn('h-auto font-label-sm text-[10px] font-bold uppercase', statusTone[r.status])}>
              {detailChip[r.status]}
            </Badge>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-surface-container-lowest mt-0.5">
            {r.id} • {r.guest}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            title="Print"
            aria-label="Print"
            className="text-surface-variant hover:bg-primary-container hover:text-surface-variant"
          >
            <Printer className="size-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            title="Close"
            aria-label="Close"
            className="text-surface-variant hover:bg-primary-container hover:text-surface-variant"
            onClick={onClose}
          >
            <X className="size-[18px]" />
          </Button>
        </div>
      </CardHeader>

      <div className="p-3 bg-surface-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DoorClosed className="text-secondary size-6" />
          <div>
            <div className="font-label-md text-label-md font-bold text-primary">{r.room}</div>
            <div className="text-[11px] text-on-surface-variant">
              {d?.roomNote ? `${r.roomInfo} • ${d.roomNote}` : r.roomInfo}
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="xs"
          className="bg-surface-container-lowest text-on-surface hover:bg-surface-variant text-[11px] font-label-sm uppercase font-semibold"
        >
          Change Room
        </Button>
      </div>

      <CardContent className="space-y-4 p-space-md">
        <DetailGuest reservation={r} />
        <DetailFolio reservation={r} />
        <DetailActions reservation={r} onStatusChange={onStatusChange} />
      </CardContent>
    </Card>
  )
}
