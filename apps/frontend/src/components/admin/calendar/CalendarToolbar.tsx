import { CalendarCheck, CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const FILTERS = [
  ['Floor: All (77 Rooms)', '1st Floor (20 Rooms)', '2nd Floor (22 Rooms)', '3rd Floor (20 Rooms)', '4th Floor / Penthouse (15 Rooms)'],
  [
    'Room Type: All',
    'Standard Single (SGL)',
    'Standard Twin (TWN)',
    'Double Sea View Balcony (DBL-SV)',
    'Family Suite Triple (TRP)',
    'Deluxe Quad (QUAD)',
    'Royal Penthouse Suite (VIP)',
  ],
  ['Status: All', 'Available Rooms', 'Occupied / In-House', 'Confirmed Reserved', 'Awaiting Cleaning', 'Maintenance / Blocked'],
]

const LEGEND = [
  { label: 'Available', marker: 'bg-surface-container-lowest shadow-sm' },
  { label: 'Reserved', marker: 'bg-secondary' },
  { label: 'In-House', marker: 'bg-primary' },
  { label: 'Cleaning', marker: 'bg-tertiary-fixed-dim' },
  { label: 'Maintenance/Fault', marker: 'bg-error' },
  { label: 'VIP Suite', marker: 'bg-on-tertiary-container' },
]

const navButton = 'h-8 bg-transparent text-on-surface hover:bg-surface-variant'

export default function CalendarToolbar() {
  return (
    <div className="mt-1 flex flex-col justify-between gap-space-sm bg-surface-container-lowest p-space-sm shadow-sm lg:flex-row lg:items-center">
      <div className="flex flex-wrap items-center gap-space-xs">
        <div className="flex items-center bg-surface-container-low shadow-sm">
          <Button variant="ghost" size="icon" title="Previous Week" aria-label="Previous Week" className={navButton}>
            <ChevronLeft className="size-[18px]" />
          </Button>
          <Button variant="ghost" className="h-8 bg-surface-container-lowest px-3 font-label-sm text-label-sm font-bold text-secondary hover:bg-surface-variant">
            <CalendarCheck />
            TODAY
          </Button>
          <Button variant="ghost" size="icon" title="Next Week" aria-label="Next Week" className={navButton}>
            <ChevronRight className="size-[18px]" />
          </Button>
        </div>
        <div className="flex h-8 items-center gap-2 bg-surface-container-low px-3 font-mono-data text-mono-data font-semibold text-primary shadow-sm">
          <CalendarRange className="size-4 text-secondary" />
          <span>19 May 2025 – 31 May 2025</span>
          <span className="text-[11px] font-normal tracking-wider text-outline">(13 Nights / 2 Weeks)</span>
        </div>
        <div className="flex items-center gap-1">
          {FILTERS.map((options) => (
            <NativeSelect key={options[0]} className="bg-surface-container-low text-primary">
              {options.map((o) => (
                <NativeSelectOption key={o}>{o}</NativeSelectOption>
              ))}
            </NativeSelect>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-space-md lg:justify-end">
        <div className="flex flex-wrap items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
          {LEGEND.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 ${l.marker}`}></span>
              <span>{l.label}</span>
            </span>
          ))}
        </div>
        <Tabs defaultValue="weekly">
          <TabsList className="h-auto bg-surface-container-low p-0 shadow-sm">
            {['daily', 'weekly', 'monthly'].map((v) => (
              <TabsTrigger
                key={v}
                value={v}
                className="h-7 flex-none px-2.5 font-label-sm text-label-sm capitalize text-on-surface hover:bg-surface-variant data-active:bg-secondary data-active:font-bold data-active:text-on-secondary"
              >
                {v}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
