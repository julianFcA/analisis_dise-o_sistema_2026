import Button from "@/components/ui/Button";
import PawPrint from "@/components/icons/paw-print";

/** Link del nav con ancla a su sección del Home (docs/landing-page.md §1). */
interface NavLink {
  label: string;
  href: string;
  /** Indicador activo del kit (píldora #f28c45 bajo el link): solo "Inicio". */
  active?: boolean;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: "Inicio", href: "#", active: true },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

/**
 * Navegación principal (docs/landing-page.md §1).
 * Barra blanca de 96px con `justify-between`:
 * - Identidad PetCare: emblema 38×38 (#0b625e, radio 12, paw-print 23) +
 *   wordmark ExtraBold 27 #084c49 (tracking −1).
 * - 4 links (gap 32): Inicio activo (Bold 15 #0b625e + indicador #f28c45
 *   19×3 radio 2), resto Medium 15 #647873.
 * - Acceso (gap 24): Button Terciary "Iniciar Sesión" + Button Default
 *   "Registrarse" del UI Kit.
 * Contenedor: padding-x 24 (mobile/tablet) → 120 (xl), ancho útil máx. 1200.
 *
 * Mobile: el diseño muestra SOLO el logo (docs/responsive.md §4.1 — decisión
 * aprobada, sin hamburguesa): links y acceso se ocultan por debajo de `md`.
 */
export default function Navbar() {
  return (
    <header className="bg-surface">
      <div className="mx-auto flex h-24 w-full max-w-page items-center justify-between px-6 xl:px-30">
        {/* Identidad PetCare. */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-[38px] items-center justify-center rounded-emblem bg-primary-600 text-surface">
            <PawPrint aria-hidden="true" />
          </span>
          <span className="text-brand font-extrabold text-primary-500">PetCare</span>
        </a>

        {/* Enlaces de sección. */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={[
                    "relative inline-flex items-center text-nav transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                    link.active
                      ? "font-bold text-primary-600"
                      // ⏳ El estilo exacto de la variante Hovered del
                      // Navigation Item (368:6940) está pendiente de verificar
                      // en Figma; criterio con token: texto → #0b625e.
                      : "font-medium text-secondary hover:text-primary-600",
                  ].join(" ")}
                >
                  {link.label}
                  {link.active ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-full mt-1 h-[3px] w-[19px] -translate-x-1/2 rounded-[2px] bg-accent"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acceso: Iniciar Sesión / Registrarse. */}
        <div className="hidden items-center gap-6 md:flex">
          <Button type="terciary" label="Iniciar Sesión" href="/login" />
          <Button type="default" label="Registrarse" href="/register" />
        </div>
      </div>
    </header>
  );
}
