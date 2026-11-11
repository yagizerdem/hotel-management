import type {
  ContactDetails,
  GuestDetails,
  PaymentDetails,
} from "@/src/app/booking/lib/types";

export type Errors<T> = Partial<Record<keyof T, string>>;

/**
 * A T.C. identity number is 11 digits, doesn't start with 0, and its last
 * two digits are checksums of the first nine.
 */
export function isValidNationalId(value: string) {
  if (!/^[1-9]\d{10}$/.test(value)) return false;
  const d = value.split("").map(Number);
  const odd = d[0] + d[2] + d[4] + d[6] + d[8];
  const even = d[1] + d[3] + d[5] + d[7];
  const tenth = (((odd * 7 - even) % 10) + 10) % 10;
  const eleventh = d.slice(0, 10).reduce((sum, n) => sum + n, 0) % 10;
  return d[9] === tenth && d[10] === eleventh;
}

export function guestErrors(guest: GuestDetails): Errors<GuestDetails> {
  const errors: Errors<GuestDetails> = {};
  if (!guest.firstName.trim()) errors.firstName = "Enter a first name.";
  if (!guest.lastName.trim()) errors.lastName = "Enter a last name.";
  if (guest.nationality === "TR") {
    if (!guest.nationalId)
      errors.nationalId = "Enter the T.C. identity number.";
    else if (!isValidNationalId(guest.nationalId))
      errors.nationalId =
        "This T.C. identity number isn't valid. Check the 11 digits.";
  } else {
    if (!guest.passportNumber.trim())
      errors.passportNumber = "Enter the passport number.";
    if (!guest.country.trim())
      errors.country = "Enter the country of the passport.";
  }
  return errors;
}

export function contactErrors(contact: ContactDetails): Errors<ContactDetails> {
  const errors: Errors<ContactDetails> = {};
  if (!/^\S+@\S+\.\S+$/.test(contact.email.trim()))
    errors.email = "Enter an email address like name@example.com.";
  if (contact.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Enter a phone number with its area code.";
  return errors;
}

export function paymentErrors(payment: PaymentDetails): Errors<PaymentDetails> {
  const errors: Errors<PaymentDetails> = {};
  if (payment.method === "card") {
    if (!payment.cardName.trim())
      errors.cardName = "Enter the name on the card.";
    if (payment.cardNumber.replace(/\s/g, "").length < 15)
      errors.cardNumber = "Enter the full card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry))
      errors.expiry = "Enter the expiry date as MM/YY.";
    if (!/^\d{3,4}$/.test(payment.cvc))
      errors.cvc = "Enter the 3 or 4 digit code.";
  }
  if (!payment.acceptTerms)
    errors.acceptTerms = "Accept the booking terms to confirm.";
  return errors;
}

export function hasErrors(errors: object) {
  return Object.keys(errors).length > 0;
}
