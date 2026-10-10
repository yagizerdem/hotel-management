export type NavItem = { label: string; icon: string; to: string }
export type NavSection = { title: string; items: NavItem[] }

export const navigation: NavSection[] = [
  {
    title: 'GENEL',
    items: [
      { label: 'Genel Bakış', icon: 'dashboard', to: '/admin/genel-bakis' },
      { label: 'Resepsiyon', icon: 'desk', to: '/admin' },
    ],
  },
  {
    title: 'REZERVASYON',
    items: [
      { label: 'Rezervasyonlar', icon: 'book_online', to: '/admin/rezervasyonlar' },
      { label: 'Rezervasyon Takvimi', icon: 'calendar_month', to: '/admin/rezervasyon-takvimi' },
      { label: 'Oda Yönetimi', icon: 'hotel', to: '/admin/oda-yonetimi' },
      { label: 'Misafirler', icon: 'groups', to: '/admin/misafirler' },
    ],
  },
  {
    title: 'OPERASYON',
    items: [
      { label: 'Temizlik ve Bakım', icon: 'cleaning_services', to: '/admin/temizlik-ve-bakim' },
      { label: 'Personel', icon: 'badge', to: '/admin/personel' },
      { label: 'Vardiya Planlama', icon: 'schedule', to: '/admin/vardiya-planlama' },
    ],
  },
  {
    title: 'FİNANS',
    items: [
      { label: 'Fiyatlandırma', icon: 'payments', to: '/admin/fiyatlandirma' },
      { label: 'Gelirler', icon: 'trending_up', to: '/admin/gelirler' },
      { label: 'Maaş Yönetimi', icon: 'account_balance_wallet', to: '/admin/maas-yonetimi' },
    ],
  },
  {
    title: 'YÖNETİM',
    items: [
      { label: 'Kampanyalar', icon: 'campaign', to: '/admin/kampanyalar' },
      { label: 'Raporlar', icon: 'bar_chart', to: '/admin/raporlar' },
      { label: 'Sistem Ayarları', icon: 'settings', to: '/admin/sistem-ayarlari' },
    ],
  },
]
