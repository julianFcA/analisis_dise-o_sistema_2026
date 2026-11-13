/**
 * Pie discreto de la página de detalle del proveedor. El `AppLayout` de la
 * app interna no incluye footer global, así que esta ruta pinta solo su línea
 * legal.
 */
export default function ProviderFooter() {
  return (
    <footer className="border-t border-border pt-4">
      <p className="text-note text-secondary">
        © 2026 PetCare. Juntos, por su bienestar.
      </p>
    </footer>
  );
}
