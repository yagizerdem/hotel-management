"use client";

import { useL10n } from "@/src/provider/l10n-provider";
import { Jumbotron } from "../shared/jumbutron";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Card, CardContent } from "@/src/components/ui/card";
import chattoPng from "@/public/image/room_suites/chatto.png";
import cornerSuitePng from "@/public/image/room_suites/corner_suite.png";
import cornerSuite2Png from "@/public/image/room_suites/corner_suite_2.png";
import peacefulMomentsPng from "@/public/image/room_suites/peaceful-moments.png";
import roomWithTvPng from "@/public/image/room_suites/room_with_tv.png";
import toiletPng from "@/public/image/room_suites/toilet.png";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Cuboid,
  BedDouble,
  Bath,
  Armchair,
  Snowflake,
  ConciergeBell,
  Tv,
  Coffee,
  Wifi,
  ArrowRight,
  Refrigerator,
  Trees,
} from "lucide-react";
import { Footer } from "../app-footer";

const features = [
  { icon: Cuboid, text: "45 M²" },
  { icon: BedDouble, text: "Queen size bed" },
  { icon: BedDouble, text: "King size" },
  { icon: Bath, text: "Marble Bathroom" },
  { icon: Armchair, text: "Seating Area" },
  { icon: Snowflake, text: "Air Conditioning" },
  { icon: ConciergeBell, text: "Breakfast" },
  { icon: Tv, text: "Smart TV" },
  { icon: Coffee, text: "Coffee Machine" },
  { icon: Wifi, text: "Wifi" },
];

export default function RoomsSuites() {
  const { t } = useL10n();

  const cornerSuiteFeatures = [
    { icon: Cuboid, text: "45 M²" },
    { icon: BedDouble, text: "Queen size bed" },
    { icon: Bath, text: "Marble Bathroom" },
    { icon: Armchair, text: "Seating Area" },
    { icon: Snowflake, text: "Air Conditioning" },
    { icon: ConciergeBell, text: "Breakfast" },
    { icon: Tv, text: "Smart TV" },
    { icon: Coffee, text: "Coffee Machine" },
  ];
  const deluxeRoomFeatures = [
    { icon: Cuboid, text: "45 M²" },
    { icon: Snowflake, text: "Air Conditioning" },
    { icon: Armchair, text: "Seating Area" },
    { icon: BedDouble, text: "King size bed" },
    { icon: Wifi, text: "Wifi" },
    { icon: ConciergeBell, text: "Breakfast" },
    { icon: Tv, text: "Smart TV" },
    { icon: Bath, text: "Marble Bathroom" },
    { icon: Coffee, text: "Coffee Machine" },
  ];

  const deluxeTwinRoomFeatures = [
    { icon: Cuboid, text: "45 M²" },
    { icon: Wifi, text: "Wifi" },
    { icon: Snowflake, text: "Air Conditioning" },
    { icon: BedDouble, text: "King size bed" },
    { icon: ConciergeBell, text: "Breakfast" },
    { icon: Coffee, text: "Coffee Machine" },
    { icon: Bath, text: "Marble Bathroom" },
    { icon: Armchair, text: "Seating Area" },
    { icon: Refrigerator, text: "Minibar" },
  ];

  const standardRoomFeatures = [
    { icon: Cuboid, text: "24 M²" },
    { icon: BedDouble, text: "King size bed" },
    { icon: Trees, text: "Terrace" },
    { icon: Wifi, text: "Wifi" },
    { icon: ConciergeBell, text: "Breakfast" },
    { icon: Snowflake, text: "Air Conditioning" },
    { icon: Bath, text: "Marble Bathroom" },
  ];

  return (
    <div className="w-full h-full mx-auto flex flex-col items-center justify-center gap-6 ">
      <Jumbotron jumbutronTitle={t("room_suites.jumbutron_title")} />
      <div
        className="w-1/2 h-fit wrap-break-word text-gray-700 text-left"
        dangerouslySetInnerHTML={{
          __html: t("room_suites.description").replace(
            /Hotel Chatto/,
            "<b>Hotel Chatto</b>",
          ),
        }}
      />

      <div className="xl:grid xl:grid-cols-2 xl:grid-rows-2 gap-6 w-full h-full p-20 flex flex-col">
        <div className="w-full h-full flex flex-col">
          <CarouselWrapper
            images={[cornerSuitePng, cornerSuitePng, toiletPng]}
          />
          <div className="w-full max-w-4xl px-8 py-10">
            <h2 className="mb-8 inline-block bg-[#c79b5b] px-2 text-2xl font-serif font-semibold text-black">
              Corner Suit Room
            </h2>

            <ul className="grid grid-cols-2 gap-x-28 gap-y-5 text-sm text-slate-600">
              {cornerSuiteFeatures.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <Icon className="h-4 w-4 shrink-0 text-black" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button className="mt-9 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#b9853f]">
              Book Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col">
          <CarouselWrapper
            images={[cornerSuitePng, roomWithTvPng, toiletPng]}
          />

          <div className="w-full max-w-4xl px-8 py-10">
            <h2 className="mb-8 inline-block bg-[#c79b5b] px-2 text-2xl font-serif font-semibold text-black">
              Deluxe Room
            </h2>

            <ul className="grid-flow-col grid grid-cols-3 grid-rows-4 gap-x-28 gap-y-5 text-sm text-slate-600">
              {deluxeRoomFeatures.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <Icon className="h-4 w-4 shrink-0 text-black" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button className="mt-9 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#b9853f]">
              Book Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col">
          <CarouselWrapper images={[cornerSuite2Png, chattoPng]} />

          <div className="w-full max-w-4xl px-8 py-10">
            <h2 className="mb-8 inline-block bg-[#c79b5b] px-2 text-2xl font-serif font-semibold text-black">
              Deluxe Twin Room
            </h2>

            <ul className="grid-flow-col grid grid-cols-3 grid-rows-3 gap-x-28 gap-y-5 text-sm text-slate-600">
              {deluxeTwinRoomFeatures.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <Icon className="h-4 w-4 shrink-0 text-black" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button className="mt-9 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#b9853f]">
              Book Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col">
          <CarouselWrapper images={[chattoPng, peacefulMomentsPng]} />

          <div className="w-full max-w-4xl px-8 py-10">
            <h2 className="mb-8 inline-block bg-[#c79b5b] px-2 text-2xl font-serif font-semibold text-black">
              Standard Room
            </h2>

            <ul className="grid grid-cols-3 grid-rows-3 gap-x-28 gap-y-5 text-sm text-slate-600">
              {standardRoomFeatures.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <Icon className="h-4 w-4 shrink-0 text-black" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button className="mt-9 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#b9853f]">
              Book Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function CarouselWrapper({ images }: { images: StaticImageData[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplay = useRef(
    Autoplay({
      delay: 2000 + Math.random() * 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        className="relative w-full h-full"
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={image}
                    alt={`Room ${index + 1}`}
                    className="w-full h-[320px] object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>

      <div className="mt-3 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-1 w-1 rounded-full transition-all ${
              current === index ? "bg-black scale-125" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
