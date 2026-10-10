import { Key, LogIn, LogOut, Receipt, SquareCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LedgerStatus, Reservation } from '@/data/hotel'

const secondaryAction =
  'h-8 bg-surface-container text-on-surface hover:bg-surface-variant font-label-sm text-label-sm font-semibold'
const primaryAction =
  'col-span-2 h-8 bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-sm text-label-sm font-semibold'

type Props = {
  reservation: Reservation
  onStatusChange: (id: string, status: LedgerStatus) => void
}

export default function DetailActions({ reservation: r, onStatusChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 pt-1">
      <Button variant="secondary" className={secondaryAction}>
        <Receipt />
        Review Folio
      </Button>
      <Button variant="secondary" className={secondaryAction}>
        <Key />
        Encode Room Key
      </Button>
      {r.status === 'confirmed' && (
        <Button className={primaryAction} onClick={() => onStatusChange(r.id, 'checkedIn')}>
          <LogIn />
          Check In
        </Button>
      )}
      {r.status === 'pending' && (
        <Button className={primaryAction} onClick={() => onStatusChange(r.id, 'confirmed')}>
          <SquareCheck />
          Confirm Reservation
        </Button>
      )}
      {r.status === 'checkedIn' && (
        <Button className={primaryAction} onClick={() => onStatusChange(r.id, 'checkedOut')}>
          <LogOut />
          Check Out
        </Button>
      )}
    </div>
  )
}
