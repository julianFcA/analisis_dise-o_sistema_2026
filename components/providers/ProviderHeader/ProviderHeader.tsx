import Link from "next/link";
import ArrowRight from "@/components/icons/arrow-right";

/**
 * Barra superior de acciones de la página de detalle: enlace de vuelta al
 * listado de servicios y acciones visuales Compartir / Guardar.
 *
 * Las acciones no tienen comportamiento real en esta fase (sin Web Share API,
 * favoritos ni persistencia).
 */
export default function ProviderHeader() {
  const actionClasses =
    "text-note font-medium text-secondary transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-note font-bold text-body transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        <ArrowRight aria-hidden="true" className="size-4 rotate-180 text-primary-600" />
        Volver al listado de servicios
      </Link>

      <div className="flex items-center gap-4">
        <button type="button" className={actionClasses}>
          Compartir
        </button>
        <button type="button" className={actionClasses}>
          Guardar
        </button>
      </div>
    </div>
  );
}
