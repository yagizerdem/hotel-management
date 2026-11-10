import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

/**
 * A person who stays at the hotel. Kept apart from User because guests
 * booked at the reception desk do not need a web account.
 */
const guestSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    nationalId: { type: String, trim: true, match: /^\d{11}$/ },
    passportNumber: { type: String, trim: true },
    nationality: { type: String, required: true, uppercase: true, default: "TR" },
    gender: { type: String, enum: ["female", "male", "other"] },
    birthDate: { type: Date },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

guestSchema.index(
  { nationalId: 1 },
  { unique: true, partialFilterExpression: { nationalId: { $type: "string" } } },
);
guestSchema.index({ lastName: 1, firstName: 1 });

export type Guest = InferSchemaType<typeof guestSchema>;
export type GuestDocument = HydratedDocument<Guest>;

const GuestModel: Model<Guest> = models.Guest ?? model("Guest", guestSchema);

export default GuestModel;
