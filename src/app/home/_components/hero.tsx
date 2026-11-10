import Image from "next/image";
import { earlyBookingDiscount } from "../_data/hotel";
import { AvailabilitySearch } from "./availability-search";

export function Hero() {
  return (
    <section id="rezervasyon" className="relative scroll-mt-16">
      <div className="relative h-[34rem] w-full overflow-hidden sm:h-[40rem]">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2400&q=80"
          alt="Dağların eteğinde, palmiyelerle çevrili otel havuzu"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine/85 via-pine/30 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-36 sm:px-6 sm:pb-32">
          <h1 className="max-w-3xl font-[family-name:var(--font-bodoni)] text-5xl leading-[1.05] text-white sm:text-7xl">
            Toroslar ile Akdeniz arasında, Kemer&apos;de
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Odanızı internetten erken ayırın, %
            {earlyBookingDiscount.threeMonths}&apos;e varan indirimle tatil
            yapın.
          </p>
        </div>
      </div>

      <div className="relative mx-auto -mt-24 max-w-6xl px-4 sm:px-6">
        <AvailabilitySearch />
      </div>
    </section>
  );
}
