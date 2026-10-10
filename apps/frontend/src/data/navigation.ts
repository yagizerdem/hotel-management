export type NavItem = { label: string; icon: string; to: string }
export type NavSection = { title: string; items: NavItem[] }

export const navigation: NavSection[] = [
  {
    title: 'GENERAL',
    items: [
      { label: 'Overview', icon: 'dashboard', to: '/admin/overview' },
      { label: 'Front Desk', icon: 'desk', to: '/admin' },
    ],
  },
  {
    title: 'RESERVATIONS',
    items: [
      { label: 'Reservations', icon: 'book_online', to: '/admin/reservations' },
      { label: 'Reservation Calendar', icon: 'calendar_month', to: '/admin/calendar' },
      { label: 'Room Management', icon: 'hotel', to: '/admin/rooms' },
      { label: 'Guests', icon: 'groups', to: '/admin/guests' },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Housekeeping & Maintenance', icon: 'cleaning_services', to: '/admin/housekeeping' },
      { label: 'Staff', icon: 'badge', to: '/admin/staff' },
      { label: 'Shift Planning', icon: 'schedule', to: '/admin/shift-planning' },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      { label: 'Pricing', icon: 'payments', to: '/admin/pricing' },
      { label: 'Revenue', icon: 'trending_up', to: '/admin/revenue' },
      { label: 'Payroll', icon: 'account_balance_wallet', to: '/admin/payroll' },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { label: 'Campaigns', icon: 'campaign', to: '/admin/campaigns' },
      { label: 'Reports', icon: 'bar_chart', to: '/admin/reports' },
      { label: 'System Settings', icon: 'settings', to: '/admin/settings' },
    ],
  },
]
