import Link from "next/link";
import ChevronRight from "@/components/icons/chevron-right";

export interface ServiceBreadcrumbProps {
  /** Título del servicio actual (último elemento, no enlazado). */
  serviceTitle: string;
}

/**
 * Breadcrumb del detalle: Inicio › Servicios › servicio actual. El último
 * elemento se marca con `aria-current="page"`.
 */
export default function ServiceBreadcrumb({
  serviceTitle,
}: ServiceBreadcrumbProps) {
  const linkClasses =
    "text-secondary transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

  return (
    <nav aria-label="Ruta de navegación" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-support">
        <li>
          <Link href="/" className={linkClasses}>
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5 text-secondary" />
        </li>
        <li>
          <Link href="/services" className={linkClasses}>
            Servicios
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5 text-secondary" />
        </li>
        <li
          aria-current="page"
          className="min-w-0 truncate font-bold text-primary-500"
        >
          {serviceTitle}
        </li>
      </ol>
    </nav>
  );
}
