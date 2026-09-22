import { formatSlots, getTodayHours, openingHours } from "@/data/hours";

export default function OpeningHoursList() {
  const today = getTodayHours().day;

  return (
    <ul>
      {openingHours.map((day) => {
        const isToday = today === day.day;
        return (
          <li
            key={day.day}
            aria-current={isToday ? "date" : undefined}
            className={`flex justify-between gap-3 items-baseline text-sm border-b border-cream/12 py-3 ${
              isToday ? "text-cream" : "text-cream/72"
            }`}
          >
            <span className={isToday ? "text-gold" : "text-cream"}>
              {day.day}
              {isToday ? <span className="sr-only">, aujourd&apos;hui</span> : null}
            </span>
            <span className={`text-right price ${isToday ? "text-cream" : "text-cream/62"}`}>
              {day.closed
                ? formatSlots(day)
                : day.slots.map((slot, index) => (
                    <span key={`${day.day}-${slot.open}`}>
                      {index > 0 ? " / " : ""}
                      <time dateTime={slot.open}>{slot.open}</time>
                      –
                      <time dateTime={slot.close}>{slot.close}</time>
                    </span>
                  ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
