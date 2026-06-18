"use client";

import { Calendar } from "@/src/components/ui/calendar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const formatDate = (date?: Date) => {
  if (!date) return "";

  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function BookingFooter() {
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [checkIn, setCheckIn] = useState<Date | undefined>(today);
  const [checkOut, setCheckOut] = useState<Date | undefined>(tomorrow);

  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  const path = usePathname();
  const router = useRouter();

  function navigateToBookingPage() {
    const query = new URLSearchParams();
    if (checkIn) query.append("checkIn", checkIn.toISOString());
    if (checkOut) query.append("checkOut", checkOut.toISOString());
    query.append("adults", adults.toString());
    query.append("kids", kids.toString());
    const segments = path.split("/").filter(Boolean);
    segments.push("booking");
    router.push(`/${segments.join("/")}?${query.toString()}`);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (checkInRef.current && !checkInRef.current.contains(target)) {
        setShowCheckInCalendar(false);
      }

      if (checkOutRef.current && !checkOutRef.current.contains(target)) {
        setShowCheckOutCalendar(false);
      }

      if (guestRef.current && !guestRef.current.contains(target)) {
        setGuestOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-[#d7d1c8] bg-[#f8f8f8]">
      <div className="mx-auto flex h-11 items-center justify-center">
        <div className="relative flex overflow-visible border border-[#cfc8be] bg-white">
          <div ref={checkInRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowCheckInCalendar(!showCheckInCalendar);
                setShowCheckOutCalendar(false);
                setGuestOpen(false);
              }}
              className="flex h-9 w-[120px] items-center justify-center border-r border-[#cfc8be] text-[10px] tracking-wide text-gray-500"
            >
              {formatDate(checkIn)}
            </button>

            {showCheckInCalendar && (
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);

                  if (date && checkOut && date > checkOut) {
                    setCheckOut(date);
                  }

                  setShowCheckInCalendar(false);
                }}
                className="absolute bottom-11 left-0 z-50 w-80 rounded-lg border border-[#cfc8be] bg-white p-3 shadow-md"
                captionLayout="dropdown"
              />
            )}
          </div>

          <div ref={checkOutRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowCheckOutCalendar(!showCheckOutCalendar);
                setShowCheckInCalendar(false);
                setGuestOpen(false);
              }}
              className="flex h-9 w-[120px] items-center justify-center border-r border-[#cfc8be] text-[10px] tracking-wide text-gray-500"
            >
              {formatDate(checkOut)}
            </button>

            {showCheckOutCalendar && (
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(date) => {
                  setCheckOut(date);
                  setShowCheckOutCalendar(false);
                }}
                disabled={(date) => Boolean(checkIn && date < checkIn)}
                className="absolute bottom-11 left-0 z-50 w-80 rounded-lg border border-[#cfc8be] bg-white p-3 shadow-md"
                captionLayout="dropdown"
              />
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setGuestOpen(!guestOpen);
                setShowCheckInCalendar(false);
                setShowCheckOutCalendar(false);
              }}
              className="flex h-9 w-[105px] items-center justify-center gap-3 border-r border-[#cfc8be] text-[10px] text-gray-500"
            >
              <span>{adults} Adults</span>
              <span>{kids} Kid</span>
            </button>

            {guestOpen && (
              <div
                className="absolute bottom-11 left-0 z-50 w-[180px] border border-[#cfc8be] bg-white p-3 shadow-md"
                ref={guestRef}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-gray-600">Adults</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="h-6 w-6 border border-[#cfc8be] text-sm"
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-xs">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="h-6 w-6 border border-[#cfc8be] text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Kid</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setKids(Math.max(0, kids - 1))}
                      className="h-6 w-6 border border-[#cfc8be] text-sm"
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-xs">{kids}</span>
                    <button
                      type="button"
                      onClick={() => setKids(kids + 1)}
                      className="h-6 w-6 border border-[#cfc8be] text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onMouseUp={navigateToBookingPage}
            className="h-9 w-[110px] bg-[#b88a48] text-[11px] font-semibold tracking-wider text-white transition hover:opacity-90 cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </footer>
  );
}
