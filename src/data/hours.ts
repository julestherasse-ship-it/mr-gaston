export interface OpeningSlot {
  open: string;
  close: string;
}

export interface OpeningDay {
  day: string;
  dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  closed: boolean;
  slots: OpeningSlot[];
}

const weekday = (open: string, close: string): OpeningSlot[] => [
  { open: "11:30", close: "14:00" },
  { open, close },
];

export const openingHours: OpeningDay[] = [
  { day: "Lundi", dayOfWeek: "Monday", closed: false, slots: weekday("18:00", "21:00") },
  { day: "Mardi", dayOfWeek: "Tuesday", closed: false, slots: weekday("18:00", "21:00") },
  { day: "Mercredi", dayOfWeek: "Wednesday", closed: false, slots: weekday("18:00", "21:00") },
  { day: "Jeudi", dayOfWeek: "Thursday", closed: false, slots: weekday("18:00", "21:00") },
  { day: "Vendredi", dayOfWeek: "Friday", closed: false, slots: weekday("18:00", "22:00") },
  { day: "Samedi", dayOfWeek: "Saturday", closed: false, slots: weekday("18:00", "21:30") },
  { day: "Dimanche", dayOfWeek: "Sunday", closed: false, slots: weekday("18:00", "21:30") },
];

export function formatSlots(day: OpeningDay) {
  if (day.closed) return "Fermé";
  return day.slots.map((slot) => `${slot.open}–${slot.close}`).join(" / ");
}

export function getTodayHours() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const weekdayName = parts.find((p) => p.type === "weekday")?.value ?? "Monday";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const minutes = hour * 60 + minute;
  const row =
    openingHours.find((d) => d.dayOfWeek === weekdayName) ?? openingHours[0];
  const open = row.slots.some((slot) => {
    const [sh, sm] = slot.open.split(":").map(Number);
    const [eh, em] = slot.close.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    return minutes >= start && minutes < end;
  });
  return {
    day: row.day,
    label: formatSlots(row),
    open,
  };
}
