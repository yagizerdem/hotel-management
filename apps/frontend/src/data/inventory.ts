import { Award, DoorOpen, Droplets, Users, Wrench, type LucideIcon } from 'lucide-react'

export type Stat = { text: string; cls?: string }

export type RoomFeature = { icon?: LucideIcon; text?: string; title?: string }

export type InventoryCard =
  | {
      kind: 'room'
      number: string
      royal?: string
      icon?: LucideIcon
      type?: string
      name: string
      nameStrong?: boolean
      features: RoomFeature[]
      footBg: string
      guest: string
      guestCls?: string
      dot: string
      dotTitle?: string
      left: string
      leftCls?: string
      right: string
      rightCls?: string
    }
  | {
      kind: 'fault'
      number: string
      badge: string
      name: string
      icon: LucideIcon
      detail: string
      title: string
      left: string
      right: string
    }
  | { kind: 'range'; range: string; description: string; occupancy: string; action: string }

export type InventoryFloor = {
  label: string
  title: string
  description: string
  stats: Stat[]
  cards: InventoryCard[]
}

export const inventoryFloors: InventoryFloor[] = [
  {
    label: "FLOOR 04",
    title: "4th Floor • Suite & Deluxe Wing",
    description: "17 Rooms: 1 Royal Suite, 6 Quad, 10 Double with Balcony",
    stats: [
      {
        text: "14 Occupied",
        cls: "text-secondary font-medium"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "2 Available",
        cls: "text-on-secondary-container"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 Cleaning",
        cls: "text-on-tertiary-container"
      }
    ],
    cards: [
      {
        kind: "room",
        number: "401",
        royal: "ROYAL",
        icon: Award,
        name: "Royal Suite Terrace",
        nameStrong: true,
        features: [
          {
            icon: DoorOpen,
            text: "Akdeniz",
            title: "Balcony"
          },
          {
            icon: Users,
            text: "4",
            title: "4 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "M. Weber (VIP)",
        guestCls: "text-primary font-semibold",
        dot: "bg-secondary",
        dotTitle: "Occupied",
        left: "Checked In",
        leftCls: "text-secondary font-medium",
        right: "MB: Full",
        rightCls: "text-on-secondary-container"
      },
      {
        kind: "room",
        number: "402",
        type: "QUAD",
        name: "Family Deluxe",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "4 Persons"
          }
        ],
        footBg: "bg-surface-container",
        guest: "AVAILABLE & CLEAN",
        guestCls: "text-on-secondary-container font-semibold",
        dot: "bg-on-secondary-container",
        left: "Cleaned (10:45)",
        right: "MB: Check"
      },
      {
        kind: "room",
        number: "403",
        type: "QUAD",
        name: "Family Deluxe",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "4 Persons"
          }
        ],
        footBg: "bg-tertiary-fixed/30",
        guest: "DIRTY / QUEUED",
        guestCls: "text-on-tertiary-fixed-variant font-bold",
        dot: "bg-on-tertiary-container animate-pulse",
        left: "Check-out: 11:00",
        right: "Awaiting Attendant"
      },
      {
        kind: "room",
        number: "404",
        type: "QUAD",
        name: "Family Deluxe",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "4 Guests"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "A. Müller",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied (Night 3)",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "405",
        type: "QUAD",
        name: "Family Deluxe",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "4 Guests"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "C. Dupont",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "406",
        type: "QUAD",
        name: "Family Deluxe",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "4 Guests"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "J. Smith",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "407",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "H. Demir",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Missing"
      },
      {
        kind: "room",
        number: "408",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "R. Novak",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "409",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "K. Lindner",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "410",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "E. Yılmaz",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "411",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "AVAILABLE & CLEAN",
        guestCls: "text-on-secondary-container font-semibold",
        dot: "bg-on-secondary-container",
        left: "Clean",
        right: "MB: Stocked"
      },
      {
        kind: "room",
        number: "412",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "P. Bianchi",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "413",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "G. Rossi",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "414",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "N. Varga",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "415",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "B. Kaya",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "416",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "S. Johansson",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "417",
        type: "DOUBLE BALCONY",
        name: "Double",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "O. Çelik",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      }
    ]
  },
  {
    label: "FLOOR 03",
    title: "3rd Floor • Balcony Superior Wing",
    description: "20 Rooms: 10 Double with Balcony (301-310), 10 Triple with Balcony - 1 Double + 1 Single (311-320)",
    stats: [
      {
        text: "17 Occupied",
        cls: "text-secondary font-medium"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 Available",
        cls: "text-on-secondary-container"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 Cleaning",
        cls: "text-on-tertiary-container"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 Out of Order (Room 312)",
        cls: "text-error font-bold"
      }
    ],
    cards: [
      {
        kind: "room",
        number: "301",
        type: "DOUBLE BALCONY",
        name: "2 Persons Balcony",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "T. Hansen",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "302",
        type: "DOUBLE BALCONY",
        name: "2 Persons Balcony",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "D. Kowalski",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "303",
        type: "DOUBLE BALCONY",
        name: "2 Persons Balcony",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container",
        guest: "AVAILABLE & CLEAN",
        guestCls: "text-on-secondary-container font-semibold",
        dot: "bg-on-secondary-container",
        left: "Clean",
        right: "MB: Stocked"
      },
      {
        kind: "room",
        number: "304",
        type: "DOUBLE BALCONY",
        name: "2 Persons Balcony",
        features: [
          {
            icon: DoorOpen
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-tertiary-fixed/30",
        guest: "AWAITING CLEANING",
        guestCls: "text-on-tertiary-fixed-variant font-bold",
        dot: "bg-on-tertiary-container",
        left: "Housekeeping",
        right: "MB: Restock Needed"
      },
      {
        kind: "fault",
        number: "312",
        badge: "OUT OF ORDER",
        name: "Triple Balcony",
        detail: "1 Double + 1 Single",
        icon: Wrench,
        title: "A/C MOTOR FAULT",
        left: "Technician On the Way",
        right: "14:00 Estimate"
      },
      {
        kind: "range",
        range: "305 - 311 & 313-320",
        description: "15 Rooms Occupied / Active Reservations",
        occupancy: "100% Occupancy",
        action: "View Details"
      }
    ]
  },
  {
    label: "FLOOR 02",
    title: "2nd Floor • Standard & Twin Wing",
    description: "20 Rooms: 10 Single (201-210), 10 Twin - 2 Single Beds (211-220)",
    stats: [
      {
        text: "16 Occupied",
        cls: "text-secondary font-medium"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "3 Available",
        cls: "text-on-secondary-container"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 Cleaning",
        cls: "text-on-tertiary-container"
      }
    ],
    cards: [
      {
        kind: "room",
        number: "201",
        type: "SINGLE",
        name: "Standard Single",
        features: [
          {
            text: "1 Single Bed"
          },
          {
            text: "1 Person"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "M. Aydın",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "202",
        type: "SINGLE",
        name: "Standard Single",
        features: [
          {
            text: "1 Single Bed"
          },
          {
            text: "1 Person"
          }
        ],
        footBg: "bg-surface-container",
        guest: "AVAILABLE & CLEAN",
        guestCls: "text-on-secondary-container font-semibold",
        dot: "bg-on-secondary-container",
        left: "Ready",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "211",
        type: "TWIN (2 BEDS)",
        name: "Standart Twin",
        features: [
          {
            text: "2 Single Beds"
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "J. & P. Becker",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "212",
        type: "TWIN (2 BEDS)",
        name: "Standart Twin",
        features: [
          {
            text: "2 Single Beds"
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "L. Moreau",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "213",
        type: "TWIN (2 BEDS)",
        name: "Standart Twin",
        features: [
          {
            text: "2 Single Beds"
          },
          {
            text: "2 Persons"
          }
        ],
        footBg: "bg-surface-container",
        guest: "AVAILABLE & CLEAN",
        guestCls: "text-on-secondary-container font-semibold",
        dot: "bg-on-secondary-container",
        left: "Ready",
        right: "MB: Full"
      },
      {
        kind: "range",
        range: "Other Rooms (15)",
        description: "14 Occupied, 1 Being Cleaned",
        occupancy: "203-210 & 214-220",
        action: "List"
      }
    ]
  },
  {
    label: "FLOOR 01",
    title: "1st Floor • Garden & Entrance Wing",
    description: "20 Rooms: 10 Single (101-110), 10 Triple - 3 Single Beds (111-120)",
    stats: [
      {
        text: "15 Occupied",
        cls: "text-secondary font-medium"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "3 Available",
        cls: "text-on-secondary-container"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 Cleaning",
        cls: "text-on-tertiary-container"
      },
      {
        text: "/",
        cls: "text-outline"
      },
      {
        text: "1 In Maintenance (Room 105)",
        cls: "text-error font-bold"
      }
    ],
    cards: [
      {
        kind: "room",
        number: "101",
        type: "SINGLE",
        name: "Garden Side",
        features: [
          {
            text: "1 Single Bed"
          },
          {
            text: "1 Person"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "A. Yıldırım",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "fault",
        number: "105",
        badge: "MAINTENANCE",
        name: "Single",
        detail: "Plumbing",
        icon: Droplets,
        title: "BATHROOM FAUCET REPLACEMENT",
        left: "Blocked",
        right: "To Be Completed Today"
      },
      {
        kind: "room",
        number: "111",
        type: "3 SINGLE BEDS",
        name: "Triple Garden",
        features: [
          {
            text: "3 Single Beds"
          },
          {
            text: "3 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "K. Demir & Ark.",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Missing"
      },
      {
        kind: "room",
        number: "112",
        type: "3 SINGLE BEDS",
        name: "Triple Garden",
        features: [
          {
            text: "3 Single Beds"
          },
          {
            text: "3 Persons"
          }
        ],
        footBg: "bg-surface-container",
        guest: "AVAILABLE & CLEAN",
        guestCls: "text-on-secondary-container font-semibold",
        dot: "bg-on-secondary-container",
        left: "Open for Sale",
        right: "MB: Full"
      },
      {
        kind: "room",
        number: "113",
        type: "3 SINGLE BEDS",
        name: "Triple Garden",
        features: [
          {
            text: "3 Single Beds"
          },
          {
            text: "3 Persons"
          }
        ],
        footBg: "bg-surface-container-low",
        guest: "F. Richter",
        guestCls: "text-primary",
        dot: "bg-primary",
        left: "Occupied",
        right: "MB: Full"
      },
      {
        kind: "range",
        range: "Remaining 15 Rooms",
        description: "102-104, 106-110, 114-120",
        occupancy: "13 Occupied / 2 Available",
        action: "Expand"
      }
    ]
  }
]
