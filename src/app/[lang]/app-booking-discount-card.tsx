"use client";

import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import hotelLogo from "@/public/image/hotel-logo.png";
import { usePathname, useRouter } from "next/navigation";
import { useL10n } from "@/src/provider/l10n-provider";

export function BookingDiscountCard({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useL10n();

  return (
    <div
      className={twMerge(
        "`mx-auto w-[94%] max-w-[1200px] bg-[#f3eee8] shadow-2xl`",
        className,
      )}
    >
      <div
        className="flex flex-row
       sm:grid sm:min-h-[145px] sm:grid-cols-[180px_1fr_220px] items-center px-10"
      >
        <div className="flex justify-start">
          <Image
            src={hotelLogo}
            alt="Hotel Chatto Logo"
            width={86}
            height={86}
            className="object-contain collapse sm:visible"
          />
        </div>

        <p className="text-center text-[21px]  italic leading-[2] text-[#d88400]  whitespace-pre-line">
          {t("home.booking_discount_card")}
        </p>

        <button
          onMouseUp={() => {
            const segments = pathname.split("/");
            segments.push("booking");
            router.push(segments.join("/"));
          }}
          className="hover:bg-[#b87318]/40 text-center w-fit
            p-2 px-4 cursor-pointer transition-all duration-300 
          flex items-center justify-end gap-2 collapse sm:visible
            text-sm font-semibold tracking-[0.18em] text-[#b87318]"
        >
          <FaBell size={13} />
          {t("home.book_now")}
        </button>
      </div>
    </div>
  );
}
