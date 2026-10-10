import { useLocation } from 'react-router-dom'
import { navigation } from '../../data/navigation'
import Icon from '../../components/Icon'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const item = navigation.flatMap((s) => s.items).find((i) => i.to === pathname)

  return (
    <div className="py-space-xl flex flex-col items-center justify-center gap-2 text-outline">
      <Icon name={item?.icon ?? 'construction'} className="text-[40px]" />
      <h1 className="font-headline-lg text-headline-lg text-primary">{item?.label ?? 'Sayfa'}</h1>
      <p className="font-body-md text-body-md">Bu modül henüz tasarlanmadı.</p>
    </div>
  )
}
