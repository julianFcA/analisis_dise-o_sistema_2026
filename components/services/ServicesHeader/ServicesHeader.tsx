import ShieldCheck from "@/components/icons/shield-check";

/**
 * Encabezado de la página Services: antetítulo, título de página y descripción
 * (patrón SectionHeading) con el bloque de confianza a la derecha.
 *
 * Usa `<h1>` en lugar de `SectionHeading` porque esta es la cabecera de la
 * ruta y debe contener el título principal del documento.
 */
export default function ServicesHeader() {
  return (
    <header className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-eyebrow font-bold uppercase text-primary-600">
          Su bienestar, en buenas manos
        </p>
        <h1 className="text-h2 font-bold text-primary-500">
          Servicios para tu Mascota
        </h1>
        <p className="text-description text-secondary">
          Encuentra profesionales de confianza para cuidar de quien más quieres.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-card xl:max-w-xs">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-chip bg-chip text-primary-600">
          <ShieldCheck aria-hidden="true" className="size-5" />
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="text-nav font-bold text-primary-500">
            Cuidado con tranquilidad
          </p>
          <p className="text-support text-secondary">
            Profesionales verificados por PetCare
          </p>
        </div>
      </div>
    </header>
  );
}
