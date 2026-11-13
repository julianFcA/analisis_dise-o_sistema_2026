import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import ChevronRight from "@/components/icons/chevron-right";
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader/DashboardSectionHeader";
import Footprints from "@/components/icons/footprints";
import Scissors from "@/components/icons/scissors";
import ShieldCheck from "@/components/icons/shield-check";
import Stethoscope from "@/components/icons/stethoscope";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface RecommendedService {
  name: string;
  description: string;
  icon: IconComponent;
  color: string
}

/** Datos estáticos de referencia de esta fase. */
const SERVICES: readonly RecommendedService[] = [
  {
    name: "Consulta veterinaria",
    description: "Atención general y especializada",
    icon: Stethoscope,
    color: 'bg-chip text-primary-600',
  },
  {
    name: "Peluquería",
    description: "Baño, corte y cuidado de pelaje",
    icon: Scissors,
    color: 'bg-accent-warm text-accent-strong'
  },
  {
    name: "Paseos",
    description: "Actividad segura cerca de ti",
    icon: Footprints,
    color: 'bg-blue-soft text-blue-steel'
  },
  {
    name: "Vacunación",
    description: "Protección y control preventivo",
    icon: ShieldCheck,
    color: 'bg-purple-soft text-purple'
  },
];

/**
 * Servicios recomendados (columna izquierda del Dashboard, bajo la agenda):
 * encabezado PARA ELLOS / Servicios recomendados con enlace "Ver todos" y
 * cuadrícula de 2 columnas (1 en Mobile) con el patrón horizontal de
 * categoría del Home: chip de icono + título + descripción + chevron.
 */
export default function RecommendedServices() {
  return (
    <section className="rounded-card-lg border border-border bg-surface p-6 shadow-card">
      <DashboardSectionHeader
        eyebrow="PARA ELLOS"
        title="Servicios recomendados"
        action={
          <a
            href="#"
            className="mt-1 flex shrink-0 items-center gap-1 text-nav font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Ver todos
          </a>
        }
      />

      <ul className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {SERVICES.map(({ name, description, icon: Icon, color }) => (
          <li key={name}>
            <a
              href="#"
              className="flex items-center gap-3 rounded-card border border-border p-4 transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-chip", color)}>
                <Icon aria-hidden="true" className="size-5" />
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-category-title font-bold text-primary-500">
                  {name}
                </p>
                <p className="text-note text-secondary">{description}</p>
              </div>

              <ChevronRight
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-secondary"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
