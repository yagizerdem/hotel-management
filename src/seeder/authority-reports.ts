import type { Types } from "mongoose";
import AuthorityReportModel from "../models/authority-report";
import type { GuestDocument } from "../models/guest";
import type { Reservation } from "../models/reservation";
import type { RoomDocument } from "../models/room";
import type { RoomNightDocument } from "../models/room-night";
import { TODAY, addDays, addHours, chance, eachDay, faker } from "@seeder/utils";

type ReportedReservation = Pick<Reservation, "guests" | "room" | "checkIn" | "checkOut"> & { _id: Types.ObjectId };

type SeedAuthorityReportsInput = {
  days: number;
  rooms: RoomDocument[];
  guests: GuestDocument[];
  reservations: ReportedReservation[];
  roomNights: RoomNightDocument[];
};

/**
 * A governorship report for each of the last `days` nights, listing every
 * guest who stayed that night. Today's report is still pending.
 */
export async function seedAuthorityReports({ days, rooms, guests, reservations, roomNights }: SeedAuthorityReportsInput) {
  const roomById = new Map(rooms.map((room) => [String(room._id), room]));
  const guestById = new Map(guests.map((guest) => [String(guest._id), guest]));
  const reservationById = new Map(reservations.map((reservation) => [String(reservation._id), reservation]));

  const reports = eachDay(addDays(TODAY, -days), addDays(TODAY, 1)).map((reportDate) => {
    const stays = roomNights
      .filter((roomNight) => roomNight.kind === "reservation" && roomNight.night.getTime() === reportDate.getTime())
      .map((roomNight) => reservationById.get(String(roomNight.reservation))!);

    const reportedGuests = stays.flatMap((reservation) =>
      reservation.guests.map((guestId) => {
        const guest = guestById.get(String(guestId))!;
        return {
          guest: guest._id,
          reservation: reservation._id,
          roomNumber: roomById.get(String(reservation.room))!.number,
          firstName: guest.firstName,
          lastName: guest.lastName,
          nationalId: guest.nationalId ?? undefined,
          passportNumber: guest.passportNumber ?? undefined,
          nationality: guest.nationality,
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
        };
      }),
    );

    if (reportDate.getTime() === TODAY.getTime()) {
      return { reportDate, guests: reportedGuests };
    }

    // Reports go out shortly after midnight; a few fail on the first try.
    const failedOnce = chance(0.08);
    return {
      reportDate,
      guests: reportedGuests,
      status: "sent",
      attempts: failedOnce ? 2 : 1,
      sentAt: addHours(addDays(reportDate, 1), failedOnce ? 2 : 0.5),
      responseReference: faker.string.alphanumeric({ length: 12, casing: "upper" }),
      lastError: failedOnce ? "Valilik servisi zaman aşımına uğradı" : undefined,
    };
  });

  return AuthorityReportModel.insertMany(reports);
}
