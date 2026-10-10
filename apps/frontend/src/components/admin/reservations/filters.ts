import type { LedgerStatus } from '@/data/hotel'

export type Tab = 'all' | LedgerStatus

// Hotel-wide totals for the season; the table lists only a sample of them.
export const BASE_COUNTS: Record<Tab, number> = {
  all: 184,
  confirmed: 92,
  checkedIn: 62,
  pending: 14,
  checkedOut: 12,
  cancelled: 4,
}

export const SOURCES: { value: string; label: string; match: string[] }[] = [
  { value: '', label: 'All Sources', match: [] },
  { value: 'web', label: 'Official Website (Booking Engine)', match: ['Website'] },
  { value: 'resepsiyon', label: 'Front Desk Direct / Phone', match: ['Front Desk Direct'] },
  { value: 'acente', label: 'Agency (ETS Tur / Coral Travel)', match: ['TUI Deutschland'] },
  { value: 'b2b', label: 'B2B Global (Booking.com / Expedia)', match: [] },
]

export const BOARDS: { value: string; label: string; match: string }[] = [
  { value: '', label: 'All Board Types', match: '' },
  { value: 'ai', label: 'Ultra All Inclusive (UAI)', match: 'ULTRA ALL INCLUSIVE' },
  { value: 'hsd', label: 'All Inclusive (AI)', match: 'ALL INCLUSIVE' },
  { value: 'tp', label: 'Full Board Plus (FB+)', match: 'FULL BOARD PLUS' },
  { value: 'yp', label: 'Half Board (HB)', match: 'HALF BOARD' },
]

export const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'checkedIn', label: 'Checked In' },
  { key: 'pending', label: 'Pending' },
  { key: 'checkedOut', label: 'Checked Out' },
  { key: 'cancelled', label: 'Cancelled' },
]
