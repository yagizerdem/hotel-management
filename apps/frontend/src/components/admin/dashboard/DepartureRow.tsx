import type { Departure } from '@/data/hotel'
import Icon from '@/components/Icon'

const badgeTone: Record<Departure['status'], string> = {
  waiting: 'bg-tertiary-fixed text-on-tertiary-fixed',
  late: 'bg-surface-container-highest text-primary',
  left: 'bg-secondary text-on-secondary',
}

const actionTone: Record<Departure['status'], string> = {
  waiting: 'bg-on-tertiary-container text-surface-container-lowest',
  late: 'bg-secondary text-on-secondary',
  left: '',
}

type Props = { departure: Departure; onCheckOut: (id: string) => void }

export default function DepartureRow({ departure, onCheckOut }: Props) {
  const left = departure.status === 'left'

  return (
    <tr
      className={`${
        left ? 'bg-surface-container-low/40' : 'bg-surface-container-lowest'
      } hover:bg-surface-container-low transition-colors`}
    >
      <td className="py-2 px-2.5 font-semibold text-primary">{departure.id}</td>
      <td className="py-2 px-2.5">
        <div
          className={`font-body-sm ${
            left ? 'font-medium text-outline' : 'font-semibold text-on-surface'
          }`}
        >
          {departure.guest}
        </div>
        <div className="font-mono-data text-[10px] text-outline">{departure.detail}</div>
      </td>
      <td className="py-2 px-2.5 font-bold text-primary">
        {departure.room}
        {departure.roomType && (
          <span className="font-normal text-[11px] text-outline ml-1">{departure.roomType}</span>
        )}
      </td>
      <td
        className={`py-2 px-2.5 text-right font-semibold ${
          departure.positive || left ? 'text-secondary' : 'text-error'
        }`}
      >
        {departure.amount}{' '}
        {departure.folio && (
          <span
            className={`block text-[10px] font-normal ${
              departure.positive ? 'text-secondary' : 'text-outline'
            }`}
          >
            {departure.folio}
          </span>
        )}
      </td>
      <td className="py-2 px-2.5">
        <span
          className={`${badgeTone[departure.status]} px-1.5 py-0.5 text-[10px] font-semibold`}
        >
          {departure.badge}
        </span>
      </td>
      <td className="py-2 px-2.5 text-center">
        {left ? (
          <span className="text-outline font-label-sm text-label-sm flex items-center justify-center gap-1">
            <Icon name="receipt_long" className="text-[14px]" /> Printed
          </span>
        ) : (
          <button
            className={`${actionTone[departure.status]} px-2 py-1 font-label-sm text-label-sm font-semibold shadow-sm hover:opacity-90`}
            type="button"
            onClick={() => onCheckOut(departure.id)}
          >
            {departure.action}
          </button>
        )}
      </td>
    </tr>
  )
}
