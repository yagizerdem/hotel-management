import CalendarHeader from '@/components/admin/calendar/CalendarHeader'
import CalendarTimeline from '@/components/admin/calendar/CalendarTimeline'
import CalendarToolbar from '@/components/admin/calendar/CalendarToolbar'
import ReservationFile from '@/components/admin/calendar/ReservationFile'

export default function Calendar() {
  return (
    <div className="flex w-full flex-col">
      <CalendarHeader />
      <CalendarToolbar />
      <div className="mt-1 flex min-h-[calc(100vh-185px)] w-full items-stretch overflow-hidden bg-surface-container shadow-sm">
        <CalendarTimeline />
        <ReservationFile />
      </div>
    </div>
  )
}
