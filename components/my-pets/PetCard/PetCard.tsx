import Image from "next/image";
import Badge, { type BadgeType } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import CalendarDays from "@/components/icons/calendar-days";
import PawPrint from "@/components/icons/paw-print";

/** Estado de salud mostrado en la tarjeta. */
export type PetHealth = "healthy" | "follow-up";

export interface PetImage {
  src: string;
  alt: string;
  /** Clases de encuadre para `next/image` (p. ej. `object-top`). */
  className?: string;
}

export interface Pet {
  id: string;
  name: string;
  /** Tipo de mascota (Perro, Gato…). */
  type: string;
  breed: string;
  age: string;
  health: PetHealth;
  registeredAt: string;
  /** Se omite cuando no existe un asset local adecuado. */
  image?: PetImage;
}

const HEALTH_CONFIG: Record<PetHealth, { label: string; type: BadgeType }> = {
  healthy: { label: "Saludable", type: "success" },
  "follow-up": { label: "En seguimiento", type: "canceled" },
};

export interface PetCardProps {
  pet: Pet;
}

/**
 * Tarjeta de mascota: foto con badge de tipo, nombre + estado, raza y edad,
 * fecha de registro y acciones de edición/eliminación.
 *
 * Las acciones son elementos visuales preparados para una integración
 * posterior (sin CRUD ni modales en esta fase). El estado de salud reutiliza
 * `Badge`; la foto se sirve con `next/image` y un fallback del design system
 * cuando no hay un asset local compatible.
 */
export default function PetCard({ pet }: PetCardProps) {
  const health = HEALTH_CONFIG[pet.health];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card">
      <div className="relative aspect-3/2 w-full shrink-0 overflow-hidden bg-chip">
        {pet.image ? (
          <Image
            src={pet.image.src}
            alt={pet.image.alt}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
            className={cn("object-cover", pet.image.className)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <PawPrint
              aria-hidden="true"
              className="size-10 text-primary-600/50"
            />
            <p className="text-note text-secondary">Foto no disponible</p>
          </div>
        )}

        <Badge className="absolute left-4 top-4">
          <PawPrint aria-hidden="true" className="size-3.5" />
          {pet.type}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 xl:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-service-name font-bold text-ink">{pet.name}</h3>
          <Badge type={health.type} showIndicator>
            {health.label}
          </Badge>
        </div>

        <p className="text-control-sm text-secondary">
          {pet.breed} · {pet.age}
        </p>

        <p className="flex items-center gap-1.5 text-note text-secondary">
          <CalendarDays
            aria-hidden="true"
            className="size-4 shrink-0 text-primary-600"
          />
          <span>Registrado el {pet.registeredAt}</span>
        </p>

        <div className="mt-auto flex items-center gap-5 border-t border-border pt-3">
          <button
            type="button"
            aria-label={`Editar a ${pet.name}`}
            className="text-note font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Editar
          </button>
          <button
            type="button"
            aria-label={`Eliminar a ${pet.name}`}
            className="text-note font-bold text-accent-strong transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
