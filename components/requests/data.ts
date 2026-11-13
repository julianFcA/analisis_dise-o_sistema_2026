/** Estado de una solicitud de servicio (variantes semánticas del Badge). */
export type RequestStatusValue = "pending" | "approved" | "canceled";

/** Fila del historial de solicitudes. */
export interface PetServiceRequest {
  id: string;
  service: string;
  pet: string;
  /** Fecha ya formateada para la interfaz (p. ej. "10 nov 2026"). */
  date: string;
  /** Hora ya formateada para la interfaz (p. ej. "11:30"). */
  time: string;
  provider: string;
  status: RequestStatusValue;
}

/**
 * Datos estáticos de referencia de esta fase (sin backend, fetch ni
 * persistencia). Reemplazar esta constante por la fuente real cuando exista.
 */
export const requests: readonly PetServiceRequest[] = [
  {
    id: "REQ-001",
    service: "Baño y peluquería",
    pet: "Luna",
    date: "10 nov 2026",
    time: "11:30",
    provider: "Happy Paws",
    status: "pending",
  },
  {
    id: "REQ-002",
    service: "Consulta veterinaria",
    pet: "Milo",
    date: "09 nov 2026",
    time: "16:00",
    provider: "Clínica VetVida",
    status: "pending",
  },
  {
    id: "REQ-003",
    service: "Vacunación anual",
    pet: "Luna",
    date: "04 nov 2026",
    time: "09:00",
    provider: "Clínica VetVida",
    status: "approved",
  },
  {
    id: "REQ-004",
    service: "Paseo de mascotas",
    pet: "Luna",
    date: "02 nov 2026",
    time: "08:00",
    provider: "Paws and Care",
    status: "approved",
  },
  {
    id: "REQ-005",
    service: "Baño y peluquería",
    pet: "Milo",
    date: "28 oct 2026",
    time: "14:00",
    provider: "Happy Paws",
    status: "canceled",
  },
  {
    id: "REQ-006",
    service: "Consulta veterinaria",
    pet: "Luna",
    date: "22 oct 2026",
    time: "12:00",
    provider: "Clínica VetVida",
    status: "approved",
  },
];
