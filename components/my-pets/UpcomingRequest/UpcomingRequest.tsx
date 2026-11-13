import Badge from "@/components/ui/Badge";
import ArrowRight from "@/components/icons/arrow-right";

/**
 * Próxima solicitud confirmada: fecha en bloque, servicio y estado, detalle
 * de la cita y enlace para ver la solicitud.
 *
 * Solo presentación: el enlace queda preparado para futuras rutas del flujo de
 * solicitudes. En mobile el contenido se apila en vertical.
 */
export default function UpcomingRequest() {
  return (
    <article className="flex h-full flex-col gap-4 rounded-card border border-border bg-surface p-4 shadow-card md:flex-row md:items-center md:gap-5 xl:p-5">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-input border border-border bg-surface px-2 py-2">
        <span className="text-badge font-bold uppercase text-accent-strong">
          NOV
        </span>
        <span className="text-price font-bold leading-none text-primary-500">
          09
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-control-sm font-bold text-ink">
            Revisión veterinaria de Luna
          </h2>
          <Badge type="success">Confirmada</Badge>
        </div>
        <p className="text-note text-secondary">
          Lunes, 9 de noviembre · 10:30 h · Clínica VetVida
        </p>
      </div>

      <a
        href="#"
        className="flex shrink-0 items-center gap-2 self-end text-label font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:self-auto"
      >
        Ver solicitud
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </article>
  );
}
