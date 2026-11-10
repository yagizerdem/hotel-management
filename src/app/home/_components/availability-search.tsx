"use client";

import { useState } from "react";
import { ClockIcon, SearchIcon } from "lucide-react";
import { hotel, packages, type PackageId } from "../_data/hotel";
import { countNights, getEarlyBookingDiscount } from "../_lib/discount";

const fieldClassName =
  "h-12 w-full rounded-sm border border-pine/20 bg-white px-3 text-base text-pine outline-none focus-visible:border-aegean focus-visible:ring-3 focus-visible:ring-aegean/25";

type Result =
  | { kind: "error"; message: string }
  | { kind: "ok"; nights: number; discount: number };

export function AvailabilitySearch() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [packageId, setPackageId] = useState<PackageId>("all-inclusive");
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setResult({ kind: "error", message: "Giriş tarihi bugünden önce olamaz." });
      return;
    }
    const nights = countNights(start, end);
    if (nights < 1) {
      setResult({
        kind: "error",
        message: "Çıkış tarihi, giriş tarihinden en az bir gün sonra olmalı.",
      });
      return;
    }

    setResult({
      kind: "ok",
      nights,
      discount: getEarlyBookingDiscount(start, packageId, today),
    });
  }

  const packageName = packages.find((p) => p.id === packageId)?.name;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Boş oda arama"
      className="rounded-sm border border-pine/10 bg-limestone p-5 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
        <label className="flex flex-col gap-1.5 text-sm text-pine/70">
          Giriş tarihi
          <input
            type="date"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-pine/70">
          Çıkış tarihi
          <input
            type="date"
            required
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-pine/70">
          Kişi sayısı
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={fieldClassName}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} kişi
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-pine/70">
          Paket
          <select
            value={packageId}
            onChange={(e) => setPackageId(e.target.value as PackageId)}
            className={fieldClassName}
          >
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-bougainvillea px-6 font-medium text-white transition-colors hover:bg-bougainvillea/90 focus-visible:ring-3 focus-visible:ring-bougainvillea/40 focus-visible:outline-none sm:col-span-2 lg:col-span-1"
        >
          <SearchIcon className="size-4" aria-hidden />
          Boş odaları göster
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-pine/10 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-pine/80">
          <ClockIcon className="size-4 text-aegean" aria-hidden />
          Giriş {hotel.checkIn}, çıkış {hotel.checkOut}
        </p>
        <p aria-live="polite" className="text-pine/80">
          {result?.kind === "error" && (
            <span className="text-bougainvillea">{result.message}</span>
          )}
          {result?.kind === "ok" &&
            (result.discount > 0 ? (
              <>
                {result.nights} gece, {packageName}:{" "}
                <strong className="font-semibold text-bougainvillea">
                  %{result.discount} erken rezervasyon indirimi
                </strong>{" "}
                uygulanır.
              </>
            ) : (
              <>
                {result.nights} gece, {packageName}: standart gecelik fiyat
                uygulanır.
              </>
            ))}
        </p>
      </div>
    </form>
  );
}
