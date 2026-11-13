import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Heart from "@/components/icons/heart";
import MapPin from "@/components/icons/map-pin";
import ShieldCheck from "@/components/icons/shield-check";
import Star from "@/components/icons/star";
import { formatDistance, formatPrice, type Service } from "@/lib/services";

export interface ServiceCardProps {
  service: Service;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}

/**
 * Tarjeta de servicio del catálogo. Todo el contenido viene del objeto del
 * servicio (`data/services.json`); el favorito es un estado local de la card
 * gestionado por `ServicesExplorer`.
 */
export default function ServiceCard({
  service,
  favorite,
  onToggleFavorite,
}: ServiceCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-card-lg border border-border bg-surface shadow-card transition-shadow hover:shadow-float">
      <div className="relative h-44 w-full overflow-hidden bg-surface-muted">
        <Image
          src={service.image}
          alt={`${service.title} · ${service.provider.name}`}
          fill
          sizes="(min-width: 1536px) 30vw, (min-width: 1280px) 45vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <Badge>{service.category}</Badge>

          <button
            type="button"
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Quitar ${service.title} de favoritos`
                : `Guardar ${service.title} en favoritos`
            }
            onClick={() => onToggleFavorite(service.id)}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-secondary shadow-card transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <Heart
              aria-hidden="true"
              className={
                favorite
                  ? "size-[18px] fill-accent text-accent"
                  : "size-[18px]"
              }
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-service-name font-bold text-primary-500">
            {service.title}
          </h3>
          <p className="text-control-sm text-secondary">{service.description}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 text-control-sm text-body">
            <span className="min-w-0 truncate">{service.provider.name}</span>
            {service.provider.verified ? (
              <>
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary-600"
                />
                <span className="sr-only">Proveedor verificado</span>
              </>
            ) : null}
          </p>

          <p className="flex items-center gap-1.5 text-support text-secondary">
            <MapPin
              aria-hidden="true"
              className="size-4 shrink-0 text-primary-600"
            />
            <span className="min-w-0 truncate">
              {service.location} · a {formatDistance(service.distanceKm)}
            </span>
          </p>

          <p className="flex items-center gap-1 text-support">
            <Star
              aria-hidden="true"
              className="size-3.5 shrink-0 fill-accent text-accent"
            />
            <span className="font-bold text-body">
              {service.rating.toString().replace(".", ",")}
            </span>
            <span className="text-secondary">({service.reviewCount})</span>
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-3">
          <p className="flex flex-wrap items-baseline gap-x-1">
            <span className="text-note text-secondary">Desde</span>
            <span className="text-price font-bold text-primary-500">
              {formatPrice(service.price)}
            </span>
            <span className="text-note text-secondary">
              / {service.priceUnit}
            </span>
          </p>

          <Button type="secondary" label="Ver Detalles" className="w-full" />
        </div>
      </div>
    </article>
  );
}
