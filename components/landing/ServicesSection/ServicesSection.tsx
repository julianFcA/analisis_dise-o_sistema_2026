"use client";

import { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Heart from "@/components/icons/heart";
import MapPin from "@/components/icons/map-pin";

interface Service {
  category: string;
  name: string;
  provider: string;
  location: string;
  price: string;
  unit: string;
  image: string;
  imageAlt: string;
}

/** Los 3 servicios documentados (docs/landing-page.md §6). */
const SERVICES: readonly Service[] = [
  {
    category: "Veterinaria",
    name: "Consulta de bienestar",
    provider: "Clínica Huellas",
    location: "Colombia",
    price: "60.000",
    unit: "/ consulta",
    image: "/images/consulta.png",
    imageAlt: "Consulta de bienestar en Clínica Huellas",
  },
  {
    category: "Peluquería",
    name: "Baño y corte con cariño",
    provider: "Mimo Peluquería Canina",
    location: "Colombia",
    price: "80.000",
    unit: "/ sesión",
    image: "/images/shower.png",
    imageAlt: "Baño y corte en Mimo Peluquería Canina",
  },
  {
    category: "Paseo",
    name: "Un paseo a su ritmo",
    provider: "Lucía · Paseadora",
    location: "Colombia",
    price: "15.000",
    unit: "/ 60 min",
    image: "/images/paseo.png",
    imageAlt: "Paseo de mascotas con Lucía",
  },
];

/**
 * Tarjeta de servicio (docs/design-system.md §6 — patrón "Tarjeta de
 * servicio"): blanca, borde #dce7e3, radio 24, `--shadow-card`; foto 230px
 * object-cover + Badge de categoría (top-left 16) + favorito (círculo blanco
 * 34, top-right 16); cuerpo p-24 con nombre/proveedor/ubicación, divisor,
 * precio + Button Secondary "Ver Detalle" (docs/landing-page.md §6).
 *
 * Interacción: el corazón alterna guardado (relleno) — docs/landing-page.md
 * §6. ⏳ El color del estado activo no está documentado; se usa
 * `--color-accent` (criterio de acento del kit).
 */
function ServiceCard({
  category,
  name,
  provider,
  location,
  price,
  unit,
  image,
  imageAlt,
}: Service) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="overflow-hidden rounded-card-lg border border-border bg-surface shadow-card">
      <div className="relative h-57.5 w-full">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 384px, (min-width: 768px) 33vw, 342px"
          className="object-cover"
        />
        <Badge className="absolute left-4 top-4">{category}</Badge>
        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Quitar ${name} de favoritos`
              : `Guardar ${name} en favoritos`
          }
          onClick={() => setIsFavorite((favorite) => !favorite)}
          className={[
            "absolute right-4 top-4 flex size-8.5 items-center justify-center rounded-full bg-surface transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            isFavorite ? "text-accent" : "text-primary-500 hover:text-primary-700",
          ].join(" ")}
        >
          <Heart
            aria-hidden="true"
            className={["size-4.5", isFavorite ? "fill-current" : ""]
              .filter(Boolean)
              .join(" ")}
          />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-service-name font-bold text-primary-500">{name}</h3>
          {/* ⏳ No hay token de 14px Regular para texto de cuerpo: se reutiliza
              `text-control-sm` (14px Regular) con el color de cuerpo. */}
          <p className="text-control-sm text-body">{provider}</p>
          <p className="flex items-center gap-1 text-support text-secondary">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
            {location}
          </p>
        </div>

        <div className="border-t border-border" />

        {/* Precio + acción justificados; la unidad va siempre debajo del
            precio (en los 3 breakpoints). */}
        <div className="flex items-center justify-between gap-2 md:gap-0 xl:gap-2">
          <p className="flex flex-col items-start">
            <span className="text-price font-bold text-primary-500">{price}</span>
            <span className="text-note text-secondary">{unit}</span>
          </p>
          <Button type="secondary" label="Ver Detalle" />
        </div>
      </div>
    </article>
  );
}

/**
 * Servicios destacados (docs/landing-page.md §6 — nodos D `126:5772` ·
 * T `355:4674` · M `389:6350`): py 80, gap 32; encabezado a la izquierda
 * (botón "Ver todos" oculto en los 3 frames) y 3 tarjetas con gap 24:
 * 3 columnas en Desktop (384px) y Tablet (224px), apiladas en Mobile
 * (342px) (docs/responsive.md §6). Nota de ejemplo bajo el catálogo.
 */
export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="UN BUEN COMIENZO"
            title="Servicios destacados"
            description="Descubre opciones de cuidado cerca de ti y elige la mejor para tu compañero."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>

          <p className="text-note text-secondary">
            Servicios, proveedores y precios de ejemplo. El importe final se
            confirma en el detalle del servicio.
          </p>
        </div>
      </div>
    </section>
  );
}
