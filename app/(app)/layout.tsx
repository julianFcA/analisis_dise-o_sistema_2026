import type { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout/AppLayout";

/**
 * Layout del grupo de rutas de la aplicación autenticada: compone el
 * `AppLayout` existente (Aside + Navbar superior + área de contenido).
 * Solo estructura: la autenticación real queda fuera de alcance.
 */
export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
