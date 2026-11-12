import type { ReactNode } from "react";

export interface NavBarProps {
  /** Identidad/marca del nav (slot; el consumidor decide su markup). */
  brand: ReactNode;
  /** Elementos de navegación: `<li>` con `NavigationItem`. */
  children?: ReactNode;
  /** `aria-label` del `<nav>` (si se omite, el nav no queda etiquetado). */
  navLabel?: string;
  /** Clases del `<nav>`; permite controlar la visibilidad responsive. */
  navClassName?: string;
  /** Acciones a la derecha (botones, acceso, avatar…). */
  actions?: ReactNode;
  /** Clases del `<header>` (el consumidor añade espaciado o fondo extra). */
  className?: string;
}

/**
 * Nav Bar del UI Kit (node 73:2921): shell estructural de la barra de
 * navegación — identidad a la izquierda, items en el centro y acciones a la
 * derecha sobre el contenedor de página aprobado (alto 96px, `max-w-page`,
 * padding-x 24 → 120).
 *
 * El componente solo aporta la estructura; el contenido y el comportamiento
 * responsive de cada slot los decide el consumidor (p. ej. el Navbar del Home
 * oculta items y acciones por debajo de `md`, docs/responsive.md §5.1).
 */
export default function NavBar({
  brand,
  children,
  navLabel,
  navClassName,
  actions,
  className,
}: NavBarProps) {
  return (
    <header className={["bg-surface", className].filter(Boolean).join(" ")}>
      <div className="mx-auto flex h-24 w-full max-w-page items-center justify-between px-6 xl:px-30">
        {brand}

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
