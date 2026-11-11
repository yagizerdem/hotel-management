// Static content for the public home page, taken from docs/project-scope.doc.
// Nightly prices are placeholders until the management module provides them.

export type PackageId = "full-board" | "all-inclusive";

export const hotel = {
  name: "Bilge Hotel",
  location: "Kemer, Antalya",
  phone: "+90 242 000 00 00",
  email: "reservations@bilgehotel.com",
  checkIn: "14:00",
  checkOut: "10:00",
};

export const packages: {
  id: PackageId;
  name: string;
  summary: string;
  includes: string[];
  earlyDiscount: number;
}[] = [
  {
    id: "full-board",
    name: "Full board",
    summary: "Breakfast, lunch and dinner at the hotel restaurant.",
    includes: [
      "Buffet breakfast, lunch and dinner",
      "Water, tea and coffee with meals",
      "Drinks and extras are paid at check-out",
    ],
    earlyDiscount: 16,
  },
  {
    id: "all-inclusive",
    name: "All inclusive",
    summary: "Meals, drinks and snacks are included in your stay.",
    includes: [
      "All main meals and snacks",
      "Drinks at the bar and the poolside snack bar",
      "No extras bill at check-out",
    ],
    earlyDiscount: 18,
  },
];

export const earlyBookingDiscount = {
  threeMonths: 23,
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TRY",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}
