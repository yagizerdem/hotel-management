import { useMemo, useState, type ReactNode } from 'react'
import {
  BookingContext,
  type BookingContextValue,
  type Offer,
  type RoomFilter,
} from './bookingContext'

const DEFAULT_OFFER: Offer = {
  room: 'Çift Kişilik Balkonlu Superior Oda',
  board: 'Her Şey Dahil',
  nights: 5,
  price: 3485,
  origPrice: 4250,
}

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<RoomFilter>('all')
  const [selected, selectOffer] = useState<Offer>(DEFAULT_OFFER)

  const value = useMemo<BookingContextValue>(
    () => ({ filter, selected, setFilter, selectOffer }),
    [filter, selected],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
