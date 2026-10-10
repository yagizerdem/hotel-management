import SelectOfferButton from '@/components/public/booking/SelectOfferButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useBooking } from '@/context/BookingProvider'
import type { ListedRoom } from '@/data/booking'
import { formatTRY } from '@/lib/format'
import { cn } from '@/lib/utils'

const ASIDE = {
  scarcity: 'rounded bg-error-container px-2 py-0.5 text-[11px] font-semibold text-on-error-container',
  accent: 'font-label-caps text-[11px] font-semibold text-secondary',
  muted: 'font-label-caps text-[11px] text-outline',
}

export default function ListedRoomCard({ room, hidden }: { room: ListedRoom; hidden: boolean }) {
  const { selectOffer } = useBooking()
  const AsideIcon = room.aside.icon
  const LocationIcon = room.location.icon

  return (
    <Card
      className={cn(
        'group gap-0 overflow-hidden rounded-xl bg-surface-container-lowest py-0 shadow-md ring-0 transition-all duration-300 hover:shadow-xl',
        hidden && 'hidden',
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className={cn('relative overflow-hidden bg-primary-container md:col-span-5 md:h-full', room.imageHeight)}>
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={room.alt} src={room.image} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
          {room.badge && (
            <Badge
              className={cn(
                'absolute top-3 left-3 h-auto rounded px-2.5 py-1 font-label-caps text-[0.6875rem] font-semibold tracking-wider uppercase shadow-sm',
                room.badge.tone === 'secondary'
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-primary/80 text-on-primary backdrop-blur-md',
              )}
            >
              {room.badge.text}
            </Badge>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded bg-primary/60 px-2.5 py-1 font-label-caps text-label-caps text-on-primary backdrop-blur-md">
            {LocationIcon && <LocationIcon className="size-[14px]" />}
            <span>{room.location.text}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-space-md p-space-lg md:col-span-7">
          <div>
            <div className="mb-1 flex items-center justify-between gap-space-sm">
              <span
                className={cn(
                  'font-label-caps text-label-caps font-bold tracking-widest uppercase',
                  room.eyebrowTone === 'secondary' ? 'text-secondary' : 'font-semibold text-outline',
                )}
              >
                {room.eyebrow}
              </span>
              <span className={cn('flex items-center gap-1', ASIDE[room.aside.kind])}>
                {AsideIcon && <AsideIcon className="size-[13px]" />} {room.aside.text}
              </span>
            </div>
            <h2 className="mb-2 font-headline-md text-headline-md text-primary">{room.title}</h2>
            <div className="mb-space-md flex flex-wrap items-center gap-space-md rounded-lg bg-surface-container-low p-2 font-body-sm text-body-sm text-on-surface-variant">
              {room.specs.map((s) => (
                <span key={s.text} className="flex items-center gap-1">
                  <s.icon className="size-4 text-secondary" /> {s.text}
                </span>
              ))}
            </div>
            <p className="line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">{room.description}</p>
          </div>
          <div className="flex flex-col justify-between gap-space-sm rounded-lg bg-surface p-space-md sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-label-caps text-label-caps font-semibold text-secondary uppercase">{room.plan.label}</span>
                <Badge className="h-auto rounded bg-secondary-container px-1.5 py-0 text-[10px] font-bold text-on-secondary-container">
                  {room.plan.discount}
                </Badge>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-body-sm text-[0.875rem] text-outline line-through">{formatTRY(room.offer.origPrice)} TRY</span>
                <span className="font-headline-md text-headline-md font-bold text-primary">{formatTRY(room.offer.price)} TRY</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
              </div>
              {room.plan.note && <span className="text-[11px] text-outline">{room.plan.note}</span>}
            </div>
            <div className="flex shrink-0 flex-col gap-1.5">
              <SelectOfferButton offer={room.offer} className="justify-center" />
              {room.alternative && (
                <Button
                  variant="link"
                  className="h-auto p-0 text-center text-[12px] text-on-surface-variant hover:text-primary"
                  onClick={() => selectOffer(room.alternative!.offer)}
                >
                  {room.alternative.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
