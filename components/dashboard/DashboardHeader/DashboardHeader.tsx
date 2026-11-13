/**
 * Bienvenida del Dashboard: antetítulo + saludo + descripción, con la
 * jerarquía tipográfica del design system (eyebrow / H2 / descripción).
 *
 * Usa `<h1>` (es el título de la página) reutilizando los tokens de
 * `SectionHeading`; el componente del UI Kit fija `<h2>`, reservado para
 * encabezados de sección del Landing.
 */
export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-3">
      <p className="text-eyebrow font-bold uppercase text-primary-600">
        MI ESPACIO PETCARE
      </p>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2 text-ink">Hola, Andrea</h1>
        <p className="text-description text-secondary">
          Todo lo que necesitan tus mascotas, en un solo lugar.
        </p>
      </div>
    </header>
  );
}
