import type { ReactNode } from "react";
import AuthNavbar from "@/components/auth/AuthNavbar/AuthNavbar";
import SocialProof from "@/components/auth/SocialProof/SocialProof";

export interface AuthLayoutProps {
  /** Presentation Panel (solo visible en Desktop). */
  panel: ReactNode;
  /** Formulario de la pantalla. */
  children: ReactNode;
}

/**
 * Estructura compartida de Login y Register
 * (docs/auth-reference §4.1): Navbar, contenedor principal de dos columnas
 * y Social Proof debajo.
 *
 * Desktop (`xl`, ref. 1440): columnas 656 + 520 px con gap 24 (= 1200 px
 * útiles) y panel de presentación visible. Tablet/Mobile: panel oculto y
 * card centrada con ancho máximo 520 px, respetando el padding lateral de
 * 24 px.
 */
export default function AuthLayout({ panel, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-1 flex-col bg-surface">
      <AuthNavbar />

      <main className="flex-1">
        <div className="mx-auto flex w-full max-w-page flex-col px-6 pb-12 pt-8 md:pt-10 xl:px-0 xl:pb-16 xl:pt-12">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,656px)_minmax(0,520px)] xl:items-stretch xl:gap-6">
            <div className="hidden xl:block">{panel}</div>

            <div className="mx-auto w-full max-w-[520px] xl:mx-0 xl:max-w-none">
              {children}
            </div>
          </div>

          <SocialProof className="mt-10 xl:mt-12" />
        </div>
      </main>
    </div>
  );
}
