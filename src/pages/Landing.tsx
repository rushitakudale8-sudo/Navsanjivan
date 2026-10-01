import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  Clock,
  HandHeart,
  HeartHandshake,
  Hospital,
  Mail,
  MapPin,
  Moon,
  Plus,
  ShieldCheck,
  Stethoscope,
  Sun,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatedHeading,
  Reveal,
  SectionHeading,
} from "@/components/site/SitePrimitives";
import { ProductGroupGrid, ProductGrid } from "@/components/site/ProductGrid";
import collage from "@/assets/product-collage.png";
import logo from "@/assets/logo.png";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BUSINESS,
  CARE_SERVICES,
  PRODUCT_GROUPS,
  PRODUCTS,
  type CareService,
} from "@/data/catalog";

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "A reliable supply partner for hospitals, clinics and nursing facilities" },
  { icon: Truck, label: "Delivery across Pune and nearby areas" },
  { icon: ShieldCheck, label: "Carefully sourced surgical and patient-care equipment" },
];

/** Subtle repeating medical-cross pattern for the services section background. */
// Medical-cross background pattern is declared below.
// "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect x='54' y='26' width='12' height='38' rx='3' fill='%235BAED6' fill-opacity='0.08'/%3E%3Crect x='41' y='39' width='38' height='12' rx='3' fill='%235BAED6' fill-opacity='0.08'/%3E%3C/svg%3E")";

/** Subtle repeating medical-cross pattern for the services section background. */
const CROSS_PATTERN =
  "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27120%27%20height=%27120%27%3E%3Crect%20x=%2754%27%20y=%2726%27%20width=%2712%27%20height=%2738%27%20rx=%273%27%20fill=%27%235BAED6%27%20fill-opacity=%270.08%27/%3E%3Crect%20x=%2741%27%20y=%2739%27%20width=%2738%27%20height=%2712%27%20rx=%273%27%20fill=%27%235BAED6%27%20fill-opacity=%270.08%27/%3E%3C/svg%3E)";

/** Per-service icon + tag for the nursing & patient care cards. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  nurses: Stethoscope,
  caregivers: HeartHandshake,
  "patient-care-assistants": HandHeart,
  "ward-attendants": Hospital,
};

const SERVICE_TAGS: Record<string, string> = {
  nurses: "Nursing Support",
  caregivers: "Home Care",
  "patient-care-assistants": "Patient Support",
  "ward-attendants": "Facility Care",
};

function AvailabilityBadge({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B9DFF2] bg-white px-3 py-1 text-xs font-medium text-[#174A63] shadow-sm">
      <Icon aria-hidden="true" className="size-3.5 text-[#5BAED6]" />
      {label}
    </span>
  );
}

/** Short ECG trace used as a decorative healthcare accent. */
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

function ServiceCard({
  service,
  icon: Icon,
  tag,
  index,
}: {
  service: CareService;
  icon: LucideIcon;
  tag: string;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: reduce ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      className="group h-full overflow-hidden rounded-[18px] border border-[#D7EAF3] bg-white shadow-[0_10px_30px_-18px_rgba(23,74,99,0.28)] transition-all duration-300 hover:border-[#5BAED6] hover:shadow-[0_20px_46px_-22px_rgba(23,74,99,0.42),0_0_28px_-8px_rgba(91,174,214,0.4)] motion-safe:hover:-translate-y-[7px]"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#174A63]/45 via-[#174A63]/12 to-transparent"
        />
      </div>

      <div className="relative p-5 pt-10">
        <span
          aria-hidden="true"
          className="absolute -top-6 left-5 flex size-12 items-center justify-center rounded-full border-2 border-white bg-[#EAF6FC] text-[#174A63] shadow-sm transition-transform duration-200 motion-safe:group-hover:scale-110"
        >
          <Icon className="size-5" />
        </span>

        <span className="inline-flex rounded-full bg-[#EAF6FC] px-2.5 py-1 text-[11px] font-semibold text-[#174A63]">
          {tag}
        </span>

        <h3 className="mt-2.5 text-lg font-bold text-[#174A63]">{service.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#4B6472]">
          {service.blurb}
        </p>
      </div>
    </motion.article>
  );
}

export default function Landing() {
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background">
        {/* soft decorative blobs */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-accent/50 blur-3xl ${reduce ? "" : "animate-aurora-slow"}`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute top-40 -left-24 size-72 rounded-full bg-secondary blur-3xl ${reduce ? "" : "animate-floaty-slow"}`}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-24 lg:pb-28">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase shadow-sm">
                <Stethoscope className="size-3.5" />
                Surgical Equipment · Patient Care Services
              </span>
            </Reveal>

            <AnimatedHeading
              as="h1"
              className="mt-5 text-4xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
            >
              Quality Medical Equipment.{" "}
              <span className="text-primary">Better Patient Care</span>
            </AnimatedHeading>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                {BUSINESS.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="shadow-md">
                  <Link to="/products">
                    Explore Products <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white">
                  <a href="/#contact">Contact Us</a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-10 grid gap-3 sm:grid-cols-1">
                {TRUST_POINTS.map((point) => (
                  <li
                    key={point.label}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                      <point.icon className="size-4" />
                    </span>
                    {point.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Hero image with floating accent cards */}
          <Reveal delay={0.2} y={24}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_24px_60px_-24px_rgba(23,74,99,0.35)]">
                <img
                  src={collage}
                  alt="Navsanjivani product range: air mattresses, hospital beds, nebulizers, BP monitors, pulse oximeters, wheelchairs, walkers, crutches, thermometers, sleeping wheelchairs, commode chairs, hot water bags and underpads"
                  className="w-full object-contain"
                />
              </div>

              <div
                className={`absolute -bottom-5 left-6 rounded-2xl border border-border/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur ${reduce ? "" : "animate-floaty"}`}
              >
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <HeartHandshake className="size-4 text-foreground/80" /> Nursing
                  and patient care
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">
                  Nurses · Caregivers · Attendants
                </p>
              </div>

              <div
                className={`absolute -top-5 right-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur ${reduce ? "" : "animate-floaty-slow"}`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-400 text-white shadow-md">
                  <CircleCheck className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    Buy &amp; Rent Options
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    On most medical equipment
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PRODUCT GROUPS ============ */}
      <section id="product-groups" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
        <SectionHeading
          label="Products"
          title="Browse the catalog by product group"
          description="Sixteen product groups covering mobility, hospital furniture, monitoring, respiratory care, hygiene and everyday patient comfort."
        />
        <div className="mt-12">
          <ProductGroupGrid groups={PRODUCT_GROUPS} />
        </div>
        <Reveal className="mt-10 text-center" delay={0.05}>
          <Button asChild variant="outline" className="bg-white">
            <Link to="/product-groups">
              View all product groups <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* ============ OUR PRODUCTS ============ */}
      <section id="products" className="scroll-mt-16 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            label="Our Products"
            title="Our Products"
            description="A snapshot of the equipment we supply. Enquire for availability, brands and pricing."
          />
          <div className="mt-12">
            <ProductGrid products={PRODUCTS} />
          </div>
          <Reveal className="mt-10 text-center" delay={0.05}>
            <Button asChild className="shadow-md">
              <Link to="/products">
                Explore all products <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ============ NURSING & PATIENT CARE SERVICES ============ */}
      <section
        id="services"
        className="relative scroll-mt-16 overflow-hidden bg-[#F7FCFF] py-24"
      >
        {/* soft gradient glow behind the heading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[38rem] max-w-full -translate-x-1/2 rounded-full bg-[#B9DFF2]/40 blur-3xl"
        />
        {/* extremely subtle medical cross pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: CROSS_PATTERN }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-[#B9DFF2] bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#174A63] shadow-sm">
                Services
              </span>
            </Reveal>

            <AnimatedHeading
              as="h2"
              align="center"
              underlineWidth={60}
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#174A63] sm:text-4xl lg:text-[2.75rem]"
            >
              Nursing and Patient Care Services
            </AnimatedHeading>

            <Reveal delay={0.15}>
              <p className="mt-4 text-sm font-medium tracking-wide text-[#5BAED6] sm:text-base">
                Nurses | Caregivers | Patient Care Assistants | Ward Attendants
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_SERVICES.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                icon={SERVICE_ICONS[service.slug] ?? Stethoscope}
                tag={SERVICE_TAGS[service.slug] ?? "Care Support"}
                index={index}
              />
            ))}
          </div>

          {/* ---- enquiry CTA banner ---- */}
          <Reveal className="mt-16" delay={0.05}>
            <div className="rounded-[18px] border border-[#B9DFF2] bg-gradient-to-br from-[#EAF6FC] to-[#D7F0FA] p-6 sm:p-8">
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#174A63] text-white shadow-md">
                    <HeartHandshake aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#174A63]">
                      Nursing &amp; Caretaker Support
                    </h3>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <AvailabilityBadge icon={Sun} label="Day" />
                      <AvailabilityBadge icon={Moon} label="Night" />
                      <AvailabilityBadge icon={Clock} label="24/7 Available" />
                    </div>
                    <p className="mt-3 max-w-xl text-sm text-[#4B6472]">
                      Day, Night &amp; 24/7 support available according to your
                      requirements.
                    </p>
                  </div>
                </div>

                <a
                  href="/#contact"
                  className="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-[#174A63] px-[22px] py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#5BAED6] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BAED6] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5"
                >
                  Enquire About Care Services
                </a>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-[#5B7280]">
              Flexible care support for homes, hospitals, nursing facilities and
              families.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT US ============ */}
      <section
        id="about"
        className="relative scroll-mt-16 overflow-hidden bg-[#F7FCFF] py-24"
      >
        {/* decorative healthcare layer */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-8 size-72 rounded-full bg-[#B9DFF2]/30 blur-3xl animate-aurora-slow" />
          <Plus className="absolute left-8 top-10 size-7 text-[#5BAED6]/25 animate-floaty-slow" />
          <Plus className="absolute right-10 top-16 size-9 text-[#5BAED6]/30 animate-floaty" />
          <div
            className="absolute left-10 top-24 size-24 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#5BAED6 1.4px, transparent 1.4px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div
            className="absolute bottom-16 right-12 size-20 opacity-30"
            style={{
              backgroundImage: "radial-gradient(#5BAED6 1.4px, transparent 1.4px)",
              backgroundSize: "16px 16px",
            }}
          />
          <Stethoscope
            className="absolute -bottom-6 left-2 size-44 -rotate-12 text-[#174A63]/10 animate-floaty-slow"
            strokeWidth={1}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          {/* brand card */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-[28px] border border-[#D7EAF3] bg-white px-6 py-12 text-center shadow-[0_28px_70px_-32px_rgba(23,74,99,0.45)]">
              <img
                src={logo}
                alt={`${BUSINESS.name} logo`}
                className="w-full max-w-[340px] object-contain"
              />
              <span className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#EAF6FC] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#174A63]">
                Quality
                <span aria-hidden="true" className="text-[#5BAED6]">•</span>
                Care
                <span aria-hidden="true" className="text-[#5BAED6]">•</span>
                Trust
              </span>
            </div>
          </Reveal>

          {/* copy */}
          <div>
            <div className="relative border-l-2 border-[#5BAED6]/40 pl-6 lg:pl-8">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF6FC] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#174A63]">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-[#5BAED6]" />
                  About Us
                </span>
              </Reveal>

              <AnimatedHeading
                as="h2"
                align="left"
                underlineWidth={60}
                className="mt-4 text-3xl font-extrabold tracking-tight text-[#174A63] sm:text-4xl lg:text-[2.75rem]"
              >
                Your partner in patient care
              </AnimatedHeading>

              <Reveal delay={0.1}>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#4B6472]">
                  <p>
                    {BUSINESS.name} supplies{" "}
                    <strong className="font-semibold text-[#174A63]">
                      surgical and patient-care equipment
                    </strong>{" "}
                    and provides{" "}
                    <strong className="font-semibold text-[#174A63]">
                      nursing and caretaker services
                    </strong>{" "}
                    to hospitals, clinics, nursing facilities and families caring
                    for loved ones at home.
                  </p>
                  <p>
                    From wheelchairs and hospital beds to monitors, nebulizers and
                    daily-care essentials, we focus on{" "}
                    <strong className="font-semibold text-[#174A63]">
                      dependable products, careful sourcing
                    </strong>{" "}
                    and straight guidance — so you can choose the right equipment
                    and the right care for each patient.
                  </p>
                  <p>
                    Based in Kothrud, Pune, we serve customers across the city and
                    nearby areas.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* trust highlights */}
            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Quality Equipment" },
                  { icon: HeartHandshake, label: "Patient-Care Support" },
                  { icon: MapPin, label: "Pune & Nearby Areas" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex h-full items-center gap-3 rounded-2xl border border-[#D7EAF3] bg-white p-3.5 shadow-[0_10px_28px_-18px_rgba(23,74,99,0.35)] transition-all duration-300 hover:border-[#5BAED6]/60 hover:shadow-[0_16px_34px_-20px_rgba(23,74,99,0.45)]"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-[#174A63]">
                      <item.icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-[#174A63]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-[#5BAED6] bg-white text-[#174A63] hover:bg-[#EAF6FC] hover:text-[#174A63]"
                >
                  <Link to="/product-groups">
                    Browse product groups <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#174A63] text-white shadow-md hover:bg-[#5BAED6]"
                >
                  <a href="/#contact">
                    Contact us <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / ENQUIRY ============ */}
      <section
        id="contact"
        className="relative scroll-mt-16 overflow-hidden bg-[#F7FCFF] py-24"
      >
        {/* decorative healthcare layer */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 size-72 rounded-full bg-[#B9DFF2]/30 blur-3xl animate-aurora-slow" />
          <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-[#B9DFF2]/25 blur-3xl animate-aurora" />
          <Plus className="absolute left-8 top-12 size-8 text-[#5BAED6]/25 animate-floaty-slow" />
          <Plus className="absolute right-10 top-1/3 size-6 text-[#5BAED6]/25 animate-floaty" />
          <EcgTrace className="absolute right-24 top-24 h-8 w-40 text-[#5BAED6]/50 animate-floaty-slow" />
          <div
            className="absolute left-14 top-44 size-20 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#5BAED6 1.4px, transparent 1.4px)",
              backgroundSize: "16px 16px",
            }}
          />
          <Stethoscope
            className="absolute -bottom-6 right-4 size-44 rotate-12 text-[#174A63]/10 animate-floaty-slow"
            strokeWidth={1}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF6FC] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#174A63]">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#5BAED6]" />
                Contact
              </span>
            </Reveal>

            <AnimatedHeading
              as="h2"
              align="center"
              underlineWidth={60}
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#174A63] sm:text-4xl lg:text-[2.75rem]"
            >
              Send an enquiry
            </AnimatedHeading>

            <Reveal delay={0.15}>
              <p className="mt-4 text-sm text-[#4B6472] sm:text-base">
                Fill in the form and we'll get back to you about availability and
                pricing.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* brand + contact details */}
            <Reveal className="h-full" delay={0.05}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#D7EAF3] bg-white p-6 shadow-[0_18px_46px_-28px_rgba(23,74,99,0.45)] sm:p-8">
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
                    <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/60">
                      Quality | Care | Trust
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-[#174A63]">
                      <MapPin aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#174A63]">Address</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B6472]">
                        {BUSINESS.address}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-[#174A63]">
                      <Mail aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#174A63]">Email</p>
                      <a
                        href={`mailto:${BUSINESS.email}`}
                        className="mt-1 block break-all text-sm text-[#4B6472] underline-offset-2 hover:text-[#174A63] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BAED6] focus-visible:ring-offset-2"
                      >
                        {BUSINESS.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 flex items-start gap-4 rounded-2xl bg-[#EAF6FC] p-4">
                  <ShieldCheck aria-hidden="true" className="size-7 shrink-0 text-[#174A63]" />
                  <p className="text-sm font-medium leading-relaxed text-[#174A63]">
                    {BUSINESS.disclaimer}
                  </p>
                </div>

                <EcgTrace className="mt-auto hidden h-8 w-40 self-end pt-6 text-[#5BAED6]/60 sm:block" />
              </div>
            </Reveal>

            {/* form */}
            <Reveal className="h-full" delay={0.1}>
              <div className="h-full rounded-[24px] border border-[#D7EAF3] bg-white p-6 shadow-[0_18px_46px_-28px_rgba(23,74,99,0.45)] sm:p-8">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ DISCLAIMER STRIP ============ */}
      <motion.section
        className="border-t border-border/60 bg-secondary/30 py-6"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="mx-auto max-w-7xl px-4 text-center text-sm font-medium text-foreground/70 sm:px-6">
          {BUSINESS.disclaimer}
        </p>
      </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}
