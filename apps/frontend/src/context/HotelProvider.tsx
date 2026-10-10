import { createContext, useCallback, useContext, useMemo, useState } from "react"
import {
  initialArrivals,
  initialDepartures,
  initialReservations,
  initialRooms,
  type Arrival,
  type Departure,
  type LedgerStatus,
  type Reservation,
  type Room,
  type RoomStatus,
} from "@/data/hotel"

export type ArrivalFilter = "all" | "pending" | "vip" | "unpaid"

export type RoomCounts = Record<RoomStatus, number> & { total: number }

type HotelProviderProps = {
  children: React.ReactNode
}

type HotelProviderState = {
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

const initialState: HotelProviderState = {
  rooms: initialRooms,
  arrivals: initialArrivals,
  departures: initialDepartures,
  reservations: initialReservations,
  search: "",
  arrivalFilter: "all",
  selectedReservationId: initialReservations[0].id,
  roomCounts: { occupied: 0, available: 0, dirty: 0, maintenance: 0, arrival: 0, total: 0 },
  setSearch: () => null,
  setArrivalFilter: () => null,
  selectReservation: () => null,
  checkIn: () => null,
  checkOut: () => null,
  setRoomStatus: () => null,
  setReservationStatus: () => null,
}

const HotelProviderContext = createContext<HotelProviderState>(initialState)

const clock = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

export function HotelProvider({ children, ...props }: HotelProviderProps) {
  const [rooms, setRooms] = useState(initialState.rooms)
  const [arrivals, setArrivals] = useState(initialState.arrivals)
  const [departures, setDepartures] = useState(initialState.departures)
  const [reservations, setReservations] = useState(initialState.reservations)
  const [search, setSearch] = useState(initialState.search)
  const [arrivalFilter, setArrivalFilter] = useState<ArrivalFilter>(initialState.arrivalFilter)
  const [selectedReservationId, selectReservation] = useState<string | null>(
    initialState.selectedReservationId
  )

  const setRoomStatus = useCallback((number: number, status: RoomStatus) => {
    setRooms((all) => all.map((r) => (r.number === number ? { ...r, status } : r)))
  }, [])

  const checkIn = useCallback(
    (id: string) => {
      const arrival = arrivals.find((a) => a.id === id)
      if (!arrival || arrival.status === "checkedIn") return
      setArrivals((all) => all.map((a) => (a.id === id ? { ...a, status: "checkedIn" } : a)))
      setRoomStatus(arrival.room, "occupied")
    },
    [arrivals, setRoomStatus]
  )

  const checkOut = useCallback(
    (id: string) => {
      const departure = departures.find((d) => d.id === id)
      if (!departure || departure.status === "left") return
      setDepartures((all) =>
        all.map((d) =>
          d.id === id
            ? { ...d, status: "left", badge: `DEPARTED (${clock()})`, action: "" }
            : d
        )
      )
      setRoomStatus(departure.room, "dirty")
    },
    [departures, setRoomStatus]
  )

  const setReservationStatus = useCallback((id: string, status: LedgerStatus) => {
    setReservations((all) => all.map((r) => (r.id === id ? { ...r, status } : r)))
  }, [])

  const roomCounts = useMemo<RoomCounts>(() => {
    const counts: RoomCounts = {
      occupied: 0,
      available: 0,
      dirty: 0,
      maintenance: 0,
      arrival: 0,
      total: rooms.length,
    }
    for (const room of rooms) counts[room.status] += 1
    return counts
  }, [rooms])

  const value = useMemo(
    () => ({
      rooms,
      arrivals,
      departures,
      reservations,
      search,
      arrivalFilter,
      selectedReservationId,
      roomCounts,
      setSearch,
      setArrivalFilter,
      selectReservation,
      checkIn,
      checkOut,
      setRoomStatus,
      setReservationStatus,
    }),
    [
      rooms,
      arrivals,
      departures,
      reservations,
      search,
      arrivalFilter,
      selectedReservationId,
      roomCounts,
      checkIn,
      checkOut,
      setRoomStatus,
      setReservationStatus,
    ]
  )

  return (
    <HotelProviderContext.Provider {...props} value={value}>
      {children}
    </HotelProviderContext.Provider>
  )
}

export const useHotel = () => {
  const context = useContext(HotelProviderContext)

  if (context === undefined)
    throw new Error("useHotel must be used within a HotelProvider")

  return context
}
