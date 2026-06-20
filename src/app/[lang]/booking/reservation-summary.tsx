"use client";

import { ChevronRight, Globe2, PhoneOff, WifiOff } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { twMerge } from "tailwind-merge";
import { useBooking } from "@/src/provider/booking-provider";
import { AppLoader } from "@/src/components/shared/app-spinner";
import { Separator } from "@/src/components/ui/separator";
import { toast } from "sonner";
import { useApp } from "@/src/provider/app-provider";
import { ApiResponse } from "@/src/lib/api-response";
import { api } from "@/src/lib/axios-api";

export default function ReservationSummary({
  className,
}: {
  className?: string;
}) {
  const {
    bookingRecords,
    isCalculatingExpenses,
    rooms,
    expenseData,
    removeBookingRecord,
  } = useBooking();
  const { setIsLoading } = useApp();

  async function handleReservation() {
    try {
      setIsLoading(true);

      if (bookingRecords.length === 0) {
        toast.error(
          "Select at least one room to proceed with the reservation.",
          {
            position: "top-right",
          },
        );
        return;
      }

      const apiResponse: ApiResponse<null> = (
        await api.post("/web/book-bulk", {
          reservations: bookingRecords.map((record) => ({
            room: record.room._id,
            checkInDate: record.checkInDate,
            checkOutDate: record.checkOutDate,
            packageType: record.packageType,
          })),
        })
      ).data;

      console.log(apiResponse);

      if (apiResponse.status.toString().startsWith("2")) {
        toast.success(apiResponse.message || "Reservation confirmed", {
          position: "top-right",
        });
      } else {
        toast.error(apiResponse.message || "Failed to create reservation", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during reservation:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside
      className={twMerge(
        "w-full max-w-[390px] bg-[#eeeeee] p-2 shadow-lg",
        className,
      )}
    >
      <h2 className="text-base font-bold text-slate-900">REZERVASYON ÖZETİ</h2>

      <p className="mt-2 text-[11px] text-slate-900">
        Giriş Tarihi: <b>19.06.2026</b> » Çıkış Tarihi: <b>20.06.2026</b>{" "}
        <b>(1 Gece)</b>
      </p>

      <div className="relative mt-2 bg-white px-3 py-4 text-base text-slate-900">
        {isCalculatingExpenses && (
          <div className="w-full h-full absolute top-0 left-0 inset-0">
            <div className="absolute top-0 left-0 inset-0 bg-black opacity-50"></div>
            <div className="flex items-center justify-center h-full">
              <AppLoader />
            </div>
          </div>
        )}

        {bookingRecords.length === 0 && <span>Lütfen bir oda seçin</span>}
        {bookingRecords.map((record, index) => (
          <div
            key={record.room._id ?? index}
            className="mb-2 rounded-md border p-3"
          >
            <p className="font-medium">Booking #{index + 1}</p>

            <p>Package: {record.packageType}</p>
            <p>Check-in: {new Date(record.checkInDate).toLocaleDateString()}</p>
            <p>
              Check-out: {new Date(record.checkOutDate).toLocaleDateString()}
            </p>
            <p>
              Total:{" "}
              {expenseData.find((expense) => expense.roomId === record.room._id)
                ?.totalExpense ?? 0}
            </p>
            <p>
              Nightly:{" "}
              {expenseData.find((expense) => expense.roomId === record.room._id)
                ?.nightlyExpense ?? 0}
            </p>
            <button
              className="mt-2 text-sm text-red-500 underline cursor-pointer"
              onClick={() => removeBookingRecord(record.room._id)}
            >
              Remove
            </button>
            <Separator />
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <p className="text-base">
          Toplam*:{" "}
          <b>
            {expenseData.reduce(
              (total, expense) => total + expense.totalExpense,
              0,
            )}{" "}
            €
          </b>
        </p>

        <div className="mx-5 mt-1 border-t border-gray-300 pt-2">
          <p className="text-xs">*Bütün vergi ve ücretler toplam ücret dahil</p>

          <Button
            className="mt-2 bg-[#d4b37e] text-white hover:bg-[#c7a46c] cursor-pointer"
            onMouseUp={handleReservation}
          >
            Devam <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <button className="mt-3 text-base underline cursor-pointer">
          Promosyon kodu girmek istiyorum
        </button>
      </div>

      <div className="mt-4 bg-white p-3">
        <div className="flex items-center gap-4 py-2">
          <img
            src="https://placehold.co/92x62?text=Google+Maps"
            alt="Harita"
            className="h-[62px] w-[92px] object-cover"
          />
          <span className="text-base">Harita konumu için tıklayın</span>
        </div>

        <div className="mt-3 border-t border-gray-300 pt-4">
          <p className="text-xs">
            Cami, Kavala Sk. No: 12, 34940 Tuzla/İstanbul İstanbul Türkiye
          </p>

          <div className="mt-2 flex justify-center gap-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white">
              <Globe2 className="h-5 w-5" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <PhoneOff className="h-4 w-4" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <WifiOff className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-center font-bold">
        <div className="bg-white py-1 shadow-sm">Resmi Websitesi</div>
        <div className="bg-white py-1 shadow-sm">En iyi fiyat garantisi</div>
        <div className="bg-white py-1 shadow-sm">
          Otelle direkt iletişim imkanı
        </div>
        <div className="bg-white py-1 shadow-sm">
          Ücretsiz iptal seçenekleri
        </div>
      </div>
    </aside>
  );
}
