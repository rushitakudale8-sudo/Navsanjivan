import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SearchX } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Reveal } from "@/components/site/SitePrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PRODUCT_GROUPS, PRODUCTS, type Product } from "@/data/catalog";

type Filter = "all" | "buy" | "rent" | "buy-rent";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "buy-rent", label: "Buy & Rent" },
];

function matchesFilter(p: Product, f: Filter): boolean {
  switch (f) {
    case "buy":
      return p.forSale === true;
    case "rent":
      return p.forRent === true;
    case "buy-rent":
      return p.forSale === true && p.forRent === true;
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

  // Search matches the product name, its product group, and the group's
  // description; the availability filter applies strictly to configured data.
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (!matchesFilter(p, filter)) return false;
      if (!query) return true;
      const group = PRODUCT_GROUPS.find((g) => g.slug === p.group);
      return (
        p.name.toLowerCase().includes(query) ||
        group?.name.toLowerCase().includes(query) ||
        group?.blurb.toLowerCase().includes(query)
      );
    });
  }, [filter, query]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <Reveal>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Products
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Surgical and patient-care equipment, available to buy or rent on
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

            {/* Search + availability filters */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="bg-white pl-9"
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
                {filter === "all"
                  ? "Try a different name, or send us an enquiry — we may still be able to source it for you."
                  : "This availability is not configured for any product yet — send us an enquiry and we will confirm what's possible."}
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
