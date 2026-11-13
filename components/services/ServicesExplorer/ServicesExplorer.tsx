"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import ChevronDown from "@/components/icons/chevron-down";
import ServiceCategories from "@/components/services/ServiceCategories/ServiceCategories";
import ServicesFilters from "@/components/services/ServicesFilters/ServicesFilters";
import ServicesGrid from "@/components/services/ServicesGrid/ServicesGrid";
import ServicesPagination from "@/components/services/ServicesPagination/ServicesPagination";
import ServicesToolbar from "@/components/services/ServicesToolbar/ServicesToolbar";
import {
  ALL_CATEGORIES,
  ALL_LOCATIONS,
  SERVICE_CATEGORIES,
  SERVICE_LOCATIONS,
  SERVICE_PRICE_BOUNDS,
  SERVICES_PAGE_SIZE,
  filterServices,
  parsePriceInput,
  services,
  sortServices,
  toISODate,
  type ServiceFilterState,
  type ServiceSort,
} from "@/lib/services";
import { cn } from "@/lib/cn";

/** Estado inicial de los filtros (también lo restaura "Limpiar filtros"). */
const INITIAL_FILTERS: ServiceFilterState = {
  category: ALL_CATEGORIES,
  priceMin: "",
  priceMax: "",
  availability: "any",
  location: ALL_LOCATIONS,
  nearbyOnly: false,
  minRating: 0,
};

const FILTERS_PANEL_ID = "services-filters-panel";

/** Breakpoint `xl` de Tailwind: en desktop los filtros son una columna. */
const DESKTOP_MEDIA_QUERY = "(min-width: 1280px)";

function subscribeDesktop(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

const getDesktopSnapshot = () =>
  window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
const getDesktopServerSnapshot = () => false;

/**
 * Catálogo de Services con su lógica de cliente. El flujo de datos es:
 *
 * `JSON → búsqueda/categoría → filtros del sidebar → ordenamiento →
 * paginación → cards`.
 *
 * El estado (filtros, orden, página, favoritos) es local de la página; no hay
 * backend, persistencia ni librerías de estado externas.
 */
export default function ServicesExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [filters, setFilters] = useState<ServiceFilterState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<ServiceSort>("recommended");
  const [favorites, setFavorites] = useState<readonly string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersPanelRef = useRef<HTMLDivElement>(null);
  const filtersToggleRef = useRef<HTMLButtonElement>(null);

  /* En desktop los filtros nunca son una hoja inferior. La media query se lee
     como store externo para que el bloqueo de scroll y el estado abierto se
     recalculen al cambiar de breakpoint (sin `setState` en efectos). */
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );
  const filtersSheetOpen = filtersOpen && !isDesktop;

  /* Clave de la combinación activa (búsqueda + filtros + orden): cuando cambia,
     la página vuelve a 1 sin efectos ni recargas. `pageState` recuerda en qué
     página se estaba para la combinación actual. */
  const filterKey = [
    query,
    filters.category,
    filters.priceMin,
    filters.priceMax,
    filters.availability,
    filters.location,
    filters.nearbyOnly,
    filters.minRating,
    sort,
  ].join("|");
  const [pageState, setPageState] = useState<{ key: string; page: number }>({
    key: filterKey,
    page: 1,
  });
  const page = pageState.key === filterKey ? pageState.page : 1;
  const setPage = (nextPage: number) =>
    setPageState({ key: filterKey, page: nextPage });

  /* "Disponible hoy" usa la fecha real del sistema (nunca una fecha
     hardcodeada). No afecta al render inicial porque el filtro por defecto es
     "Cualquier fecha". */
  const today = toISODate(new Date());

  const priceMin = parsePriceInput(filters.priceMin);
  const priceMax = parsePriceInput(filters.priceMax);

  /* Búsqueda + filtros combinados + ordenamiento. */
  const filtered = useMemo(
    () =>
      sortServices(
        filterServices(services, {
          query,
          category: filters.category,
          priceMin: parsePriceInput(filters.priceMin),
          priceMax: parsePriceInput(filters.priceMax),
          availability: filters.availability,
          today,
          location: filters.location,
          nearbyOnly: filters.nearbyOnly,
          minRating: filters.minRating,
        }),
        sort
      ),
    [
      query,
      filters.category,
      filters.priceMin,
      filters.priceMax,
      filters.availability,
      filters.location,
      filters.nearbyOnly,
      filters.minRating,
      today,
      sort,
    ]
  );

  /* Conteo por categoría: respeta el resto de filtros pero no la categoría,
     para que la faceta muestre cuántos resultados aporta cada opción. */
  const categoryCounts = useMemo(() => {
    const base = filterServices(services, {
      query,
      category: ALL_CATEGORIES,
      priceMin,
      priceMax,
      availability: filters.availability,
      today,
      location: filters.location,
      nearbyOnly: filters.nearbyOnly,
      minRating: filters.minRating,
    });

    return SERVICE_CATEGORIES.map((category) => ({
      category,
      count: base.filter((service) => service.category === category).length,
    }));
  }, [
    query,
    priceMin,
    priceMax,
    filters.availability,
    filters.location,
    filters.nearbyOnly,
    filters.minRating,
    today,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / SERVICES_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleServices = filtered.slice(
    (currentPage - 1) * SERVICES_PAGE_SIZE,
    currentPage * SERVICES_PAGE_SIZE
  );

  const activeFilterCount = [
    filters.category !== ALL_CATEGORIES,
    priceMin !== null || priceMax !== null,
    filters.availability !== "any",
    filters.location !== ALL_LOCATIONS,
    filters.nearbyOnly,
    filters.minRating > 0,
  ].filter(Boolean).length;

  const handleFiltersChange = (patch: Partial<ServiceFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
  };

  const handleSortChange = (nextSort: ServiceSort) => {
    setSort(nextSort);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSort("recommended");
    setPage(1);
    if (query) router.replace("/services");
  };

  const handleClearQuery = () => {
    router.replace("/services");
    setPage(1);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const closeFilters = () => {
    setFiltersOpen(false);
    filtersToggleRef.current?.focus();
  };

  /* Hoja inferior de filtros (mobile/tablet): bloquea el scroll del documento,
     mueve el foco al panel y cierra con Escape. En desktop no se bloquea nada
     porque los filtros son una columna en el flujo. */
  useEffect(() => {
    if (!filtersSheetOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
        filtersToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    filtersPanelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filtersSheetOpen]);

  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <ServiceCategories
        value={filters.category}
        onChange={(category) => handleFiltersChange({ category })}
      />

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[288px_minmax(0,1fr)] xl:items-start">
        {/* Filtros: columna propia y sticky en desktop; en mobile/tablet, hoja
            inferior a pantalla completa lanzada desde el botón (sin crear un
            segundo Aside global). */}
        <div className="flex min-w-0 flex-col gap-3 xl:sticky xl:top-28 xl:self-start">
          <div
            role="group"
            aria-label="Filtros del catálogo"
            className="flex items-center gap-2 xl:hidden"
          >
            <button
              ref={filtersToggleRef}
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-expanded={filtersSheetOpen}
              aria-controls={FILTERS_PANEL_ID}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-button border-[0.8px] border-border-button bg-surface px-4 text-control font-medium whitespace-nowrap text-primary-700 transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {activeFilterCount > 0
                ? `Filtros (${activeFilterCount})`
                : "Filtros"}
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 rotate-180"
              />
            </button>

            <Button
              type="secondary"
              label="Limpiar filtros"
              onClick={handleClearFilters}
              className="shrink-0"
            />
          </div>

          {/* Backdrop de la hoja inferior (decorativo, cierra al pulsar). */}
          <div
            aria-hidden="true"
            onClick={closeFilters}
            className={cn(
              "fixed inset-0 z-60 bg-overlay backdrop-blur-lg transition-opacity duration-300 xl:hidden",
              filtersSheetOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            )}
          />

          {/* Hoja inferior: sube desde abajo a todo el ancho y por encima del
              contenido. En `xl` vuelve al flujo como columna lateral. */}
          <div
            ref={filtersPanelRef}
            id={FILTERS_PANEL_ID}
            tabIndex={-1}
            /* Cerrado sigue renderizado (para poder animar el deslizamiento)
               pero fuera de la vista, sin interacción y fuera del árbol de
               accesibilidad. En desktop nunca se inactiva. */
            inert={!filtersSheetOpen && !isDesktop ? true : undefined}
            className={cn(
              "fixed inset-x-0 bottom-0 z-70 max-h-[85dvh] overflow-y-auto rounded-t-card-lg bg-surface shadow-float transition-[translate] duration-300 ease-out focus:outline-none",
              filtersSheetOpen
                ? "translate-y-0"
                : "pointer-events-none translate-y-full",
              "xl:static xl:z-auto xl:max-h-none xl:translate-y-0 xl:overflow-visible xl:rounded-none xl:bg-transparent xl:shadow-none xl:transition-none"
            )}
          >
            <ServicesFilters
              filters={filters}
              totalCount={filtered.length}
              categoryCounts={categoryCounts}
              locations={SERVICE_LOCATIONS}
              priceBounds={SERVICE_PRICE_BOUNDS}
              onChange={handleFiltersChange}
              onClear={handleClearFilters}
              onClose={closeFilters}
              onApply={closeFilters}
              className="max-xl:rounded-none max-xl:border-0 max-xl:shadow-none"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <ServicesToolbar
            resultCount={filtered.length}
            sort={sort}
            onSortChange={handleSortChange}
            query={query}
            onClearQuery={handleClearQuery}
          />

          <ServicesGrid
            services={visibleServices}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onClearFilters={handleClearFilters}
          />

          <ServicesPagination
            page={currentPage}
            totalItems={filtered.length}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
