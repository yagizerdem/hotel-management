import { NavLink } from 'react-router-dom'
import { navigation } from '../../data/navigation'
import Icon from '../Icon'

const LOGO =
  '/images/img-1.png'

const linkBase =
  'flex items-center gap-space-sm px-space-sm py-1.5 rounded transition-colors font-body-sm text-body-sm'

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-primary-container z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="h-14 px-space-md flex items-center gap-space-sm bg-primary/40 border-b border-outline-variant/20">
          <img alt="Bilge Hotel Resort Logo" className="h-8 w-auto object-contain" src={LOGO} />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-surface-container-lowest leading-tight truncate tracking-tight">
              BILGE RESORT
            </span>
            <span className="font-label-sm text-label-sm text-on-primary-container tracking-wider uppercase truncate">
              Kemer Antalya
            </span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-space-xs py-space-sm space-y-space-md">
          {navigation.map((section) => (
            <div key={section.title} className="space-y-0.5">
              <div className="px-space-sm py-1 font-label-sm text-label-sm text-on-primary-container tracking-wider uppercase font-semibold">
                {section.title}
              </div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin'}
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? 'bg-secondary text-on-secondary font-medium shadow-sm'
                        : 'text-surface-variant hover:bg-primary hover:text-surface-container-lowest'
                    }`
                  }
                >
                  <Icon name={item.icon} className="text-[18px]" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-space-sm bg-primary/40 border-t border-outline-variant/20 flex items-center justify-between text-on-primary-container font-mono-data text-mono-data">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span> PMS v4.2.1
        </span>
        <span className="uppercase font-label-sm text-label-sm">ONLINE</span>
      </div>
    </aside>
  )
}
