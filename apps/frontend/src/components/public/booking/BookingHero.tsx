import { CreditCard, ShieldCheck, Star } from 'lucide-react'

export default function BookingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary-container py-space-xl text-on-primary shadow-md">
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="h-full w-full bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
      </div>
      <div className="relative mx-auto flex max-w-[1360px] flex-col justify-between gap-space-lg px-margin md:flex-row md:items-end md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-2xl">
          <div className="mb-space-sm inline-flex items-center gap-space-xs font-label-caps text-label-caps text-secondary-fixed">
            <Star className="size-[15px] fill-current" />
            <span>Mediterranean Riviera • Göynük Bay • Kemer</span>
          </div>
          <h1 className="mb-space-xs font-headline-xl text-headline-xl leading-none tracking-tight text-surface-bright">
            Room Selection & Reservation
          </h1>
          <p className="font-body-md text-body-md leading-relaxed text-primary-fixed-dim">
            A timeless holiday among the pine breeze of the Taurus Mountains and the clear turquoise waters of the
            Mediterranean. Choose the stay that best suits your preferences.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-md self-start md:self-end">
          <div className="flex items-center gap-space-xs rounded-lg bg-primary/70 px-space-md py-2.5 font-label-md text-label-md text-secondary-fixed backdrop-blur-md">
            <ShieldCheck className="size-[18px]" />
            <span>Direct Booking Advantage</span>
          </div>
          <div className="flex items-center gap-space-xs rounded-lg bg-secondary/30 px-space-md py-2.5 font-label-md text-label-md text-surface-bright backdrop-blur-md">
            <CreditCard className="size-[18px]" />
            <span>Cancellation Without Prepayment</span>
          </div>
        </div>
      </div>
    </section>
  )
}
