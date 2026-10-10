import { BadgeCheck, Percent } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function EarlyBookingBanner() {
  return (
    <section className="mx-auto mt-space-md w-full max-w-[1360px] px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="flex flex-col items-center justify-between gap-space-md rounded-xl bg-gradient-to-r from-secondary-container/90 via-secondary-container to-secondary-fixed/80 p-space-md shadow-sm md:flex-row md:p-space-lg">
        <div className="flex items-start gap-space-md md:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-md">
            <Percent className="size-[26px]" />
          </div>
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-caps text-label-caps tracking-widest text-on-secondary-fixed-variant uppercase">Early Booking Privilege</span>
              <Badge className="h-auto rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wider text-on-secondary uppercase">Summer 2025</Badge>
            </div>
            <p className="mt-0.5 font-body-md text-body-md font-medium text-primary">
              For bookings made at least 1 month in advance:{' '}
              <span className="font-bold underline decoration-secondary">18% off All Inclusive</span>,{' '}
              <span className="font-bold">16% off Full Board</span> when booked direct! Free cancellation, no questions
              asked, until 7 days before arrival.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-space-sm font-label-caps text-label-caps text-on-secondary-fixed-variant">
          <BadgeCheck className="size-[18px]" />
          <span>Official Hotel Rate</span>
        </div>
      </div>
    </section>
  )
}
