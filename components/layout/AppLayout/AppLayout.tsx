"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import Link from "next/link";
import Aside from "@/components/ui/Aside/Aside";
import NavBar from "@/components/ui/NavBar/NavBar";
import NavigationItem from "@/components/ui/NavigationItem/NavigationItem";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import PawPrint from "@/components/icons/paw-print";
import HouseHeart from "@/components/icons/house-heart";
import Footprints from "@/components/icons/footprints";
import ClipboardList from "@/components/icons/clipboard-list";
import Heart from "@/components/icons/heart";
import Search from "@/components/icons/search";
import Bell from "@/components/icons/bell";
import Moon from "@/components/icons/moon";
import ChevronRight from "@/components/icons/chevron-right";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Item de la navegación lateral de la app interna. */
interface AppNavItem {
  label: string;
  icon: IconComponent;
  active?: boolean;
  /** Indicador numérico a la derecha (Solicitudes). */
  count?: number;
  href: string;
}

/* Navegación visible del shell autenticado. Las rutas todavía no existen:
   los enlaces quedan como ancla estructural (fase de layout, sin páginas). */
const APP_NAV_ITEMS: readonly AppNavItem[] = [
  { label: "Inicio", icon: HouseHeart, active: true, href:"/dashboard" },
  { label: "Mis mascotas", icon: Footprints, href:"my-pets" },
  { label: "Solicitudes", icon: ClipboardList, count: 2, href:"/applications" },
  { label: "Servicios", icon: Heart, href:"/services" },
];

export interface AppLayoutProps {
  /** Contenido de la página autenticada. Vacío en esta fase. */
  children?: ReactNode;
}

/**
 * Layout base de la aplicación autenticada: `Aside` oscuro a la izquierda,
 * `NavBar` superior y `<main>` con el contenido de la ruta.
 *
 * Solo estructura global (sombreado/bordes/tokens del design system): no
 * contiene contenido de Dashboard, datos ni lógica de autenticación. Las
 * páginas internas futuras se pintan mediante `children`.
 *
 * Desktop/Tablet (`md`+): Aside fijo de 256px a toda altura (`sticky`), Navbar
 * a la derecha ocupando el ancho restante y contenido con padding 24 → 48.
 * Mobile: el Aside se oculta (no hay drawer definido todavía) y el Navbar
 * conserva búsqueda + acciones sin overflow horizontal.
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface-muted">
      <Aside
        label="Navegación de PetCare"
        className={[
          "w-50 lg:w-64 shrink-0 flex-col gap-8 px-4 py-6",
          "bg-primary-500",
          "max-md:hidden md:sticky md:top-0 md:h-screen",
        ].join(" ")}
      >
        {/* Identidad PetCare. */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
        >
          <span className="flex size-9 items-center justify-center rounded-emblem bg-surface text-primary-600">
            <PawPrint aria-hidden="true" className="size-5.25" />
          </span>
          <span className="text-brand font-extrabold text-surface">PetCare</span>
        </Link>

        {/* Navegación lateral. */}
        <nav aria-label="Secciones de la aplicación">
          <ul className="flex flex-col gap-1">
            {APP_NAV_ITEMS.map(({ label, icon: Icon, active, count, href }) => (
              <li key={label}>
                <NavigationItem
                  label={label}
                  href={href}
                  active={active}
                  tone="on-primary"
                  icon={<Icon aria-hidden="true" className="size-5" />}
                  trailing={
                    count ? (
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent text-badge font-bold text-surface">
                        {count}
                      </span>
                    ) : undefined
                  }
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Soporte + perfil, anclados al pie del Aside. */}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2.5 rounded-card border border-white/15 p-4">
            <span className="flex size-9 items-center justify-center rounded-emblem bg-accent-soft text-accent">
              <Heart aria-hidden="true" className="size-[18px]" />
            </span>
            <p className="text-nav font-bold text-surface">¿Necesitas ayuda?</p>
            <p className="text-note text-footer-text">
              Nuestro equipo está disponible para orientarte.
            </p>
            <a
              href="#"
              className="text-note font-bold text-surface transition-colors hover:text-footer-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
            >
              Hablar con soporte
            </a>
          </div>

          <a
            href="#"
            className="flex items-center gap-3 border-t border-white/13 pt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            <Avatar size={40} initials="AM" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-control-sm font-bold text-surface">
                Andrea Molina
              </span>
              <span className="text-note text-footer-text">Propietaria</span>
            </span>
            <ChevronRight
              aria-hidden="true"
              className="size-4 shrink-0 text-footer-text"
            />
          </a>
        </div>
      </Aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <NavBar
          fullWidth
          className="sticky top-0 z-50"
          start={
            <SearchBar
              field
              icon={Search}
              name="q"
              placeholder="Buscar servicios o proveedores"
              aria-label="Buscar servicios o proveedores"
              className="min-w-0 max-w-[420px] flex-1"
            />
          }
          actions={
            <div className="flex shrink-0 items-center gap-3">
              <Button
                className="h-10 w-10 px-0"
                type="secondary"
                showText={false}
                label="Cambiar tema"
                leftIcon={<Moon aria-hidden="true" className="size-5" />}
              />
              <Button
                className="h-10 w-10 px-0"
                type="secondary"
                showText={false}
                label="Notificaciones"
                leftIcon={<Bell aria-hidden="true" className="size-5" />}
              />
              <Avatar size={40} initials="AM" />
            </div>
          }
        />

        <main className="min-w-0 flex-1 p-6 xl:p-12">{children}</main>
      </div>
    </div>
  );
}
