import { randomBytes, scryptSync } from "node:crypto";
import { fakerEN, fakerTR } from "@faker-js/faker";

export const faker = fakerTR;
export { fakerEN };

export const DAY_MS = 24 * 60 * 60 * 1000;

// Kemer is on Turkey time, which is UTC+3 all year.
export const HOTEL_UTC_OFFSET_HOURS = 3;

/**
 * Midnight UTC of the given calendar day. Room nights and other
 * date-only values are stored this way.
 */
export function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export const TODAY = startOfUtcDay(new Date());

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

/**
 * Every day from `from` up to, but not including, `to`.
 */
export function eachDay(from: Date, to: Date): Date[] {
  const days: Date[] = [];
  for (let day = from; day < to; day = addDays(day, 1)) {
    days.push(day);
  }
  return days;
}

/**
 * The instant of a wall-clock hour at the hotel on the given day.
 */
export function atHotelTime(day: Date, hour: number): Date {
  return addHours(day, hour - HOTEL_UTC_OFFSET_HOURS);
}

export function chance(probability: number): boolean {
  return faker.number.float({ min: 0, max: 1 }) < probability;
}

export function pick<T>(items: readonly T[]): T {
  return faker.helpers.arrayElement(items);
}

export function money(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * ASCII form of a name for e-mail addresses: "Gülay Aydınlık" -> "gulay.aydinlik".
 */
export function slug(...parts: string[]): string {
  return parts
    .join(".")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9.]/g, "");
}

/**
 * Random T.C. kimlik number that passes the official checksum.
 */
export function nationalId(): string {
  const digits = [
    faker.number.int({ min: 1, max: 9 }),
    ...Array.from({ length: 8 }, () => faker.number.int({ min: 0, max: 9 })),
  ];
  const odd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const even = digits[1] + digits[3] + digits[5] + digits[7];
  const tenth = (((odd * 7 - even) % 10) + 10) % 10;
  const eleventh = (digits.reduce((sum, digit) => sum + digit, 0) + tenth) % 10;
  return [...digits, tenth, eleventh].join("");
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}
