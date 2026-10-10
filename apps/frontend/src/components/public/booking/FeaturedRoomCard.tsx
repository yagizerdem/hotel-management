import { CircleCheck, Hourglass, Images } from 'lucide-react'
import SelectOfferButton from '@/components/public/booking/SelectOfferButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { FeaturedRoom } from '@/data/booking'
import { cn } from '@/lib/utils'
import { formatTRY } from '@/lib/format'

export default function FeaturedRoomCard({ room, hidden }: { room: FeaturedRoom; hidden: boolean }) {
  return (
    <Card
      className={cn(
        'group gap-0 overflow-hidden rounded-xl bg-surface-container-lowest py-0 shadow-md ring-0 transition-all duration-300 hover:shadow-xl',
        hidden && 'hidden',
      )}
    >
      <div className="relative h-[360px] w-full overflow-hidden bg-primary-container">
        <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={room.alt} src={room.image} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30"></div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {room.badges.map((b) => (
            <Badge
              key={b.text}
              className={cn(
                'h-auto gap-1 px-3 py-1 font-label-caps text-label-caps tracking-wider uppercase shadow-sm',
                b.tone === 'primary'
                  ? 'bg-primary/80 text-secondary-fixed backdrop-blur-md'
                  : 'bg-secondary text-on-secondary',
              )}
            >
              {b.icon && <b.icon className="size-[14px]" />}
              {b.text}
            </Badge>
          ))}
        </div>
        <div className="absolute top-4 right-4 rounded-lg bg-surface-container-lowest/90 px-3 py-1 font-label-caps text-label-caps text-primary shadow-sm backdrop-blur-md">
          {room.floor}
        </div>
        <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between text-on-primary">
          <div>
            <span className="font-label-caps text-xs tracking-widest text-secondary-fixed uppercase">{room.eyebrow}</span>
            <h2 className="font-headline-lg text-headline-lg leading-tight text-surface-bright drop-shadow-md">{room.title}</h2>
          </div>
          <div className="flex items-center gap-1.5 pb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-surface-container-lowest/60"></span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-space-md p-space-lg">
        <div className="grid grid-cols-2 gap-space-sm rounded-lg bg-surface-container-low p-space-md text-on-surface sm:grid-cols-4">
          {room.specs.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className="size-5 text-secondary" />
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] text-outline uppercase">{s.label}</span>
                <span className="font-label-md text-label-md font-semibold text-primary">{s.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-space-md gap-y-2 font-body-sm text-body-sm text-on-surface-variant">
          {room.perks.map((p) => (
            <span key={p.text} className={cn('flex items-center gap-1', p.highlight ? 'font-medium text-secondary' : 'text-primary')}>
              {p.icon ? <p.icon className="size-4" /> : <CircleCheck className="size-4 text-secondary" />} {p.text}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-space-md pt-space-xs md:grid-cols-2">
          {room.plans.map((plan) => (
            <div
              key={plan.title}
              className="relative flex flex-col justify-between rounded-lg bg-surface p-space-md shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={cn(
                      'font-label-caps text-label-caps tracking-wider uppercase',
                      plan.recommended ? 'font-bold text-secondary' : 'text-outline',
                    )}
                  >
                    {plan.eyebrow}
                  </span>
                  <h3 className="font-title-sm text-title-sm text-primary">{plan.title}</h3>
                  <p className="mt-1 font-body-sm text-body-sm text-outline-variant">{plan.description}</p>
                </div>
                <plan.icon className={plan.recommended ? 'text-secondary' : 'text-outline'} />
              </div>
              <div className="mt-space-md flex items-end justify-between pt-space-sm">
                <div>
                  <span className="font-body-sm text-body-sm text-outline line-through">{formatTRY(plan.offer.origPrice)} TRY</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-md text-headline-md font-bold text-primary">{formatTRY(plan.offer.price)} TRY</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                  </div>
                </div>
                <SelectOfferButton offer={plan.offer} className="px-4" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-space-xs font-label-md text-label-md">
          <Button variant="link" className="h-auto gap-1 p-0 text-secondary hover:text-primary hover:no-underline">
            <Images className="size-[18px]" />
            {room.gallery}
          </Button>
          <span className="flex items-center gap-1 font-body-sm text-body-sm font-medium text-error">
            <Hourglass className="size-4" /> {room.scarcity}
          </span>
        </div>
      </div>
    </Card>
  )
}
