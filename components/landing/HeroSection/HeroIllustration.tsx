import Heart from "@/components/icons/heart";

/**
 * "Vínculo con las mascotas" (nodo 126:5545, 570×490 — solo Desktop):
 * escena ilustrada 570×460 exportada de Figma como **SVG único**
 * (`public/illustrations/hero/scene.svg`) + Nota de bienestar flotante.
 *
 * La escena se exportó completa (atmosphere, plantas, banco, woman,
 * retriever, woman-embrace, man, small-dog, cat y ground-accents) para no
 * depender de las posiciones individuales de cada elemento
 * (docs/figma-reference.md §5.1). Es decorativa: `alt=""` + `aria-hidden`.
 */
export default function HeroIllustration() {
  return (
    <div className="relative h-[490px] w-[570px]">
      {/* Escena decorativa 570×460 (se conservan width/height raíz del SVG). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/illustrations/hero/scene.svg"
        alt=""
        width={570}
        height={460}
        aria-hidden="true"
        className="block"
      />

      {/* Nota de bienestar (126:5650): card blanca flotante, padding 16,
          radio 16, --shadow-float. Símbolo 40 (#fff3e8, radio 12) con heart
          22 + título Bold 14 #084c49 + apoyo Regular 12 #647873
          (docs/design-system.md §6). Posición: centrada horizontalmente y
          alineada al borde inferior del área 570×490. */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-chip bg-surface p-4 shadow-float">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-emblem bg-accent-soft text-accent"
          aria-hidden="true"
        >
          <Heart className="size-[22px]" />
        </span>
        <div>
          <p className="text-control-sm font-bold text-primary-500">
            Más que mascotas, familia.
          </p>
          <p className="text-note text-secondary">
            El cuidado que se merecen, cerca de ti.
          </p>
        </div>
      </div>
    </div>
  );
}
