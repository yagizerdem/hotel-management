import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const LINES = [
  ['Accommodation (5 Nights):', '42.500,00 ₺'],
  ['VAT (10% Included):', '3.863,64 ₺'],
  ['Accommodation Tax (2%):', '850,00 ₺'],
  ['Extra Charges (Mini Bar / Spa):', '0,00 ₺'],
]

export default function FileFolio() {
  return (
    <div className="space-y-2 bg-surface-container-low p-space-md">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm font-bold tracking-wider text-primary uppercase">
          FOLIO & PAYMENT STATUS
        </span>
        <Badge variant="secondary" className="h-auto bg-secondary/15 px-1.5 py-0.5 font-mono-data text-[11px] font-bold text-secondary uppercase">
          BALANCE CLOSED
        </Badge>
      </div>
      <div className="space-y-1.5 font-mono-data text-body-sm">
        {LINES.map(([label, value]) => (
          <div key={label} className="flex justify-between text-outline">
            <span>{label}</span>
            <span className="text-on-surface">{value}</span>
          </div>
        ))}
        <Separator className="my-1 bg-outline-variant/40" />
        <div className="flex justify-between text-body-lg font-bold text-primary">
          <span>TOTAL AMOUNT:</span>
          <span>42.500,00 ₺</span>
        </div>
        <div className="flex justify-between font-semibold text-secondary">
          <span>Collected (Credit Card / 3D Secure):</span>
          <span>42.500,00 ₺</span>
        </div>
        <div className="flex justify-between font-semibold text-outline">
          <span>Remaining to Collect:</span>
          <span className="font-bold text-secondary">0,00 ₺</span>
        </div>
      </div>
    </div>
  )
}
