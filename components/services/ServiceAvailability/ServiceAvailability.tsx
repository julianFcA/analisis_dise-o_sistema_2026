import CalendarCheck from "@/components/icons/calendar-check";

/**
 * Bloque informativo "Flexibilidad para ti". No representa disponibilidad real
 * del proveedor: el horario se acuerda después de la solicitud.
 */
export default function ServiceAvailability() {
  return (
    <section
      aria-labelledby="service-availability-title"
      className="flex gap-3 rounded-card border border-border p-4"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-emblem bg-chip text-primary-600">
        <CalendarCheck aria-hidden="true" className="size-4.5" />
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <h2
          id="service-availability-title"
          className="text-control-sm font-bold text-primary-500"
        >
          Flexibilidad para ti
        </h2>
        <p className="text-note text-secondary">
          Elige el horario con la clínica después de tu compra.
        </p>
        <p className="text-note text-secondary">
          Cambios o cancelaciones sin coste hasta 24 h antes.
        </p>
      </div>
    </section>
  );
}
