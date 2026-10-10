import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '@/components/admin/AdminLayout'
import { BookingProvider } from '@/context/BookingProvider'
import { HotelProvider } from '@/context/HotelProvider'
import Calendar from '@/pages/admin/Calendar'
import ComingSoon from '@/pages/admin/ComingSoon'
import Dashboard from '@/pages/admin/Dashboard'
import Inventory from '@/pages/admin/Inventory'
import Reservations from '@/pages/admin/Reservations'
import Booking from '@/pages/public/Booking'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BookingProvider>
              <Booking />
            </BookingProvider>
          }
        />
        <Route
          path="/admin"
          element={
            <HotelProvider>
              <AdminLayout />
            </HotelProvider>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="rooms" element={<Inventory />} />
          <Route path="*" element={<ComingSoon />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
