import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import Check from "@/components/icons/check";
import ClipboardList from "@/components/icons/clipboard-list";
import Clock3 from "@/components/icons/clock-3";
import { requests } from "@/components/requests/data";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface RequestStat {
  title: string;
  value: number;
  description: string;
  icon: IconComponent;
  /** Chip de icono: color semántico del estado (tokens del design system). */
  tone: string;
}

const TOTAL = requests.length;
const PENDING = requests.filter(({ status }) => status === "pending").length;
const APPROVED = requests.filter(({ status }) => status === "approved").length;

const STATS: readonly RequestStat[] = [
  {
    title: "Solicitudes Totales",
    value: TOTAL,
    description: "Total histórico de solicitudes",
    icon: ClipboardList,
    tone: "bg-chip text-primary-600",
  },
  {
    title: "Pendientes",
    value: PENDING,
    description: "Esperando al proveedor",
    icon: Clock3,
    tone: "bg-accent-warm text-accent-strong",
  },
  {
    title: "Aprobadas",
    value: APPROVED,
    description: "Confirmadas por el proveedor",
    icon: Check,
    tone: "bg-chip text-primary-600",
  },
];

/**
 * Tres tarjetas de estadísticas del historial (patrón de tarjeta del design
 * system: blanca, borde `#dce7e3`, radio 16, `--shadow-card`): título, valor,
 * descripción y chip de icono con el color semántico de cada estado.
 */
export default function RequestStats() {
  return (
    <section aria-label="Resumen de solicitudes">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STATS.map(({ title, value, description, icon: Icon, tone }) => (
          <li
            key={title}
            className="flex items-start justify-between gap-4 rounded-card border border-border bg-surface p-5 shadow-card"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-support font-bold text-ink">{title}</p>
              <span className="text-price font-bold leading-none text-primary-500">
                {value}
              </span>
              <p className="text-note text-secondary">{description}</p>
            </div>

            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-chip",
                tone,
              )}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
