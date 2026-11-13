import ProviderServiceItem from "@/components/providers/ProviderServiceItem/ProviderServiceItem";
import { provider } from "@/components/providers/data";

/**
 * Card "Servicios ofrecidos": título con contador y listado vertical de
 * servicios (lista, no tabla, en todos los breakpoints).
 */
export default function ProviderServices() {
  return (
    <section className="rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-form-title text-ink">Servicios ofrecidos</h2>
        <span className="text-support text-secondary">
          {provider.services.length} servicios
        </span>
      </div>

      <ul className="mt-2 divide-y divide-border">
        {provider.services.map((service) => (
          <ProviderServiceItem key={service.id} service={service} />
        ))}
      </ul>
    </section>
  );
}
