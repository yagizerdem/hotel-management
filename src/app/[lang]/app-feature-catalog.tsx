"use client";

import freeCancellation from "@/public/image/home/free-cancellation.png";
import highRating from "@/public/image/home/high-rating.png";
import peacefulMoments from "@/public/image/home/peaceful-moments.png";
import richCuisine from "@/public/image/home/rich-cuisine.png";
import specialOffers from "@/public/image/home/specialoffers.png";
import uniqueAtmosphere from "@/public/image/home/unique-atmosphere.png";
import { useL10n } from "@/src/provider/l10n-provider";
import Image from "next/image";

const cards = [
  {
    title: "home.peaceful_moments",
    desc: "home.peaceful_moments_desc",
    image: peacefulMoments,
    alt: "Peaceful Moments",
  },
  {
    title: "home.unique_atmosphere",
    desc: "home.unique_atmosphere_desc",
    image: uniqueAtmosphere,
    alt: "Unique Atmosphere",
  },
  {
    title: "home.rich_cuisine",
    desc: "home.rich_cuisine_desc",
    image: richCuisine,
    alt: "Rich Cuisine",
  },
  {
    title: "home.free_cancellation",
    desc: "home.free_cancellation_desc",
    image: freeCancellation,
    alt: "Free Cancellation",
  },
  {
    title: "home.high_rating",
    desc: "home.high_rating_desc",
    image: highRating,
    alt: "High Rating",
  },
  {
    title: "home.special_offers",
    desc: "home.special_offers_desc",
    image: specialOffers,
    alt: "Special Offers",
  },
];

export function FeatureCatalog() {
  const { t } = useL10n();

  return (
    <div className="mx-auto my-20 flex w-full max-w-[1100px] flex-col items-center justify-center gap-16 px-4 sm:px-6 lg:px-0">
      {cards.map((card, index) => {
        const isImageRight = index % 2 === 1;

        return (
          <div
            key={card.title}
            className={`flex w-full flex-col items-stretch justify-center gap-8 md:flex-row ${
              isImageRight ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="relative aspect-[4/3] w-full md:w-1/2">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-center px-2 md:w-1/2 md:px-6">
              <h1 className="text-center text-2xl font-bold text-[#c7924f] md:text-3xl">
                {t(card.title)}
              </h1>

              <p className="my-2 whitespace-pre-line text-center text-base leading-relaxed text-[#c7924f] md:text-xl">
                {t(card.desc)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
