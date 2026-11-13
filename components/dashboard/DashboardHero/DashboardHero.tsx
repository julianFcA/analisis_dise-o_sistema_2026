import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ArrowRight from "@/components/icons/arrow-right";
import ShieldCheck from "@/components/icons/shield-check";

/**
 * Banner principal del Dashboard: bloque de mensaje sobre fondo primario con
 * la fotografía de la propietaria y su mascota a la derecha y el sello de
 * confianza flotante sobre la imagen.
 *
 * Reutiliza `Badge` (píldora del kit), `Button` Secondary (contraste blanco
 * sobre el fondo primario) y el patrón de la "Nota de bienestar" del Home
 * para el bloque de confianza (símbolo + dos líneas de texto).
 *
 * Responsive: una columna en Mobile/Tablet — texto arriba, imagen debajo — y
 * dos columnas a partir de `md` (imagen 420px).
 */
export default function DashboardHero() {
  return (
    <section
      aria-labelledby="dashboard-hero-title"
      className="overflow-hidden rounded-card-lg bg-primary-500"
    >
      <div className="relative grid grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_720px]">
        <div className="absolute bottom-1/2 lg:left-90 w-80 h-80 rounded-full border-2 border-surface opacity-15"></div>
        <div className="flex flex-col items-start justify-center gap-5 p-6 lg:p-12">
          <Badge className="bg-white/10 uppercase text-surface">
            CUIDADO SIN COMPLICACIONES
          </Badge>

          <h2
            id="dashboard-hero-title"
            className="max-w-125 text-h2 text-surface"
          >
            Su bienestar empieza con una buena rutina
          </h2>

          <p className="max-w-115 text-hero-body text-footer-text">
            Encuentra profesionales verificados y agenda el servicio ideal para
            cada etapa de su vida.
          </p>

          <Button
            type="terciary"
            label="Explorar servicios"
            rightIcon={<ArrowRight aria-hidden="true" className="size-5" />}
            className="mt-1 text-surface"
          />
        </div>

        <div className="relative min-h-56 xl:min-h-full">
          <div className="absolute top-0 left-0 w-full h-full  bg-linear-to-r from-primary-500 to-transparent z-10" />
          <Image
            src="/images/golden_retriever.png"
            alt="Golden Retriever"
            fill
            sizes="(min-width: 1280px) 420px, 100vw"
            className="object-cover"
          />

          <div className="absolute bottom-4 left-0 right-4 lg:mx-auto max-w-60  flex items-center gap-2.5 rounded-card bg-surface px-3 py-2.5 shadow-float z-20">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-emblem bg-chip text-primary-600">
              <ShieldCheck aria-hidden="true" className="size-4" />
            </span>
            <div className="flex min-w-0 flex-col">
              <p className="text-support font-bold text-primary-500">
                100% verificados
              </p>
              <p className="text-note text-secondary">
                Profesionales de confianza
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
