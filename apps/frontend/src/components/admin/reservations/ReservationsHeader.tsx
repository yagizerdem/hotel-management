import { CirclePlus, Download, Printer } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'

export default function ReservationsHeader() {
  return (
    <PageHeader
      eyebrow="PMS FRONT OFFICE CONSOLE"
      meta="SEZON 2025 • KEMER / ANTALYA"
      title="Reservation Management"
    >
      <Button variant="secondary" className="h-8 bg-surface-container-high px-3 text-on-surface hover:bg-surface-variant font-label-sm text-label-sm">
        <Download className="text-on-surface-variant" />
        Export Excel / CSV
      </Button>
      <Button variant="secondary" className="h-8 bg-surface-container-high px-3 text-on-surface hover:bg-surface-variant font-label-sm text-label-sm">
        <Printer className="text-on-surface-variant" />
        Daily Arrivals List
      </Button>
      <Button className="h-8 px-4 bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-sm text-label-sm font-semibold shadow-sm">
        <CirclePlus />
        Create New Reservation
      </Button>
    </PageHeader>
  )
}
