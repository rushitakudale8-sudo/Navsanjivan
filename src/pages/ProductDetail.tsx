import { Link, useParams } from "react-router";
import { ArrowLeft, Mail, RotateCcw, ShoppingCart } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AnimatedHeading, Reveal } from "@/components/site/SitePrimitives";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/site/ProductDetailDialog";
import { buyMailto, enquiryMailto, rentMailto } from "@/lib/productEnquiry";
import { PRODUCT_GROUPS, PRODUCTS } from "@/data/catalog";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const group = product
    ? PRODUCT_GROUPS.find((g) => g.slug === product.group)
    : undefined;

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4 py-24 text-center">
          <div>
            <AnimatedHeading
              as="h1"
              className="text-2xl font-bold text-foreground"
            >
              Product not found
            </AnimatedHeading>
            <p className="mt-2 text-muted-foreground">
              We couldn&apos;t find that product in the catalogue.
            </p>
            <Button asChild className="mt-6">
              <Link to="/products">Browse all products</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const hasRentPrice =
    product.rentPrices?.daily ||
    product.rentPrices?.weekly ||
    product.rentPrices?.monthly;

  const related = PRODUCTS.filter(
    (p) => p.group === product.group && p.slug !== product.slug,
  ).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-secondary/40">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm text-muted-foreground sm:px-6"
          >
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link to="/products" className="hover:text-foreground">
              Products
            </Link>
            <span aria-hidden>/</span>
            <span className="truncate font-medium text-foreground">
              {product.name}
            </span>
          </nav>
        </div>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
          {/* Image */}
          <Reveal>
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-border/60",
                product.fit === "contain" ? "bg-white" : "bg-secondary",
              )}
            >
              <img
                src={product.image}
                alt={product.name}
                className={cn(
                  "aspect-square w-full",
                  product.fit === "contain"
                    ? "object-contain p-4"
                    : "object-cover",
                )}
              />
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-6">
              <div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B84D8] hover:text-[#174A63]"
                >
                  <ArrowLeft className="size-4" /> All products
                </Link>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                  {product.name}
                </h1>
                {group && (
                  <Link
                    to="/product-groups"
                    className="mt-2 inline-block text-sm font-semibold text-[#2E9BD6] hover:text-[#174A63]"
                  >
                    {group.name}
                  </Link>
                )}
                <p className="mt-4 max-w-prose text-muted-foreground">
                  {product.description ??
                    `Part of our product range. Contact us for details about ${product.name}.`}
                </p>
                <div className="mt-4">
                  <AvailabilityBadge product={product} />
                </div>
              </div>

              {product.specs && product.specs.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Specifications
                  </h2>
                  <ul className="mt-2 space-y-1.5">
                    {product.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60"
                          aria-hidden
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buy */}
              <div className="rounded-xl border border-border/60 p-4">
                <h2 className="text-sm font-semibold text-foreground">Buy</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.forSale
                    ? `Available for purchase${product.buyPrice ? ` — ${product.buyPrice}` : " — price on request"}`
                    : "Purchase on request"}
                </p>
                {product.forSale ? (
                  <Button asChild size="sm" className="mt-3 shadow-sm">
                    <a href={buyMailto(product)}>
                      <ShoppingCart className="size-4" /> Buy Now
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="mt-3 bg-white"
                  >
                    <a href={enquiryMailto(product)}>
                      <Mail className="size-4" /> Request Purchase
                    </a>
                  </Button>
                )}
              </div>

              {/* Rent */}
              <div className="rounded-xl border border-border/60 p-4">
                <h2 className="text-sm font-semibold text-foreground">Rent</h2>
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
                    <Button asChild size="sm" className="mt-3 shadow-sm">
                      <a href={rentMailto(product)}>
                        <RotateCcw className="size-4" /> Request Rental
                      </a>
                    </Button>
                  </div>
                ) : product.forRent === false ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Not available on rent — this item is sold only. Send us an
                    enquiry if you would like to purchase it.
                  </p>
                ) : (
                  <div className="mt-1 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Rental on request — availability and rates depend on the
                      item. Ask us and we will confirm.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="bg-white"
                    >
                      <a href={enquiryMailto(product)}>
                        <Mail className="size-4" /> Request Rental
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              <p className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                Price &amp; availability on request — we confirm the current
                price, stock and rental terms when you enquire.
              </p>
            </div>
          </Reveal>
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
            <AnimatedHeading
              as="h2"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Related products
            </AnimatedHeading>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="group overflow-hidden rounded-xl border border-border/60 bg-white transition-shadow hover:shadow-md"
                >
                  <div
                    className={cn(
                      "aspect-[4/3] overflow-hidden",
                      p.fit === "contain" ? "bg-white" : "bg-secondary",
                    )}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={cn(
                        "h-full w-full transition-transform duration-500 group-hover:scale-[1.04]",
                        p.fit === "contain" ? "object-contain" : "object-cover",
                      )}
                    />
                  </div>
                  <p className="p-3 text-sm font-medium text-foreground">
                    {p.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
