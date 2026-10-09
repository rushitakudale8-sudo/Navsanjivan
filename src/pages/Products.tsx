import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SearchX } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductGrid } from "@/components/site/ProductGrid";
import { AnimatedHeading, Reveal } from "@/components/site/SitePrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCTS, type Product } from "@/data/catalog";
import { searchProducts } from "@/lib/productSearch";

type Filter = "all" | "buy" | "rent";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

/**
 * Availability filter.
 *
 * The whole catalogue is offered to buy or rent on enquiry, so a product only
 * drops out of a filter when its data explicitly says that option is not
 * available (`forSale: false` / `forRent: false`). Products without a flag stay
 * listed under every filter, so selecting "Buy" still shows all products.
 */
function matchesFilter(p: Product, f: Filter): boolean {
  const forSale = p.forSale !== false;
  const forRent = p.forRent !== false;
  switch (f) {
    case "buy":
      return forSale;
    case "rent":
      return forRent;
    default:
      return true;
  }
}

export default function Products() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const urlQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const query = (urlQuery || search).trim().toLowerCase();

  // Uses the shared catalogue search (name, category and keywords) so the
  // results page matches the navbar suggestions. Relevance order is kept.
  const filtered = useMemo(() => {
    if (!query) return PRODUCTS.filter((p) => matchesFilter(p, filter));
    return searchProducts(query)
      .map((r) => r.product)
      .filter((p) => matchesFilter(p, filter));
  }, [filter, query]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <AnimatedHeading
              as="h1"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Our Products
            </AnimatedHeading>
            <Reveal delay={0.1}>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Surgical and patient care equipment, available to buy or rent on
              enquiry.
              {urlQuery ? (
                <>
                  {" "}
                  Showing catalog results for{" "}
                  <span className="font-semibold text-foreground">
                    “{urlQuery}”
                  </span>
                  .
                </>
              ) : null}
            </p>

            {/* Search + availability filters — search field styled on the screenshot. */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full max-w-sm">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6b7280]"
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  /* pl-10 keeps the text clear of the icon (icon: left-3 + 16px). */
                  className="h-10 rounded-lg bg-white pl-10 shadow-sm placeholder:text-[#6b7280]"
                  aria-label="Search products"
                />
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter by availability"
              >
                {FILTERS.map((f) => (
                  <Button
                    key={f.value}
                    size="sm"
                    variant={filter === f.value ? "default" : "outline"}
                    className={filter === f.value ? "" : "bg-white"}
                    onClick={() => setFilter(f.value)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <Reveal className="flex flex-col items-center gap-4 py-20 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary">
                <SearchX className="size-6" />
              </span>
              <p className="text-lg font-medium text-foreground">
                {query
                  ? `No products match “${query}”`
                  : "No products match this filter"}
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                {query
                  ? "Try a different name, or send us an enquiry — we may still be able to source it for you."
                  : "Try another availability option, or send us an enquiry and we will confirm what's possible."}
              </p>
              <Button asChild variant="outline" className="mt-2 bg-white">
                <a href="/#contact">Send an enquiry</a>
              </Button>
            </Reveal>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
