import { Baby, CircleCheck } from 'lucide-react'
import { paymentTone } from '@/components/admin/reservations/statusStyles'
import { sectionTitle } from '@/components/admin/reservations/detail/DetailGuest'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Reservation } from '@/data/hotel'
import { cn } from '@/lib/utils'

export default function DetailFolio({ reservation: r }: { reservation: Reservation }) {
  const d = r.details

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={sectionTitle}>ACCOUNT STATEMENT & FOLIO</span>
          {d && (
            <span className="font-mono-data text-mono-data text-[11px] text-secondary font-medium">
              Folyo No: {d.folioNo}
            </span>
          )}
        </div>
        <div className="bg-surface-container-low p-3 space-y-2 font-mono-data text-mono-data text-body-sm">
          {d?.folio.map((line) => (
            <div
              key={line.label}
              className={cn(
                'flex items-center justify-between',
                line.tone === 'discount' ? 'text-[#38866C]' : 'text-on-surface',
              )}
            >
              <span>{line.label}</span>
              <span className={line.tone === 'muted' ? 'text-on-surface-variant' : 'font-semibold'}>
                {line.value}
              </span>
            </div>
          ))}
          {d && <Separator className="my-1 bg-outline-variant/40" />}
          <div className="flex items-center justify-between text-base font-bold text-primary pt-1">
            <span className="font-headline-sm text-headline-sm">Grand Total:</span>
            <span className="text-headline-sm text-secondary">{r.total}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold pt-0.5">
            <span className="text-on-surface-variant">Payment Status:</span>
            <Badge className={cn('h-auto px-1.5 uppercase', paymentTone[r.paymentTone])}>{r.payment}</Badge>
          </div>
          {d && (
            <>
              <div className="flex items-center justify-between text-[11px] text-[#38866C] font-semibold">
                <span>Collected (Credit Card / Virtual POS):</span>
                <span>{d.paid}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                <span>Remaining Balance:</span>
                <span className="font-bold text-[#38866C]">{d.balance}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {d && (
        <div className="space-y-1">
          <span className={sectionTitle}>RESERVATION & FRONT DESK NOTES</span>
          <div className="bg-surface-container-low p-2.5 space-y-1.5 text-body-sm font-body-sm text-on-surface">
            <div className="flex items-start gap-1.5">
              <Baby className="size-4 text-secondary mt-0.5" />
              <p>
                <strong className="font-semibold text-primary">Guest Note:</strong> "{d.guestNote}"
              </p>
            </div>
            <div className="flex items-start gap-1.5 text-on-surface-variant text-[11px] pt-1">
              <CircleCheck className="size-[14px] text-outline mt-0.5" />
              <span>{d.housekeepingNote}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
