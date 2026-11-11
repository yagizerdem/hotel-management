import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { earlyBookingDiscount, hotel } from "@/src/app/home/data/sd";
import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { SignUpForm } from "@/src/app/auth/sign-up/components/sign-up-form";

export const metadata: Metadata = {
  title: "Create your account | Bilge Hotel, Kemer",
  description:
    "Create a Bilge Hotel account to book online, see your reservations and save on early bookings.",
};

const benefits = [
  `Save up to ${earlyBookingDiscount.threeMonths}% when you book online at least 3 months ahead`,
  "See your reservations and past stays in one place",
  "Hear about seasonal offers and hotel events first",
];

export default function SignUpPage() {
  return (
    <div
      className={`${homeFontClassName} grid min-h-svh flex-1 bg-background text-foreground md:grid-cols-12`}
    >
      <aside className="relative hidden flex-col justify-between overflow-hidden md:col-span-5 md:flex lg:col-span-7">
        <Image
          src="/images/hotels/pool-1.jpg"
          alt="Hotel pool with the Taurus Mountains behind it"
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 42vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45" />

        <Link
          href="/home"
          className="relative p-10 text-white focus-visible:outline-none lg:p-16"
        >
          <span className="block font-[family-name:var(--font-bodoni)] text-4xl leading-tight">
            {hotel.name}
          </span>
          <span className="mt-1 block text-sm tracking-wide text-white/75">
            {hotel.location}
          </span>
        </Link>

        <ul className="relative m-6 divide-y divide-white/10 border border-white/10 bg-black/60 px-8 text-white lg:m-12">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3.5 py-5">
              <CircleCheck
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-[var(--stitch-secondary-fixed-dim)]"
              />
              <span className="text-[15px] leading-6 text-white/90">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex flex-col justify-center border-border px-5 py-10 sm:px-12 md:col-span-7 md:border-l lg:col-span-5 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
