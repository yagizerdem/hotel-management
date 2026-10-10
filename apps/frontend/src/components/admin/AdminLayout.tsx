import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AdminLayout() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar />
      <div className="pl-60 min-h-screen flex flex-col">
        <Header />
        <main className="relative pt-14 flex-1 w-full px-gutter bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
