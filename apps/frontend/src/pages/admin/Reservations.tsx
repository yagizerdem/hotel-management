import { useMemo, useState } from 'react'
import Icon from '../../components/Icon'
import ReservationDetail from '../../components/admin/reservations/ReservationDetail'
import ReservationRow from '../../components/admin/reservations/ReservationRow'
import { useHotel } from '../../context/hotelContext'
import { initialReservations, type LedgerStatus } from '../../data/hotel'

type Tab = 'all' | LedgerStatus

// Hotel-wide totals for the season; the table lists only a sample of them.
const BASE_COUNTS: Record<Tab, number> = {
  all: 184,
  confirmed: 92,
  checkedIn: 62,
  pending: 14,
  checkedOut: 12,
  cancelled: 4,
}

const SOURCES: { value: string; label: string; match: string[] }[] = [
  { value: '', label: 'Tüm Kaynaklar (Hepsi)', match: [] },
  { value: 'web', label: 'Resmi Web Sitesi (Booking Engine)', match: ['Web Sitesi'] },
  { value: 'resepsiyon', label: 'Resepsiyon Doğrudan / Telefon', match: ['Resepsiyon Direkt'] },
  { value: 'acente', label: 'Acente (ETS Tur / Coral Travel)', match: ['TUI Deutschland'] },
  { value: 'b2b', label: 'B2B Global (Booking.com / Expedia)', match: [] },
]

const BOARDS: { value: string; label: string; match: string }[] = [
  { value: '', label: 'Tüm Pansiyon Tipleri', match: '' },
  { value: 'ai', label: 'Ultra Her Şey Dahil (UAI)', match: 'ULTRA HER ŞEY DAHİL' },
  { value: 'hsd', label: 'Her Şey Dahil (AI)', match: 'HER ŞEY DAHİL' },
  { value: 'tp', label: 'Tam Pansiyon Plus (FB+)', match: 'TAM PANSİYON PLUS' },
  { value: 'yp', label: 'Yarım Pansiyon (HB)', match: 'YARIM PANSİYON' },
]

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'confirmed', label: 'Onaylandı' },
  { key: 'checkedIn', label: 'Giriş Yapıldı' },
  { key: 'pending', label: 'Beklemede' },
  { key: 'checkedOut', label: 'Çıkış Yapıldı' },
  { key: 'cancelled', label: 'İptal Edilenler' },
]

const filterLabel = 'block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1'
const selectClass =
  'w-full h-8 px-2 bg-surface-container-low text-body-sm font-body-sm text-on-surface border-0 focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary'

export default function Reservations() {
  const {
    reservations,
    search,
    setSearch,
    selectedReservationId,
    selectReservation,
    setReservationStatus,
  } = useHotel()

  const [tab, setTab] = useState<Tab>('all')
  const [source, setSource] = useState('')
  const [board, setBoard] = useState('')

  const counts = useMemo(() => {
    const current = (status: LedgerStatus) => reservations.filter((r) => r.status === status).length
    const initial = (status: LedgerStatus) =>
      initialReservations.filter((r) => r.status === status).length
    const result = { ...BASE_COUNTS }
    for (const status of Object.keys(result).filter((k) => k !== 'all') as LedgerStatus[]) {
      result[status] += current(status) - initial(status)
    }
    return result
  }, [reservations])

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase()
    const sourceMatch = SOURCES.find((s) => s.value === source)?.match ?? []
    const boardMatch = BOARDS.find((b) => b.value === board)?.match ?? ''
    return reservations.filter((r) => {
      if (tab !== 'all' && r.status !== tab) return false
      if (source && !sourceMatch.includes(r.source)) return false
      if (board && r.board !== boardMatch) return false
      if (!query) return true
      return [r.id, r.guest, r.phone, r.room].some((f) => f.toLowerCase().includes(query))
    })
  }, [reservations, search, tab, source, board])

  const selected = reservations.find((r) => r.id === selectedReservationId)

  const resetFilters = () => {
    setTab('all')
    setSource('')
    setBoard('')
    setSearch('')
  }

  const kpis: { label: string; value: number; note: string; tone: string; border: string }[] = [
    { label: 'TÜM KAYITLAR', value: counts.all, note: '%100', tone: 'text-primary', border: 'border-primary' },
    {
      label: 'ONAYLANDI',
      value: counts.confirmed,
      note: 'Giriş Bekliyor',
      tone: 'text-primary',
      border: 'border-outline',
    },
    {
      label: 'KONAKLIYOR (IN-HOUSE)',
      value: counts.checkedIn,
      note: '%80.5 Dolu',
      tone: 'text-[#38866C]',
      border: 'border-[#38866C]',
    },
    {
      label: 'BEKLEMEDE / ÖN KAYIT',
      value: counts.pending,
      note: 'Opsiyonlu',
      tone: 'text-[#D49B43]',
      border: 'border-[#D49B43]',
    },
    {
      label: 'ÇIKIŞ YAPILDI',
      value: counts.checkedOut,
      note: 'Bugün',
      tone: 'text-on-surface',
      border: 'border-outline-variant',
    },
    {
      label: 'İPTAL / NO-SHOW',
      value: counts.cancelled,
      note: '%2.1 Oran',
      tone: 'text-error',
      border: 'border-error',
    },
  ]

  return (
    <div className="flex flex-col w-full pb-12">
      <div className="py-space-md flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
              PMS ÖN BÜRO KONSOLU
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-mono-data text-mono-data text-on-surface-variant">
              SEZON 2025 • KEMER / ANTALYA
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mt-0.5">
            Rezervasyon Yönetimi
          </h1>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <button
            className="h-8 px-3 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors"
            type="button"
          >
            <Icon name="file_download" className="text-[16px] text-on-surface-variant" />
            <span>Excel / CSV Dışa Aktar</span>
          </button>
          <button
            className="h-8 px-3 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors"
            type="button"
          >
            <Icon name="print" className="text-[16px] text-on-surface-variant" />
            <span>Günlük Giriş Listesi</span>
          </button>
          <button
            className="h-8 px-4 bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            type="button"
          >
            <Icon name="add_circle" className="text-[18px]" />
            <span>Yeni Rezervasyon Oluştur</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`p-3 bg-surface-container-lowest border-l-2 ${kpi.border} shadow-sm flex flex-col justify-between`}
          >
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {kpi.label}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className={`font-headline-lg text-headline-lg ${kpi.tone} font-bold`}>
                {kpi.value}
              </span>
              <span className={`font-mono-data text-mono-data ${kpi.tone}`}>{kpi.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest p-space-md mb-4 shadow-sm space-y-3">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-on-surface">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`h-7 px-3 font-label-sm text-label-sm whitespace-nowrap ${
                tab === t.key
                  ? 'bg-primary text-on-primary'
                  : `bg-surface-container hover:bg-surface-variant text-on-surface ${
                      t.key === 'cancelled' ? 'text-error' : ''
                    }`
              }`}
            >
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
          <div className="relative">
            <label className={filterLabel}>Arama</label>
            <div className="relative">
              <Icon
                name="search"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-outline text-[16px]"
              />
              <input
                className="w-full h-8 pl-7 pr-2 bg-surface-container-low text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary"
                placeholder="Rez No, Ad, Pasaport..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={filterLabel}>Tarih Aralığı</label>
            <input
              className="w-full h-8 px-2 bg-surface-container-low text-body-sm font-body-sm text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary font-mono-data"
              type="text"
              defaultValue="24.05.2025 - 31.05.2025"
            />
          </div>
          <div>
            <label className={filterLabel}>Rezervasyon Kaynağı</label>
            <select className={selectClass} value={source} onChange={(e) => setSource(e.target.value)}>
              {SOURCES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={filterLabel}>Pansiyon Tipi</label>
            <select className={selectClass} value={board} onChange={(e) => setBoard(e.target.value)}>
              {BOARDS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={filterLabel}>Oda Kategorisi</label>
            <select className={selectClass} defaultValue="">
              <option value="">Tüm Odalar</option>
              <option value="std">Standart Deniz Manzaralı</option>
              <option value="deluxe">Deluxe Aile Süiti</option>
              <option value="swim">Swim-Up Bahçe Oda</option>
              <option value="pres">Kemer Presidential Villa</option>
            </select>
          </div>
          <div className="flex items-end gap-1">
            <button
              className="h-8 flex-1 bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 transition-colors"
              type="button"
            >
              <Icon name="tune" className="text-[16px]" />
              <span>Filtrele</span>
            </button>
            <button
              className="h-8 w-8 bg-surface-container hover:bg-surface-variant text-on-surface-variant flex items-center justify-center transition-colors"
              title="Filtreleri Sıfırla"
              type="button"
              onClick={resetFilters}
            >
              <Icon name="restart_alt" className="text-[16px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        <div className="flex-1 w-full overflow-x-auto bg-surface-container-lowest shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-on-surface font-label-sm text-label-sm tracking-wider uppercase select-none">
                {[
                  'REZ NO',
                  'MİSAFİR BİLGİSİ',
                  'ODA & KAT',
                  'KONAKLAMA TARİHİ',
                  'KİŞİ',
                  'PANSİYON',
                  'KAYNAK',
                  'TOPLAM / TAHSİLAT',
                  'DURUM',
                  'İŞLEMLER',
                ].map((h, i, all) => (
                  <th
                    key={h}
                    className={`py-2.5 px-3 font-semibold ${
                      i === all.length - 1 ? 'text-center' : i === 7 ? 'text-right' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm font-body-sm">
              {rows.map((r) => (
                <ReservationRow
                  key={r.id}
                  reservation={r}
                  selected={r.id === selectedReservationId}
                  onSelect={selectReservation}
                  onStatusChange={setReservationStatus}
                />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-on-surface-variant">
                    Filtrelere uyan rezervasyon bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface font-label-sm text-label-sm">
            <div className="flex items-center gap-2">
              <span>Sayfa Başına Kayıt:</span>
              <select
                className="h-7 px-2 bg-surface-container-lowest text-on-surface border-0 focus:ring-1 focus:ring-secondary font-mono-data text-mono-data"
                defaultValue="50"
              >
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-on-surface-variant">
                Toplam {counts.all} rezervasyondan {rows.length ? `1 - ${rows.length}` : '0'} arası
                listeleniyor
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="h-7 px-2.5 bg-surface-container-lowest hover:bg-surface-variant transition-colors disabled:opacity-40"
                disabled
              >
                <Icon name="chevron_left" className="text-[16px]" />
              </button>
              <button className="h-7 px-3 bg-secondary text-on-secondary font-medium font-mono-data text-mono-data">
                1
              </button>
              <button className="h-7 px-3 bg-surface-container-lowest hover:bg-surface-variant transition-colors font-mono-data text-mono-data">
                2
              </button>
              <button className="h-7 px-3 bg-surface-container-lowest hover:bg-surface-variant transition-colors font-mono-data text-mono-data">
                3
              </button>
              <button className="h-7 px-2.5 bg-surface-container-lowest hover:bg-surface-variant transition-colors">
                <Icon name="chevron_right" className="text-[16px]" />
              </button>
            </div>
          </div>
        </div>

        {selected && (
          <ReservationDetail
            reservation={selected}
            onClose={() => selectReservation(null)}
            onStatusChange={setReservationStatus}
          />
        )}
      </div>
    </div>
  )
}
