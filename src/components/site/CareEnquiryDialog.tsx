import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ArrowRight,
  CircleCheck,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { isEmail, normalizeMobile } from "@/lib/enquiryValidation";
import { cn } from "@/lib/utils";

/** Services a visitor can ask for (radio buttons). */
const SERVICES = [
  "Nursing Care",
  "Patient Caretaker",
  "Elderly Care",
  "Home Healthcare",
] as const;

/** "Care required for" dropdown options. */
const CARE_FOR = [
  "Patient",
  "Senior Citizen",
  "Post-Surgery Care",
  "Other",
] as const;

const SUCCESS_MESSAGE =
  "Thank you! Your enquiry has been received. Our team will contact you soon.";

/** Stored as the enquiry's product/service so care enquiries are grouped. */
const ENQUIRY_TYPE = "Nursing & Caretaker Support";

type Status = "idle" | "submitting" | "success" | "error";

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  careFor: string;
  location: string;
  notes: string;
};

const EMPTY: Fields = {
  name: "",
  phone: "",
  email: "",
  service: "",
  careFor: "",
  location: "",
  notes: "",
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

/** White field on the light-blue panel, with a leading icon slot. */
const FIELD = "bg-white pl-9 shadow-sm";
const ICON =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#5BAED6]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

/**
 * Nursing & caretaker support enquiry form, opened from the care-services
 * "Enquire now" button. Submits through the same Convex action as the other
 * forms on the site, so the enquiry is stored and emailed server-side.
 */
export function CareEnquiryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const submitEnquiry = useAction(api.enquiries.submit);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<Fields>(EMPTY);

  function set<K extends keyof Fields>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear the field's message as soon as the visitor edits it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) {
      next.name = "Please enter the patient / contact person's name.";
    }
    if (!normalizeMobile(form.phone)) {
      next.phone = "Please enter a valid 10-digit mobile number.";
    }
    const email = form.email.trim();
    if (email && !isEmail(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.service) next.service = "Please select the service required.";
    if (!form.careFor) next.careFor = "Please select who the care is for.";
    if (!form.location.trim()) next.location = "Please enter the location / area.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setError("Please fix the highlighted fields and try again.");
      setStatus("idle");
      return;
    }

    const mobile = normalizeMobile(form.phone) ?? form.phone.trim();
    setStatus("submitting");
    setError(null);
    try {
      await submitEnquiry({
        name: form.name.trim(),
        phone: mobile,
        email: form.email.trim() || undefined,
        productOrService: ENQUIRY_TYPE,
        message: form.notes.trim() || undefined,
        careService: form.service,
        careFor: form.careFor,
        careLocation: form.location.trim(),
        clientTime: Date.now(),
      });
      setStatus("success");
      toast.success(SUCCESS_MESSAGE);
    } catch (err) {
      // Keep every value so the visitor can simply retry.
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send your enquiry right now. Please try again.",
      );
    }
  }

  /** Reset the form when the popup closes after a successful send. */
  function handleOpenChange(next: boolean) {
    if (!next && status === "success") {
      setForm(EMPTY);
      setStatus("idle");
      setError(null);
      setErrors({});
    }
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto bg-[#F7FCFF] sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="pr-6 text-xl font-bold text-[#174A63]">
            Nursing &amp; Caretaker Support Enquiry
          </DialogTitle>
          <DialogDescription className="text-left text-sm text-muted-foreground">
            Please share your care requirements, and our team will contact you
            with suitable options.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CircleCheck aria-hidden className="size-7" />
            </span>
            <p className="max-w-sm text-base font-semibold text-[#174A63]">
              {SUCCESS_MESSAGE}
            </p>
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-2 bg-[#1B84D8] shadow-md hover:bg-[#174A63]"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-1">
            {/* Patient / contact person name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="care-name">
                Patient / Contact Person Name *
              </Label>
              <div className="relative">
                <User aria-hidden className={ICON} />
                <Input
                  id="care-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Enter the patient or contact person's name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "care-name-error" : undefined}
                  className={FIELD}
                />
              </div>
              <FieldError id="care-name-error" message={errors.name} />
            </div>

            {/* Mobile + email */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="care-mobile">Mobile Number *</Label>
                <div className="relative">
                  <Phone aria-hidden className={ICON} />
                  <Input
                    id="care-mobile"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "care-mobile-error" : undefined
                    }
                    className={FIELD}
                  />
                </div>
                <FieldError id="care-mobile-error" message={errors.phone} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="care-email">Email Address</Label>
                <div className="relative">
                  <Mail aria-hidden className={ICON} />
                  <Input
                    id="care-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="Optional"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "care-email-error" : undefined}
                    className={FIELD}
                  />
                </div>
                <FieldError id="care-email-error" message={errors.email} />
              </div>
            </div>

            {/* Service required (radio buttons) */}
            <div className="mt-4 flex flex-col gap-2">
              <Label id="care-service-label">Service Required *</Label>
              <RadioGroup
                value={form.service}
                onValueChange={(v) => set("service", v)}
                aria-labelledby="care-service-label"
                className="grid gap-2 sm:grid-cols-2"
              >
                {SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/70 bg-white px-3 py-2 text-sm text-[#174A63] shadow-sm transition-colors hover:border-[#5BAED6]"
                  >
                    <RadioGroupItem
                      value={service}
                      className="data-[state=checked]:border-[#1B84D8]"
                    />
                    {service}
                  </label>
                ))}
              </RadioGroup>
              <FieldError id="care-service-error" message={errors.service} />
            </div>

            {/* Care required for + location */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="care-for">Care Required For *</Label>
                <Select
                  value={form.careFor}
                  onValueChange={(v) => set("careFor", v)}
                >
                  <SelectTrigger
                    id="care-for"
                    aria-invalid={Boolean(errors.careFor)}
                    className="w-full bg-white shadow-sm"
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {CARE_FOR.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="care-for-error" message={errors.careFor} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="care-location">Location / Area *</Label>
                <div className="relative">
                  <MapPin aria-hidden className={ICON} />
                  <Input
                    id="care-location"
                    required
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="e.g. Kothrud, Pune"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={
                      errors.location ? "care-location-error" : undefined
                    }
                    className={FIELD}
                  />
                </div>
                <FieldError id="care-location-error" message={errors.location} />
              </div>
            </div>

            {/* Additional requirements */}
            <div className="mt-4 flex flex-col gap-2">
              <Label htmlFor="care-notes">Additional Requirements</Label>
              <Textarea
                id="care-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Patient needs, medical conditions, special instructions…"
                className={cn("bg-white shadow-sm")}
              />
            </div>

            {error ? (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
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
                  <ArrowRight aria-hidden className="size-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
