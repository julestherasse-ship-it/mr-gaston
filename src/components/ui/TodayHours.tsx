import { getTodayHours } from "@/data/hours";

export default function TodayHours({ className = "" }: { className?: string }) {
  const info = getTodayHours();

  return (
    <p className={className}>
      <span className={info.open ? "text-gold" : "text-current"}>{info.open ? "Ouvert" : "Fermé"}</span>
      <span aria-hidden className="mx-2 text-gold/60">
        ·
      </span>
      <span>
        {info.day} {info.label}
      </span>
    </p>
  );
}
