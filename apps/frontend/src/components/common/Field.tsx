import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

type Props = { label: string; children: ReactNode }

export default function Field({ label, children }: Props) {
  return (
    <div className="space-y-1">
      <Label className="font-label-sm text-label-sm text-on-surface-variant uppercase">{label}</Label>
      {children}
    </div>
  )
}
