export const USER_ROLES = ["customer", "receptionist", "manager", "it"] as const;

export const STAFF_POSITIONS = [
  "receptionist",
  "cleaner",
  "cook",
  "waiter",
  "electrician",
  "it",
  "manager",
] as const;

export const PAY_TYPES = ["hourly", "monthly"] as const;

// Beds: s = single, d = double
export const ROOM_TYPES = {
  single: { capacity: 1, beds: "1s" },
  twin: { capacity: 2, beds: "2s" },
  double: { capacity: 2, beds: "1d" },
  tripleSingles: { capacity: 3, beds: "3s" },
  tripleMixed: { capacity: 3, beds: "1s+1d" },
  quad: { capacity: 4, beds: "1d+2s" },
  suite: { capacity: 4, beds: "royal" },
} as const;

export const ROOM_TYPE_KEYS = Object.keys(ROOM_TYPES) as [
  keyof typeof ROOM_TYPES,
  ...(keyof typeof ROOM_TYPES)[],
];

export const ROOM_FEATURES = [
  "balcony",
  "minibar",
  "airConditioning",
  "tv",
  "hairDryer",
  "wifi",
] as const;

export const HOUSEKEEPING_STATUSES = ["clean", "dirty"] as const;

export const BOARD_TYPES = ["fullBoard", "allInclusive"] as const;

export const RESERVATION_SOURCES = ["web", "reception"] as const;

export const RESERVATION_STATUSES = [
  "confirmed",
  "checkedIn",
  "checkedOut",
  "cancelled",
] as const;

// Hours are [start, end) on a 24h clock. The night shift ends at 8:00 the next day.
export const SHIFT_TYPES = {
  morning: { start: 8, end: 16 },
  evening: { start: 16, end: 24 },
  night: { start: 0, end: 8 },
  office: { start: 8, end: 18 },
  off: { start: 0, end: 0 },
} as const;

export const SHIFT_TYPE_KEYS = Object.keys(SHIFT_TYPES) as [
  keyof typeof SHIFT_TYPES,
  ...(keyof typeof SHIFT_TYPES)[],
];

export const CURRENCIES = ["TRY", "USD", "EUR", "GBP"] as const;

export const CHECK_IN_HOUR = 14;
export const CHECK_OUT_HOUR = 10;
