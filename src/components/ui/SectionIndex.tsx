interface SectionIndexProps {
  index: string;
  label: string;
  light?: boolean;
}

export default function SectionIndex({ index, label, light }: SectionIndexProps) {
  return (
    <p
      className={`eyebrow mb-8 md:mb-10 flex items-center gap-3 ${light ? "text-cream/62" : "text-ink/70"}`}
    >
      <span className={light ? "text-gold/80" : "text-ink/80"}>{index}</span>
      <span aria-hidden className="draw-rule block h-px w-7 bg-current opacity-50" />
      {label}
    </p>
  );
}
