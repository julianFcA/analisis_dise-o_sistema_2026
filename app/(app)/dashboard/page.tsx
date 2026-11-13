import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardHero from "@/components/dashboard/DashboardHero/DashboardHero";
import DashboardStats from "@/components/dashboard/DashboardStats/DashboardStats";
import MyPets from "@/components/dashboard/MyPets/MyPets";
import RecommendedServices from "@/components/dashboard/RecommendedServices/RecommendedServices";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment/UpcomingAppointment";

export const metadata: Metadata = {
  title: "Dashboard · PetCare",
};

/**
 * Dashboard de la aplicación autenticada: bienvenida, banner, resumen (KPI) y
 * cuadrícula principal de dos columnas — agenda + servicios recomendados a la
 * izquierda, mascotas a la derecha.
 *
 * Solo composición: cada bloque vive en `components/dashboard/` y el área de
 * contenido la aporta `AppLayout` (`app/(app)/layout.tsx`).
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 xl:gap-8">
      <DashboardHeader />
      <DashboardHero />
      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-6">
          <UpcomingAppointment />
          <RecommendedServices />
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <MyPets />
        </div>
      </div>
    </div>
  );
}
