import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb/ServiceBreadcrumb";
import ServiceGallery from "@/components/services/ServiceGallery/ServiceGallery";
import ServiceInfo from "@/components/services/ServiceInfo/ServiceInfo";
import ServiceBenefits from "@/components/services/ServiceBenefits/ServiceBenefits";
import ServiceReview from "@/components/services/ServiceReview/ServiceReview";
import ServiceFooter from "@/components/services/ServiceFooter/ServiceFooter";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Detalle del servicio · PetCare",
};

interface ServiceDetailPageProps {
  params: Promise<{ serviceId: string }>;
}

/** Prerenderiza los 48 servicios del catálogo local. */
export function generateStaticParams() {
  return services.map((service) => ({ serviceId: service.id }));
}

/**
 * Detalle de un servicio (`/services/[serviceId]`).
 *
 * Solo composición: el shell (Aside + Navbar + main) lo aporta `AppLayout`
 * (`app/(app)/layout.tsx`) y cada bloque vive en `components/services/`. El
 * servicio se resuelve desde `data/services.json` por `serviceId`; si no
 * existe, la ruta responde 404.
 *
 * El `Suspense` es necesario porque `params` es dinámico con Cache Components
 * (Next 16): el fallback reproduce la estructura de dos columnas.
 */
export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div
          aria-hidden="true"
          className="flex min-h-[520px] flex-col gap-6 xl:gap-8"
        >
          <div className="h-4 w-64 rounded-full bg-border" />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
            <div className="aspect-video rounded-card-lg border border-border bg-surface" />
            <div className="rounded-card-lg border border-border bg-surface" />
          </div>
        </div>
      }
    >
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: ServiceDetailPageProps) {
  const { serviceId } = await params;
  const service = services.find((item) => item.id === serviceId);

  if (!service) notFound();

  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <ServiceBreadcrumb serviceTitle={service.title} />

      {/* En `xl` la ficha ocupa la columna derecha (filas 1) y los bloques
          informativos se apilan bajo la galería; por debajo de `xl` el orden
          del DOM mantiene el CTA justo después de la galería. */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start">
        <div className="min-w-0 xl:col-start-1 xl:row-start-1">
          <ServiceGallery service={service} />
        </div>

        <div className="min-w-0 xl:col-start-2 xl:row-start-1">
          <ServiceInfo service={service} />
        </div>

        <div className="min-w-0 xl:col-start-1 xl:row-start-2">
          <ServiceBenefits />
        </div>

        <div className="min-w-0 xl:col-start-1 xl:row-start-3">
          <ServiceReview />
        </div>
      </div>

      <ServiceFooter />
    </div>
  );
}
