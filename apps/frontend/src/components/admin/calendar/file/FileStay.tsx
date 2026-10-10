import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Card size="sm" className="gap-0 rounded-none bg-surface-container-low p-2 shadow-sm ring-0">
      <span className="block font-mono-data text-[10px] uppercase text-outline">{label}</span>
      {children}
    </Card>
  )
}

function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between text-body-sm text-on-surface">
      <span className="text-outline">{label}</span>
      {children}
    </div>
  )
}

export default function FileStay() {
  return (
    <div className="space-y-space-sm bg-surface-container-lowest p-space-md">
      <div className="flex items-center justify-between pb-1">
        <span className="font-label-sm text-label-sm font-bold tracking-wider text-primary uppercase">
          ALLOCATION & STAY INFORMATION
        </span>
        <span className="font-mono-data text-[11px] font-semibold text-secondary">5 Nights / 6 Days</span>
      </div>
      <div className="grid grid-cols-2 gap-space-sm">
        <Cell label="Room Number & Type">
          <span className="mt-0.5 block font-mono-data text-body-md font-bold text-primary">Room 304 (3rd Floor)</span>
          <span className="text-[11px] text-on-surface-variant">Double Balcony • Full Sea View</span>
        </Cell>
        <Cell label="Board Type">
          <span className="mt-0.5 block font-mono-data text-body-md font-bold text-secondary">All Inclusive (AI)</span>
          <span className="text-[11px] text-on-surface-variant">Early Booking 18% Disc.</span>
        </Cell>
      </div>
      <div className="grid grid-cols-2 gap-space-sm pt-1">
        <Cell label="Check-in">
          <span className="block font-mono-data text-body-sm font-bold text-primary">22 May 2025</span>
          <span className="font-mono-data text-[11px] text-secondary">14:15 (Checked in)</span>
        </Cell>
        <Cell label="Check-out">
          <span className="block font-mono-data text-body-sm font-bold text-primary">27 May 2025</span>
          <span className="font-mono-data text-[11px] text-outline">Noon 10:00 (Expected)</span>
        </Cell>
      </div>
      <div className="pt-1">
        <Line label="Number of Guests:">
          <span className="font-mono-data font-semibold">2 Adults (Ahmet Yılmaz, Deniz Yılmaz)</span>
        </Line>
      </div>
      <Line label="Reservation Channel:">
        <span className="font-mono-data font-semibold text-primary">Direct Web (bilgehotel.com)</span>
      </Line>
      <Line label="Room Key No:">
        <span className="font-mono-data font-semibold text-secondary">RFID-CARD-304A, RFID-CARD-304B</span>
      </Line>
    </div>
  )
}
