import type { LedgerStatus, Reservation } from '../../../data/hotel'

export const statusLabel: Record<LedgerStatus, string> = {
  checkedIn: 'GİRİŞ YAPILDI',
  confirmed: 'ONAYLANDI',
  pending: 'BEKLEMEDE',
  checkedOut: 'ÇIKIŞ YAPILDI',
  cancelled: 'İPTAL EDİLDİ',
}

export const statusTone: Record<LedgerStatus, string> = {
  checkedIn: 'bg-[#EDF6F2] text-[#38866C]',
  confirmed: 'bg-surface-container-high text-primary',
  pending: 'bg-[#FEF6EC] text-[#D49B43]',
  checkedOut: 'bg-surface-container text-on-surface-variant',
  cancelled: 'bg-[#FDF2F2] text-error',
}

export const detailChip: Record<LedgerStatus, string> = {
  checkedIn: 'AKTİF KONAKLAMA',
  confirmed: 'GİRİŞ BEKLİYOR',
  pending: 'ÖN KAYIT',
  checkedOut: 'TAMAMLANDI',
  cancelled: 'İPTAL',
}

export const paymentTone: Record<Reservation['paymentTone'], string> = {
  paid: 'bg-[#EDF6F2] text-[#38866C]',
  closed: 'bg-[#EDF6F2] text-[#38866C]',
  partial: 'bg-[#FEF6EC] text-[#D49B43]',
  due: 'bg-[#FDF2F2] text-error',
}
