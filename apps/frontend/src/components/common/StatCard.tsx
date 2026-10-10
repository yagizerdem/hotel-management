import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: number | string
  note: string
  tone: string
  border: string
}

export default function StatCard({ label, value, note, tone, border }: Props) {
  return (
    <Card
      size="sm"
      className={cn('justify-between gap-0 rounded-none border-l-2 p-3 shadow-sm ring-0', border)}
    >
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-baseline justify-between mt-1">
        <span className={cn('font-headline-lg text-headline-lg font-bold', tone)}>{value}</span>
        <span className={cn('font-mono-data text-mono-data', tone)}>{note}</span>
      </div>
    </Card>
  )
}
