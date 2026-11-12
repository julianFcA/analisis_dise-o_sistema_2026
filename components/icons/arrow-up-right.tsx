import type { SVGProps } from "react";

/**
 * Icono `arrow-up-right` del PetCare Design System (trazo tipo Lucide).
 * Tamaño raíz 18px: flecha de la tarjeta de categoría
 * (docs/landing-page.md §4).
 *
 * ⏳ Provisional: reemplazar por el SVG exacto exportado de Figma cuando el
 * plan de Figma MCP permita descargar assets (docs/figma-reference.md §5.2).
 */
export default function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
