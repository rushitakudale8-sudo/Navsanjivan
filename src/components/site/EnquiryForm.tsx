import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS, ENQUIRY_OPTIONS } from "@/data/catalog";

type Status = "idle" | "submitting" | "success" | "error";

/** Dropdown option that lets visitors type their own requirement. */
const CUSTOM_OPTION = "Other (type your requirement)";

export function EnquiryForm({ className }: { className?: string }) {
  const submitEnquiry = useMutation(api.enquiries.submit);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    productOrService: "",
    customProduct: "",
    message: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.productOrService === CUSTOM_OPTION && !form.customProduct.trim()) {
      setStatus("idle");
      setError("Please type the product or service you need.");
      return;
    }
    setStatus("submitting");
    setError(null);
    try {
      const productOrService =
        form.productOrService === CUSTOM_OPTION
          ? `Other: ${form.customProduct.trim()}`
          : form.productOrService;
      await submitEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        productOrService,
        message: form.message.trim() || undefined,
      });
      setStatus("success");
      toast.success("Enquiry sent — we'll get back to you soon.");
      setForm({
        name: "",
        phone: "",
        email: "",
        productOrService: "",
        customProduct: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly.",
      );
    }
  }

  const inputClasses = "bg-white";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your full name"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="Your phone number"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="product">Product/Service Required</Label>
          <Select
            required
            value={form.productOrService}
            onValueChange={(v) => set("productOrService", v)}
          >
            <SelectTrigger id="product" className={`w-full ${inputClasses}`}>
              <SelectValue placeholder="Select a product or service" />
            </SelectTrigger>
            <SelectContent>
              {ENQUIRY_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
              <SelectItem value={CUSTOM_OPTION}>{CUSTOM_OPTION}</SelectItem>
            </SelectContent>
          </Select>
          {form.productOrService === CUSTOM_OPTION && (
            <Input
              required
              value={form.customProduct}
              onChange={(e) => set("customProduct", e.target.value)}
              placeholder="Type the product or service you need"
              className={inputClasses}
              aria-label="Custom product or service"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us what you need (quantities, delivery location, etc.)"
            className={inputClasses}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error} You can also email us at{" "}
          <a className="font-medium underline" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          .
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send Enquiry
          </>
        )}
      </Button>

      <p className="mt-3 text-xs text-muted-foreground">
        {BUSINESS.disclaimer} We'll use your details only to respond to this
        enquiry.
      </p>
    </form>
  );
}
