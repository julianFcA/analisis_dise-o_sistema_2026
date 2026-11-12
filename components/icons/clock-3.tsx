import type { SVGProps } from "react";

/**
 * Icono `clock-3` del PetCare Design System (trazo tipo Lucide).
 * Tamaño raíz 20px: medio de contacto "horario" de la sección Contacto
 * (docs/landing-page.md §10).
 *
 * ⏳ Provisional: reemplazar por el SVG exacto exportado de Figma cuando el
 * plan de Figma MCP permita descargar assets (docs/figma-reference.md §5.2).
 */
export default function Clock3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6h4" />
    </svg>
  );
}
