import ServiceCard from "@/components/services/ServiceCard/ServiceCard";
import ServicesEmpty from "@/components/services/ServicesEmpty/ServicesEmpty";
import type { Service } from "@/lib/services";

export interface ServicesGridProps {
  services: readonly Service[];
  favorites: readonly string[];
  onToggleFavorite: (id: string) => void;
  onClearFilters: () => void;
}

/**
 * Grid de servicios paginados: 1 columna en mobile, 2 desde `sm` y 3 en
 * pantallas muy anchas (`2xl`), donde el Aside + sidebar dejan espacio.
 */
export default function ServicesGrid({
  services,
  favorites,
  onToggleFavorite,
  onClearFilters,
}: ServicesGridProps) {
  if (services.length === 0) {
    return <ServicesEmpty onClear={onClearFilters} />;
  }

  return (
    <ul className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
      {services.map((service) => (
        <li key={service.id} className="min-w-0">
          <ServiceCard
            service={service}
            favorite={favorites.includes(service.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}
