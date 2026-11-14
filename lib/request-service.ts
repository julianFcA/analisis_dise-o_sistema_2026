/**
 * Tipos y formateadores de la pantalla Solicitar Servicio (`/services/request`).
 * La UI solo consume estos helpers: reemplazar la fuente de datos local por una
 * API no obliga a tocar los componentes.
 */

/** Estados del formulario de solicitud (sin backend en esta fase). */
export type RequestFormStatus = "draft" | "submitting" | "submitted" | "error";

/** Valores controlados del formulario. */
export interface ServiceRequestValues {
  /** Nombre de la mascota seleccionada (los nombres del dataset son únicos). */
  petName: string;
  /** Etiqueta única del servicio seleccionado (título, o título + ciudad). */
  serviceLabel: string;
  /** Fecha en formato `YYYY-MM-DD` que devuelve el control nativo. */
  date: string;
  /** Hora en formato `HH:MM` que devuelve el control nativo. */
  time: string;
  notes: string;
}

/** Errores de validación en cliente (un mensaje por campo). */
export interface ServiceRequestErrors {
  pet?: string;
  service?: string;
  date?: string;
  time?: string;
}

/** Límite de caracteres de "Notas para el proveedor". */
export const MAX_REQUEST_NOTES = 500;

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;
const MONTHS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
] as const;

/**
 * `2026-11-12` → `Jue, 12 nov 2026`.
 *
 * Se formatea de forma determinista (sin depender del ICU/locale del runtime)
 * y se construye la fecha en local, para que el día de la semana no se
 * desplace por la zona horaria.
 */
export function formatRequestDate(isoDate: string): string | null {
  const parts = isoDate.split("-");
  if (parts.length !== 3) return null;

  const [year, month, day] = parts.map(Number);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime()) || date.getMonth() !== month - 1) return null;

  return `${WEEKDAYS[date.getDay()]}, ${day} ${MONTHS[month - 1]} ${year}`;
}

/** `10:00` → `10:00`; cualquier otro valor → `null`. */
export function formatRequestTime(time: string): string | null {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time) ? time : null;
}

/** `Jue, 12 nov 2026 · 10:00` a partir de la selección del formulario. */
export function formatRequestDateTime(
  isoDate: string,
  time: string
): string | null {
  const dateLabel = formatRequestDate(isoDate);
  const timeLabel = formatRequestTime(time);
  if (!dateLabel || !timeLabel) return null;
  return `${dateLabel} · ${timeLabel}`;
}
