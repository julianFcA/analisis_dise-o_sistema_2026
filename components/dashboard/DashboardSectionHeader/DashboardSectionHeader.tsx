import type { ReactNode } from "react";

export interface DashboardSectionHeaderProps {
  /** Antetítulo en mayúsculas (Bold 12, tracking 1.8, #0b625e). */
  eyebrow: string;
  /** Título del bloque (Bold 22, #084c49). */
  title: string;
  /** Acción alineada a la derecha (link "Ver…" o botón de icono). */
  action?: ReactNode;
  className?: string;
}

/**
 * Encabezado de las tarjetas del Dashboard: reutiliza los patrones
 * tipográficos del design system (antetítulo de `SectionHeading` + título de
 * formulario) porque el H2 de 36px del Home no aplica al interior de una
 * tarjeta del área autenticada.
 */
export default function DashboardSectionHeader({
  eyebrow,
  title,
  action,
  className,
}: DashboardSectionHeaderProps) {
  return (
    <div
      className={["flex items-start justify-between gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-eyebrow font-bold uppercase text-primary-600">
          {eyebrow}
        </p>
        <h2 className="text-form-title text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}
