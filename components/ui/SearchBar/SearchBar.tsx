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
  /** Etiqueta visible (Bold 13 #173d39). */
  label: string;
  /** Clases del contenedor; el control conserva su anatomía del kit. */
  className?: string;
}

/**
 * Search Bar del UI Kit (node 73:2911, docs/design-system.md §5.16):
 * icono 22 + etiqueta Bold 13 `#173d39` + valor Regular 14 `#647873`, sin
 * borde sobre el panel blanco.
 *
 * ⏳ Color del icono no documentado: se usa `--color-primary-600` (criterio ya
 * aplicado en la Búsqueda rápida). Gap icono-texto (12) y etiqueta-valor (4)
 * tampoco están documentados: criterio de implementación.
 */
export default function SearchBar({
  icon: Icon,
  label,
  className,
  id,
  ...inputProps
}: SearchBarProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={["flex items-center gap-3", className].filter(Boolean).join(" ")}
    >
      <Icon
        aria-hidden="true"
        className="size-[22px] shrink-0 text-primary-600"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label htmlFor={inputId} className="text-label font-bold text-body">
          {label}
        </label>
        <input
          {...inputProps}
          id={inputId}
          className="w-full rounded-input bg-transparent text-control-sm font-normal text-secondary placeholder:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 [&::-webkit-date-and-time-value]:text-left"
        />
      </div>
    </div>
  );
}
