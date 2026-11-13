import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Clock3 from "@/components/icons/clock-3";
import { provider } from "@/components/providers/data";

/**
 * Card de reserva (columna derecha): disponibilidad, propuesta, precio desde,
 * CTA principal y tiempo de respuesta habitual.
 *
 * El CTA es visual: no hay reserva, backend ni navegación en esta fase.
 */
export default function ProviderBookingCard() {
  return (
    <section className="flex flex-col gap-4 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6">
      <Badge type="success" showIndicator>
        Disponible para nuevas citas
      </Badge>

      <div className="flex flex-col gap-2">
        <h2 className="text-form-title text-primary-500">
          Su bienestar empieza aquí
        </h2>
        <p className="text-support text-secondary">
          Cuéntanos qué necesita tu mascota y encuentra el mejor momento para su
          visita.
        </p>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-support text-secondary">
          {provider.priceFromLabel}
        </span>
        <span className="text-price font-bold text-primary-500">
          {provider.priceFrom}
        </span>
      </div>

      <Button label="Solicitar Servicio" className="w-full" />

      <p className="flex items-center justify-center gap-1.5 text-center text-note text-secondary">
        <Clock3 aria-hidden="true" className="size-4 shrink-0" />
        {provider.responseTime}
      </p>
    </section>
  );
}
