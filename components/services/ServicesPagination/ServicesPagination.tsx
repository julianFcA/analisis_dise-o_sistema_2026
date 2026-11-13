"use client";

import ChevronRight from "@/components/icons/chevron-right";
import { cn } from "@/lib/cn";
import { SERVICES_PAGE_SIZE } from "@/lib/services";

export interface ServicesPaginationProps {
  page: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

/* Anatomía del Button del UI Kit (min-h 40, radio 9, borde 0.8, texto Medium).
   Se declara localmente porque la paginación necesita `aria-current` en el
   número de página activo, que el Button compartido no expone. */
const PAGE_BUTTON_CLASSES = [
  "inline-flex size-9 items-center justify-center rounded-button border-[0.8px] text-control font-medium",
  "transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const IDLE_CLASSES =
  "border-border-button bg-surface text-primary-700 hover:bg-surface-muted";
const ACTIVE_CLASSES =
  "border-primary-500 bg-primary-500 text-surface shadow-button";

/** Ventana de páginas: primera, última y el entorno de la actual. */
function getPageItems(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | "gap"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("gap");
  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    items.push(pageNumber);
  }
  if (end < total - 1) items.push("gap");
  items.push(total);

  return items;
}

/**
 * Paginación del catálogo: se calcula desde `filteredServices.length`
 * (recibido como `totalItems`) y conserva filtros y ordenamiento activos
 * porque solo cambia la página visible.
 */
export default function ServicesPagination({
  page,
  totalItems,
  onPageChange,
}: ServicesPaginationProps) {
  if (totalItems === 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / SERVICES_PAGE_SIZE));
  const from = (page - 1) * SERVICES_PAGE_SIZE + 1;
  const to = Math.min(page * SERVICES_PAGE_SIZE, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-support text-secondary">
        Mostrando {from}–{to} de {totalItems} servicios
      </p>

      {totalPages > 1 ? (
        <nav
          aria-label="Paginación de servicios"
          className="flex flex-wrap items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Página anterior"
            className={cn(PAGE_BUTTON_CLASSES, IDLE_CLASSES)}
          >
            <ChevronRight
              aria-hidden="true"
              className="size-4 rotate-180"
            />
          </button>

          {getPageItems(page, totalPages).map((item, index) =>
            item === "gap" ? (
              <span
                key={`gap-${index}`}
                aria-hidden="true"
                className="px-1 text-support text-secondary"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Página ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  PAGE_BUTTON_CLASSES,
                  item === page ? ACTIVE_CLASSES : IDLE_CLASSES
                )}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Página siguiente"
            className={cn(PAGE_BUTTON_CLASSES, IDLE_CLASSES)}
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
