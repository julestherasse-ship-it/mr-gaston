import type { MenuFormat } from "@/data/menu";

export default function MenuFormats({
  formats,
  large = false,
}: {
  formats: MenuFormat[];
  large?: boolean;
}) {
  return (
    <dl className={`flex flex-wrap ${large ? "gap-x-8 gap-y-4" : "gap-x-6 gap-y-3"}`}>
      {formats.map((format) => (
        <div key={format.label} className="min-w-[4.75rem]">
          <dt className="eyebrow text-cream/62 mb-1">{format.label}</dt>
          <dd
            className={`price text-cream ${
              large ? "text-[1.2rem] md:text-[1.35rem]" : "text-[1.05rem] md:text-[1.15rem]"
            }`}
          >
            {format.price}
          </dd>
        </div>
      ))}
    </dl>
  );
}
