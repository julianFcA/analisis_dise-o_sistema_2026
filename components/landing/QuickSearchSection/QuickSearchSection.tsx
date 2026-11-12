"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Tag from "@/components/ui/Tag";
import CalendarDays from "@/components/icons/calendar-days";
import MapPin from "@/components/icons/map-pin";
import Search from "@/components/icons/search";
import { CATEGORY_SELECT_EVENT } from "@/components/landing/category-filter";

/** Categorías rápidas (docs/landing-page.md §3). La primera es la selección
 *  inicial (Tag selected documentado); selección única. */
const CATEGORIES = [
  "Todos los servicios",
  "Veterinaria",
  "Peluquería",
  "Paseo",
  "Entrenamiento",
  "Cuidado Temporal",
] as const;

/**
 * Búsqueda rápida (docs/landing-page.md §3 — nodos D 126:5657 ·
 * T 355:4562 · M 389:6238).
 *
 * Continúa la banda `#f4f7f6` del Hero (sin padding superior: el padding-y
 * del Hero aporta la separación) y cierra con el mismo ritmo (52/56).
 * Panel blanco p-24, radio 24, `--shadow-float`, a ancho útil completo.
 *
 * Bloques internos con gap 24 — verificado contra las alturas documentadas
 * del panel: D 171 (chips + divisor + campos con botón inline), T 235 (el
 * botón pasa a una segunda fila centrada) y M 363 (campos apilados).
 *
 * Mobile: chips con scroll interno (docs/responsive.md §5.3) y botón 200px
 * centrado; Tablet: campos en grid de 3 columnas (208px a la ref. 768) con
 * botón 200px centrado en la fila 2; Desktop: campos flex-1 en fila con el
 * botón inline a la derecha.
 */
export default function QuickSearchSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const serviceInputRef = useRef<HTMLInputElement>(null);

  /** Selección de categoría desde las tarjetas de CategoriesSection
   *  (docs/landing-page.md §4: la tarjeta "selecciona el Tag correspondiente"). */
  useEffect(() => {
    function handleCategorySelected(event: Event) {
      const category = (event as CustomEvent<string>).detail;
      if ((CATEGORIES as readonly string[]).includes(category)) {
        setSelectedCategory(category);
      }
    }

    window.addEventListener(CATEGORY_SELECT_EVENT, handleCategorySelected);
    return () =>
      window.removeEventListener(CATEGORY_SELECT_EVENT, handleCategorySelected);
  }, []);

  /** "Buscar" valida que haya servicio seleccionado (docs/landing-page.md
   *  §3): si el campo está vacío lo enfoca. No hay sección de resultados
   *  todavía, así que el envío no navega. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!serviceInputRef.current?.value.trim()) {
      serviceInputRef.current?.focus();
    }
  }

  return (
    <section id="buscar" className="bg-surface-muted pb-13 xl:pb-14">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="flex flex-col gap-6 rounded-card-lg bg-surface p-6 shadow-float">
          {/* Categorías rápidas (gap 28). Mobile: scroll horizontal interno
              (docs/responsive.md §5.3); desde Tablet los chips pueden envolver
              si no caben en una fila. */}
          <div
            role="group"
            aria-label="Filtrar por categoría"
            className="flex gap-7 max-md:overflow-x-auto md:flex-wrap"
          >
            {CATEGORIES.map((category) => (
              <Tag
                key={category}
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className="shrink-0"
              >
                {category}
              </Tag>
            ))}
          </div>

          <hr className="h-px border-0 bg-border" aria-hidden="true" />

          {/* Criterios de búsqueda (gap 24): 3 campos flex-1 + botón
              "Buscar" inline a la derecha en Desktop. */}
          <form
            role="search"
            aria-label="Buscar servicios"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:grid md:grid-cols-3 xl:flex xl:flex-row xl:items-center"
          >
            {/* Patrón Search Bar del UI Kit (docs/design-system.md §5.16). */}
            <SearchBar
              icon={Search}
              label="¿Qué necesita tu mascota?"
              name="servicio"
              placeholder="Selecciona un servicio"
              ref={serviceInputRef}
              className="xl:flex-1"
            />
            <SearchBar
              icon={MapPin}
              label="¿Dónde?"
              name="ubicacion"
              placeholder="Ciudad o zona"
              className="xl:flex-1"
            />
            <SearchBar
              icon={CalendarDays}
              label="¿Cuándo?"
              name="fecha"
              type="date"
              className="xl:flex-1"
            />
            <Button
              label="Buscar"
              submit
              className="w-[200px] self-center md:col-start-2 md:justify-self-center xl:w-auto xl:self-auto"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
