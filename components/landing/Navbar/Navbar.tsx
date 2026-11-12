import Button from "@/components/ui/Button";
import NavBar from "@/components/ui/NavBar/NavBar";
import NavigationItem from "@/components/ui/NavigationItem/NavigationItem";
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
 *
 * Compone el shell `NavBar` del UI Kit con el contenido propio del Home:
 * - Identidad PetCare: emblema 38×38 (#0b625e, radio 12, paw-print 23) +
 *   wordmark ExtraBold 27 #084c49 (tracking −1).
 * - 4 `NavigationItem` (gap 32): Inicio activo (Bold 15 #0b625e + indicador
 *   #f28c45 19×3 radio 2), resto Medium 15 #647873.
 * - Acceso (gap 24): Button Terciary "Iniciar Sesión" + Button Default
 *   "Registrarse" del UI Kit.
 *
 * Mobile: el diseño muestra SOLO el logo (docs/responsive.md §4.1 — decisión
 * aprobada, sin hamburguesa): items y acceso se ocultan por debajo de `md`.
 */
export default function Navbar() {
  return (
    <NavBar
      start={
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-[38px] items-center justify-center rounded-emblem bg-primary-600 text-surface">
            <PawPrint aria-hidden="true" />
          </span>
          <span className="text-brand font-extrabold text-primary-500">
            PetCare
          </span>
        </a>
      }
      navLabel="Navegación principal"
      navClassName="hidden md:block"
      actions={
        <div className="hidden items-center gap-6 md:flex">
          <Button type="terciary" label="Iniciar Sesión" href="/login" />
          <Button type="default" label="Registrarse" href="/register" />
        </div>
      }
    >
      {NAV_LINKS.map((link) => (
        <li key={link.label}>
          <NavigationItem
            label={link.label}
            href={link.href}
            active={link.active}
          />
        </li>
      ))}
    </NavBar>
  );
}
