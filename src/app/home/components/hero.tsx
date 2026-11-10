import Image from "next/image";
import { earlyBookingDiscount } from "@/src/app/home/data/hotel";
import { AvailabilitySearch } from "@/src/app/home/components/availability-search";

export function Hero() {
  return (
    <section id="booking" className="relative scroll-mt-16">
      <div className="relative h-[34rem] w-full overflow-hidden sm:h-[40rem]">
        <Image
          src="/images/hotels/pool-2.jpg"
          alt="Hotel pool with the mountains in the background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-36 sm:px-6 sm:pb-32">
          <h1 className="max-w-3xl font-[family-name:var(--font-bodoni)] text-5xl leading-[1.05] text-white sm:text-7xl">
            Between the Taurus Mountains and the Mediterranean, in Kemer
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Book your room online early and save up to{" "}
            {earlyBookingDiscount.threeMonths}% on your holiday.
          </p>
        </div>
      </div>

      <div className="relative mx-auto -mt-24 max-w-6xl px-4 sm:px-6">
        <AvailabilitySearch />
      </div>
    </section>
  );
}
