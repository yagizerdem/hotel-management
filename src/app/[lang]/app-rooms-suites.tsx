"use client";

import deluxeRoom from "@/public/image/home/deluxe.png";
import cornerSuite from "@/public/image/home/corner_suite.png";
import Image from "next/image";
import { useL10n } from "@/src/provider/l10n-provider";
import { usePathname, useRouter } from "next/navigation";

const rooms = [
  { title: "Single Room", type: "single_room", image: cornerSuite },
  { title: "Double Twin Room", type: "double_twin_room", image: deluxeRoom },
  { title: "Double Room", type: "double_room", image: deluxeRoom },
  {
    title: "Triple Single Room",
    type: "triple_single_room",
    image: cornerSuite,
  },
  { title: "Triple Mixed Room", type: "triple_mixed_room", image: cornerSuite },
  { title: "Quad Room", type: "quad_room", image: deluxeRoom },
  { title: "King Suite", type: "king_suite", image: cornerSuite },
];

export function AppRoomsSuites() {
  const { t } = useL10n();
  const router = useRouter();
  const path = usePathname();

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="mb-14 text-center text-4xl text-[#c7924f]">
          {t("home.rooms_suites")}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rooms.map((room) => (
            <div
              key={room.type}
              className="group relative h-[380px] overflow-hidden"
            >
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-x-0 bottom-10 flex flex-col items-center">
                <h3 className="text-center font-serif text-4xl font-bold text-white">
                  {t(`home.${room.type}`)}
                </h3>

                <button
                  onMouseUp={() => {
                    const segments = path.split("/");
                    segments.push("rooms_suites");
                    router.push(segments.join("/"));
                  }}
                  className="mt-4 text-sm font-bold tracking-[0.15em] text-[#c7924f]
                   hover:bg-[#b87318]/40 duration-300  p-1 cursor-pointer
                   rounded-md border border-[#c7924f]
                    hover:border-[#b87318] hover:text-[#b87318] "
                >
                  {t("home.more_details")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
