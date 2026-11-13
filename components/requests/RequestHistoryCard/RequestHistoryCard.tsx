import Button from "@/components/ui/Button";
import Download from "@/components/icons/download";
import Info from "@/components/icons/info";
import RequestFilters from "@/components/requests/RequestFilters/RequestFilters";
import RequestHistoryTable from "@/components/requests/RequestHistoryTable/RequestHistoryTable";
import RequestPagination from "@/components/requests/RequestPagination/RequestPagination";

/**
 * Tarjeta principal del historial: título + indicador informativo, acción de
 * exportación (visual, sin exportación real), filtros, tabla y paginación.
 */
export default function RequestHistoryCard() {
  return (
    <section
      aria-labelledby="request-history-title"
      className="flex min-w-0 flex-col gap-5 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 id="request-history-title" className="text-form-title text-ink">
            Todas las solicitudes
          </h2>
          <span className="inline-flex items-center justify-center rounded-full text-secondary">
            <Info aria-hidden="true" className="size-4" />
            <span className="sr-only">
              Historial completo de tus solicitudes de servicio
            </span>
          </span>
        </div>

        <Button
          type="terciary"
          label="Exportar historial"
          leftIcon={<Download aria-hidden="true" className="size-[18px]" />}
          className="min-h-9 px-2 text-nav font-bold text-primary-600"
        />
      </div>

      <RequestFilters />
      <RequestHistoryTable />
      <RequestPagination />
    </section>
  );
}
