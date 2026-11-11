import { z } from "zod";

// Same values as BOARD_TYPES in @models/room-rate. Kept here so the schema
// can run in the browser without pulling in mongoose.
const BOARD_TYPES = ["full_board", "all_inclusive"] as const;

const DATE_MESSAGE = "Use a date in the form YYYY-MM-DD";

/** A YYYY-MM-DD date as midnight UTC, the way room nights are stored. */
const day = (message: string) =>
  z
    .string({ error: message })
    .pipe(z.iso.date({ error: DATE_MESSAGE }))
    .transform((value) => new Date(`${value}T00:00:00.000Z`));

/**
 * Query string of an availability search. The board type also takes the
 * home page's package ids, so "full-board" means "full_board".
 */
export function getAvailableRoomsSchema() {
  return z
    .object({
      checkIn: day("Choose a check-in date"),
      checkOut: day("Choose a check-out date"),
      guests: z.coerce
        .number({ error: "Enter the number of guests" })
        .int({ error: "Enter a whole number of guests" })
        .min(1, { error: "At least one guest has to stay" }),
      boardType: z.preprocess(
        (value) => (typeof value === "string" ? value.replace("-", "_") : value),
        z.enum(BOARD_TYPES, {
          error: "Choose full board or all inclusive",
        }),
      ),
    })
    .refine(
      ({ checkIn }) => {
        const now = new Date();
        const today = Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
        );
        return checkIn.getTime() >= today;
      },
      { error: "Check-in date can't be in the past", path: ["checkIn"] },
    )
    .refine(({ checkIn, checkOut }) => checkOut > checkIn, {
      error: "Check-out must be at least one day after check-in",
      path: ["checkOut"],
    });
}

export type AvailableRoomsQuery = z.infer<
  ReturnType<typeof getAvailableRoomsSchema>
>;
