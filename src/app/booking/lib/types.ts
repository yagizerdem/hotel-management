import type { PackageId } from "@/src/app/home/data/sd";

export type BookingStep = "stay" | "room" | "guests" | "review";

export type StayDetails = {
  /** yyyy-mm-dd, as the date inputs give it. */
  checkIn: string;
  checkOut: string;
  guests: number;
  packageId: PackageId;
};

export type GuestDetails = {
  firstName: string;
  lastName: string;
  nationality: "TR" | "other";
  /** T.C. identity number, for Turkish citizens. */
  nationalId: string;
  /** For everyone else. */
  passportNumber: string;
  country: string;
};

export type ContactDetails = {
  email: string;
  phone: string;
  requests: string;
};

export type PaymentMethod = "card" | "bank_transfer";

export type PaymentDetails = {
  method: PaymentMethod;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  acceptTerms: boolean;
};

export type Quote = {
  nights: number;
  subtotal: number;
  discountPercent: number;
  discount: number;
  total: number;
  currency: string;
};
