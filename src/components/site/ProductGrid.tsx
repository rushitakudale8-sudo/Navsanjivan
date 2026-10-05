import { useState } from "react";
import { Link } from "react-router";
import { Mail, RotateCcw, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SoftCard } from "@/components/site/SitePrimitives";
import {
  AvailabilityBadge,
  ProductDetailDialog,
} from "@/components/site/ProductDetailDialog";
import { type Product, type ProductGroup } from "@/data/catalog";
import { buyMailto, enquiryMailto, rentMailto } from "@/lib/productEnquiry";
import { cn } from "@/lib/utils";

/** Card action row: Buy Now / Rent Now / Enquire Now (only when configured). */
function ProductCardActions({ product }: { product: Product }) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {product.forSale && (
        <Button asChild size="sm" className="shadow-sm">
          <a href={buyMailto(product)} onClick={stop}>
            <ShoppingCart className="size-3.5" /> Buy Now
          </a>
        </Button>
      )}
      {product.forRent && (
        <Button asChild size="sm" variant="secondary" className="shadow-sm">
          <a href={rentMailto(product)} onClick={stop}>
            <RotateCcw className="size-3.5" /> Rent Now
          </a>
        </Button>
      )}
      <Button
        asChild
        size="sm"
        variant={product.forSale || product.forRent ? "outline" : "default"}
        className={product.forSale || product.forRent ? "bg-white" : "shadow-sm"}
      >
        <a href={enquiryMailto(product)} onClick={stop}>
          <Mail className="size-3.5" /> Enquire Now
        </a>
      </Button>
    </div>
  );
}

/** Product-group card: clickable, image-led, subtle hover lift. */
function GroupCard({ group, delay = 0 }: { group: ProductGroup; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link to="/product-groups" className="block h-full">
        <SoftCard className="h-full overflow-hidden">
          <div
            className={cn(
              "relative aspect-[4/3] overflow-hidden",
              group.fit === "contain" ? "bg-white" : "bg-secondary",
            )}
          >
            <img
              src={group.image}
              alt={group.name}
              loading="lazy"
              className={cn(
                "h-full w-full transition-transform duration-500 group-hover:scale-[1.04]",
                group.fit === "contain" ? "object-contain" : "object-cover",
              )}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground">{group.name}</h3>
          </div>
        </SoftCard>
      </Link>
    </Reveal>
  );
}

/** Product card: image, name, description, availability, price and actions. */
function ProductCard({
  product,
  onOpen,
  delay = 0,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <SoftCard
        className="h-full cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
        onClick={() => onOpen(product)}
      >
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden",
            product.fit === "contain" ? "bg-white" : "bg-secondary",
          )}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={cn(
              "h-full w-full transition-transform duration-500 group-hover:scale-[1.04]",
              product.fit === "contain" ? "object-contain" : "object-cover",
            )}
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground">{product.name}</h3>
          </div>
          <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
            {product.group.split("-").join(" ")}
          </p>
          {product.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
          )}
          <div className="mt-3">
            <AvailabilityBadge product={product} />
          </div>
          {product.forSale && product.buyPrice ? (
            <p className="mt-2 text-sm font-semibold text-foreground">
              {product.buyPrice}
            </p>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              Price &amp; availability on request
            </p>
          )}
          <ProductCardActions product={product} />
        </div>
      </SoftCard>
    </Reveal>
  );
}

export function ProductGroupGrid({
  groups,
  columns = 4,
}: {
  groups: ProductGroup[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={
        columns === 4
          ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {groups.map((g, i) => (
        <GroupCard key={g.slug} group={g} delay={(i % columns) * 0.06} />
      ))}
    </div>
  );
}

/** Grid of product cards with a shared detail dialog. */
export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={
          columns === 4
            ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {products.map((p, i) => (
          <ProductCard
            key={p.slug}
            product={p}
            delay={(i % columns) * 0.06}
            onOpen={(prod) => {
              setSelected(prod);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <ProductDetailDialog
        product={selected}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
