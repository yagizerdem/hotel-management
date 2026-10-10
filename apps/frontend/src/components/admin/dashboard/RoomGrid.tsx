import { useHotel } from '@/context/HotelProvider'
import type { RoomStatus } from '@/data/hotel'

const cellTone: Record<RoomStatus, string> = {
  occupied: 'bg-secondary text-on-secondary',
  available: 'bg-secondary-fixed text-on-secondary-fixed',
  dirty: 'bg-tertiary-fixed-dim text-on-tertiary',
  maintenance: 'bg-error text-on-error',
  arrival: 'bg-tertiary text-on-tertiary',
}

type Floor = 1 | 2 | 3 | 4

export default function RoomGrid({ floor }: { floor: Floor }) {
  const { rooms } = useHotel()

  return (
    <div className="grid grid-cols-10 gap-1 font-mono-data text-[10px] text-center font-bold">
      {rooms
        .filter((room) => room.floor === floor)
        .map((room) =>
          room.label ? (
            <div
              key={room.number}
              className={`col-span-2 ${cellTone[room.status]} py-1 px-0.5 flex flex-col items-center justify-center cursor-pointer hover:opacity-90`}
              title={room.note}
            >
              <span className="text-[9px] leading-tight">{room.number}</span>
              <span className="text-[8px] opacity-80 uppercase tracking-tighter">{room.label}</span>
            </div>
          ) : (
            <div
              key={room.number}
              className={`${cellTone[room.status]} py-1 cursor-pointer`}
              title={room.note}
            >
              {room.number}
            </div>
          ),
        )}
    </div>
  )
}

export function FloorSummary({ floor }: { floor: Floor }) {
  const { rooms } = useHotel()
  const floorRooms = rooms.filter((room) => room.floor === floor)
  const count = (...statuses: RoomStatus[]) =>
    floorRooms.filter((room) => statuses.includes(room.status)).length
  const parts = [
    `${count('occupied', 'arrival')} Occupied`,
    `${count('available')} Vacant`,
    count('dirty') ? `${count('dirty')} Cleaning` : '',
    count('maintenance') ? `${count('maintenance')} Maintenance` : '',
  ].filter(Boolean)

  return <span className="font-mono-data text-[10px] text-outline">{parts.join(' / ')}</span>
}
