import { useState } from 'react'
import Icon from '@/components/Icon'
import { useBooking } from '@/context/BookingProvider'

const formatTRY = (amount: number) => amount.toLocaleString('en-US')

const chipBase = 'filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap'

const chipClass = (active: boolean) =>
  active
    ? `${chipBase} bg-primary text-on-primary shadow-sm`
    : `${chipBase} bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors`

export default function Booking() {
  const { filter, selected, setFilter, selectOffer } = useBooking()
  const [updating, setUpdating] = useState(false)
  const [proceeding, setProceeding] = useState(false)

  const subtotal = selected.origPrice * selected.nights
  const total = selected.price * selected.nights
  const discount = subtotal - total
  const discountPct = Math.round((discount / subtotal) * 100)

  const visible = (categories: string) =>
    filter === 'all' || categories.split(' ').includes(filter) ? '' : 'hidden'
  const isSelected = (room: string, board: string) =>
    selected.room === room && selected.board === board

  const refreshAvailability = () => {
    setUpdating(true)
    setTimeout(() => setUpdating(false), 600)
  }

  const proceed = () => {
    setProceeding(true)
    setTimeout(() => {
      alert('Your selection is confirmed! Redirecting you to step 2: Guest Contact & Billing Details.')
      setProceeding(false)
    }, 700)
  }

  return (
    <div className="theme-public bg-surface font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(20,39,56,0.06)]">
        <div className="bg-primary text-on-primary">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop h-10 flex items-center justify-between font-label-caps text-label-caps">
            <div className="flex items-center gap-space-md">
              <span className="flex items-center gap-space-xs text-secondary-fixed-dim">
                <Icon name="hotel_class" className="text-[14px]" />
                <span>5-Star Privilege in the Heart of the Mediterranean</span>
              </span>
              <span className="hidden sm:inline-block text-outline-variant">|</span>
              <span className="hidden sm:inline-flex items-center gap-space-xs text-inverse-on-surface">
                <Icon name="location_on" className="text-[14px]" />
                <span>Göynük District, Kemer / Antalya</span>
              </span>
            </div>
            <div className="flex items-center gap-space-lg">
              <a className="flex items-center gap-space-xs text-inverse-on-surface hover:text-secondary-fixed transition-colors" href="tel:+902428140000">
                <Icon name="phone_in_talk" className="text-[14px]" />
                <span>+90 242 814 88 00</span>
              </a>
              <div className="flex items-center gap-space-xs tracking-wider">
                <a className="text-secondary-fixed font-semibold" href="#">TR</a>
                <span className="text-outline-variant text-[10px]">/</span>
                <a className="text-inverse-on-surface hover:text-secondary-fixed transition-colors" href="#">EN</a>
                <span className="text-outline-variant text-[10px]">/</span>
                <a className="text-inverse-on-surface hover:text-secondary-fixed transition-colors" href="#">RU</a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md shrink-0">
            <img alt="Bilge Resort Logo" className="h-8 w-auto object-contain" src="/images/img-3.png" />
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md tracking-tight text-primary leading-none">BILGE</span>
              <span className="font-label-caps text-[0.625rem] tracking-[0.24em] text-secondary uppercase">Hotel • Resort • Kemer</span>
            </div>
          </div>
          <nav className="hidden xl:flex items-center gap-space-lg font-label-md text-label-md" data-active-classes="text-secondary font-semibold">
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="odalarimiz-suitler" href="#">Our Rooms & Suites</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="deneyimler-olanaklar" href="#">Experiences & Amenities</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="restoran-gastronomi" href="#">Restaurants & Gastronomy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="kemer-kesif" href="#">Kemer & Discovery</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="ozel-teklifler" href="#">Special Offers</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="rezervasyonlarim" href="#">My Reservations</a>
          </nav>
          <div className="flex items-center gap-space-md shrink-0">
            <a className="hidden sm:inline-flex items-center justify-center px-space-lg py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md shadow-[0_4px_16px_rgba(114,91,56,0.22)] hover:bg-on-secondary-container hover:text-secondary-fixed transition-all" data-path="online-rezervasyon" href="#">Book Online</a>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="person" className="text-on-primary text-[18px]" />
            </div>
            <button className="xl:hidden p-2 text-on-surface-variant hover:text-primary" type="button">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <main className="w-full pt-[7.5rem] bg-surface min-h-[calc(100vh-28rem)]">
        <div className="flex flex-col w-full">
          <section className="relative w-full bg-primary-container text-on-primary py-space-xl overflow-hidden shadow-md">
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
            </div>
            <div className="relative max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-space-xs text-secondary-fixed mb-space-sm font-label-caps text-label-caps">
                  <Icon name="star" className="text-[15px]" style={{fontVariationSettings: "'FILL' 1"}} />
                  <span>Mediterranean Riviera • Göynük Bay • Kemer</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-surface-bright tracking-tight leading-none mb-space-xs"> Room Selection & Reservation </h1>
                <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed"> A timeless holiday among the pine breeze of the Taurus Mountains and the clear turquoise waters of the Mediterranean. Choose the stay that best suits your preferences. </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-md self-start md:self-end">
                <div className="flex items-center gap-space-xs bg-primary/70 backdrop-blur-md px-space-md py-2.5 rounded-lg text-secondary-fixed font-label-md text-label-md">
                  <Icon name="verified_user" className="text-[18px]" />
                  <span>Direct Booking Advantage</span>
                </div>
                <div className="flex items-center gap-space-xs bg-secondary/30 backdrop-blur-md px-space-md py-2.5 rounded-lg text-surface-bright font-label-md text-label-md">
                  <Icon name="credit_card_off" className="text-[18px]" />
                  <span>Cancellation Without Prepayment</span>
                </div>
              </div>
            </div>
          </section>
          <section className="sticky top-20 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg -mt-4">
            <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md">
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm bg-surface-container-low p-2.5 rounded-xl shadow-sm items-center" id="booking-search-form">
                <div className="lg:col-span-4 bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between gap-space-sm cursor-pointer hover:bg-surface-container transition-colors group">
                  <div className="flex items-center gap-space-sm">
                    <Icon name="calendar_month" className="text-secondary group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <span className="font-label-caps text-label-caps text-outline uppercase">Check-in — Check-out Date</span>
                      <span className="font-title-sm text-title-sm text-primary tracking-tight">24 May 2025 — 29 May 2025</span>
                    </div>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container text-[11px] font-semibold px-2 py-0.5 rounded-full">5 Nights</span>
                </div>
                <div className="lg:col-span-3 bg-surface-container-lowest p-3 rounded-lg flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors group">
                  <Icon name="group" className="text-secondary group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-outline uppercase">Guests</span>
                    <span className="font-title-sm text-title-sm text-primary tracking-tight">2 Adults • 0 Children • 1 Room</span>
                  </div>
                </div>
                <div className="lg:col-span-3 bg-surface-container-lowest p-3 rounded-lg flex items-center gap-space-sm">
                  <Icon name="restaurant_menu" className="text-secondary" />
                  <div className="flex flex-col w-full">
                    <span className="font-label-caps text-label-caps text-outline uppercase">Board Type</span>
                    <div className="flex items-center gap-space-xs mt-0.5">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input defaultChecked className="accent-secondary h-3.5 w-3.5" name="board_search" type="radio" defaultValue="all_inclusive" />
                        <span className="font-label-md text-body-sm text-on-surface">All Inclusive</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer ml-2">
                        <input className="accent-secondary h-3.5 w-3.5" name="board_search" type="radio" defaultValue="full_board" />
                        <span className="font-label-md text-body-sm text-on-surface">Full Board</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <button className="w-full h-[52px] bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed transition-all rounded-lg font-label-md text-label-md shadow-md flex items-center justify-center gap-space-xs" id="update-availability-btn" type="button" onClick={refreshAvailability}><Icon name="autorenew" className={`text-[18px] ${updating ? 'animate-spin' : ''}`} /><span>{updating ? 'Updating...' : 'Update Availability'}</span></button>
                </div>
              </form>
              <div className="mt-space-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs overflow-x-auto pb-1 lg:pb-0 scrollbar-none" id="room-category-filters">
                  <button type="button" onClick={() => setFilter('all')} className={chipClass(filter === 'all')}> All Rooms (77 Rooms) </button>
                  <button type="button" onClick={() => setFilter('sea_view')} className={chipClass(filter === 'sea_view')}> Balcony & Sea View </button>
                  <button type="button" onClick={() => setFilter('family')} className={chipClass(filter === 'family')}> Family Rooms </button>
                  <button type="button" onClick={() => setFilter('suite')} className={chipClass(filter === 'suite')}> Suite & Royal Penthouse </button>
                </div>
                <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md shrink-0">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                  <span className="text-primary font-medium">15 rooms available on the selected dates</span>
                  <span className="text-outline">•</span>
                  <span className="text-on-surface-variant">Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop mt-space-md">
            <div className="bg-gradient-to-r from-secondary-container/90 via-secondary-container to-secondary-fixed/80 p-space-md md:p-space-lg rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-start md:items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md">
                  <Icon name="percent" className="text-[26px]" />
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-caps text-label-caps tracking-widest uppercase text-on-secondary-fixed-variant">Early Booking Privilege</span>
                    <span className="bg-secondary text-on-secondary font-semibold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Summer 2025</span>
                  </div>
                  <p className="font-body-md text-body-md text-primary font-medium mt-0.5"> For bookings made at least 1 month in advance: <span className="font-bold underline decoration-secondary">18% off All Inclusive</span>, <span className="font-bold">16% off Full Board</span> when booked direct! Free cancellation, no questions asked, until 7 days before arrival. </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0 font-label-caps text-label-caps text-on-secondary-fixed-variant">
                <Icon name="verified" className="text-[18px]" />
                <span>Official Hotel Rate</span>
              </div>
            </div>
          </section>
          <section className="w-full max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              <div className="lg:col-span-8 flex flex-col gap-space-xl" id="room-inventory-container">
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('suite sea_view')}`}>
                  <div className="relative w-full h-[360px] overflow-hidden bg-primary-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Ultra-luxury royal penthouse terrace suite at a Mediterranean five star resort overlooking turquoise sea and pine-covered Taurus mountains. High-end modern minimal sun loungers, outdoor Jacuzzi, panoramic glass railing, warm sunset golden hour lighting, muted navy and ivory outdoor linens, architectural sophistication." src="/images/img-4.jpg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30 pointer-events-none"></div>
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-primary/80 backdrop-blur-md text-secondary-fixed px-3 py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider flex items-center gap-1 shadow-sm"><Icon name="hotel_class" className="text-[14px]" /> Penthouse Collection </span>
                      <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-sm"> 18% Early Booking </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-lg font-label-caps text-label-caps text-primary shadow-sm"> 4th Floor • Top Floor </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-on-primary">
                      <div>
                        <span className="text-secondary-fixed text-xs tracking-widest uppercase font-label-caps">Private Residence Experience</span>
                        <h2 className="font-headline-lg text-headline-lg text-surface-bright leading-tight drop-shadow-md"> Royal Suite — Mediterranean Terrace & Jacuzzi </h2>
                      </div>
                      <div className="flex items-center gap-1.5 pb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest/60"></span>
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest/60"></span>
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest/60"></span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col gap-space-md">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container-low p-space-md rounded-lg text-on-surface">
                      <div className="flex items-center gap-2">
                        <Icon name="square_foot" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Area</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">95 m² + 30 m² Terrace</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="group" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Capacity</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">4 Adults</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="king_bed" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Bed Type</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">1 King + Lounge</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="hot_tub" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Feature</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">Private Terrace Jacuzzi</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-space-md text-body-sm font-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1 text-primary"><Icon name="check_circle" className="text-[16px] text-secondary" /> Panoramic Sea & Taurus Mountains View </span>
                      <span className="flex items-center gap-1 text-primary"><Icon name="check_circle" className="text-[16px] text-secondary" /> Italian Marble Bathroom & Double Vanity </span>
                      <span className="flex items-center gap-1 text-primary"><Icon name="check_circle" className="text-[16px] text-secondary" /> Nespresso Bar & Daily Premium Minibar </span>
                      <span className="flex items-center gap-1 text-secondary font-medium"><Icon name="flight_takeoff" className="text-[16px]" /> Complimentary VIP Airport Transfer </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                      <div className="relative bg-surface p-space-md rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between group/plan">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider">Recommended Package</span>
                            <h3 className="font-title-sm text-title-sm text-primary">Ultra All Inclusive</h3>
                            <p className="font-body-sm text-body-sm text-outline-variant mt-1">A la Carte restaurants, premium imported beverages and 24-hour room service included.</p>
                          </div>
                          <Icon name="all_inclusive" className="text-secondary" />
                        </div>
                        <div className="mt-space-md pt-space-sm flex items-end justify-between">
                          <div>
                            <span className="line-through text-outline font-body-sm text-body-sm">14,500 TRY</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-headline-md text-headline-md text-primary font-bold">11,890 TRY</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                            </div>
                          </div>
                          <button type="button" onClick={() => selectOffer({ room: "Royal Suite — Mediterranean Terrace", board: "Ultra All Inclusive", nights: 5, price: 11890, origPrice: 14500 })} className={`py-2.5 px-4 rounded-lg transition-colors font-label-md text-label-md flex items-center gap-1 shadow-sm ${isSelected("Royal Suite — Mediterranean Terrace", "Ultra All Inclusive") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Royal Suite — Mediterranean Terrace", "Ultra All Inclusive") ? (<><Icon name="check" className="text-[18px]" /><span>Selected</span></>) : (<><span>Select Room</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                        </div>
                      </div>
                      <div className="relative bg-surface p-space-md rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between group/plan">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Alternative Package</span>
                            <h3 className="font-title-sm text-title-sm text-primary">Full Board Plus</h3>
                            <p className="font-body-sm text-body-sm text-outline-variant mt-1">Breakfast, lunch and dinner buffet at the main restaurant with gourmet menu and table beverages.</p>
                          </div>
                          <Icon name="restaurant" className="text-outline" />
                        </div>
                        <div className="mt-space-md pt-space-sm flex items-end justify-between">
                          <div>
                            <span className="line-through text-outline font-body-sm text-body-sm">12,200 TRY</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-headline-md text-headline-md text-primary font-bold">10,248 TRY</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                            </div>
                          </div>
                          <button type="button" onClick={() => selectOffer({ room: "Royal Suite — Mediterranean Terrace", board: "Full Board Plus", nights: 5, price: 10248, origPrice: 12200 })} className={`px-4 py-2.5 rounded-lg transition-colors font-label-md text-label-md flex items-center gap-1 shadow-sm ${isSelected("Royal Suite — Mediterranean Terrace", "Full Board Plus") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Royal Suite — Mediterranean Terrace", "Full Board Plus") ? (<><Icon name="check" className="text-[18px]" /><span>Selected</span></>) : (<><span>Select Room</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-space-xs font-label-md text-label-md">
                      <button className="text-secondary hover:text-primary transition-colors flex items-center gap-1" type="button">
                        <Icon name="photo_library" className="text-[18px]" />
                        <span>Photo Gallery & Floor Plan (9 Photos)</span>
                      </button>
                      <span className="text-error font-medium text-body-sm flex items-center gap-1"><Icon name="hourglass_top" className="text-[16px]" /> Only 1 of this suite is available </span>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('sea_view')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[280px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Modern five star luxury superior double hotel room in Antalya with private balcony overlooking the Mediterranean sea. King size bed dressed in crisp white luxury linens and subtle gold runner, warm natural oak wood accents, beige limestone flooring, afternoon sunlight reflecting off gentle ocean waves." src="/images/img-5.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-2.5 py-1 rounded font-label-caps text-[0.6875rem] uppercase tracking-wider font-semibold shadow-sm"> Most Popular Choice </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded">
                        <Icon name="balcony" className="text-[14px]" />
                        <span>3rd & 4th Floor • No: 301-310</span>
                      </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest uppercase">Superior Mediterranean Collection</span>
                          <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1"><Icon name="alarm" className="text-[13px]" /> Only 3 Rooms Left! </span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Double Superior Room with Balcony </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 32 m²</span>
                          <span className="flex items-center gap-1"><Icon name="person" className="text-[16px] text-secondary" /> 2 Guests</span>
                          <span className="flex items-center gap-1"><Icon name="king_bed" className="text-[16px] text-secondary" /> 1 King Double</span>
                          <span className="flex items-center gap-1"><Icon name="wifi" className="text-[16px] text-secondary" /> Wi-Fi 6 • 55" Smart TV</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> Equipped with a private balcony with Mediterranean and garden views, marble bathroom, rain shower, minibar and a luxury L'Occitane amenity set. </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">All Inclusive</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">18% Off</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">4,250 TRY</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">3,485 TRY</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                          <span className="text-outline text-[11px]">Taxes and service charge included</span>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button type="button" onClick={() => selectOffer({ room: "Double Superior Room with Balcony", board: "All Inclusive", nights: 5, price: 3485, origPrice: 4250 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm ${isSelected("Double Superior Room with Balcony", "All Inclusive") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Double Superior Room with Balcony", "All Inclusive") ? (<><Icon name="check" className="text-[18px]" /><span>Selected</span></>) : (<><span>Select Room</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                          <button type="button" className="text-[12px] text-on-surface-variant hover:text-primary underline text-center transition-colors" onClick={() => selectOffer({ room: "Double Superior Room with Balcony", board: "Full Board", nights: 5, price: 3024, origPrice: 3600 })}> Select Full Board (3,024 TRY) </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('family sea_view')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[280px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Spacious luxury family hotel suite with partitioned bedrooms, master bed and two single beds, wide balcony opening up to green gardens and Mediterranean pine trees. Warm wood furniture, bright airy natural sunlight, tasteful contemporary interior design for high-end resort in Antalya." src="/images/img-6.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md text-on-primary px-2.5 py-1 rounded font-label-caps text-[0.6875rem] uppercase tracking-wider font-semibold shadow-sm"> Family Comfort </div>
                      <div className="absolute bottom-3 left-3 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded"> 4th Floor • No: 402-407 </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest uppercase">Spacious Living Area</span>
                          <span className="text-secondary font-label-caps text-[11px] font-semibold">2 Separate Sleeping Areas</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Deluxe Family Room (4 Guests, Large Balcony) </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 55 m²</span>
                          <span className="flex items-center gap-1"><Icon name="family_restroom" className="text-[16px] text-secondary" /> Capacity: 4 Guests</span>
                          <span className="flex items-center gap-1"><Icon name="bed" className="text-[16px] text-secondary" /> 1 Double + 2 Single</span>
                          <span className="flex items-center gap-1"><Icon name="tv" className="text-[16px] text-secondary" /> 2x Smart TV</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> A spacious, comfortable connecting-door design for families with children, a wide balcony with Mediterranean views, double wardrobe and generous minibar treats. </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">All Inclusive Family Package</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">18% Off</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">6,800 TRY</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">5,576 TRY</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                          <span className="text-outline text-[11px]">Baby cot on request is free of charge</span>
                        </div>
                        <button type="button" onClick={() => selectOffer({ room: "Deluxe Family Room (4 Guests)", board: "All Inclusive", nights: 5, price: 5576, origPrice: 6800 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm shrink-0 ${isSelected("Deluxe Family Room (4 Guests)", "All Inclusive") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Deluxe Family Room (4 Guests)", "All Inclusive") ? (<><Icon name="check" className="text-[18px]" /><span>Selected</span></>) : (<><span>Select Room</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                      </div>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('all')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[260px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Elegant triple bed boutique resort room in Antalya with warm modern coastal aesthetic. 3 separate comfortable single beds or 1 double and 1 single setup, light stone texture walls, balcony with lush green garden views, soft ivory and navy blue fabric accents, spotless upscale atmosphere." src="/images/img-7.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 left-3 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded"> 1st & 3rd Floor • No: 111-120 • 311-320 </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest uppercase">Comfort Collection</span>
                          <span className="text-outline font-label-caps text-[11px]">Garden & Pool View</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Triple Comfort Room </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 38 m²</span>
                          <span className="flex items-center gap-1"><Icon name="group" className="text-[16px] text-secondary" /> 3 Guests</span>
                          <span className="flex items-center gap-1"><Icon name="single_bed" className="text-[16px] text-secondary" /> 3 Separate / 1 Double + 1 Single Bed</span>
                          <span className="flex items-center gap-1"><Icon name="ac_unit" className="text-[16px] text-secondary" /> Air Conditioning</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> Ideal ergonomics for groups of friends or families of three; ample wardrobe space, a work desk and a spacious bathroom. </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">All Inclusive</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">18% Off</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">5,100 TRY</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">4,182 TRY</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => selectOffer({ room: "Triple Comfort Room", board: "All Inclusive", nights: 5, price: 4182, origPrice: 5100 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm shrink-0 ${isSelected("Triple Comfort Room", "All Inclusive") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Triple Comfort Room", "All Inclusive") ? (<><Icon name="check" className="text-[18px]" /><span>Selected</span></>) : (<><span>Select Room</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                      </div>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('all')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[240px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Cozy elegant single hotel bedroom in a Mediterranean luxury resort. Single plush bed with crisp linens, warm wooden work desk, garden view window showing Toros mountain silhouette, calm peaceful atmosphere, clean minimalist interior design." src="/images/img-8.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 left-3 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded"> 1st & 2nd Floor • No: 101-110 • 201-210 </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Solo Escape • Solo Travel</span>
                          <span className="text-outline font-label-caps text-[11px]">Taurus / Garden View</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Standard Single Room </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 22 m²</span>
                          <span className="flex items-center gap-1"><Icon name="person" className="text-[16px] text-secondary" /> 1 Guest</span>
                          <span className="flex items-center gap-1"><Icon name="single_bed" className="text-[16px] text-secondary" /> Comfortable Single Bed</span>
                          <span className="flex items-center gap-1"><Icon name="wifi" className="text-[16px] text-secondary" /> Fast Wi-Fi</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> A quiet, serene and functional living space for solo travellers or business stays. (Hotel policy: minibar-free concept.) </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Full Board Deal</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">16% Off</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">2,400 TRY</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">2,016 TRY</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => selectOffer({ room: "Standard Single Room", board: "Full Board", nights: 5, price: 2016, origPrice: 2400 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm shrink-0 ${isSelected("Standard Single Room", "Full Board") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Standard Single Room", "Full Board") ? (<><Icon name="check" className="text-[18px]" /><span>Selected</span></>) : (<><span>Select Room</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <aside className="lg:col-span-4 sticky top-44 z-30 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-space-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="shopping_bag" className="text-secondary text-[24px]" />
                      <h3 className="font-headline-md text-headline-md text-primary">Selection Summary</h3>
                    </div>
                    <span className="bg-secondary/15 text-secondary text-label-caps font-label-caps px-2 py-0.5 rounded font-bold uppercase">Step 1 / 3</span>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
                    <span className="font-label-caps text-label-caps text-outline uppercase">Selected Room</span>
                    <span className="font-title-sm text-title-sm text-primary font-bold" id="summary-room-title">{selected.room}</span>
                    <div className="flex items-center justify-between text-body-sm text-on-surface-variant mt-1">
                      <span className="flex items-center gap-1 text-[13px]"><Icon name="balcony" className="text-[15px] text-secondary" /> Mediterranean View • 32 m² </span>
                      <span className="bg-secondary-fixed-dim text-on-secondary-fixed-variant text-[11px] font-semibold px-2 py-0.5 rounded" id="summary-board-tag">{selected.board}</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 font-body-sm text-body-sm text-on-surface">
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1.5"><Icon name="calendar_today" className="text-[16px]" /> Dates: </span>
                      <span className="font-medium text-primary">24 May – 29 May 2025 ({selected.nights} Nights)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1.5"><Icon name="person" className="text-[16px]" /> Guests: </span>
                      <span className="font-medium text-primary">2 Adults, 0 Children</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1.5"><Icon name="schedule" className="text-[16px]" /> Check-in / Check-out: </span>
                      <span className="font-medium text-primary">14:00 / 10:00</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] text-secondary">
                      <span className="flex items-center gap-1.5"><Icon name="cancel" className="text-[16px]" /> Cancellation Policy: </span>
                      <span className="font-medium">Free until 17 May</span>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg text-body-sm text-[13px] text-on-surface-variant space-y-1">
                    <span className="font-label-caps text-label-caps text-primary font-semibold block uppercase">Services Included in Package:</span>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check" className="text-[14px] text-secondary" />
                      <span>Open buffet breakfast, lunch and dinner gourmet buffets</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check" className="text-[14px] text-secondary" />
                      <span>Premium local and imported beverage service & snack bars</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check" className="text-[14px] text-secondary" />
                      <span>Private beach cabanas, sun loungers & towel service</span>
                    </div>
                  </div>
                  <div className="pt-space-sm space-y-2 font-body-sm text-body-sm">
                    <div className="flex items-center justify-between text-outline">
                      <span>Standard Amount ({selected.nights} Nights x {formatTRY(selected.origPrice)} TRY):</span>
                      <span className="font-medium" id="summary-subtotal">{formatTRY(subtotal)} TRY</span>
                    </div>
                    <div className="flex items-center justify-between text-secondary font-medium">
                      <span className="flex items-center gap-1"><Icon name="high_res" className="text-[15px]" /> Early Booking Discount ({discountPct}%): </span>
                      <span id="summary-discount">-{formatTRY(discount)} TRY</span>
                    </div>
                    <div className="flex items-center justify-between text-outline text-[12px]">
                      <span>VAT (10%) and Accommodation Tax (2%):</span>
                      <span className="text-on-surface-variant">Included</span>
                    </div>
                    <div className="pt-space-xs flex items-baseline justify-between">
                      <div>
                        <span className="font-title-sm text-title-sm text-primary font-bold block">Total Amount</span>
                        <span className="text-outline text-[11px]">(Nightly <span id="summary-nightly-rate">{formatTRY(selected.price)}</span> TRY)</span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-lg text-headline-lg text-primary font-bold leading-none" id="summary-total-price">{formatTRY(total)} TRY</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-xs">
                    <button className="w-full py-3.5 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed transition-all font-label-md text-label-md font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-space-xs group" id="proceed-booking-btn" type="button" onClick={proceed}>{proceeding ? (<><Icon name="sync" className="animate-spin text-[20px]" /><span>Verifying Details...</span></>) : (<><span>Complete Reservation</span><Icon name="arrow_forward" className="text-[20px] group-hover:translate-x-1 transition-transform" /></>)}</button>
                    <span className="text-center block text-[11px] text-outline mt-2"> Your card is not charged immediately • Reception guarantee </span>
                  </div>
                  <div className="pt-space-xs flex items-center justify-around text-outline text-[11px] font-label-caps">
                    <div className="flex items-center gap-1">
                      <Icon name="lock" className="text-[16px] text-secondary" />
                      <span>256-Bit SSL</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="security" className="text-[16px] text-secondary" />
                      <span>3D Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="verified" className="text-[16px] text-secondary" />
                      <span>Direct Confirmation</span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-space-md shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                    <Icon name="support_agent" className="text-[20px]" />
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-outline uppercase block">Personal Assistance</span>
                    <p className="font-body-sm text-body-sm text-primary font-medium">Special request or group booking?</p>
                    <a className="text-secondary hover:underline font-label-md text-label-md font-bold text-[13px] inline-flex items-center gap-1 mt-0.5" href="tel:+902428148800">
                      <span>+90 242 814 88 00</span>
                      <Icon name="call" className="text-[14px]" />
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </section>
          <section className="w-full bg-surface-container-low py-space-2xl mt-space-xl">
            <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold">5-Star Privileges</span>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1"> Experiences Included in Your Stay </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md"> Bilge Hotel Resort guests enjoy uninterrupted comfort and a gastronomic feast in Kemer’s unique nature. </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="beach_access" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Private Kemer Beach & Pier</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Blue Flag crystal-clear sea, private sunbathing lodges and all-day beverage service.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="pool" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Outdoor & Indoor Pools</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Lagoon pool, infinity views and a heated indoor thalasso relaxation area.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="spa" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Turkish Hammam & Spa</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Traditional scrub-and-foam rituals, Finnish sauna, steam rooms and Far Eastern massages.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="restaurant" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">3 A La Carte Restaurants</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Mediterranean seafood, Italian trattoria and traditional Turkish grill flavours.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="toys" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Kids Club (Mini Club)</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Creative workshops for ages 4-12 with expert supervisors, a kids' pool and mini disco.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </main>
      <footer className="w-full bg-primary text-inverse-on-surface pt-space-2xl pb-space-lg">
        <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-2xl">
            <div className="lg:col-span-4 flex flex-col items-start">
              <div className="flex items-center gap-space-sm mb-space-md">
                <img alt="Bilge Resort Logo" className="h-8 w-auto object-contain brightness-0 invert" src="/images/img-3.png" />
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md text-surface-bright leading-none">BILGE</span>
                  <span className="font-label-caps text-[0.625rem] tracking-[0.2em] text-secondary-fixed-dim uppercase">Resort Kemer</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-outline-variant leading-relaxed mb-space-lg max-w-sm">On the turquoise waters of the Mediterranean and the pine-scented foothills of the Taurus Mountains, a distinguished escape that unites timeless luxury with serene comfort.</p>
              <div className="flex flex-col gap-space-xs font-label-caps text-label-caps text-secondary-fixed">
                <div className="flex items-center gap-space-xs">
                  <Icon name="schedule" className="text-[16px]" />
                  <span>Check-in: 14:00 • Check-out: 10:00</span>
                </div>
                <div className="flex items-center gap-space-xs text-outline-variant font-body-sm text-[0.75rem]">
                  <Icon name="verified" className="text-[16px]" />
                  <span>Ministry of Culture and Tourism Licence No: 14082</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-space-sm font-body-sm text-body-sm">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-space-xs">Accommodation</h3>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Deluxe Sea Suite</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Taurus Villa Collection</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Family Suites & Residence</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Swim-Up Lagoon Rooms</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Private Beach Cabanas</a>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-space-sm font-body-sm text-body-sm">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-space-xs">Privileges</h3>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Olea Fine Dining & Wine</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Thalasso & Spa Rituals</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Private Yacht Tours & Bays</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Ultra All Inclusive Paketi</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">VIP Airport Transfer</a>
            </div>
            <div className="lg:col-span-4 flex flex-col">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-space-sm">Exclusive Riviera Newsletter</h3>
              <p className="font-body-sm text-body-sm text-outline-variant mb-space-md">Be the first to hear about early-booking benefits and exclusive season invitations.</p>
              <div className="flex items-stretch gap-space-xs mb-space-lg">
                <input className="w-full bg-primary-container px-space-md py-2.5 rounded-lg font-body-sm text-body-sm text-on-primary placeholder:text-outline focus:outline-none" placeholder="Your email address" type="email" />
                <button className="px-space-md py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-container hover:text-secondary-fixed transition-all shrink-0" type="button">Join</button>
              </div>
              <div className="flex items-center gap-space-lg pt-space-xs">
                <div className="flex items-center gap-space-xs text-secondary-fixed-dim font-label-caps text-[0.6875rem]">
                  <Icon name="military_tech" className="text-[18px]" />
                  <span>Tripadvisor Travelers' Choice 2024</span>
                </div>
                <div className="flex items-center gap-space-xs text-secondary-fixed-dim font-label-caps text-[0.6875rem]">
                  <Icon name="eco" className="text-[18px]" />
                  <span>Green Key Certified</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-[0.8125rem] text-outline">
            <p>© 2025 Bilge Hotel Resort Kemer. All rights reserved.</p>
            <div className="flex items-center gap-space-md">
              <a className="hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-secondary-fixed transition-colors" href="#">Data Protection Notice</a>
              <a className="hover:text-secondary-fixed transition-colors" href="#">Cancellation & Refund Policy</a>
              <a className="hover:text-secondary-fixed transition-colors" href="#">Sustainability Report</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
