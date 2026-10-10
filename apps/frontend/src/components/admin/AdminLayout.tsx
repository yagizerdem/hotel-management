import type { CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/admin/Header'
import AdminSidebar from '@/components/admin/Sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function AdminLayout() {
  return (
    <SidebarProvider
      className="bg-surface font-body-md text-on-surface antialiased"
      style={{ '--sidebar-width': '15rem' } as CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset className="min-w-0 bg-surface">
        <Header />
        <main className="relative flex-1 w-full px-gutter bg-surface">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
