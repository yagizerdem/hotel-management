import { Calculator } from 'lucide-react'
import { useState } from 'react'
import Field from '@/components/common/Field'
import PanelHeader from '@/components/common/PanelHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

const ROOM_RATES: Record<string, number> = {
  'Double with Balcony (4 Available)': 4950,
  'Standard Single (3 Available)': 3400,
  'Twin Beds (2 Available)': 4300,
  'Royal Suite (0 Available)': 12000,
}

const BOARD_FACTORS: Record<string, number> = {
  'All Inclusive (AI)': 1,
  'Full Board (FB)': 0.9,
  'Half Board (HB)': 0.8,
  'Bed & Breakfast (BB)': 0.65,
}

const control = 'h-7 bg-surface-container-low text-on-surface'

export default function RateFinderPanel() {
  const [nights, setNights] = useState(3)
  const [roomType, setRoomType] = useState('Double with Balcony (4 Available)')
  const [board, setBoard] = useState('All Inclusive (AI)')

  const estimate =
    (nights * ROOM_RATES[roomType] * BOARD_FACTORS[board]).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' TRY'

  return (
    <Card className="gap-0 rounded-none p-3 shadow-sm ring-0">
      <PanelHeader icon={Calculator} title="Quick Rate & Available Room Finder">
        <span className="font-mono-data text-[10px] text-secondary font-semibold">LIVE RATES</span>
      </PanelHeader>
      <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Check-in Date">
            <Input className={`${control} font-mono-data text-mono-data`} type="date" defaultValue="2025-05-24" />
          </Field>
          <Field label="Number of Nights">
            <Input
              className={`${control} font-mono-data text-mono-data`}
              type="number"
              min={1}
              max={30}
              value={nights}
              onChange={(e) => setNights(Math.min(30, Math.max(1, Number(e.target.value) || 1)))}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Room Type">
            <NativeSelect size="sm" className="w-full" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              {Object.keys(ROOM_RATES).map((name) => (
                <NativeSelectOption key={name}>{name}</NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Board Type">
            <NativeSelect size="sm" className="w-full" value={board} onChange={(e) => setBoard(e.target.value)}>
              {Object.keys(BOARD_FACTORS).map((name) => (
                <NativeSelectOption key={name}>{name}</NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
        </div>
        <div className="p-2 bg-surface-container-high flex items-center justify-between mt-2">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase block">Tahmini Tutar ({nights} Gece)</span>
            <span className="font-headline-sm text-headline-sm font-bold text-secondary font-mono-data">{estimate}</span>
          </div>
          <Button size="sm" className="bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold">
            Convert to Reservation
          </Button>
        </div>
      </form>
    </Card>
  )
}
