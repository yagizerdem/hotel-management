"use client";

import { useState } from "react";
import { PaymentFields } from "@/src/app/booking/components/review/payment-fields";
import type {
  ContactDetails,
  GuestDetails,
  PaymentDetails,
} from "@/src/app/booking/lib/types";
import { primaryButton, textAction } from "@/src/app/booking/lib/ui";
import { hasErrors, paymentErrors } from "@/src/app/booking/lib/validation";

type ReviewStepProps = {
  guests: GuestDetails[];
  contact: ContactDetails;
  payment: PaymentDetails;
  onPaymentChange: (payment: PaymentDetails) => void;
  onEditGuests: () => void;
  onConfirm: () => void;
};

function maskId(guest: GuestDetails) {
  return guest.nationality === "TR"
    ? `T.C. •••••••${guest.nationalId.slice(-4)}`
    : `Passport ${guest.passportNumber}, ${guest.country}`;
}

export function ReviewStep({
  guests,
  contact,
  payment,
  onPaymentChange,
  onEditGuests,
  onConfirm,
}: ReviewStepProps) {
  const [submitted, setSubmitted] = useState(false);
  const errors = paymentErrors(payment);

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (!hasErrors(errors)) onConfirm();
      }}
      className="flex flex-col gap-8"
    >
      <h2 className="font-[family-name:var(--font-bodoni)] text-3xl">
        Review and pay
      </h2>

      <section
        aria-labelledby="review-guests"
        className="border border-border bg-popover"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <h3 id="review-guests" className="font-semibold">
            Guests and contact
          </h3>
          <button type="button" onClick={onEditGuests} className={textAction}>
            Edit
          </button>
        </div>
        <ul className="divide-y divide-border text-sm">
          {guests.map((guest, index) => (
            <li
              key={index}
              className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-5 py-3"
            >
              <span className="font-medium">
                {guest.firstName} {guest.lastName}
              </span>
              <span className="text-foreground/70">{maskId(guest)}</span>
            </li>
          ))}
          <li className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-5 py-3">
            <span className="text-foreground/70">Confirmation to</span>
            <span>
              {contact.email}, {contact.phone}
            </span>
          </li>
          {contact.requests && (
            <li className="px-5 py-3">
              <span className="text-foreground/70">Requests: </span>
              {contact.requests}
            </li>
          )}
        </ul>
      </section>

      <PaymentFields
        payment={payment}
        errors={submitted ? errors : {}}
        onChange={onPaymentChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={payment.acceptTerms}
            onChange={(event) =>
              onPaymentChange({ ...payment, acceptTerms: event.target.checked })
            }
            aria-invalid={submitted && !!errors.acceptTerms}
            className="mt-0.5 size-4 shrink-0 accent-[var(--secondary)]"
          />
          <span>
            I accept the{" "}
            <a
              href="#terms"
              className="text-secondary underline underline-offset-4"
            >
              booking terms
            </a>
            . Free cancellation up to 14 days before check-in; after that the
            first night is charged.
          </span>
        </label>
        {submitted && errors.acceptTerms && (
          <p className="pl-7 text-sm text-destructive">{errors.acceptTerms}</p>
        )}
      </div>

      <div className="flex justify-end border-t border-border pt-6">
        <button type="submit" className={primaryButton}>
          {payment.method === "card"
            ? "Pay and confirm booking"
            : "Confirm booking"}
        </button>
      </div>
    </form>
  );
}
