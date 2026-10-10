import type { ReactNode } from 'react'
import { Fragment } from 'react'
import { DoorOpen, Grid3x3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { InventoryCard } from '@/data/inventory'
import { cn } from '@/lib/utils'

const card = 'cursor-pointer justify-between gap-0 rounded-none p-2.5 shadow-sm ring-0'

function Footer({ className, children }: { className: string; children: ReactNode }) {
  return <div className={cn('-mx-2.5 -mb-2.5 mt-3 flex flex-col gap-1 p-2 pt-2', className)}>{children}</div>
}

export default function RoomCard({ data }: { data: InventoryCard }) {
  if (data.kind === 'range') {
    return (
      <Card size="sm" className={cn(card, 'col-span-2 mt-0 cursor-default bg-surface-container-low sm:col-span-1')}>
        <div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm font-semibold text-primary">{data.range}</span>
            <Grid3x3 className="size-4 text-outline" />
          </div>
          <p className="mt-1 font-body-sm text-[11px] text-outline-variant">{data.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between font-mono-data text-[11px] text-secondary">
          <span>{data.occupancy}</span>
          <Badge variant="ghost" className="h-auto rounded-none bg-surface-container-lowest px-1.5 py-0.5 text-primary">
            {data.action}
          </Badge>
        </div>
      </Card>
    )
  }

  if (data.kind === 'fault') {
    return (
      <Card size="sm" className={cn(card, 'bg-error-container/20 ring-1 ring-error')}>
        <div>
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm font-mono-data font-bold text-error">{data.number}</span>
            <Badge className="h-auto rounded-none bg-error px-1.5 py-0 font-mono-data text-[10px] font-bold text-on-error">
              {data.badge}
            </Badge>
          </div>
          <div className="mt-0.5 truncate font-label-sm text-label-sm font-medium text-error">{data.name}</div>
          <div className="mt-2 flex items-center gap-1.5 font-mono-data text-[11px] text-outline">
            <data.icon className="size-[13px] text-error" />
            <span>{data.detail}</span>
          </div>
        </div>
        <Footer className="gap-0.5 bg-error text-on-error">
          <div className="flex items-center justify-between font-label-sm text-[11px] font-bold">
            <span>{data.title}</span>
          </div>
          <div className="flex items-center justify-between font-mono-data text-[10px] opacity-90">
            <span>{data.left}</span>
            <span>{data.right}</span>
          </div>
        </Footer>
      </Card>
    )
  }

  return (
    <Card
      size="sm"
      className={cn(
        card,
        'bg-surface-container-lowest hover:bg-surface-container-low',
        data.royal && 'relative ring-2 ring-on-tertiary-container',
      )}
    >
      {data.royal && (
        <Badge className="absolute top-0 right-0 h-auto rounded-none bg-on-tertiary-container px-1.5 py-0.5 font-label-sm text-[10px] font-bold tracking-widest text-on-tertiary uppercase">
          {data.royal}
        </Badge>
      )}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm font-mono-data font-bold text-primary">{data.number}</span>
          {data.icon && <data.icon className="size-4 text-on-tertiary-container" />}
          {data.type && (
            <Badge variant="ghost" className="h-auto rounded-none bg-surface-container px-1.5 py-0 font-mono-data text-[10px] text-on-surface-variant">
              {data.type}
            </Badge>
          )}
        </div>
        <div
          className={cn(
            'mt-0.5 truncate font-label-sm text-label-sm',
            data.nameStrong ? 'font-semibold text-on-surface-variant' : 'text-outline',
          )}
        >
          {data.name}
        </div>
        <div className="mt-2 flex items-center gap-1.5 font-mono-data text-[11px] text-outline">
          {data.features.map((f, i) => (
            <Fragment key={i}>
              {i > 0 && <span>•</span>}
              <span className="flex items-center gap-0.5" title={f.title}>
                {f.icon && <f.icon className={cn('size-[13px]', f.icon === DoorOpen && 'text-secondary')} />}
                {f.text}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <Footer className={data.footBg}>
        <div className="flex items-center justify-between font-label-sm text-[11px]">
          <span className={cn('truncate', data.guestCls)}>{data.guest}</span>
          <span className={cn('h-2 w-2 rounded-full', data.dot)} title={data.dotTitle}></span>
        </div>
        <div className="flex items-center justify-between font-mono-data text-[10px] text-outline">
          <span className={data.leftCls}>{data.left}</span>
          <span className={data.rightCls}>{data.right}</span>
        </div>
      </Footer>
    </Card>
  )
}
