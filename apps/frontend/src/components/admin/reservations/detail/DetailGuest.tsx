import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Reservation } from '@/data/hotel'

export const sectionTitle =
  'font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold'

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="text-on-surface-variant block text-[11px]">{label}</span>
      {children}
    </div>
  )
}

export default function DetailGuest({ reservation: r }: { reservation: Reservation }) {
  const d = r.details

  return (
    <>
      <div className="space-y-1">
        <span className={sectionTitle}>GUEST INFORMATION</span>
        <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm bg-surface-container-low p-2.5">
          {d && (
            <Item label="ID / Passport No:">
              <span className="font-mono-data text-mono-data font-semibold text-on-surface">{d.idNumber}</span>
            </Item>
          )}
          <Item label="Phone:">
            <span className="font-mono-data text-mono-data text-on-surface">{r.phone}</span>
          </Item>
          {d && (
            <>
              <Item label="Email:">
                <span className="truncate block text-on-surface">{d.email}</span>
              </Item>
              <Item label="Nationality / Language:">
                <span className="text-on-surface font-medium">{d.nationality}</span>
              </Item>
            </>
          )}
          <Item label="Guests / Board:">
            <span className="text-on-surface font-medium">
              {r.pax} • {r.board}
            </span>
          </Item>
        </div>
      </div>

      {d ? (
        <div className="grid grid-cols-3 gap-2 text-center bg-surface-container-low p-2">
          <div>
            <span className="block text-[10px] text-on-surface-variant font-label-sm uppercase">CHECK-IN</span>
            <span className="font-mono-data text-mono-data font-bold text-primary">{d.checkIn}</span>
            <span className="block text-[10px] text-on-surface-variant">{d.checkInTime}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ArrowRight className="text-secondary size-4" />
            <span className="font-mono-data text-[11px] font-semibold text-secondary">
              {r.nights.split(' (')[0]}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-on-surface-variant font-label-sm uppercase">CHECK-OUT</span>
            <span className="font-mono-data text-mono-data font-bold text-primary">{d.checkOut}</span>
            <span className="block text-[10px] text-on-surface-variant">{d.checkOutTime}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-surface-container-low p-2 font-mono-data text-mono-data">
          <span className="font-medium text-primary">{r.dates}</span>
          <span className="text-[11px] font-semibold text-secondary">{r.nights}</span>
        </div>
      )}
    </>
  )
}
