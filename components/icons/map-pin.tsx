import type { SVGProps } from "react";

/**
 * Icono `map-pin` del PetCare Design System (trazo tipo Lucide).
 * Tamaño raíz 22px: uso documentado en el campo "¿Dónde?" de la Búsqueda
 * rápida (docs/landing-page.md §3, patrón Search Bar §5.16).
 * Otros usos: 14px en la ubicación de las tarjetas de servicio
 * (docs/landing-page.md §6) vía `className`.
 *
 * ⏳ Provisional: reemplazar por el SVG exacto exportado de Figma cuando el
 * plan de Figma MCP permita descargar assets (docs/figma-reference.md §5.2).
 */
export default function MapPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
