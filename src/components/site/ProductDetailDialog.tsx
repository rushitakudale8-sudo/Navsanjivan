import { useState } from "react";
import { Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";
import {
  ProductEnquiryForm,
  productPriceLabel,
} from "@/components/site/ProductEnquiryForm";

export type Availability =
  | "buy-rent"
  | "buy"
  | "rent"
  | "enquiry";

/** Availability derived strictly from the product's data — never invented. */
export function getAvailability(p: Product): Availability {
  if (p.forSale && p.forRent) return "buy-rent";
  if (p.forSale) return "buy";
  if (p.forRent) return "rent";
  return "enquiry";
}

export const AVAILABILITY_LABELS: Record<
  Availability,
  { text: string; classes: string }
> = {
  "buy-rent": {
    text: "Buy & Rent Available",
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  buy: {
    text: "Available for Buy",
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rent: {
    text: "Available for Rent",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
  enquiry: {
    text: "Enquiry Required",
    classes: "bg-muted text-muted-foreground border-border",
  },
};

export function AvailabilityBadge({ product }: { product: Product }) {
  const a = getAvailability(product);
  // The "Enquiry Required" pill was removed on request — nothing to show for
  // enquiry-only products. Buy/Rent availability badges are unchanged.
  if (a === "enquiry") return null;
  const l = AVAILABILITY_LABELS[a];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        l.classes,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          a === "rent" ? "bg-blue-500" : "bg-emerald-500",
        )}
      />
      {l.text}
    </span>
  );
}

/** Short availability wording shown in the product popup. */
const AVAILABILITY_SHORT: Record<Availability, string> = {
  "buy-rent": "Available (Buy & Rent)",
  buy: "Available",
  rent: "Available",
  enquiry: "On Request",
};

/**
 * The single product popup used for every product. The layout is fixed; only
 * the image, name, description, price and availability come from the data.
 */
export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Step 2: the enquiry form opens as its own separate popup.
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!product) return null;

  const availability = getAvailability(product);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {/* ---------------- Popup 1: product summary ---------------- */}
          <div className="min-w-0">
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl font-bold text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-left text-sm text-muted-foreground">
                {product.description ??
                  `Part of our product range. Contact us for details about ${product.name}.`}
              </DialogDescription>
            </DialogHeader>

            {/* Two-column layout: image on the left, details on the right. */}
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div
                className={cn(
                  "overflow-hidden rounded-xl border border-border/60",
                  product.fit === "contain" ? "bg-white" : "bg-secondary",
                )}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={cn(
                    "aspect-square w-full",
                    product.fit === "contain" ? "object-contain" : "object-cover",
                  )}
                />
              </div>

              <div className="flex min-w-0 flex-col">
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Price</dt>
                    <dd className="mt-1 text-2xl font-bold text-foreground">
                      {productPriceLabel(product)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Availability</dt>
                    <dd className="mt-1 text-lg font-bold text-emerald-600">
                      {AVAILABILITY_SHORT[availability]}
                    </dd>
                  </div>
                </dl>

                <Button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className="mt-5 w-full bg-[#1B84D8] shadow-md hover:bg-[#174A63]"
                >
                  <Mail className="size-4" /> Request Enquiry
                </Button>
              </div>
            </div>

            {/* Blue info note under the columns. */}
            <div className="mt-4 flex gap-2 rounded-lg border border-[#CFE7FB] bg-[#EFF6FF] px-3 py-2.5 text-xs leading-relaxed text-[#174A63]">
              <Info className="mt-0.5 size-4 shrink-0 text-[#1B84D8]" />
              <span>
                Price &amp; availability on request — we confirm the current
                price, stock and rental terms when you enquire.
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---------------- Popup 2: the enquiry form ---------------- */}
      <ProductEnquiryDialog
        product={product}
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
      />
    </>
  );
}

/** Separate enquiry-form popup, opened from the product popup. */
export function ProductEnquiryDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <div className="rounded-lg bg-[#F7FCFF] p-4 sm:p-5">
          <h3 className="text-base font-bold text-[#174A63]">Request Enquiry</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in your details and we'll get back to you soon.
          </p>
          <ProductEnquiryForm
            key={product.slug}
            product={product}
            className="mt-4"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
