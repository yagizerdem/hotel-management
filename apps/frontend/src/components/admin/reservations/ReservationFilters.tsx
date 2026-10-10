import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import Field from '@/components/common/Field'
import { BOARDS, SOURCES, TABS, type Tab } from '@/components/admin/reservations/filters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
  counts: Record<Tab, number>
  tab: Tab
  onTabChange: (tab: Tab) => void
  search: string
  onSearchChange: (value: string) => void
  source: string
  onSourceChange: (value: string) => void
  board: string
  onBoardChange: (value: string) => void
  onReset: () => void
}

const control = 'h-8 w-full bg-surface-container-low text-body-sm font-body-sm'

export default function ReservationFilters({
  counts,
  tab,
  onTabChange,
  search,
  onSearchChange,
  source,
  onSourceChange,
  board,
  onBoardChange,
  onReset,
}: Props) {
  return (
    <div className="bg-surface-container-lowest p-space-md mb-4 shadow-sm space-y-3">
      <Tabs value={tab} onValueChange={(v) => onTabChange(v as Tab)} className="overflow-x-auto pb-1">
        <TabsList className="h-auto gap-1 bg-transparent p-0">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              className={`h-7 flex-none px-3 font-label-sm text-label-sm bg-surface-container text-on-surface data-active:bg-primary data-active:text-on-primary ${
                t.key === 'cancelled' ? 'text-error' : ''
              }`}
            >
              {t.label} ({counts[t.key]})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
        <Field label="Search">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-outline" />
            <Input
              className={`${control} pl-7`}
              placeholder="Res No, Name, Passport..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </Field>
        <Field label="Date Range">
          <Input className={`${control} font-mono-data`} defaultValue="24.05.2025 - 31.05.2025" />
        </Field>
        <Field label="Reservation Source">
          <NativeSelect className="w-full" value={source} onChange={(e) => onSourceChange(e.target.value)}>
            {SOURCES.map((s) => (
              <NativeSelectOption key={s.value} value={s.value}>
                {s.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Board Type">
          <NativeSelect className="w-full" value={board} onChange={(e) => onBoardChange(e.target.value)}>
            {BOARDS.map((b) => (
              <NativeSelectOption key={b.value} value={b.value}>
                {b.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Room Category">
          <NativeSelect className="w-full" defaultValue="">
            <NativeSelectOption value="">All Rooms</NativeSelectOption>
            <NativeSelectOption value="std">Standard Sea View</NativeSelectOption>
            <NativeSelectOption value="deluxe">Deluxe Family Suite</NativeSelectOption>
            <NativeSelectOption value="swim">Swim-Up Garden Room</NativeSelectOption>
            <NativeSelectOption value="pres">Kemer Presidential Villa</NativeSelectOption>
          </NativeSelect>
        </Field>
        <div className="flex items-end gap-1">
          <Button className="h-8 flex-1 font-label-sm text-label-sm font-semibold">
            <SlidersHorizontal />
            Filter
          </Button>
          <Button variant="secondary" size="icon" title="Reset Filters" aria-label="Reset Filters" className="bg-surface-container hover:bg-surface-variant" onClick={onReset}>
            <RotateCcw className="text-on-surface-variant" />
          </Button>
        </div>
      </div>
    </div>
  )
}
