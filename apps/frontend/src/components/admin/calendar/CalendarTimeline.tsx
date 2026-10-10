import { useEffect, useRef } from 'react'
import RoomRow from '@/components/admin/calendar/RoomRow'
import { Badge } from '@/components/ui/badge'
import { calendarDays, calendarFloors } from '@/data/calendar'
import { cn } from '@/lib/utils'

function DayHeader() {
  return (
    <div className="sticky top-0 z-30 flex bg-surface-container-high text-primary shadow-sm">
      <div className="sticky left-0 z-40 flex w-64 min-w-[256px] max-w-[256px] flex-col justify-between bg-primary px-space-md py-2 text-on-primary shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">ROOM & FLOOR PLAN</span>
          <span className="font-mono-data text-[10px] text-surface-variant">77 UNITS</span>
        </div>
        <div className="flex items-center justify-between pt-1 font-mono-data text-[11px] text-surface-variant">
          <span>NO / TYPE</span>
          <span>CAPACITY / STATUS</span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-13 text-center">
        {calendarDays.map((d) => (
          <div
            key={d.date}
            className={cn(
              'flex flex-col px-1 py-1.5',
              d.today
                ? 'relative bg-secondary-fixed font-semibold text-on-secondary-fixed shadow-sm'
                : 'bg-surface-container-high',
            )}
          >
            {d.today && (
              <Badge className="absolute -top-1 left-1/2 h-auto -translate-x-1/2 rounded-none bg-secondary px-1.5 py-0 text-[9px] font-bold tracking-wider text-on-secondary uppercase">
                TODAY
              </Badge>
            )}
            <span className={cn('font-mono-data text-[11px] uppercase', d.today ? 'text-secondary' : 'text-outline')}>
              {d.dow}
            </span>
            <span
              className={cn('font-headline-sm text-headline-sm leading-tight', d.today ? 'text-secondary' : 'text-primary')}
            >
              {d.date}
            </span>
            <span
              className={cn(
                'mt-0.5 font-mono-data text-[10px]',
                d.today ? 'font-bold text-primary' : 'font-medium text-secondary',
              )}
            >
              {d.load} Full
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CalendarTimeline() {
  const ref = useRef<HTMLDivElement>(null)

  // Keep today's column in view when the timeline first opens.
  useEffect(() => {
    if (ref.current) ref.current.scrollLeft = 240
  }, [])

  return (
    <div ref={ref} className="relative flex-1 select-none overflow-auto bg-surface-container-lowest">
      <div className="flex min-w-[1380px] flex-col">
        <DayHeader />
        {calendarFloors.map((floor) => (
          <div key={floor.name}>
            <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold tracking-wider text-on-surface uppercase shadow-sm">
              <floor.icon className={cn('mr-1.5 size-4', floor.iconClass)} />
              <span>{floor.name}</span>
              <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| {floor.summary}</span>
            </div>
            {floor.rooms.map((room) => (
              <RoomRow key={room.number} room={room} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
