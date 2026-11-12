import type { ReactNode } from "react";

/** Variantes `Type` del Badge del UI Kit (node 83:814). */
export type BadgeType = "default" | "pending" | "canceled" | "review" | "disabled";

export interface BadgeProps {
  type?: BadgeType;
  children: ReactNode;
  className?: string;
}

/**
 * Píldora del UI Kit: radio 100, px 12, py 7, texto Bold 12 #0b625e.
 * Uso documentado en el Home: badge de categoría sobre la foto del servicio
 * (docs/design-system.md §5.7).
 */
const BASE_CLASSES =
  "inline-flex items-center rounded-full px-3 py-[7px] text-badge font-bold";

/* ⏳ Los colores por tipo (83:814) no se han extraído aún por el límite de
   llamadas del plan Starter de Figma MCP. Mientras tanto, los cinco tipos
   usan la píldora blanca documentada; rellenar cada entrada al verificar. */
const TYPE_CLASSES: Record<BadgeType, string> = {
  default: "bg-surface text-primary-600",
  pending: "bg-surface text-primary-600", // ⏳ pendiente de verificar
  canceled: "bg-surface text-primary-600", // ⏳ pendiente de verificar
  review: "bg-surface text-primary-600", // ⏳ pendiente de verificar
  disabled: "bg-surface text-primary-600", // ⏳ pendiente de verificar
};

export default function Badge({ type = "default", children, className }: BadgeProps) {
  const classes = [BASE_CLASSES, TYPE_CLASSES[type], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
