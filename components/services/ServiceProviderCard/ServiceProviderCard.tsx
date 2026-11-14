import Link from "next/link";
import ArrowUpRight from "@/components/icons/arrow-up-right";
import HeartHandshake from "@/components/icons/heart-handshake";
import ShieldCheck from "@/components/icons/shield-check";
import type { ServiceProvider } from "@/lib/services";

export interface ServiceProviderCardProps {
  provider: ServiceProvider;
}

/** `/providers/[id]` usa el slug del proveedor: se deriva de su nombre. */
function providerSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Card "Servicio ofrecido por": chip de icono, nombre del proveedor y enlace a
 * su detalle. La ciudad ya se muestra en la información rápida del servicio.
 */
export default function ServiceProviderCard({
  provider,
}: ServiceProviderCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface-muted p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-emblem bg-surface text-primary-600">
          <HeartHandshake aria-hidden="true" className="size-4.5" />
        </span>

        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-note text-secondary">Servicio ofrecido por</p>
          <p className="flex min-w-0 items-center gap-1.5 text-control-sm font-bold text-body">
            <span className="min-w-0">{provider.name}</span>
            {provider.verified ? (
              <>
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary-600"
                />
                <span className="sr-only">Proveedor verificado</span>
              </>
            ) : null}
          </p>
        </div>
      </div>

      <Link
        href={`/providers/${providerSlug(provider.name)}`}
        className="inline-flex w-fit items-center gap-1 text-note font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        Conocer al proveedor
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </Link>
    </div>
  );
}
