import { ArrowRight, BadgeCheck, Calendar, Check, CircleX, Clock, DoorOpen, Headset, Lock, Maximize, Phone, RefreshCw, Shield, ShoppingBag, User } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useBooking } from '@/context/BookingProvider'
import { formatTRY } from '@/lib/format'

const INCLUDED = [
  'Open buffet breakfast, lunch and dinner gourmet buffets',
  'Premium local and imported beverage service & snack bars',
  'Private beach cabanas, sun loungers & towel service',
]

function Row({ icon: Icon, label, children, className }: { icon: typeof Calendar; label: string; children: string; className?: string }) {
  return (
    <div className={`flex items-center justify-between ${className ?? ''}`}>
      <span className={`flex items-center gap-1.5 ${className ? '' : 'text-outline'}`}>
        <Icon className="size-4" /> {label}
      </span>
      <span className={className ? 'font-medium' : 'font-medium text-primary'}>{children}</span>
    </div>
  )
}

export default function SelectionSummary() {
  const { selected } = useBooking()
  const [proceeding, setProceeding] = useState(false)

  const subtotal = selected.origPrice * selected.nights
  const total = selected.price * selected.nights
  const discount = subtotal - total
  const discountPct = Math.round((discount / subtotal) * 100)

  const proceed = () => {
    setProceeding(true)
    setTimeout(() => {
      alert('Your selection is confirmed! Redirecting you to step 2: Guest Contact & Billing Details.')
      setProceeding(false)
    }, 700)
  }

  return (
    <aside className="sticky top-44 z-30 flex flex-col gap-space-md lg:col-span-4">
      <Card className="gap-space-md overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-xl ring-0">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-6 text-secondary" />
            <h3 className="font-headline-md text-headline-md text-primary">Selection Summary</h3>
          </div>
          <Badge className="h-auto rounded bg-secondary/15 px-2 py-0.5 font-label-caps text-label-caps font-bold text-secondary uppercase">Step 1 / 3</Badge>
        </div>
        <div className="flex flex-col gap-space-xs rounded-lg bg-surface-container-low p-space-md">
          <span className="font-label-caps text-label-caps text-outline uppercase">Selected Room</span>
          <span className="font-title-sm text-title-sm font-bold text-primary">{selected.room}</span>
          <div className="mt-1 flex items-center justify-between text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1 text-[13px]">
              <DoorOpen className="size-[15px] text-secondary" /> Mediterranean View • 32 m²
            </span>
            <Badge className="h-auto rounded bg-secondary-fixed-dim px-2 py-0.5 text-[11px] font-semibold text-on-secondary-fixed-variant">{selected.board}</Badge>
          </div>
        </div>
        <div className="space-y-2.5 font-body-sm text-body-sm text-on-surface">
          <Row icon={Calendar} label="Dates:">{`24 May – 29 May 2025 (${selected.nights} Nights)`}</Row>
          <Row icon={User} label="Guests:">2 Adults, 0 Children</Row>
          <Row icon={Clock} label="Check-in / Check-out:">14:00 / 10:00</Row>
          <Row icon={CircleX} label="Cancellation Policy:" className="text-[13px] text-secondary">Free until 17 May</Row>
        </div>
        <div className="space-y-1 rounded-lg bg-primary/5 p-3 text-body-sm text-[13px] text-on-surface-variant">
          <span className="block font-label-caps text-label-caps font-semibold text-primary uppercase">Services Included in Package:</span>
          {INCLUDED.map((line) => (
            <div key={line} className="flex items-center gap-1.5 text-on-surface">
              <Check className="size-[14px] text-secondary" />
              <span>{line}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 pt-space-sm font-body-sm text-body-sm">
          <div className="flex items-center justify-between text-outline">
            <span>Standard Amount ({selected.nights} Nights x {formatTRY(selected.origPrice)} TRY):</span>
            <span className="font-medium">{formatTRY(subtotal)} TRY</span>
          </div>
          <div className="flex items-center justify-between font-medium text-secondary">
            <span className="flex items-center gap-1">
              <Maximize className="size-[15px]" /> Early Booking Discount ({discountPct}%):
            </span>
            <span>-{formatTRY(discount)} TRY</span>
          </div>
          <div className="flex items-center justify-between text-[12px] text-outline">
            <span>VAT (10%) and Accommodation Tax (2%):</span>
            <span className="text-on-surface-variant">Included</span>
          </div>
          <div className="flex items-baseline justify-between pt-space-xs">
            <div>
              <span className="block font-title-sm text-title-sm font-bold text-primary">Total Amount</span>
              <span className="text-[11px] text-outline">(Nightly {formatTRY(selected.price)} TRY)</span>
            </div>
            <span className="font-headline-lg text-headline-lg leading-none font-bold text-primary">{formatTRY(total)} TRY</span>
          </div>
        </div>
        <div className="pt-space-xs">
          <Button
            className="group h-auto w-full gap-space-xs rounded-lg bg-secondary py-3.5 font-label-md text-label-md font-semibold text-on-secondary shadow-lg transition-all hover:bg-on-secondary-container hover:text-secondary-fixed hover:shadow-xl"
            onClick={proceed}
          >
            {proceeding ? (
              <>
                <RefreshCw className="size-5 animate-spin" />
                Verifying Details...
              </>
            ) : (
              <>
                Complete Reservation
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
          <span className="mt-2 block text-center text-[11px] text-outline">Your card is not charged immediately • Reception guarantee</span>
        </div>
        <div className="flex items-center justify-around pt-space-xs font-label-caps text-[11px] text-outline">
          <div className="flex items-center gap-1">
            <Lock className="size-4 text-secondary" />
            <span>256-Bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="size-4 text-secondary" />
            <span>3D Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <BadgeCheck className="size-4 text-secondary" />
            <span>Direct Confirmation</span>
          </div>
        </div>
      </Card>
      <Card size="sm" className="flex-row items-center gap-space-md rounded-xl bg-surface-container-low p-space-md shadow-sm ring-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <Headset className="size-5" />
        </div>
        <div>
          <span className="block font-label-caps text-label-caps text-outline uppercase">Personal Assistance</span>
          <p className="font-body-sm text-body-sm font-medium text-primary">Special request or group booking?</p>
          <a className="mt-0.5 inline-flex items-center gap-1 font-label-md text-label-md text-[13px] font-bold text-secondary hover:underline" href="tel:+902428148800">
            <span>+90 242 814 88 00</span>
            <Phone className="size-[14px]" />
          </a>
        </div>
      </Card>
    </aside>
  )
}
