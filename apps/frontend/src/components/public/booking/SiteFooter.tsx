import { BadgeCheck, Clock, Leaf, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const COLUMNS = [
  { title: 'Accommodation', links: ['Deluxe Sea Suite', 'Taurus Villa Collection', 'Family Suites & Residence', 'Swim-Up Lagoon Rooms', 'Private Beach Cabanas'] },
  { title: 'Privileges', links: ['Olea Fine Dining & Wine', 'Thalasso & Spa Rituals', 'Private Yacht Tours & Bays', 'Ultra All Inclusive Paketi', 'VIP Airport Transfer'] },
]

const LEGAL = ['Privacy Policy', 'Data Protection Notice', 'Cancellation & Refund Policy', 'Sustainability Report']

export default function SiteFooter() {
  return (
    <footer className="w-full bg-primary pt-space-2xl pb-space-lg text-inverse-on-surface">
      <div className="mx-auto max-w-[1360px] px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-space-xl pb-space-2xl md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-4">
            <div className="mb-space-md flex items-center gap-space-sm">
              <img alt="Bilge Resort Logo" className="h-8 w-auto object-contain brightness-0 invert" src="/images/img-3.png" />
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md leading-none text-surface-bright">BILGE</span>
                <span className="font-label-caps text-[0.625rem] tracking-[0.2em] text-secondary-fixed-dim uppercase">Resort Kemer</span>
              </div>
            </div>
            <p className="mb-space-lg max-w-sm font-body-sm text-body-sm leading-relaxed text-outline-variant">
              On the turquoise waters of the Mediterranean and the pine-scented foothills of the Taurus Mountains, a
              distinguished escape that unites timeless luxury with serene comfort.
            </p>
            <div className="flex flex-col gap-space-xs font-label-caps text-label-caps text-secondary-fixed">
              <div className="flex items-center gap-space-xs">
                <Clock className="size-4" />
                <span>Check-in: 14:00 • Check-out: 10:00</span>
              </div>
              <div className="flex items-center gap-space-xs font-body-sm text-[0.75rem] text-outline-variant">
                <BadgeCheck className="size-4" />
                <span>Ministry of Culture and Tourism Licence No: 14082</span>
              </div>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-space-sm font-body-sm text-body-sm lg:col-span-2">
              <h3 className="mb-space-xs font-label-caps text-label-caps tracking-widest text-secondary-fixed uppercase">{col.title}</h3>
              {col.links.map((link) => (
                <a key={link} className="text-outline-variant transition-colors hover:text-secondary-fixed" href="#">
                  {link}
                </a>
              ))}
            </div>
          ))}
          <div className="flex flex-col lg:col-span-4">
            <h3 className="mb-space-sm font-label-caps text-label-caps tracking-widest text-secondary-fixed uppercase">Exclusive Riviera Newsletter</h3>
            <p className="mb-space-md font-body-sm text-body-sm text-outline-variant">
              Be the first to hear about early-booking benefits and exclusive season invitations.
            </p>
            <form className="mb-space-lg flex items-stretch gap-space-xs" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email address"
                className="h-auto rounded-lg border-0 bg-primary-container px-space-md py-2.5 font-body-sm text-body-sm text-on-primary placeholder:text-outline"
              />
              <Button className="h-auto shrink-0 rounded-lg bg-secondary px-space-md py-2.5 font-label-md text-label-md text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed">
                Join
              </Button>
            </form>
            <div className="flex items-center gap-space-lg pt-space-xs">
              <div className="flex items-center gap-space-xs font-label-caps text-[0.6875rem] text-secondary-fixed-dim">
                <Medal className="size-[18px]" />
                <span>Tripadvisor Travelers' Choice 2024</span>
              </div>
              <div className="flex items-center gap-space-xs font-label-caps text-[0.6875rem] text-secondary-fixed-dim">
                <Leaf className="size-[18px]" />
                <span>Green Key Certified</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-space-md pt-space-lg font-body-sm text-[0.8125rem] text-outline md:flex-row">
          <p>© 2025 Bilge Hotel Resort Kemer. All rights reserved.</p>
          <div className="flex items-center gap-space-md">
            {LEGAL.map((l) => (
              <a key={l} className="transition-colors hover:text-secondary-fixed" href="#">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
