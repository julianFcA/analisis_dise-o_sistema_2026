"use client";

import Image from "next/image";
import { useEffect, useId, useState, type ReactNode } from "react";
import Modal from "@/components/ui/Modal/Modal";
import Camera from "@/components/icons/camera";
import Eye from "@/components/icons/eye";
import X from "@/components/icons/x";
import { cn } from "@/lib/cn";

/** Imagen de la galería (ruta local de `public/images/`). */
export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryProps {
  /** Imágenes de la galería en orden; la primera es la principal. */
  images: readonly GalleryImage[];
  /** Píldora sobre la esquina superior izquierda de la imagen principal. */
  badge?: ReactNode;
  /** Acción sobre la esquina superior derecha (p. ej. favorito). */
  action?: ReactNode;
  className?: string;
}

/** Miniaturas visibles antes del acceso a la vista ampliada. */
const THUMBNAIL_COUNT = 3;

/**
 * Galería reutilizable del design system: imagen principal, fila de miniaturas
 * con scroll interno y vista ampliada sobre el `Modal` del kit.
 *
 * No usa librerías externas: la selección de la imagen principal es estado
 * local. El consumidor aporta las imágenes (`src`/`alt`), así que puede
 * reutilizarse en Provider Detail, My Pets u otras páginas.
 */
export default function Gallery({
  images,
  badge,
  action,
  className,
}: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const activeImage = images[activeIndex] ?? images[0];
  const thumbnails = images.slice(0, THUMBNAIL_COUNT);

  /* Vista ampliada: bloquea el scroll del documento y cierra con Escape. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!activeImage) return null;

  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-card-lg border border-border bg-surface-muted">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          loading="eager"
          sizes="(min-width: 1280px) 760px, 100vw"
          className="object-cover"
        />

        {badge || action ? (
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
            <div className="flex min-w-0 items-center gap-2">
              {badge}
            </div>
            {action}
          </div>
        ) : null}

        <p className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-note font-bold text-primary-500 shadow-card backdrop-blur-sm">
          <Camera aria-hidden="true" className="size-3.5" />
          <span>
            {activeIndex + 1}/{images.length}
          </span>
        </p>
      </div>

      <ul
        aria-label="Miniaturas de la galería"
        className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {thumbnails.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={image.src} className="min-w-0">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Ver foto ${index + 1}: ${image.alt}`}
                className={cn(
                  "relative aspect-3/2 w-full overflow-hidden rounded-chip border-2 transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                  isActive
                    ? "border-primary-500"
                    : "border-border hover:border-primary-600"
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 190px, 45vw"
                  className="object-cover"
                />
              </button>
            </li>
          );
        })}

        <li className="min-w-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "flex aspect-3/2 w-full flex-col items-center justify-center gap-1 rounded-chip bg-primary-500 px-1 text-note font-bold text-surface transition-colors hover:bg-primary-700",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            )}
          >
            <Eye aria-hidden="true" className="size-4" />
            Ver las fotos
          </button>
        </li>
      </ul>

      {open ? (
        <Modal labelledBy={titleId}>
          <div className="my-auto w-full max-w-4xl overflow-hidden rounded-card bg-surface shadow-float">
            <header className="flex items-center justify-between gap-4 border-b border-border p-5">
              <h2
                id={titleId}
                className="text-form-title font-bold text-primary-500"
              >
                Todas las fotos
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar galería"
                className="shrink-0 rounded-full p-1.5 text-primary-600 transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="grid max-h-[70vh] grid-cols-2 gap-3 overflow-y-auto p-5 md:grid-cols-3">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setOpen(false);
                  }}
                  aria-label={`Ampliar foto ${index + 1}: ${image.alt}`}
                  className="relative aspect-4/3 overflow-hidden rounded-card border border-border transition-colors hover:border-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 300px, 45vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
