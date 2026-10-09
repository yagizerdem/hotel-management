import { Schema, model, type InferSchemaType } from "mongoose";
import { BoardType, Currency, RoomType } from "./enums.js";

const pricingSchema = new Schema(
  {
    roomType: { type: String, enum: Object.values(RoomType), required: true },
    boardType: { type: String, enum: Object.values(BoardType), required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    nightlyPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: Object.values(Currency), default: Currency.TRY },
  },
  { timestamps: true },
);

pricingSchema.pre("validate", function () {
  if (this.endDate < this.startDate) {
    this.invalidate("endDate", "endDate must not be before startDate");
  }
});

pricingSchema.index({ roomType: 1, boardType: 1, startDate: 1, endDate: 1 });

export type Pricing = InferSchemaType<typeof pricingSchema>;
export const PricingModel = model("Pricing", pricingSchema);
