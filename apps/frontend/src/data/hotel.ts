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
      note: '401 Royal Suite - VIP Markus Weber Bekleniyor',
    },
    407: { status: 'dirty', note: '407 Çıkış / Temizlik Bekliyor' },
    412: { status: 'available', note: '412 MÜSAİT TEMİZ' },
    417: { status: 'available', note: '417 MÜSAİT TEMİZ' },
  }),
  ...floorRooms(3, range(301, 320), {
    304: { status: 'available' },
    312: { status: 'maintenance', note: '312 Arızalı: Klima Bakımı' },
    314: { status: 'dirty' },
    319: { status: 'available' },
  }),
  ...floorRooms(2, range(201, 220), {
    204: { status: 'maintenance', note: '204 Arızalı: Duşakabin Sızıntı' },
    208: { status: 'available' },
    214: { status: 'dirty', note: '214 Kirli / Minibar Bekliyor' },
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
    detail: '2 Yetişkin • TC: 492******12',
    room: 308,
    roomType: 'Çift Kişilik Balkonlu',
    stay: '24.05 - 29.05 (5 Gece)',
    board: 'HER ŞEY DAHİL',
    boardTone: 'highlight',
    status: 'pending',
    amount: '0.00 TRY',
    paymentLabel: '(ÖDENDİ)',
    action: 'Check-in Yap',
  },
  {
    id: '#RZ-8930',
    guest: 'Markus Weber',
    vip: true,
    detail: '1 Yetişkin • PAS: C9924X88',
    room: 401,
    roomType: 'Kral Dairesi (Royal)',
    stay: '24.05 - 31.05 (7 Gece)',
    board: 'ULTRA HER ŞEY DAHİL',
    boardTone: 'highlight',
    status: 'vip',
    amount: '4,250.00 EUR',
    paymentLabel: '(ÖDENDİ)',
    action: 'VIP Karşıla',
  },
  {
    id: '#RZ-8955',
    guest: 'Elif Demir',
    detail: '1 Yetişkin • TC: 188******94',
    room: 105,
    roomType: 'Tek Kişilik Standart',
    stay: '24.05 - 26.05 (2 Gece)',
    board: 'TAM PANSİYON',
    boardTone: 'neutral',
    status: 'pending',
    amount: '7,800.00 TRY',
    paymentLabel: 'POS BEKLİYOR',
    unpaid: true,
    action: 'Tahsilat & Giriş',
  },
  {
    id: '#RZ-8912',
    guest: 'Mehmet & Canan Öztürk',
    detail: '2 Yetişkin, 1 Çocuk',
    room: 218,
    roomType: 'Twin Balkonlu',
    stay: '24.05 - 30.05 (6 Gece)',
    board: 'HER ŞEY DAHİL',
    boardTone: 'highlight',
    status: 'checkedIn',
    amount: '0.00 TRY',
    action: 'Check-in Yap',
  },
  {
    id: '#RZ-8960',
    guest: 'Dmitry & Elena Volkov',
    detail: '2 Yetişkin • PAS: 75N82910',
    room: 315,
    roomType: 'Üç Kişilik Balkonlu',
    stay: '24.05 - 02.06 (9 Gece)',
    board: 'HER ŞEY DAHİL',
    boardTone: 'highlight',
    status: 'pending',
    amount: '2,150.00 EUR',
    paymentLabel: '(ÖDENDİ)',
    action: 'Check-in Yap',
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
    detail: 'Konaklama: 4 Gece • Çıkış Saati: 11:30',
    room: 214,
    roomType: 'Twin',
    amount: '1,420.00 TRY',
    folio: 'Minibar + Spa Masaj',
    status: 'waiting',
    badge: 'ÇIKIŞ BEKLİYOR',
    action: 'Hesabı Kes & Çıkış',
  },
  {
    id: '#RZ-8692',
    guest: 'Sarah & Tom Jenkins',
    detail: 'Konaklama: 7 Gece • Geç Çıkış Onaylı',
    room: 407,
    roomType: 'Dört Kişilik Aile',
    amount: '0.00 EUR',
    folio: 'Folyo Sıfırlandı',
    positive: true,
    status: 'late',
    badge: 'GEÇ ÇIKIŞ (13:30)',
    action: 'Kartı İade Al & Bitir',
  },
  {
    id: '#RZ-8705',
    guest: 'Hakan Aydın',
    detail: 'Fatura No: F-2025/11902',
    room: 112,
    amount: '0.00 TRY',
    folio: '',
    status: 'left',
    badge: 'AYRILDI (09:40)',
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
    room: 'Oda 304 (Balkonlu DBL)',
    roomInfo: '3. Kat • Deniz Cephesi',
    dates: '24 May - 29 May 2025',
    nights: '5 Gece (Kalan 5)',
    pax: '2 Yet. + 1 Çoc.',
    paxIcon: 'group',
    board: 'HER ŞEY DAHİL',
    sourceIcon: 'language',
    source: 'Web Sitesi',
    total: '39.050 TRY',
    payment: 'TAHSİL EDİLDİ',
    paymentTone: 'paid',
    status: 'checkedIn',
    details: {
      idNumber: '39201948210',
      email: 'demir.karahan@mail.com',
      nationality: 'Türkiye (TR)',
      checkIn: '24.05.2025',
      checkInTime: '14:00',
      checkOut: '29.05.2025',
      checkOutTime: '12:00',
      folioNo: '#FL-8821',
      folio: [
        { label: 'Gecelik Oda Fiyatı: 8.500 ₺ x 5 Gece', value: '42.500 TRY' },
        { label: 'Erken Rez. İndirimi (1 Ay Önce - AI %18)', value: '-7.650 TRY', tone: 'discount' },
        { label: 'Pansiyon Ekstrası: Her Şey Dahil', value: 'Dahil', tone: 'muted' },
        { label: 'Ekstra Harcamalar (A la carte & Spa)', value: '+4.200 TRY' },
      ],
      paid: '39.050 TRY',
      balance: '0.00 TRY (Kapandı)',
      roomNote: 'Çift Kişilik Balkonlu • Temiz / Hazır',
      guestNote: 'Bebek yatağı talep edildi, late check-out 12:00 rica edildi.',
      housekeepingNote:
        'Kat Hizmetleri: Bebek park yatağı 304 nolu odaya yerleştirildi (24.05 11:30 - Görevli: Emine K.)',
    },
  },
  {
    id: 'RZ-2025-0843',
    createdAt: '22.04.2025 09:44',
    country: 'DE',
    guest: 'Klaus M. Weber',
    phone: '+49 170 334 9182',
    room: 'Oda 118 (Aile Süiti)',
    roomInfo: '1. Kat • Bahçe & Havuz',
    dates: '24 May - 02 Haz 2025',
    nights: '9 Gece',
    pax: '2 Yet. + 2 Çoc.',
    paxIcon: 'group',
    board: 'ULTRA HER ŞEY DAHİL',
    sourceIcon: 'travel_explore',
    source: 'TUI Deutschland',
    total: '82.400 TRY',
    payment: 'KISMI (30.000 ₺)',
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
    room: 'Oda 412 (Deluxe Penthouse)',
    roomInfo: '4. Kat • Panoramik Toros & Deniz',
    dates: '25 May - 01 Haz 2025',
    nights: '7 Gece',
    pax: '1 Yetişkin',
    paxIcon: 'person',
    board: 'TAM PANSİYON PLUS',
    sourceIcon: 'storefront',
    source: 'Resepsiyon Direkt',
    total: '61.250 TRY',
    payment: 'TAHSİL EDİLDİ',
    paymentTone: 'paid',
    status: 'confirmed',
  },
  {
    id: 'RZ-2025-0845',
    createdAt: '23.04.2025 16:02',
    country: 'TR',
    guest: 'Cemil & Beril Aksoy',
    phone: '+90 541 230 4567',
    room: 'Oda 205 (Standart Bahçe)',
    roomInfo: '2. Kat • Blok B',
    dates: '26 May - 30 May 2025',
    nights: '4 Gece (Opsiyon: 24 May 18:00)',
    pax: '2 Yetişkin',
    paxIcon: 'group',
    board: 'HER ŞEY DAHİL',
    sourceIcon: 'language',
    source: 'Web Sitesi',
    total: '26.800 TRY',
    payment: 'ÖDEME BEKLİYOR',
    paymentTone: 'due',
    status: 'pending',
  },
  {
    id: 'RZ-2025-0839',
    createdAt: '19.04.2025 15:40',
    country: 'UK',
    guest: 'David H. Sterling',
    phone: '+44 770 090 0145',
    room: 'Oda 501 (Pres. Villa)',
    roomInfo: 'Müstakil Villa Koyu',
    dates: '17 May - 24 May 2025',
    nights: '7 Gece (Bugün Çıktı)',
    pax: '4 Yetişkin',
    paxIcon: 'group',
    board: 'ULTRA HER ŞEY DAHİL',
    sourceIcon: 'stars',
    source: 'VIP Concierge',
    total: '148.900 TRY',
    payment: 'KAPANDI / SIFIR',
    paymentTone: 'closed',
    status: 'checkedOut',
  },
]
