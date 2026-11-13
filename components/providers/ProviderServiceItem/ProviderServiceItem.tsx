import ChevronRight from "@/components/icons/chevron-right";
import type { ProviderService } from "@/components/providers/data";

export interface ProviderServiceItemProps {
  service: ProviderService;
}

/**
 * Fila de servicio: chip de icono, nombre + duración y precio, con chevron
 * preparado para una futura página de detalle/reserva.
 */
export default function ProviderServiceItem({ service }: ProviderServiceItemProps) {
  const { name, description, price, icon: Icon } = service;

  return (
    <li>
      <button
        type="button"
        aria-label={`${name} · ${price}`}
        className="flex w-full items-center gap-3 rounded-input py-4 text-left transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:gap-4 md:px-2"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-chip bg-chip text-primary-600">
          <Icon aria-hidden="true" className="size-5" />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-control-sm font-bold text-ink">{name}</span>
          <span className="text-note text-secondary">{description}</span>
        </span>

        <span className="shrink-0 text-control-sm font-bold whitespace-nowrap text-primary-500">
          {price}
        </span>

        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-secondary" />
      </button>
    </li>
  );
}
