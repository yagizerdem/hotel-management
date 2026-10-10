import FloorSection from '@/components/admin/inventory/FloorSection'
import InventoryHeader from '@/components/admin/inventory/InventoryHeader'
import InventoryKpis from '@/components/admin/inventory/InventoryKpis'
import InventoryLegend from '@/components/admin/inventory/InventoryLegend'
import RoomReview from '@/components/admin/inventory/RoomReview'
import { Card } from '@/components/ui/card'
import { inventoryFloors } from '@/data/inventory'

export default function Inventory() {
  return (
    <div className="flex w-full flex-col pb-12">
      <Card className="w-full gap-space-md rounded-none bg-surface-container-lowest p-space-lg shadow-sm ring-0">
        <InventoryHeader />
        <InventoryKpis />
      </Card>
      <InventoryLegend />
      <div className="mt-3 flex w-full flex-col items-start gap-space-md xl:flex-row">
        <div className="w-full flex-1 space-y-4">
          {inventoryFloors.map((floor) => (
            <FloorSection key={floor.label} floor={floor} />
          ))}
        </div>
        <RoomReview />
      </div>
    </div>
  )
}
