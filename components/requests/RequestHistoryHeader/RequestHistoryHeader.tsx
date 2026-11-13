/**
 * Encabezado de la página de solicitudes: título `<h1>` y descripción con la
 * jerarquía tipográfica del design system (H2 + descripción, igual que el
 * encabezado del Dashboard).
 */
export default function RequestHistoryHeader() {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-h2 text-ink">Historial de Solicitudes</h1>
      <p className="text-description text-secondary">
        Consulta y da seguimiento a todas tus solicitudes de tus mascotas.
      </p>
    </header>
  );
}
