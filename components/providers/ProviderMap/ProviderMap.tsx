"use client";

import { useEffect, useId, useState } from "react";
import Button from "@/components/ui/Button";
import MapPreview from "@/components/ui/MapPreview/MapPreview";
import Modal from "@/components/ui/Modal/Modal";
import ArrowUpRight from "@/components/icons/arrow-up-right";
import Check from "@/components/icons/check";
import ClipboardList from "@/components/icons/clipboard-list";
import MapPin from "@/components/icons/map-pin";
import X from "@/components/icons/x";
import { provider } from "@/components/providers/data";

/** Dirección completa en una línea, tal como se copia al portapapeles. */
const ADDRESS_TEXT = provider.address.join(", ");

/** Rótulo del marcador: nombre y dirección del proveedor. */
const MARKER_TITLE = provider.name;
const MARKER_META = `${provider.address[0]}, ${provider.location}`;

/** Respaldo para navegadores sin permiso de Clipboard API. */
function copyWithSelection(text: string): boolean {
  const field = document.createElement("textarea");
  field.value = text;
  field.readOnly = true;
  field.className = "sr-only";
  document.body.appendChild(field);
  field.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(field);
  }
}

/**
 * Card "Aquí nos encontrarás": mapa mock (`MapPreview`), vista ampliada en el
 * `Modal` del kit, dirección y acción "Copiar" (solo la dirección).
 */
export default function ProviderMap() {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const mapTitleId = useId();

  /* Vista ampliada: bloquea el scroll del documento y cierra con Escape. */
  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  async function handleCopy() {
    let copiedOk = false;

    try {
      await navigator.clipboard.writeText(ADDRESS_TEXT);
      copiedOk = true;
    } catch {
      copiedOk = copyWithSelection(ADDRESS_TEXT);
    }

    if (!copiedOk) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section
      aria-labelledby="provider-map-title"
      className="flex min-w-0 flex-col gap-4 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2
            id="provider-map-title"
            className="text-form-title font-bold text-primary-500"
          >
            Aquí nos encontrarás
          </h2>
          <p className="text-support text-secondary">{provider.location}</p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="inline-flex shrink-0 items-center gap-1.5 text-note font-bold text-primary-600 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Ampliar mapa
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </button>
      </div>

      <MapPreview
        label={`Mapa de ubicación de ${provider.name}`}
        markerTitle={MARKER_TITLE}
        markerMeta={MARKER_META}
        className="h-72 sm:h-80 xl:h-104"
      />

      <div className="flex flex-row items-center justify-between gap-3 rounded-card border border-border bg-surface px-4 py-3">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-primary-600"
          />

          <address className="flex min-w-0 flex-col text-note not-italic sm:text-control-sm">
            <span className="font-bold text-body">{provider.address[0]}</span>
            <span className="text-secondary">{provider.address[1]}</span>
          </address>
        </div>

        <Button
          type="terciary"
          label={copied ? "Copiado" : "Copiar"}
          onClick={handleCopy}
          leftIcon={
            copied ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <ClipboardList aria-hidden="true" className="size-4" />
            )
          }
          className="w-fit shrink-0 px-2 text-note font-bold"
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? "Dirección copiada al portapapeles" : ""}
      </p>

      {expanded ? (
        <Modal labelledBy={mapTitleId}>
          <div className="my-auto w-full max-w-4xl overflow-hidden rounded-card bg-surface shadow-float">
            <header className="flex items-center justify-between gap-4 border-b border-border p-5">
              <h2
                id={mapTitleId}
                className="text-form-title font-bold text-primary-500"
              >
                Mapa de ubicación
              </h2>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Cerrar mapa"
                className="shrink-0 rounded-full p-1.5 text-primary-600 transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="p-5">
              <MapPreview
                label={`Mapa ampliado de ${provider.name}`}
                markerTitle={MARKER_TITLE}
                markerMeta={MARKER_META}
                className="h-[60vh] min-h-72"
              />
            </div>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}
