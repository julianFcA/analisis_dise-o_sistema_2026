import ChevronRight from "@/components/icons/chevron-right";
import RequestStatus from "@/components/requests/RequestStatus/RequestStatus";
import { requests, type PetServiceRequest } from "@/components/requests/data";

const COLUMNS = [
  { key: "service", label: "Servicio" },
  { key: "pet", label: "Mascota" },
  { key: "date", label: "Fecha" },
  { key: "time", label: "Hora" },
  { key: "provider", label: "Proveedor" },
  { key: "status", label: "Estado" },
] as const;

/**
 * Tabla del historial de solicitudes. En Tablet/Mobile la tabla conserva su
 * composición y se desplaza horizontalmente **dentro** de su contenedor, para
 * no generar overflow en la página (docs/responsive.md).
 */
export default function RequestHistoryTable() {
  return (
    /* `relative`: contiene los elementos visualmente ocultos (`sr-only`) de la
       tabla, que de otro modo escapan del scroll y ensanchan la página. */
    <div className="relative -mx-5 overflow-x-auto px-5 xl:-mx-6 xl:px-6">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">
          Solicitudes de servicio registradas
        </caption>

        <thead>
          <tr className="bg-surface-muted">
            {COLUMNS.map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className="px-3 py-3 text-note font-bold text-secondary first:rounded-l-input first:pl-4 last:pr-4"
              >
                {label}
              </th>
            ))}
            {/* Columna del indicador de detalle (sin encabezado visible). */}
            <th scope="col" className="px-3 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {requests.map((request) => (
            <RequestRow key={request.id} request={request} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface RequestRowProps {
  request: PetServiceRequest;
}

function RequestRow({ request }: RequestRowProps) {
  return (
    <tr className="transition-colors hover:bg-surface-muted">
      <th scope="row" className="px-3 py-4 pl-4 text-left text-control-sm font-bold text-ink">
        {request.service}
      </th>
      <td className="px-3 py-4 text-control-sm text-body">{request.pet}</td>
      <td className="px-3 py-4 text-control-sm text-body">{request.date}</td>
      <td className="px-3 py-4 text-control-sm text-body">{request.time}</td>
      <td className="px-3 py-4 text-control-sm text-body">{request.provider}</td>
      <td className="px-3 py-4">
        <RequestStatus status={request.status} />
      </td>
      <td className="px-3 py-4 pr-4 text-right">
        <button
          type="button"
          aria-label={`Ver detalle de ${request.service} para ${request.pet}`}
          className="inline-flex size-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-chip hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </td>
    </tr>
  );
}
