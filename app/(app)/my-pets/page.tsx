import type { Metadata } from "next";
import MyPetsHeader from "@/components/my-pets/MyPetsHeader/MyPetsHeader";
import MyPetsStats from "@/components/my-pets/MyPetsStats/MyPetsStats";
import PetList, { PET_COUNT } from "@/components/my-pets/PetList/PetList";
import UpcomingRequest from "@/components/my-pets/UpcomingRequest/UpcomingRequest";
import PetWellbeingCard from "@/components/my-pets/PetWellbeingCard/PetWellbeingCard";

export const metadata: Metadata = {
  title: "Mis Mascotas · PetCare",
};

/**
 * Página de gestión de mascotas (`/my-pets`): encabezado, resumen, familia de
 * mascotas y —solo cuando hay mascotas— el bloque inferior con la próxima
 * solicitud y el consejo de bienestar. En el estado vacío ese bloque se oculta
 * porque depende de datos de mascotas.
 *
 * Solo composición: cada bloque vive en `components/my-pets/` y el área de
 * contenido la aporta `AppLayout` (`app/(app)/layout.tsx`).
 */
export default function MyPetsPage() {
  const hasPets = PET_COUNT > 0;

  return (
    <div className="flex flex-col gap-6 xl:gap-8">
      <MyPetsHeader />
      <MyPetsStats />
      <PetList />

      {hasPets ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:gap-5">
          <UpcomingRequest />
          <PetWellbeingCard />
        </div>
      ) : null}
    </div>
  );
}
