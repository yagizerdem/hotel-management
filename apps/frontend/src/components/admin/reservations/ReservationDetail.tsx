import type { LedgerStatus, Reservation } from '@/data/hotel'
import Icon from '@/components/Icon'
import { detailChip, paymentTone, statusTone } from '@/components/admin/reservations/statusStyles'

type Props = {
  reservation: Reservation
  onClose: () => void
  onStatusChange: (id: string, status: LedgerStatus) => void
}

const sectionTitle =
  'font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold'
const secondaryAction =
  'h-8 bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-colors'
const primaryAction =
  'h-8 bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-colors'

export default function ReservationDetail({ reservation: r, onClose, onStatusChange }: Props) {
  const d = r.details

  return (
    <div className="w-full 2xl:w-[460px] bg-surface-container-lowest shadow-sm flex flex-col shrink-0">
      <div className="p-space-md bg-primary text-on-primary flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider font-semibold">
              SELECTED DETAIL CARD
            </span>
            <span
              className={`px-1.5 py-0.2 ${statusTone[r.status]} font-label-sm text-[10px] font-bold uppercase`}
            >
              {detailChip[r.status]}
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-surface-container-lowest mt-0.5">
            {r.id} • {r.guest}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1 hover:bg-primary-container text-surface-variant transition-colors"
            title="Print"
            type="button"
          >
            <Icon name="print" className="text-[18px]" />
          </button>
          <button
            className="p-1 hover:bg-primary-container text-surface-variant transition-colors"
            title="Close"
            type="button"
            onClick={onClose}
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      </div>

      <div className="p-3 bg-surface-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="meeting_room" className="text-secondary text-[24px]" />
          <div>
            <div className="font-label-md text-label-md font-bold text-primary">{r.room}</div>
            <div className="text-[11px] text-on-surface-variant">
              {d?.roomNote ? `${r.roomInfo} • ${d.roomNote}` : r.roomInfo}
            </div>
          </div>
        </div>
        <button
          className="h-6 px-2 bg-surface-container-lowest text-on-surface hover:bg-surface-variant text-[11px] font-label-sm uppercase font-semibold transition-colors"
          type="button"
        >
          Change Room
        </button>
      </div>

      <div className="p-space-md space-y-4">
        <div className="space-y-1">
          <span className={sectionTitle}>GUEST INFORMATION</span>
          <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm bg-surface-container-low p-2.5">
            {d && (
              <div>
                <span className="text-on-surface-variant block text-[11px]">ID / Passport No:</span>
                <span className="font-mono-data text-mono-data font-semibold text-on-surface">
                  {d.idNumber}
                </span>
              </div>
            )}
            <div>
              <span className="text-on-surface-variant block text-[11px]">Phone:</span>
              <span className="font-mono-data text-mono-data text-on-surface">{r.phone}</span>
            </div>
            {d && (
              <>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Email:</span>
                  <span className="truncate block text-on-surface">{d.email}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Nationality / Language:</span>
                  <span className="text-on-surface font-medium">{d.nationality}</span>
                </div>
              </>
            )}
            <div>
              <span className="text-on-surface-variant block text-[11px]">Guests / Board:</span>
              <span className="text-on-surface font-medium">
                {r.pax} • {r.board}
              </span>
            </div>
          </div>
        </div>

        {d ? (
          <div className="grid grid-cols-3 gap-2 text-center bg-surface-container-low p-2">
            <div>
              <span className="block text-[10px] text-on-surface-variant font-label-sm uppercase">CHECK-IN</span>
              <span className="font-mono-data text-mono-data font-bold text-primary">{d.checkIn}</span>
              <span className="block text-[10px] text-on-surface-variant">{d.checkInTime}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Icon name="arrow_forward" className="text-secondary text-[16px]" />
              <span className="font-mono-data text-[11px] font-semibold text-secondary">
                {r.nights.split(' (')[0]}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-on-surface-variant font-label-sm uppercase">CHECK-OUT</span>
              <span className="font-mono-data text-mono-data font-bold text-primary">{d.checkOut}</span>
              <span className="block text-[10px] text-on-surface-variant">{d.checkOutTime}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-surface-container-low p-2 font-mono-data text-mono-data">
            <span className="font-medium text-primary">{r.dates}</span>
            <span className="text-[11px] font-semibold text-secondary">{r.nights}</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={sectionTitle}>ACCOUNT STATEMENT & FOLIO</span>
            {d && (
              <span className="font-mono-data text-mono-data text-[11px] text-secondary font-medium">
                Folyo No: {d.folioNo}
              </span>
            )}
          </div>
          <div className="bg-surface-container-low p-3 space-y-2 font-mono-data text-mono-data text-body-sm">
            {d?.folio.map((line) => (
              <div
                key={line.label}
                className={`flex items-center justify-between ${
                  line.tone === 'discount' ? 'text-[#38866C]' : 'text-on-surface'
                }`}
              >
                <span>{line.label}</span>
                <span className={line.tone === 'muted' ? 'text-on-surface-variant' : 'font-semibold'}>
                  {line.value}
                </span>
              </div>
            ))}
            {d && <div className="h-px bg-outline-variant/40 my-1"></div>}
            <div className="flex items-center justify-between text-base font-bold text-primary pt-1">
              <span className="font-headline-sm text-headline-sm">Grand Total:</span>
              <span className="text-headline-sm text-secondary">{r.total}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold pt-0.5">
              <span className="text-on-surface-variant">Payment Status:</span>
              <span className={`px-1.5 ${paymentTone[r.paymentTone]} uppercase`}>{r.payment}</span>
            </div>
            {d && (
              <>
                <div className="flex items-center justify-between text-[11px] text-[#38866C] font-semibold">
                  <span>Collected (Credit Card / Virtual POS):</span>
                  <span>{d.paid}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Remaining Balance:</span>
                  <span className="font-bold text-[#38866C]">{d.balance}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {d && (
          <div className="space-y-1">
            <span className={sectionTitle}>RESERVATION & FRONT DESK NOTES</span>
            <div className="bg-surface-container-low p-2.5 space-y-1.5 text-body-sm font-body-sm text-on-surface">
              <div className="flex items-start gap-1.5">
                <Icon name="child_care" className="text-[16px] text-secondary mt-0.5" />
                <p>
                  <strong className="font-semibold text-primary">Guest Note:</strong> "{d.guestNote}"
                </p>
              </div>
              <div className="flex items-start gap-1.5 text-on-surface-variant text-[11px] pt-1">
                <Icon name="check_circle" className="text-[14px] text-outline mt-0.5" />
                <span>{d.housekeepingNote}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button className={secondaryAction} type="button">
            <Icon name="receipt_long" className="text-[16px]" />
            <span>Review Folio</span>
          </button>
          <button className={secondaryAction} type="button">
            <Icon name="key" className="text-[16px]" />
            <span>Encode Room Key</span>
          </button>
          {r.status === 'confirmed' && (
            <button
              className={`${primaryAction} col-span-2`}
              type="button"
              onClick={() => onStatusChange(r.id, 'checkedIn')}
            >
              <Icon name="login" className="text-[16px]" />
              <span>Check In</span>
            </button>
          )}
          {r.status === 'pending' && (
            <button
              className={`${primaryAction} col-span-2`}
              type="button"
              onClick={() => onStatusChange(r.id, 'confirmed')}
            >
              <Icon name="check_box" className="text-[16px]" />
              <span>Confirm Reservation</span>
            </button>
          )}
          {r.status === 'checkedIn' && (
            <button
              className={`${primaryAction} col-span-2`}
              type="button"
              onClick={() => onStatusChange(r.id, 'checkedOut')}
            >
              <Icon name="logout" className="text-[16px]" />
              <span>Check Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
