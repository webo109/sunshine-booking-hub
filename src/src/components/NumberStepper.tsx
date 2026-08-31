import { Minus, Plus } from "lucide-react";

/** Compact quantity control for form grids.
 *
 *  Replaces <input type="number">, whose native spin buttons render as an
 *  unstyled light-grey control that sits badly on the dark theme. The field is
 *  a text input with inputMode="numeric" so no spinner exists to suppress, and
 *  it keeps the numeric keypad on mobile. Styling mirrors `inputClass` so it
 *  lines up with the sibling inputs in the same grid row. */
export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  ariaLabel,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  ariaLabel: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const current = Number.isFinite(value) ? value : min;

  const btn =
    "flex h-[46px] w-11 shrink-0 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset";

  return (
    <div className="flex w-full items-center overflow-hidden rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      <button
        type="button"
        aria-label={`Decrease ${ariaLabel}`}
        disabled={current <= min}
        onClick={() => onChange(clamp(current - 1))}
        className={btn}
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        value={current}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          onChange(digits === "" ? min : clamp(parseInt(digits, 10)));
        }}
        className="w-full min-w-0 border-0 bg-transparent py-3 text-center text-sm font-semibold tabular-nums text-foreground outline-none"
      />

      <button
        type="button"
        aria-label={`Increase ${ariaLabel}`}
        disabled={current >= max}
        onClick={() => onChange(clamp(current + 1))}
        className={btn}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
