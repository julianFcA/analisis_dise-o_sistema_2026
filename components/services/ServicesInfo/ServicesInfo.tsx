import Info from "@/components/icons/info";
import ShieldCheck from "@/components/icons/shield-check";

/**
 * Información inferior de la página: confianza del catálogo y nota sobre los
 * precios (patrón de nota del catálogo del Home).
 */
export default function ServicesInfo() {
  return (
    <section
      aria-label="Información sobre los servicios"
      className="flex flex-col gap-4 rounded-card-lg border border-border bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-chip bg-chip text-primary-600">
          <ShieldCheck aria-hidden="true" className="size-5" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-control-sm font-bold text-primary-500">
            Cuidado verificado de principio a fin
          </h2>
          <p className="text-support text-secondary">
            Cada proveedor pasa por una revisión de identidad y de experiencia
            antes de publicar sus servicios.
          </p>
        </div>
      </div>

      <p className="flex items-start gap-2 text-note text-secondary sm:max-w-xs">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-600" />
        Los precios son orientativos y pueden variar según la mascota y el
        proveedor.
      </p>
    </section>
  );
}
