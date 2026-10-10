import { Construction } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { navigation } from '@/data/navigation'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const item = navigation.flatMap((s) => s.items).find((i) => i.to === pathname)
  const Icon = item?.icon ?? Construction

  return (
    <Empty className="py-space-xl text-outline">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-14 bg-transparent">
          <Icon className="size-10" />
        </EmptyMedia>
        <EmptyTitle className="font-headline-lg text-headline-lg text-primary">{item?.label ?? 'Page'}</EmptyTitle>
        <EmptyDescription className="font-body-md text-body-md">This module has not been designed yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
