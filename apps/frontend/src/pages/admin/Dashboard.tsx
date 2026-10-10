import { useMemo, useState } from 'react'
import ArrivalRow from '../../components/admin/dashboard/ArrivalRow'
import DepartureRow from '../../components/admin/dashboard/DepartureRow'
import RoomGrid, { FloorSummary } from '../../components/admin/dashboard/RoomGrid'
import Icon from '../../components/Icon'
import { useHotel, type ArrivalFilter } from '../../context/hotelContext'

const ROOM_RATES: Record<string, number> = {
  'Çift Kişilik Balkonlu (4 Müsait)': 4950,
  'Tek Kişilik Standart (3 Müsait)': 3400,
  'Twin Yataklı (2 Müsait)': 4300,
  'Royal Suit (0 Müsait)': 12000,
}

const BOARD_FACTORS: Record<string, number> = {
  'Her Şey Dahil (AI)': 1,
  'Tam Pansiyon (FB)': 0.9,
  'Yarım Pansiyon (HB)': 0.8,
  'Oda Kahvaltı (BB)': 0.65,
}

const matches = (query: string, ...fields: (string | number | undefined)[]) =>
  !query || fields.some((f) => String(f ?? '').toLowerCase().includes(query))

// Totals for the whole day; the tables below only list a sample of them.
const EXPECTED_ARRIVALS = 14
const EXPECTED_DEPARTURES = 11

export default function Dashboard() {
  const {
    arrivals,
    departures,
    rooms,
    roomCounts,
    search,
    arrivalFilter,
    setArrivalFilter,
    checkIn,
    checkOut,
    setRoomStatus,
  } = useHotel()

  const [nights, setNights] = useState(3)
  const [roomType, setRoomType] = useState('Çift Kişilik Balkonlu (4 Müsait)')
  const [board, setBoard] = useState('Her Şey Dahil (AI)')

  const query = search.trim().toLowerCase()
  const occupancy = ((roomCounts.occupied / roomCounts.total) * 100).toFixed(1)
  const maintenanceList = rooms
    .filter((r) => r.status === 'maintenance')
    .map((r) => r.number)
    .join(', ')
  const maintenance312Open = rooms.some((r) => r.number === 312 && r.status === 'maintenance')
  const activeAlerts = maintenance312Open ? 3 : 2

  // 5 sample arrivals/departures are listed; the rest of the day's totals are fixed.
  const arrivalsDone = EXPECTED_ARRIVALS - 9 + arrivals.filter((a) => a.status === 'checkedIn').length
  const arrivalsPending = EXPECTED_ARRIVALS - arrivalsDone
  const departuresDone = EXPECTED_DEPARTURES - 4 + departures.filter((d) => d.status === 'left').length
  const departuresRemaining = EXPECTED_DEPARTURES - departuresDone

  const arrivalFilters: { key: ArrivalFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Tümü', count: EXPECTED_ARRIVALS },
    { key: 'pending', label: 'Bekleyenler', count: arrivalsPending },
    { key: 'vip', label: 'VIP Rezervasyon', count: 2 },
    { key: 'unpaid', label: 'Ödemesi Alınmamış', count: 3 },
  ]

  const visibleArrivals = useMemo(
    () =>
      arrivals.filter((a) => {
        if (!matches(query, a.guest, a.id, a.room)) return false
        if (arrivalFilter === 'pending') return a.status !== 'checkedIn'
        if (arrivalFilter === 'vip') return a.vip
        if (arrivalFilter === 'unpaid') return a.unpaid
        return true
      }),
    [arrivals, arrivalFilter, query],
  )
  const visibleDepartures = useMemo(
    () => departures.filter((d) => matches(query, d.guest, d.id, d.room)),
    [departures, query],
  )

  const estimate =
    (nights * ROOM_RATES[roomType] * BOARD_FACTORS[board]).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' TRY'

  return (
    <>
            <div className="flex flex-col w-full pb-10 space-y-3">
              <div className="w-full bg-surface-container-lowest shadow-sm p-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-[720px]">
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
                    <span className="w-1.5 h-3 bg-secondary"></span>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Girişler:</span>
                    <span className="font-mono-data text-mono-data font-semibold text-secondary">14 Beklenen</span>
                    <span className="text-outline-variant font-mono-data text-mono-data">/</span>
                    <span className="font-mono-data text-mono-data text-on-surface-variant font-medium">{arrivalsDone} Tamam</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
                    <span className="w-1.5 h-3 bg-on-tertiary-container"></span>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Çıkışlar:</span>
                    <span className="font-mono-data text-mono-data font-semibold text-on-tertiary-container">11 Beklenen</span>
                    <span className="text-outline-variant font-mono-data text-mono-data">/</span>
                    <span className="font-mono-data text-mono-data text-on-surface-variant font-medium">{departuresDone} Tamam</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
                    <span className="w-1.5 h-3 bg-secondary"></span>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Müsait:</span>
                    <span className="font-mono-data text-mono-data font-semibold text-secondary">{roomCounts.available} Oda (Temiz)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
                    <span className="w-1.5 h-3 bg-primary"></span>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Dolu:</span>
                    <span className="font-mono-data text-mono-data font-semibold text-primary">{roomCounts.occupied} Oda (%{occupancy})</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
                    <span className="w-1.5 h-3 bg-tertiary-fixed-dim"></span>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Temizlik:</span>
                    <span className="font-mono-data text-mono-data font-semibold text-on-surface">{roomCounts.dirty} Oda</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 text-on-surface">
                    <span className="w-1.5 h-3 bg-error"></span>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Bakımda:</span>
                    <span className="font-mono-data text-mono-data font-semibold text-error">{roomCounts.maintenance} Oda <span className="text-outline font-normal">({maintenanceList})</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="h-7 px-2.5 bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center gap-1 shadow-sm hover:opacity-95 transition-opacity" type="button">
                    <Icon name="add" className="text-[15px]" />
                    <span>+ Yeni Rezervasyon [F2]</span>
                  </button>
                  <button className="h-7 px-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center gap-1 transition-colors" type="button">
                    <Icon name="login" className="text-[15px] text-secondary" />
                    <span>Hızlı Check-in</span>
                  </button>
                  <button className="h-7 px-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center gap-1 transition-colors" type="button">
                    <Icon name="logout" className="text-[15px] text-on-tertiary-container" />
                    <span>Hızlı Check-out</span>
                  </button>
                  <button className="h-7 px-2 bg-primary-container text-surface-container-lowest font-label-sm text-label-sm flex items-center gap-1 hover:bg-primary transition-colors" type="button">
                    <Icon name="grid_view" className="text-[15px]" />
                    <span>Oda Matrisi</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3 w-full items-start">
                <div className="col-span-12 xl:col-span-7 space-y-3">
                  <div className="bg-surface-container-lowest shadow-sm flex flex-col">
                    <div className="px-3 py-2 bg-primary-container text-surface-container-lowest flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="assignment_turned_in" className="text-[17px] text-secondary-fixed" />
                        <span className="font-headline-sm text-headline-sm tracking-tight text-surface-container-lowest font-semibold">Bugünkü Girişler (Check-in Listesi)</span>
                        <span className="font-mono-data text-[10px] bg-primary text-secondary-fixed px-1.5 py-0.5 uppercase tracking-wide">14:00 Başlangıç</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono-data text-mono-data text-on-primary-container">
                        <span>Bekleyen: <strong className="text-surface-container-lowest">{arrivalsPending}</strong></span>
                        <span>•</span>
                        <span>Tamamlanan: <strong className="text-secondary-fixed">{arrivalsDone}</strong></span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low px-3 py-1.5 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold uppercase text-outline">Filtre:</span>
                        {arrivalFilters.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => setArrivalFilter(f.key)}
          className={`px-2 py-0.5 whitespace-nowrap ${arrivalFilter === f.key ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold' : 'hover:bg-surface-container text-outline'}`}
        >
          {f.label} ({f.count})
        </button>
      ))}
      </div>
                      <span className="font-mono-data text-[11px] text-outline">Otomatik Senkronize: 12:44:02</span>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-left font-body-sm text-body-sm">
                        <thead className="bg-surface-container text-on-surface font-label-sm text-label-sm uppercase">
                          <tr>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Rez. No</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Misafir Adı</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Oda & Tip</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Konaklama</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Pansiyon</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Durum</th>
                            <th className="py-1.5 px-2.5 text-right font-semibold text-primary">Bakiye</th>
                            <th className="py-1.5 px-2.5 text-center font-semibold text-primary">İşlem</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-high font-mono-data text-[12px]">{visibleArrivals.map((arrival) => (
      <ArrivalRow key={arrival.id} arrival={arrival} onCheckIn={checkIn} />
      ))}</tbody>
                      </table>
                    </div>
                    <div className="p-2 bg-surface-container-low flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                      <span>Toplam 14 rezervasyondan {visibleArrivals.length}'i listeleniyor</span>
                      <div className="flex gap-1">
                        <button className="px-2 py-0.5 bg-surface-container-lowest text-primary shadow-sm font-semibold">1</button>
                        <button className="px-2 py-0.5 bg-surface-container text-outline hover:text-primary">2</button>
                        <button className="px-2 py-0.5 bg-surface-container text-outline hover:text-primary">3</button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest shadow-sm flex flex-col">
                    <div className="px-3 py-2 bg-primary text-surface-container-lowest flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="luggage" className="text-[17px] text-tertiary-fixed-dim" />
                        <span className="font-headline-sm text-headline-sm tracking-tight text-surface-container-lowest font-semibold">Bugünkü Çıkışlar (Check-out Listesi)</span>
                        <span className="font-mono-data text-[10px] bg-primary-container text-surface-variant px-1.5 py-0.5 uppercase tracking-wide">10:00 - 12:00 Teslim</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono-data text-mono-data text-on-primary-container">
                        <span>Kalan Çıkış: <strong className="text-tertiary-fixed-dim">{departuresRemaining}</strong></span>
                        <span>•</span>
                        <span>Ayrılan: <strong className="text-surface-container-lowest">{departuresDone}</strong></span>
                      </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-left font-body-sm text-body-sm">
                        <thead className="bg-surface-container text-on-surface font-label-sm text-label-sm uppercase">
                          <tr>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Rez. No</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Misafir Adı</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Oda</th>
                            <th className="py-1.5 px-2.5 text-right font-semibold text-primary">Folio / Ekstra</th>
                            <th className="py-1.5 px-2.5 font-semibold text-primary">Durum</th>
                            <th className="py-1.5 px-2.5 text-center font-semibold text-primary">İşlem</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-high font-mono-data text-[12px]">{visibleDepartures.map((departure) => (
      <DepartureRow key={departure.id} departure={departure} onCheckOut={checkOut} />
      ))}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 xl:col-span-5 space-y-3">
                  <div className="bg-surface-container-lowest shadow-sm flex flex-col p-3">
                    <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-low -mx-3 -mt-3 p-3 text-primary">
                      <div className="flex items-center gap-1.5">
                        <Icon name="apartment" className="text-[18px] text-secondary" />
                        <span className="font-headline-sm text-headline-sm font-semibold">Anlık Kat ve Oda Durumu ({roomCounts.total} Oda)</span>
                      </div>
                      <span className="font-mono-data text-mono-data font-bold text-secondary">%{occupancy} Doluluk</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-1.5 px-2 bg-surface-container-lowest mb-2.5 text-[11px] font-label-sm uppercase">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-secondary inline-block"></span>
                        <span className="text-on-surface">Dolu ({roomCounts.occupied})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-secondary-fixed inline-block"></span>
                        <span className="text-on-surface">Müsait ({roomCounts.available})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-tertiary-fixed-dim inline-block"></span>
                        <span className="text-on-surface">Kirli/Temizlik ({roomCounts.dirty})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-error inline-block"></span>
                        <span className="text-on-surface">Bakım ({roomCounts.maintenance})</span>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="bg-surface-container-low p-2">
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="font-semibold text-primary flex items-center gap-1"><span className="text-secondary font-mono-data">4. KAT</span> • 17 Oda (10 Çift, 6 Dört Kişilik, 1 Kral) </span>
                          <FloorSummary floor={4} />
                        </div>
      <RoomGrid floor={4} />
                      </div>
                      <div className="bg-surface-container-low p-2">
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="font-semibold text-primary flex items-center gap-1"><span className="text-secondary font-mono-data">3. KAT</span> • 20 Oda (10 Çift, 10 Üç Kişilik Balkonlu) </span>
                          <FloorSummary floor={3} />
                        </div>
      <RoomGrid floor={3} />
                      </div>
                      <div className="bg-surface-container-low p-2">
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="font-semibold text-primary flex items-center gap-1"><span className="text-secondary font-mono-data">2. KAT</span> • 20 Oda (10 Tek, 10 Twin) </span>
                          <FloorSummary floor={2} />
                        </div>
      <RoomGrid floor={2} />
                      </div>
                      <div className="bg-surface-container-low p-2">
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="font-semibold text-primary flex items-center gap-1"><span className="text-secondary font-mono-data">1. KAT</span> • 20 Oda (10 Tek, 10 Üç Kişilik) </span>
                          <FloorSummary floor={1} />
                        </div>
      <RoomGrid floor={1} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest shadow-sm p-3">
                    <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-low -mx-3 -mt-3 p-3 text-primary">
                      <div className="flex items-center gap-1.5">
                        <Icon name="warning" className="text-[18px] text-on-tertiary-container" />
                        <span className="font-headline-sm text-headline-sm font-semibold">Operasyonel Uyarılar & Resepsiyon Notları</span>
                      </div>
                      <span className="font-mono-data text-[11px] bg-surface-container px-2 py-0.5 text-outline">{activeAlerts} Aktif Uyarı</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 bg-surface-container-low flex items-start gap-2.5">
                        <Icon name="star" className="text-on-tertiary-container text-[18px] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-bold text-tertiary uppercase">VIP Karşılama • Markus Weber</span>
                            <span className="font-mono-data text-[10px] text-outline">15:30 Varış</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface mt-0.5"> Kral Dairesi 401 için VIP transfer Antalya Havalimanı'ndan yola çıktı. Özel meyve sepeti ve Moët şampanya odaya yerleştirildi. </p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-surface-container-low flex items-start gap-2.5">
                        <Icon name="liquor" className="text-secondary text-[18px] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-bold text-primary uppercase">Minibar Onayı Bekleniyor</span>
                            <span className="font-mono-data text-[10px] text-outline">Kat Hizmetleri (12:38)</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface mt-0.5"> Oda 214 için check-out öncesi minibar tüketimi (2x Bira, 1x Çikolata) folyoya eklendi. Resepsiyon tahsilat onayı bekliyor. </p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-surface-container-low flex items-start gap-2.5">
                        <Icon name="build" className="text-outline text-[18px] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Teknik Servis Notu • Oda 312</span>
                            <span className="font-mono-data text-[10px] text-outline">Teknik (11:15)</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface mt-0.5"> Klima filtre ve gaz değişimi tamamlandı. Testler yapıldı. Resepsiyon sistemden arıza kaydını kapatıp odayı "Kirli/Temizlenecek" statüsüne geçirebilir. </p>
                          {maintenance312Open ? (
      <div className="mt-2 flex gap-1.5">
      <button className="bg-primary text-on-primary px-2 py-0.5 font-label-sm text-label-sm font-semibold hover:opacity-90" type="button" onClick={() => setRoomStatus(312, 'dirty')}>
      Onayla & Temizliğe Ver
      </button>
      </div>
      ) : (
      <div className="mt-2 font-label-sm text-label-sm text-secondary flex items-center gap-1">
      <Icon name="check_circle" className="text-[14px]" /> Oda 312 temizliğe verildi
      </div>
      )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest shadow-sm p-3">
                    <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-low -mx-3 -mt-3 p-3 text-primary">
                      <div className="flex items-center gap-1.5">
                        <Icon name="calculate" className="text-[18px] text-secondary" />
                        <span className="font-headline-sm text-headline-sm font-semibold">Hızlı Fiyat & Müsait Oda Bulucu</span>
                      </div>
                      <span className="font-mono-data text-[10px] text-secondary font-semibold">CANLI TARİFE</span>
                    </div>
                    <form className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-0.5">Giriş Tarihi</label>
                          <input className="w-full h-7 px-2 font-mono-data text-mono-data bg-surface-container-low text-on-surface" type="date" defaultValue="2025-05-24" />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-0.5">Gece Sayısı</label>
                          <input className="w-full h-7 px-2 font-mono-data text-mono-data bg-surface-container-low text-on-surface" max="30" min="1" type="number" value={nights} onChange={(e) => setNights(Math.min(30, Math.max(1, Number(e.target.value) || 1)))} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-0.5">Oda Tipi</label>
                          <select className="w-full h-7 px-1.5 font-body-sm text-body-sm bg-surface-container-low text-on-surface" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                            <option>Çift Kişilik Balkonlu (4 Müsait)</option>
                            <option>Tek Kişilik Standart (3 Müsait)</option>
                            <option>Twin Yataklı (2 Müsait)</option>
                            <option>Royal Suit (0 Müsait)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-0.5">Pansiyon Tipi</label>
                          <select className="w-full h-7 px-1.5 font-body-sm text-body-sm bg-surface-container-low text-on-surface" value={board} onChange={(e) => setBoard(e.target.value)}>
                            <option>Her Şey Dahil (AI)</option>
                            <option>Tam Pansiyon (FB)</option>
                            <option>Yarım Pansiyon (HB)</option>
                            <option>Oda Kahvaltı (BB)</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-2 bg-surface-container-high flex items-center justify-between mt-2">
                        <div>
                          <span className="font-label-sm text-label-sm text-outline uppercase block">Tahmini Tutar ({nights} Gece)</span>
                          <span className="font-headline-sm text-headline-sm font-bold text-secondary font-mono-data">{estimate}</span>
                        </div>
                        <button className="h-7 px-3 bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:opacity-90 transition-opacity" type="button"> Rezervasyona Dönüştür </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}
