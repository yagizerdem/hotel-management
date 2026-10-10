import BookingHero from '@/components/public/booking/BookingHero'
import EarlyBookingBanner from '@/components/public/booking/EarlyBookingBanner'
import ExperiencesSection from '@/components/public/booking/ExperiencesSection'
import FeaturedRoomCard from '@/components/public/booking/FeaturedRoomCard'
import ListedRoomCard from '@/components/public/booking/ListedRoomCard'
import SearchBar from '@/components/public/booking/SearchBar'
import SelectionSummary from '@/components/public/booking/SelectionSummary'
import SiteFooter from '@/components/public/booking/SiteFooter'
import SiteHeader from '@/components/public/booking/SiteHeader'
import { useBooking } from '@/context/BookingProvider'
import { bookingRooms } from '@/data/booking'

export default function Booking() {
  const { filter } = useBooking()
  const hidden = (categories: string) => filter !== 'all' && !categories.split(' ').includes(filter)

  return (
    <div className="theme-public bg-surface font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <SiteHeader />
      <main className="min-h-[calc(100vh-28rem)] w-full bg-surface pt-[7.5rem]">
        <div className="flex w-full flex-col">
          <BookingHero />
          <SearchBar />
          <EarlyBookingBanner />
          <section className="mx-auto w-full max-w-[1360px] px-margin py-space-xl md:px-margin-tablet lg:px-margin-desktop">
            <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
              <div className="flex flex-col gap-space-xl lg:col-span-8">
                {bookingRooms.map((room) =>
                  room.layout === 'featured' ? (
                    <FeaturedRoomCard key={room.title} room={room} hidden={hidden(room.categories)} />
                  ) : (
                    <ListedRoomCard key={room.title} room={room} hidden={hidden(room.categories)} />
                  ),
                )}
              </div>
              <SelectionSummary />
            </div>
          </section>
          <ExperiencesSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
