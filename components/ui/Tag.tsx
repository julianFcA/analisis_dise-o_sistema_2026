import type { ReactNode } from "react";

/** Estados `State` del Tag del UI Kit (node 100:401). */
export type TagState = "default" | "selected";

export interface TagProps {
  /** Estado visual del kit; lo gestiona la sección (selección única). */
  selected?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/* Píldora de filtros: radio 100, py 8, texto 14 (Medium/Bold).
 * Selected → fondo #e6f0ed + texto Bold #0b625e (docs/design-system.md §5.8).
 * ⏳ El padding-x no está documentado: 12px como criterio de implementación. */
const BASE_CLASSES = [
  "inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-tag",
  "transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
].join(" ");

const STATE_CLASSES: Record<TagState, string> = {
  default: "bg-transparent font-medium text-secondary",
  selected: "bg-chip font-bold text-primary-600",
};

export default function Tag({
  selected = false,
  children,
  className,
  onClick,
}: TagProps) {
  const classes = [BASE_CLASSES, STATE_CLASSES[selected ? "selected" : "default"], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={classes}>
      {children}
    </button>
  );
}
