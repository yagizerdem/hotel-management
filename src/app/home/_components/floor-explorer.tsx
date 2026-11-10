"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, DoorOpenIcon } from "lucide-react";
import { floors, formatPrice } from "../_data/hotel";

export function FloorExplorer() {
  const [selectedLevel, setSelectedLevel] = useState(floors[0].level);
  const selected = floors.find((f) => f.level === selectedLevel)!;
  const roomCount = selected.rooms.reduce((sum, r) => sum + r.count, 0);

  return (
    <section id="odalar" className="scroll-mt-16 bg-sand/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Kat kat odalarımız
        </h2>
        <p className="mt-4 max-w-xl text-pine/70">
          Dört katlı binamızda her katın oda tipleri farklı. Bir kat seçin,
          odaları ve özelliklerini görün.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-3">
            <div
              role="group"
              aria-label="Kat seçimi"
              className="flex flex-col gap-3"
            >
              {floors.map((floor) => {
                const active = floor.level === selectedLevel;
                return (
                  <button
                    key={floor.level}
                    type="button"
                    aria-pressed={active}
                    aria-controls="kat-paneli"
                    onClick={() => setSelectedLevel(floor.level)}
                    className={`group flex items-start justify-between gap-4 rounded-sm border bg-limestone p-5 text-left transition-colors focus-visible:ring-3 focus-visible:ring-aegean/30 focus-visible:outline-none ${
                      active
                        ? "border-bougainvillea"
                        : "border-pine/10 hover:border-pine/30"
                    }`}
                  >
                    <span>
                      <span
                        className={`text-sm ${active ? "text-bougainvillea" : "text-aegean"}`}
                      >
                        {floor.balcony ? "Balkonlu odalar" : "Bahçe katına yakın"}
                      </span>
                      <span className="mt-1 block font-[family-name:var(--font-bodoni)] text-3xl">
                        {floor.level}. kat
                      </span>
                      <span className="mt-2 block text-sm text-pine/70">
                        {floor.rooms
                          .map((r) => `${r.name} (${r.count})`)
                          .join(", ")}
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden
                      className={`mt-1 size-5 shrink-0 transition-transform ${
                        active
                          ? "-rotate-45 text-bougainvillea"
                          : "text-pine/40 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="flex items-start gap-3 rounded-sm border border-dashed border-pine/25 p-4 text-sm text-pine/75">
              <DoorOpenIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
              Zemin katta oda bulunmuyor; resepsiyon ve ortak alanlar bu katta.
            </p>
          </div>

          <div
            id="kat-paneli"
            aria-live="polite"
            className="rounded-sm border border-pine/10 bg-limestone p-5 sm:p-8"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                key={selected.image}
                src={selected.image}
                alt={`${selected.level}. kattaki odalardan biri`}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-[family-name:var(--font-bodoni)] text-3xl">
                {selected.level}. kat odaları
              </h3>
              <span className="rounded-sm bg-aegean/10 px-2.5 py-1 text-sm text-aegean">
                Toplam {roomCount} oda
              </span>
            </div>

            <ul className="mt-4 divide-y divide-pine/10">
              {selected.rooms.map((room) => (
                <li
                  key={room.id}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-bodoni)] text-xl">
                        {room.name}
                      </span>
                      <span className="rounded-sm bg-sand px-1.5 py-0.5 text-xs">
                        {room.count} oda
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-pine/70">
                      {[
                        room.beds,
                        `${room.capacity} kişilik`,
                        room.minibar && "Minibar",
                        selected.balcony && "Balkon",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm text-pine/70 sm:text-right">
                    Gecelik{" "}
                    <span className="font-semibold text-pine">
                      {formatPrice(room.nightlyPrice)}
                    </span>
                    &apos;den
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
