import Badge from "@/components/ui/Badge";
import EmptyPetsState from "@/components/my-pets/EmptyPetsState/EmptyPetsState";

/**
 * Conteo actual de mascotas (sin backend ni CRUD en esta fase). La página lo
 * usa para ocultar el bloque inferior mientras el escenario esté vacío.
 */
export const PET_COUNT = 0;

/**
 * Sección de mascotas: encabezado con contador + estado vacío mientras no
 * haya mascotas registradas.
 *
 * El título de la sección se conserva; el contador refleja el escenario vacío
 * y el control de orden no se muestra porque no hay elementos que ordenar.
 * El estado vacío vive en `EmptyPetsState`.
 */
export default function PetList() {
  return (
    <section aria-labelledby="pets-list-title" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="pets-list-title" className="text-form-title text-primary-500">
          Tu familia, siempre cerca
        </h2>
        <Badge type="success">{PET_COUNT} Mascotas</Badge>
      </div>

      <EmptyPetsState />
    </section>
  );
}
