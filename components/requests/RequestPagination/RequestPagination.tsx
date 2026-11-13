import Button from "@/components/ui/Button";
import ChevronRight from "@/components/icons/chevron-right";
import { requests } from "@/components/requests/data";

/**
 * Paginación visual del historial. Con los 6 registros estáticos solo existe
 * una página: el rango mostrado se calcula desde los datos y los controles
 * quedan preparados para conectarse a datos reales más adelante.
 */
export default function RequestPagination() {
  const total = requests.length;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <p className="text-support text-secondary">
        Mostrando 1–{total} de {total} solicitudes
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="secondary"
          label="Página anterior"
          showText={false}
          state="disabled"
          leftIcon={<ChevronRight aria-hidden="true" className="size-4 rotate-180" />}
          className="size-9 min-h-9 px-0"
        />
        <Button
          type="default"
          label="1"
          className="size-9 min-h-9 px-0"
        />
        <Button
          type="secondary"
          label="Página siguiente"
          showText={false}
          state="disabled"
          rightIcon={<ChevronRight aria-hidden="true" className="size-4" />}
          className="size-9 min-h-9 px-0"
        />
      </div>
    </div>
  );
}
