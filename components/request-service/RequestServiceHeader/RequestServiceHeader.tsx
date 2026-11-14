/**
 * Encabezado de la ruta Solicitar Servicio: antetítulo, `<h1>` y descripción
 * (patrón SectionHeading del design system).
 */

export default function RequestServiceHeader() {
  return (
    <header className="flex flex-col gap-3">
      <p className="text-eyebrow font-bold uppercase text-primary-600">
        Nueva solicitud
      </p>
      <h1 className="text-h2 font-bold text-primary-500">Solicitar Servicio</h1>
      <p className="max-w-2xl text-description text-secondary">
        Elige el cuidado que necesita tu mascota. Nosotros te ayudamos con el
        resto.
      </p>
    </header>
  );
}
