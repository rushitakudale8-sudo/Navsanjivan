import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchProducts } from "@/lib/productSearch";

const MAX_SUGGESTIONS = 6;

type Variant = "inline" | "menu";

/** Per-variant class maps so both placements keep the exact original design. */
const STYLES: Record<
  Variant,
  {
    form: string;
    icon: string;
    input: string;
    clear: string;
    dropdown: string;
  }
> = {
  inline: {
    form: "flex h-9 w-36 items-center gap-1.5 rounded-full border border-[#D7EAF3] bg-[#F7FCFF] pr-2 pl-3 transition-colors focus-within:border-[#2E9BD6]/50",
    icon: "size-3.5 shrink-0 text-[#7C93A3]",
    input:
      "h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[13px] text-[#174A63] shadow-none placeholder:text-[#7C93A3] focus-visible:border-0 focus-visible:ring-0",
    clear:
      "grid size-5 shrink-0 place-items-center rounded-full text-[#7C93A3] transition-colors hover:bg-[#EAF6FC] hover:text-[#174A63]",
    dropdown:
      "absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border border-[#D7EAF3] bg-white shadow-xl",
  },
  menu: {
    form: "flex h-9 items-center gap-2 rounded-md border border-input bg-transparent px-3 shadow-xs focus-within:border-ring",
    icon: "size-4 shrink-0 text-muted-foreground",
    input:
      "h-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:border-0 focus-visible:ring-0",
    clear:
      "grid size-5 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
    // Flows inside the animated mobile menu so it is never clipped by the
    // menu's overflow-hidden height animation.
    dropdown:
      "mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-xl",
  },
};

/**
 * Working product search box. Shows live suggestions while typing, opens the
 * matching product on click, and a full results page on Enter.
 */
export function ProductSearch({
  variant = "inline",
  onNavigate,
  autoFocus = false,
}: {
  variant?: Variant;
  /** Called after any navigation (used to close the mobile menu). */
  onNavigate?: () => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const s = STYLES[variant];

  const hasQuery = query.trim().length > 0;
  const results = useMemo(() => searchProducts(query), [query]);
  const suggestions = results.slice(0, MAX_SUGGESTIONS);

  // Close when clicking outside the search box.
  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    }
    document.addEventListener("mousedown", onDocPointerDown);
    document.addEventListener("touchstart", onDocPointerDown);
    return () => {
      document.removeEventListener("mousedown", onDocPointerDown);
      document.removeEventListener("touchstart", onDocPointerDown);
    };
  }, [open]);

  // Reset the highlight whenever the query changes.
  useEffect(() => {
    setActive(-1);
  }, [query]);

  function close() {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
  }

  function goToResults(q: string) {
    const trimmed = q.trim();
    navigate(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
    close();
  }

  function openProduct(slug: string) {
    navigate(`/products/${slug}`);
    close();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (open && active >= 0 && suggestions[active]) {
      openProduct(suggestions[active].product.slug);
      return;
    }
    if (hasQuery) goToResults(query);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  const showDropdown = open && hasQuery;

  return (
    <div
      ref={rootRef}
      className={cn("relative", variant === "inline" && "shrink-0")}
    >
      <form onSubmit={onSubmit} role="search" className={s.form}>
        <Search className={s.icon} aria-hidden />
        <Input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search"
          aria-label="Search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          className={s.input}
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
              setActive(-1);
            }}
            aria-label="Clear search"
            className={s.clear}
          >
            <X className="size-3.5" />
          </button>
        )}
      </form>

      {showDropdown && (
        <div id={listId} role="listbox" className={s.dropdown}>
          {suggestions.length > 0 ? (
            <>
              <ul className="max-h-80 overflow-y-auto py-1">
                {suggestions.map((r, i) => (
                  <li key={r.product.slug}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => openProduct(r.product.slug)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors",
                        i === active ? "bg-[#EAF6FC]" : "hover:bg-[#F7FCFF]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#D7EAF3]",
                          r.product.fit === "contain" ? "bg-white" : "bg-secondary",
                        )}
                      >
                        <img
                          src={r.product.image}
                          alt=""
                          loading="lazy"
                          className={cn(
                            "h-full w-full",
                            r.product.fit === "contain"
                              ? "object-contain p-0.5"
                              : "object-cover",
                          )}
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold text-[#174A63]">
                          {r.product.name}
                        </span>
                        <span className="block truncate text-[11px] text-[#7C93A3]">
                          {r.group?.name ?? "Product"}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => goToResults(query)}
                className="flex w-full items-center justify-between gap-2 border-t border-[#D7EAF3] bg-[#F7FCFF] px-3 py-2.5 text-[12px] font-semibold text-[#1B84D8] transition-colors hover:bg-[#EAF6FC]"
              >
                <span className="truncate">
                  See all results for “{query.trim()}”
                </span>
                <ArrowRight className="size-3.5 shrink-0" />
              </button>
            </>
          ) : (
            <p className="px-3 py-4 text-center text-[13px] text-[#7C93A3]">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
