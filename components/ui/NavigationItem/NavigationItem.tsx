import Link from "next/link";

export interface NavigationItemProps {
  /** Texto del link (DM Sans 15px — token `text-nav`). */
  label: string;
  /** Destino del link. `next/link` admite rutas ("/login") y anclas ("#servicios"). */
  href: string;
  /** Estado de navegación actual: Bold #0b625e + indicador activo. */
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

/* Anatomía documentada (docs/design-system.md §5.1): Nav link Medium 15
   #647873, activo Bold #0b625e con píldora #f28c45 de 19×3 radio 2.
   Las variantes `Hovered` y `Focused` del kit se resuelven con los estados
   reales `:hover` / `:focus-visible` (no con una prop estática). */
const BASE_CLASSES = [
  "relative inline-flex items-center text-nav transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
].join(" ");

/* ⏳ El estilo exacto de la variante Hovered del Navigation Item (368:6940)
   está pendiente de verificar en Figma; criterio con token: texto → #0b625e. */
const STATE_CLASSES = {
  default: "font-medium text-secondary hover:text-primary-600",
  active: "font-bold text-primary-600",
} as const;

/**
 * Navigation Item del UI Kit (node 62:100): link de navegación con estado
 * activo opcional. Un único componente para los estados Default / activo.
 *
 * El indicador se ancla con `top-full` al alto del propio link, por eso el
 * componente no impone la altura de referencia del kit (216×46): fijarla
 * desplazaría la píldora en el Navbar del Home.
 */
export default function NavigationItem({
  label,
  href,
  active = false,
  className,
  onClick,
}: NavigationItemProps) {
  const classes = [
    BASE_CLASSES,
    STATE_CLASSES[active ? "active" : "default"],
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
      {label}
      {active ? (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full mt-1 h-[3px] w-[19px] -translate-x-1/2 rounded-[2px] bg-accent"
        />
      ) : null}
    </Link>
  );
}
