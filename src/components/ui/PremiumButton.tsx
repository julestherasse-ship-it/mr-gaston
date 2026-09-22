import Link from "next/link";
import { cn } from "@/lib/utils";

export function NewWindowText() {
  return <span className="sr-only"> (nouvelle fenêtre)</span>;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={cn("w-3.5 h-3.5 shrink-0", className)} aria-hidden>
      <path
        d="M1.5 7h11M8.5 3l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  className,
  external,
  rel,
  onClick,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      className={cn("inline-flex min-h-11 items-center", className)}
      target={external ? "_blank" : undefined}
      rel={external ? rel ?? "noopener noreferrer" : rel}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className="link-line">{children}</span>
    </a>
  );
}

interface PremiumButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light" | "outlineOnDark";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  arrow?: boolean;
  cta?: "primary" | "secondary";
}

export default function PremiumButton({
  href,
  onClick,
  children,
  variant = "solid",
  size = "md",
  className,
  type = "button",
  disabled,
  external,
  arrow = true,
  cta,
}: PremiumButtonProps) {
  const classes = cn(
    "group btn-motion inline-flex items-center justify-center gap-2.5 font-sans font-medium uppercase tracking-[0.18em] rounded-none",
    "touch-manipulation",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]",
    variant === "outline" ? "focus-visible:outline-ink" : "focus-visible:outline-gold",
    variant === "solid" && "bg-cream text-night hover:bg-paper-deep",
    variant === "outline" &&
      "border border-ink/20 text-ink hover:bg-ink hover:text-cream hover:border-ink",
    variant === "outlineOnDark" &&
      "border border-cream/40 text-cream hover:bg-cream hover:text-night hover:border-cream",
    variant === "ghost" && "text-inherit hover:text-gold",
    variant === "light" && "bg-cream text-night hover:bg-paper-deep",
    size === "sm" && "px-5 py-2.5 text-[11px] min-h-11",
    size === "md" && "px-7 py-3.5 text-[11px] min-h-12",
    size === "lg" && "px-8 py-4 text-[11px] md:px-10 md:text-[12px] min-h-14",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const ctaProp = cta ? ({ "data-cta": cta } as const) : undefined;

  const content = (
    <>
      {children}
      {external ? <NewWindowText /> : null}
      {arrow ? (
        <ArrowIcon className="transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
      ) : null}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} {...ctaProp}>
          {content}
        </a>
      );
    }
    if (href.startsWith("#") || href.startsWith("/#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={classes} onClick={onClick} {...ctaProp}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} {...ctaProp}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...ctaProp}>
      {content}
    </button>
  );
}
