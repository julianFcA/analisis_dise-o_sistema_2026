import Clock3 from "@/components/icons/clock-3";
import { provider } from "@/components/providers/data";

/**
 * Card "Horarios de atención": filas día/rango con la nota de cita previa.
 */
export default function ProviderHours() {
  return (
    <section className="rounded-card-lg border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2">
        <Clock3 aria-hidden="true" className="size-4 shrink-0 text-primary-600" />
        <h2 className="text-nav font-bold text-ink">Horarios de atención</h2>
      </div>

      <dl className="mt-4 flex flex-col gap-3">
        {provider.openingHours.map(({ days, hours }) => (
          <div
            key={days}
            className="flex items-center justify-between gap-4 text-control-sm"
          >
            <dt className="text-secondary">{days}</dt>
            <dd className="font-bold whitespace-nowrap text-ink">{hours}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 border-t border-border pt-3 text-note text-secondary">
        {provider.openingHoursNote}
      </p>
    </section>
  );
}
