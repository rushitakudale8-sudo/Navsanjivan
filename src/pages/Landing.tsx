import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, SoftCard } from "@/components/site/SitePrimitives";
import { ProductGroupGrid, ProductGrid } from "@/components/site/ProductGrid";
import collage from "@/assets/product-collage.png";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BUSINESS,
  CARE_SERVICES,
  PRODUCT_GROUPS,
  PRODUCTS,
} from "@/data/catalog";

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "A reliable supply partner for hospitals, clinics and nursing facilities" },
  { icon: Truck, label: "Delivery across Pune and nearby areas" },
  { icon: ShieldCheck, label: "Carefully sourced surgical and patient-care equipment" },
];

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
          className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-accent/50 blur-3xl"
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

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-4xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Quality Surgical & Healthcare Solutions for{" "}
                <span className="text-primary">Better Patient Care</span>
              </h1>
            </Reveal>

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
                  alt="Navsanjivani product range: air mattresses, hospital beds, nebulizers, BP monitors, pulse oximeters, wheelchairs, walkers, crutches, thermometers, hearing aids, commode chairs, hot water bags and underpads"
                  className="w-full object-contain"
                />
              </div>

              <div
                className={`absolute -bottom-5 left-6 rounded-2xl border border-border/60 bg-white/95 px-5 py-4 shadow-lg backdrop-blur ${reduce ? "" : "animate-floaty"}`}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  Product groups
                </p>
                <p className="text-2xl font-bold text-primary">
                  {PRODUCT_GROUPS.length}
                </p>
              </div>

              <div
                className={`absolute -top-5 right-6 rounded-2xl border border-border/60 bg-white/95 px-5 py-4 shadow-lg backdrop-blur ${reduce ? "" : "animate-floaty-slow"}`}
              >
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <HeartHandshake className="size-3.5 text-primary" /> Nursing and
                  patient care
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Nurses · Caregivers · Attendants
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PRODUCT GROUPS ============ */}
      <section id="product-groups" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          label="Product Groups"
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
      <section id="products" className="bg-secondary/40 py-20">
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
      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          label="Services"
          title="Nursing and Patient Care Services"
          description="Nurses | Caregivers | Patient Care Assistants | Ward Attendants"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARE_SERVICES.map((service) => (
            <Reveal key={service.slug} delay={0.05}>
              <SoftCard className="h-full overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.blurb}
                  </p>
                </div>
              </SoftCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10" delay={0.05}>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/70 bg-gradient-to-r from-accent/60 to-secondary/60 px-6 py-6 sm:flex-row">
            <p className="max-w-xl text-sm text-foreground/80">
              Looking for nursing or caretaker support for a facility or a home?
              Tell us what you need and we will get in touch with options.
            </p>
            <Button asChild>
              <a href="/#contact">Enquire about care services</a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ============ ABOUT US ============ */}
      <section id="about" className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_24px_60px_-24px_rgba(23,74,99,0.35)]">
              <img
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Medical equipment and supplies"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              label="About Us"
              title="Your partner in patient care"
            />
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  {BUSINESS.name} supplies surgical and patient-care equipment
                  and provides nursing and caretaker services to hospitals,
                  clinics, nursing facilities and families caring for loved ones
                  at home.
                </p>
                <p>
                  From wheelchairs and hospital beds to monitors, nebulizers and
                  daily-care essentials, we focus on dependable products, careful
                  sourcing and straight guidance — so you can choose the right
                  equipment and the right care for each patient.
                </p>
                <p className="text-sm">
                  Based in Kothrud, Pune, we serve customers across the city and
                  nearby areas.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="outline" className="bg-white">
                  <Link to="/product-groups">Browse product groups</Link>
                </Button>
                <Button asChild>
                  <a href="/#contact">Contact us</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / ENQUIRY ============ */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
        <SectionHeading
          label="Contact"
          title="Send an enquiry"
          description="Fill in the form and we'll get back to you about availability and pricing."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Contact details */}
          <Reveal className="lg:col-span-2" delay={0.05}>
            <SoftCard className="h-full p-6">
              <h3 className="font-semibold text-foreground">{BUSINESS.name}</h3>

              <div className="mt-6 space-y-5 text-sm">
                <div className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="mt-1 text-muted-foreground">
                      {BUSINESS.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Mail className="size-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="mt-1 block break-all text-primary hover:underline"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-secondary/70 p-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Please note</p>
                <p className="mt-1">{BUSINESS.disclaimer}</p>
              </div>
            </SoftCard>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <SoftCard className="p-6">
              <EnquiryForm />
            </SoftCard>
          </Reveal>
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
