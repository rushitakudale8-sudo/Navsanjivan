import { Mail, RotateCcw, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatedHeading } from "@/components/site/SitePrimitives";
import { type Product } from "@/data/catalog";
import { buyMailto, enquiryMailto, rentMailto } from "@/lib/productEnquiry";
import { cn } from "@/lib/utils";

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

/** Detailed product dialog: description, specs, availability, pricing, actions. */
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

  const a = getAvailability(product);
  const hasRentPrice =
    product.rentPrices?.daily ||
    product.rentPrices?.weekly ||
    product.rentPrices?.monthly;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-bold text-foreground">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-left">
            {product.description ??
              `Part of our product range. Contact us for details about ${product.name}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
          <div className="space-y-3">
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
            <AvailabilityBadge product={product} />
          </div>

          <div className="space-y-5">
            {product.specs && product.specs.length > 0 && (
              <div>
                <AnimatedHeading
                  as="h4"
                  underline={false}
                  float={false}
                  glow={false}
                  className="text-sm font-semibold text-foreground"
                >
                  Specifications
                </AnimatedHeading>
                <ul className="mt-2 space-y-1.5">
                  {product.specs.map((s) => (
                    <li
                      key={s}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60"
                        aria-hidden
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Purchase */}
            <div>
              <AnimatedHeading
                as="h4"
                underline={false}
                float={false}
                glow={false}
                className="text-sm font-semibold text-foreground"
              >
                Buy
              </AnimatedHeading>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.forSale
                  ? `Available for purchase${product.buyPrice ? ` — ${product.buyPrice}` : " — price on request"}`
                  : "Purchase on request"}
              </p>
              {product.forSale ? (
                <Button asChild size="sm" className="mt-2 shadow-sm">
                  <a href={buyMailto(product)}>
                    <ShoppingCart className="size-4" /> Buy Now
                  </a>
                </Button>
              ) : (
                <Button asChild size="sm" variant="outline" className="mt-2 bg-white">
                  <a href={enquiryMailto(product)}>
                    <Mail className="size-4" /> Request Purchase
                  </a>
                </Button>
              )}
            </div>

            {/* Rental */}
            <div>
              <AnimatedHeading
                as="h4"
                underline={false}
                float={false}
                glow={false}
                className="text-sm font-semibold text-foreground"
              >
                Rent
              </AnimatedHeading>
              {product.forRent ? (
                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <p>
                    Rental duration: Daily / Weekly / Monthly
                    {hasRentPrice ? " — see rates below" : ""}
                  </p>
                  {product.rentPrices?.daily && (
                    <p>Daily: {product.rentPrices.daily}</p>
                  )}
                  {product.rentPrices?.weekly && (
                    <p>Weekly: {product.rentPrices.weekly}</p>
                  )}
                  {product.rentPrices?.monthly && (
                    <p>Monthly: {product.rentPrices.monthly}</p>
                  )}
                  {product.rentDeposit && (
                    <p>Security deposit: {product.rentDeposit} (refundable)</p>
                  )}
                  {product.rentDelivery && <p>{product.rentDelivery}</p>}
                  <Button asChild size="sm" className="mt-2 shadow-sm">
                    <a href={rentMailto(product)}>
                      <RotateCcw className="size-4" /> Request Rental
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="mt-1 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Rental on request — availability and rates depend on the
                    item. Ask us and we will confirm.
                  </p>
                  <Button asChild size="sm" variant="outline" className="bg-white">
                    <a href={enquiryMailto(product)}>
                      <Mail className="size-4" /> Request Rental
                    </a>
                  </Button>
                </div>
              )}
            </div>

            <p className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
              Price &amp; availability on request — we confirm the current price,
              stock and rental terms when you enquire.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
