import { useSearchParams } from "react-router";
import { SearchX } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/catalog";

export default function Products() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const filtered = query
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query))
    : PRODUCTS;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Products
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Medical, surgical and patient-care equipment available on enquiry.
              {query ? (
                <>
                  {" "}
                  Showing results for{" "}
                  <span className="font-semibold text-foreground">“{query}”</span>.
                </>
              ) : null}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary">
                <SearchX className="size-6" />
              </span>
              <p className="text-lg font-medium text-foreground">
                No products match “{query}”
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                Try a different name, or send us an enquiry — we may still be able
                to source it for you.
              </p>
              <Button asChild variant="outline" className="mt-2 bg-white">
                <a href="/#contact">Send an enquiry</a>
              </Button>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
