import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** Public: store an enquiry submitted from the contact form. */
export const submit = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    productOrService: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("enquiries", {
      ...args,
      status: "new",
    });
  },
});

/** Count of enquiries received (for simple admin views later). */
export const count = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("enquiries").collect()).length;
  },
});
