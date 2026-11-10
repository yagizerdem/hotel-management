import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { hotel } from "@/src/app/home/data/hotel";
import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { SignInForm } from "@/src/app/auth/sign-in/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in | Bilge Hotel, Kemer",
  description:
    "Sign in to your Bilge Hotel account to book a room and manage your reservations.",
};

const highlights = [
  "See your upcoming stays and their check-in times",
  "Book online and get your early booking discount",
  `Check in from ${hotel.checkIn}, check out by ${hotel.checkOut}`,
];

export default function SignInPage() {
  return (
    <div
      className={`${homeFontClassName} grid min-h-svh flex-1 bg-background text-foreground md:grid-cols-12`}
    >
      <aside className="relative hidden flex-col justify-between overflow-hidden md:col-span-5 md:flex lg:col-span-7">
        <Image
          src="/images/hotels/lobby-2.jpg"
          alt="Hotel lobby with sofas and a candlelit table"
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
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3.5 py-5">
              <CircleCheck
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-[var(--stitch-secondary-fixed-dim)]"
              />
              <span className="text-[15px] leading-6 text-white/90">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex flex-col justify-center border-border px-5 py-10 sm:px-12 md:col-span-7 md:border-l lg:col-span-5 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          <SignInForm />
        </div>
      </main>
    </div>
  );
}
