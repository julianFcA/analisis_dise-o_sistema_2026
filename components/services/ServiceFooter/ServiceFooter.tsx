const FOOTER_LINKS = ["Privacidad", "Términos de uso", "Ayuda"] as const;

/**
 * Pie discreto del detalle del servicio. El `AppLayout` de la app interna no
 * incluye footer global, así que esta ruta pinta su línea legal.
 */
export default function ServiceFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border pt-5 text-note text-secondary md:flex-row md:items-center md:justify-between">
      <p>© 2026 PetCare. Juntos, por su bienestar.</p>

      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {FOOTER_LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
