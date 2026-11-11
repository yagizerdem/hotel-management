import { TextField } from "@/src/app/booking/components/text-field";
import type { GuestDetails } from "@/src/app/booking/lib/types";
import type { Errors } from "@/src/app/booking/lib/validation";

type GuestFieldsProps = {
  index: number;
  guest: GuestDetails;
  errors: Errors<GuestDetails>;
  onChange: (guest: GuestDetails) => void;
};

/** Name and identity document of one guest. */
export function GuestFields({
  index,
  guest,
  errors,
  onChange,
}: GuestFieldsProps) {
  const set = (patch: Partial<GuestDetails>) =>
    onChange({ ...guest, ...patch });
  const name = `nationality-${index}`;

  return (
    <fieldset className="flex flex-col gap-4 border-t border-border pt-6 first:border-t-0 first:pt-0">
      <legend className="sr-only">Guest {index + 1}</legend>
      <p aria-hidden className="font-medium">
        {index === 0 ? "Guest 1 (you)" : `Guest ${index + 1}`}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          value={guest.firstName}
          onChange={(firstName) => set({ firstName })}
          error={errors.firstName}
          autoComplete={index === 0 ? "given-name" : "off"}
        />
        <TextField
          label="Last name"
          value={guest.lastName}
          onChange={(lastName) => set({ lastName })}
          error={errors.lastName}
          autoComplete={index === 0 ? "family-name" : "off"}
        />
      </div>

      <div
        role="radiogroup"
        aria-label="Identity document"
        className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
      >
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            checked={guest.nationality === "TR"}
            onChange={() => set({ nationality: "TR" })}
            className="size-4 accent-[var(--secondary)]"
          />
          Turkish citizen (T.C. identity number)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            checked={guest.nationality === "other"}
            onChange={() => set({ nationality: "other" })}
            className="size-4 accent-[var(--secondary)]"
          />
          Another nationality (passport)
        </label>
      </div>

      {guest.nationality === "TR" ? (
        <TextField
          label="T.C. identity number"
          inputMode="numeric"
          maxLength={11}
          value={guest.nationalId}
          onChange={(value) => set({ nationalId: value.replace(/\D/g, "") })}
          error={errors.nationalId}
          hint="11 digits, as on the identity card. If it isn't on the card, reception can look it up at check-in."
          className="sm:max-w-xs"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Passport number"
            value={guest.passportNumber}
            onChange={(passportNumber) =>
              set({ passportNumber: passportNumber.toUpperCase() })
            }
            error={errors.passportNumber}
          />
          <TextField
            label="Country of the passport"
            value={guest.country}
            onChange={(country) => set({ country })}
            error={errors.country}
            autoComplete={index === 0 ? "country-name" : "off"}
          />
        </div>
      )}
    </fieldset>
  );
}
