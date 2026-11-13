import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesHeader from "@/components/services/ServicesHeader/ServicesHeader";
import ServicesExplorer from "@/components/services/ServicesExplorer/ServicesExplorer";
import ServicesInfo from "@/components/services/ServicesInfo/ServicesInfo";

export const metadata: Metadata = {
  title: "Servicios · PetCare",
};

/**
 * Catálogo de servicios de la aplicación autenticada (`/services`): encabezado,
 * categorías, filtros, grid, ordenamiento y paginación sobre `data/services.json`.
 *
 * Solo composición: el shell (Aside + Navbar + main) lo aporta `AppLayout`
 * (`app/(app)/layout.tsx`) y la lógica de filtrado vive en
 * `components/services/`. El límite de `Suspense` es necesario porque
 * `ServicesExplorer` lee `?q=` con `useSearchParams` (Next 16 + Cache
 * Components).
 */
export default function ServicesPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <ServicesHeader />

      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="min-h-[420px] rounded-card-lg border border-border bg-surface"
          />
        }
      >
        <ServicesExplorer />
      </Suspense>

      <ServicesInfo />
    </div>
  );
}
