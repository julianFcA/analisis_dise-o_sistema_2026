import type { Metadata } from "next";
import { Suspense } from "react";
import RequestServiceHeader from "@/components/request-service/RequestServiceHeader/RequestServiceHeader";
import RequestServiceView from "@/components/request-service/RequestServiceView/RequestServiceView";

export const metadata: Metadata = {
  title: "Solicitar Servicio · PetCare",
};

/**
 * Pantalla Solicitar Servicio (`/services/request`): encabezado + formulario y
 * resumen en dos columnas.
 *
 * Solo composición: el shell (Aside + Navbar + main) lo aporta `AppLayout`
 * (`app/(app)/layout.tsx`) y la lógica vive en `components/request-service/`.
 * El límite de `Suspense` es necesario porque `RequestServiceView` lee
 * `?service=` con `useSearchParams` (Next 16 + Cache Components).
 */
export default function RequestServicePage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <RequestServiceHeader />

      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="grid min-h-[520px] grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px]"
          >
            <div className="rounded-card-lg border border-border bg-surface" />
            <div className="rounded-card-lg border border-border bg-surface" />
          </div>
        }
      >
        <RequestServiceView />
      </Suspense>
    </div>
  );
}
