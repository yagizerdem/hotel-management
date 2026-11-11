import EmployeeModel, { EMPLOYEE_POSITIONS, type EmployeeDocument } from "@models/employee";
import PayrollModel from "@models/payroll";
import ShiftAssignmentModel, { SHIFT_HOURS, type Shift } from "@models/shift-assignment";
import UserModel, { type UserRole } from "@models/user";
import { DAY_MS, addDays, atHotelTime, chance, eachDay, faker, hashPassword, money, nationalId, slug } from "@seeder/utils";

type Position = (typeof EMPLOYEE_POSITIONS)[number];

// Head count from the project scope, plus the three managers interviewed.
const HEAD_COUNT: Record<Position, number> = {
  receptionist: 7,
  housekeeper: 11,
  cook: 11,
  waiter: 13,
  electrician: 1,
  it_specialist: 1,
  manager: 3,
};

// People named in the project scope.
const NAMED_STAFF: Partial<Record<Position, { firstName: string; lastName: string }[]>> = {
  manager: [
    { firstName: "Sakıp", lastName: "Bilge" },
    { firstName: "Selahattin", lastName: "Alkomut" },
    { firstName: "Levent", lastName: "Sişarpsoy" },
  ],
  receptionist: [{ firstName: "Gülay", lastName: "Aydınlık" }],
  it_specialist: [{ firstName: "Selahattin", lastName: "Karadibag" }],
};

const HOURLY_WAGE_RANGES: Record<Exclude<Position, "manager">, [number, number]> = {
  receptionist: [220, 260],
  housekeeper: [170, 200],
  cook: [230, 300],
  waiter: [180, 220],
  electrician: [250, 280],
  it_specialist: [290, 330],
};

const USER_ROLES_BY_POSITION: Partial<Record<Position, UserRole>> = {
  manager: "manager",
  receptionist: "receptionist",
  it_specialist: "it_admin",
};

const OFFICE_POSITIONS: Position[] = ["electrician", "it_specialist"];
const TWO_SHIFT_POSITIONS: Position[] = ["housekeeper", "cook", "waiter"];

export async function seedEmployees() {
  const employees = EMPLOYEE_POSITIONS.flatMap((position) =>
    Array.from({ length: HEAD_COUNT[position] }, (_, index) => {
      const named = NAMED_STAFF[position]?.[index];
      const firstName = named?.firstName ?? faker.person.firstName();
      const lastName = named?.lastName ?? faker.person.lastName();
      const isManager = position === "manager";

      return {
        firstName,
        lastName,
        nationalId: nationalId(),
        phone: faker.phone.number(),
        email: `${slug(firstName, lastName)}@bilgehotel.com`,
        address: `${faker.location.streetAddress()}, Kemer, Antalya`,
        position,
        payType: isManager ? ("monthly" as const) : ("hourly" as const),
        hourlyWage: isManager ? undefined : faker.number.int({ min: HOURLY_WAGE_RANGES[position][0], max: HOURLY_WAGE_RANGES[position][1] }),
        monthlySalary: isManager ? faker.number.int({ min: 90, max: 160 }) * 1000 : undefined,
        // Receptionists take turns so that one of the seven is off each day.
        // Office staff are off on Sunday.
        weeklyDayOff:
          position === "receptionist"
            ? index
            : OFFICE_POSITIONS.includes(position)
              ? 0
              : faker.number.int({ min: 0, max: 6 }),
        hiredAt: faker.date.past({ years: 8 }),
      };
    }),
  );

  return EmployeeModel.insertMany(employees);
}

/**
 * Accounts for managers, receptionists and IT. Other staff do not use the system.
 */
export async function seedStaffUsers(employees: EmployeeDocument[], password: string) {
  const passwordHash = hashPassword(password);
  const users = employees.flatMap((employee) => {
    const role = USER_ROLES_BY_POSITION[employee.position];
    if (!role) return [];
    return [
      {
        email: employee.email!,
        passwordHash,
        role,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        emailVerifiedAt: employee.hiredAt,
        employee: employee._id,
      },
    ];
  });

  return UserModel.insertMany(users);
}

function weekIndex(day: Date): number {
  return Math.floor(day.getTime() / DAY_MS / 7);
}

function shiftTimes(day: Date, shift: Shift) {
  const { start, end } = SHIFT_HOURS[shift];
  return { startsAt: atHotelTime(day, start), endsAt: atHotelTime(day, end) };
}

/**
 * Shifts follow the scope: two receptionists on each of the three shifts,
 * the kitchen, housekeeping and service staff on the morning or evening
 * shift, and office hours for the electrician and IT.
 */
export async function seedShifts(employees: EmployeeDocument[], from: Date, to: Date) {
  const byPosition = (position: Position) => employees.filter((employee) => employee.position === position);
  const receptionists = byPosition("receptionist");
  const assignments = [];

  for (const day of eachDay(from, to)) {
    const weekday = day.getUTCDay();
    const week = weekIndex(day);

    const onDuty = receptionists.filter((employee) => employee.weeklyDayOff !== weekday);
    onDuty.forEach((employee, index) => {
      const shift = (["morning", "evening", "night"] as const)[(index + week) % 3];
      assignments.push({ employee: employee._id, date: day, shift, ...shiftTimes(day, shift) });
    });

    for (const position of TWO_SHIFT_POSITIONS) {
      byPosition(position).forEach((employee, index) => {
        if (employee.weeklyDayOff === weekday) return;
        const shift = (index + week) % 2 === 0 ? "morning" : "evening";
        assignments.push({ employee: employee._id, date: day, shift, ...shiftTimes(day, shift) });
      });
    }

    for (const position of OFFICE_POSITIONS) {
      for (const employee of byPosition(position)) {
        if (employee.weeklyDayOff === weekday) continue;
        const office = shiftTimes(day, "office");
        assignments.push({ employee: employee._id, date: day, shift: "office", ...office });

        if (chance(0.12)) {
          const hours = faker.number.int({ min: 1, max: 3 });
          assignments.push({
            employee: employee._id,
            date: day,
            shift: "office",
            startsAt: office.endsAt,
            endsAt: new Date(office.endsAt.getTime() + hours * 60 * 60 * 1000),
            isOvertime: true,
            note: faker.helpers.arrayElement(["Arıza bakımı", "Sistem güncellemesi", "Yedekleme", "Acil çağrı"]),
          });
        }
      }
    }
  }

  return ShiftAssignmentModel.insertMany(assignments);
}

type ShiftHours = { employee: unknown; date: Date; startsAt: Date; endsAt: Date; isOvertime?: boolean | null };

/**
 * Payroll for each finished month. Hourly pay comes from the seeded shifts.
 */
export async function seedPayrolls(employees: EmployeeDocument[], shifts: ShiftHours[], months: Date[]) {
  const payrolls = months.flatMap((monthStart, monthIndex) => {
    const nextMonthStart = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1));
    const isLatest = monthIndex === months.length - 1;

    return employees.map((employee) => {
      let regularHours = 0;
      let overtimeHours = 0;
      for (const shift of shifts) {
        if (String(shift.employee) !== String(employee._id)) continue;
        if (shift.date < monthStart || shift.date >= nextMonthStart) continue;
        const hours = (shift.endsAt.getTime() - shift.startsAt.getTime()) / (60 * 60 * 1000);
        if (shift.isOvertime) overtimeHours += hours;
        else regularHours += hours;
      }

      const grossAmount =
        employee.payType === "monthly"
          ? employee.monthlySalary!
          : money((regularHours + overtimeHours) * employee.hourlyWage!);

      return {
        employee: employee._id,
        year: monthStart.getUTCFullYear(),
        month: monthStart.getUTCMonth() + 1,
        payType: employee.payType,
        regularHours,
        overtimeHours,
        hourlyWage: employee.hourlyWage ?? undefined,
        monthlySalary: employee.monthlySalary ?? undefined,
        grossAmount,
        status: isLatest ? "approved" : "paid",
        paidAt: isLatest ? undefined : addDays(nextMonthStart, 4),
      };
    });
  });

  return PayrollModel.insertMany(payrolls);
}
