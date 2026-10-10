import { CalendarRange, Download, Printer, SquarePlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useHotel } from '@/context/HotelProvider'

export default function CalendarHeader() {
  const { roomCounts } = useHotel()
  const occupancy = ((roomCounts.occupied / roomCounts.total) * 100).toFixed(1)

  const stats = [
    { label: 'Total Capacity:', value: `${roomCounts.total} Rooms (214 Yatak)`, tone: 'text-primary' },
    { label: 'Current Blocked:', value: `${roomCounts.occupied} Rooms (${occupancy}%)`, tone: 'text-secondary' },
    { label: 'Arrivals Today:', value: '14', tone: 'text-on-surface' },
    { label: 'Departures Today:', value: '11', tone: 'text-on-surface' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-space-md bg-surface-container-low px-space-md py-space-sm shadow-sm">
      <div className="flex flex-wrap items-center gap-space-lg">
        <div className="flex items-center gap-space-xs">
          <CalendarRange className="size-5 text-secondary" />
          <h1 className="font-headline-sm text-headline-sm tracking-tight text-primary">
            Reservation Calendar & Room Occupancy Matrix
          </h1>
          <Badge variant="secondary" className="ml-1 h-auto bg-secondary/10 px-1.5 py-0.5 font-label-sm text-label-sm font-bold tracking-wider text-secondary uppercase">
            PMS Live Terminal
          </Badge>
        </div>
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <div className="flex items-center gap-space-md font-mono-data text-body-sm text-mono-data">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="text-outline">{s.label}</span>
              <span className={`font-semibold ${s.tone}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-space-xs">
        <Button variant="secondary" className="h-8 bg-surface-container-lowest px-space-md text-primary shadow-sm hover:bg-surface-variant font-label-sm text-label-sm">
          <Download />
          Export Excel / Matrix
        </Button>
        <Button variant="secondary" className="h-8 bg-surface-container-lowest px-space-md text-primary shadow-sm hover:bg-surface-variant font-label-sm text-label-sm">
          <Printer />
          Daily Block Slip
        </Button>
        <Button className="h-8 bg-secondary px-space-md text-on-secondary shadow-sm hover:bg-secondary/90 font-label-sm text-label-sm font-semibold">
          <SquarePlus />
          + New Reservation Entry
        </Button>
      </div>
    </div>
  )
}
