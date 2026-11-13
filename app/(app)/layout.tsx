import { Suspense, type ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout/AppLayout";

/**
 * Layout del grupo de rutas de la aplicación autenticada: compone el
 * `AppLayout` existente (Aside + Navbar superior + área de contenido).
 * Solo estructura: la autenticación real queda fuera de alcance.
 *
 * `AppLayout` es un Client Component que lee `usePathname()`; con Cache
 * Components las rutas con segmentos dinámicos necesitan un límite de
 * `Suspense` por encima de ese hook para poder prerenderizar su shell
 * (docs de Next 16 → `usePathname`). El fallback es solo el fondo del shell,
 * porque en las rutas estáticas el pathname se resuelve durante el prerender
 * y el límite no llega a mostrarse.
 */
export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-muted" />}>
      <AppLayout>{children}</AppLayout>
    </Suspense>
  );
}
