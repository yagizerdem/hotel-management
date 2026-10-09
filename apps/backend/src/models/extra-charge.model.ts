import { Schema, model, type InferSchemaType } from "mongoose";
import { ExtraChargeCategory } from "./enums.js";

const extraChargeSchema = new Schema(
  {
    reservation: { type: Schema.Types.ObjectId, ref: "Reservation", required: true },
    category: { type: String, enum: Object.values(ExtraChargeCategory), required: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    chargedAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

extraChargeSchema.virtual("total").get(function () {
  return this.quantity * this.unitPrice;
});

extraChargeSchema.index({ reservation: 1 });

export type ExtraCharge = InferSchemaType<typeof extraChargeSchema>;
export const ExtraChargeModel = model("ExtraCharge", extraChargeSchema);
