import { CircleCheck, Star, TriangleAlert, Wine, Wrench, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import PanelHeader from '@/components/common/PanelHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function Alert({
  icon: Icon,
  iconClass,
  title,
  titleClass,
  time,
  children,
}: {
  icon: LucideIcon
  iconClass: string
  title: string
  titleClass: string
  time: string
  children: ReactNode
}) {
  return (
    <div className="p-2.5 bg-surface-container-low flex items-start gap-2.5">
      <Icon className={cn('size-[18px] shrink-0 mt-0.5', iconClass)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={cn('font-label-sm text-label-sm font-bold uppercase', titleClass)}>{title}</span>
          <span className="font-mono-data text-[10px] text-outline">{time}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

const body = 'font-body-sm text-body-sm text-on-surface mt-0.5'

type Props = {
  activeAlerts: number
  maintenance312Open: boolean
  onRoomCleaning: () => void
}

export default function AlertsPanel({ activeAlerts, maintenance312Open, onRoomCleaning }: Props) {
  return (
    <Card className="gap-0 rounded-none p-3 shadow-sm ring-0">
      <PanelHeader icon={TriangleAlert} iconClassName="text-on-tertiary-container" title="Operational Alerts & Front Desk Notes">
        <Badge variant="secondary" className="h-auto bg-surface-container px-2 py-0.5 font-mono-data text-[11px] text-outline">
          {activeAlerts} Active Alerts
        </Badge>
      </PanelHeader>
      <div className="space-y-2">
        <Alert icon={Star} iconClass="text-on-tertiary-container" title="VIP Welcome • Markus Weber" titleClass="text-tertiary" time="15:30 Arrival">
          <p className={body}>
            VIP transfer for Royal Suite 401 has left Antalya Airport. A special fruit basket and Moët champagne
            have been placed in the room.
          </p>
        </Alert>
        <Alert icon={Wine} iconClass="text-secondary" title="Awaiting Minibar Approval" titleClass="text-primary" time="Housekeeping (12:38)">
          <p className={body}>
            Pre-check-out minibar consumption for room 214 (2x Beer, 1x Chocolate) was added to the folio. Front
            desk is awaiting payment confirmation.
          </p>
        </Alert>
        <Alert icon={Wrench} iconClass="text-outline" title="Maintenance Note • Room 312" titleClass="text-on-surface" time="Technical (11:15)">
          <p className={body}>
            A/C filter and gas replacement completed. Tests done. Front desk can close the fault record in the
            system and set the room to "Dirty/To Be Cleaned".
          </p>
          {maintenance312Open ? (
            <div className="mt-2 flex gap-1.5">
              <Button size="xs" className="h-auto px-2 py-0.5 font-label-sm text-label-sm font-semibold" onClick={onRoomCleaning}>
                Confirm & Send to Cleaning
              </Button>
            </div>
          ) : (
            <div className="mt-2 font-label-sm text-label-sm text-secondary flex items-center gap-1">
              <CircleCheck className="size-[14px]" /> Room 312 sent to cleaning
            </div>
          )}
        </Alert>
      </div>
    </Card>
  )
}
