import Avatar from "@/components/ui/Avatar";

export interface ServiceReviewData {
  quote: string;
  author: string;
  /** Iniciales del Avatar. */
  initials: string;
  /** Contexto de la visita (verificación y fecha). */
  meta: string;
}

/**
 * Reseña de referencia para la composición. El dataset no contiene reviews por
 * servicio (ver `docs/architecture.md` §5), así que el contenido es estático de
 * presentación y se sustituirá por la fuente real cuando exista.
 */
const REVIEW: ServiceReviewData = {
  quote:
    "Trataron a Bruno con muchísimo cariño. Me explicaron todo con calma y salimos muy tranquilos.",
  author: "Ana Lucía",
  initials: "AL",
  meta: "Visita verificada · Octubre de 2026",
};

/**
 * Card de reseña: cita con comilla decorativa y familia, reutilizando el
 * `Avatar` del kit.
 */
export default function ServiceReview() {
  return (
    <section
      aria-label="Reseña de una familia"
      className="flex min-w-0 flex-col rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <figure className="flex gap-2">
        <span
          aria-hidden="true"
          className="shrink-0 select-none text-h2 leading-[0.75] text-border"
        >
          “
        </span>

        <div className="flex min-w-0 flex-col gap-4">
          <blockquote className="text-testimonial text-body">
            {REVIEW.quote}
          </blockquote>

          <figcaption className="flex items-center gap-3">
            <Avatar size={40} initials={REVIEW.initials} />
            <div className="flex min-w-0 flex-col">
              <p className="text-testimonial-author font-bold text-primary-500">
                {REVIEW.author}
              </p>
              <p className="text-note text-secondary">{REVIEW.meta}</p>
            </div>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
