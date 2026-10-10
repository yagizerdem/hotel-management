import RoomCard from '@/components/admin/inventory/RoomCard'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { InventoryFloor } from '@/data/inventory'

export default function FloorSection({ floor }: { floor: InventoryFloor }) {
  return (
    <Card className="gap-0 rounded-none bg-surface-container-lowest p-space-md shadow-sm ring-0">
      <div className="mb-space-sm flex flex-col justify-between bg-surface-container-low p-space-sm pb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-space-sm">
          <Badge className="h-auto rounded-none bg-primary px-2 py-0.5 font-mono-data text-label-sm font-bold text-on-primary">
            {floor.label}
          </Badge>
          <div>
            <h2 className="font-headline-sm text-headline-sm leading-tight text-primary">{floor.title}</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{floor.description}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-space-md font-mono-data text-mono-data sm:mt-0">
          {floor.stats.map((s, i) => (
            <span key={i} className={s.cls}>
              {s.text}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {floor.cards.map((card, i) => (
          <RoomCard key={i} data={card} />
        ))}
      </div>
    </Card>
  )
}
