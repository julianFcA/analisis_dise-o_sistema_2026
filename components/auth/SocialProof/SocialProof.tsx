import Users from "@/components/icons/users";

export interface SocialProofProps {
  className?: string;
}

/**
 * Bloque Social Proof compartido (docs/auth-reference §6.3): icono de
 * usuarios en un contenedor circular verde muted, con el texto debajo y el
 * contenido centrado. Se ubica debajo del contenedor de las dos columnas,
 * fuera de la Auth Card.
 */
export default function SocialProof({ className }: SocialProofProps) {
  return (
    <div
      className={[
        "flex flex-col items-center gap-3 text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-primary-600">
        <Users aria-hidden="true" className="size-5" />
      </span>
      <p className="text-support text-secondary">
        Más de 1.000 propietarios conectados con proveedores de confianza.
      </p>
    </div>
  );
}
