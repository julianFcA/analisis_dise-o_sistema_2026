import type { ReactNode } from "react";

export interface AuthCardProps {
  /** Título del formulario (Bold 22 #084c49 del design system). */
  title: string;
  /** Descripción breve bajo el título. */
  description: string;
  children: ReactNode;
}

/**
 * Card blanca compartida por Login y Register
 * (docs/auth-reference §5.2 / §6.2): radio 24, borde sutil `--color-border`
 * y sombra suave `--shadow-card`. El contenido se organiza verticalmente.
 *
 * En Desktop la card se estira a la altura del Presentation Panel y centra
 * su contenido; en Tablet/Mobile mantiene su altura natural.
 */
export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="flex h-full flex-col rounded-card-lg border border-border bg-surface p-6 shadow-card md:p-8 xl:justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-form-title font-bold text-primary-500">{title}</h1>
        <p className="text-description text-secondary">{description}</p>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
