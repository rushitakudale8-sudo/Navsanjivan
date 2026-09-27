import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal, SectionHeading, SoftCard } from "@/components/site/SitePrimitives";
import { Button } from "@/components/ui/button";
import { CARE_SERVICES } from "@/data/catalog";

export default function Services() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nursing &amp; Patient Care Services
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Nurses | Caregivers | Patient Care Assistants | Ward Attendants
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading
            align="left"
            title="Care teams for facilities and homes"
            description="We help connect you with nursing and patient-care support for hospitals, nursing facilities and home healthcare. Descriptions below are general role summaries — reach out to discuss your specific requirement."
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
                    <h2 className="font-semibold text-foreground">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {service.blurb}
                    </p>
                  </div>
                </SoftCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border/70 bg-gradient-to-r from-accent/60 to-secondary/60 px-6 py-8 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              Need patient-care support?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Tell us about the patient's needs and duration, and we'll get back
              to you with options.
            </p>
            <Button asChild className="mt-5 shadow-md">
              <a href="/#contact">
                Enquire now <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Product information only — not medical advice. Role descriptions are
            general and do not represent specific qualifications or certifications.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
