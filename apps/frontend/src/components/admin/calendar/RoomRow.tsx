import BookingBar from '@/components/admin/calendar/BookingBar'
import { Badge } from '@/components/ui/badge'
import { calendarDays, type CalendarRoom } from '@/data/calendar'
import { cn } from '@/lib/utils'

export default function RoomRow({ room }: { room: CalendarRoom }) {
  const TrailingIcon = room.trailingIcon?.icon

  return (
    <div
      className={cn(
        'group relative flex h-11 transition-colors',
        room.selected ? 'bg-secondary/5 shadow-inner' : 'bg-surface-container-lowest hover:bg-surface-container-low',
      )}
    >
      <div
        className={cn(
          'sticky left-0 z-20 flex w-64 min-w-[256px] max-w-[256px] items-center justify-between px-space-md shadow-sm',
          room.selected
            ? 'bg-secondary-fixed/40'
            : 'bg-surface-container-lowest group-hover:bg-surface-container-low',
        )}
      >
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={cn('shrink-0 whitespace-nowrap font-mono-data text-body-lg font-bold', room.numberClass)}>Room {room.number}</span>
            <Badge variant="ghost" className={cn('h-auto rounded-none px-1 font-label-sm text-[10px]', room.tag.className)}>
              {room.tag.label}
            </Badge>
          </div>
          <span className={cn('text-[11px] text-outline truncate', room.descriptionClass)}>{room.description}</span>
        </div>
        <div className="flex items-center gap-1">
          {room.status && (
            <Badge
              variant="ghost"
              className={cn('h-auto rounded-none px-1 font-mono-data text-[10px] font-semibold', room.status.className)}
            >
              {room.status.label}
            </Badge>
          )}
          {TrailingIcon && <TrailingIcon className={cn('size-3', room.trailingIcon?.className)} />}
        </div>
      </div>
      <div className="relative grid h-full flex-1 grid-cols-13">
        {calendarDays.map((day) => (
          <div
            key={day.date}
            className={cn(
              'h-full',
              day.today ? (room.selected ? 'bg-secondary-fixed/30' : 'bg-secondary-fixed/20') : 'bg-surface-container-lowest',
            )}
          ></div>
        ))}
        {room.bookings.map((b) => (
          <BookingBar key={b.left} booking={b} />
        ))}
      </div>
    </div>
  )
}
