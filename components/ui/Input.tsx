"use client";

import { useId } from "react";

export interface InputProps {
  /** Etiqueta visible (Bold 13 #173d39). */
  label: string;
  placeholder?: string;
  /** Valor del control (uso controlado junto a `onChange`). */
  value?: string;
  /** Mensaje de error → estado `Error` del kit. */
  error?: string;
  onChange?: (value: string) => void;
  /** Variante alta (112px) del kit. */
  textarea?: boolean;
  /** Añade el asterisco obligatorio de las etiquetas del formulario. */
  required?: boolean;
  name?: string;
  className?: string;
}

/* Anatomía documentada (docs/design-system.md §5.3): control de 48px, fondo
   blanco, borde #dce7e3, radio 10, padding 14, placeholder Regular 14 #647873.
   ⏳ Los colores exactos de los estados `Focused` (96:352) y `Error` (96:360)
   están pendientes de verificar en Figma; se aplican criterios provisionales
   con tokens del design system:
   - Focused → borde #0b625e (--color-primary-600).
   - Error   → borde y mensaje #f28c45 (--color-accent). */
const CONTROL_BASE_CLASSES = [
  "w-full rounded-input border bg-surface px-3.5 text-control-sm font-normal text-secondary",
  "placeholder:text-secondary focus:outline-none focus:border-primary-600",
].join(" ");

export default function Input({
  label,
  placeholder,
  value,
  error,
  onChange,
  textarea = false,
  required = false,
  name,
  className,
}: InputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const controlClasses = [
    CONTROL_BASE_CLASSES,
    textarea ? "h-28 resize-none py-3.5" : "h-12",
    error ? "border-accent" : "border-border",
  ].join(" ");

  const describedBy = error ? errorId : undefined;

  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <label htmlFor={id} className="text-label font-bold text-body">
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : null}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses}
        />
      ) : (
        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses}
        />
      )}

      {error ? (
        <p id={errorId} className="text-note text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
