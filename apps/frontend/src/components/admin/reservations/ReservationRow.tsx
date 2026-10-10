import type { LedgerStatus, Reservation } from '@/data/hotel'
import Icon from '@/components/Icon'
import { paymentTone, statusLabel, statusTone } from '@/components/admin/reservations/statusStyles'

const iconButton = 'p-1 bg-surface-container hover:bg-surface-variant text-on-surface transition-colors'
const textButton =
  'h-6 px-2 font-label-sm text-[11px] uppercase tracking-wide transition-colors'
const primaryText = `${textButton} bg-secondary text-on-secondary hover:bg-on-secondary-container`
const neutralText = `${textButton} bg-surface-container hover:bg-surface-variant text-on-surface`

type Props = {
  reservation: Reservation
  selected: boolean
  onSelect: (id: string) => void
  onStatusChange: (id: string, status: LedgerStatus) => void
}

export default function ReservationRow({ reservation: r, selected, onSelect, onStatusChange }: Props) {
  const select = () => onSelect(r.id)

  return (
    <tr
      className={`${
        selected ? 'bg-secondary/5 hover:bg-secondary/10' : 'hover:bg-surface-container-low'
      } transition-colors cursor-pointer`}
      onClick={select}
    >
      <td className="py-2 px-3 font-mono-data text-mono-data font-semibold text-secondary">
        {r.id}
        <span className="block text-[10px] text-on-surface-variant font-normal">{r.createdAt}</span>
      </td>
      <td className="py-2 px-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-3.5 bg-surface-container text-[9px] font-bold flex items-center justify-center text-primary-container">
            {r.country}
          </span>
          <div>
            <div className="font-semibold text-on-surface">{r.guest}</div>
            <div className="text-[11px] font-mono-data text-on-surface-variant">{r.phone}</div>
          </div>
        </div>
      </td>
      <td className="py-2 px-3">
        <div className="font-medium text-on-surface">{r.room}</div>
        <div className="text-[11px] text-on-surface-variant">{r.roomInfo}</div>
      </td>
      <td className="py-2 px-3 font-mono-data text-mono-data">
        <div className="text-on-surface font-medium">{r.dates}</div>
        <span className="text-[11px] text-on-surface-variant">{r.nights}</span>
      </td>
      <td className="py-2 px-3">
        <span className="inline-flex items-center gap-1 font-mono-data">
          <Icon name={r.paxIcon} className="text-[14px] text-outline" />
          <span>{r.pax}</span>
        </span>
      </td>
      <td className="py-2 px-3">
        <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface font-label-sm text-label-sm tracking-wider uppercase font-semibold">
          {r.board}
        </span>
      </td>
      <td className="py-2 px-3">
        <div className="flex items-center gap-1 text-[11px]">
          <Icon name={r.sourceIcon} className="text-[14px] text-secondary" />
          <span className="font-medium">{r.source}</span>
        </div>
      </td>
      <td className="py-2 px-3 text-right font-mono-data text-mono-data">
        <div className="font-bold text-on-surface">{r.total}</div>
        <span
          className={`inline-block px-1.5 py-0.2 ${paymentTone[r.paymentTone]} font-label-sm text-[10px] font-semibold uppercase`}
        >
          {r.payment}
        </span>
      </td>
      <td className="py-2 px-3">
        <span
          className={`px-2 py-0.5 ${statusTone[r.status]} font-label-sm text-label-sm font-semibold uppercase tracking-wider`}
        >
          {statusLabel[r.status]}
        </span>
      </td>
      <td className="py-2 px-3 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center gap-1">
          {r.status === 'checkedIn' && (
            <>
              <button className={iconButton} title="Review & Folio" type="button" onClick={select}>
                <Icon name="visibility" className="text-[16px]" />
              </button>
              <button className={iconButton} title="Edit" type="button">
                <Icon name="edit" className="text-[16px]" />
              </button>
              <button className={iconButton} title="Print" type="button">
                <Icon name="print" className="text-[16px]" />
              </button>
            </>
          )}
          {r.status === 'confirmed' && (
            <>
              {r.arrivesToday ? (
                <button
                  className={primaryText}
                  type="button"
                  onClick={() => onStatusChange(r.id, 'checkedIn')}
                >
                  Check-In
                </button>
              ) : (
                <button className={neutralText} type="button" onClick={select}>
                  Detay
                </button>
              )}
              <button className={iconButton} title="Edit" type="button">
                <Icon name="edit" className="text-[16px]" />
              </button>
            </>
          )}
          {r.status === 'pending' && (
            <>
              <button
                className={primaryText}
                type="button"
                onClick={() => onStatusChange(r.id, 'confirmed')}
              >
                Onayla
              </button>
              <button
                className="p-1 text-error hover:bg-error-container transition-colors"
                title="Cancel"
                type="button"
                onClick={() => onStatusChange(r.id, 'cancelled')}
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            </>
          )}
          {r.status === 'checkedOut' && (
            <>
              <button className={neutralText} type="button">
                Fatura
              </button>
              <button className={iconButton} title="Archive" type="button">
                <Icon name="folder" className="text-[16px]" />
              </button>
            </>
          )}
          {r.status === 'cancelled' && (
            <button
              className={neutralText}
              type="button"
              onClick={() => onStatusChange(r.id, 'pending')}
            >
              Geri Al
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}
