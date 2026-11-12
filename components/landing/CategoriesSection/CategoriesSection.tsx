"use client";

import type { ComponentType, SVGProps } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowUpRight from "@/components/icons/arrow-up-right";
import Footprints from "@/components/icons/footprints";
import GraduationCap from "@/components/icons/graduation-cap";
import HouseHeart from "@/components/icons/house-heart";
import Scissors from "@/components/icons/scissors";
import Stethoscope from "@/components/icons/stethoscope";
import { CATEGORY_SELECT_EVENT } from "@/components/landing/category-filter";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface Category {
  name: string;
  description: string;
  icon: IconComponent;
}

/** Las 5 categorías documentadas (docs/landing-page.md §4). */
const CATEGORIES: readonly Category[] = [
  { name: "Veterinaria", description: "Salud en buenas manos", icon: Stethoscope },
  { name: "Peluquería", description: "Para verse y sentirse bien", icon: Scissors },
  { name: "Paseo", description: "Aventuras al aire libre", icon: Footprints },
  { name: "Entrenamiento", description: "Aprender juntos, sin prisa", icon: GraduationCap },
  { name: "Cuidado Temporal", description: "Un hogar cuando no estás", icon: HouseHeart },
];

/**
 * Tarjeta de categoría (Feature Card adaptado — docs/design-system.md §5.15):
 * blanca, borde #dce7e3, radio 16, p-24, `--shadow-card`; chip 52
 * (`#e6f0ed`, radio 16, icono 26) + nombre (Bold 17 #084c49) + descripción
 * (Regular 13 #647873) + `arrow-up-right` 18.
 *
 * Desktop (xl): vertical ≈227×207 — chip arriba, flecha abajo-izquierda.
 * Tablet/Mobile: horizontal 352×100 — chip izq (x24), info centrada (x96),
 * flecha derecha (x310) (docs/responsive.md §4.4).
 *
 * Interacción (docs/landing-page.md §4): la tarjeta navega a la Búsqueda
 * rápida (`#buscar`) y comunica la categoría para que se seleccione su Tag.
 *
 * ⏳ Color del icono del chip (se usa `--color-primary-600`) y de la flecha
 * (se usa `--color-primary-500`) no están documentados; hover con
 * `--shadow-float` como criterio (el kit no define el estado Hovered de la
 * tarjeta).
 */
function CategoryCard({ name, description, icon: Icon }: Category) {
  return (
    <a
      href="#buscar"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(CATEGORY_SELECT_EVENT, { detail: name }),
        );
      }}
      className="flex items-center gap-5 rounded-card border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 xl:min-h-[207px] xl:flex-col xl:items-start xl:gap-4"
    >
      <span className="flex size-13 shrink-0 items-center justify-center rounded-chip bg-chip text-primary-600">
        <Icon aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-category-title font-bold text-primary-500">{name}</span>
        <span className="text-support text-secondary">{description}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="shrink-0 text-primary-500" />
    </a>
  );
}

/**
 * Categorías de servicios (docs/landing-page.md §4 — nodos D 126:5696 ·
 * T 355:4598 · M 389:6274): py 64/72, gap 32 entre encabezado y catálogo.
 * Catálogo de 5 tarjetas con gap 16: 5 columnas en Desktop (227px c/u),
 * 2 en Tablet (352px, 2+2+1) y 1 en Mobile (342px).
 */
export default function CategoriesSection() {
  return (
    <section className="py-16 xl:py-18">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="PARA CADA NECESIDAD"
            title="Todo su cuidado, conectado"
            description="Encuentra el servicio ideal para cada etapa de su vida."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
