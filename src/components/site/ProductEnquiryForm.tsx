import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowRight, Loader2, Mail, MessageSquare, Package, Phone, Send, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { type Product } from "@/data/catalog";
import { isEmail, normalizeMobile } from "@/lib/enquiryValidation";

type Status = "idle" | "submitting" | "success" | "error";

/** Referenced by the popup's "Request Enquiry" button to focus the form. */
export const ENQUIRY_NAME_INPUT_ID = "product-enquiry-customer-name";

/** Price exactly as it is stored in the catalog; never invented. */
export function productPriceLabel(product: Product): string {
  if (!product.buyPrice) return "On Request";
  return product.buyPrice.startsWith("₹")
    ? product.buyPrice
    : `₹${product.buyPrice}`;
}

/**
 * Requirement options shown in the product popup — same Buy / Rent choice for
 * every product, defaulting to Buy (matches the contact-page form).
 */
export function requirementOptions(): string[] {
  return ["Buy", "Rent"];
}

/**
 * Request Enquiry form used in the product popup. The product name, price and
 * image come from the selected product, so every product gets the same form.
 */
export function ProductEnquiryForm({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const submitEnquiry = useAction(api.enquiries.submit);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: requirementOptions()[0],
    message: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = form.name.trim();
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    const mobile = normalizeMobile(form.phone);
    if (!mobile) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    const email = form.email.trim();
    if (email && !isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      await submitEnquiry({
        name,
        phone: mobile,
        email: email || undefined,
        productOrService: product.name,
        buyOrRent: form.requirement,
        message: form.message.trim() || undefined,
        productPrice: productPriceLabel(product),
        productId: product.slug,
        productImage: product.image,
        clientTime: Date.now(),
      });
      setStatus("success");
      toast.success(
        "Thank you! Your enquiry has been sent successfully. We will contact you soon.",
      );
      setForm({
        name: "",
        phone: "",
        email: "",
        requirement: requirementOptions()[0],
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send your enquiry right now. Please try again.",
      );
    }
  }

  const iconClass = "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#5BAED6]";
  const inputClasses = "bg-white pl-9";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-2">
        <Label htmlFor={ENQUIRY_NAME_INPUT_ID}>Customer Name *</Label>
        <div className="relative">
          <User aria-hidden="true" className={iconClass} />
          <Input
            id={ENQUIRY_NAME_INPUT_ID}
            data-enquiry-name-input
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Enter your name"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Label htmlFor="enq-mobile">Mobile Number *</Label>
        <div className="relative">
          <Phone aria-hidden="true" className={iconClass} />
          <Input
            id="enq-mobile"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            aria-describedby={error && error.includes("10-digit") ? "enq-mobile-error" : undefined}
            className={inputClasses}
          />
        </div>
        {error && error.includes("10-digit") ? (
          <p id="enq-mobile-error" role="alert" className="text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Label htmlFor="enq-email">Email Address (Optional)</Label>
        <div className="relative">
          <Mail aria-hidden="true" className={iconClass} />
          <Input
            id="enq-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="Enter your email address"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="enq-product">Product Name</Label>
        <div className="relative">
          <Package aria-hidden="true" className={iconClass} />
          <Input
            id="enq-product"
            value={product.name}
            readOnly
            tabIndex={-1}
            className={`${inputClasses} pr-3 text-muted-foreground`}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Label>Requirement Type</Label>
        <RadioGroup
          value={form.requirement}
          onValueChange={(v) => set("requirement", v)}
          className="mt-1 flex flex-row items-center gap-6"
        >
          {requirementOptions().map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <RadioGroupItem value={opt} />
              {opt}
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Label htmlFor="enq-message">Message / Requirement (Optional)</Label>
        <div className="relative">
          <MessageSquare
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-3 size-4 text-[#5BAED6]"
          />
          <Textarea
            id="enq-message"
            rows={3}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Any specific requirements or message…"
            className={`${inputClasses} pt-2.5`}
          />
        </div>
      </div>

      {error && !error.includes("10-digit") ? (
        <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 w-full bg-[#1B84D8] shadow-md hover:bg-[#174A63]"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send Enquiry
            <ArrowRight aria-hidden="true" className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
