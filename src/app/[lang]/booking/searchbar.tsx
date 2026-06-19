"use client";

// SearchBar.tsx
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useBooking } from "@/src/provider/booking-provider";
import { CalendarIcon, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { IRoom } from "@/src/models/room";
import { ApiResponse } from "@/src/lib/api-response";

export default function SearchBar() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    adultCount,
    checkInDate,
    checkOutDate,
    childCount,
    roomCount,
    rooms,
    setCheckInDate,
    setCheckOutDate,
    setRoomCount,
    setAdultCount,
    setChildCount,
    setRooms,
  } = useBooking();
  const searchParams = useSearchParams();
  const { getAvailableRooms } = useBooking();

  const today = new Date();

  const checkIn = searchParams.get("checkIn") || today;
  const checkOut = searchParams.get("checkOut") || addDays(today, 1);

  useEffect(() => {
    setCheckInDate(new Date(checkIn));
    setCheckOutDate(new Date(checkOut));
  }, [checkIn, checkOut, setCheckInDate, setCheckOutDate]);

  console.log(rooms);

  async function handleSearch() {
    try {
      setIsLoading(true);
      setRooms([]); // Clear previous rooms before fetching new ones

      const apiResopnse: ApiResponse<IRoom[]> = await getAvailableRooms();
      if (apiResopnse.data) {
        setRooms(apiResopnse.data);
      }
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full border border-gray-200 p-6">
      <div className="flex flex-row flex-wrap gap-4 items-end">
        <div className="space-y-1">
          <label className="text-sm font-semibold">Giriş Tarihi</label>
          <div className="relative ">
            <Input
              value={checkInDate ? checkInDate.toLocaleDateString() : ""}
              readOnly
              className="bg-white pr-10"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute top-full w-60  right-0 translate-x-1/2 ">
                <DropdownMenuGroup>
                  <Calendar
                    mode="single"
                    selected={checkInDate || undefined}
                    onSelect={(date) => setCheckInDate(date || null)}
                    className="rounded-lg border w-fit"
                    captionLayout="dropdown"
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Çıkış Tarihi</label>
          <div className="relative ">
            <Input
              value={checkOutDate ? checkOutDate.toLocaleDateString() : ""}
              readOnly
              className="bg-white pr-10"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute top-full w-60  right-0 translate-x-1/2 ">
                <DropdownMenuGroup>
                  <Calendar
                    mode="single"
                    selected={checkOutDate || undefined}
                    onSelect={(date) => setCheckOutDate(date || null)}
                    className="rounded-lg border w-fit"
                    captionLayout="dropdown"
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Oda Sayısı</label>
          <Select
            defaultValue={roomCount?.toString() || "1"}
            value={roomCount?.toString() || "1"}
            onValueChange={(value) => setRoomCount(value ? parseInt(value) : 1)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Oda</SelectItem>
              <SelectItem value="2">2 Oda</SelectItem>
              <SelectItem value="3">3 Oda</SelectItem>
              <SelectItem value="4">4 Oda</SelectItem>
              <SelectItem value="5">5 Oda</SelectItem>
              <SelectItem value="6">6 Oda</SelectItem>
              <SelectItem value="7">7 Oda</SelectItem>
              <SelectItem value="8">8 Oda</SelectItem>
              <SelectItem value="9">9 Oda</SelectItem>
              <SelectItem value="10">10 Oda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Yetişkin</label>
          <Select
            defaultValue={adultCount?.toString() || "2"}
            value={adultCount?.toString() || "2"}
            onValueChange={(value) =>
              setAdultCount(value ? parseInt(value) : 2)
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Yetişkin</SelectItem>
              <SelectItem value="2">2 Yetişkin</SelectItem>
              <SelectItem value="3">3 Yetişkin</SelectItem>
              <SelectItem value="4">4 Yetişkin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Çocuk (0-6 yaş)</label>
          <Select
            defaultValue={childCount?.toString() || "0"}
            value={childCount?.toString() || "0"}
            onValueChange={(value) =>
              setChildCount(value ? parseInt(value) : 0)
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 Çocuk</SelectItem>
              <SelectItem value="1">1 Çocuk</SelectItem>
              <SelectItem value="2">2 Çocuk</SelectItem>
              <SelectItem value="3">3 Çocuk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="h-10 bg-[#c59a5b] hover:bg-[#b88b4c] text-white"
          onMouseUp={handleSearch}
        >
          Ara <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export { SearchBar };
