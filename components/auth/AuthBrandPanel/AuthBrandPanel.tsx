import Check from "@/components/icons/check";

/** Beneficios del Presentation Panel (docs/auth-reference §5.1 / §6.1). */
const BENEFITS: readonly string[] = ["Cuidado", "Salud", "Bienestar"];

export interface AuthBrandPanelProps {
  /** Título del panel (H2 del design system). */
  title: string;
  /** Descripción breve bajo el título. */
  description: string;
}

/**
 * Presentation Panel compartido de Login y Register
 * (docs/auth-reference §5.1 / §6.1).
 *
 * Fondo verde muted (`--color-surface-muted`), radio 24, contenido vertical
 * centrado: eyebrow, título, descripción, ilustración local 592×318 y los
 * tres beneficios en una fila horizontal. El panel solo se muestra en
 * Desktop; `AuthLayout` lo oculta por debajo de `xl`.
 *
 * ⏳ Las medidas finas del panel (padding interno, separaciones) están
 * pendientes de Figma. Se usan los valores del Design System: padding 32,
 * gap 32 entre bloques y gap 16 dentro del encabezado.
 */
export default function AuthBrandPanel({
  title,
  description,
}: AuthBrandPanelProps) {
  return (
    <section className="flex h-full flex-col  gap-8 rounded-card-lg bg-surface-muted px-10 py-8">
      <div className="flex flex-col gap-4">
        <p className="text-eyebrow font-bold uppercase text-primary-600">
          SU BIENESTAR NOS CONECTA
        </p>
        <h2 className="text-h2 font-bold text-primary-500">{title}</h2>
        <p className="text-description text-secondary">{description}</p>
      </div>

      {/* Ilustración local compartida por ambas pantallas. Se conserva la
          proporción original 592×318 (docs/auth-reference §5.1). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/illustrations/auth/auth.svg"
        alt=""
        width={592}
        height={318}
        aria-hidden="true"
        className="block h-auto w-full"
      />

      {/* Beneficios en una única fila horizontal, con separación uniforme. */}
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {BENEFITS.map((benefit) => (
          <li
            key={benefit}
            className="flex items-center gap-2 text-tag font-medium text-primary-500"
          >
            <Check aria-hidden="true" className="size-4" />
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
}
