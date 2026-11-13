import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import CalendarDays from "@/components/icons/calendar-days";
import ClipboardList from "@/components/icons/clipboard-list";
import PawPrint from "@/components/icons/paw-print";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface PetStat {
  label: string;
  value: string;
  description: string;
  icon: IconComponent;
  /** Chip del icono: verde del sistema o acento cálido para la cita. */
  tone: "primary" | "accent";
}

/** Datos estáticos de referencia de esta fase (sin backend). */
const PET_STATS: readonly PetStat[] = [
  {
    label: "Total de mascotas registradas",
    value: "3",
    description: "Toda tu familia, en un solo lugar",
    icon: PawPrint,
    tone: "primary",
  },
  {
    label: "Solicitudes activas",
    value: "2",
    description: "Luna confirmada · Milo pendiente",
    icon: ClipboardList,
    tone: "primary",
  },
  {
    label: "Próxima cita",
    value: "09 nov · 10:30",
    description: "Luna · Revisión veterinaria",
    icon: CalendarDays,
    tone: "accent",
  },
];

const TONE_CLASSES: Record<PetStat["tone"], string> = {
  primary: "bg-chip text-primary-600",
  accent: "bg-accent-warm text-accent-strong",
};

/**
 * Resumen de la página Mis Mascotas: tres tarjetas horizontales con etiqueta,
 * valor, descripción y chip de icono a la derecha.
 *
 * Reutiliza el patrón de tarjeta del design system (blanca, borde
 * `#dce7e3`, radio 16, `--shadow-card`). En tablet se resuelve en dos
 * columnas y la tercera tarjeta ocupa la fila completa para conservar la
 * legibilidad; en desktop vuelven a tres columnas.
 */
export default function MyPetsStats() {
  return (
    <section aria-label="Resumen de tus mascotas">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
        {PET_STATS.map(({ label, value, description, icon: Icon, tone }, index) => (
          <li
            key={label}
            className={cn(index === 2 && "md:col-span-2 xl:col-span-1")}
          >
            <article className="flex h-full items-start justify-between gap-4 rounded-card border border-border bg-surface p-5 shadow-card">
              <div className="flex min-w-0 flex-col gap-1.5">
                <p className="text-note text-secondary">{label}</p>
                <p className="text-price font-bold leading-tight text-primary-500">
                  {value}
                </p>
                <p className="text-note text-secondary">{description}</p>
              </div>

              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-chip",
                  TONE_CLASSES[tone],
                )}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
