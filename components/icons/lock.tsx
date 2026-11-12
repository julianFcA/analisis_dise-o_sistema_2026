import type { SVGProps } from "react";

/**
 * Icono `lock` del PetCare Design System (trazo tipo Lucide).
 * Uso: icono izquierdo de los campos de contraseña de las pantallas de
 * autenticación (docs/auth-reference §5.2 / §7.2).
 *
 * ⏳ Provisional: reemplazar por el SVG exacto exportado de Figma cuando el
 * plan de Figma MCP permita descargar assets (docs/figma-reference.md §5.2).
 */
export default function Lock(props: SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
