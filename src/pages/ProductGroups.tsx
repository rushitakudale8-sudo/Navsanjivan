import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductGroupGrid } from "@/components/site/ProductGrid";
import { Button } from "@/components/ui/button";
import { PRODUCT_GROUPS } from "@/data/catalog";

export default function ProductGroups() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Product Groups
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {PRODUCT_GROUPS.length} product groups covering mobility, hospital
              furniture, monitoring, respiratory care, hygiene and daily patient
              comfort. Browse the groups, then enquire for availability and
              pricing.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <ProductGroupGrid groups={PRODUCT_GROUPS} />

          <div className="mt-14 rounded-2xl border border-border/70 bg-gradient-to-r from-accent/60 to-secondary/60 px-6 py-8 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              Can't find what you're looking for?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Send us an enquiry with the product or care service you need and we
              will get back to you with availability.
            </p>
            <Button asChild className="mt-5 shadow-md">
              <a href="/#contact">Contact / Enquiry</a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
