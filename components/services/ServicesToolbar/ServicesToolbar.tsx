"use client";

import Select from "@/components/ui/Select";
import X from "@/components/icons/x";
import { SORT_OPTIONS, type ServiceSort } from "@/lib/services";

export interface ServicesToolbarProps {
  resultCount: number;
  sort: ServiceSort;
  onSortChange: (sort: ServiceSort) => void;
  /** Término de búsqueda activo (llega desde el Navbar vía `?q=`). */
  query: string;
  onClearQuery: () => void;
}

/**
 * Cabecera del grid: contador dinámico de resultados, término de búsqueda
 * activo y selector de ordenamiento. El orden se aplica sobre el resultado ya
 * filtrado.
 */
export default function ServicesToolbar({
  resultCount,
  sort,
  onSortChange,
  query,
  onClearQuery,
}: ServicesToolbarProps) {
  const sortLabels = SORT_OPTIONS.map((option) => option.label);
  const sortValue =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? sortLabels[0];

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {query ? (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-support text-secondary">
            Resultados para{" "}
            <span className="font-bold text-primary-600">“{query}”</span>
          </p>
          <button
            type="button"
            onClick={onClearQuery}
            aria-label={`Quitar la búsqueda ${query}`}
            className="inline-flex size-6 items-center justify-center rounded-full text-secondary transition-colors hover:bg-chip hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <p aria-live="polite" className="text-control-sm text-secondary">
          <span className="text-service-name font-bold text-ink">
            {resultCount}
          </span>{" "}
          {resultCount === 1 ? "servicio" : "servicios"}
        </p>

        <Select
          label="Ordenar por"
          options={sortLabels}
          value={sortValue}
          onChange={(label) => {
            const option = SORT_OPTIONS.find((item) => item.label === label);
            if (option) onSortChange(option.value);
          }}
          className="w-full sm:w-64"
        />
      </div>
    </div>
  );
}
