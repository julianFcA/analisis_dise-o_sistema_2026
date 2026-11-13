import type { Metadata } from "next";
import ProviderHeader from "@/components/providers/ProviderHeader/ProviderHeader";
import ProviderOverview from "@/components/providers/ProviderOverview/ProviderOverview";
import ProviderServices from "@/components/providers/ProviderServices/ProviderServices";
import ProviderBookingCard from "@/components/providers/ProviderBookingCard/ProviderBookingCard";
import ProviderHours from "@/components/providers/ProviderHours/ProviderHours";
import ProviderLocation from "@/components/providers/ProviderLocation/ProviderLocation";
import ProviderContact from "@/components/providers/ProviderContact/ProviderContact";
import ProviderTrustBanner from "@/components/providers/ProviderTrustBanner/ProviderTrustBanner";
import ProviderFooter from "@/components/providers/ProviderFooter/ProviderFooter";
import { provider } from "@/components/providers/data";

export const metadata: Metadata = {
  title: "Clínica Veterinaria Huellas · PetCare",
};

/**
 * Detalle del proveedor (`/providers/[id]`): acciones superiores, dos columnas
 * (hero + servicios / reserva, horarios, ubicación y contacto), franja de
 * confianza y pie.
 *
 * Solo composición: cada bloque vive en `components/providers/` y el shell
 * (Aside + Navbar + main) lo aporta `AppLayout` (`app/(app)/layout.tsx`). En
 * esta fase se sirve un proveedor estático de referencia.
 */
export function generateStaticParams() {
  return [{ id: provider.slug }];
}

export default function ProviderDetailPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <ProviderHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start">
        <div className="flex min-w-0 flex-col gap-6">
          <ProviderOverview />
          <ProviderServices />
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <ProviderBookingCard />
          <ProviderHours />
          <ProviderLocation />
          <ProviderContact />
        </div>
      </div>

      <ProviderTrustBanner />
      <ProviderFooter />
    </div>
  );
}
