import {
  Award,
  Bed,
  CircleCheck,
  ClockAlert,
  Gem,
  Heart,
  IdCard,
  Key,
  KeyRound,
  Layers,
  Luggage,
  PlaneLanding,
  Star,
  User,
  Users,
  Wrench,
  HardHat,
  type LucideIcon,
} from 'lucide-react'

export type CalendarDay = { dow: string; date: number; load: string; today?: boolean }

export const calendarDays: CalendarDay[] = [
  { dow: 'MON', date: 19, load: '81%' },
  { dow: 'TUE', date: 20, load: '84%' },
  { dow: 'WED', date: 21, load: '87%' },
  { dow: 'THU', date: 22, load: '88%' },
  { dow: 'FRI', date: 23, load: '91%' },
  { dow: 'SAT', date: 24, load: '94%', today: true },
  { dow: 'SUN', date: 25, load: '89%' },
  { dow: 'MON', date: 26, load: '83%' },
  { dow: 'TUE', date: 27, load: '79%' },
  { dow: 'WED', date: 28, load: '82%' },
  { dow: 'THU', date: 29, load: '85%' },
  { dow: 'FRI', date: 30, load: '92%' },
  { dow: 'SAT', date: 31, load: '96%' },
]

export type BookingTone = 'inhouse' | 'reserved' | 'pending' | 'departing' | 'block' | 'vip'

export type Booking = {
  left: number
  width: number
  tone: BookingTone
  text: string
  icon?: LucideIcon
  iconClass?: string
  sub?: string
  extra?: string
  tag: { label: string; className?: string }
  emphasis?: boolean
}

export type Tag = { label: string; className: string }

export type CalendarRoom = {
  number: number
  numberClass: string
  tag: Tag
  description: string
  descriptionClass?: string
  status?: Tag
  trailingIcon?: { icon: LucideIcon; className: string }
  selected?: boolean
  bookings: Booking[]
}

export type CalendarFloor = {
  name: string
  summary: string
  icon: LucideIcon
  iconClass: string
  rooms: CalendarRoom[]
}

const roomTag = 'bg-surface-variant text-on-surface'
const clean: Tag = { label: 'CLEAN', className: 'bg-secondary/15 text-secondary' }
const dirty: Tag = { label: 'DIRTY', className: 'bg-tertiary-fixed-dim/40 text-on-tertiary-fixed-variant' }
const guests = (icon: LucideIcon) => ({ icon, className: 'text-outline' })

export const calendarFloors: CalendarFloor[] = [
  {
    name: '1ST FLOOR — GARDEN & POOL LEVEL (101 - 120)',
    summary: '20 Rooms Total, 18 Occupied, 1 Available, 1 Cleaning',
    icon: Layers,
    iconClass: 'text-secondary',
    rooms: [
      {
        number: 101,
        numberClass: 'text-primary',
        tag: { label: 'Single (SGL)', className: roomTag },
        description: 'Garden View • Ground Floor',
        status: clean,
        trailingIcon: { icon: User, className: 'text-outline' },
        bookings: [
          { left: 0, width: 30.76, tone: 'inhouse', icon: Key, iconClass: 'text-secondary-fixed', text: 'Murat Kara (O-B #8412)', tag: { label: 'CHECKED OUT', className: 'opacity-80' } },
          { left: 30.76, width: 30.76, tone: 'reserved', icon: Bed, text: 'Hans Gruber (HD #8477)', tag: { label: 'IN-HOUSE', className: 'bg-primary/40 px-1' } },
          { left: 76.92, width: 23.08, tone: 'pending', icon: ClockAlert, iconClass: 'text-secondary', text: 'Ayşe Tuncer (#8540)', tag: { label: 'RESERVED', className: 'text-secondary' } },
        ],
      },
      {
        number: 102,
        numberClass: 'text-primary',
        tag: { label: 'Standard Twin', className: roomTag },
        description: 'Pool Side • Two Separate Beds',
        status: dirty,
        trailingIcon: guests(Users),
        bookings: [
          { left: 7.69, width: 53.84, tone: 'inhouse', icon: IdCard, iconClass: 'text-secondary-fixed', text: 'Elena Rostova (TP - #RZ-8495) • 2 Guests', tag: { label: 'ROOM KEY 2', className: 'bg-secondary px-1 text-on-secondary' } },
          { left: 69.23, width: 30.77, tone: 'pending', text: 'Derviş Acar (#8562)', tag: { label: 'PENDING', className: 'text-secondary' } },
        ],
      },
    ],
  },
  {
    name: '2ND FLOOR — MEDITERRANEAN PANORAMA (201 - 222)',
    summary: '22 Rooms Total, 20 Occupied, 2 Confirmed Blocks',
    icon: Layers,
    iconClass: 'text-secondary',
    rooms: [
      {
        number: 205,
        numberClass: 'text-primary',
        tag: { label: 'Double DBL', className: roomTag },
        description: 'Sea Side • French Balcony',
        status: clean,
        trailingIcon: guests(Users),
        bookings: [
          { left: 0, width: 53.84, tone: 'inhouse', icon: Heart, iconClass: 'text-secondary-fixed', text: 'Burak & Aslı Demir (Honeymoon - AI #8430)', tag: { label: 'VIP COMPLIMENTARY', className: 'bg-on-tertiary-container text-on-tertiary px-1' } },
          { left: 53.84, width: 46.16, tone: 'reserved', icon: PlaneLanding, text: 'Markus Weber (TUI DE #9011)', tag: { label: 'ONLINE CHECK-IN', className: 'opacity-90' } },
        ],
      },
      {
        number: 206,
        numberClass: 'text-primary',
        tag: { label: 'Triple (TRP)', className: roomTag },
        description: 'Garden & Side Sea • 1 Double + 1 Single',
        status: clean,
        trailingIcon: guests(Users),
        bookings: [
          { left: 15.38, width: 30.76, tone: 'inhouse', icon: Users, iconClass: 'text-secondary-fixed', text: 'Selçuk Kaya Family (3 Guests - #8468)', tag: { label: 'HB', className: 'text-secondary-fixed' } },
          { left: 46.15, width: 38.46, tone: 'reserved', icon: Luggage, text: 'Svetlana Petrova (Pegas #9042)', tag: { label: 'ALL INCLUSIVE' } },
        ],
      },
    ],
  },
  {
    name: '3RD FLOOR — DELUXE SUITES & SEA SIDE (301 - 320)',
    summary: '20 Rooms Total, 17 Occupied, 1 In Maintenance, 2 Reserved',
    icon: Layers,
    iconClass: 'text-secondary',
    rooms: [
      {
        number: 304,
        numberClass: 'text-secondary',
        tag: { label: 'SELECTED ROOM', className: 'bg-secondary text-on-secondary font-bold' },
        description: 'Double Balcony • Full Sea View',
        descriptionClass: 'text-on-surface font-medium',
        status: { label: 'OCCUPIED', className: 'bg-secondary text-on-secondary px-1.5 py-0.5 font-bold' },
        trailingIcon: { icon: Star, className: 'text-secondary' },
        selected: true,
        bookings: [
          { left: 0, width: 23.08, tone: 'departing', text: 'Caner Vural (#8390)', tag: { label: 'DEPARTING' } },
          { left: 23.08, width: 38.46, tone: 'reserved', emphasis: true, icon: CircleCheck, iconClass: 'text-secondary-fixed', text: 'Ahmet Yılmaz (AI - #RZ-8492)', sub: '2 Adults • Check-in: 22 May / Check-out: 27 May (5 Nights)', tag: { label: 'IN ROOM', className: 'bg-primary-container text-surface-container-lowest px-1.5 py-0.5 font-bold tracking-wider' } },
          { left: 69.23, width: 30.77, tone: 'pending', text: 'Kemal Soydan (#8569)', tag: { label: 'PENDING', className: 'text-secondary' } },
        ],
      },
      {
        number: 312,
        numberClass: 'text-error',
        tag: { label: 'TECHNICAL BLOCK', className: 'bg-error-container text-on-error-container font-bold' },
        description: 'A/C & Ventilation Overhaul',
        descriptionClass: 'text-error font-medium',
        trailingIcon: { icon: Wrench, className: 'text-error size-4' },
        bookings: [
          { left: 0, width: 23.08, tone: 'departing', text: 'Metehan Güner (#8388)', tag: { label: 'DEPARTING' } },
          { left: 30.76, width: 23.08, tone: 'block', icon: HardHat, iconClass: 'text-error', text: 'Maintenance: VRF A/C Service (Work Order #TEK-109)', tag: { label: 'CLOSED', className: 'text-error font-bold' } },
          { left: 61.54, width: 38.46, tone: 'reserved', text: 'Alexander Novak (All-Inc #9112)', tag: { label: 'CONFIRMED' } },
        ],
      },
    ],
  },
  {
    name: '4TH FLOOR — ROYAL SUITE & ROYAL PENTHOUSE VILLAS (401 - 415)',
    summary: '15 Rooms Total, 13 Occupied, VIP A La Carte Allocation',
    icon: Award,
    iconClass: 'text-on-tertiary-container',
    rooms: [
      {
        number: 401,
        numberClass: 'text-on-tertiary-container',
        tag: { label: 'ROYAL VIP', className: 'bg-tertiary-fixed text-on-tertiary-fixed font-bold' },
        description: 'Penthouse Terrace • Jacuzzi • Infinity Sea View',
        trailingIcon: { icon: Gem, className: 'text-on-tertiary-container size-[18px]' },
        bookings: [
          { left: 15.38, width: 69.23, tone: 'vip', emphasis: true, icon: Gem, iconClass: 'text-tertiary-fixed', text: 'Lord Harrington & Entourage (Protocol VIP - #RZ-7701)', extra: '• Private Butler Service', tag: { label: 'ULTRA ALL INCLUSIVE', className: 'bg-on-tertiary-container text-on-tertiary px-1.5 py-0.5 font-bold uppercase' } },
        ],
      },
      {
        number: 402,
        numberClass: 'text-primary',
        tag: { label: 'Deluxe Quad', className: roomTag },
        description: 'Spacious Lounge • Duplex • Private Pool',
        status: clean,
        trailingIcon: guests(Users),
        bookings: [
          { left: 0, width: 46.15, tone: 'inhouse', icon: KeyRound, iconClass: 'text-secondary-fixed', text: 'Dr. Yaman Özkan (AI #8421) • 4 Guests', tag: { label: 'IN ROOM', className: 'bg-secondary px-1 text-on-secondary' } },
          { left: 53.84, width: 46.16, tone: 'pending', text: 'Tarık Bilgiç & Guests (#8545)', tag: { label: 'EXPECTED', className: 'text-secondary' } },
        ],
      },
    ],
  },
]
