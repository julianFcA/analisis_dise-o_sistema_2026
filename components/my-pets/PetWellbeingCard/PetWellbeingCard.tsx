import HeartHandshake from "@/components/icons/heart-handshake";

/**
 * Bloque destacado de bienestar bajo las tarjetas: icono, título y consejo
 * breve sobre la superficie suave del design system (`--color-chip`).
 */
export default function PetWellbeingCard() {
  return (
    <aside
      aria-labelledby="pet-wellbeing-title"
      className="flex h-full items-center gap-3 rounded-card bg-chip p-4 xl:p-5"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary-600">
        <HeartHandshake aria-hidden="true" className="size-5" />
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <p
          id="pet-wellbeing-title"
          className="text-label font-bold text-primary-500"
        >
          Su bienestar empieza aquí
        </p>
        <p className="text-note text-secondary">
          Mantén sus vacunas y datos al día para un cuidado más seguro.
        </p>
      </div>
    </aside>
  );
}
