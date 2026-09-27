import type { Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * 4x4 collage of product photos in orange rounded frames on a warm cream
 * backdrop — matches the supplied Navsanjivani brand collage.
 */
export function ProductCollage({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="Collage of surgical and patient-care products supplied by Navsanjivani"
      className={cn(
        "grid grid-cols-4 gap-2 rounded-[1.75rem] bg-[#FDF3E3] p-2 sm:gap-3 sm:p-4",
        className,
      )}
    >
      {products.slice(0, 16).map((product) => (
        <div
          key={product.slug}
          className="overflow-hidden rounded-lg border-[3px] border-[#F0A24F] bg-white sm:rounded-xl sm:border-4"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
