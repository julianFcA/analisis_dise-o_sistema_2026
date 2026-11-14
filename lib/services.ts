import servicesData from "@/data/services.json";

/** Categorías de servicio del catálogo (orden de la navegación de categorías). */
export const SERVICE_CATEGORIES = [
  "Veterinaria",
  "Peluquería",
  "Paseo",
  "Entrenamiento",
  "Cuidado Temporal",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

/** Proveedor del servicio. */
export interface ServiceProvider {
  name: string;
  verified: boolean;
  /** Calle y número del proveedor (la ciudad es `Service.location`). */
  address: string;
}

/** Disponibilidad declarada por el proveedor en el dataset. */
export interface ServiceAvailability {
  /** Fecha ISO (`YYYY-MM-DD`) de la próxima disponibilidad. */
  date: string;
  available: boolean;
}

/** Registro de `data/services.json`. */
export interface Service {
  id: string;
  title: string;
  /** Resumen corto (categoría + duración). */
  description: string;
  /** Descripción larga para el detalle del servicio. */
  details: string;
  provider: ServiceProvider;
  category: ServiceCategory;
  location: string;
  distanceKm: number;
  /** Precio en pesos colombianos (número, para filtrar y ordenar). */
  price: number;
  /** Unidad del precio (`consulta`, `sesión`, `paseo`…). */
  priceUnit: string;
  rating: number;
  reviewCount: number;
  availability: ServiceAvailability;
  /** Ruta local del asset (`public/images/…`). */
  image: string;
  tags: readonly string[];
}

/**
 * Catálogo completo. El JSON es la única fuente de datos de esta fase: no hay
 * fetch, backend ni persistencia (`docs/architecture.md`).
 */
export const services: readonly Service[] = servicesData.services.map(
  (service) => ({
    ...service,
    category: service.category as ServiceCategory,
  })
);

/* — Filtros ————————————————————————————————————————————————————— */

/** Valor de la categoría que muestra todo el catálogo (tabs y sidebar). */
export const ALL_CATEGORIES = "all";

/** Valor de ubicación que no restringe resultados (selector "Colombia"). */
export const ALL_LOCATIONS = "Colombia";

/** Radio del filtro "A menos de 10 km de ti". */
export const NEARBY_DISTANCE_KM = 10;

/** Resultados por página del grid de servicios. */
export const SERVICES_PAGE_SIZE = 6;

export type ServiceAvailabilityFilter = "any" | "today";

/** Estado de los filtros del sidebar de Services (estado local de la página). */
export interface ServiceFilterState {
  /** `ALL_CATEGORIES` o la categoría seleccionada. */
  category: string;
  /** Valores tal como se escriben en los campos (vacío = sin límite). */
  priceMin: string;
  priceMax: string;
  availability: ServiceAvailabilityFilter;
  location: string;
  nearbyOnly: boolean;
  /** Rating mínimo; `0` = todas las valoraciones. */
  minRating: number;
}

/** Parámetros ya normalizados que consume `filterServices`. */
export interface ServiceFilterInput {
  query: string;
  category: string;
  priceMin: number | null;
  priceMax: number | null;
  availability: ServiceAvailabilityFilter;
  /** Fecha de hoy (`YYYY-MM-DD`) calculada en el cliente, o `null`. */
  today: string | null;
  location: string;
  nearbyOnly: boolean;
  minRating: number;
}

/** Opciones del selector de calificación (valor = rating mínimo). */
export const RATING_OPTIONS = [
  { label: "Todas las valoraciones", value: 0 },
  { label: "4.0+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "4.8+", value: 4.8 },
] as const;

/** Opciones del filtro de disponibilidad. */
export const AVAILABILITY_OPTIONS = [
  { label: "Cualquier fecha", value: "any" },
  { label: "Disponible hoy", value: "today" },
] as const;

export type ServiceSort =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

/** Opciones del selector "Ordenar por". */
export const SORT_OPTIONS = [
  { label: "Recomendados", value: "recommended" },
  { label: "Precio: menor a mayor", value: "price-asc" },
  { label: "Precio: mayor a menor", value: "price-desc" },
  { label: "Mejor calificación", value: "rating-desc" },
] as const;

/** Normaliza texto para búsquedas sin distinguir mayúsculas ni tildes. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Aplica búsqueda + filtros combinados (todas las condiciones se cumplen a la
 * vez). No modifica el catálogo original: devuelve un array nuevo.
 */
export function filterServices(
  list: readonly Service[],
  input: ServiceFilterInput
): Service[] {
  const term = normalize(input.query);

  return list.filter((service) => {
    if (term) {
      const haystack = normalize(
        [
          service.title,
          service.provider.name,
          service.category,
          service.location,
          ...service.tags,
        ].join(" ")
      );
      if (!haystack.includes(term)) return false;
    }

    if (input.category !== ALL_CATEGORIES && service.category !== input.category) {
      return false;
    }

    if (input.priceMin !== null && service.price < input.priceMin) return false;
    if (input.priceMax !== null && service.price > input.priceMax) return false;

    if (input.availability === "today") {
      if (input.today === null) return false;
      if (!service.availability.available) return false;
      if (service.availability.date !== input.today) return false;
    }

    if (
      input.location !== ALL_LOCATIONS &&
      service.location !== input.location
    ) {
      return false;
    }

    if (input.nearbyOnly && service.distanceKm > NEARBY_DISTANCE_KM) return false;

    if (input.minRating > 0 && service.rating < input.minRating) return false;

    return true;
  });
}

/** Ordena el resultado ya filtrado sin tocar el dataset original. */
export function sortServices(
  list: readonly Service[],
  sort: ServiceSort
): Service[] {
  const sorted = [...list];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
    case "rating-desc":
      return sorted.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
      );
    default:
      // "Recomendados": orden del catálogo (curado en el JSON).
      return sorted;
  }
}

/* — Catálogo derivado ————————————————————————————————————————— */

/** Rango de precios real del dataset, redondeado a miles. */
export const SERVICE_PRICE_BOUNDS = {
  min:
    Math.floor(Math.min(...services.map((service) => service.price)) / 1000) *
    1000,
  max:
    Math.ceil(Math.max(...services.map((service) => service.price)) / 1000) *
    1000,
} as const;

/** Ubicaciones presentes en el dataset (para el selector de ubicación). */
export const SERVICE_LOCATIONS: readonly string[] = Array.from(
  new Set(services.map((service) => service.location))
).sort((a, b) => a.localeCompare(b, "es"));

/* — Formato ————————————————————————————————————————————————————— */

/** `50000` → `$50.000` (formato determinista, sin depender del ICU del runtime). */
export function formatPrice(amount: number): string {
  const digits = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${digits}`;
}

/**
 * Duración legible a partir del resumen del servicio (`"… · 45 min"`).
 * Devuelve `null` si el dataset no declara la duración.
 */
export function formatServiceDuration(description: string): string | null {
  const match = description.match(/(\d+)\s*min/);
  if (!match) return null;
  return `${Number(match[1])} minutos`;
}

/** `4.8` → `4,8 km`. */
export function formatDistance(km: number): string {
  return `${km.toString().replace(".", ",")} km`;
}

/** Fecha local en formato ISO corto (`YYYY-MM-DD`). */
export function toISODate(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Convierte el valor de un campo de precio a número (vacío/ inválido → null). */
export function parsePriceInput(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}
