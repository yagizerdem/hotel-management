import { Bell, Building, ChevronDown, Clock, Search, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useHotel } from '@/context/HotelProvider'

export default function Header() {
  const { search, setSearch, roomCounts } = useHotel()
  const occupancy = ((roomCounts.occupied / roomCounts.total) * 100).toFixed(1)

  return (
    <header className="sticky top-0 z-40 h-14 shrink-0 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between px-gutter">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        <SidebarTrigger className="md:hidden" />
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-1/2 size-[18px] -translate-y-1/2 text-outline" />
          <Input
            className="h-8 pl-8 bg-surface-container-low text-body-sm font-body-sm"
            placeholder="Search room, guest or reservation no... [Ctrl+K]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <Badge
          variant="outline"
          className="hidden xl:flex h-auto gap-2 px-2.5 py-1 bg-surface-container-low text-on-surface font-mono-data text-mono-data"
        >
          <Building className="text-secondary" />
          <span>Today: 24 May 2025</span>
          <span className="text-outline-variant">|</span>
          <span className="font-medium text-secondary">
            Occupancy: {occupancy}% ({roomCounts.occupied}/{roomCounts.total} Rooms)
          </span>
        </Badge>
        <Badge
          variant="outline"
          className="hidden lg:flex h-auto gap-1.5 px-2.5 py-1 bg-surface-container-low text-on-surface font-label-sm text-label-sm"
        >
          <Clock className="text-outline" />
          <span>Shift: Morning (08:00 - 16:00)</span>
        </Badge>
        <Button variant="ghost" size="icon" className="relative text-on-surface-variant" aria-label="Notifications">
          <Bell className="size-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
          </span>
        </Button>
        <Button className="h-8 px-space-md bg-secondary text-on-secondary hover:bg-secondary/90 font-label-sm text-label-sm font-semibold shadow-sm">
          + Quick Reservation
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <Avatar>
            <AvatarFallback className="bg-primary text-on-primary">
              <User className="size-[18px]" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-label-sm text-label-sm text-on-surface font-medium leading-none">
              Selin Yilmaz
            </span>
            <span className="font-body-sm text-[10px] text-outline leading-tight">
              Front Office Manager / Reception
            </span>
          </div>
          <ChevronDown className="size-4 text-outline" />
        </div>
      </div>
    </header>
  )
}
