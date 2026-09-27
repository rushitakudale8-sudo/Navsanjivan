import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Reveal, SoftCard } from "@/components/site/SitePrimitives";
import type { ProductGroup, Product } from "@/data/catalog";

/** Product-group card: clickable, image-led, subtle hover lift. */
function GroupCard({ group }: { group: ProductGroup }) {
  return (
    <Reveal delay={0.03}>
      <Link to="/product-groups" className="block h-full">
        <SoftCard className="h-full overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
            <img
              src={group.image}
              alt={group.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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

/** Product card: image-led with name and product group, links into the products page. */
function ProductCard({ product }: { product: Product }) {
  return (
    <Reveal delay={0.03}>
      <SoftCard className="h-full overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground">{product.name}</h3>
          <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
            {product.group.split("-").join(" ")}
          </p>
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
      {groups.map((g) => (
        <GroupCard key={g.slug} group={g} />
      ))}
    </div>
  );
}

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
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
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
