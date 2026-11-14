"use client";

import type { ReactNode } from "react";
import Check from "@/components/icons/check";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Etiqueta del control (Regular 12/1.5 #647873). */
  children: ReactNode;
  className?: string;
  /** Deshabilita la casilla (p. ej. mientras se envía el formulario). */
  disabled?: boolean;
}

/**
 * Checkbox del UI Kit (node 97:343): casilla 17×17, radio 4, blanco con borde
 * #dce7e3 en estado Unchecked (docs/design-system.md §5.5).
 *
 * ⏳ El estilo exacto del estado Checked está pendiente de verificar en Figma;
 * criterio provisional con tokens: relleno y borde #084c49 (--color-primary-500)
 * con marca blanca.
 */
export default function Checkbox({
  checked,
  onChange,
  children,
  className,
  disabled = false,
}: CheckboxProps) {
  const boxClasses = [
    "flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-checkbox border",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600",
    checked ? "border-primary-500 bg-primary-500" : "border-border bg-surface",
  ].join(" ");

  return (
    <label
      className={[
        "inline-flex items-start gap-2",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={boxClasses} aria-hidden="true">
        {checked ? <Check className="size-3 text-surface" /> : null}
      </span>
      <span className="text-note text-secondary">{children}</span>
    </label>
  );
}
