import { useHotel } from '@/context/HotelProvider'
import Icon from '@/components/Icon'

export default function Header() {
  const { search, setSearch, roomCounts } = useHotel()
  const occupancy = ((roomCounts.occupied / roomCounts.total) * 100).toFixed(1)

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-surface-container-lowest border-b border-outline-variant/30 z-40 flex items-center justify-between px-gutter">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <Icon
            name="search"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]"
          />
          <input
            className="w-full h-8 pl-8 pr-3 text-body-sm font-body-sm bg-surface-container-low border border-outline-variant/40 rounded focus:border-secondary focus:bg-surface-container-lowest focus:outline-none transition-colors text-on-surface placeholder:text-outline"
            placeholder="Search room, guest or reservation no... [Ctrl+K]"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-surface-container-low border border-outline-variant/30 rounded text-on-surface font-mono-data text-mono-data">
          <Icon name="domain" className="text-secondary text-[16px]" />
          <span>Today: 24 May 2025</span>
          <span className="text-outline-variant">|</span>
          <span className="font-medium text-secondary">
            Occupancy: {occupancy}% ({roomCounts.occupied}/{roomCounts.total} Rooms)
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-outline-variant/30 rounded text-on-surface font-label-sm text-label-sm">
          <Icon name="schedule" className="text-outline text-[16px]" />
          <span>Shift: Morning (08:00 - 16:00)</span>
        </div>
        <button
          className="relative p-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          type="button"
        >
          <Icon name="notifications" className="text-[20px]" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
          </span>
        </button>
        <button
          className="h-8 px-space-md bg-secondary hover:bg-secondary/90 text-on-secondary font-label-sm text-label-sm font-semibold rounded flex items-center gap-1.5 transition-colors shadow-sm"
          type="button"
        >
          <span>+ Quick Reservation</span>
        </button>
        <div className="h-6 w-px bg-outline-variant/30"></div>
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-label-sm text-label-sm text-on-surface font-medium leading-none">
              Selin Yilmaz
            </span>
            <span className="font-body-sm text-[10px] text-outline leading-tight">
              Front Office Manager / Reception
            </span>
          </div>
          <Icon name="expand_more" className="text-outline text-[16px]" />
        </div>
      </div>
    </header>
  )
}
