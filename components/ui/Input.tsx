"use client";

import { useId, type ChangeEvent, type ReactNode } from "react";

/** Tipos nativos admitidos por el control (el kit solo define un estilo). */
export type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time";

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
  /** Tipo nativo del `<input>` (email, password…). Por defecto `text`. */
  type?: InputType;
  /** Texto de apoyo bajo el control (contador de caracteres, ayuda). Se
   * enlaza al control con `aria-describedby`. */
  hint?: ReactNode;
  /** Icono decorativo alineado a la izquierda dentro del campo. */
  startIcon?: ReactNode;
  /** Control alineado a la derecha dentro del campo (p. ej. ver contraseña). */
  endIcon?: ReactNode;
  /** Valor de `autocomplete` para los gestores de contraseñas del navegador. */
  autoComplete?: string;
}

/* Anatomía documentada (docs/design-system.md §5.3): control de 48px, fondo
   blanco, borde #dce7e3, radio 10, padding 14, placeholder Regular 14 #647873.
   ⏳ Los colores exactos de los estados `Focused` (96:352) y `Error` (96:360)
   están pendientes de verificar en Figma; se aplican criterios provisionales
   con tokens del design system:
   - Focused → borde #0b625e (--color-primary-600).
   - Error   → borde y mensaje #f28c45 (--color-accent). */
const CONTROL_BASE_CLASSES = [
  "w-full rounded-input border bg-surface text-control-sm font-normal text-secondary",
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
  type = "text",
  hint,
  startIcon,
  endIcon,
  autoComplete,
}: InputProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  const controlClasses = [
    CONTROL_BASE_CLASSES,
    textarea
      ? "h-28 resize-none px-3.5 py-3.5"
      : ["h-12", hasStartIcon ? "pl-11" : "pl-3.5", hasEndIcon ? "pr-12" : "pr-3.5"].join(" "),
    error ? "border-accent" : "border-border",
  ].join(" ");

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;
  const controlProps = {
    id,
    name,
    placeholder,
    value,
    onChange: onChange ? (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value) : undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": required ? true : undefined,
  } as const;

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
          aria-required={required || undefined}
          className={controlClasses}
        />
      ) : (
        <div className="relative">
          {startIcon ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-secondary"
            >
              {startIcon}
            </span>
          ) : null}

          <input
            {...controlProps}
            type={type}
            autoComplete={autoComplete}
            className={controlClasses}
          />

          {endIcon ? (
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {endIcon}
            </span>
          ) : null}
        </div>
      )}

      {hint ? (
        <p id={hintId} className="text-note text-secondary">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-note text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
