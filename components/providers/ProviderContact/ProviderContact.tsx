import Mail from "@/components/icons/mail";
import Phone from "@/components/icons/phone";
import { provider } from "@/components/providers/data";

/**
 * Card "También estamos aquí": teléfono, correo y redes sociales como
 * acciones visuales (sin integraciones reales en esta fase).
 */
export default function ProviderContact() {
  const channelClasses =
    "flex items-center gap-3 py-3 text-control-sm transition-colors hover:text-primary-500";

  return (
    <section className="rounded-card-lg border border-border bg-surface p-5 shadow-card">
      <h2 className="text-nav font-bold text-ink">También estamos aquí</h2>
      <p className="mt-1 text-note text-secondary">{provider.name}</p>

      <ul className="mt-4 divide-y divide-border">
        <li>
          <a href={`tel:${provider.phone.replace(/\s/g, "")}`} className={channelClasses}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-primary-600">
              <Phone aria-hidden="true" className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-note text-secondary">Teléfono</span>
              <span className="font-bold text-primary-500">{provider.phone}</span>
            </span>
          </a>
        </li>

        <li>
          <a href={`mailto:${provider.email}`} className={channelClasses}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-primary-600">
              <Mail aria-hidden="true" className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-note text-secondary">Correo electrónico</span>
              <span className="break-words font-bold text-primary-500">
                {provider.email}
              </span>
            </span>
          </a>
        </li>
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-note text-secondary">Síguenos en redes</span>
        <ul className="flex items-center gap-1">
          {provider.socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="flex size-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-chip hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
