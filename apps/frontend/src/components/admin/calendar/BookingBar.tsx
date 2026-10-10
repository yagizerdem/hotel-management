import { Badge } from '@/components/ui/badge'
import type { Booking, BookingTone } from '@/data/calendar'
import { cn } from '@/lib/utils'

const TONE: Record<BookingTone, string> = {
  inhouse: 'bg-primary text-on-primary cursor-pointer hover:brightness-110',
  reserved: 'bg-secondary text-on-secondary cursor-pointer hover:brightness-110',
  pending: 'bg-surface-container-high text-primary cursor-pointer hover:bg-surface-variant',
  departing: 'bg-surface-container-high text-primary opacity-70',
  block: 'bg-error-container text-on-error-container cursor-not-allowed',
  vip: 'bg-tertiary-container text-on-tertiary cursor-pointer hover:brightness-110',
}

export default function BookingBar({ booking: b }: { booking: Booking }) {
  const Icon = b.icon

  return (
    <div
      className={cn(
        'absolute z-10 flex items-center justify-between px-2 shadow-sm transition-all',
        b.emphasis ? 'top-1 bottom-1 z-20 px-3 shadow-md' : 'top-1.5 bottom-1.5',
        TONE[b.tone],
      )}
      style={{ left: `${b.left}%`, width: `${b.width}%` }}
    >
      <div className="flex items-center gap-1.5 truncate">
        {Icon && <Icon className={cn('size-[14px] shrink-0', b.emphasis && 'size-4', b.iconClass)} />}
        <div className="flex flex-col truncate">
          <span
            className={cn(
              'font-mono-data truncate',
              b.emphasis ? 'text-body-sm font-bold' : 'text-[11px] font-semibold',
              b.tone === 'vip' && 'text-tertiary-fixed',
            )}
          >
            {b.text}
          </span>
          {b.sub && <span className="text-[10px] font-mono-data opacity-90 truncate leading-none">{b.sub}</span>}
        </div>
        {b.extra && <span className="hidden md:inline text-[11px] text-surface-container-high">{b.extra}</span>}
      </div>
      <Badge
        variant="ghost"
        className={cn('h-auto rounded-none p-0 text-[10px] font-mono-data whitespace-nowrap', b.tag.className)}
      >
        {b.tag.label}
      </Badge>
    </div>
  )
}
