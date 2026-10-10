import { ChevronRight, LayoutGrid, RefreshCcwDot, Rows3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const FLOORS = ['All Floors (4)', 'Floor 4', 'Floor 3', 'Floor 2', 'Floor 1']

const segment =
  'h-auto flex-none px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface data-active:bg-surface-container-lowest data-active:font-semibold data-active:text-on-surface data-active:shadow-sm'

export default function InventoryHeader() {
  return (
    <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm tracking-wider text-on-surface-variant uppercase">
          <span>Inventory & Operations</span>
          <ChevronRight className="size-[14px]" />
          <span className="font-semibold text-secondary">Room Management</span>
          <ChevronRight className="size-[14px]" />
          <span>4 Floors / 77 Room Matrix</span>
        </div>
        <div className="mt-0.5 flex items-center gap-space-sm">
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary">Room Inventory Control</h1>
          <Badge className="h-auto bg-secondary-container px-2 py-0.5 font-mono-data text-[11px] font-bold text-on-secondary-container">
            LIVE OPERATIONS
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-space-sm">
        <Tabs defaultValue={FLOORS[0]}>
          <TabsList className="h-auto gap-1 bg-surface-container-low p-1">
            {FLOORS.map((f) => (
              <TabsTrigger key={f} value={f} className={segment}>
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <Tabs defaultValue="matrix">
          <TabsList className="h-auto gap-1 bg-surface-container-low p-1">
            <TabsTrigger
              value="matrix"
              className="h-auto flex-none gap-1.5 px-3 py-1 font-label-sm text-label-sm text-on-surface-variant data-active:bg-secondary data-active:text-on-secondary data-active:shadow-sm"
            >
              <LayoutGrid />
              Room Matrix
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="h-auto flex-none gap-1.5 px-3 py-1 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container data-active:bg-secondary data-active:text-on-secondary data-active:shadow-sm"
            >
              <Rows3 />
              Table List
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button className="h-auto bg-primary-container px-3 py-1.5 font-label-sm text-label-sm font-medium text-surface-container-lowest shadow-sm hover:bg-primary">
          <RefreshCcwDot />
          Bulk Status Change
        </Button>
      </div>
    </div>
  )
}
