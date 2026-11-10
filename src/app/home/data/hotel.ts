// Static content for the public home page, taken from docs/project-scope.doc.
// Nightly prices are placeholders until the management module provides them.

export type PackageId = "full-board" | "all-inclusive";

export type RoomType = {
  id: string;
  name: string;
  beds: string;
  capacity: number;
  count: number;
  nightlyPrice: number;
  minibar: boolean;
};

export type Floor = {
  level: number;
  balcony: boolean;
  image: string;
  rooms: RoomType[];
};

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

export const floors: Floor[] = [
  {
    level: 4,
    balcony: true,
    image: "/images/hotels/suite-1.jpg",
    rooms: [
      {
        id: "f4-double",
        name: "Double room",
        beds: "One double bed",
        capacity: 2,
        count: 10,
        nightlyPrice: 4800,
        minibar: true,
      },
      {
        id: "f4-quad",
        name: "Quadruple room",
        beds: "One double and two single beds",
        capacity: 4,
        count: 6,
        nightlyPrice: 7400,
        minibar: true,
      },
      {
        id: "f4-king",
        name: "King suite",
        beds: "Living room and a large bedroom",
        capacity: 4,
        count: 1,
        nightlyPrice: 18500,
        minibar: true,
      },
    ],
  },
  {
    level: 3,
    balcony: true,
    image: "/images/hotels/room-3.jpg",
    rooms: [
      {
        id: "f3-double",
        name: "Double room",
        beds: "One double bed",
        capacity: 2,
        count: 10,
        nightlyPrice: 4600,
        minibar: true,
      },
      {
        id: "f3-triple",
        name: "Triple room",
        beds: "One double and one single bed",
        capacity: 3,
        count: 10,
        nightlyPrice: 5900,
        minibar: true,
      },
    ],
  },
  {
    level: 2,
    balcony: false,
    image: "/images/hotels/room-2.jpg",
    rooms: [
      {
        id: "f2-single",
        name: "Single room",
        beds: "One single bed",
        capacity: 1,
        count: 10,
        nightlyPrice: 2900,
        minibar: false,
      },
      {
        id: "f2-twin",
        name: "Twin room",
        beds: "Two single beds",
        capacity: 2,
        count: 10,
        nightlyPrice: 4200,
        minibar: true,
      },
    ],
  },
  {
    level: 1,
    balcony: false,
    image: "/images/hotels/room-1.jpg",
    rooms: [
      {
        id: "f1-single",
        name: "Single room",
        beds: "One single bed",
        capacity: 1,
        count: 10,
        nightlyPrice: 2800,
        minibar: false,
      },
      {
        id: "f1-triple",
        name: "Triple room",
        beds: "Three single beds",
        capacity: 3,
        count: 10,
        nightlyPrice: 5400,
        minibar: true,
      },
    ],
  },
];

export const navLinks = [
  { href: "#rooms", label: "Rooms" },
  { href: "#packages", label: "Packages" },
  { href: "#amenities", label: "Amenities" },
  { href: "#early-booking", label: "Early booking" },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TRY",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}
