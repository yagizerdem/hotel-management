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
  email: "rezervasyon@bilgehotel.com",
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
    name: "Tam pansiyon",
    summary: "Sabah, öğle ve akşam yemekleri otelin restoranında.",
    includes: [
      "Açık büfe kahvaltı, öğle ve akşam yemeği",
      "Yemeklerde su, çay ve kahve",
      "İçecek ve ekstra harcamalar çıkışta ödenir",
    ],
    earlyDiscount: 16,
  },
  {
    id: "all-inclusive",
    name: "Her şey dahil",
    summary: "Yemekler, içecekler ve ara öğünler konaklamaya dahil.",
    includes: [
      "Tüm ana öğünler ve ara öğünler",
      "Bar ve havuzbaşı snack bar içecekleri",
      "Çıkışta ekstra harcama hesabı yok",
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
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    rooms: [
      {
        id: "f4-double",
        name: "Duble oda",
        beds: "Bir duble yatak",
        capacity: 2,
        count: 10,
        nightlyPrice: 4800,
        minibar: true,
      },
      {
        id: "f4-quad",
        name: "Dört kişilik oda",
        beds: "Bir duble, iki tek yatak",
        capacity: 4,
        count: 6,
        nightlyPrice: 7400,
        minibar: true,
      },
      {
        id: "f4-king",
        name: "Kral dairesi",
        beds: "Salon ve geniş yatak odası",
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
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    rooms: [
      {
        id: "f3-double",
        name: "Duble oda",
        beds: "Bir duble yatak",
        capacity: 2,
        count: 10,
        nightlyPrice: 4600,
        minibar: true,
      },
      {
        id: "f3-triple",
        name: "Üç kişilik oda",
        beds: "Bir duble, bir tek yatak",
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
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    rooms: [
      {
        id: "f2-single",
        name: "Tek kişilik oda",
        beds: "Bir tek yatak",
        capacity: 1,
        count: 10,
        nightlyPrice: 2900,
        minibar: false,
      },
      {
        id: "f2-twin",
        name: "İki kişilik oda",
        beds: "İki tek yatak",
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
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    rooms: [
      {
        id: "f1-single",
        name: "Tek kişilik oda",
        beds: "Bir tek yatak",
        capacity: 1,
        count: 10,
        nightlyPrice: 2800,
        minibar: false,
      },
      {
        id: "f1-triple",
        name: "Üç kişilik oda",
        beds: "Üç tek yatak",
        capacity: 3,
        count: 10,
        nightlyPrice: 5400,
        minibar: true,
      },
    ],
  },
];

export const navLinks = [
  { href: "#odalar", label: "Odalar" },
  { href: "#paketler", label: "Paketler" },
  { href: "#olanaklar", label: "Olanaklar" },
  { href: "#erken-rezervasyon", label: "Erken rezervasyon" },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}
