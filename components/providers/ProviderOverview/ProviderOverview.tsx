import Image from "next/image";
import Badge from "@/components/ui/Badge";
import MapPin from "@/components/icons/map-pin";
import Star from "@/components/icons/star";
import { provider } from "@/components/providers/data";

/**
 * Hero del proveedor: imagen, badge de verificación, categoría, nombre,
 * valoración, ubicación, descripción y estadísticas.
 *
 * Patrón de tarjeta del design system (blanca, borde `#dce7e3`, radio 24,
 * `--shadow-card`) con la imagen a sangre en la cabecera.
 */
export default function ProviderOverview() {
  return (
    <section className="overflow-hidden rounded-card-lg border border-border bg-surface shadow-card">
      <div className="relative aspect-2/1 w-full bg-chip">
        <Image
          src={provider.image.src}
          alt={provider.image.alt}
          fill
          preload
          sizes="(min-width: 1280px) 680px, (min-width: 768px) 80vw, 100vw"
          className="object-cover"
        />
        <Badge
          type="success"
          showIndicator
          className="absolute left-4 top-4 xl:left-6 xl:top-6"
        >
          Proveedor verificado
        </Badge>
      </div>

      <div className="flex flex-col gap-5 p-5 xl:p-6">
        <div className="flex flex-col gap-2">
          <p className="text-eyebrow font-bold uppercase text-primary-600">
            {provider.category}
          </p>
          <h1 className="text-h2 text-primary-500">{provider.name}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-support text-secondary">
          <span className="flex items-center gap-1.5">
            <Star aria-hidden="true" className="size-4 fill-accent text-accent" />
            <span className="font-bold text-body">{provider.rating}</span>
            <span>({provider.reviewCount} reseñas)</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-4 text-secondary" />
            {provider.location}
          </span>
        </div>

        <p className="text-control-sm text-secondary">{provider.description}</p>

        <ul className="grid grid-cols-3 gap-3 border-t border-border pt-5">
          {provider.stats.map(({ value, label }) => (
            <li key={label} className="flex min-w-0 flex-col gap-1">
              <span className="text-price font-bold leading-none text-primary-500">
                {value}
              </span>
              <span className="text-note text-secondary">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
