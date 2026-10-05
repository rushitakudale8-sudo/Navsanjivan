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
  { label: "Nursing & Patient Care Services", to: "/services" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
] as const;

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMenuOpen(false);
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
      {/* Single horizontal row: brand → nav → search → CTA */}
      <div className="mx-auto flex h-16 max-w-7xl flex-nowrap items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src={logo}
            alt={`${BUSINESS.name} logo`}
            className="size-9 object-contain"
          />
          <span className="leading-tight">
            <span className="block text-[17px] font-extrabold tracking-tight text-[#1565C0]">
              Navsanjivani
            </span>
            <span className="block text-xs font-semibold text-[#2E9BD6]">
              Surgical &amp; Bureau
            </span>
          </span>
        </Link>

        {/* Desktop nav — same row, compact pills */}
        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-nowrap items-center gap-0.5 xl:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = !link.to.includes("#") && location.pathname === link.to;
            const content = (
              <span className="relative whitespace-nowrap">
                {link.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#2E9BD6]"
                  />
                ) : null}
              </span>
            );
            return link.to.includes("#") ? (
              <a
                key={link.label}
                href={link.to}
                className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-[#3E5A6B] transition-colors hover:bg-[#EAF6FC] hover:text-[#174A63]"
              >
                {content}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors hover:bg-[#EAF6FC] hover:text-[#174A63]",
                  active
                    ? "bg-[#EAF6FC] font-semibold text-[#174A63]"
                    : "text-[#3E5A6B]",
                )}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions — inline search + CTA on the same row */}
        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          <form
            onSubmit={submitSearch}
            role="search"
            className="flex h-9 w-36 items-center gap-1.5 rounded-full border border-[#D7EAF3] bg-[#F7FCFF] pr-2 pl-3 transition-colors focus-within:border-[#2E9BD6]/50"
          >
            <Search className="size-3.5 shrink-0 text-[#7C93A3]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the catalog…"
              aria-label="Search the catalog"
              className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[13px] text-[#174A63] shadow-none placeholder:text-[#7C93A3] focus-visible:border-0 focus-visible:ring-0"
            />
          </form>

          <Button
            asChild
            className="h-9 rounded-full bg-[#1B84D8] px-4 text-[13px] font-semibold text-white shadow-md shadow-[#1B84D8]/30 transition-colors hover:bg-[#174A63]"
          >
            <a href="/#contact">
              Contact / Enquiry <ArrowRight className="size-3.5" />
            </a>
          </Button>
        </div>

        {/* Mobile / tablet actions — hamburger only */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu — search + links + CTA live inside the dropdown */}
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            key="menu"
            aria-label="Primary mobile"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={collapseTransition}
            className="overflow-hidden border-t border-border/60 xl:hidden"
          >
            <div className="px-4 pt-3 pb-4">
              <form
                onSubmit={submitSearch}
                role="search"
                className="mb-2 flex h-9 items-center gap-2 rounded-md border border-input bg-transparent px-3 shadow-xs focus-within:border-ring"
              >
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <Input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the catalog…"
                  aria-label="Search the catalog"
                  className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
                />
              </form>
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
