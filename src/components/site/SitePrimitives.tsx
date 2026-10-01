import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const HEADING_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

/**
 * Reveal animation: headings/cards fade and slide up when scrolled into view.
 * Falls back to no motion when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
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
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Global heading highlight used for major section titles.
 *
 * Sequence: fade + rise in on scroll (700ms, ease-out), then a slow gentle
 * 7px float plus an expanding blue underline. A soft healthcare-blue glow
 * sits behind the text. Everything collapses to a static heading when the
 * visitor prefers reduced motion.
 */
export function AnimatedHeading({
  as = "h2",
  children,
  className,
  align = "left",
  underline = true,
  underlineWidth = 64,
  glow = true,
  float = true,
}: {
  as?: keyof typeof HEADING_TAGS;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Show the animated underline beneath the heading. */
  underline?: boolean;
  /** Final underline width in px (50–70 reads best). */
  underlineWidth?: number;
  /** Soft healthcare-blue text glow. */
  glow?: boolean;
  /** Slow floating drift once the heading has revealed. */
  float?: boolean;
}) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const MotionTag = HEADING_TAGS[as] as ElementType;

  return (
    <MotionTag
      className={cn(
        "relative",
        glow ? "heading-glow" : undefined,
        float && !reduce && revealed ? "heading-float" : undefined,
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onAnimationComplete={() => setRevealed(true)}
    >
      {children}
      {underline ? (
        <motion.span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-2 block h-[3px] rounded-full bg-gradient-to-r from-[#5BAED6] via-[#174A63] to-[#B9DFF2]",
            align === "center" ? "left-1/2" : "left-0",
          )}
          style={align === "center" ? { marginLeft: -underlineWidth / 2 } : undefined}
          initial={reduce ? false : { width: 0, opacity: 0 }}
          whileInView={{ width: underlineWidth, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: reduce ? 0 : 0.7,
            ease: "easeOut",
          }}
        />
      ) : null}
    </MotionTag>
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
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {label ? (
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {label}
          </span>
        </Reveal>
      ) : null}
      <AnimatedHeading
        as="h2"
        align={align}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </AnimatedHeading>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "text-base text-muted-foreground sm:text-lg",
              align === "center" ? "max-w-2xl" : "max-w-xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
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
        "group rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(23,74,99,0.04),0_4px_14px_-8px_rgba(23,74,99,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_1px_2px_rgba(23,74,99,0.05),0_10px_26px_-12px_rgba(23,74,99,0.20)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
