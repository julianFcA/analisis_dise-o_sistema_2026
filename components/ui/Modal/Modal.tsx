import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface ModalProps {
  /** Contenido libre del modal (título, formulario, acciones…). */
  children: ReactNode;
  /** Clases adicionales para el contenedor del overlay. */
  className?: string;
  /** `id` del elemento que titula el dialog (`aria-labelledby`). */
  labelledBy?: string;
}

/**
 * Overlay de pantalla completa del UI Kit (node `106:1812`).
 *
 * Solo aporta la capa visual y estructural: fondo `#5f6c72` al 56% + blur de
 * 16px sobre el contenido que queda detrás, y un contenedor centrado para
 * `children`. No asume título, tamaño, padding ni acciones internas: todo eso
 * es responsabilidad del consumidor.
 *
 * Sin lógica de apertura/cierre, portal, focus trap, cierre con Escape ni
 * animaciones en esta fase (docs/design-system.md §5.13).
 */
export default function Modal({ children, className, labelledBy }: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={cn(
        "fixed inset-0 z-60 flex items-center justify-center overflow-y-auto p-4",
        /* Fondo #5f6c72 al 56% (`--color-overlay`) + blur 16px
           (`backdrop-blur-lg` = 16px en la escala de Tailwind). */
        "bg-overlay backdrop-blur-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}