"use client";

import type { ComponentType, SVGProps } from "react";
import Tag from "@/components/ui/Tag";
import Footprints from "@/components/icons/footprints";
import GraduationCap from "@/components/icons/graduation-cap";
import HouseHeart from "@/components/icons/house-heart";
import PawPrint from "@/components/icons/paw-print";
import Scissors from "@/components/icons/scissors";
import Stethoscope from "@/components/icons/stethoscope";
import {
  ALL_CATEGORIES,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/lib/services";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface ServiceCategoriesProps {
  /** `ALL_CATEGORIES` o la categoría activa. */
  value: string;
  onChange: (category: string) => void;
}

/* Mismo mapa de iconos que la sección de Categorías del Home
   (`components/landing/CategoriesSection`), para mantener la iconografía. */
const CATEGORY_ICONS: Record<ServiceCategory, IconComponent> = {
  Veterinaria: Stethoscope,
  Peluquería: Scissors,
  Paseo: Footprints,
  Entrenamiento: GraduationCap,
  "Cuidado Temporal": HouseHeart,
};

interface CategoryOption {
  value: string;
  label: string;
  icon: IconComponent;
}

const CATEGORY_OPTIONS: readonly CategoryOption[] = [
  { value: ALL_CATEGORIES, label: "Todos los servicios", icon: PawPrint },
  ...SERVICE_CATEGORIES.map((category) => ({
    value: category,
    label: category,
    icon: CATEGORY_ICONS[category],
  })),
];

/**
 * Navegación horizontal de categorías: filtra el catálogo por
 * `service.category` y comparte estado con el filtro de categoría del sidebar.
 *
 * Desktop (`xl`): las opciones se reparten a todo el ancho de la barra.
 * Mobile/tablet: conservan su ancho natural y la fila se desplaza
 * horizontalmente dentro de su contenedor para no generar overflow en la
 * página (docs/responsive.md).
 */
export default function ServiceCategories({
  value,
  onChange,
}: ServiceCategoriesProps) {
  return (
    <nav
      aria-label="Categorías de servicios"
      className="rounded-card-lg border border-border bg-surface p-2 shadow-card"
    >
      <ul className="flex items-center gap-2 overflow-x-auto xl:justify-between">
        {CATEGORY_OPTIONS.map(({ value: optionValue, label, icon: Icon }) => (
          <li key={optionValue} className="shrink-0">
            <Tag
              selected={value === optionValue}
              onClick={() => onChange(optionValue)}
            >
              <span className="inline-flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {label}
              </span>
            </Tag>
          </li>
        ))}
      </ul>
    </nav>
  );
}
