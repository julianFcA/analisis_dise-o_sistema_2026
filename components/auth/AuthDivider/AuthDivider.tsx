import type { ReactNode } from "react";

export interface AuthDividerProps {
  children: ReactNode;
}

/**
 * Separador visual compartido (docs/auth-reference §5.2 / §6.2): línea
 * horizontal a cada lado y texto centrado con ancho natural.
 *
 * Es un elemento puramente visual, no un botón ni un enlace. Las líneas
 * usan el color de borde sutil del Design System.
 */
export default function AuthDivider({ children }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span className="shrink-0 text-support text-secondary">{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
