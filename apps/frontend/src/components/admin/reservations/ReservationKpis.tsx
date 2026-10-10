import StatCard from '@/components/common/StatCard'
import type { Tab } from '@/components/admin/reservations/filters'

export default function ReservationKpis({ counts }: { counts: Record<Tab, number> }) {
  const kpis = [
    { label: 'ALL RECORDS', value: counts.all, note: '%100', tone: 'text-primary', border: 'border-primary' },
    { label: 'CONFIRMED', value: counts.confirmed, note: 'Awaiting Check-in', tone: 'text-primary', border: 'border-outline' },
    { label: 'IN-HOUSE', value: counts.checkedIn, note: '80.5% Full', tone: 'text-[#38866C]', border: 'border-[#38866C]' },
    { label: 'PENDING / PRE-REGISTERED', value: counts.pending, note: 'On Option', tone: 'text-[#D49B43]', border: 'border-[#D49B43]' },
    { label: 'CHECKED OUT', value: counts.checkedOut, note: 'Today', tone: 'text-on-surface', border: 'border-outline-variant' },
    { label: 'CANCELLED / NO-SHOW', value: counts.cancelled, note: '2.1% Rate', tone: 'text-error', border: 'border-error' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {kpis.map((kpi) => (
        <StatCard key={kpi.label} {...kpi} />
      ))}
    </div>
  )
}
