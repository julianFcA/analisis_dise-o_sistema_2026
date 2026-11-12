import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import PawPrint from "@/components/icons/paw-print";

/**
 * Sobre Nosotros (docs/landing-page.md §7 — nodos D `126:5853` ·
 * T `355:4749` · M `389:6425`): imagen 544×412 con el chip "Mensaje de
 * comunidad" flotante + columna "Nuestra misión" de 584px.
 *
 * Desktop (xl): 2 columnas — imagen 544px + misión 584px (gap 72 para
 * completar los 1200px útiles). Tablet/Mobile: apilado a ancho completo;
 * la imagen conserva 412px de alto (docs/responsive.md §7).
 *
 * ⏳ El copy (antetítulo, título, misión, propósito, mensaje de comunidad y
 * etiqueta del botón) no está disponible: el nodo `126:5853` no se pudo
 * extraer (Figma MCP rate-limited) y la documentación lo marca pendiente.
 * Se usan marcadores explícitos para no inventar contenido.
 *
 * ⏳ Estilos asumidos por no estar documentados: radio 24 de la imagen
 * (patrón de tarjeta grande), chip blanco con `--shadow-float` y padding
 * 16/12, y posición móvil del chip en y=235 (documentada).
 */
export default function AboutSection() {
  return (
    <section id="nosotros" className="py-16 md:py-8 xl:py-20 bg-surface-muted">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="grid grid-cols-1 gap-8 md:gap-6 xl:grid-cols-[544px_minmax(0,1fr)] xl:items-center xl:gap-18">
          {/* Cuidado compartido: foto + mensaje de comunidad. */}
          <figure className="relative h-103 w-full overflow-hidden rounded-card-lg">
            <Image
              src="/images/owner-with-pet.png"
              alt="Propietaria con su mascota"
              fill
              sizes="(min-width: 1280px) 544px, (min-width: 768px) 720px, 342px"
              className="object-cover"
            />
            <figcaption className="absolute left-6 top-[235px] flex max-w-[calc(100%-3rem)] font-bold items-center gap-2 rounded-chip bg-surface px-4 py-3 text-hero-body text-primary-500 shadow-float md:bottom-6 md:top-auto">
              <PawPrint
                aria-hidden="true"
                className="size-5 shrink-0 text-primary-600"
              />
              El cariño es nuestro punto de partida.
            </figcaption>
          </figure>

          {/* Nuestra misión (584px en Desktop). */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="SOBRE NOSOTROS"
              title="Sabemos lo mucho que significa para ti."
            />

            <div className="flex flex-col gap-4">
              <p className="text-description text-secondary">
              En PetCare creemos que cada mascota merece una vida feliz y bien cuidada. Por eso conectamos a sus familias con proveedores de servicios que ponen su bienestar en el centro.
              </p>
              <p className="text-description text-secondary">
                Queremos hacer más sencillo el cuidado diario: encontrar ayuda, organizar solicitudes y acompañar cada etapa, todo en un mismo lugar.
              </p>
            </div>

            <div>
              <Button
                type="secondary"
                label="Conoce PetCare"
                className="min-h-11"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
