import type { Metadata } from "next";
import RequestHistoryHeader from "@/components/requests/RequestHistoryHeader/RequestHistoryHeader";
import RequestStats from "@/components/requests/RequestStats/RequestStats";
import RequestHistoryCard from "@/components/requests/RequestHistoryCard/RequestHistoryCard";

export const metadata: Metadata = {
  title: "Historial de Solicitudes · PetCare",
};

/**
 * Historial de Solicitudes de la aplicación autenticada: encabezado de
 * página, resumen de solicitudes y tarjeta con filtros, tabla y paginación.
 *
 * Solo composición: cada bloque vive en `components/requests/` y el shell
 * (Aside + Navbar + main) lo aporta `AppLayout` (`app/(app)/layout.tsx`).
 */
export default function RequestsPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <RequestHistoryHeader />
      <RequestStats />
      <RequestHistoryCard />
    </div>
  );
}
