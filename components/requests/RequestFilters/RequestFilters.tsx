"use client";

import { useId, useState } from "react";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Select from "@/components/ui/Select";
import Search from "@/components/icons/search";

/** Opciones visuales del filtro de estado (filtrado real fuera de alcance). */
const STATUS_OPTIONS = [
  "Todos los estados",
  "Pendiente",
  "Aprobada",
  "Cancelada",
] as const;

/** Opciones visuales del filtro de fecha (filtrado real fuera de alcance). */
const DATE_OPTIONS = ["Todas las fechas", "Este mes", "Mes anterior"] as const;

/**
 * Fila de filtros del historial: búsqueda + estado + fecha.
 *
 * La interacción queda preparada (estado local del cliente) pero **no** se
 * aplica filtrado real sobre los datos de esta fase.
 */
export default function RequestFilters() {
  const searchId = useId();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>(STATUS_OPTIONS[0]);
  const [date, setDate] = useState<string>(DATE_OPTIONS[0]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_220px_220px]">
      {/* Búsqueda por mascota o servicio. */}
      <div className="flex min-w-0 flex-col gap-2">
        <label htmlFor={searchId} className="text-label font-bold text-body">
          Buscar solicitud
        </label>
        <SearchBar
          id={searchId}
          icon={Search}
          name="request-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar mascota o servicio..."
          className="h-12 rounded-input border border-border bg-surface px-3.5"
        />
      </div>

      <Select
        label="Estado"
        options={STATUS_OPTIONS}
        value={status}
        onChange={setStatus}
      />

      <Select
        label="Fecha"
        options={DATE_OPTIONS}
        value={date}
        onChange={setDate}
      />
    </div>
  );
}
