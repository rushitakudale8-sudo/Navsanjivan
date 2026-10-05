import { BUSINESS, type Product } from "@/data/catalog";

/** Pre-filled "buy" enquiry email for a product. */
export function buyMailto(p: Product) {
  const subject = encodeURIComponent(
    `Buy enquiry: ${p.name} — ${BUSINESS.shortName}`,
  );
  const body = encodeURIComponent(
    `Hello ${BUSINESS.name},\n\nI would like to buy:\n\nProduct: ${p.name}\n\nPlease share the price and availability.\n\nThank you,`,
  );
  return `mailto:${BUSINESS.serviceEmail}?subject=${subject}&body=${body}`;
}

/** Pre-filled "rent" enquiry email for a product. */
export function rentMailto(p: Product) {
  const subject = encodeURIComponent(
    `Rental enquiry: ${p.name} — ${BUSINESS.shortName}`,
  );
  const body = encodeURIComponent(
    `Hello ${BUSINESS.name},\n\nI would like to rent:\n\nProduct: ${p.name}\nDuration: (daily / weekly / monthly)\nStart date: \n\nPlease share the rental price, deposit and delivery details.\n\nThank you,`,
  );
  return `mailto:${BUSINESS.serviceEmail}?subject=${subject}&body=${body}`;
}

/** Pre-filled generic price/availability enquiry email for a product. */
export function enquiryMailto(p: Product) {
  const subject = encodeURIComponent(
    `Price & availability enquiry: ${p.name} — ${BUSINESS.shortName}`,
  );
  const body = encodeURIComponent(
    `Hello ${BUSINESS.name},\n\nI am interested in:\n\nProduct: ${p.name}\n\nPlease share the price and availability (buy or rent).\n\nThank you,`,
  );
  return `mailto:${BUSINESS.serviceEmail}?subject=${subject}&body=${body}`;
}
