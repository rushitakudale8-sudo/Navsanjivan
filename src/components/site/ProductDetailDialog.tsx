import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { ProductEnquiryForm } from "@/components/site/ProductEnquiryForm";

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
          a === "rent"
            ? "bg-blue-500"
            : a === "enquiry"
              ? "bg-muted-foreground/50"
              : "bg-emerald-500",
        )}
      />
      {l.text}
    </span>
  );
}

/**
 * The single product popup used for every product. The layout is fixed; only
 * the image, name and description come from the data.
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
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* ---------------- LEFT: product summary ---------------- */}
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

            <div
              className={cn(
                "mt-4 overflow-hidden rounded-xl border border-border/60",
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

            <p className="mt-3 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
              Price &amp; availability on request — we confirm the current price,
              stock and rental terms when you enquire.
            </p>
          </div>

          {/* ---------------- RIGHT: enquiry form ---------------- */}
          <div className="min-w-0">
            <div className="rounded-xl border border-border/60 bg-[#F7FCFF] p-4 sm:p-5">
              <h3 className="text-base font-bold text-[#174A63]">
                Request Enquiry
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your details and we'll get back to you soon.
              </p>
              <ProductEnquiryForm
                key={product.slug}
                product={product}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
