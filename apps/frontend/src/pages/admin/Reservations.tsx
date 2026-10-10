import { useMemo, useState } from 'react'
import ReservationDetail from '@/components/admin/reservations/ReservationDetail'
import ReservationFilters from '@/components/admin/reservations/ReservationFilters'
import ReservationKpis from '@/components/admin/reservations/ReservationKpis'
import ReservationTable from '@/components/admin/reservations/ReservationTable'
import ReservationsHeader from '@/components/admin/reservations/ReservationsHeader'
import { BASE_COUNTS, BOARDS, SOURCES, type Tab } from '@/components/admin/reservations/filters'
import { useHotel } from '@/context/HotelProvider'
import { initialReservations, type LedgerStatus } from '@/data/hotel'

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

  return (
    <div className="flex flex-col w-full pb-12">
      <ReservationsHeader />
      <ReservationKpis counts={counts} />
      <ReservationFilters
        counts={counts}
        tab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        source={source}
        onSourceChange={setSource}
        board={board}
        onBoardChange={setBoard}
        onReset={resetFilters}
      />
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        <ReservationTable
          rows={rows}
          total={counts.all}
          selectedId={selectedReservationId}
          onSelect={selectReservation}
          onStatusChange={setReservationStatus}
        />
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
