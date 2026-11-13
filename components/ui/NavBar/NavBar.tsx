import type { ReactNode } from "react";

export interface NavBarProps {
  /** Contenido del extremo izquierdo: identidad (Landing) o búsqueda (app). */
  start: ReactNode;
  /** Elementos de navegación: `<li>` con `NavigationItem`. */
  children?: ReactNode;
  /** `aria-label` del `<nav>` (si se omite, el nav no queda etiquetado). */
  navLabel?: string;
  /** Clases del `<nav>`; permite controlar la visibilidad responsive. */
  navClassName?: string;
  /** Acciones a la derecha (botones, avatar…). */
  actions?: ReactNode;
  /** Barra de la app interna: ocupa todo el ancho, sin contenedor de página. */
  fullWidth?: boolean;
  /** Clases del `<header>` (sticky, fondo, sombra…). */
  className?: string;
}

/**
 * Nav Bar del UI Kit (node 73:2921): shell estructural de la barra de
 * navegación — contenido inicial a la izquierda, items en el centro y
 * acciones a la derecha.
 *
 * Dos modos de contenedor:
 * - por defecto (`fullWidth` off): el contenedor de página del Landing
 *   (alto 96, `max-w-page`, padding-x 24 → 120);
 * - `fullWidth`: todo el ancho disponible con padding-x 24 → 48, para el
 *   Navbar superior de la app interna, que vive a la derecha del Aside.
 *
 * El componente solo aporta la estructura; el contenido y el comportamiento
 * responsive de cada slot los decide el consumidor (p. ej. el Navbar del Home
 * oculta items y acciones por debajo de `md`, docs/responsive.md §5.1).
 */
export default function NavBar({
  start,
  children,
  navLabel,
  navClassName,
  actions,
  fullWidth = false,
  className,
}: NavBarProps) {
  const containerClasses = fullWidth
    ? "flex h-24 w-full items-center justify-between gap-6 px-6 xl:px-10"
    : "mx-auto flex h-24 w-full max-w-page items-center justify-between px-6 xl:px-30";

  return (
    <header className={["bg-surface", className].filter(Boolean).join(" ")}>
      <div className={containerClasses}>
        {start}

        {children ? (
          <nav aria-label={navLabel} className={navClassName}>
            <ul className="flex items-center gap-8">{children}</ul>
          </nav>
        ) : null}

        {actions}
      </div>
    </header>
  );
}
