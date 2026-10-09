import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router";
import {
  BriefcaseMedical,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Stethoscope,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Reveal } from "@/components/site/SitePrimitives";
import { BUSINESS, PRODUCT_GROUPS } from "@/data/catalog";
import { cn } from "@/lib/utils";

const linkClass =
  "group inline-flex items-start gap-2 rounded-md text-sm text-foreground/80 transition-all duration-200 hover:text-[#174A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BAED6] focus-visible:ring-offset-2 motion-safe:group-hover:translate-x-1";

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  const inner = (
    <>
      <ChevronRight
        aria-hidden="true"
        className="mt-[3px] size-4 shrink-0 text-[#5BAED6] transition-transform duration-200 motion-safe:group-hover:scale-110"
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

/** Card header: circular blue icon chip, title, and short blue underline. */
function CardHeader({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BAED6] to-[#174A63] text-white shadow-md">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-[#174A63]">{title}</h3>
        <span aria-hidden="true" className="mt-1 block h-[3px] w-10 rounded-full bg-[#5BAED6]" />
      </div>
    </div>
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
  // Every product group, split into the two published columns.
  const groupsColA = PRODUCT_GROUPS.filter((_, i) => i % 2 === 0);
  const groupsColB = PRODUCT_GROUPS.filter((_, i) => i % 2 === 1);

  return (
    <footer className="relative overflow-hidden bg-[#EAF6FC]">
      {/* ---- decorative layer: hidden from assistive tech, ignores clicks ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-24 size-80 rounded-full bg-white/70 blur-3xl animate-aurora-slow" />
        {/* layered waves along the bottom */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-44 w-full text-[#B9DFF2]/45"
        >
          <path
            d="M0 110C240 40 480 170 720 130C960 90 1200 170 1440 100V220H0V110Z"
            fill="currentColor"
          />
        </svg>
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-32 w-full text-[#5BAED6]/20"
        >
          <path
            d="M0 160C240 220 480 100 720 140C960 180 1200 100 1440 160V220H0V160Z"
            fill="currentColor"
          />
        </svg>
        {/* stethoscope accent, bottom-left */}
        <Stethoscope
          className="absolute bottom-3 left-2 size-40 -rotate-12 text-[#174A63]/10 animate-floaty-slow"
          strokeWidth={1}
        />
        {/* medical crosses, bottom-right */}
        <PlusCross className="absolute bottom-16 right-24 size-6 text-[#5BAED6]/35 animate-floaty" />
        <PlusCross className="absolute bottom-8 right-8 size-4 text-[#5BAED6]/25 animate-floaty-slow" />
        <PlusCross className="absolute bottom-28 right-40 size-3 text-[#5BAED6]/20 animate-floaty-slow" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
          {/* ---- brand ---- */}
          <Reveal className="h-full">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt={`${BUSINESS.name} logo`}
                className="size-20 shrink-0 object-contain"
              />
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-[#174A63]">
                  Navsanjivani
                </p>
                <p className="mt-0.5 text-lg font-medium text-foreground/85">
                  Surgical and Nursing Beuro
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/60">
              Quality | Care | Trust
            </p>

            <ul className="mt-7 space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5BAED6] text-white shadow-sm">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <span className="pt-1 text-sm leading-relaxed text-foreground/85">
                  {BUSINESS.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5BAED6] text-white shadow-sm">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="rounded-md pt-1 text-sm text-foreground/85 underline-offset-2 hover:text-[#174A63] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BAED6] focus-visible:ring-offset-2"
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>

            {/* script health line */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-12 shrink-0 bg-[#B9DFF2] sm:w-20" />
              <p className="whitespace-nowrap font-script text-2xl leading-none text-[#174A63]/80">
                Your Health{" "}
                <Heart
                  aria-hidden="true"
                  className="mb-1 inline size-4 fill-[#5BAED6] text-[#5BAED6]"
                />{" "}
                Our Priority
              </p>
              <span aria-hidden="true" className="h-px w-12 shrink-0 bg-[#B9DFF2] sm:w-20" />
            </div>
          </Reveal>

          {/* ---- product list ---- */}
          <Reveal delay={0.08} className="h-full">
            <nav aria-label="Product list" className="h-full">
              <div className="h-full rounded-2xl border border-[#B9DFF2]/50 bg-white p-5 shadow-[0_16px_40px_-28px_rgba(23,74,99,0.5)] sm:p-6">
                <CardHeader icon={BriefcaseMedical} title="Product List" />
                <div className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {[groupsColA, groupsColB].map((column, idx) => (
                    <ul
                      key={idx}
                      className={cn("space-y-3.5", idx === 1 && "mt-3.5 sm:mt-0")}
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

        </div>

        {/* ---- bottom area: ECG heartbeat + healthcare tagline ---- */}
        <Reveal className="mt-12 flex flex-col items-center" delay={0.1}>
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            <EcgTrace className="h-7 w-28 text-[#5BAED6] sm:w-40" />
            <Heart className="size-5 fill-[#5BAED6] text-[#5BAED6]" />
            <EcgTrace className="h-7 w-28 -scale-x-100 text-[#5BAED6] sm:w-40" />
          </div>
          <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-xs">
            Better Equipment • Better Care • Healthier Tomorrow
          </p>
        </Reveal>
      </div>

      {/* ---- legal bar: copyright + disclaimer preserved ---- */}
      <div className="relative border-t border-[#B9DFF2]/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-foreground/70 sm:flex-row sm:px-6">
          <p>© 2010 {BUSINESS.name}. All rights reserved.</p>
          <p className="font-medium">{BUSINESS.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
