import { Schema, model, type InferSchemaType } from "mongoose";
import { BoardType } from "./enums.js";

const discountRuleSchema = new Schema(
  {
    boardType: { type: String, enum: Object.values(BoardType) },
    minDaysInAdvance: { type: Number, required: true, min: 0 },
    ratePercent: { type: Number, required: true, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type DiscountRule = InferSchemaType<typeof discountRuleSchema>;
export const DiscountRuleModel = model("DiscountRule", discountRuleSchema);
