export type RoomStatus = 'occupied' | 'available' | 'dirty' | 'maintenance' | 'arrival'

export type Room = {
  number: number
  floor: 1 | 2 | 3 | 4
  status: RoomStatus
  label?: string
  note?: string
}

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i)

function floorRooms(
  floor: Room['floor'],
  numbers: number[],
  overrides: Record<number, Partial<Room>>,
): Room[] {
  return numbers.map((number) => ({
    number,
    floor,
    status: 'occupied' as RoomStatus,
    ...overrides[number],
  }))
}

export const initialRooms: Room[] = [
  ...floorRooms(4, range(401, 417), {
    401: {
      status: 'arrival',
      label: 'ROYAL',
      note: '401 Royal Suite - VIP Markus Weber Expected',
    },
    407: { status: 'dirty', note: '407 Checked out / Awaiting cleaning' },
    412: { status: 'available', note: '412 AVAILABLE CLEAN' },
    417: { status: 'available', note: '417 AVAILABLE CLEAN' },
  }),
  ...floorRooms(3, range(301, 320), {
    304: { status: 'available' },
    312: { status: 'maintenance', note: '312 Out of order: A/C maintenance' },
    314: { status: 'dirty' },
    319: { status: 'available' },
  }),
  ...floorRooms(2, range(201, 220), {
    204: { status: 'maintenance', note: '204 Out of order: Shower enclosure leak' },
    208: { status: 'available' },
    214: { status: 'dirty', note: '214 Dirty / Minibar restock pending' },
    219: { status: 'available' },
  }),
  ...floorRooms(1, range(101, 120), {
    105: { status: 'available' },
    108: { status: 'dirty' },
    112: { status: 'dirty' },
    117: { status: 'available' },
    119: { status: 'available' },
  }),
]

export type ArrivalStatus = 'pending' | 'vip' | 'checkedIn'

export type Arrival = {
  id: string
  guest: string
  vip?: boolean
  detail: string
  room: number
  roomType: string
  stay: string
  board: string
  boardTone: 'highlight' | 'neutral'
  status: ArrivalStatus
  amount: string
  paymentLabel?: string
  unpaid?: boolean
  action: string
}

export const initialArrivals: Arrival[] = [
  {
    id: '#RZ-8941',
    guest: 'Ahmet & Zeynep Kaya',
    detail: '2 Adults • TC: 492******12',
    room: 308,
    roomType: 'Double with Balcony',
    stay: '24.05 - 29.05 (5 Nights)',
    board: 'ALL INCLUSIVE',
    boardTone: 'highlight',
    status: 'pending',
    amount: '0.00 TRY',
    paymentLabel: '(PAID)',
    action: 'Check In',
  },
  {
    id: '#RZ-8930',
    guest: 'Markus Weber',
    vip: true,
    detail: '1 Adult • PAS: C9924X88',
    room: 401,
    roomType: 'Royal Suite',
    stay: '24.05 - 31.05 (7 Nights)',
    board: 'ULTRA ALL INCLUSIVE',
    boardTone: 'highlight',
    status: 'vip',
    amount: '4,250.00 EUR',
    paymentLabel: '(PAID)',
    action: 'Welcome VIP',
  },
  {
    id: '#RZ-8955',
    guest: 'Elif Demir',
    detail: '1 Adult • TC: 188******94',
    room: 105,
    roomType: 'Standard Single',
    stay: '24.05 - 26.05 (2 Nights)',
    board: 'FULL BOARD',
    boardTone: 'neutral',
    status: 'pending',
    amount: '7,800.00 TRY',
    paymentLabel: 'AWAITING POS',
    unpaid: true,
    action: 'Collect Payment & Check In',
  },
  {
    id: '#RZ-8912',
    guest: 'Mehmet & Canan Öztürk',
    detail: '2 Adults, 1 Child',
    room: 218,
    roomType: 'Twin with Balcony',
    stay: '24.05 - 30.05 (6 Nights)',
    board: 'ALL INCLUSIVE',
    boardTone: 'highlight',
    status: 'checkedIn',
    amount: '0.00 TRY',
    action: 'Check In',
  },
  {
    id: '#RZ-8960',
    guest: 'Dmitry & Elena Volkov',
    detail: '2 Adults • PAS: 75N82910',
    room: 315,
    roomType: 'Triple with Balcony',
    stay: '24.05 - 02.06 (9 Nights)',
    board: 'ALL INCLUSIVE',
    boardTone: 'highlight',
    status: 'pending',
    amount: '2,150.00 EUR',
    paymentLabel: '(PAID)',
    action: 'Check In',
  },
]

export type DepartureStatus = 'waiting' | 'late' | 'left'

export type Departure = {
  id: string
  guest: string
  detail: string
  room: number
  roomType?: string
  amount: string
  folio: string
  positive?: boolean
  status: DepartureStatus
  badge: string
  action: string
}

export const initialDepartures: Departure[] = [
  {
    id: '#RZ-8710',
    guest: 'Kerem Çelik',
    detail: 'Stay: 4 Nights • Check-out Time: 11:30',
    room: 214,
    roomType: 'Twin',
    amount: '1,420.00 TRY',
    folio: 'Minibar + Spa Massage',
    status: 'waiting',
    badge: 'AWAITING CHECK-OUT',
    action: 'Settle Bill & Check Out',
  },
  {
    id: '#RZ-8692',
    guest: 'Sarah & Tom Jenkins',
    detail: 'Stay: 7 Nights • Late Check-out Approved',
    room: 407,
    roomType: 'Family Quad',
    amount: '0.00 EUR',
    folio: 'Folio Cleared',
    positive: true,
    status: 'late',
    badge: 'LATE CHECK-OUT (13:30)',
    action: 'Return Card & Finish',
  },
  {
    id: '#RZ-8705',
    guest: 'Hakan Aydın',
    detail: 'Invoice No: F-2025/11902',
    room: 112,
    amount: '0.00 TRY',
    folio: '',
    status: 'left',
    badge: 'DEPARTED (09:40)',
    action: '',
  },
]

export type LedgerStatus = 'checkedIn' | 'confirmed' | 'pending' | 'checkedOut' | 'cancelled'

export type ReservationDetails = {
  idNumber: string
  email: string
  nationality: string
  checkIn: string
  checkInTime: string
  checkOut: string
  checkOutTime: string
  folioNo: string
  folio: { label: string; value: string; tone?: 'discount' | 'muted' }[]
  paid: string
  balance: string
  roomNote: string
  guestNote: string
  housekeepingNote: string
}

export type Reservation = {
  id: string
  createdAt: string
  country: string
  guest: string
  phone: string
  room: string
  roomInfo: string
  dates: string
  nights: string
  pax: string
  paxIcon: string
  board: string
  sourceIcon: string
  source: string
  total: string
  payment: string
  paymentTone: 'paid' | 'partial' | 'due' | 'closed'
  status: LedgerStatus
  arrivesToday?: boolean
  details?: ReservationDetails
}

export const initialReservations: Reservation[] = [
  {
    id: 'RZ-2025-0842',
    createdAt: '21.04.2025 14:10',
    country: 'TR',
    guest: 'Demir Karahan',
    phone: '+90 532 984 1120',
    room: 'Room 304 (Balcony DBL)',
    roomInfo: '3rd Floor • Sea View',
    dates: '24 May - 29 May 2025',
    nights: '5 Nights (5 remaining)',
    pax: '2 Ad. + 1 Ch.',
    paxIcon: 'group',
    board: 'ALL INCLUSIVE',
    sourceIcon: 'language',
    source: 'Website',
    total: '39.050 TRY',
    payment: 'COLLECTED',
    paymentTone: 'paid',
    status: 'checkedIn',
    details: {
      idNumber: '39201948210',
      email: 'demir.karahan@mail.com',
      nationality: 'Turkey (TR)',
      checkIn: '24.05.2025',
      checkInTime: '14:00',
      checkOut: '29.05.2025',
      checkOutTime: '12:00',
      folioNo: '#FL-8821',
      folio: [
        { label: 'Nightly Room Rate: 8,500 TRY x 5 Nights', value: '42.500 TRY' },
        { label: 'Early Booking Discount (1 Month Ahead - AI 18%)', value: '-7.650 TRY', tone: 'discount' },
        { label: 'Board Supplement: All Inclusive', value: 'Included', tone: 'muted' },
        { label: 'Extra Charges (A la carte & Spa)', value: '+4.200 TRY' },
      ],
      paid: '39.050 TRY',
      balance: '0.00 TRY (Closed)',
      roomNote: 'Double with Balcony • Clean / Ready',
      guestNote: 'Baby cot requested, late check-out at 12:00 requested.',
      housekeepingNote:
        'Housekeeping: Baby cot placed in room 304 (24.05 11:30 - Attendant: Emine K.)',
    },
  },
  {
    id: 'RZ-2025-0843',
    createdAt: '22.04.2025 09:44',
    country: 'DE',
    guest: 'Klaus M. Weber',
    phone: '+49 170 334 9182',
    room: 'Room 118 (Family Suite)',
    roomInfo: '1st Floor • Garden & Pool',
    dates: '24 May - 02 Jun 2025',
    nights: '9 Nights',
    pax: '2 Ad. + 2 Ch.',
    paxIcon: 'group',
    board: 'ULTRA ALL INCLUSIVE',
    sourceIcon: 'travel_explore',
    source: 'TUI Deutschland',
    total: '82.400 TRY',
    payment: 'PARTIAL (30,000 TRY)',
    paymentTone: 'partial',
    status: 'confirmed',
    arrivesToday: true,
  },
  {
    id: 'RZ-2025-0844',
    createdAt: '22.04.2025 11:20',
    country: 'RU',
    guest: 'Elena Rostova',
    phone: '+7 916 552 1403',
    room: 'Room 412 (Deluxe Penthouse)',
    roomInfo: '4th Floor • Panoramic Taurus & Sea View',
    dates: '25 May - 01 Jun 2025',
    nights: '7 Nights',
    pax: '1 Adult',
    paxIcon: 'person',
    board: 'FULL BOARD PLUS',
    sourceIcon: 'storefront',
    source: 'Front Desk Direct',
    total: '61.250 TRY',
    payment: 'COLLECTED',
    paymentTone: 'paid',
    status: 'confirmed',
  },
  {
    id: 'RZ-2025-0845',
    createdAt: '23.04.2025 16:02',
    country: 'TR',
    guest: 'Cemil & Beril Aksoy',
    phone: '+90 541 230 4567',
    room: 'Room 205 (Standard Garden)',
    roomInfo: '2nd Floor • Block B',
    dates: '26 May - 30 May 2025',
    nights: '4 Nights (Option expires: 24 May 18:00)',
    pax: '2 Adults',
    paxIcon: 'group',
    board: 'ALL INCLUSIVE',
    sourceIcon: 'language',
    source: 'Website',
    total: '26.800 TRY',
    payment: 'PAYMENT DUE',
    paymentTone: 'due',
    status: 'pending',
  },
  {
    id: 'RZ-2025-0839',
    createdAt: '19.04.2025 15:40',
    country: 'UK',
    guest: 'David H. Sterling',
    phone: '+44 770 090 0145',
    room: 'Room 501 (Pres. Villa)',
    roomInfo: 'Private Villa Cove',
    dates: '17 May - 24 May 2025',
    nights: '7 Nights (Checked out today)',
    pax: '4 Adults',
    paxIcon: 'group',
    board: 'ULTRA ALL INCLUSIVE',
    sourceIcon: 'stars',
    source: 'VIP Concierge',
    total: '148.900 TRY',
    payment: 'CLOSED / ZERO',
    paymentTone: 'closed',
    status: 'checkedOut',
  },
]
