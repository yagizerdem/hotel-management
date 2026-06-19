"use client";

import { createContext, useContext, useState } from "react";
import { api } from "../lib/axios-api";
import { ApiResponse } from "../lib/api-response";
import { IRoom } from "../models/room";
import { toast } from "sonner";

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
  setBookingRecords: React.Dispatch<React.SetStateAction<BookingRecord[]>>;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  setRoomCount: (count: number) => void;
  setAdultCount: (count: number) => void;
  setChildCount: (count: number) => void;
  getAvailableRooms: () => Promise<ApiResponse<IRoom[]>>;
  setRooms: (rooms: IRoom[]) => void;
  addToBookingRecords: (record: BookingRecord) => void;
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

  function addToBookingRecords(record: BookingRecord) {
    // check checkin intervals
    bookingRecords.forEach((existingRecord) => {
      if (
        (record.checkInDate >= existingRecord.checkInDate &&
          record.checkInDate <= existingRecord.checkOutDate) ||
        (record.checkOutDate >= existingRecord.checkInDate &&
          record.checkOutDate <= existingRecord.checkOutDate &&
          record.room._id === existingRecord.room._id)
      ) {
        toast.error("This room is already booked for the selected dates.", {
          position: "top-right",
        });
        return;
      }
    });

    setBookingRecords((prevRecords) => [...prevRecords, record]);
  }

  const value: BookingProviderState = {
    checkInDate,
    checkOutDate,
    roomCount,
    adultCount,
    childCount,
    rooms,
    bookingRecords,
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
