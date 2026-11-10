import { Types } from "mongoose";
import ChargeModel, { CHARGE_CATEGORIES } from "../models/charge";
import type { EarlyBookingDiscountDocument } from "../models/early-booking-discount";
import type { EmployeeDocument } from "../models/employee";
import type { GuestDocument } from "../models/guest";
import PaymentModel, { PAYMENT_METHODS } from "../models/payment";
import ReservationModel, { CHECK_IN_HOUR, CHECK_OUT_HOUR, RESERVATION_CHANNELS } from "../models/reservation";
import RoomModel, { type RoomDocument } from "../models/room";
import RoomBlockModel, { ROOM_BLOCK_REASONS } from "../models/room-block";
import RoomNightModel from "../models/room-night";
import type { BoardType } from "../models/room-rate";
import type { RoomTypeDocument } from "../models/room-type";
import type { UserDocument } from "../models/user";
import { bestDiscount } from "@seeder/pricing";
import { TODAY, addDays, addHours, atHotelTime, chance, daysBetween, eachDay, faker, money, pick } from "@seeder/utils";

type ChargeCategory = (typeof CHARGE_CATEGORIES)[number];

const CHARGE_ITEMS: { category: ChargeCategory; description: string; unitPrice: number }[] = [
  { category: "minibar", description: "Minibar - su", unitPrice: 60 },
  { category: "minibar", description: "Minibar - meşrubat", unitPrice: 110 },
  { category: "minibar", description: "Minibar - çikolata", unitPrice: 140 },
  { category: "bar", description: "Bira", unitPrice: 250 },
  { category: "bar", description: "Kokteyl", unitPrice: 450 },
  { category: "bar", description: "Türk kahvesi", unitPrice: 120 },
  { category: "snack_bar", description: "Hamburger", unitPrice: 420 },
  { category: "snack_bar", description: "Tost", unitPrice: 220 },
  { category: "restaurant", description: "A la carte akşam yemeği", unitPrice: 1800 },
  { category: "room_service", description: "Oda servisi kahvaltı", unitPrice: 650 },
  { category: "laundry", description: "Çamaşırhane", unitPrice: 300 },
  { category: "spa", description: "Masaj (50 dk)", unitPrice: 2400 },
  { category: "spa", description: "Hamam", unitPrice: 1200 },
];

// Extras an all-inclusive guest still pays for.
const ALL_INCLUSIVE_EXTRAS: ChargeCategory[] = ["restaurant", "room_service", "laundry", "spa"];

type SeedReservationsInput = {
  rooms: RoomDocument[];
  roomTypes: RoomTypeDocument[];
  guests: GuestDocument[];
  customers: UserDocument[];
  receptionists: EmployeeDocument[];
  managers: EmployeeDocument[];
  discounts: EarlyBookingDiscountDocument[];
  priceOf: (roomType: Types.ObjectId, boardType: BoardType, night: Date) => number;
  from: Date;
  to: Date;
};

/**
 * Walks each room's calendar from `from` to `to` and fills it with stays
 * and the odd maintenance block, so no two bookings ever overlap.
 */
export async function seedReservations(input: SeedReservationsInput) {
  const { rooms, roomTypes, guests, customers, receptionists, managers, discounts, priceOf, from, to } = input;
  const roomTypeById = new Map(roomTypes.map((roomType) => [String(roomType._id), roomType]));

  const reservations = [];
  const roomNights = [];
  const blocks = [];
  const charges = [];
  const payments = [];
  const dirtyRooms = new Set<Types.ObjectId>();
  let sequence = 0;

  for (const room of rooms) {
    const roomType = roomTypeById.get(String(room.roomType))!;
    let cursor = addDays(from, faker.number.int({ min: 0, max: 4 }));

    while (cursor < to) {
      if (chance(0.03)) {
        const blockId = new Types.ObjectId();
        const length = faker.number.int({ min: 1, max: 3 });
        const endDay = addDays(cursor, length);
        blocks.push({
          _id: blockId,
          room: room._id,
          startDate: cursor,
          endDate: addDays(endDay, -1),
          reason: pick(ROOM_BLOCK_REASONS),
          note: pick(["Klima bakımı", "Boya badana", "Tesisat arızası", "Mobilya değişimi"]),
          createdBy: pick(managers)._id,
        });
        for (const night of eachDay(cursor, endDay)) {
          roomNights.push({ room: room._id, night, kind: "block" as const, block: blockId });
        }
        cursor = endDay;
        continue;
      }

      const checkInDay = cursor;
      const nights = faker.number.int({ min: 2, max: 10 });
      const checkOutDay = addDays(checkInDay, nights);
      cursor = addDays(checkOutDay, faker.number.int({ min: 0, max: 6 }));

      const channel = faker.helpers.weightedArrayElement([
        { weight: 45, value: RESERVATION_CHANNELS[0] },
        { weight: 35, value: RESERVATION_CHANNELS[1] },
        { weight: 20, value: RESERVATION_CHANNELS[2] },
      ]);

      // A booking can't be made in the future, so stays ahead of today were booked at least that far ahead.
      const minLead = Math.max(0, daysBetween(TODAY, checkInDay));
      const leadDays =
        channel === "reception" && chance(0.5) && minLead === 0
          ? 0
          : Math.max(minLead, faker.number.int({ min: 0, max: 150 }));
      const bookedAt = addHours(addDays(checkInDay, -leadDays), faker.number.int({ min: 6, max: 20 }));

      const boardType: BoardType = chance(0.55) ? "all_inclusive" : "full_board";
      const customer = channel === "web" ? pick(customers) : undefined;
      const primaryGuest = customer ? customer.guest! : pick(guests)._id;
      const companions = faker.helpers
        .arrayElements(guests, faker.number.int({ min: 0, max: roomType.capacity - 1 }))
        .map((guest) => guest._id)
        .filter((id) => String(id) !== String(primaryGuest));

      const nightlyRates = eachDay(checkInDay, checkOutDay).map((night) => ({
        night,
        amount: priceOf(roomType._id, boardType, night),
      }));
      const subtotal = nightlyRates.reduce((sum, rate) => sum + rate.amount, 0);
      const discount = channel === "web" ? bestDiscount(discounts, boardType, leadDays) : undefined;
      const discountAmount = discount ? money((subtotal * discount.percent) / 100) : 0;
      const total = money(subtotal - discountAmount);

      const checkIn = atHotelTime(checkInDay, CHECK_IN_HOUR);
      const checkOut = atHotelTime(checkOutDay, CHECK_OUT_HOUR);

      let status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";
      if (checkOutDay <= TODAY) {
        status = faker.helpers.weightedArrayElement([
          { weight: 93, value: "checked_out" as const },
          { weight: 4, value: "cancelled" as const },
          { weight: 3, value: "no_show" as const },
        ]);
      } else if (checkInDay < TODAY || (checkInDay.getTime() === TODAY.getTime() && chance(0.5))) {
        status = "checked_in";
      } else if (chance(0.05)) {
        status = "cancelled";
      } else {
        status = channel === "web" && chance(0.1) ? "pending" : "confirmed";
      }

      const reservationId = new Types.ObjectId();
      const checkedInAt = ["checked_in", "checked_out"].includes(status)
        ? addHours(checkIn, faker.number.float({ min: 0, max: 8 }))
        : undefined;
      const checkedOutAt =
        status === "checked_out" ? addHours(checkOut, -faker.number.float({ min: 0, max: 3 })) : undefined;
      const cancelledAt =
        status === "cancelled" ? faker.date.between({ from: bookedAt, to: checkIn < new Date() ? checkIn : new Date() }) : undefined;
      const handledBy =
        channel !== "web" || checkedInAt ? pick(receptionists)._id : undefined;

      sequence += 1;
      reservations.push({
        _id: reservationId,
        code: `BH${String(sequence).padStart(6, "0")}`,
        channel,
        status,
        room: room._id,
        roomType: roomType._id,
        boardType,
        checkIn,
        checkOut,
        nights,
        primaryGuest,
        guests: [primaryGuest, ...companions],
        bookedBy: customer?._id,
        handledBy,
        pricing: {
          currency: "TRY",
          nightlyRates,
          subtotal,
          discount: { rule: discount?._id, percent: discount?.percent ?? 0, amount: discountAmount },
          total,
        },
        checkedInAt,
        checkedOutAt,
        cancelledAt,
        createdAt: bookedAt,
        updatedAt: checkedOutAt ?? cancelledAt ?? checkedInAt ?? bookedAt,
      });

      // Cancelled and no-show stays give their nights back.
      if (status !== "cancelled" && status !== "no_show") {
        for (const { night } of nightlyRates) {
          roomNights.push({ room: room._id, night, kind: "reservation" as const, reservation: reservationId });
        }
      }

      if (checkOutDay.getTime() === TODAY.getTime() && status === "checked_out") {
        dirtyRooms.add(room._id);
      }

      let chargesTotal = 0;
      if (checkedInAt) {
        const items = CHARGE_ITEMS.filter(
          (item) =>
            (boardType === "full_board" || ALL_INCLUSIVE_EXTRAS.includes(item.category)) &&
            (item.category !== "minibar" || room.amenities?.minibar),
        );
        const stayEnd = checkedOutAt ?? new Date();
        const count = faker.number.int({ min: 0, max: boardType === "full_board" ? 6 : 2 });

        for (let i = 0; i < count; i += 1) {
          const item = pick(items);
          const quantity = faker.number.int({ min: 1, max: 3 });
          const amount = item.unitPrice * quantity;
          chargesTotal += amount;
          charges.push({
            reservation: reservationId,
            ...item,
            quantity,
            amount,
            postedAt: faker.date.between({ from: checkedInAt, to: stayEnd }),
            postedBy: pick(receptionists)._id,
          });
        }
      }

      // Web bookings pay a 30% deposit up front.
      const deposit = channel === "web" && status !== "pending" ? money(total * 0.3) : 0;
      if (deposit > 0) {
        payments.push({
          reservation: reservationId,
          kind: "deposit",
          method: "credit_card",
          amount: deposit,
          paidAt: bookedAt,
        });
      }
      if (status === "cancelled" && deposit > 0) {
        payments.push({
          reservation: reservationId,
          kind: "refund",
          method: "credit_card",
          amount: deposit,
          paidAt: cancelledAt!,
        });
      }
      if (status === "checked_out") {
        payments.push({
          reservation: reservationId,
          kind: "settlement",
          method: pick(PAYMENT_METHODS),
          amount: money(total - deposit + chargesTotal),
          paidAt: checkedOutAt!,
          receivedBy: pick(receptionists)._id,
        });
      }
    }
  }

  await RoomBlockModel.insertMany(blocks);
  const insertedReservations = await ReservationModel.insertMany(reservations);
  const insertedRoomNights = await RoomNightModel.insertMany(roomNights);
  await ChargeModel.insertMany(charges);
  await PaymentModel.insertMany(payments);
  await RoomModel.updateMany({ _id: { $in: [...dirtyRooms] } }, { $set: { housekeepingStatus: "dirty" } });

  return {
    reservations: insertedReservations,
    roomNights: insertedRoomNights,
    counts: {
      reservations: reservations.length,
      roomNights: roomNights.length,
      roomBlocks: blocks.length,
      charges: charges.length,
      payments: payments.length,
    },
  };
}
