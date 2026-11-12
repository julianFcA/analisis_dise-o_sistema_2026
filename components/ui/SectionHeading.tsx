export interface SectionHeadingProps {
  /** Antetítulo en mayúsculas (Bold 12, tracking 1.8, #0b625e). */
  eyebrow: string;
  /** Título de sección (Bold 36/1.18, tracking −1.1, #084c49). */
  title: string;
  /** Descripción opcional (Regular 16/1.6, #647873). */
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Encabezado de sección: patrón compuesto del Home (antetítulo + título +
 * descripción, gap 16 — docs/design-system.md §6). Centrado en Testimonios,
 * Razones y Cómo Funciona; alineado a la izquierda en el resto.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignmentClasses = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div
      className={["flex flex-col gap-4", alignmentClasses, className]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-eyebrow font-bold uppercase text-primary-600">{eyebrow}</p>
      <h2 className="text-h2 font-bold text-primary-500">{title}</h2>
      {description ? (
        <p className="text-description text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
