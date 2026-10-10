import { BadgeCheck, Building2, Hotel, SprayCan, Wrench, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

type Kpi = {
  label: string
  icon: LucideIcon
  iconTone: string
  value: string
  valueTone: string
  note: string
  noteClass: string
  percent: number
  bar: string
  className?: string
}

const KPIS: Kpi[] = [
  { label: 'Total Rooms', icon: Building2, iconTone: 'text-outline', value: '77', valueTone: 'text-primary', note: '4 Floor Block', noteClass: 'font-body-sm text-body-sm text-on-surface-variant', percent: 100, bar: '[&_[data-slot=progress-indicator]]:bg-primary' },
  { label: 'Occupied Rooms', icon: Hotel, iconTone: 'text-secondary', value: '62', valueTone: 'text-secondary', note: '80.5% Occupancy', noteClass: 'font-mono-data text-label-sm font-bold text-secondary', percent: 80.5, bar: '[&_[data-slot=progress-indicator]]:bg-secondary' },
  { label: 'Available & Clean', icon: BadgeCheck, iconTone: 'text-on-secondary-container', value: '9', valueTone: 'text-on-secondary-container', note: 'Ready to Sell', noteClass: 'font-body-sm text-body-sm font-medium text-on-secondary-container', percent: 11.7, bar: '[&_[data-slot=progress-indicator]]:bg-on-secondary-container' },
  { label: 'Awaiting Cleaning', icon: SprayCan, iconTone: 'text-on-tertiary-container', value: '4', valueTone: 'text-on-tertiary-container', note: 'Housekeeping', noteClass: 'font-body-sm text-body-sm font-medium text-on-tertiary-container', percent: 5.2, bar: '[&_[data-slot=progress-indicator]]:bg-on-tertiary-container' },
  { label: 'Maintenance / Out of Order', icon: Wrench, iconTone: 'text-error', value: '2', valueTone: 'text-error', note: 'Out of Service', noteClass: 'font-body-sm text-body-sm font-medium text-error', percent: 2.6, bar: '[&_[data-slot=progress-indicator]]:bg-error', className: 'col-span-2 md:col-span-1' },
]

export default function InventoryKpis() {
  return (
    <div className="grid grid-cols-2 gap-space-sm pt-2 md:grid-cols-5">
      {KPIS.map((k) => (
        <Card
          key={k.label}
          size="sm"
          className={cn('justify-between gap-0 rounded-none bg-surface-container-low p-space-sm ring-0', k.className)}
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm tracking-wider uppercase">{k.label}</span>
            <k.icon className={cn('size-[18px]', k.iconTone)} />
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={cn('font-headline-xl text-headline-xl font-mono-data', k.valueTone)}>{k.value}</span>
            <span className={k.noteClass}>{k.note}</span>
          </div>
          <Progress
            value={k.percent}
            className={cn(
              'mt-2 block',
              '[&_[data-slot=progress-track]]:rounded-none [&_[data-slot=progress-track]]:bg-outline-variant/30',
              k.bar,
            )}
          />
        </Card>
      ))}
    </div>
  )
}
