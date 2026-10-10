import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking, type Offer } from '@/context/BookingProvider'
import { cn } from '@/lib/utils'

type Props = { offer: Offer; className?: string }

export default function SelectOfferButton({ offer, className }: Props) {
  const { selected, selectOffer } = useBooking()
  const active = selected.room === offer.room && selected.board === offer.board

  return (
    <Button
      onClick={() => selectOffer(offer)}
      className={cn(
        'h-auto gap-1 rounded-lg px-5 py-2.5 font-label-md text-label-md shadow-sm transition-all',
        active
          ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed'
          : 'bg-primary-container text-on-primary hover:bg-primary',
        className,
      )}
    >
      {active ? (
        <>
          <Check className="size-[18px]" />
          Selected
        </>
      ) : (
        <>
          Select Room
          <ArrowRight className="size-4" />
        </>
      )}
    </Button>
  )
}
