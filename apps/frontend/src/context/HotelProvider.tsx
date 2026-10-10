import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  initialArrivals,
  initialDepartures,
  initialReservations,
  initialRooms,
  type LedgerStatus,
  type RoomStatus,
} from '../data/hotel'
import {
  HotelContext,
  type ArrivalFilter,
  type HotelContextValue,
  type RoomCounts,
} from './hotelContext'

const clock = () =>
  new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })

export default function HotelProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState(initialRooms)
  const [arrivals, setArrivals] = useState(initialArrivals)
  const [departures, setDepartures] = useState(initialDepartures)
  const [reservations, setReservations] = useState(initialReservations)
  const [search, setSearch] = useState('')
  const [arrivalFilter, setArrivalFilter] = useState<ArrivalFilter>('all')
  const [selectedReservationId, selectReservation] = useState<string | null>(
    initialReservations[0].id,
  )

  const setRoomStatus = useCallback((number: number, status: RoomStatus) => {
    setRooms((all) => all.map((r) => (r.number === number ? { ...r, status } : r)))
  }, [])

  const checkIn = useCallback(
    (id: string) => {
      const arrival = arrivals.find((a) => a.id === id)
      if (!arrival || arrival.status === 'checkedIn') return
      setArrivals((all) => all.map((a) => (a.id === id ? { ...a, status: 'checkedIn' } : a)))
      setRoomStatus(arrival.room, 'occupied')
    },
    [arrivals, setRoomStatus],
  )

  const checkOut = useCallback(
    (id: string) => {
      const departure = departures.find((d) => d.id === id)
      if (!departure || departure.status === 'left') return
      setDepartures((all) =>
        all.map((d) =>
          d.id === id
            ? { ...d, status: 'left', badge: `AYRILDI (${clock()})`, action: '' }
            : d,
        ),
      )
      setRoomStatus(departure.room, 'dirty')
    },
    [departures, setRoomStatus],
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

  const value = useMemo<HotelContextValue>(
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
    ],
  )

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
}
