import { Link } from "react-router";
import logo from "@/assets/logo.svg";
import { BUSINESS, PRODUCT_GROUPS } from "@/data/catalog";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        {/* Brand + address */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt={`${BUSINESS.name} logo`}
              className="h-10 w-10"
            />
            <span className="text-base font-bold text-foreground">
              Navsanjivani
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {BUSINESS.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {BUSINESS.address}
          </p>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            {BUSINESS.email}
          </a>
        </div>

        {/* Product groups */}
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Product Groups
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {PRODUCT_GROUPS.slice(0, 10).map((g) => (
              <li key={g.slug}>
                <Link
                  to="/product-groups"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-sm font-semibold text-foreground">Pages</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/product-groups"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Product Groups
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Nursing and Patient Care Services
              </Link>
            </li>
            <li>
              <a href="/#about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="/#contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="font-medium">{BUSINESS.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
