import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, Search, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BUSINESS } from "@/data/catalog";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Product Groups", to: "/product-groups" },
  { label: "Nursing & Patient Care Services", to: "/services" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.hash]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setSearchOpen(false);
    setSearch("");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt={`${BUSINESS.name} logo`}
            className="h-9 w-9 rounded-lg bg-primary p-1.5"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-foreground sm:text-base">
              Navsanjivani
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Surgical &amp; Nursing Beuro
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.to.includes("#") ? (
              <a
                key={link.label}
                href={link.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary",
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-foreground/80",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-44 pl-9"
              aria-label="Search products"
            />
          </form>
          <Button asChild className="shadow-sm">
            <a href="/#contact">Contact / Enquiry</a>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen ? (
        <div className="border-t border-border/60 px-4 py-3 lg:hidden">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="pl-9"
              aria-label="Search products"
            />
          </form>
        </div>
      ) : null}

      {/* Mobile menu */}
      {menuOpen ? (
        <nav className="border-t border-border/60 px-4 pt-2 pb-4 lg:hidden">
          {NAV_LINKS.map((link) =>
            link.to.includes("#") ? (
              <a
                key={link.label}
                href={link.to}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-accent"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-accent"
              >
                {link.label}
              </Link>
            ),
          )}
          <Button asChild className="mt-3 w-full">
            <a href="/#contact">Contact / Enquiry</a>
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
