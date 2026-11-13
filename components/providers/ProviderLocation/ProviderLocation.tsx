import ArrowUpRight from "@/components/icons/arrow-up-right";
import MapPin from "@/components/icons/map-pin";
import { provider } from "@/components/providers/data";

/**
 * Card "Ven a conocernos": dirección y acción visual "Cómo llegar" (sin
 * mapas externos en esta fase).
 */
export default function ProviderLocation() {
  return (
    <section className="rounded-card-lg border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2">
        <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary-600" />
        <h2 className="text-nav font-bold text-ink">Ven a conocernos</h2>
      </div>

      <address className="mt-4 flex flex-col gap-0.5 text-control-sm not-italic text-secondary">
        {provider.address.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </address>

      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1.5 text-note font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        Cómo llegar
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </button>
    </section>
  );
}
