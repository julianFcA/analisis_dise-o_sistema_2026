import type { SVGProps } from "react";

/**
 * Icono `x` de cierre del Modal de mascota.
 * Trazo tipo Lucide, 24px raíz (se escala con `className`).
 *
 * ⏳ Provisional: reemplazar por el SVG exacto exportado de Figma cuando el
 * plan de Figma MCP permita descargar assets (docs/figma-reference.md §5.2).
 */
export default function X(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}