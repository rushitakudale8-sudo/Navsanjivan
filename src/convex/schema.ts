import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // add other tables here

    // Customer enquiries from the public contact form
    enquiries: defineTable({
      name: v.string(),
      phone: v.string(),
      email: v.optional(v.string()),
      productOrService: v.string(),
      buyOrRent: v.optional(v.string()), // "Buy" | "Rent" | "Not specified"
      message: v.optional(v.string()),
      /** Product price at the time of enquiry (from catalog), if known. */
      productPrice: v.optional(v.string()),
      /** Stable product slug — used as the product ID. */
      productId: v.optional(v.string()),
      /** Existing product image URL, passed through unchanged. */
      productImage: v.optional(v.string()),
      // --- Nursing & caretaker support enquiries ---
      /** Service required, e.g. "Nursing Care" | "Patient Caretaker". */
      careService: v.optional(v.string()),
      /** Who the care is for, e.g. "Patient" | "Senior Citizen". */
      careFor: v.optional(v.string()),
      /** Care duration, e.g. "24 Hours" | "12 Hours" | "8 Hours". */
      careDuration: v.optional(v.string()),
      /** Preferred start date as entered (YYYY-MM-DD). */
      careStartDate: v.optional(v.string()),
      /** Location / area the care is required in. */
      careLocation: v.optional(v.string()),
      status: v.optional(v.string()), // "new" | "contacted" | "closed"
      createdAt: v.optional(v.number()),
      emailedAt: v.optional(v.number()), // when the email was accepted
      resendId: v.optional(v.string()),
    })
      .index("by_status", ["status"])
      .index("by_dedupe", ["phone", "productOrService", "createdAt"])
      .index("by_email", ["emailedAt"]),

    // tableName: defineTable({
    //   ...
    //   // table fields
    // }).index("by_field", ["field"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
