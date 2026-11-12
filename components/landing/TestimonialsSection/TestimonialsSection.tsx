import Avatar from "@/components/ui/Avatar";
import SectionHeading from "@/components/ui/SectionHeading";
import Star from "@/components/icons/star";

interface Testimonial {
  initials: string;
  name: string;
  service: string;
  experience: string;
}

/** Los 3 testimonios documentados (docs/landing-page.md §9). */
const TESTIMONIALS: readonly Testimonial[] = [
  {
    initials: "AC",
    name: "Ana y Coco",
    service: "Cuidado Temporal",
    experience:
      "“Me daba nervios dejar a Coco por primera vez. Poder conocer a su cuidadora antes me dio mucha tranquilidad. ¡Volvió feliz!”",
  },
  {
    initials: "ML",
    name: "Marcos y Luna",
    service: "Paseo",
    experience:
      "“Encontré a alguien que entiende la energía de Luna. Ahora sus paseos tienen un lugar fijo en nuestra rutina y ella lo disfruta muchísimo.”",
  },
  {
    initials: "EM",
    name: "Elena y Milo",
    service: "Veterinaria",
    experience:
      "“Tener las solicitudes y el historial de Milo juntos me ayuda a organizarme. Encontré una consulta cerca de casa sin complicaciones.”",
  },
];

/**
 * Tarjeta de testimonio (docs/design-system.md §6): blanca, radio 24,
 * padding 28, `--shadow-card`; 5 estrellas 15px, experiencia Regular 16/1.65
 * `#173d39` (min-h 128 en Desktop) y familia con Avatar 48 + nombre +
 * servicio (docs/landing-page.md §9).
 *
 * Los gaps internos son 16 en Tablet/Mobile y 24 en Desktop: así se
 * reproducen las alturas documentadas (203px / 255px / 295px).
 *
 * ⏳ El color de las estrellas no está documentado; se usa `--color-accent`
 * (único acento cálido del kit).
 */
function TestimonialCard({
  initials,
  name,
  service,
  experience,
}: Testimonial) {
  return (
    <article className="flex flex-col gap-4 rounded-card-lg bg-surface p-7 shadow-card xl:gap-6">
      <div
        role="img"
        aria-label="5 de 5 estrellas"
        className="flex items-center gap-1 text-accent"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} aria-hidden="true" className="fill-current" />
        ))}
      </div>

      <p className="text-testimonial text-body xl:min-h-32">{experience}</p>

      <div className="flex items-center gap-3">
        <Avatar size={48} initials={initials} />
        <div className="flex flex-col">
          <p className="text-testimonial-author font-bold text-primary-500">
            {name}
          </p>
          <p className="text-note text-secondary">{service}</p>
        </div>
      </div>
    </article>
  );
}

/**
 * Testimonios (docs/landing-page.md §9 — nodos D `126:5906` ·
 * T `355:4799` · M `389:6475`): fondo `#f4f7f6`, encabezado centrado y nota
 * inferior centrada. 3 tarjetas con gap 24: 3 columnas de 384px en Desktop,
 * apiladas a 720px en Tablet y a 342px en Mobile (docs/responsive.md §9).
 */
export default function TestimonialsSection() {
  return (
    <section className="bg-surface-muted py-20">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="center"
            eyebrow="HISTORIAS DE NUESTRA COMUNIDAD"
            title="Tranquilidad que se comparte"
          />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.initials}
                {...testimonial}
              />
            ))}
          </div>

          <p className="text-note text-center text-secondary">
            Testimonios ilustrativos de la experiencia PetCare.
          </p>
        </div>
      </div>
    </section>
  );
}
