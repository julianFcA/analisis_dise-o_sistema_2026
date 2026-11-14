import Button from "@/components/ui/Button";
import Clock3 from "@/components/icons/clock-3";
import MapPin from "@/components/icons/map-pin";
import ShieldCheck from "@/components/icons/shield-check";
import Star from "@/components/icons/star";
import ServiceProviderCard from "@/components/services/ServiceProviderCard/ServiceProviderCard";
import ServiceAvailability from "@/components/services/ServiceAvailability/ServiceAvailability";
import { formatServiceDuration, type Service } from "@/lib/services";

export interface ServiceInfoProps {
  service: Service;
}

/**
 * Columna derecha del detalle: categoría, título, valoración, descripción
 * larga, información rápida (duración y ciudad), proveedor, disponibilidad y
 * CTA hacia Solicitar Servicio con el servicio en el flujo (`?service=`).
 */
export default function ServiceInfo({ service }: ServiceInfoProps) {
  const duration = formatServiceDuration(service.description);
  const rating = service.rating.toString().replace(".", ",");

  return (
    <section
      aria-labelledby="service-detail-title"
      className="flex min-w-0 flex-col gap-5 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-1.5 text-eyebrow font-bold uppercase text-primary-600">
          <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0" />
          {service.category}
        </p>

        <h1
          id="service-detail-title"
          className="text-h2 font-bold text-primary-500"
        >
          {service.title}
        </h1>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Star
            aria-hidden="true"
            className="size-4 shrink-0 fill-accent text-accent"
          />
          <span className="text-control-sm font-bold text-body">{rating}</span>
          <span className="text-support text-secondary">
            {service.reviewCount} reseñas verificadas
          </span>
        </p>

        <p className="text-description text-secondary">{service.details}</p>
      </div>

      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {duration ? (
          <li className="flex items-center gap-1.5 text-note text-secondary">
            <Clock3
              aria-hidden="true"
              className="size-4 shrink-0 text-primary-600"
            />
            {duration}
          </li>
        ) : null}

        <li className="flex items-center gap-1.5 text-note text-secondary">
          <MapPin
            aria-hidden="true"
            className="size-4 shrink-0 text-primary-600"
          />
          {service.location}
        </li>
      </ul>

      <ServiceProviderCard provider={service.provider} />

      <ServiceAvailability />

      <Button
        href={`/services/request?service=${service.id}`}
        label="Solicitar Servicio"
        className="w-full justify-center"
      />
    </section>
  );
}
