import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  icon: LucideIcon
  title: string
  iconClassName?: string
  children?: ReactNode
}

// Title strip at the top of a dashboard-style panel (rendered inside a Card with p-3).
export default function PanelHeader({ icon: Icon, title, iconClassName, children }: Props) {
  return (
    <div className="-mx-3 -mt-3 mb-2 flex items-center justify-between bg-surface-container-low p-3 pb-2 text-primary">
      <div className="flex items-center gap-1.5">
        <Icon className={cn('size-[18px] text-secondary', iconClassName)} />
        <span className="font-headline-sm text-headline-sm font-semibold">{title}</span>
      </div>
      {children}
    </div>
  )
}
