import { NavLink, useMatch } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { navigation, type NavItem } from '@/data/navigation'

const LOGO = '/images/img-1.png'

function NavEntry({ item }: { item: NavItem }) {
  const active = useMatch({ path: item.to, end: item.to === '/admin' }) !== null

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        render={<NavLink to={item.to} end={item.to === '/admin'} />}
        className="font-body-sm text-body-sm text-surface-variant hover:bg-primary hover:text-surface-container-lowest data-active:bg-secondary data-active:text-on-secondary data-active:font-medium"
      >
        <item.icon />
        <span className="truncate">{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default function AdminSidebar() {
  return (
    <Sidebar className="select-none">
      <SidebarHeader className="h-14 flex-row items-center gap-space-sm border-b border-outline-variant/20 bg-primary/40 px-space-md">
        <img alt="Bilge Hotel Resort Logo" className="h-8 w-auto object-contain" src={LOGO} />
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-headline-sm text-surface-container-lowest leading-tight truncate tracking-tight">
            BILGE RESORT
          </span>
          <span className="font-label-sm text-label-sm text-on-primary-container tracking-wider uppercase truncate">
            Kemer Antalya
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-space-xs py-space-sm">
        {navigation.map((section) => (
          <SidebarGroup key={section.title} className="p-0 pb-space-md">
            <SidebarGroupLabel className="font-label-sm text-label-sm text-on-primary-container tracking-wider uppercase font-semibold">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <NavEntry key={item.to} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex-row items-center justify-between border-t border-outline-variant/20 bg-primary/40 p-space-sm text-on-primary-container font-mono-data text-mono-data">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span> PMS v4.2.1
        </span>
        <span className="uppercase font-label-sm text-label-sm">ONLINE</span>
      </SidebarFooter>
    </Sidebar>
  )
}
