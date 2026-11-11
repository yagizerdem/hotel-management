import { CreditCardIcon, LandmarkIcon, LockIcon } from "lucide-react";
import { TextField } from "@/src/app/booking/components/text-field";
import type {
  PaymentDetails,
  PaymentMethod,
} from "@/src/app/booking/lib/types";
import type { Errors } from "@/src/app/booking/lib/validation";

type PaymentFieldsProps = {
  payment: PaymentDetails;
  errors: Errors<PaymentDetails>;
  onChange: (payment: PaymentDetails) => void;
};

const METHODS: {
  id: PaymentMethod;
  label: string;
  detail: string;
  icon: typeof CreditCardIcon;
}[] = [
  {
    id: "card",
    label: "Card",
    detail: "Paid now. Visa, Mastercard and Troy.",
    icon: CreditCardIcon,
  },
  {
    id: "bank_transfer",
    label: "Bank transfer",
    detail: "We hold the room for 48 hours while the transfer arrives.",
    icon: LandmarkIcon,
  },
];

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
}

export function PaymentFields({
  payment,
  errors,
  onChange,
}: PaymentFieldsProps) {
  const set = (patch: Partial<PaymentDetails>) =>
    onChange({ ...payment, ...patch });

  return (
    <div className="flex flex-col gap-5">
      <fieldset>
        <legend className="text-sm font-medium">
          How would you like to pay?
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {METHODS.map(({ id, label, detail, icon: Icon }) => {
            const checked = payment.method === id;
            return (
              <label
                key={id}
                className={`flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-secondary/30 ${
                  checked
                    ? "border-secondary outline outline-1 outline-secondary"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={checked}
                  onChange={() => set({ method: id })}
                  className="mt-1 size-4 shrink-0 accent-[var(--secondary)]"
                />
                <span>
                  <span className="flex items-center gap-2 font-medium">
                    <Icon aria-hidden className="size-4" />
                    {label}
                  </span>
                  <span className="mt-0.5 block text-sm text-foreground/70">
                    {detail}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {payment.method === "card" ? (
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
          <TextField
            label="Name on the card"
            autoComplete="cc-name"
            value={payment.cardName}
            onChange={(cardName) => set({ cardName })}
            error={errors.cardName}
            className="sm:col-span-3"
          />
          <TextField
            label="Card number"
            inputMode="numeric"
            autoComplete="cc-number"
            value={payment.cardNumber}
            onChange={(value) => set({ cardNumber: formatCardNumber(value) })}
            error={errors.cardNumber}
          />
          <TextField
            label="Expiry"
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={payment.expiry}
            onChange={(value) => set({ expiry: formatExpiry(value) })}
            error={errors.expiry}
          />
          <TextField
            label="Security code"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            value={payment.cvc}
            onChange={(value) => set({ cvc: value.replace(/\D/g, "") })}
            error={errors.cvc}
          />
          <p className="flex items-center gap-2 text-sm text-foreground/65 sm:col-span-3">
            <LockIcon aria-hidden className="size-4" />
            Card details go straight to the bank and aren&apos;t stored by the
            hotel.
          </p>
        </div>
      ) : (
        <p className="border border-border bg-muted/40 p-4 text-sm">
          After you confirm, we email the hotel&apos;s bank details and your
          booking reference. Add the reference to the transfer description so we
          can match it.
        </p>
      )}
    </div>
  );
}
