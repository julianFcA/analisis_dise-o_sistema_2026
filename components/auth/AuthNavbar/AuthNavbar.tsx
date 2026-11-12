import Link from "next/link";
import PawPrint from "@/components/icons/paw-print";

/** Enlaces del Navbar de autenticación (docs/auth-reference §4.1.1). */
const NAV_LINKS: readonly { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
];

/**
 * Navbar de las pantallas de autenticación (docs/auth-reference §4.1.1):
 * logo PetCare a la izquierda y enlaces Inicio / Servicios a la derecha.
 *
 * Reutiliza la identidad del Navbar del landing (emblema 38, wordmark
 * ExtraBold 27 #084c49, alto 96px) pero con una navegación reducida y sin
 * los botones de acceso, tal como define la referencia. En Mobile se oculta
 * la navegación y queda solo el logo, igual que en el landing aprobado
 * (docs/responsive.md §4.1).
 */
export default function AuthNavbar() {
  return (
    <header className="bg-surface">
      <div className="mx-auto flex h-24 w-full max-w-page items-center justify-between px-6 xl:px-0">
        {/* Identidad PetCare. */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-[38px] items-center justify-center rounded-emblem bg-primary-600 text-surface">
            <PawPrint aria-hidden="true" />
          </span>
          <span className="text-brand font-extrabold text-primary-500">PetCare</span>
        </Link>

        {/* Navegación: Inicio y Servicios. */}
        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-flex items-center text-nav font-medium text-secondary transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
