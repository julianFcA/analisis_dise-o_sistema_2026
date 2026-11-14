import MapPin from "@/components/icons/map-pin";
import Plus from "@/components/icons/plus";
import { cn } from "@/lib/cn";

export interface MapPreviewProps {
  /** Descripción accesible del mapa (`role="img"`). */
  label?: string;
  /** Nombre mostrado en el rótulo del marcador. */
  markerTitle?: string;
  /** Referencia bajo el nombre en el rótulo del marcador. */
  markerMeta?: string;
  /** Altura del lienzo, declarada por el consumidor (p. ej. `h-72 xl:h-96`). */
  className?: string;
}

/* Retícula girada del mock: columnas y filas de manzanas separadas por calles. */
const COLUMNS = [-96, 4, 104, 204, 304, 404, 504, 604] as const;
const ROWS = [-76, 24, 124, 224, 324, 424] as const;
const BLOCK_SIZE = 88;

/** Celdas reservadas para la zona verde (columnas 1–2, filas 2–3). */
const PARK_COLUMNS = [1, 2] as const;
const PARK_ROWS = [2, 3] as const;

const IS_PARK_CELL = (column: number, row: number) =>
  PARK_COLUMNS.includes(column as (typeof PARK_COLUMNS)[number]) &&
  PARK_ROWS.includes(row as (typeof PARK_ROWS)[number]);

/** Punto del marcador: centrado en mobile y desplazado desde `md`. */
const MARKER_CLASSES = [
  "pointer-events-none absolute inset-0 flex items-center justify-center",
  "md:inset-auto md:left-[56%] md:top-[64%] md:-translate-x-1/2 md:-translate-y-1/2",
].join(" ");

/**
 * Representación visual estática de un mapa (sin librerías, tiles ni API):
 * manzanas, calles, avenida diagonal, zona verde, rótulos, marcador con rótulo,
 * escala, atribución y controles decorativos.
 *
 * El marcador se centra en el área visible del mapa en mobile y se posiciona
 * por porcentajes desde `md`, sin verse afectado por el tamaño del contenedor.
 */
export default function MapPreview({
  label = "Mapa de ubicación",
  markerTitle,
  markerMeta,
  className,
}: MapPreviewProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative min-w-0 overflow-hidden rounded-card border border-border bg-surface",
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 640 380"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <rect width="640" height="380" className="fill-surface" />

        {/* Manzanas (retícula girada) */}
        <g transform="rotate(-8 320 190)">
          {ROWS.map((y, rowIndex) =>
            COLUMNS.map((x, columnIndex) =>
              IS_PARK_CELL(columnIndex, rowIndex) ? null : (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width={BLOCK_SIZE}
                  height={BLOCK_SIZE}
                  rx="6"
                  className="fill-chip"
                />
              )
            )
          )}

          {/* Zona verde */}
          <rect
            x="4"
            y="124"
            width="188"
            height="188"
            rx="10"
            className="fill-primary-600 opacity-15"
          />
          {[
            [58, 176, 11],
            [110, 202, 14],
            [152, 168, 9],
            [72, 250, 12],
            [130, 272, 10],
            [178, 236, 8],
          ].map(([cx, cy, r]) => (
            <circle
              key={`tree-${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              className="fill-primary-600 opacity-30"
            />
          ))}

          <text
            x="158"
            y="290"
            textAnchor="middle"
            className="fill-primary-600 text-badge"
          >
            Jardines
          </text>
          <text
            x="158"
            y="306"
            textAnchor="middle"
            className="fill-primary-600 text-badge"
          >
            del Parque
          </text>

          {/* Rótulos de calles */}
          <text x="214" y="108" className="fill-secondary text-badge">
            Calle de Fernando el Católico
          </text>
          <text x="418" y="308" className="fill-secondary text-badge">
            Calle de Alberto Aguilera
          </text>
          <text
            transform="translate(196 300) rotate(-90)"
            textAnchor="middle"
            className="fill-secondary text-badge"
          >
            Carrera 15
          </text>
          <text x="400" y="352" className="fill-secondary text-badge">
            CHAPINERO
          </text>
        </g>

        {/* Avenida diagonal con línea de transporte */}
        <line
          x1="-40"
          y1="360"
          x2="680"
          y2="70"
          strokeWidth="26"
          strokeLinecap="round"
          className="stroke-surface"
        />
        <line
          x1="-40"
          y1="360"
          x2="680"
          y2="70"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-accent"
        />

        {/* Escala */}
        <g className="fill-secondary">
          <rect x="150" y="352" width="26" height="2" rx="1" />
          <text x="184" y="360" className="text-badge">
            100 m
          </text>
        </g>
      </svg>

      {/* Estación de metro */}
      <span
        aria-hidden="true"
        className="absolute right-[4%] top-[26%] hidden items-center gap-1.5 rounded-full bg-surface/95 py-1 pl-1 pr-2.5 shadow-card sm:flex"
      >
        <span className="flex size-5 items-center justify-center rounded-sm bg-primary-600 text-badge font-bold text-surface">
          M
        </span>
        <span className="text-note font-medium text-body">Quevedo</span>
      </span>

      {/* Marcador con rótulo del proveedor */}
      <div aria-hidden="true" className={MARKER_CLASSES}>
        <span className="relative flex flex-col items-center">
          {markerTitle ? (
            <span className="absolute bottom-full left-1/2 mb-2 flex w-max max-w-[11rem] -translate-x-1/2 items-start gap-2 rounded-card border border-border bg-surface px-3 py-2 text-left shadow-card sm:max-w-[15rem]">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-primary-600"
              />
              <span className="flex min-w-0 flex-col">
                <span className="break-words text-note font-bold leading-tight text-body">
                  {markerTitle}
                </span>
                {markerMeta ? (
                  <span className="break-words text-note leading-tight text-secondary">
                    {markerMeta}
                  </span>
                ) : null}
              </span>
            </span>
          ) : null}

          <span className="flex size-9 items-center justify-center rounded-full bg-accent shadow-float ring-4 ring-surface">
            <span className="size-2.5 rounded-full bg-surface" />
          </span>
          <span className="-mt-1.5 size-3.5 rotate-45 rounded-sm bg-accent" />
          <span className="mt-1 h-1.5 w-8 rounded-full bg-accent/20 blur-sm" />
        </span>
      </div>

      {/* Atribución del mock */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-3 hidden text-note text-secondary sm:block"
      >
        Mapa ilustrativo · Ubicación de ejemplo
      </span>

      {/* Controles visuales de zoom y ubicación (decorativos) */}
      <div
        aria-hidden="true"
        className="absolute bottom-12 right-3 flex flex-col items-stretch gap-1 rounded-chip border border-border bg-surface p-1 shadow-card"
      >
        <span className="flex size-8 items-center justify-center text-primary-600">
          <Plus className="size-4" />
        </span>
        <span className="mx-1 h-px bg-border" />
        <span className="flex size-8 items-center justify-center text-control font-bold leading-none text-primary-600">
          −
        </span>
        <span className="mx-1 h-px bg-border" />
        <span className="flex size-8 items-center justify-center text-primary-600">
          <MapPin className="size-4" />
        </span>
      </div>
    </div>
  );
}
