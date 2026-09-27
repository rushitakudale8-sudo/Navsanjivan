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
  email: "navsanjivan10@gmail.com",
  tagline:
    "We supply surgical and patient-care equipment and provide nursing and caretaker services for hospitals, clinics, nursing facilities and home healthcare.",
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
    image:
      "https://images.pexels.com/photos/33061507/pexels-photo-33061507.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "commode-chairs",
    name: "Commode Chairs",
    emoji: "",
    blurb: "Bedside and portable commode chairs for patient dignity and comfort.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Portable_commode_chair_%28Pakistan%29_%285601381776%29.jpg/500px-Portable_commode_chair_%28Pakistan%29_%285601381776%29.jpg",
    attribution: "Photo: SuSanA Secretariat (Wikimedia Commons, CC BY 2.0)",
  },
  {
    slug: "hospital-beds",
    name: "Hospital Beds",
    emoji: "🛏️",
    blurb: "Semi-Fowler and electric hospital beds for wards and home care.",
    image:
      "https://images.pexels.com/photos/7335565/pexels-photo-7335565.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "patient-care-equipment",
    name: "Patient Care Equipment",
    emoji: "🩺",
    blurb: "Everyday equipment for examination, monitoring and bedside care.",
    image:
      "https://images.pexels.com/photos/40568/pexels-photo-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "nebulizers-respiratory-care",
    name: "Nebulizers & Respiratory Care",
    emoji: "💨",
    blurb: "Nebulizers, masks and respiratory accessories for all ages.",
    image:
      "https://images.pexels.com/photos/7447013/pexels-photo-7447013.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "blood-pressure-monitors",
    name: "Blood Pressure Monitors",
    emoji: "❤️",
    blurb: "Digital BP monitors for reliable readings at home and in clinics.",
    image:
      "https://images.pexels.com/photos/7446776/pexels-photo-7446776.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "pulse-oximeters",
    name: "Pulse Oximeters",
    emoji: "🫁",
    blurb: "Fingertip pulse oximeters for quick oxygen-saturation checks.",
    image:
      "https://images.pexels.com/photos/8089103/pexels-photo-8089103.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "walking-aids",
    name: "Walking Aids",
    emoji: "",
    blurb: "Rollators and support aids that keep daily movement independent.",
    image:
      "https://images.pexels.com/photos/19995390/pexels-photo-19995390.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "crutches-walking-sticks",
    name: "Crutches & Walking Sticks",
    emoji: "🩼",
    blurb: "Crutches and walking sticks for recovery and steady support.",
    image:
      "https://images.pexels.com/photos/3846157/pexels-photo-3846157.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "thermometers",
    name: "Thermometers",
    emoji: "🌡️",
    blurb: "Digital thermometers for fast, accurate temperature readings.",
    image:
      "https://images.pexels.com/photos/7722669/pexels-photo-7722669.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "diapers",
    name: "Diapers",
    emoji: "",
    blurb: "Adult and baby diapers in a range of sizes for daily care.",
    image:
      "https://images.pexels.com/photos/6849268/pexels-photo-6849268.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "bathroom-toilet-aids",
    name: "Bathroom & Toilet Aids",
    emoji: "",
    blurb: "Safety rails and toilet aids that make bathrooms safer.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Electric_raised_toilet_seat_for_elderly.jpg/640px-Electric_raised_toilet_seat_for_elderly.jpg",
    attribution: "Photo: TTTNIS (Wikimedia Commons, CC0 1.0)",
  },
  {
    slug: "air-mattresses-bed-protection",
    name: "Air Mattresses & Bed Protection",
    emoji: "🛌",
    blurb: "Air mattresses and bed protection for long-term bed care.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Air_mattress_or_extra_bed_with_internal_air_pump_1.jpg/640px-Air_mattress_or_extra_bed_with_internal_air_pump_1.jpg",
    attribution: "Photo: W.carter (Wikimedia Commons, CC BY-SA 4.0)",
  },
  {
    slug: "hot-water-bags-personal-care",
    name: "Hot Water Bags & Personal Care",
    emoji: "🧴",
    blurb: "Hot water bags and personal-care essentials for comfort at home.",
    image:
      "https://live.staticflickr.com/6092/6328857535_61ddc13e17_b.jpg",
    attribution: "Photo: jenny_belly (Flickr, CC BY 2.0)",
  },
  {
    slug: "masks-medical-consumables",
    name: "Masks & Medical Consumables",
    emoji: "😷",
    blurb: "Masks, gloves and consumables for daily clinical hygiene.",
    image:
      "https://images.pexels.com/photos/4197564/pexels-photo-4197564.jpeg?auto=compress&cs=tinysrgb&w=800",
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
};

export const PRODUCTS: Product[] = [
  {
    slug: "wheelchairs",
    name: "Wheelchairs",
    group: "wheelchairs",
    image: "/wheelchair.png",
    fit: "contain",
  },
  {
    slug: "walkers",
    name: "Walkers",
    group: "walkers",
    image:
      "https://images.pexels.com/photos/33061507/pexels-photo-33061507.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "commode-chairs",
    name: "Commode Chairs",
    group: "commode-chairs",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Portable_commode_chair_%28Pakistan%29_%285601381776%29.jpg/500px-Portable_commode_chair_%28Pakistan%29_%285601381776%29.jpg",
    attribution: "Photo: SuSanA Secretariat (Wikimedia Commons, CC BY 2.0)",
  },
  {
    slug: "hospital-beds",
    name: "Hospital Beds",
    group: "hospital-beds",
    image:
      "https://images.pexels.com/photos/7335565/pexels-photo-7335565.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "patient-examination-beds",
    name: "Patient Examination Beds",
    group: "patient-care-equipment",
    image:
      "https://images.pexels.com/photos/7789609/pexels-photo-7789609.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "nebulizers",
    name: "Nebulizers",
    group: "nebulizers-respiratory-care",
    image:
      "https://images.pexels.com/photos/7447013/pexels-photo-7447013.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "blood-pressure-monitors",
    name: "Blood Pressure Monitors",
    group: "blood-pressure-monitors",
    image:
      "https://images.pexels.com/photos/7446776/pexels-photo-7446776.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "pulse-oximeters",
    name: "Pulse Oximeters",
    group: "pulse-oximeters",
    image:
      "https://images.pexels.com/photos/7580256/pexels-photo-7580256.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "walking-sticks",
    name: "Walking Sticks",
    group: "walking-aids",
    image:
      "https://images.pexels.com/photos/18465520/pexels-photo-18465520.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "crutches",
    name: "Crutches",
    group: "crutches-walking-sticks",
    image:
      "https://images.pexels.com/photos/3846157/pexels-photo-3846157.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "digital-thermometers",
    name: "Digital Thermometers",
    group: "thermometers",
    image:
      "https://images.pexels.com/photos/7722669/pexels-photo-7722669.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "adult-diapers",
    name: "Adult Diapers",
    group: "diapers",
    image:
      "https://images.pexels.com/photos/28846860/pexels-photo-28846860.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "toilet-safety-rails",
    name: "Toilet Safety Rails",
    group: "bathroom-toilet-aids",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Grab_bar.jpg/960px-Grab_bar.jpg",
    attribution: "Photo: Gramody (Wikimedia Commons, CC BY-SA 2.0)",
  },
  {
    slug: "air-mattresses",
    name: "Air Mattresses",
    group: "air-mattresses-bed-protection",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Air_mattress_or_extra_bed_with_internal_air_pump_1.jpg/640px-Air_mattress_or_extra_bed_with_internal_air_pump_1.jpg",
    attribution: "Photo: W.carter (Wikimedia Commons, CC BY-SA 4.0)",
  },
  {
    slug: "hot-water-bags",
    name: "Hot Water Bags",
    group: "hot-water-bags-personal-care",
    image:
      "https://live.staticflickr.com/6092/6328857535_61ddc13e17_b.jpg",
    attribution: "Photo: jenny_belly (Flickr, CC BY 2.0)",
  },
  {
    slug: "medical-masks",
    name: "Medical Masks",
    group: "masks-medical-consumables",
    image:
      "https://images.pexels.com/photos/4197564/pexels-photo-4197564.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "hearing-aids",
    name: "Hearing Aids",
    group: "patient-care-equipment",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hearing_aid_20080620.jpg/960px-Hearing_aid_20080620.jpg",
    attribution: "Photo: Jonas Bergsten (Wikimedia Commons, public domain)",
  },
  {
    slug: "breast-pumps",
    name: "Breast Pumps",
    group: "patient-care-equipment",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ameda_Purely_Yours_Double_Electric_Breast_Pump_DSCF2198.jpg/960px-Ameda_Purely_Yours_Double_Electric_Breast_Pump_DSCF2198.jpg",
    attribution: "Photo: Mary Mark Ockerbloom (Wikimedia Commons, CC BY-SA 3.0)",
  },
  {
    slug: "infrared-thermometers",
    name: "Infrared Thermometers",
    group: "thermometers",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Infrared_forehead_thermometer%2C_made_in_China.jpg/960px-Infrared_forehead_thermometer%2C_made_in_China.jpg",
    attribution: "Photo: Syced (Wikimedia Commons, CC0 1.0)",
  },
  {
    slug: "disposable-underpads",
    name: "Disposable Underpads",
    group: "diapers",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Incontinence_pad_for_women_package_1.jpg/960px-Incontinence_pad_for_women_package_1.jpg",
    attribution: "Photo: Wetfinder (Wikimedia Commons, CC BY-SA 3.0)",
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
