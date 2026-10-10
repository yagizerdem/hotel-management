import type { Arrival } from '../../../data/hotel'
import Icon from '../../Icon'

const rowTone: Record<Arrival['status'], string> = {
  pending: 'bg-surface-container-lowest',
  vip: 'bg-surface-container-low/50',
  checkedIn: 'bg-surface-container-low/30',
}

const statusBadge: Record<Arrival['status'], { label: string; className: string }> = {
  pending: { label: 'BEKLİYOR', className: 'bg-surface-container-high text-on-surface' },
  vip: { label: 'VIP BEKLENİYOR', className: 'bg-tertiary-fixed-dim text-on-tertiary' },
  checkedIn: { label: 'GİRİŞ YAPILDI', className: 'bg-secondary text-on-secondary' },
}

const boardTone: Record<Arrival['boardTone'], string> = {
  highlight: 'bg-secondary-fixed text-on-secondary-fixed',
  neutral: 'bg-surface-container-high text-on-surface',
}

function actionClass(arrival: Arrival) {
  if (arrival.status === 'vip') return 'bg-tertiary text-on-tertiary hover:opacity-90'
  if (arrival.unpaid) return 'bg-primary text-on-primary hover:bg-primary-container'
  return 'bg-secondary text-on-secondary shadow-sm hover:opacity-90'
}

type Props = { arrival: Arrival; onCheckIn: (id: string) => void }

export default function ArrivalRow({ arrival, onCheckIn }: Props) {
  const done = arrival.status === 'checkedIn'
  const badge = statusBadge[arrival.status]

  return (
    <tr className={`${rowTone[arrival.status]} hover:bg-surface-container-low transition-colors`}>
      <td
        className={`py-2 px-2.5 font-semibold ${arrival.vip ? 'text-tertiary' : 'text-primary'}`}
      >
        {arrival.id}
      </td>
      <td className="py-2 px-2.5">
        <div
          className={`font-body-sm font-semibold leading-tight ${
            arrival.vip ? 'text-tertiary flex items-center gap-1' : 'text-on-surface'
          }`}
        >
          {arrival.guest}
          {arrival.vip && (
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[9px] px-1 font-bold">
              VIP
            </span>
          )}
        </div>
        <div className="font-mono-data text-[10px] text-outline">{arrival.detail}</div>
      </td>
      <td className="py-2 px-2.5">
        <span className="bg-surface-container font-semibold text-primary px-1.5 py-0.5">
          {arrival.room}
        </span>
        <span
          className={`font-body-sm ml-1 ${
            arrival.vip ? 'text-on-surface font-medium' : 'text-on-surface-variant'
          }`}
        >
          {arrival.roomType}
        </span>
      </td>
      <td className="py-2 px-2.5 text-outline">{arrival.stay}</td>
      <td className="py-2 px-2.5">
        <span
          className={`${boardTone[arrival.boardTone]} px-1.5 py-0.5 text-[10px] font-semibold`}
        >
          {arrival.board}
        </span>
      </td>
      <td className="py-2 px-2.5">
        <span className={`${badge.className} px-1.5 py-0.5 text-[10px] font-semibold`}>
          {badge.label}
        </span>
      </td>
      <td
        className={`py-2 px-2.5 text-right font-semibold ${
          arrival.unpaid ? 'text-error' : 'text-secondary'
        }`}
      >
        {arrival.amount}{' '}
        {arrival.paymentLabel &&
          (arrival.unpaid ? (
            <span className="text-[10px] font-bold block text-error">{arrival.paymentLabel}</span>
          ) : (
            <span className="text-[10px] font-normal text-outline">{arrival.paymentLabel}</span>
          ))}
      </td>
      <td className="py-2 px-2.5 text-center">
        {done ? (
          <span className="text-secondary font-label-sm text-label-sm flex items-center justify-center gap-0.5">
            <Icon name="check_circle" className="text-[14px]" /> Odaya Geçti
          </span>
        ) : (
          <button
            className={`${actionClass(arrival)} px-2 py-1 font-label-sm text-label-sm font-semibold`}
            type="button"
            onClick={() => onCheckIn(arrival.id)}
          >
            {arrival.action}
          </button>
        )}
      </td>
    </tr>
  )
}
