import { createContext, useContext, useMemo, useState } from "react"

export type RoomFilter = "all" | "sea_view" | "family" | "suite"

export type Offer = {
  room: string
  board: string
  nights: number
  /** Nightly rate after the early-booking discount. */
  price: number
  /** Nightly rate before the discount. */
  origPrice: number
}

type BookingProviderProps = {
  children: React.ReactNode
}

type BookingProviderState = {
  filter: RoomFilter
  selected: Offer
  setFilter: (filter: RoomFilter) => void
  selectOffer: (offer: Offer) => void
}

const DEFAULT_OFFER: Offer = {
  room: "Double Superior Room with Balcony",
  board: "All Inclusive",
  nights: 5,
  price: 3485,
  origPrice: 4250,
}

const initialState: BookingProviderState = {
  filter: "all",
  selected: DEFAULT_OFFER,
  setFilter: () => null,
  selectOffer: () => null,
}

const BookingProviderContext = createContext<BookingProviderState>(initialState)

export function BookingProvider({ children, ...props }: BookingProviderProps) {
  const [filter, setFilter] = useState<RoomFilter>(initialState.filter)
  const [selected, selectOffer] = useState<Offer>(initialState.selected)

  const value = useMemo(
    () => ({ filter, selected, setFilter, selectOffer }),
    [filter, selected]
  )

  return (
    <BookingProviderContext.Provider {...props} value={value}>
      {children}
    </BookingProviderContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingProviderContext)

  if (context === undefined)
    throw new Error("useBooking must be used within a BookingProvider")

  return context
}
