import { Flower2, Puzzle, Umbrella, Utensils, Waves } from 'lucide-react'
import { Card } from '@/components/ui/card'

const EXPERIENCES = [
  { icon: Umbrella, title: 'Private Kemer Beach & Pier', text: 'Blue Flag crystal-clear sea, private sunbathing lodges and all-day beverage service.' },
  { icon: Waves, title: 'Outdoor & Indoor Pools', text: 'Lagoon pool, infinity views and a heated indoor thalasso relaxation area.' },
  { icon: Flower2, title: 'Turkish Hammam & Spa', text: 'Traditional scrub-and-foam rituals, Finnish sauna, steam rooms and Far Eastern massages.' },
  { icon: Utensils, title: '3 A La Carte Restaurants', text: 'Mediterranean seafood, Italian trattoria and traditional Turkish grill flavours.' },
  { icon: Puzzle, title: 'Kids Club (Mini Club)', text: "Creative workshops for ages 4-12 with expert supervisors, a kids' pool and mini disco." },
]

export default function ExperiencesSection() {
  return (
    <section className="mt-space-xl w-full bg-surface-container-low py-space-2xl">
      <div className="mx-auto max-w-[1360px] px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="mb-space-xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <span className="font-label-caps text-label-caps font-bold tracking-widest text-secondary uppercase">5-Star Privileges</span>
            <h2 className="mt-1 font-headline-lg text-headline-lg tracking-tight text-primary">Experiences Included in Your Stay</h2>
          </div>
          <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
            Bilge Hotel Resort guests enjoy uninterrupted comfort and a gastronomic feast in Kemer’s unique nature.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-5">
          {EXPERIENCES.map((e) => (
            <Card
              key={e.title}
              className="group justify-between gap-0 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm ring-0 transition-shadow hover:shadow-md"
            >
              <div className="mb-space-md flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-secondary transition-colors group-hover:bg-secondary group-hover:text-on-secondary">
                <e.icon className="size-[26px]" />
              </div>
              <div>
                <h3 className="mb-1 font-title-sm text-title-sm text-primary">{e.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{e.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
