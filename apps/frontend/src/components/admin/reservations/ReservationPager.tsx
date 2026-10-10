import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

type Props = { shown: number; total: number }

export default function ReservationPager({ shown, total }: Props) {
  return (
    <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface font-label-sm text-label-sm">
      <div className="flex items-center gap-2">
        <span>Records per page:</span>
        <NativeSelect size="sm" defaultValue="50" className="font-mono-data text-mono-data">
          <NativeSelectOption>25</NativeSelectOption>
          <NativeSelectOption>50</NativeSelectOption>
          <NativeSelectOption>100</NativeSelectOption>
        </NativeSelect>
        <span className="text-on-surface-variant">
          Showing {shown ? `1 - ${shown}` : '0'} of {total} reservations listeleniyor
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon-sm" disabled aria-label="Previous page">
          <ChevronLeft />
        </Button>
        <Button size="sm" className="bg-secondary text-on-secondary font-mono-data text-mono-data">
          1
        </Button>
        <Button variant="outline" size="sm" className="font-mono-data text-mono-data">
          2
        </Button>
        <Button variant="outline" size="sm" className="font-mono-data text-mono-data">
          3
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
