import {
  AlarmClock,
  Bath,
  Bed,
  BedDouble,
  DoorOpen,
  Infinity as InfinityIcon,
  PlaneTakeoff,
  Ruler,
  Snowflake,
  Star,
  Tv,
  User,
  Users,
  Utensils,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import type { Offer } from '@/context/BookingProvider'

export const NIGHTS = 5

const offer = (room: string, board: string, price: number, origPrice: number): Offer => ({
  room,
  board,
  nights: NIGHTS,
  price,
  origPrice,
})

export type Spec = { icon: LucideIcon; label: string; value?: string }

export type FeaturedPlan = {
  eyebrow: string
  recommended?: boolean
  title: string
  description: string
  icon: LucideIcon
  offer: Offer
}

export type FeaturedRoom = {
  layout: 'featured'
  categories: string
  image: string
  alt: string
  badges: { icon?: LucideIcon; text: string; tone: 'primary' | 'secondary' }[]
  floor: string
  eyebrow: string
  title: string
  specs: Required<Spec>[]
  perks: { icon?: LucideIcon; text: string; highlight?: boolean }[]
  plans: FeaturedPlan[]
  gallery: string
  scarcity: string
}

export type ListedRoom = {
  layout: 'listed'
  categories: string
  image: string
  alt: string
  imageHeight: string
  badge?: { text: string; tone: 'primary' | 'secondary' }
  location: { icon?: LucideIcon; text: string }
  eyebrow: string
  eyebrowTone: 'secondary' | 'outline'
  aside: { text: string; kind: 'scarcity' | 'accent' | 'muted'; icon?: LucideIcon }
  title: string
  specs: { icon: LucideIcon; text: string }[]
  description: string
  plan: { label: string; discount: string; note?: string }
  offer: Offer
  alternative?: { label: string; offer: Offer }
}

export type BookingRoom = FeaturedRoom | ListedRoom

export const bookingRooms: BookingRoom[] = [
  {
    layout: 'featured',
    categories: 'suite sea_view',
    image: '/images/img-4.jpg',
    alt: 'Royal penthouse terrace suite with outdoor jacuzzi overlooking the Mediterranean',
    badges: [
      { icon: Star, text: 'Penthouse Collection', tone: 'primary' },
      { text: '18% Early Booking', tone: 'secondary' },
    ],
    floor: '4th Floor • Top Floor',
    eyebrow: 'Private Residence Experience',
    title: 'Royal Suite — Mediterranean Terrace & Jacuzzi',
    specs: [
      { icon: Ruler, label: 'Area', value: '95 m² + 30 m² Terrace' },
      { icon: Users, label: 'Capacity', value: '4 Adults' },
      { icon: BedDouble, label: 'Bed Type', value: '1 King + Lounge' },
      { icon: Bath, label: 'Feature', value: 'Private Terrace Jacuzzi' },
    ],
    perks: [
      { text: 'Panoramic Sea & Taurus Mountains View' },
      { text: 'Italian Marble Bathroom & Double Vanity' },
      { text: 'Nespresso Bar & Daily Premium Minibar' },
      { icon: PlaneTakeoff, text: 'Complimentary VIP Airport Transfer', highlight: true },
    ],
    plans: [
      {
        eyebrow: 'Recommended Package',
        recommended: true,
        title: 'Ultra All Inclusive',
        description: 'A la Carte restaurants, premium imported beverages and 24-hour room service included.',
        icon: InfinityIcon,
        offer: offer('Royal Suite — Mediterranean Terrace', 'Ultra All Inclusive', 11890, 14500),
      },
      {
        eyebrow: 'Alternative Package',
        title: 'Full Board Plus',
        description: 'Breakfast, lunch and dinner buffet at the main restaurant with gourmet menu and table beverages.',
        icon: Utensils,
        offer: offer('Royal Suite — Mediterranean Terrace', 'Full Board Plus', 10248, 12200),
      },
    ],
    gallery: 'Photo Gallery & Floor Plan (9 Photos)',
    scarcity: 'Only 1 of this suite is available',
  },
  {
    layout: 'listed',
    categories: 'sea_view',
    image: '/images/img-5.jpg',
    alt: 'Superior double room with private balcony overlooking the Mediterranean',
    imageHeight: 'h-[280px]',
    badge: { text: 'Most Popular Choice', tone: 'secondary' },
    location: { icon: DoorOpen, text: '3rd & 4th Floor • No: 301-310' },
    eyebrow: 'Superior Mediterranean Collection',
    eyebrowTone: 'secondary',
    aside: { text: 'Only 3 Rooms Left!', kind: 'scarcity', icon: AlarmClock },
    title: 'Double Superior Room with Balcony',
    specs: [
      { icon: Ruler, text: '32 m²' },
      { icon: User, text: '2 Guests' },
      { icon: BedDouble, text: '1 King Double' },
      { icon: Wifi, text: 'Wi-Fi 6 • 55" Smart TV' },
    ],
    description:
      "Equipped with a private balcony with Mediterranean and garden views, marble bathroom, rain shower, minibar and a luxury L'Occitane amenity set.",
    plan: { label: 'All Inclusive', discount: '18% Off', note: 'Taxes and service charge included' },
    offer: offer('Double Superior Room with Balcony', 'All Inclusive', 3485, 4250),
    alternative: {
      label: 'Select Full Board (3,024 TRY)',
      offer: offer('Double Superior Room with Balcony', 'Full Board', 3024, 3600),
    },
  },
  {
    layout: 'listed',
    categories: 'family sea_view',
    image: '/images/img-6.jpg',
    alt: 'Spacious family suite with partitioned bedrooms and a wide balcony',
    imageHeight: 'h-[280px]',
    badge: { text: 'Family Comfort', tone: 'primary' },
    location: { text: '4th Floor • No: 402-407' },
    eyebrow: 'Spacious Living Area',
    eyebrowTone: 'secondary',
    aside: { text: '2 Separate Sleeping Areas', kind: 'accent' },
    title: 'Deluxe Family Room (4 Guests, Large Balcony)',
    specs: [
      { icon: Ruler, text: '55 m²' },
      { icon: Users, text: 'Capacity: 4 Guests' },
      { icon: Bed, text: '1 Double + 2 Single' },
      { icon: Tv, text: '2x Smart TV' },
    ],
    description:
      'A spacious, comfortable connecting-door design for families with children, a wide balcony with Mediterranean views, double wardrobe and generous minibar treats.',
    plan: { label: 'All Inclusive Family Package', discount: '18% Off', note: 'Baby cot on request is free of charge' },
    offer: offer('Deluxe Family Room (4 Guests)', 'All Inclusive', 5576, 6800),
  },
  {
    layout: 'listed',
    categories: 'all',
    image: '/images/img-7.jpg',
    alt: 'Triple comfort room with garden views',
    imageHeight: 'h-[260px]',
    location: { text: '1st & 3rd Floor • No: 111-120 • 311-320' },
    eyebrow: 'Comfort Collection',
    eyebrowTone: 'secondary',
    aside: { text: 'Garden & Pool View', kind: 'muted' },
    title: 'Triple Comfort Room',
    specs: [
      { icon: Ruler, text: '38 m²' },
      { icon: Users, text: '3 Guests' },
      { icon: Bed, text: '3 Separate / 1 Double + 1 Single Bed' },
      { icon: Snowflake, text: 'Air Conditioning' },
    ],
    description:
      'Ideal ergonomics for groups of friends or families of three; ample wardrobe space, a work desk and a spacious bathroom.',
    plan: { label: 'All Inclusive', discount: '18% Off' },
    offer: offer('Triple Comfort Room', 'All Inclusive', 4182, 5100),
  },
  {
    layout: 'listed',
    categories: 'all',
    image: '/images/img-8.jpg',
    alt: 'Standard single room with garden view',
    imageHeight: 'h-[240px]',
    location: { text: '1st & 2nd Floor • No: 101-110 • 201-210' },
    eyebrow: 'Solo Escape • Solo Travel',
    eyebrowTone: 'outline',
    aside: { text: 'Taurus / Garden View', kind: 'muted' },
    title: 'Standard Single Room',
    specs: [
      { icon: Ruler, text: '22 m²' },
      { icon: User, text: '1 Guest' },
      { icon: Bed, text: 'Comfortable Single Bed' },
      { icon: Wifi, text: 'Fast Wi-Fi' },
    ],
    description:
      'A quiet, serene and functional living space for solo travellers or business stays. (Hotel policy: minibar-free concept.)',
    plan: { label: 'Full Board Deal', discount: '16% Off' },
    offer: offer('Standard Single Room', 'Full Board', 2016, 2400),
  },
]
