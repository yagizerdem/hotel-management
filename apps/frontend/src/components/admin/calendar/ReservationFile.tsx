import { Contact, Mail, Phone, X } from 'lucide-react'
import FileActions from '@/components/admin/calendar/file/FileActions'
import FileFolio from '@/components/admin/calendar/file/FileFolio'
import FileStay from '@/components/admin/calendar/file/FileStay'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ReservationFile() {
  return (
    <aside className="z-40 flex w-[440px] min-w-[440px] max-w-[440px] flex-col justify-between overflow-y-auto bg-surface-container-lowest shadow-lg">
      <div className="flex flex-col">
        <div className="flex items-center justify-between bg-primary p-space-md text-on-primary">
          <div className="flex items-center gap-2">
            <Contact className="size-[22px] text-secondary-fixed" />
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] tracking-wider text-primary-fixed uppercase">RESERVATION FILE</span>
              <span className="font-mono-data text-body-lg font-bold tracking-tight text-surface-container-lowest">#RZ-8492</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="h-auto bg-secondary px-2 py-0.5 font-mono-data text-[11px] font-bold text-on-secondary uppercase">
              CHECKED IN
            </Badge>
            <Button
              variant="ghost"
              size="icon-sm"
              title="Close"
              aria-label="Close"
              className="text-on-primary-container hover:bg-primary-container hover:text-on-primary-container"
            >
              <X className="size-[18px]" />
            </Button>
          </div>
        </div>
        <div className="flex items-start gap-space-md bg-surface-container-low p-space-md">
          <Avatar size="lg" className="size-12 rounded-none after:rounded-none">
            <AvatarFallback className="rounded-none bg-secondary font-headline-sm text-headline-sm font-bold text-on-secondary shadow-sm">
              AY
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between">
              <h2 className="truncate font-headline-sm text-headline-sm font-bold text-primary">Ahmet Yılmaz</h2>
              <Badge className="h-auto bg-tertiary-fixed px-1.5 py-0 font-mono-data text-[10px] font-semibold text-on-tertiary-fixed">
                VIP SILVER
              </Badge>
            </div>
            <span className="truncate font-mono-data text-body-sm text-outline">ID No: 382*****910 • Turkish Citizen</span>
            <div className="flex items-center gap-space-md pt-1 text-[11px] text-mono-data text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Phone className="size-[14px]" /> +90 532 441 ** **
              </span>
              <span className="flex items-center gap-1">
                <Mail className="size-[14px]" /> a.yilmaz@*****.com
              </span>
            </div>
          </div>
        </div>
        <FileStay />
        <FileFolio />
        <div className="space-y-1.5 bg-surface-container-lowest p-space-md">
          <span className="font-label-sm text-[11px] font-bold tracking-wider text-outline uppercase">
            FRONT DESK NOTES & REQUESTS
          </span>
          <div className="bg-surface-container-low p-2 font-body-sm text-body-sm text-on-surface">
            <p className="leading-relaxed">
              “Guest requested a high-floor, quiet room. Orthopedic and goose-down chosen from the pillow menu. Front
              office will be informed of the late check-out option until 12:00 on the departure day.”
            </p>
          </div>
        </div>
      </div>
      <FileActions />
    </aside>
  )
}
