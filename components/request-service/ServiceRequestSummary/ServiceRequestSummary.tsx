import Button from "@/components/ui/Button";
import Check from "@/components/icons/check";
import MapPin from "@/components/icons/map-pin";
import ShieldCheck from "@/components/icons/shield-check";
import type { Pet } from "@/lib/pets";
import type { RequestFormStatus } from "@/lib/request-service";
import { formatPrice, type Service } from "@/lib/services";

export interface ServiceRequestSummaryProps {
  status: RequestFormStatus;
  pet?: Pet;
  service: Service;
  /** `Jue, 12 nov 2026 · 10:00` o `null` si falta la selección. */
  dateTimeLabel: string | null;
}

/**
 * Card "Resumen de la solicitud": cabecera en el color primary del sistema y
 * el detalle de la solicitud (mascota, servicio, fecha/hora, proveedor, precio)
 * generado a partir de la selección del formulario.
 *
 * El botón principal es `type="submit"` del `<form>` que envuelve las dos
 * columnas; su estado refleja el envío simulado (`loading` → `submitted`).
 */
export default function ServiceRequestSummary({
  status,
  pet,
  service,
  dateTimeLabel,
}: ServiceRequestSummaryProps) {
  const isSubmitted = status === "submitted";

  return (
    <aside
      aria-labelledby="request-summary-title"
      className="flex min-w-0 flex-col overflow-hidden rounded-card-lg border border-border bg-surface shadow-card"
    >
      <header className="bg-primary-500 px-5 py-4">
        <h2
          id="request-summary-title"
          className="text-form-title font-bold text-surface"
        >
          Resumen de la solicitud
        </h2>
      </header>

      <div className="flex flex-col gap-5 p-5">
        <dl className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <dt className="text-note text-secondary">Mascota</dt>
            <dd className="text-control-sm font-bold text-body">
              {pet ? `${pet.name} · ${pet.breed}` : "Sin seleccionar"}
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="text-note text-secondary">Servicio</dt>
            <dd className="text-control-sm font-bold text-body">
              {service.title}
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="text-note text-secondary">Fecha y hora</dt>
            <dd
              className={
                dateTimeLabel
                  ? "text-control-sm font-bold text-body"
                  : "text-control-sm text-secondary"
              }
            >
              {dateTimeLabel ?? "Sin seleccionar"}
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="text-note text-secondary">Proveedor del servicio</dt>
            <dd className="flex flex-col gap-1">
              <span className="text-control-sm font-bold text-body">
                {service.provider.name}
              </span>

              {service.provider.verified ? (
                <span className="flex items-center gap-1.5 text-note text-primary-600">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-3.5 shrink-0"
                  />
                  Proveedor verificado
                </span>
              ) : null}

              <span className="flex items-center gap-1.5 text-note text-secondary">
                <MapPin
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-primary-600"
                />
                <span className="min-w-0">
                  {service.provider.address} · {service.location}
                </span>
              </span>
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-4">
          <span className="text-control-sm text-body">Total estimado</span>
          <p className="flex flex-wrap items-baseline gap-1">
            <span className="text-price font-bold text-primary-500">
              {formatPrice(service.price)}
            </span>
            <span className="text-note text-secondary">
              / {service.priceUnit}
            </span>
          </p>
        </div>

        <p className="text-note text-secondary">
          IVA incluido. Paga directamente en la clínica. No se realizará ningún
          cargo ahora.
        </p>

        <Button
          submit
          label={isSubmitted ? "Solicitud enviada" : "Solicitar Servicio"}
          state={
            status === "submitting"
              ? "loading"
              : isSubmitted
                ? "disabled"
                : "default"
          }
          rightIcon={
            isSubmitted ? (
              <Check aria-hidden="true" className="size-5" />
            ) : undefined
          }
          className="w-full justify-center"
        />

        <p className="text-center text-note text-secondary">
          Al enviar, aceptas las condiciones del servicio y la política de
          privacidad.
        </p>
      </div>
    </aside>
  );
}
