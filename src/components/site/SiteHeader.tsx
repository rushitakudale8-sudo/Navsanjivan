import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BUSINESS } from "@/data/catalog";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Product Groups", to: "/product-groups" },
  { label: "Nursing and Patient Care Services", to: "/services" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
] as const;

export function SiteHeader() {
  const reduce = useReducedMotion();
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

  const collapseTransition = reduce
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" as const };

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-border/60 bg-white/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt={`${BUSINESS.name} logo`}
            className="size-9 object-contain"
          />
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-[#174A63]">
              Navsanjivani
            </span>
            <span className="block text-[11px] font-medium text-[#5BAED6]">
              And Nursing Beuro
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) =>
            link.to.includes("#") ? (
              <a
                key={link.label}
                href={link.to}
                className="rounded-full px-3 py-2 text-[13px] font-medium text-[#4B6472] transition-colors hover:bg-[#EAF6FC] hover:text-[#174A63]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-[#EAF6FC] hover:text-[#174A63]",
                  location.pathname === link.to
                    ? "text-[#174A63]"
                    : "text-[#4B6472]",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <form onSubmit={submitSearch} className="relative hidden xl:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the catalog…"
              className="w-44 pl-9"
              aria-label="Search the catalog"
            />
          </form>

          {/* Search icon toggle below xl where the inline box is hidden */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search the catalog"
            className="hidden size-9 rounded-full lg:flex xl:hidden"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="size-4" />
          </Button>

          <Button
            asChild
            className="h-9 rounded-full bg-gradient-to-r from-[#2E9BD6] to-[#174A63] px-4 text-[13px] font-semibold shadow-md shadow-[#5BAED6]/30 transition-shadow hover:shadow-lg hover:shadow-[#5BAED6]/40"
          >
            <a href="/#contact">
              Contact / Enquiry <ArrowRight className="size-3.5" />
            </a>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search the catalog"
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

      {/* Collapsible search bar (below xl) */}
      <AnimatePresence initial={false}>
        {searchOpen ? (
          <motion.div
            key="search"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={collapseTransition}
            className="overflow-hidden border-t border-border/60 xl:hidden"
          >
            <div className="px-4 py-3">
              <form onSubmit={submitSearch} className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the catalog…"
                  className="pl-9"
                  aria-label="Search the catalog"
                />
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {menuOpen ? (
        <motion.nav
          key="menu"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={collapseTransition}
          className="overflow-hidden border-t border-border/60 lg:hidden"
        >
          <div className="px-4 pt-2 pb-4">
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
          </div>
        </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
