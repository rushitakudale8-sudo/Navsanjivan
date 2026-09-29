import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal animation: headings/cards fade and slide up when scrolled into view.
 * Falls back to no motion when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Slide distance in px (kept small and subtle). */
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading with a small over-line label and description. */
export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {label ? (
        <span className="inline-flex items-center rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          {label}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base text-muted-foreground sm:text-lg",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Card wrapper: soft layered shadow, rounded, gentle lift on hover. */
export function SoftCard({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(23,74,99,0.05),0_8px_24px_-12px_rgba(23,74,99,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(23,74,99,0.06),0_18px_40px_-16px_rgba(23,74,99,0.28)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
