import Button from "@/components/ui/Button";
import Heart from "@/components/icons/heart";
import HeartHandshake from "@/components/icons/heart-handshake";
import ShieldCheck from "@/components/icons/shield-check";
import HeroIllustration from "@/components/landing/HeroSection/HeroIllustration";

/** Señales de confianza del Hero (docs/landing-page.md §2). */
const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: "Proveedores verificados" },
  { icon: HeartHandshake, label: "Cuidado con cariño" },
] as const;

/**
 * Bienvenida / Hero (docs/landing-page.md §2 — nodos D 126:5521 ·
 * T 355:4430 · M 389:6106).
 *
 * Fondo #f4f7f6, padding-y 52/56. Desktop (xl): 2 columnas — propuesta de
 * valor 590px + ilustración 570px, gap 40 (= ancho útil 1200). Tablet y
 * Mobile: 1 columna a ancho completo; la ilustración está oculta
 * (docs/responsive.md §4.2/§5.2) y no se renderiza espacio para ella.
 *
 * La columna de texto sigue el patrón de encabezado del design system:
 * antetítulo→H1→descripción con gap 16 (docs/design-system.md §4) y gap 32
 * entre bloques (CTAs, señales de confianza).
 */
export default function HeroSection() {
  return (
    <section className="bg-surface-muted">
      <div className="mx-auto w-full max-w-page px-6 py-13 xl:px-30 xl:py-14">
        {/* Columna de texto fluida + ilustración fija 570px: a la referencia
            1440 el texto ocupa exactamente 590px (1200−40−570); entre 1280 y
            1439 se comprime sin provocar overflow horizontal. */}
        <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1fr)_570px] xl:items-center xl:gap-10">
          {/* Propuesta de valor (126:5522, 590px en Desktop). */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2 text-eyebrow-hero font-bold uppercase text-primary-600">
                <Heart aria-hidden="true" />
                SU BIENESTAR, TU TRANQUILIDAD
              </p>
              <h1 className="text-h1 font-bold text-primary-500">
                Encuentra el mejor cuidado para tu mascota en un solo lugar
              </h1>
              <p className="text-hero-body text-secondary xl:max-w-[530px]">
                Desde una consulta hasta un paseo feliz. Conecta con personas
                que cuidan de tu mascota tanto como tú.
              </p>
            </div>

            {/* CTAs (gap 12): solo en Mobile cada botón pasa a 165px (flex-1);
                desde Tablet recuperan su ancho natural (docs/responsive.md §4.2). */}
            <div className="flex gap-3">
              <Button
                type="secondary"
                label="Conoce más"
                href="#nosotros"
                className="flex-1 md:flex-none"
              />
              <Button
                type="default"
                label="Buscar Servicios"
                href="#buscar"
                className="flex-1 md:flex-none"
              />
            </div>

            {/* Señales de confianza (gap 20, Regular 13 #647873). */}
            <ul className="flex flex-wrap items-center gap-5">
              {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-support text-secondary"
                >
                  <Icon aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Vínculo con las mascotas (126:5545, 570×490 — solo Desktop). */}
          <div className="hidden xl:block">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
