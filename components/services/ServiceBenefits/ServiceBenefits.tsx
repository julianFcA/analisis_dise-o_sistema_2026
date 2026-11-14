import type { ComponentType, SVGProps } from "react";
import HeartHandshake from "@/components/icons/heart-handshake";
import Info from "@/components/icons/info";
import Stethoscope from "@/components/icons/stethoscope";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface ServiceBenefit {
  title: string;
  description: string;
  icon: IconComponent;
}

/**
 * Beneficios de presentación del detalle. El dataset no contempla beneficios
 * por servicio (`docs/architecture.md` §5): se mantiene aquí el contenido de
 * referencia del diseño, sin alterar el JSON.
 */
const BENEFITS: readonly ServiceBenefit[] = [
  {
    icon: Stethoscope,
    title: "Revisión completa",
    description:
      "Exploración física y valoración de su estado de salud.",
  },
  {
    icon: HeartHandshake,
    title: "Plan personalizado",
    description:
      "Consejos de alimentación, prevención y próximos cuidados.",
  },
];

/**
 * Card "Todo lo que necesita para estar bien": beneficios en chip + icono y
 * una nota de recomendación previa a la visita.
 */
export default function ServiceBenefits() {
  return (
    <section
      aria-labelledby="service-benefits-title"
      className="flex min-w-0 flex-col gap-5 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <h2
        id="service-benefits-title"
        className="text-form-title font-bold text-primary-500"
      >
        Todo lo que necesita para estar bien
      </h2>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-chip bg-chip text-primary-600">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <h3 className="text-control-sm font-bold text-body">{title}</h3>
              <p className="text-support text-secondary">{description}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="flex items-start gap-2 border-t border-border pt-4 text-note text-secondary">
        <Info
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-primary-600"
        />
        Trae su cartilla sanitaria y cuéntanos qué te preocupa. Nosotros nos
        encargamos del resto.
      </p>
    </section>
  );
}
