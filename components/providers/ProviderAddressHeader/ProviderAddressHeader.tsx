import Badge from "@/components/ui/Badge";
import MapPin from "@/components/icons/map-pin";

/**
 * Cabecera de la página de dirección: título, descripción y sello "Cerca de tu
 * mascota" a la derecha desde `md`.
 */
export default function ProviderAddressHeader() {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex min-w-0 max-w-2xl flex-col gap-2">
        <h1 className="text-h2 font-bold text-primary-500">
          Dirección del Proveedor
        </h1>

        <p className="text-description text-secondary">
          Encuentra a tu equipo de confianza. Estamos más cerca de lo que
          imaginas.
        </p>
      </div>

      <Badge type="success" className="md:mt-1">
        <MapPin aria-hidden="true" className="size-3.5" />
        Cerca de tu mascota
      </Badge>
    </header>
  );
}
