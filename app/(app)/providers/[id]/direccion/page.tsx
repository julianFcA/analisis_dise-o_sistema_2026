import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProviderAddressHeader from "@/components/providers/ProviderAddressHeader/ProviderAddressHeader";
import ProviderAddressCard from "@/components/providers/ProviderAddressCard/ProviderAddressCard";
import ProviderMap from "@/components/providers/ProviderMap/ProviderMap";
import ProviderVisitInfo from "@/components/providers/ProviderVisitInfo/ProviderVisitInfo";
import { provider } from "@/components/providers/data";

export const metadata: Metadata = {
  title: `Dirección · ${provider.name} · PetCare`,
};

interface ProviderAddressPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [{ id: provider.slug }];
}

/**
 * Dirección del proveedor (`/providers/[id]/direccion`).
 *
 * Solo composición: el shell (Aside + Navbar + main) lo aporta `AppLayout` y
 * cada bloque vive en `components/providers/`. Se mantiene el nombre de
 * segmento `[id]` de la ruta existente del proveedor (`/providers/[id]`).
 *
 * El `Suspense` es necesario porque `params` es dinámico con Cache Components
 * (Next 16): el fallback reproduce la estructura de las dos cards.
 */
export default function ProviderAddressPage({
  params,
}: ProviderAddressPageProps) {
  return (
    <Suspense
      fallback={
        <div
          aria-hidden="true"
          className="flex min-h-[520px] flex-col gap-6 xl:gap-8"
        >
          <div className="flex flex-col gap-3">
            <div className="h-3 w-40 rounded-full bg-border" />
            <div className="h-9 w-80 rounded-card bg-border" />
            <div className="h-4 w-full max-w-lg rounded-full bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            <div className="h-96 rounded-card-lg border border-border bg-surface" />
            <div className="h-96 rounded-card-lg border border-border bg-surface" />
          </div>
        </div>
      }
    >
      <ProviderAddressContent params={params} />
    </Suspense>
  );
}

async function ProviderAddressContent({ params }: ProviderAddressPageProps) {
  const { id } = await params;

  if (id !== provider.slug) notFound();

  return (
    <div className="flex min-w-0 flex-col gap-6 xl:gap-8">
      <ProviderAddressHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <ProviderAddressCard />
        <ProviderMap />
      </div>

      <ProviderVisitInfo />
    </div>
  );
}
