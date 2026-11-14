"use client";

import { useState } from "react";
import Gallery, { type GalleryImage } from "@/components/ui/Gallery/Gallery";
import Badge from "@/components/ui/Badge";
import Heart from "@/components/icons/heart";
import ShieldCheck from "@/components/icons/shield-check";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/services";

/**
 * Assets locales de la galería (`public/images/`). El dataset no guarda fotos
 * por servicio, así que se usan las mismas cuatro imágenes de referencia para
 * todos los detalles; no se generan ni descargan assets nuevos.
 */
const GALLERY_SOURCES = [
  "/images/service.png",
  "/images/service-1.png",
  "/images/service-2.png",
  "/images/service-3.png",
] as const;

export interface ServiceGalleryProps {
  service: Service;
}

/**
 * Galería del detalle: delega la interacción en el `Gallery` reutilizable del
 * UI Kit y compone la píldora de confianza y el favorito sobre la foto
 * principal (estado local en cliente).
 */
export default function ServiceGallery({ service }: ServiceGalleryProps) {
  const [favorite, setFavorite] = useState(false);

  const images: GalleryImage[] = GALLERY_SOURCES.map((src, index) => ({
    src,
    alt: `${service.title} · ${service.provider.name} (foto ${index + 1})`,
  }));

  return (
    <Gallery
      images={images}
      badge={
        <Badge>
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          Cuidado de confianza
        </Badge>
      }
      action={
        <button
          type="button"
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Quitar ${service.title} de favoritos`
              : `Guardar ${service.title} en favoritos`
          }
          onClick={() => setFavorite((value) => !value)}
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-secondary shadow-card transition-colors hover:text-primary-600",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          )}
        >
          <Heart
            aria-hidden="true"
            className={cn(
              "size-[18px]",
              favorite && "fill-accent text-accent"
            )}
          />
        </button>
      }
    />
  );
}
