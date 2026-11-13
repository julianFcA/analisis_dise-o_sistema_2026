import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import CalendarDays from "@/components/icons/calendar-days";
import ChevronRight from "@/components/icons/chevron-right";
import ClipboardList from "@/components/icons/clipboard-list";
import PawPrint from "@/components/icons/paw-print";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface Stat {
  value: number;
  label: string;
  icon: IconComponent;
  color: string;
}

/** Datos estáticos de referencia de esta fase (sin backend). */
const STATS: readonly Stat[] = [
  {
    value: 2,
    label: "Mascotas registradas",
    icon: PawPrint,
    color: "bg-chip text-primary-600",
  },
  {
    value: 1,
    label: "Próxima cita",
    icon: CalendarDays,
    color: "bg-accent-warm text-accent-strong",
  },
  {
    value: 2,
    label: "Solicitudes activas",
    icon: ClipboardList,
    color: "bg-blue-soft text-blue-steel",
  },
];

/**
 * Resumen del Dashboard: tres tarjetas con chip de icono, número, etiqueta y
 * chevron, sobre el patrón de tarjeta del design system (blanca, borde
 * `#dce7e3`, radio 16, `--shadow-card`).
 */
export default function DashboardStats() {
  return (
    <section aria-label="Resumen de tu actividad">
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {STATS.map(({ value, label, icon: Icon, color }) => (
          <li key={label}>
            <div className="flex items-center gap-4 rounded-card border border-border bg-surface p-5 shadow-card ">
              <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-chip bg-chip", color)}>
                <Icon aria-hidden="true" className="size-6"/>
              </span>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-price font-bold leading-none text-primary-500">
                  {value}
                </span>
                <span className="text-support text-secondary">{label}</span>
              </div>

              <ChevronRight
                aria-hidden="true"
                className="ml-auto size-4 shrink-0 text-secondary"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
