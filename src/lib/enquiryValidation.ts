/**
 * Shared client-side validation helpers for the website enquiry forms.
 * Kept in `lib` so every form (product, contact, nursing & caretaker) validates
 * phone numbers and email addresses exactly the same way.
 */

/**
 * Ten-digit Indian mobile entry. Accepts an optional +91 / 91 prefix and any
 * formatting characters, but the returned value is always the ten digits
 * (or `null` when the input is not a valid 10-digit Indian mobile number).
 */
export function normalizeMobile(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return null;
}

/** Basic email shape check (optional fields only validate when filled in). */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
