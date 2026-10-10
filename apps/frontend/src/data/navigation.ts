import { Banknote, BookOpenCheck, CalendarDays, ChartColumn, Clock, Hotel, IdCard, LayoutDashboard, type LucideIcon, Megaphone, Monitor, Settings, SprayCan, TrendingUp, Users, Wallet } from 'lucide-react'

export type NavItem = { label: string; icon: LucideIcon; to: string }
export type NavSection = { title: string; items: NavItem[] }

export const navigation: NavSection[] = [
  {
    title: 'GENERAL',
    items: [
      { label: 'Overview', icon: LayoutDashboard, to: '/admin/overview' },
      { label: 'Front Desk', icon: Monitor, to: '/admin' },
    ],
  },
  {
    title: 'RESERVATIONS',
    items: [
      { label: 'Reservations', icon: BookOpenCheck, to: '/admin/reservations' },
      { label: 'Reservation Calendar', icon: CalendarDays, to: '/admin/calendar' },
      { label: 'Room Management', icon: Hotel, to: '/admin/rooms' },
      { label: 'Guests', icon: Users, to: '/admin/guests' },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Housekeeping & Maintenance', icon: SprayCan, to: '/admin/housekeeping' },
      { label: 'Staff', icon: IdCard, to: '/admin/staff' },
      { label: 'Shift Planning', icon: Clock, to: '/admin/shift-planning' },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      { label: 'Pricing', icon: Banknote, to: '/admin/pricing' },
      { label: 'Revenue', icon: TrendingUp, to: '/admin/revenue' },
      { label: 'Payroll', icon: Wallet, to: '/admin/payroll' },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { label: 'Campaigns', icon: Megaphone, to: '/admin/campaigns' },
      { label: 'Reports', icon: ChartColumn, to: '/admin/reports' },
      { label: 'System Settings', icon: Settings, to: '/admin/settings' },
    ],
  },
]
