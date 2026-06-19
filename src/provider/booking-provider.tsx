"use client";

import { createContext, useContext, useState } from "react";
import { api } from "../lib/axios-api";
import { ApiResponse } from "../lib/api-response";
import { IRoom } from "../models/room";

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
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  setRoomCount: (count: number) => void;
  setAdultCount: (count: number) => void;
  setChildCount: (count: number) => void;
  getAvailableRooms: () => Promise<ApiResponse<IRoom[]>>;
  setRooms: (rooms: IRoom[]) => void;
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

  const value: BookingProviderState = {
    checkInDate,
    checkOutDate,
    roomCount,
    adultCount,
    childCount,
    rooms,
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
