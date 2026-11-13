import Image from "next/image";
import Button from "@/components/ui/Button";
import ChevronRight from "@/components/icons/chevron-right";
import Plus from "@/components/icons/plus";
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader/DashboardSectionHeader";
import WeeklyTip from "@/components/dashboard/WeeklyTip/WeeklyTip";

interface Pet {
  name: string;
  breed: string;
  age: string;
  /** Asset existente en `public/images/` (no hay retratos de mascotas propios). */
  image: string;
  /** Punto focal del recorte circular. */
  imagePosition: string;
  imageAlt: string;
}

/** Datos estáticos de referencia de esta fase (sin CRUD). */
const PETS: readonly Pet[] = [
  {
    name: "Milo",
    breed: "Golden retriever",
    age: "4 años",
    image: "/images/milo.png",
    imagePosition: "object-[70%_50%]",
    imageAlt: "Milo, golden retriever",
  },
  {
    name: "Nala",
    breed: "Beagle",
    age: "2 años",
    image: "/images/nala.png",
    imagePosition: "object-[40%_70%]",
    imageAlt: "Nala, beagle",
  },
];

/**
 * Mis mascotas (columna derecha del Dashboard): encabezado FAMILIA / Mis
 * mascotas con botón visual de agregar, lista de mascotas y el consejo de la
 * semana.
 *
 * Cada fila reutiliza el patrón de tarjeta pequeña del design system (borde
 * `#dce7e3`, radio 16) con imagen circular, nombre, especie/edad, chip de
 * estado y chevron. No implementa CRUD.
 */
export default function MyPets() {
  return (
    <section className="flex flex-col gap-5 rounded-card-lg border border-border bg-surface p-6 shadow-card">
      <DashboardSectionHeader
        eyebrow="FAMILIA"
        title="Mis mascotas"
        action={
          <Button
            type="secondary"
            showText={false}
            label="Agregar mascota"
            className="h-10 w-10 px-0"
            leftIcon={<Plus aria-hidden="true" className="size-5" />}
          />
        }
      />

      <ul className="flex flex-col gap-3">
        {PETS.map(({ name, breed, age, image, imagePosition, imageAlt }) => (
          <li key={name}>
            <a
              href="#"
              className="flex items-center gap-3 rounded-card border border-border p-3 transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <Image
                src={image}
                alt={imageAlt}
                width={96}
                height={96}
                sizes="48px"
                className={[
                  "size-12 shrink-0 rounded-2xl object-cover",
                  imagePosition,
                ].join(" ")}
              />

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate text-nav font-bold text-primary-500">
                  {name}
                </p>
                <p className="truncate text-note text-secondary">
                  {breed} · {age}
                </p>
                <span className="w-fit rounded-full bg-chip px-2 py-0.5 text-note font-bold text-primary-600">
                  Vacunas al día
                </span>
              </div>

              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-secondary"
              />
            </a>
          </li>
        ))}
      </ul>

      <WeeklyTip />
    </section>
  );
}
