import { CircleCheck, Coffee, DoorOpen, Fan, Hammer, IdCard, Key, Pencil, Refrigerator, SprayCan, Tv, Wifi, Wind, Bath } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const AMENITIES = [
  { icon: Fan, label: 'Independent A/C' },
  { icon: Tv, label: '65" Smart TV' },
  { icon: Wifi, label: 'Dedicated Wi-Fi 6' },
  { icon: Bath, label: 'Jakuzi' },
  { icon: DoorOpen, label: 'Mediterranean Terrace' },
  { icon: Refrigerator, label: 'Premium Minibar' },
  { icon: Wind, label: 'Hair Dryer & Grooming Kit' },
  { icon: Coffee, label: 'Nespresso Bar' },
]

const SPECS = [
  { label: 'Capacity', value: '4 Guests (Max)', className: 'text-primary' },
  { label: 'Net Area', value: '95 m² + 30m²', className: 'text-primary' },
  { label: 'View', value: 'Panoramic Sea View', className: 'text-secondary' },
]

const LOGS = [
  { icon: SprayCan, iconTone: 'text-secondary', title: 'Last Cleaning & Linen Change', note: 'Attendant: Fatma Şahin • Supervisor Approved', stamp: 'Today 11:20', stampTone: 'text-on-secondary-container' },
  { icon: CircleCheck, iconTone: 'text-on-secondary-container', title: 'Technical Equipment Status', note: 'A/C, Jacuzzi, TV, Safe: Flawless', stamp: 'Report: OK', stampTone: 'text-secondary' },
]

const sectionTitle = 'font-label-sm text-label-sm font-semibold tracking-wider text-on-surface-variant uppercase'
const action = 'h-8 bg-surface-container font-label-sm text-label-sm font-medium text-on-surface hover:bg-surface-container-high'

export default function RoomReview() {
  return (
    <Card className="sticky top-16 w-full gap-0 rounded-none bg-surface-container-lowest p-space-md shadow-sm ring-0 xl:w-[420px]">
      <div className="flex items-center justify-between bg-surface-container-low p-space-sm pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-on-tertiary-container"></span>
          <div>
            <div className="font-label-sm text-label-sm tracking-wider text-outline uppercase">SELECTED ROOM REVIEW</div>
            <h3 className="mt-0.5 font-headline-sm text-headline-sm leading-none text-primary">Room 401 — Royal Suite</h3>
          </div>
        </div>
        <Badge className="h-auto rounded-none bg-on-tertiary-container px-2 py-0.5 font-mono-data text-[10px] font-bold tracking-wider text-on-tertiary uppercase">
          VIP LEVEL
        </Badge>
      </div>

      <div className="relative mt-3 h-40 w-full overflow-hidden bg-surface-container-high">
        <img className="h-full w-full object-cover" alt="Royal penthouse suite with private jacuzzi and panoramic sea view" src="/images/img-2.jpg" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 via-transparent to-transparent p-space-sm">
          <div className="text-surface-container-lowest">
            <span className="font-label-sm text-[10px] tracking-wider text-secondary-fixed uppercase">4th Floor • Terrace Suite Block</span>
            <div className="font-body-lg text-body-lg font-bold">1 King Bed + Luxury Seating Area</div>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1 bg-surface-container-low p-2 font-mono-data text-[11px]">
        {SPECS.map((s, i) => (
          <div key={s.label} className={i === 1 ? 'flex flex-col border-x border-outline-variant/30 px-2' : i === 2 ? 'flex flex-col pl-2' : 'flex flex-col'}>
            <span className="text-[10px] text-outline uppercase">{s.label}</span>
            <span className={`font-bold ${s.className}`}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <span className={sectionTitle}>Room Features & Amenities</span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {AMENITIES.map((a) => (
            <Badge key={a.label} variant="ghost" className="h-auto rounded-none bg-surface-container-low px-2 py-1 font-body-sm text-[11px] font-normal text-on-surface">
              <a.icon className="size-[13px] text-secondary" /> {a.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-2 bg-surface-container-low p-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm font-semibold tracking-wider text-outline uppercase">Active Guest & Reservation</span>
          <Badge className="h-auto rounded-none bg-secondary px-1.5 py-0.5 font-mono-data text-[10px] text-on-secondary">RES #88419</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-bold text-on-primary">MW</div>
            <div>
              <div className="font-body-md text-body-md font-bold text-primary">Markus Weber</div>
              <div className="font-mono-data text-[11px] text-outline">Germany • 2 Adults, 1 Child</div>
            </div>
          </div>
          <span className="text-right font-mono-data text-[11px]">
            <span className="block font-bold text-secondary">Ultra All Inclusive</span>
            <span className="text-outline">24 - 30 May 2025</span>
          </span>
        </div>
        <Separator className="bg-outline-variant/30" />
        <div className="flex items-center justify-between font-mono-data text-[11px] text-outline">
          <span>Check-in: 24 May 14:10</span>
          <span>Departure: 30 May 12:00 (6 Nights)</span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <span className={sectionTitle}>Technical & Cleaning Audit Logs</span>
        {LOGS.map((l) => (
          <div key={l.title} className="flex items-start justify-between bg-surface-container-low p-2 text-body-sm">
            <div className="flex items-start gap-2">
              <l.icon className={`mt-0.5 size-4 ${l.iconTone}`} />
              <div>
                <div className="font-medium text-on-surface">{l.title}</div>
                <div className="text-[11px] text-outline">{l.note}</div>
              </div>
            </div>
            <span className={`font-mono-data text-[11px] font-semibold ${l.stampTone}`}>{l.stamp}</span>
          </div>
        ))}
      </div>

      <Separator className="mt-4 bg-outline-variant/30" />
      <div className="grid grid-cols-2 gap-2 pt-3">
        <Button className="h-8 bg-secondary font-label-sm text-label-sm font-semibold text-on-secondary shadow-sm hover:bg-secondary/90">
          <Pencil />
          Update Status
        </Button>
        <Button variant="secondary" className={action}>
          <IdCard />
          Assign Cleaning
        </Button>
        <Button variant="secondary" className={action}>
          <Key />
          Encode Room Key
        </Button>
        <Button variant="secondary" className={`${action} text-error hover:bg-error/10`}>
          <Hammer />
          Take to Maintenance (Block)
        </Button>
      </div>
    </Card>
  )
}
