import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, Heart, Mail, MapPin, Stethoscope } from "lucide-react";
import logo from "@/assets/logo.png";
import { Reveal } from "@/components/site/SitePrimitives";
import { BUSINESS, PRODUCT_GROUPS } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * Footer navigation — mirrors the header links exactly.
 * Routes are preserved; hash links stay plain anchors so in-page scrolling
 * behaviour is unchanged.
 */
const PAGES: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Product Groups", to: "/product-groups" },
  { label: "Nursing and Patient Care Services", to: "/services" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

const linkClass =
  "group inline-flex items-start gap-1.5 rounded-md text-sm text-foreground/80 transition-all duration-200 hover:text-[#174A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BAED6] focus-visible:ring-offset-2 motion-safe:group-hover:translate-x-1";

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  const inner = (
    <>
      <ArrowRight
        aria-hidden="true"
        className="mt-[3px] size-3.5 shrink-0 text-[#5BAED6] transition-transform duration-200 motion-safe:group-hover:scale-110"
      />
      <span>{children}</span>
    </>
  );

  return to.includes("#") ? (
    <a href={to} className={linkClass}>
      {inner}
    </a>
  ) : (
    <Link to={to} className={linkClass}>
      {inner}
    </Link>
  );
}

/** Small rounded medical cross used as a decorative accent. */
function PlusCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
    </svg>
  );
}

/** Short ECG trace used either side of the heartbeat heart. */
function EcgTrace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M0 16h28l5-8 6 16 6-22 6 14 4-4h13l4-6 5 10 3-4h40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteFooter() {
  // First ten real product groups, split into the two published columns.
  const topTen = PRODUCT_GROUPS.slice(0, 10);
  const groupsColA = topTen.filter((_, i) => i % 2 === 0);
  const groupsColB = topTen.filter((_, i) => i % 2 === 1);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#EAF6FC] via-white to-[#EAF6FC]/70">
      {/* ---- decorative layer: hidden from assistive tech, ignores clicks ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-24 size-80 rounded-full bg-[#B9DFF2]/35 blur-3xl animate-aurora-slow" />
        <div className="absolute -left-20 bottom-28 size-64 rounded-full bg-[#B9DFF2]/25 blur-3xl animate-aurora" />
        <Stethoscope
          className="absolute -bottom-8 right-4 size-48 rotate-12 text-[#5BAED6]/10 animate-floaty-slow"
          strokeWidth={1}
        />
        <PlusCross className="absolute right-16 top-12 size-5 text-[#5BAED6]/35 animate-floaty" />
        <PlusCross className="absolute left-8 top-1/2 size-4 text-[#5BAED6]/25 animate-floaty-slow" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-2 pt-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:gap-10">
          {/* ---- brand ---- */}
          <Reveal className="h-full">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={`${BUSINESS.name} logo`}
                className="size-14 shrink-0 rounded-xl object-contain"
              />
              <div>
                <p className="text-lg font-extrabold tracking-tight text-[#174A63]">
                  Navsanjivani
                </p>
                <p className="text-xs font-medium text-foreground/70">
                  Surgical and Nursing Beuro
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold tracking-wide text-[#174A63]">
              Quality | Care | Trust
            </p>

            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#5BAED6] transition-transform duration-200 motion-safe:hover:scale-110"
                />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#5BAED6] transition-transform duration-200 motion-safe:hover:scale-110"
                />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="rounded-md font-medium text-[#174A63] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BAED6] focus-visible:ring-offset-2"
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </Reveal>

          {/* ---- product groups ---- */}
          <Reveal delay={0.08} className="h-full">
            <nav aria-label="Product groups" className="h-full">
              <div className="h-full rounded-2xl border border-[#B9DFF2]/60 bg-gradient-to-br from-[#EAF6FC] via-white to-white p-5 shadow-[0_14px_36px_-24px_rgba(23,74,99,0.45)] sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#174A63]">
                  Product Groups
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {[groupsColA, groupsColB].map((column, idx) => (
                    <ul
                      key={idx}
                      className={cn("space-y-2.5", idx === 1 && "mt-2.5 sm:mt-0")}
                    >
                      {column.map((group) => (
                        <li key={group.slug}>
                          <FooterLink to="/product-groups">{group.name}</FooterLink>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </nav>
          </Reveal>

          {/* ---- pages ---- */}
          <Reveal delay={0.16} className="h-full">
            <nav aria-label="Footer pages" className="h-full">
              <div className="h-full rounded-2xl border border-[#B9DFF2]/60 bg-gradient-to-br from-[#EAF6FC] via-white to-white p-5 shadow-[0_14px_36px_-24px_rgba(23,74,99,0.45)] sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#174A63]">
                  Pages
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {PAGES.map((page) => (
                    <li key={page.label}>
                      <FooterLink to={page.to}>{page.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </Reveal>
        </div>

        {/* ---- bottom area: ECG heartbeat + healthcare tagline ---- */}
        <Reveal className="mt-12 flex flex-col items-center" delay={0.1}>
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            <EcgTrace className="h-7 w-24 text-[#5BAED6] sm:w-32" />
            <Heart className="size-4 fill-[#174A63] text-[#174A63]" />
            <EcgTrace className="h-7 w-24 -scale-x-100 text-[#5BAED6] sm:w-32" />
          </div>
          <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#174A63] sm:text-xs">
            Better Equipment • Better Care • Healthier Tomorrow
          </p>
        </Reveal>
      </div>

      {/* ---- wave divider into the legal bar ---- */}
      <div aria-hidden="true" className="relative">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="block h-10 w-full sm:h-12"
        >
          <path
            d="M0 46C180 70 360 14 540 30C720 46 900 70 1080 50C1260 30 1350 38 1440 54V72H0V46Z"
            fill="#EAF6FC"
          />
        </svg>
      </div>

      {/* ---- legal bar: copyright + disclaimer preserved ---- */}
      <div className="relative bg-[#EAF6FC]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 pb-6 pt-1 text-xs text-foreground/70 sm:flex-row sm:px-6">
          <p>© 2010 {BUSINESS.name}. All rights reserved.</p>
          <p className="font-medium">{BUSINESS.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
