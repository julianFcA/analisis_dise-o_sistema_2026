import type { ReactNode } from "react";

export interface AsideProps {
  /** `aria-label` del landmark `aside` (p. ej. "Navegación lateral"). */
  label?: string;
  /** Elementos de navegación y/o contenido lateral. */
  children: ReactNode;
  /** Clases del contenedor (ancho, fondo, padding… los define el consumidor). */
  className?: string;
}

/**
 * Aside del UI Kit (node 130:977): contenedor estructural de navegación
 * lateral para la aplicación interna. No se usa en el Home Page.
 *
 * ⏳ La especificación visual del node 130:977 no está extraída, así que el
 * componente **no** define colores, medidas, iconografía ni comportamiento
 * responsive: solo el landmark `<aside>` y la columna de contenido. El
 * consumidor aporta el diseño mediante `className` y sus propios hijos.
 */
export default function Aside({ label, children, className }: AsideProps) {
  return (
    <aside
      aria-label={label}
      className={["flex flex-col", className].filter(Boolean).join(" ")}
    >
      {children}
    </aside>
  );
}
