import Button from "@/components/ui/Button";
import PawPrint from "@/components/icons/paw-print";

export interface ServicesEmptyProps {
  onClear: () => void;
}

/** Estado vacío del grid cuando ninguna card cumple los filtros activos. */
export default function ServicesEmpty({ onClear }: ServicesEmptyProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-card-lg border border-border bg-surface p-8 text-center shadow-card"
    >
      <span className="flex size-14 items-center justify-center rounded-chip bg-chip text-primary-600">
        <PawPrint aria-hidden="true" className="size-6" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-category-title font-bold text-primary-500">
          No encontramos servicios con estos filtros
        </p>
        <p className="text-support text-secondary">
          Prueba con otra búsqueda, categoría o rango de precio.
        </p>
      </div>

      <Button type="secondary" label="Limpiar filtros" onClick={onClear} />
    </div>
  );
}
