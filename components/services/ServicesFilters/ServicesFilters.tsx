"use client";

import { useId } from "react";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Select from "@/components/ui/Select";
import Check from "@/components/icons/check";
import X from "@/components/icons/x";
import {
  ALL_LOCATIONS,
  AVAILABILITY_OPTIONS,
  NEARBY_DISTANCE_KM,
  RATING_OPTIONS,
  formatPrice,
  parsePriceInput,
  type ServiceCategory,
  type ServiceFilterState,
} from "@/lib/services";

/** Conteo dinámico por categoría (faceta del sidebar). */
export interface ServiceCategoryCount {
  category: ServiceCategory;
  count: number;
}

export interface ServicesFiltersProps {
  filters: ServiceFilterState;
  totalCount: number;
  categoryCounts: readonly ServiceCategoryCount[];
  locations: readonly string[];
  priceBounds: { min: number; max: number };
  onChange: (patch: Partial<ServiceFilterState>) => void;
  onClear: () => void;
  /** Cierra la hoja inferior (solo se pinta por debajo de `xl`). */
  onClose?: () => void;
  /** Aplica y cierra la hoja inferior (solo se pinta por debajo de `xl`). */
  onApply?: () => void;
  className?: string;
}

const SECTION_CLASSES =
  "flex flex-col gap-3 border-t border-border pt-5 first:border-t-0 first:pt-0";

const CATEGORY_BOX_CLASSES = [
  "flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-checkbox border",
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600",
].join(" ");

const PRICE_FIELD_CLASSES = [
  "h-11 w-full rounded-input border border-border bg-surface px-3 text-control-sm text-body",
  "placeholder:text-secondary focus-visible:border-primary-600 focus-visible:outline-none",
].join(" ");

/**
 * Sidebar de filtros de Services (no forma parte del Aside global).
 *
 * Todos los filtros se combinan entre sí: el componente solo comunica cambios
 * parciales de `filters`; el filtrado real vive en `lib/services.ts` y el
 * estado en `ServicesExplorer`. Los conteos de categoría y los límites de
 * precio se calculan a partir del dataset.
 */
export default function ServicesFilters({
  filters,
  totalCount,
  categoryCounts,
  locations,
  priceBounds,
  onChange,
  onClear,
  onClose,
  onApply,
  className,
}: ServicesFiltersProps) {
  const categoryLabelId = useId();
  const sliderId = useId();

  const parsedMax = parsePriceInput(filters.priceMax);
  const sliderMax = Math.min(
    Math.max(parsedMax ?? priceBounds.max, priceBounds.min),
    priceBounds.max
  );

  const availabilityValue =
    AVAILABILITY_OPTIONS.find(
      (option) => option.value === filters.availability
    )?.label ?? AVAILABILITY_OPTIONS[0].label;

  const ratingValue =
    RATING_OPTIONS.find((option) => option.value === filters.minRating)?.label ??
    RATING_OPTIONS[0].label;

  return (
    <aside
      aria-label="Filtros de servicios"
      className={[
        "min-w-0 rounded-card-lg border border-border bg-surface p-5 shadow-card",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-nav font-bold text-ink">Filtros</h2>

        <div className="flex items-center gap-1">
          <span className="text-note text-secondary">
            {totalCount} servicios
          </span>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar filtros"
              className="inline-flex size-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-chip hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 xl:hidden"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* El formulario no envía datos: evita recargas al pulsar Enter. */}
      <form
        className="mt-5 flex flex-col gap-5"
        onSubmit={(event) => event.preventDefault()}
      >
        {/* — Categoría ————————————————————————————————————————— */}
        <div
          role="radiogroup"
          aria-labelledby={categoryLabelId}
          className={SECTION_CLASSES}
        >
          <p id={categoryLabelId} className="text-label font-bold text-body">
            Categoría
          </p>

          <ul className="flex flex-col gap-2.5">
            {categoryCounts.map(({ category, count }) => {
              const checked = filters.category === category;

              return (
                <li key={category}>
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="radio"
                      name={`${categoryLabelId}-category`}
                      value={category}
                      checked={checked}
                      onChange={() => onChange({ category })}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={[
                        CATEGORY_BOX_CLASSES,
                        checked
                          ? "border-primary-500 bg-primary-500"
                          : "border-border bg-surface",
                      ].join(" ")}
                    >
                      {checked ? (
                        <Check className="size-3 text-surface" />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1 text-control-sm text-secondary">
                      {category}
                    </span>
                    <span className="text-note text-secondary">{count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* — Precio ————————————————————————————————————————————— */}
        <div className={SECTION_CLASSES}>
          <p className="text-label font-bold text-body">Precio</p>

          <div className="grid grid-cols-2 gap-2.5">
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="text-note text-secondary">Precio mínimo</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={priceBounds.max}
                step={1000}
                value={filters.priceMin}
                placeholder={String(priceBounds.min)}
                onChange={(event) => onChange({ priceMin: event.target.value })}
                className={PRICE_FIELD_CLASSES}
              />
            </label>

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="text-note text-secondary">Precio máximo</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={priceBounds.max}
                step={1000}
                value={filters.priceMax}
                placeholder={String(priceBounds.max)}
                onChange={(event) => onChange({ priceMax: event.target.value })}
                className={PRICE_FIELD_CLASSES}
              />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <div
              aria-hidden="true"
              className="flex items-center justify-between gap-2 text-note text-secondary"
            >
              <span>Máximo</span>
              <span className="font-bold text-primary-600">
                {formatPrice(sliderMax)}
              </span>
            </div>
            <input
              id={sliderId}
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={1000}
              value={sliderMax}
              aria-label="Precio máximo"
              aria-valuetext={formatPrice(sliderMax)}
              onChange={(event) => {
                const next = Number(event.target.value);
                onChange({
                  priceMax: next >= priceBounds.max ? "" : String(next),
                });
              }}
              className="h-1.5 w-full cursor-pointer accent-primary-500"
            />
          </div>
        </div>

        {/* — Disponibilidad ————————————————————————————————————— */}
        <div className={SECTION_CLASSES}>
          <Select
            label="Disponibilidad"
            options={AVAILABILITY_OPTIONS.map((option) => option.label)}
            value={availabilityValue}
            onChange={(label) => {
              const option = AVAILABILITY_OPTIONS.find(
                (item) => item.label === label
              );
              if (option) onChange({ availability: option.value });
            }}
          />
        </div>

        {/* — Ubicación ————————————————————————————————————————— */}
        <div className={SECTION_CLASSES}>
          <Select
            label="Ubicación"
            options={[ALL_LOCATIONS, ...locations]}
            value={filters.location}
            onChange={(value) => onChange({ location: value })}
          />

          <Checkbox
            checked={filters.nearbyOnly}
            onChange={(checked) => onChange({ nearbyOnly: checked })}
          >
            A menos de {NEARBY_DISTANCE_KM} km de ti
          </Checkbox>
        </div>

        {/* — Calificación ——————————————————————————————————————— */}
        <div className={SECTION_CLASSES}>
          <Select
            label="Calificación"
            options={RATING_OPTIONS.map((option) => option.label)}
            value={ratingValue}
            onChange={(label) => {
              const option = RATING_OPTIONS.find(
                (item) => item.label === label
              );
              if (option) onChange({ minRating: option.value });
            }}
          />
        </div>

        {/* — Limpiar / aplicar filtros ——————————————————————————— */}
        <div className="border-t border-border pt-5">
          <Button
            type="terciary"
            label="Limpiar filtros"
            onClick={onClear}
            className="w-full"
          />
        </div>

        {onApply ? (
          <div className="xl:hidden">
            <Button
              type="default"
              label="Aplicar filtros"
              onClick={onApply}
              className="w-full"
            />
          </div>
        ) : null}
      </form>
    </aside>
  );
}
