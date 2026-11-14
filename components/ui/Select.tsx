"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import ChevronDown from "@/components/icons/chevron-down";

export interface SelectProps {
  /** Etiqueta visible (Bold 13 #173d39). */
  label: string;
  options: readonly string[];
  /** Valor seleccionado (uso controlado junto a `onChange`). */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  /** Mensaje de validación en cliente bajo el control. */
  error?: string;
  /** Estado `Disabled` del kit (99:737). */
  disabled?: boolean;
  name?: string;
  className?: string;
}

/**
 * Select del UI Kit (node 99:738) con apertura del dropdown en cliente
 * (docs/architecture.md §3).
 *
 * Estado Closed documentado (§5.4): 48px, blanco, borde #dce7e3, radio 10,
 * valor Regular 14 #647873 y `chevron-down` 16px.
 * ⏳ Estilos finos de los estados Focused/Open/Disabled (99:735/99:736/99:737)
 * pendientes de verificar en Figma; criterios provisionales con tokens:
 * - Focused → borde #0b625e (--color-primary-600).
 * - Open    → panel blanco con borde, radio 10 y --shadow-card; opción
 *   seleccionada con el mismo patrón del Tag selected (#e6f0ed + Bold
 *   #0b625e) y hover sobre el resto.
 */
const TRIGGER_CLASSES = [
  "flex h-12 w-full items-center justify-between gap-2 rounded-input border bg-surface px-3.5 text-control-sm font-normal",
  "transition-colors",
  "focus:outline-none focus-visible:border-primary-600",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  name,
  className,
}: SelectProps) {
  const id = useId();
  const listId = `${id}-listbox`;
  const errorId = `${id}-error`;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(undefined);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const selectedValue = value ?? internalValue;
  const selectedIndex = selectedValue
    ? options.findIndex((option) => option === selectedValue)
    : -1;

  const optionId = useCallback(
    (index: number) => `${id}-option-${index}`,
    [id]
  );

  const openList = useCallback(() => {
    setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }, [selectedIndex]);

  const choose = useCallback(
    (option: string) => {
      setInternalValue(option);
      onChange?.(option);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  // Cierre al hacer click fuera del control.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (event.key) {
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!open) {
          openList();
        } else {
          setHighlightIndex((current) => (current + 1) % options.length);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) {
          setHighlightIndex((current) => (current <= 0 ? options.length - 1 : current - 1));
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) {
          choose(options[highlightIndex]);
        } else {
          openList();
        }
        break;
    }
  };

  const triggerClasses = [
    TRIGGER_CLASSES,
    error ? "border-accent" : open ? "border-primary-600" : "border-border",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={["relative flex flex-col gap-2", className].filter(Boolean).join(" ")}
    >
      <label htmlFor={id} className="text-label font-bold text-body">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        name={name}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(highlightIndex) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={triggerClasses}
      >
        <span className="min-w-0 truncate text-secondary">
          {selectedValue ?? placeholder}
        </span>
        <ChevronDown
          className={
            open
              ? "shrink-0 rotate-180 text-secondary transition-transform"
              : "shrink-0 text-secondary transition-transform"
          }
        />
      </button>

      {error ? (
        <p id={errorId} className="text-note text-accent" role="alert">
          {error}
        </p>
      ) : null}

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full z-10 mt-2 w-full rounded-input border border-border bg-surface py-2 shadow-card"
        >
          {options.map((option, index) => {
            const isSelected = option === selectedValue;
            const isHighlighted = index === highlightIndex;
            const optionClasses = [
              "w-full px-3.5 py-2.5 text-left text-control-sm",
              isSelected || isHighlighted ? "bg-chip" : "bg-transparent",
              isSelected ? "font-bold text-primary-600" : "font-normal text-secondary",
            ].join(" ");

            return (
              <li
                key={option}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                className={optionClasses}
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => choose(option)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
