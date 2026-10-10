import { MapPin, Menu, PhoneCall, Star, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const NAV = [
  'Our Rooms & Suites',
  'Experiences & Amenities',
  'Restaurants & Gastronomy',
  'Kemer & Discovery',
  'Special Offers',
  'My Reservations',
]

const wrap = 'max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop'

export default function SiteHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-surface/90 shadow-[0_1px_8px_rgba(20,39,56,0.06)] backdrop-blur-xl">
      <div className="bg-primary text-on-primary">
        <div className={`${wrap} flex h-10 items-center justify-between font-label-caps text-label-caps`}>
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs text-secondary-fixed-dim">
              <Star className="size-[14px]" />
              <span>5-Star Privilege in the Heart of the Mediterranean</span>
            </span>
            <span className="hidden text-outline-variant sm:inline-block">|</span>
            <span className="hidden items-center gap-space-xs text-inverse-on-surface sm:inline-flex">
              <MapPin className="size-[14px]" />
              <span>Göynük District, Kemer / Antalya</span>
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <a className="flex items-center gap-space-xs text-inverse-on-surface transition-colors hover:text-secondary-fixed" href="tel:+902428140000">
              <PhoneCall className="size-[14px]" />
              <span>+90 242 814 88 00</span>
            </a>
            <div className="flex items-center gap-space-xs tracking-wider">
              <a className="font-semibold text-secondary-fixed" href="#">TR</a>
              <span className="text-[10px] text-outline-variant">/</span>
              <a className="text-inverse-on-surface transition-colors hover:text-secondary-fixed" href="#">EN</a>
              <span className="text-[10px] text-outline-variant">/</span>
              <a className="text-inverse-on-surface transition-colors hover:text-secondary-fixed" href="#">RU</a>
            </div>
          </div>
        </div>
      </div>
      <div className={`${wrap} flex h-20 items-center justify-between gap-space-md`}>
        <div className="flex shrink-0 items-center gap-space-md">
          <img alt="Bilge Resort Logo" className="h-8 w-auto object-contain" src="/images/img-3.png" />
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md leading-none tracking-tight text-primary">BILGE</span>
            <span className="font-label-caps text-[0.625rem] tracking-[0.24em] text-secondary uppercase">Hotel • Resort • Kemer</span>
          </div>
        </div>
        <nav className="hidden items-center gap-space-lg font-label-md text-label-md xl:flex">
          {NAV.map((item) => (
            <a key={item} className="whitespace-nowrap py-1 text-on-surface-variant transition-colors hover:text-primary" href="#">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-space-md">
          <Button
            render={<a href="#" />}
            nativeButton={false}
            className="hidden h-auto rounded-lg bg-secondary px-space-lg py-2.5 font-label-md text-label-md text-on-secondary shadow-[0_4px_16px_rgba(114,91,56,0.22)] hover:bg-on-secondary-container hover:text-secondary-fixed sm:inline-flex"
          >
            Book Online
          </Button>
          <Avatar>
            <AvatarFallback className="bg-primary text-on-primary">
              <User className="size-[18px]" />
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" aria-label="Menu" className="text-on-surface-variant hover:text-primary xl:hidden">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  )
}
