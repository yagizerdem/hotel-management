"use client";

import { useState } from "react";
import { ShieldCheckIcon } from "lucide-react";
import { AccountNotice } from "@/src/app/booking/components/guests/account-notice";
import { GuestFields } from "@/src/app/booking/components/guests/guest-fields";
import { TextField } from "@/src/app/booking/components/text-field";
import type { ContactDetails, GuestDetails } from "@/src/app/booking/lib/types";
import {
  field,
  fieldHint,
  fieldLabel,
  primaryButton,
  textAction,
} from "@/src/app/booking/lib/ui";
import {
  contactErrors,
  guestErrors,
  hasErrors,
} from "@/src/app/booking/lib/validation";

type GuestsStepProps = {
  guests: GuestDetails[];
  contact: ContactDetails;
  onGuestsChange: (guests: GuestDetails[]) => void;
  onContactChange: (contact: ContactDetails) => void;
  onBack: () => void;
  onNext: () => void;
};

export function GuestsStep({
  guests,
  contact,
  onGuestsChange,
  onContactChange,
  onBack,
  onNext,
}: GuestsStepProps) {
  const [submitted, setSubmitted] = useState(false);
  const guestErrorList = guests.map(guestErrors);
  const contactErrorMap = contactErrors(contact);
  const invalid = guestErrorList.some(hasErrors) || hasErrors(contactErrorMap);
  const setContact = (patch: Partial<ContactDetails>) =>
    onContactChange({ ...contact, ...patch });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (!invalid) onNext();
      }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-[family-name:var(--font-bodoni)] text-3xl">
          Who is staying?
        </h2>
        <button type="button" onClick={onBack} className={textAction}>
          Change room
        </button>
      </div>

      <AccountNotice />

      <section aria-labelledby="contact-title" className="flex flex-col gap-4">
        <h3 id="contact-title" className="text-lg font-semibold">
          Contact details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            value={contact.email}
            onChange={(email) => setContact({ email })}
            error={submitted ? contactErrorMap.email : undefined}
          />
          <TextField
            label="Mobile phone"
            type="tel"
            autoComplete="tel"
            value={contact.phone}
            onChange={(phone) => setContact({ phone })}
            error={submitted ? contactErrorMap.phone : undefined}
            hint="We only call about this booking."
          />
        </div>
      </section>

      <section aria-labelledby="guests-title" className="flex flex-col gap-4">
        <div>
          <h3 id="guests-title" className="text-lg font-semibold">
            Guests
          </h3>
          <p className="mt-1 flex items-start gap-2 text-sm text-foreground/70">
            <ShieldCheckIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
            Hotels in Türkiye report each guest&apos;s identity to the
            governorship. Enter the details as they appear on the document
            you&apos;ll bring.
          </p>
        </div>
        <div className="flex flex-col gap-6 border border-border bg-popover p-5">
          {guests.map((guest, index) => (
            <GuestFields
              key={index}
              index={index}
              guest={guest}
              errors={submitted ? guestErrorList[index] : {}}
              onChange={(next) =>
                onGuestsChange(guests.map((g, i) => (i === index ? next : g)))
              }
            />
          ))}
        </div>
      </section>

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Requests (optional)</span>
        <textarea
          rows={3}
          value={contact.requests}
          onChange={(event) => setContact({ requests: event.target.value })}
          className={`${field} h-auto py-3`}
        />
        <span className={fieldHint}>
          A late arrival, a baby cot, a quiet room. We can&apos;t promise every
          request, but we&apos;ll try.
        </span>
      </label>

      {submitted && invalid && (
        <p role="alert" className="text-sm text-destructive">
          Some details are missing or need a fix. They are marked above.
        </p>
      )}

      <div className="flex justify-end border-t border-border pt-6">
        <button type="submit" className={primaryButton}>
          Continue to payment
        </button>
      </div>
    </form>
  );
}
