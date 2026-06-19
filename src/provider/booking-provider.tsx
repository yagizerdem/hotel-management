"use client";

import { createContext, useContext, useState } from "react";
import { api } from "../lib/axios-api";
import { ApiResponse } from "../lib/api-response";
import { IRoom } from "../models/room";
import { toast } from "sonner";
import { ExpenseResponse } from "../app/api/web/calculate-reservation-price-bulk/route";

export type PackageType = "FULL_BOARD" | "ALL_INCLUSIVE";

export interface BookingRecord {
  checkInDate: Date;
  checkOutDate: Date;
  packageType: PackageType;
  room: IRoom;
}

type BookingProviderProps = {
  children: React.ReactNode;
};

type BookingProviderState = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomCount: number;
  adultCount: number;
  childCount: number;
  rooms: IRoom[];
  bookingRecords: BookingRecord[];
  isCalculatingExpenses: boolean;
  setBookingRecords: React.Dispatch<React.SetStateAction<BookingRecord[]>>;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  setRoomCount: (count: number) => void;
  setAdultCount: (count: number) => void;
  setChildCount: (count: number) => void;
  getAvailableRooms: () => Promise<ApiResponse<IRoom[]>>;
  setRooms: (rooms: IRoom[]) => void;
  addToBookingRecords: (record: BookingRecord) => void;
  setIsCalculatingExpenses: (isCalculating: boolean) => void;
};

const BookingProviderContext = createContext<BookingProviderState | undefined>(
  undefined,
);

export function BookingProvider({ children }: BookingProviderProps) {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [bookingRecords, setBookingRecords] = useState<BookingRecord[]>([]);
  const [isCalculatingExpenses, setIsCalculatingExpenses] =
    useState<boolean>(false);
  const [expenseData, setExpenseData] = useState<ExpenseResponse[]>([]);

  async function getAvailableRooms(): Promise<ApiResponse<IRoom[]>> {
    const apiResponse: ApiResponse<IRoom[]> = (
      await api.get("/room/get-available-rooms", {
        params: {
          checkInDate: checkInDate?.toISOString(),
          checkOutDate: checkOutDate?.toISOString(),
          limit: 100,
        },
      })
    ).data;

    return apiResponse;
  }

  async function addToBookingRecords(record: BookingRecord) {
    try {
      setIsCalculatingExpenses(true);
      setExpenseData([]); // Clear previous expense data

      const newCheckIn = new Date(record.checkInDate).getTime();
      const newCheckOut = new Date(record.checkOutDate).getTime();

      const isOverlapping = bookingRecords.some((existingRecord) => {
        if (record.room._id !== existingRecord.room._id) {
          return false;
        }

        const existingCheckIn = new Date(existingRecord.checkInDate).getTime();
        const existingCheckOut = new Date(
          existingRecord.checkOutDate,
        ).getTime();

        return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;
      });

      if (isOverlapping) {
        toast.error("This room is already booked for the selected dates.", {
          position: "top-right",
        });
        return;
      }

      const newRecords = [...bookingRecords, record];

      setBookingRecords(newRecords);

      const payload = newRecords.map((rec) => ({
        checkInDate: rec.checkInDate.toISOString(),
        checkOutDate: rec.checkOutDate.toISOString(),
        packageType: rec.packageType,
        room: rec.room._id.toString(),
      }));

      const response: ApiResponse<ExpenseResponse[]> = (
        await api.post("/web/calculate-reservation-price-bulk", {
          reservations: payload,
        })
      ).data;

      if (response.status.toString().startsWith("2")) {
        const expenseData = response.data;
        setExpenseData(expenseData ?? []);
        console.log(expenseData);
      } else {
        console.log(
          response.message ?? "Failed to calculate reservation prices",
        );
      }
    } catch (error) {
      console.error("Error adding booking record:", error);
      toast.error("An error occurred while adding the booking record.", {
        position: "top-right",
      });
    } finally {
      setIsCalculatingExpenses(false);
    }
  }

  const value: BookingProviderState = {
    checkInDate,
    checkOutDate,
    roomCount,
    adultCount,
    childCount,
    rooms,
    bookingRecords,
    isCalculatingExpenses,
    setIsCalculatingExpenses,
    setBookingRecords,
    addToBookingRecords,
    setCheckInDate,
    setCheckOutDate,
    setRoomCount,
    setAdultCount,
    setChildCount,
    getAvailableRooms,
    setRooms,
  };

  return (
    <BookingProviderContext.Provider value={value}>
      {children}
    </BookingProviderContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingProviderContext);

  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }

  return context;
};
