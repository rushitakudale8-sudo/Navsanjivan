import { v } from "convex/values";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { Resend } from "resend";

/** The ONLY destination for website enquiries (per business owner). */
const ENQUIRY_INBOX = "Navsanjivan10@gmail.com";

const SUBJECT = "New Website Enquiry - Navsanjivani Surgical & Nursing Beuro";

/** Collapse whitespace/newlines and hard-cap length to keep the email clean. */
function sanitize(value: string, max = 2000): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function formatDateTime(ms: number): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(ms);
}

/**
 * Public entry point: stores the enquiry, then emails it via Resend.
 * Runs as a Node action because the Resend SDK needs Node APIs.
 */
export const submit = action({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    productOrService: v.string(),
    buyOrRent: v.optional(v.string()),
    message: v.optional(v.string()),
    /** Client timestamp for duplicate detection (Date.now() on submit). */
    clientTime: v.number(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ ok: true; duplicate: boolean; id: Id<"enquiries"> }> => {
    // --- Validate required fields (server-side, not just HTML) ---
    const name = sanitize(args.name, 120);
    const phone = sanitize(args.phone, 20);
    const productOrService = sanitize(args.productOrService, 160);
    if (!name || !phone || !productOrService) {
      throw new Error("Name, phone number and product/service are required.");
    }
    if (!/^[+\d][\d\s\-()]{6,19}$/.test(phone)) {
      throw new Error("Please enter a valid phone number.");
    }
    const email = args.email ? sanitize(args.email, 160) : undefined;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    const buyOrRent = sanitize(args.buyOrRent ?? "Not specified", 20);
    const message = args.message ? args.message.trim().slice(0, 4000) : undefined;

    // --- Duplicate-submission guard (same phone + product within 60s) ---
    const recent: Doc<"enquiries"> | null = await ctx.runMutation(
      internal.enquiries.findRecent,
      {
        phone,
        productOrService,
        now: Date.now(),
      },
    );
    if (recent) {
      return { ok: true as const, duplicate: true, id: recent._id };
    }

    // --- Persist first, so enquiries are never lost even if email fails ---
    const now = Date.now();
    const id: Id<"enquiries"> = await ctx.runMutation(internal.enquiries.insertEnquiry, {
      name,
      phone,
      email,
      productOrService,
      buyOrRent,
      message,
      createdAt: now,
    });

    // --- Send the email through Resend (server-side; key stays in env) ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[enquiries] RESEND_API_KEY is not configured");
      throw new Error(
        "We couldn't send your enquiry right now. Please try again.",
      );
    }

    const lines = [
      `Customer Name: ${name}`,
      `Phone: ${phone}`,
      `Customer Email: ${email ?? "—"}`,
      `Product / Service: ${productOrService}`,
      `Requirement: ${buyOrRent}`,
      `Message: ${message ?? "—"}`,
      `Date & Time of Enquiry: ${formatDateTime(now)} (IST)`,
    ];

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      // Resend requires a verified sender; onboarding@resend.dev works for
      // testing and delivers to external inboxes including Gmail.
      from: "Navsanjivani Website <onboarding@resend.dev>",
      to: [ENQUIRY_INBOX],
      replyTo: email || undefined,
      subject: SUBJECT,
      text: lines.join("\n"),
    });

    if (error) {
      // Log details server-side only; never expose internals to the visitor.
      console.error("[enquiries] Resend error:", error);
      throw new Error(
        "We couldn't send your enquiry right now. Please try again.",
      );
    }

    await ctx.runMutation(internal.enquiries.markEmailed, {
      id,
      emailedAt: Date.now(),
      resendId: data?.id,
    });

    return { ok: true as const, duplicate: false, id };
  },
});

/** Public count for admin views. */
export const count = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("enquiries").collect()).length;
  },
});

// --- Internal helpers (not callable from the browser) ---

export const findRecent = internalMutation({
  args: {
    phone: v.string(),
    productOrService: v.string(),
    now: v.number(),
  },
  handler: async (ctx, args) => {
    const cutoff = args.now - 60_000;
    const all = await ctx.db
      .query("enquiries")
      .withIndex("by_dedupe", (q) =>
        q.eq("phone", args.phone).eq("productOrService", args.productOrService),
      )
      .collect();
    return all.find((e) => (e.createdAt ?? 0) >= cutoff) ?? null;
  },
});

export const insertEnquiry = internalMutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    productOrService: v.string(),
    buyOrRent: v.string(),
    message: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("enquiries", { ...args, status: "new" });
  },
});

export const markEmailed = internalMutation({
  args: { id: v.id("enquiries"), emailedAt: v.number(), resendId: v.optional(v.string()) },
  handler: async (ctx, { id, emailedAt, resendId }) => {
    await ctx.db.patch(id, { emailedAt, ...(resendId ? { resendId } : {}) });
  },
});
