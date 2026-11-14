import type { ComponentType, ReactNode, SVGProps } from "react";
import Badge from "@/components/ui/Badge";
import Clock3 from "@/components/icons/clock-3";
import HeartHandshake from "@/components/icons/heart-handshake";
import HouseHeart from "@/components/icons/house-heart";
import Mail from "@/components/icons/mail";
import MapPin from "@/components/icons/map-pin";
import Phone from "@/components/icons/phone";
import ShieldCheck from "@/components/icons/shield-check";
import { provider } from "@/components/providers/data";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface ContactRowProps {
  icon: IconComponent;
  label: string;
  children: ReactNode;
}

/** Fila del bloque de contacto: chip de icono + etiqueta pequeña + valor. */
function ContactRow({ icon: Icon, label, children }: ContactRowProps) {
  return (
    <div className="flex gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-emblem bg-chip text-primary-600">
        <Icon aria-hidden="true" className="size-4.5" />
      </span>

      <div className="flex min-w-0 flex-col gap-0.5">
        <dt className="text-note text-secondary">{label}</dt>
        <dd className="flex min-w-0 flex-col gap-0.5 text-control-sm text-body">
          {children}
        </dd>
      </div>
    </div>
  );
}

/**
 * Card "Información del proveedor" de la página de dirección: identidad
 * (categoría, verificación, nombre y lema) y datos de contacto del dataset
 * (`components/providers/data.ts`).
 */
export default function ProviderAddressCard() {
  return (
    <section
      aria-labelledby="provider-address-title"
      className="flex min-w-0 flex-col gap-5 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-emblem bg-chip text-primary-600">
            <HeartHandshake aria-hidden="true" className="size-5" />
          </span>

          <div className="flex min-w-0 flex-col gap-2 pt-0.5">
            <p className="text-eyebrow font-bold uppercase text-primary-600">
              {provider.categoryLabel}
            </p>

            {provider.verified ? (
              <Badge type="success">
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                Proveedor verificado
              </Badge>
            ) : null}
          </div>
        </div>

        <h2
          id="provider-address-title"
          className="text-service-name font-bold text-primary-500"
        >
          {provider.name}
        </h2>

        <p className="text-support text-secondary">{provider.tagline}</p>
      </div>

      <dl className="flex flex-col gap-4 border-t border-border pt-5">
        <ContactRow icon={MapPin} label="Dirección completa">
          <span className="font-bold">{provider.address[0]}</span>
          <span className="text-secondary">{provider.address[1]}</span>
        </ContactRow>

        <ContactRow icon={HouseHeart} label="Ciudad">
          <span className="font-bold">{provider.location}</span>
        </ContactRow>

        <ContactRow icon={Phone} label="Teléfono">
          <a
            href={`tel:${provider.phone.replace(/\s/g, "")}`}
            className="w-fit font-bold transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {provider.phone}
          </a>
        </ContactRow>

        <ContactRow icon={Mail} label="Correo electrónico">
          <a
            href={`mailto:${provider.email}`}
            className="w-fit break-words font-bold transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {provider.email}
          </a>
        </ContactRow>

        <ContactRow icon={Clock3} label="Horarios de atención">
          {provider.openingHours.map(({ days, hours }) => (
            <span key={days} className="flex flex-wrap gap-x-1.5">
              <span className="text-secondary">{days}</span>
              <span aria-hidden="true" className="text-secondary">
                ·
              </span>
              <span className="font-bold">{hours}</span>
            </span>
          ))}
        </ContactRow>
      </dl>
    </section>
  );
}
