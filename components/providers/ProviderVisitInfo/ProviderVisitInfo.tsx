import type { ComponentType, SVGProps } from "react";
import CalendarCheck from "@/components/icons/calendar-check";
import Check from "@/components/icons/check";
import MapPin from "@/components/icons/map-pin";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface VisitBenefit {
  title: string;
  description: string;
  icon: IconComponent;
}

/**
 * Beneficios de la visita. El dataset del proveedor no contempla información
 * de acceso: el contenido es de presentación de esta maqueta.
 */
const VISIT_BENEFITS: readonly VisitBenefit[] = [
  {
    icon: MapPin,
    title: "Metro Quevedo",
    description: "Línea 2 · A 6 min a pie",
  },
  {
    icon: Check,
    title: "Acceso adaptado",
    description: "Entrada a pie de calle",
  },
  {
    icon: CalendarCheck,
    title: "Mejor con cita previa",
    description: "Llámanos antes de venir",
  },
];

/**
 * Banner "Una visita sin complicaciones": encabezado a la izquierda y los tres
 * beneficios en fila con divisores desde `xl`; apilado en mobile y tablet.
 */
export default function ProviderVisitInfo() {
  return (
    <section
      aria-labelledby="provider-visit-title"
      className="flex min-w-0 flex-col gap-5 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:flex-row xl:items-center xl:gap-6 xl:px-6"
    >
      <div className="flex flex-col gap-1 xl:w-56 xl:shrink-0">
        <h2
          id="provider-visit-title"
          className="text-nav font-bold text-primary-500"
        >
          Una visita sin complicaciones
        </h2>
        <p className="text-support text-secondary">
          Todo listo antes de salir de casa.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 border-t border-border pt-4 xl:flex-1 xl:grid-cols-3 xl:gap-0 xl:divide-x xl:divide-border xl:border-t-0 xl:pt-0">
        {VISIT_BENEFITS.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="flex gap-3 xl:px-5 xl:first:pl-0 xl:last:pr-0"
          >
            <Icon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-primary-600"
            />

            <div className="flex min-w-0 flex-col gap-0.5">
              <h3 className="text-control-sm font-bold text-body">{title}</h3>
              <p className="text-note text-secondary">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
