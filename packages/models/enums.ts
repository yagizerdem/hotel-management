export enum RoomType {
  SINGLE = "SINGLE",
  TWIN = "TWIN",
  DOUBLE = "DOUBLE",
  TRIPLE_SINGLES = "TRIPLE_SINGLES",
  TRIPLE_MIXED = "TRIPLE_MIXED",
  QUAD = "QUAD",
  ROYAL_SUITE = "ROYAL_SUITE",
}

export enum BoardType {
  FULL_BOARD = "FULL_BOARD",
  ALL_INCLUSIVE = "ALL_INCLUSIVE",
}

export enum CleaningStatus {
  CLEAN = "CLEAN",
  DIRTY = "DIRTY",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW",
}

export enum ReservationSource {
  WEB = "WEB",
  RECEPTION = "RECEPTION",
}

export enum UserRole {
  MANAGER = "MANAGER",
  RECEPTIONIST = "RECEPTIONIST",
  IT_ADMIN = "IT_ADMIN",
  CUSTOMER = "CUSTOMER",
  HOUSEKEEPER = "HOUSEKEEPER",
  COOK = "COOK",
  WAITER = "WAITER",
  ELECTRICIAN = "ELECTRICIAN",
  IT_SPECIALIST = "IT_SPECIALIST",
  ADMIN = "ADMIN",
}

export enum PayType {
  HOURLY = "HOURLY",
  MONTHLY = "MONTHLY",
}

export enum ShiftType {
  MORNING = "MORNING",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  REGULAR = "REGULAR",
  DAY_OFF = "DAY_OFF",
}

export enum ExtraChargeCategory {
  MINIBAR = "MINIBAR",
  BAR = "BAR",
  SNACKBAR = "SNACKBAR",
  RESTAURANT = "RESTAURANT",
  OTHER = "OTHER",
}

export enum ReportStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export enum BackupAction {
  BACKUP = "BACKUP",
  RESTORE = "RESTORE",
}

export enum Currency {
  TRY = "TRY",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}
