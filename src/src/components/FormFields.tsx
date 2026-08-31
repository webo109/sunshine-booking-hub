import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/format";

/**
 * Shared form controls for the public enquiry forms (Transfers, Contact,
 * Plan your trip). These exist so every form on the site uses the same themed
 * widgets — native <select> menus and <input type="date"> pickers are drawn by
 * the OS/browser, can't be themed, and render in the visitor's locale format
 * (mm/dd/yyyy for a US visitor), which looks broken next to the rest of the UI.
 */

export const inputClass =
  "ring-focus w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60";

/** Local YYYY-MM-DD. Deliberately not toISOString(), which converts to UTC and
 *  can hand back the previous day for anyone east or west of Greenwich. */
export const toLocalISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Date picker matching the rest of the form — same Calendar the booking wizard uses. */
export function DateField({
  value,
  onChange,
  ariaLabel = "Select a date",
  placeholder = "Select a date",
  min,
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel?: string;
  placeholder?: string;
  /** Earliest selectable day. Defaults to today. */
  min?: Date;
}) {
  const [open, setOpen] = useState(false);
  // Parse as local midnight; bare "2026-08-15" would be read as UTC.
  const selected = value ? new Date(`${value}T00:00:00`) : undefined;
  const earliest = min ?? new Date(new Date().toDateString());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={`${inputClass} flex items-center justify-between gap-2 text-left font-medium`}
        >
          <span className={selected ? "text-foreground" : "text-muted-foreground/60"}>
            {selected ? formatDate(selected) : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 shrink-0 text-brand" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-2xl border-border bg-card p-3 shadow-xl"
      >
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? earliest}
          onSelect={(d) => {
            if (!d) return;
            onChange(toLocalISO(d));
            setOpen(false);
          }}
          disabled={{ before: earliest }}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Dropdown styled to match the tours catalog sort control — rounded panel,
 * brand-tinted active row, tick on the selection.
 */
export function StyledSelect({
  value,
  onValueChange,
  options,
  ariaLabel,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-label={ariaLabel}
        className={`${inputClass} h-auto justify-between font-medium shadow-none data-[placeholder]:text-muted-foreground/60`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-border bg-card p-1 shadow-xl">
        {options.map((o) => (
          <SelectItem
            key={o.value}
            value={o.value}
            className="cursor-pointer rounded-xl py-2.5 text-sm font-medium focus:bg-brand/10 focus:text-foreground data-[state=checked]:bg-brand/15 data-[state=checked]:font-semibold data-[state=checked]:text-brand"
          >
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
