import { ArrowLeftRight, CircleX, CreditCard, LogOut, NotebookPen, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'

const secondary =
  'h-8 bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-variant font-label-sm text-label-sm'

export default function FileActions() {
  return (
    <div className="mt-auto space-y-space-xs bg-surface-container-high p-space-md shadow-sm">
      <div className="grid grid-cols-2 gap-space-xs">
        <Button variant="secondary" className={secondary}>
          <Receipt />
          Review Folio
        </Button>
        <Button variant="secondary" className={secondary}>
          <ArrowLeftRight />
          Change Room (Upgrade)
        </Button>
        <Button variant="secondary" className={secondary}>
          <NotebookPen />
          Add Front Office Note
        </Button>
        <Button variant="secondary" className={secondary}>
          <CreditCard />
          Duplicate Room Key
        </Button>
      </div>
      <div className="flex items-center gap-space-xs pt-1">
        <Button className="h-9 flex-1 bg-secondary text-on-secondary shadow-sm hover:bg-secondary/90 font-label-sm text-label-sm font-semibold">
          <LogOut className="size-[18px]" />
          Quick Check-out / Process Departure
        </Button>
        <Button
          variant="secondary"
          title="Cancelled or No-Show"
          aria-label="Cancelled or No-Show"
          className="h-9 bg-surface-container-lowest px-3 text-error shadow-sm hover:bg-error-container hover:text-on-error-container"
        >
          <CircleX className="size-[18px]" />
        </Button>
      </div>
    </div>
  )
}
