import type { ReactNode } from "react";
import Link from "next/link";

/** Superficie sobre la que se pinta el item. */
export type NavigationItemTone = "surface" | "on-primary";

export interface NavigationItemProps {
  /** Texto del link (DM Sans 15px — token `text-nav`). */
  label: string;
  /** Destino del link. `next/link` admite rutas ("/login") y anclas ("#servicios"). */
  href: string;
  /** Estado de navegación actual: Bold #0b625e + indicador activo. */
  active?: boolean;
  /** Icono 20px a la izquierda (uso en el Aside de la app interna). */
  icon?: ReactNode;
  /** Contenido a la derecha del item (p. ej. indicador numérico). */
  trailing?: ReactNode;
  /** Navbar claro del Landing (`surface`) o Aside oscuro (`on-primary`). */
  tone?: NavigationItemTone;
  className?: string;
  onClick?: () => void;
}

/* Anatomía documentada (docs/design-system.md §5.1): Nav link Medium 15
   #647873, activo Bold #0b625e con píldora #f28c45 de 19×3 radio 2.
   Las variantes `Hovered` y `Focused` del kit se resuelven con los estados
   reales `:hover` / `:focus-visible` (no con una prop estática). */
const BASE_CLASSES = [
  "relative transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
].join(" ");

interface ToneClasses {
  layout: string;
  focus: string;
  states: Record<"default" | "active", string>;
  /** Indicador del estado activo (píldora horizontal o barra vertical). */
  indicator: string;
}

const TONE_CLASSES: Record<NavigationItemTone, ToneClasses> = {
  /* Navbar del Landing. ⏳ El estilo exacto de la variante Hovered del
     Navigation Item (368:6940) está pendiente de verificar en Figma;
     criterio con token: texto → #0b625e. */
  surface: {
    layout: "inline-flex items-center text-nav",
    focus: "focus-visible:outline-primary-600",
    states: {
      default: "font-medium text-secondary hover:text-primary-600",
      active: "font-bold text-primary-600",
    },
    indicator:
      "absolute left-1/2 top-full mt-1 h-[3px] w-[19px] -translate-x-1/2 rounded-[2px] bg-accent",
  },
  /* Aside de la app interna: fila completa, icono + label, indicador vertical
     (referencia visual del shell autenticado). */
  "on-primary": {
    layout:
      "flex w-full items-center gap-3 rounded-button px-3 py-2.5 text-nav",
    focus: "focus-visible:outline-surface",
    states: {
      default:
        "font-medium text-footer-text hover:bg-white/10 hover:text-surface",
      active: "bg-white/10 font-bold text-surface",
    },
    indicator:
      "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-surface",
  },
};

/**
 * Navigation Item del UI Kit (node 62:100): link de navegación con estado
 * activo opcional. Un único componente para los estados Default / activo y
 * para las dos superficies del producto (navbar claro y Aside oscuro).
 *
 * El indicador se ancla con `top-full` al alto del propio link, por eso el
 * componente no impone la altura de referencia del kit (216×46): fijarla
 * desplazaría la píldora en el Navbar del Home.
 */
export default function NavigationItem({
  label,
  href,
  active = false,
  icon,
  trailing,
  tone = "surface",
  className,
  onClick,
}: NavigationItemProps) {
  const toneClasses = TONE_CLASSES[tone];

  const classes = [
    BASE_CLASSES,
    toneClasses.layout,
    toneClasses.focus,
    toneClasses.states[active ? "active" : "default"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={classes}
    >
      {icon ? (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {icon}
        </span>
      ) : null}

      {label}

      {trailing ? <span className="ml-auto shrink-0">{trailing}</span> : null}

      {active ? (
        <span aria-hidden="true" className={toneClasses.indicator} />
      ) : null}
    </Link>
  );
}
