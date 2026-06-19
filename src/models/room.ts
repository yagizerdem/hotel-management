import mongoose from "mongoose";

interface IRoom {
  _id: string;
  floor: number;
  number: string;
  type:
    | "SINGLE"
    | "DOUBLE_TWIN"
    | "DOUBLE_DUBLE"
    | "TRIPLE_SINGLE"
    | "TRIPLE_MIXED"
    | "QUAD"
    | "KING_SUITE";
  capacity: number;
  beds: {
    single: number;
    double: number;
  };
  hasBalcony: boolean;
  hasMinibar: boolean;
  hasAirConditioner: boolean;
  hasTv: boolean;
  hasHairDryer: boolean;
  hasWifi: boolean;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE" | "CLEANING";
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  description: string;
}

const roomSchema = new mongoose.Schema(
  {
    floor: { type: Number, required: true },
    number: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: [
        "SINGLE",
        "DOUBLE_TWIN",
        "DOUBLE_DUBLE",
        "TRIPLE_SINGLE",
        "TRIPLE_MIXED",
        "QUAD",
        "KING_SUITE",
      ],
      required: true,
    },
    capacity: { type: Number, required: true },
    beds: {
      single: { type: Number, default: 0 },
      double: { type: Number, default: 0 },
    },
    hasBalcony: { type: Boolean, default: false },
    hasMinibar: { type: Boolean, default: false },
    hasAirConditioner: { type: Boolean, default: true },
    hasTv: { type: Boolean, default: true },
    hasHairDryer: { type: Boolean, default: true },
    hasWifi: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED", "RESERVED", "MAINTENANCE", "CLEANING"],
      default: "AVAILABLE",
    },
    isActive: { type: Boolean, default: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export { Room };

export type { IRoom };
