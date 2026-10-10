import { useMemo } from 'react'
import AlertsPanel from '@/components/admin/dashboard/AlertsPanel'
import ArrivalsPanel from '@/components/admin/dashboard/ArrivalsPanel'
import DeparturesPanel from '@/components/admin/dashboard/DeparturesPanel'
import FloorStatusPanel from '@/components/admin/dashboard/FloorStatusPanel'
import RateFinderPanel from '@/components/admin/dashboard/RateFinderPanel'
import SummaryBar from '@/components/admin/dashboard/SummaryBar'
import { useHotel, type ArrivalFilter } from '@/context/HotelProvider'

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
    { key: 'all', label: 'All', count: EXPECTED_ARRIVALS },
    { key: 'pending', label: 'Pending', count: arrivalsPending },
    { key: 'vip', label: 'VIP Reservation', count: 2 },
    { key: 'unpaid', label: 'Unpaid', count: 3 },
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

  return (
    <div className="flex flex-col w-full pb-10 space-y-3">
      <SummaryBar
        arrivalsDone={arrivalsDone}
        departuresDone={departuresDone}
        available={roomCounts.available}
        occupied={roomCounts.occupied}
        occupancy={occupancy}
        dirty={roomCounts.dirty}
        maintenance={roomCounts.maintenance}
        maintenanceList={maintenanceList}
      />
      <div className="grid grid-cols-12 gap-3 w-full items-start">
        <div className="col-span-12 xl:col-span-7 space-y-3">
          <ArrivalsPanel
            arrivals={visibleArrivals}
            filters={arrivalFilters}
            filter={arrivalFilter}
            onFilterChange={setArrivalFilter}
            pending={arrivalsPending}
            done={arrivalsDone}
            onCheckIn={checkIn}
          />
          <DeparturesPanel
            departures={visibleDepartures}
            remaining={departuresRemaining}
            done={departuresDone}
            onCheckOut={checkOut}
          />
        </div>
        <div className="col-span-12 xl:col-span-5 space-y-3">
          <FloorStatusPanel counts={roomCounts} occupancy={occupancy} />
          <AlertsPanel
            activeAlerts={activeAlerts}
            maintenance312Open={maintenance312Open}
            onRoomCleaning={() => setRoomStatus(312, 'dirty')}
          />
          <RateFinderPanel />
        </div>
      </div>
    </div>
  )
}
