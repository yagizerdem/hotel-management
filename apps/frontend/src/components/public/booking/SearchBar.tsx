import { CalendarDays, RefreshCw, Users, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useBooking, type RoomFilter } from '@/context/BookingProvider'

const FILTERS: { key: RoomFilter; label: string }[] = [
  { key: 'all', label: 'All Rooms (77 Rooms)' },
  { key: 'sea_view', label: 'Balcony & Sea View' },
  { key: 'family', label: 'Family Rooms' },
  { key: 'suite', label: 'Suite & Royal Penthouse' },
]

const tile = 'rounded-lg bg-surface-container-lowest p-3'
const caption = 'font-label-caps text-label-caps text-outline uppercase'

export default function SearchBar() {
  const { filter, setFilter } = useBooking()
  const [updating, setUpdating] = useState(false)

  const refreshAvailability = () => {
    setUpdating(true)
    setTimeout(() => setUpdating(false), 600)
  }

  return (
    <section className="sticky top-20 z-40 -mt-4 w-full bg-surface-container-lowest/95 shadow-lg backdrop-blur-xl">
      <div className="mx-auto max-w-[1360px] px-margin py-space-md md:px-margin-tablet lg:px-margin-desktop">
        <form
          className="grid grid-cols-1 items-center gap-space-sm rounded-xl bg-surface-container-low p-2.5 shadow-sm md:grid-cols-2 lg:grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={`${tile} group flex cursor-pointer items-center justify-between gap-space-sm transition-colors hover:bg-surface-container lg:col-span-4`}>
            <div className="flex items-center gap-space-sm">
              <CalendarDays className="text-secondary transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className={caption}>Check-in — Check-out Date</span>
                <span className="font-title-sm text-title-sm tracking-tight text-primary">24 May 2025 — 29 May 2025</span>
              </div>
            </div>
            <Badge className="h-auto bg-secondary-container px-2 py-0.5 text-[11px] font-semibold text-on-secondary-container">5 Nights</Badge>
          </div>
          <div className={`${tile} group flex cursor-pointer items-center gap-space-sm transition-colors hover:bg-surface-container lg:col-span-3`}>
            <Users className="text-secondary transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className={caption}>Guests</span>
              <span className="font-title-sm text-title-sm tracking-tight text-primary">2 Adults • 0 Children • 1 Room</span>
            </div>
          </div>
          <div className={`${tile} flex items-center gap-space-sm lg:col-span-3`}>
            <UtensilsCrossed className="text-secondary" />
            <div className="flex w-full flex-col">
              <span className={caption}>Board Type</span>
              <RadioGroup defaultValue="all_inclusive" className="mt-0.5 flex w-auto items-center gap-space-md">
                <Label className="cursor-pointer gap-1 font-label-md text-body-sm text-on-surface">
                  <RadioGroupItem value="all_inclusive" className="size-3.5 data-checked:border-secondary data-checked:bg-secondary" />
                  All Inclusive
                </Label>
                <Label className="cursor-pointer gap-1 font-label-md text-body-sm text-on-surface">
                  <RadioGroupItem value="full_board" className="size-3.5 data-checked:border-secondary data-checked:bg-secondary" />
                  Full Board
                </Label>
              </RadioGroup>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Button
              type="button"
              className="h-[52px] w-full gap-space-xs rounded-lg bg-secondary font-label-md text-label-md text-on-secondary shadow-md transition-all hover:bg-on-secondary-container hover:text-secondary-fixed"
              onClick={refreshAvailability}
            >
              <RefreshCw className={updating ? 'animate-spin' : ''} />
              {updating ? 'Updating...' : 'Update Availability'}
            </Button>
          </div>
        </form>
        <div className="mt-space-sm flex flex-col justify-between gap-space-sm font-body-sm text-body-sm lg:flex-row lg:items-center">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as RoomFilter)} className="overflow-x-auto pb-1 lg:pb-0">
            <TabsList className="h-auto gap-space-xs bg-transparent p-0">
              {FILTERS.map((f) => (
                <TabsTrigger
                  key={f.key}
                  value={f.key}
                  className="h-auto flex-none rounded-full bg-surface-container px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high data-active:bg-primary data-active:text-on-primary data-active:shadow-sm"
                >
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex shrink-0 items-center gap-space-xs font-label-md text-label-md text-secondary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary"></span>
            </span>
            <span className="font-medium text-primary">15 rooms available on the selected dates</span>
            <span className="text-outline">•</span>
            <span className="text-on-surface-variant">Best Price Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
