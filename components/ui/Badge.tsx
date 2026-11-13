import type { ReactNode } from "react";

/** Variantes `Type` del Badge del UI Kit (node 83:814). */
export type BadgeType = "success" | "pending" | "canceled" | "review" | "disabled";

export interface BadgeProps {
  type?: BadgeType;
  /** Punto circular a la izquierda del texto (decorativo). @default false */
  showIndicator?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Píldora del UI Kit: radio 100, px 12, py 7, texto Bold 12.
 * Uso documentado en el Home: badge de categoría sobre la foto del servicio
 * (docs/design-system.md §5.7 → píldora blanca, texto #0b625e).
 */
/* `w-fit`: el badge nunca se estira cuando es flex item de una columna
   (`align-items: stretch`), siempre queda pegado a su contenido. */
const BASE_CLASSES =
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-[7px] text-badge font-bold";

interface BadgeTone {
  container: string;
  indicator: string;
}

/**
 * Color por variante, siempre con tokens de `app/globals.css` (§2 del
 * design-system): fondo suave + texto principal del estado. El punto del
 * indicador usa el color sólido del mismo estado.
 *
 * - `success`  → verde suave + teal
 * - `pending`  → violeta suave (espera)
 * - `canceled` → naranja de aviso (el sistema no tiene token rojo)
 * - `review`   → azul suave + azul profundo
 * - `disabled` → gris de borde atenuado
 */
const TYPE_CLASSES: Record<BadgeType, BadgeTone> = {
  success: {
    container: "bg-chip text-primary-600",
    indicator: "bg-primary-600",
  },
  pending: {
    container: "bg-purple-soft text-purple",
    indicator: "bg-purple",
  },
  canceled: {
    container: "bg-accent-soft text-accent-strong",
    indicator: "bg-accent-strong",
  },
  review: {
    container: "bg-blue-soft text-blue-steel",
    indicator: "bg-blue-steel",
  },
  disabled: {
    container: "bg-border text-secondary",
    indicator: "bg-secondary",
  },
};

/**
 * Sin `type`: píldora blanca de categoría sobre la foto del servicio (§5.7),
 * para no alterar el diseño del Landing ni del Dashboard.
 */
const NEUTRAL_TONE: BadgeTone = {
  container: "bg-surface text-primary-600",
  indicator: "bg-primary-600",
};

const INDICATOR_CLASSES = "size-1.5 shrink-0 rounded-full";

export default function Badge({
  type,
  showIndicator = false,
  children,
  className,
}: BadgeProps) {
  const tone = type ? TYPE_CLASSES[type] : NEUTRAL_TONE;
  const classes = [BASE_CLASSES, tone.container, className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {showIndicator ? (
        /* Decorativo: el texto ya comunica el estado. */
        <span aria-hidden="true" className={[INDICATOR_CLASSES, tone.indicator].join(" ")} />
      ) : null}
      {children}
    </span>
  );
}
