/**
 * Product catalogue for Navsanjivani Surgical & Nursing Beuro.
 *
 * Images are hot-linked from free-to-use sources:
 *  - Pexels License (https://www.pexels.com/license/) — free for commercial use, no attribution required
 *  - Wikimedia Commons under CC BY-SA 4.0 (attributed in comments where used)
 *  - Flickr under CC BY 2.0 (attributed in comments where used)
 */

export const BUSINESS = {
  name: "Navsanjivani Surgical and Nursing Beuro",
  shortName: "Navsanjivani",
  address:
    "Rambag Colony, Paud Road, Kothrud, Pune – 411038, Maharashtra, India",
  email: "support.navsanjivani@gmail.com",
  /** Sales/rental enquiries for Buy / Rent go to the support inbox. */
  serviceEmail: "support.navsanjivani@gmail.com",
  tagline:
    "We supply surgical and patient care equipment and provide nursing and caretaker services for hospitals, clinics, nursing facilities and home healthcare. Buy or rent the equipment you need.",
  disclaimer: "Product information only — not medical advice.",
} as const;

/** The 16 product groups, in the exact order requested. */
export type ProductGroup = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  image: string;
  /** Set when the image source requires attribution. */
  attribution?: string;
  /** How the image fills its card. Defaults to "cover". */
  fit?: "cover" | "contain";
};

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    slug: "wheelchairs",
    name: "Wheelchairs",
    emoji: "🦽",
    blurb: "Manual and folding wheelchairs for hospitals, clinics and home use.",
    image: "/wheelchair.png",
    fit: "contain",
  },
  {
    slug: "walkers",
    name: "Walkers",
    emoji: "",
    blurb: "Sturdy walking frames and foldable walkers for safe, supported movement.",
    image: "/walkers.jpg",
    fit: "contain",
  },
  {
    slug: "commode-chairs",
    name: "Commode Chairs",
    emoji: "",
    blurb: "Bedside and portable commode chairs for patient dignity and comfort.",
    image: "/commode-chairs.jpg",
    fit: "contain",
  },
  {
    slug: "hospital-beds",
    name: "Hospital Beds",
    emoji: "🛏️",
    blurb: "Semi-Fowler and electric hospital beds for wards and home care.",
    image: "/hospital-beds.jpg",
    fit: "contain",
  },
  {
    slug: "patient-care-equipment",
    name: "Patient Care Equipment",
    emoji: "🩺",
    blurb:
      "Examination beds, suction machines and daily patient-care equipment.",
    image: "/folding-commode-chair.png",
    fit: "contain",
  },
  {
    slug: "nebulizers-respiratory-care",
    name: "Nebulizers & Respiratory Care",
    emoji: "💨",
    blurb: "Nebulizers, masks and respiratory accessories for all ages.",
    image: "/nebulizers.jpg",
    fit: "contain",
  },
  {
    slug: "blood-pressure-monitors",
    name: "Blood Pressure Monitors",
    emoji: "❤️",
    blurb: "Digital BP monitors for reliable readings at home and in clinics.",
    image: "/blood-pressure-monitors.jpg",
    fit: "contain",
  },
  {
    slug: "pulse-oximeters",
    name: "Pulse Oximeters",
    emoji: "🫁",
    blurb: "Fingertip pulse oximeters for quick oxygen-saturation checks.",
    image: "/pulse-oximeters.jpg",
    fit: "contain",
  },
  {
    slug: "walking-aids",
    name: "Walking Aids",
    emoji: "",
    blurb: "Rollators and support aids that keep daily movement independent.",
    image: "/walking-aids.png",
    fit: "contain",
  },
  {
    slug: "crutches-walking-sticks",
    name: "Crutches & Walking Sticks",
    emoji: "🩼",
    blurb: "Crutches and walking sticks for recovery and steady support.",
    image: "/crutches.jpg",
    fit: "contain",
  },
  {
    slug: "thermometers",
    name: "Thermometers",
    emoji: "🌡️",
    blurb: "Digital thermometers for fast, accurate temperature readings.",
    image: "/thermometers.jpg",
    fit: "contain",
  },
  {
    slug: "diapers",
    name: "Diapers",
    emoji: "",
    blurb: "Adult and baby diapers in a range of sizes for daily care.",
    image: "/diapers.png",
    fit: "contain",
  },
  {
    slug: "bathroom-toilet-aids",
    name: "Urine Pots & Bedpans",
    emoji: "",
    blurb: "Urine pots and bed pans for bedside and clinical patient use.",
    image: "/urine-pot-bed-pans.jpg",
    fit: "contain",
  },
  {
    slug: "air-mattresses-bed-protection",
    name: "Air Mattresses & Bed Protection",
    emoji: "🛌",
    blurb: "Air mattresses and bed protection for long-term bed care.",
    image: "/air-mattresses.jpg",
    fit: "contain",
  },
  {
    slug: "hot-water-bags-personal-care",
    name: "Hot Water Bags & Personal Care",
    emoji: "🧴",
    blurb:
      "Hot water bags and personal comfort items for everyday home care.",
    image: "/sleeping-wheel-chair.jpg",
    fit: "contain",
  },
  {
    slug: "masks-medical-consumables",
    name: "Masks & Medical Consumables",
    emoji: "😷",
    blurb: "Masks, gloves and consumables for daily clinical hygiene.",
    image: "/gloves.jpg",
    fit: "contain",
  },
];

/** The products listed in "Our Products" — equipment names only. */
export type Product = {
  slug: string;
  name: string;
  group: string;
  image: string;
  attribution?: string;
  /** How the image fills its card. Defaults to "cover". */
  fit?: "cover" | "contain";
  /** Short one-line description shown on cards and the detail dialog. */
  description?: string;
  /** Technical specifications shown on the product detail dialog. */
  specs?: string[];
  /**
   * Buy availability. Unset means "available to buy on enquiry"; set to
   * `false` only to hide the product from the Buy filter.
   */
  forSale?: boolean;
  /**
   * Rent availability. Unset means "available on rent on enquiry"; set to
   * `false` for buy-only items, which hides them from the Rent filter on the
   * products page (consumables/disposables such as diapers or masks).
   */
  forRent?: boolean;
  /** Confirmed purchase price. Omit when the price is on request. */
  buyPrice?: string;
  /** Rental rates per duration; only include confirmed values. */
  rentPrices?: { daily?: string; weekly?: string; monthly?: string };
  /** Refundable security deposit for rentals, if applicable. */
  rentDeposit?: string;
  /** Delivery / pickup note for rentals, if applicable. */
  rentDelivery?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "wheelchairs",
    name: "Wheelchairs",
    group: "wheelchairs",
    image: "/wheelchair.png",
    fit: "contain",
    description:
      "Comfortable and durable mobility solution for patients with limited movement. Designed for easy transportation and everyday use.",
  },
  {
    slug: "walkers",
    name: "Walkers",
    group: "walkers",
    image: "/walkers.jpg",
    fit: "contain",
    description:
      "Sturdy walking frames that give steady support and confidence to patients who need help keeping their balance. Lightweight and easy to fold for storage and travel.",
  },
  {
    slug: "commode-chairs",
    name: "Commode Chairs",
    group: "commode-chairs",
    image: "/commode-chairs.jpg",
    fit: "contain",
    description:
      "Bedside commode chairs that make toilet care easier while protecting patient dignity and comfort. Durable frame with a removable, easy-to-clean pot.",
  },
  {
    slug: "hospital-beds",
    name: "Hospital Beds",
    group: "hospital-beds",
    image: "/hospital-beds.jpg",
    fit: "contain",
    description:
      "Adjustable hospital beds designed for comfortable positioning during rest, recovery and daily care. Suitable for wards, clinics and home nursing setups.",
  },
  {
    slug: "patient-examination-beds",
    name: "Patient Examination Beds",
    group: "patient-care-equipment",
    image:
      "https://images.pexels.com/photos/7789609/pexels-photo-7789609.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Firm, easy-to-clean examination beds for checkups, procedures and routine patient assessment. Simple to adjust and maintain in a busy clinic.",
  },
  {
    slug: "nebulizers",
    name: "Nebulizers",
    group: "nebulizers-respiratory-care",
    image: "/nebulizers.jpg",
    fit: "contain",
    description:
      "Compact nebulizers that turn liquid medicine into a fine mist for easy inhalation. A practical choice for respiratory care at home and in clinics.",
  },
  {
    slug: "blood-pressure-monitors",
    name: "Blood Pressure Monitors",
    group: "blood-pressure-monitors",
    image: "/blood-pressure-monitors.jpg",
    fit: "contain",
    description:
      "Digital blood pressure monitors for quick, reliable readings at home or in the clinic. Clear display and simple one-touch operation.",
  },
  {
    slug: "pulse-oximeters",
    name: "Pulse Oximeters",
    group: "pulse-oximeters",
    image: "/pulse-oximeters.jpg",
    fit: "contain",
    description:
      "Fingertip pulse oximeters that give fast oxygen-saturation and pulse readings. Portable and easy to use for regular monitoring at home.",
  },
  {
    slug: "walking-sticks",
    name: "Walking Sticks",
    group: "walking-aids",
    image: "/walking-aids.png",
    fit: "contain",
    description:
      "Adjustable walking sticks that add balance and stability to everyday movement. Lightweight, with a comfortable grip and a firm non-slip base.",
  },
  {
    slug: "crutches",
    name: "Crutches",
    group: "crutches-walking-sticks",
    image: "/crutches.jpg",
    fit: "contain",
    description:
      "Adjustable crutches that support recovery and take weight off an injured leg. Lightweight and built to feel secure with every step.",
  },
  {
    slug: "digital-thermometers",
    name: "Digital Thermometers",
    group: "thermometers",
    image: "/thermometers.jpg",
    fit: "contain",
    description:
      "Digital thermometers that read body temperature quickly and accurately. Easy to read, easy to clean and dependable for daily use.",
  },
  {
    slug: "adult-diapers",
    name: "Adult Diapers",
    group: "diapers",
    image: "/diapers.png",
    fit: "contain",
    // Disposable — sold only, not available on rent.
    forRent: false,
    description:
      "Absorbent adult diapers designed for comfort, dryness and skin care through the day and night. Available in a range of sizes for a secure fit.",
  },
  {
    slug: "toilet-safety-rails",
    name: "Urine Pots & Bedpans",
    group: "bathroom-toilet-aids",
    image: "/urine-pot-bed-pans.jpg",
    fit: "contain",
    // Sold only, not available on rent.
    forRent: false,
    attribution: "Photo: Gramody (Wikimedia Commons, CC BY-SA 2.0)",
    description:
      "Urine pots and bedpans for hygienic bedside care when mobility is limited. Easy to clean and suitable for hospitals, nursing care and home use.",
  },
  {
    slug: "air-mattresses",
    name: "Air Mattresses",
    group: "air-mattresses-bed-protection",
    image: "/air-mattresses.jpg",
    fit: "contain",
    description:
      "Air mattresses that help relieve pressure and protect skin during long periods in bed. A comfortable, supportive base for bed-bound patients.",
  },
  {
    slug: "hot-water-bags",
    name: "Hot Water Bags",
    group: "hot-water-bags-personal-care",
    image:
      "https://live.staticflickr.com/6092/6328857535_61ddc13e17_b.jpg",
    attribution: "Photo: jenny_belly (Flickr, CC BY 2.0)",
    // Sold only, not available on rent.
    forRent: false,
    description:
      "Hot water bags for comforting, localised warmth that eases aches and cramps. Sturdy, leak-resistant and simple to fill and use.",
  },
  {
    slug: "gloves",
    name: "Gloves",
    group: "masks-medical-consumables",
    image: "/gloves.jpg",
    fit: "contain",
    // Disposable — sold only, not available on rent.
    forRent: false,
    description:
      "Disposable gloves that keep hands protected during patient care and cleaning. Comfortable to wear and available in a range of sizes.",
  },
  {
    slug: "medical-masks",
    name: "Medical Masks",
    group: "masks-medical-consumables",
    image:
      "https://images.pexels.com/photos/4197564/pexels-photo-4197564.jpeg?auto=compress&cs=tinysrgb&w=800",
    // Disposable — sold only, not available on rent.
    forRent: false,
    description:
      "Disposable medical masks that help protect patients, staff and visitors during care. Comfortable to wear for extended periods.",
  },
  {
    slug: "sleeping-wheelchair",
    name: "Sleeping Wheelchair",
    group: "hot-water-bags-personal-care",
    image: "/sleeping-wheel-chair.jpg",
    fit: "contain",
    description:
      "Reclining wheelchairs that let patients rest and sleep without being moved to another seat. Comfortable support for long hours of care at home.",
  },
  {
    slug: "infrared-thermometers",
    name: "Infrared Thermometers",
    group: "thermometers",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Infrared_forehead_thermometer%2C_made_in_China.jpg/960px-Infrared_forehead_thermometer%2C_made_in_China.jpg",
    attribution: "Photo: Syced (Wikimedia Commons, CC0 1.0)",
    description:
      "Non-contact infrared thermometers that read temperature in seconds without touching the patient. Ideal for quick screening in clinics and hospitals.",
  },
  {
    slug: "suction-machines",
    name: "Suction Machines",
    group: "patient-care-equipment",
    image: "/suction-machine.jpg",
    fit: "contain",
    description:
      "Portable suction machines for clearing airways and secretions during patient care. Simple to operate and dependable when quick suction is needed.",
  },
];

/** Nursing & patient care services. Factual descriptions only. */
export type CareService = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export const CARE_SERVICES: CareService[] = [
  {
    slug: "nurses",
    name: "Nurses",
    blurb:
      "Nursing staff for hospitals, nursing facilities and home-care settings, supporting daily patient care routines.",
    image:
      "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "caregivers",
    name: "Caregivers",
    blurb:
      "Caregivers who assist patients with everyday activities such as mobility, meals and personal care at home.",
    image:
      "https://images.pexels.com/photos/18459198/pexels-photo-18459198.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "patient-care-assistants",
    name: "Patient Care Assistants",
    blurb:
      "Assistants who help patients with grooming, comfort and bedside support under the direction of care teams.",
    image:
      "https://images.pexels.com/photos/29372536/pexels-photo-29372536.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "ward-attendants",
    name: "Ward Attendants",
    blurb:
      "Ward attendants who support ward upkeep, patient movement and the day-to-day running of care facilities.",
    image:
      "https://images.pexels.com/photos/7551686/pexels-photo-7551686.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

/** The enquiry form options (product/service names, exact wording). */
export const ENQUIRY_OPTIONS = [
  ...PRODUCT_GROUPS.map((g) => g.name),
  ...CARE_SERVICES.map((s) => s.name),
];
