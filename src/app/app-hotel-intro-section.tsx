"use client";

import Image from "next/image";
import dividerSvg from "@/public/image/divider.svg";
import { useL10n } from "../provider/l10n-provider";

export function HotelIntroSection() {
  const { t } = useL10n();

  return (
    <section className="w-full bg-white py-20 text-center">
      <div className="mx-auto max-w-[850px] px-6">
        <h2 className="font-serif text-[32px] italic font-light text-[#c7924f]">
          Chatto Hotel
        </h2>

        <div className="my-8 flex justify-center flex-col items-center gap-4">
          <Image
            src={dividerSvg}
            alt=""
            width={260}
            height={28}
            className="object-contain"
          />
        </div>

        <p className="text-[20px] leading-[1.85] text-[#c7924f] whitespace-pre-line">
          {t("home.hotel_intro")}
        </p>
      </div>
    </section>
  );
}
