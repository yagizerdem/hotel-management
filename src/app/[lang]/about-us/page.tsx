"use client";

import { useL10n } from "@/src/provider/l10n-provider";
import { Jumbotron } from "../shared/jumbutron";
import Image from "next/image";
import dividerSvg from "@/public/image/divider.svg";
import { Footer } from "../app-footer";

import chattoPng from "@/public/image/about_us/chatto.png";
import artifactPng from "@/public/image/about_us/artifact.png";
import mealPng from "@/public/image/about_us/meal.png";
import restaurantPng from "@/public/image/about_us/restaurant.png";
import roomPng from "@/public/image/about_us/room.png";

export default function AboutUsPage() {
  const { t } = useL10n();

  const images = [
    { src: chattoPng, alt: "Hotel exterior" },
    { src: artifactPng, alt: "Hotel room" },
    { src: mealPng, alt: "Statue detail" },
    { src: restaurantPng, alt: "Restaurant food" },
    { src: roomPng, alt: "Restaurant terrace" },
  ];

  return (
    <div className="w-full h-full mx-auto flex flex-col items-center justify-center gap-6 ">
      <Jumbotron jumbutronTitle={t("about_us.jumbutron_title")} />
      <p className="font-semibold text-xl w-1/2 lg:w-3/5 wrap-break-word text-text-foreground">
        {t("about_us.description")}
      </p>
      <br />
      <Image src={dividerSvg} alt="Divider" />
      <div className="w-3/4 lg:w-1/2 h-fi">
        <h1 className="font-bold pb-2 text-xl">Chatto Hotel</h1>
        <p className="whitespace-pre-line">{t("about_us.our_story")}</p>
      </div>

      <section className="mx-auto grid max-w-[840px] grid-cols-1 gap-6 py-16 md:grid-cols-[200px_247px_200px] md:gap-x-9">
        <div className="space-y-9">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            width={240}
            height={162}
            className="h-[162px] w-[240px] object-cover"
          />

          <Image
            src={images[1].src}
            alt={images[1].alt}
            width={240}
            height={180}
            className="h-[180px] w-[240px] object-cover"
          />
        </div>

        <Image
          src={images[2].src}
          alt={images[2].alt}
          width={277}
          height={414}
          className="h-[414px] w-[277px] object-cover"
        />

        <div className="space-y-9">
          <Image
            src={images[3].src}
            alt={images[3].alt}
            width={240}
            height={160}
            className="h-[160px] w-[240px] object-cover"
          />

          <Image
            src={images[4].src}
            alt={images[4].alt}
            width={240}
            height={160}
            className="h-[160px] w-[240px] object-cover"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
