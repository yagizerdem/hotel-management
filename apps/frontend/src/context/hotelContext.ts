import { createContext, useContext } from 'react'
import type {
  Arrival,
  Departure,
  LedgerStatus,
  Reservation,
  Room,
  RoomStatus,
} from '../data/hotel'

export type ArrivalFilter = 'all' | 'pending' | 'vip' | 'unpaid'

export type RoomCounts = Record<RoomStatus, number> & { total: number }

export type HotelContextValue = {
  rooms: Room[]
  arrivals: Arrival[]
  departures: Departure[]
  reservations: Reservation[]
  search: string
  arrivalFilter: ArrivalFilter
  selectedReservationId: string | null
  roomCounts: RoomCounts
  setSearch: (value: string) => void
  setArrivalFilter: (filter: ArrivalFilter) => void
  selectReservation: (id: string | null) => void
  checkIn: (id: string) => void
  checkOut: (id: string) => void
  setRoomStatus: (number: number, status: RoomStatus) => void
  setReservationStatus: (id: string, status: LedgerStatus) => void
}

export const HotelContext = createContext<HotelContextValue | null>(null)

export function useHotel() {
  const value = useContext(HotelContext)
  if (!value) throw new Error('useHotel must be used inside <HotelProvider>')
  return value
}
