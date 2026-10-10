import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AdminLayout from '@/components/admin/AdminLayout'
import { BookingProvider } from '@/context/BookingProvider'
import { HotelProvider } from '@/context/HotelProvider'
import Calendar from '@/pages/admin/Calendar'
import ComingSoon from '@/pages/admin/ComingSoon'
import Dashboard from '@/pages/admin/Dashboard'
import Inventory from '@/pages/admin/Inventory'
import Reservations from '@/pages/admin/Reservations'
import Booking from '@/pages/public/Booking'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <BookingProvider>
        <Booking />
      </BookingProvider>
    ),
  },
  {
    path: '/admin',
    element: (
      <HotelProvider>
        <AdminLayout />
      </HotelProvider>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'reservations', element: <Reservations /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'rooms', element: <Inventory /> },
      { path: '*', element: <ComingSoon /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
