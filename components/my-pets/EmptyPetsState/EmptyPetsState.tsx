"use client";

import { useState } from "react";

import AddPetModal from "@/components/my-pets/AddPetModal/AddPetModal";
import Button from "@/components/ui/Button";

/**
 * Estado vacío de la sección de mascotas (`/my-pets`): ilustración, mensaje y
 * CTA para registrar la primera mascota.
 *
 * El CTA abre el mismo `AddPetModal` que el botón del encabezado. Su estado de
 * apertura vive aquí, en el límite cliente del bloque (mismo patrón que
 * `MyPetsHeader`), para que la página siga siendo un Server Component.
 * La ilustración es decorativa (`alt=""`), conserva el tamaño raíz del SVG y
 * se centra con el resto del contenido en los tres breakpoints.
 */
export default function EmptyPetsState() {
  const [addPetOpen, setAddPetOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-6 px-6 py-10 text-center md:py-12 xl:py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dog_cat.svg"
          alt=""
          width={310}
          height={220}
          aria-hidden="true"
          className="h-auto max-w-full"
        />

        <div className="flex max-w-md flex-col items-center gap-2">
          <h3 className="text-form-title text-primary-500">
            Aún no has registrado mascotas.
          </h3>
          <p className="text-description text-secondary">
            Cada gran cuidado empieza por conocerles. Agrega a tu primera mascota
            y ten toda su información en un solo lugar.
          </p>
        </div>

        <Button
          label="Agregar mi primera mascota"
          onClick={() => setAddPetOpen(true)}
        />
      </div>

      <AddPetModal
        open={addPetOpen}
        onClose={() => setAddPetOpen(false)}
      />
    </>
  );
}
