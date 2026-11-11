import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { hotel } from "@/src/app/home/data/sd";
import { homeFontClassName } from "@/src/app/home/lib/fonts";

export const metadata: Metadata = {
  title: "Page not found | Bilge Hotel, Kemer",
};

export default function NotFound() {
  return (
    <div
      className={`${homeFontClassName} grid flex-1 bg-background text-foreground lg:min-h-svh lg:grid-cols-12`}
    >
      <div className="relative h-56 sm:h-72 lg:order-2 lg:col-span-5 lg:h-auto">
        <Image
          src="/images/hotels/lobby-1.jpg"
          alt="The Bilge Hotel lobby"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
      </div>

      <main className="flex flex-col px-5 py-10 sm:px-12 lg:col-span-7 lg:px-16 lg:py-14">
        <Link
          href="/home"
          className="w-fit font-[family-name:var(--font-bodoni)] text-2xl leading-none font-semibold focus-visible:underline focus-visible:outline-none"
        >
          {hotel.name}
        </Link>

        <div className="my-auto max-w-xl py-12 lg:py-16">
          <p
            aria-hidden
            className="font-[family-name:var(--font-bodoni)] text-[7.5rem] leading-none tracking-[-0.03em] tabular-nums sm:text-[11rem]"
          >
            404
          </p>
          <div className="mt-6 h-px w-24 bg-primary" />

          <h1 className="mt-8 font-[family-name:var(--font-bodoni)] text-[32px] leading-10 sm:text-5xl sm:leading-[56px]">
            We couldn&apos;t find this page
          </h1>
          <p className="mt-5 text-lg leading-[30px] text-muted-foreground">
            The link may be out of date, or the address may have a typo. Our
            rooms, packages and early booking offers are all on the home page.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/home"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-6 text-sm font-medium tracking-[0.02em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
            >
              Go to the home page
            </Link>
            <Link
              href="/home#booking"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-foreground px-6 text-sm font-medium tracking-[0.02em] transition-colors hover:bg-foreground hover:text-background focus-visible:ring-3 focus-visible:ring-foreground/30 focus-visible:outline-none"
            >
              See available rooms
            </Link>
          </div>
        </div>

        <p className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          Looking for something else? Call us on{" "}
          <a
            href={`tel:${hotel.phone.replace(/\s/g, "")}`}
            className="font-medium text-secondary hover:underline"
          >
            {hotel.phone}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${hotel.email}`}
            className="font-medium text-secondary hover:underline"
          >
            {hotel.email}
          </a>
          .
        </p>
      </main>
    </div>
  );
}
