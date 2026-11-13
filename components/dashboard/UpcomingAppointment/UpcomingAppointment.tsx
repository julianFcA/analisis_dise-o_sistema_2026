import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Clock3 from "@/components/icons/clock-3";
import MapPin from "@/components/icons/map-pin";
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader/DashboardSectionHeader";

/**
 * Próxima cita (columna izquierda del Dashboard): encabezado AGENDA /
 * Próxima cita con enlace "Ver agenda" y tarjeta grande de la cita.
 *
 * Composición: bloque de fecha a la izquierda y detalle a la derecha
 * (servicio + estado, descripción, divisor y pie con hora, ubicación y
 * profesional). En Mobile se apila el bloque de fecha sobre el detalle.
 *
 * Datos estáticos de referencia: no hay lógica de agenda ni acciones reales.
 */
export default function UpcomingAppointment() {
  return (
    <section className="rounded-card-lg border border-border bg-surface p-6 shadow-card">
      <DashboardSectionHeader
        eyebrow="AGENDA"
        title="Próxima cita"
        action={
          <a
            href="#"
            className="mt-1 flex shrink-0 items-center gap-1 text-nav font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Ver agenda
          </a>
        }
      />

      <article className="mt-5 flex flex-col justify-center rounded-card  bg-surface-muted p-4 lg:p-6 md:flex-row lg:gap-6">
        {/* Fecha de la cita. */}
        <div className="flex shrink-0 flex-col items-center justify-center gap-1 rounded-card border border-gray-200 bg-white px-8">
          <span className="text-badge font-bold uppercase text-primary-600">
            JUN
          </span>
          <span className="text-price font-bold leading-none text-primary-500">
            18
          </span>
          <span className="text-note text-secondary">Martes</span>
        </div>

        <div className="flex min-w-0 flex-1 lg:gap-4 justify-between">
          <div className="flex flex-col flex-wrap items-start justify-between p-4 lg:gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <Badge type="success" showIndicator>Confirmada</Badge>
              <h3 className="text-sm  font-bold text-ink">
                Consulta veterinaria general
              </h3>
              <p className="text-support text-secondary">
                Control preventivo para Milo
              </p>
            </div>

            <div className="flex lg:flex-wrap items-center gap-2 lg:gap-x-5 lg:gap-y-2 text-support text-secondary">
              <span className="flex items-center gap-2">
                <Clock3
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary-600"
                />
                10:30 – 11:15
              </span>
              <span className="flex items-center gap-2">
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary-600"
                />
                Clínica PetCare Norte
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between md:gap-4 lg:px-8">
          <div className="h-full w-px bg-border hidden lg:block" />
            <div className="flex flex-col lg:flex-row justify-center items-center gap-3 ">
              <Avatar size={40} initials="LC" />
              <div className="flex min-w-0 flex-col">
                <p className="text-support font-bold text-primary-500">
                  Dra. Laura C.
                </p>
                <p className="text-note text-secondary">Medicina general</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
