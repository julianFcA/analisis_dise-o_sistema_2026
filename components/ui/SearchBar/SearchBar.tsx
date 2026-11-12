"use client";

import { useId } from "react";
import type { ComponentPropsWithRef, ComponentType, SVGProps } from "react";

export type SearchBarIcon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Props del patrón Search Bar: las del `<input>` nativo (incluido `ref`,
 * que React 19 pasa como prop) más la anatomía propia del kit.
 */
export interface SearchBarProps
  extends Omit<ComponentPropsWithRef<"input">, "className"> {
  /** Icono del campo (22px, `--color-primary-600`). */
  icon: SearchBarIcon;
  /** Etiqueta visible (Bold 13 #173d39). Si se omite, el campo no la pinta. */
  label?: string;
  /**
   * Campo compacto con borde sobre cualquier superficie (Navbar de la app
   * interna): 40px, borde `#dce7e3`, radio 10, padding-x 14.
   */
  field?: boolean;
  /** Clases del contenedor; el control conserva su anatomía del kit. */
  className?: string;
}

/**
 * Search Bar del UI Kit (node 73:2911, docs/design-system.md §5.16):
 * icono 22 + etiqueta Bold 13 `#173d39` + valor Regular 14 `#647873`.
 *
 * Dos presentaciones del mismo patrón:
 * - etiqueta visible, sin borde sobre el panel blanco (Búsqueda rápida);
 * - `field`: campo compacto con borde y sin etiqueta visible, para el Navbar
 *   superior de la app interna (el nombre accesible llega por `aria-label`).
 *
 * ⏳ Color del icono no documentado: se usa `--color-primary-600` (criterio ya
 * aplicado en la Búsqueda rápida). Gap icono-texto (12) y etiqueta-valor (4)
 * tampoco están documentados: criterio de implementación.
 */
export default function SearchBar({
  icon: Icon,
  label,
  field = false,
  className,
  id,
  ...inputProps
}: SearchBarProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const containerClasses = [
    "flex items-center",
    field
      ? "h-10 gap-2.5 rounded-input border border-border bg-surface px-3.5"
      : "gap-3",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "w-full min-w-0 rounded-input bg-transparent text-control-sm font-normal text-secondary",
    "placeholder:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
    "[&::-webkit-date-and-time-value]:text-left",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <Icon
        aria-hidden="true"
        className="size-[22px] shrink-0 text-primary-600"
      />

      {label ? (
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor={inputId} className="text-label font-bold text-body">
            {label}
          </label>
          <input {...inputProps} id={inputId} className={inputClasses} />
        </div>
      ) : (
        <input {...inputProps} id={inputId} className={inputClasses} />
      )}
    </div>
  );
}
