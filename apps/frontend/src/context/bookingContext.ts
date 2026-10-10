import { createContext, useContext } from 'react'

export type RoomFilter = 'all' | 'sea_view' | 'family' | 'suite'

export type Offer = {
  room: string
  board: string
  nights: number
  /** Nightly rate after the early-booking discount. */
  price: number
  /** Nightly rate before the discount. */
  origPrice: number
}

export type BookingContextValue = {
  filter: RoomFilter
  selected: Offer
  setFilter: (filter: RoomFilter) => void
  selectOffer: (offer: Offer) => void
}

export const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const value = useContext(BookingContext)
  if (!value) throw new Error('useBooking must be used inside <BookingProvider>')
  return value
}

export const formatTL = (amount: number) => amount.toLocaleString('tr-TR')
