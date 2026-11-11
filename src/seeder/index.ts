import mongoose from "mongoose";
import dbConnect from "@lib/db";
import { seedAuthorityReports } from "@seeder/authority-reports";
import { seedCustomers, seedGuests } from "@seeder/guests";
import {
  seedEarlyBookingDiscounts,
  seedExchangeRates,
  seedRoomRates,
} from "@seeder/pricing";
import { seedReservations } from "@seeder/reservations";
import { seedRooms } from "@seeder/rooms";
import {
  seedEmployees,
  seedPayrolls,
  seedShifts,
  seedStaffUsers,
} from "@seeder/staff";
import { TODAY, addDays, faker, fakerEN } from "@seeder/utils";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../.env"),
});

// Same seed, same data on every run.
const FAKER_SEED = 2026;

// Every seeded account (staff and customers) gets this password.
const SEED_PASSWORD = "BilgeHotel123!";

const GUEST_COUNT = 400;
const CUSTOMER_COUNT = 120;

// Stays run from six months ago to four months ahead, the window managers set prices for.
const HISTORY_DAYS = 180;
const FUTURE_DAYS = 120;
const AUTHORITY_REPORT_DAYS = 30;

/**
 * Removes every document from the collections the app owns and rebuilds
 * their indexes, so unique indexes are in place before the inserts.
 */
async function resetDatabase() {
  for (const name of mongoose.modelNames()) {
    const model = mongoose.model(name);
    await model.deleteMany({});
    await model.syncIndexes();
  }
}

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to seed: NODE_ENV is production");
  }

  faker.seed(FAKER_SEED);
  fakerEN.seed(FAKER_SEED);

  await dbConnect();
  console.log(`Seeding ${mongoose.connection.name}...`);
  await resetDatabase();

  const from = addDays(TODAY, -HISTORY_DAYS);
  const to = addDays(TODAY, FUTURE_DAYS);

  const { roomTypes, rooms } = await seedRooms();

  const employees = await seedEmployees();
  const staffUsers = await seedStaffUsers(employees, SEED_PASSWORD);
  const managers = employees.filter(
    (employee) => employee.position === "manager",
  );
  const receptionists = employees.filter(
    (employee) => employee.position === "receptionist",
  );

  const { count: roomRateCount, priceOf } = await seedRoomRates(
    roomTypes,
    from,
    to,
    managers[0]._id,
  );
  const discounts = await seedEarlyBookingDiscounts();
  const exchangeRates = await seedExchangeRates(from, TODAY);

  const guests = await seedGuests(GUEST_COUNT);
  const customers = await seedCustomers(
    guests.slice(0, CUSTOMER_COUNT),
    SEED_PASSWORD,
  );

  const { reservations, roomNights, counts } = await seedReservations({
    rooms,
    roomTypes,
    guests,
    customers,
    receptionists,
    managers,
    discounts,
    priceOf,
    from,
    to,
  });

  const authorityReports = await seedAuthorityReports({
    days: AUTHORITY_REPORT_DAYS,
    rooms,
    guests,
    reservations,
    roomNights,
  });

  // Shifts for the last two full months and the current month so far, payroll for the full months.
  const payrollMonths = [2, 1].map(
    (monthsAgo) =>
      new Date(
        Date.UTC(TODAY.getUTCFullYear(), TODAY.getUTCMonth() - monthsAgo, 1),
      ),
  );
  const shifts = await seedShifts(employees, payrollMonths[0], TODAY);
  const payrolls = await seedPayrolls(employees, shifts, payrollMonths);

  console.table({
    roomTypes: roomTypes.length,
    rooms: rooms.length,
    employees: employees.length,
    staffUsers: staffUsers.length,
    roomRates: roomRateCount,
    earlyBookingDiscounts: discounts.length,
    exchangeRates: exchangeRates.length,
    guests: guests.length,
    customers: customers.length,
    ...counts,
    authorityReports: authorityReports.length,
    shiftAssignments: shifts.length,
    payrolls: payrolls.length,
  });
  console.log(`All accounts use the password "${SEED_PASSWORD}".`);
}

// main()
//   .catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
//   })
//   .finally(() => mongoose.disconnect());
