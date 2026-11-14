"use client";

import Image from "next/image";
import Badge, { type BadgeType } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Check from "@/components/icons/check";
import ShieldCheck from "@/components/icons/shield-check";
import { describePet, type Pet } from "@/lib/pets";
import {
  MAX_REQUEST_NOTES,
  type RequestFormStatus,
  type ServiceRequestErrors,
  type ServiceRequestValues,
} from "@/lib/request-service";

interface StatusConfig {
  label: string;
  type?: BadgeType;
}

/**
 * Estado del formulario → variante existente del Badge (§5.7):
 * `draft` gris, `submitting` azul, `submitted` verde y `error` cálido.
 */
const STATUS_CONFIG: Record<RequestFormStatus, StatusConfig> = {
  draft: { label: "Sin enviar", type: "disabled" },
  submitting: { label: "Enviando…", type: "review" },
  submitted: { label: "Enviada", type: "success" },
  error: { label: "No se pudo enviar", type: "canceled" },
};

export interface ServiceRequestFormProps {
  status: RequestFormStatus;
  values: ServiceRequestValues;
  errors: ServiceRequestErrors;
  /** Nombres de mascota disponibles (`data/pets.json`). */
  petOptions: readonly string[];
  /** Etiquetas únicas de servicio (`data/services.json`). */
  serviceOptions: readonly string[];
  selectedPet?: Pet;
  /** Descripción del servicio que originó la solicitud. */
  selectedServiceDescription?: string;
  onChange: (patch: Partial<ServiceRequestValues>) => void;
}

/**
 * Card "Detalles del servicio" con el formulario de la solicitud.
 *
 * Reutiliza `Select`, `Input` y `Badge` del UI Kit y mantiene el estado en
 * `RequestServiceView` (componente controlado). La validación se muestra con
 * el patrón `Error` del Input y el mensaje accesible del Select.
 */
export default function ServiceRequestForm({
  status,
  values,
  errors,
  petOptions,
  serviceOptions,
  selectedPet,
  selectedServiceDescription,
  onChange,
}: ServiceRequestFormProps) {
  const statusConfig = STATUS_CONFIG[status];
  const notesPlaceholder = selectedPet
    ? `Revisión anual de ${selectedPet.name}. Llevaré su cartilla de vacunación actualizada.`
    : "Cuéntale al proveedor lo que necesite saber sobre tu mascota.";

  return (
    <section
      aria-labelledby="request-form-title"
      className="flex min-w-0 flex-col gap-5 rounded-card-lg border border-border bg-surface p-5 shadow-card xl:p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2
            id="request-form-title"
            className="text-form-title font-bold text-primary-500"
          >
            Detalles del servicio
          </h2>
          <p className="text-control-sm text-secondary">
            Completa los datos para preparar tu solicitud.
          </p>
        </div>

        <Badge
          type={statusConfig.type}
          showIndicator={status === "submitting"}
        >
          {statusConfig.label}
        </Badge>
      </header>

      {status === "submitted" ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-card border border-border bg-chip p-4"
        >
          <Check
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary-600"
          />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-control-sm font-bold text-primary-500">
              Tu solicitud fue enviada
            </p>
            <p className="text-note text-secondary">
              Quedará pendiente hasta que el proveedor la confirme. Si cambias
              algún dato, podrás enviarla de nuevo.
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Select
            label="Seleccionar Mascota"
            options={petOptions}
            value={values.petName}
            onChange={(petName) => onChange({ petName })}
            placeholder="Elige una mascota"
            error={errors.pet}
            required
          />

          {selectedPet ? (
            <div className="flex items-center gap-3 rounded-card border border-border bg-surface-muted p-3">
              <Image
                src={selectedPet.image}
                alt={selectedPet.imageAlt}
                width={96}
                height={96}
                sizes="48px"
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-control-sm font-bold text-body">
                  {selectedPet.name}
                </p>
                <p className="truncate text-note text-secondary">
                  {describePet(selectedPet)}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Select
            label="Seleccionar Servicio"
            options={serviceOptions}
            value={values.serviceLabel}
            onChange={(serviceLabel) => onChange({ serviceLabel })}
            placeholder="Elige un servicio"
            error={errors.service}
            required
          />

          {selectedServiceDescription ? (
            <p className="text-support text-secondary">
              {selectedServiceDescription}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Fecha"
            type="date"
            value={values.date}
            onChange={(date) => onChange({ date })}
            error={errors.date}
            required
          />

          <Input
            label="Hora"
            type="time"
            value={values.time}
            onChange={(time) => onChange({ time })}
            error={errors.time}
            required
          />
        </div>

        <Input
          label="Notas para el proveedor (opcional)"
          placeholder={notesPlaceholder}
          value={values.notes}
          onChange={(notes) => onChange({ notes })}
          hint={
            <span aria-live="polite">
              {values.notes.length} / {MAX_REQUEST_NOTES} caracteres
            </span>
          }
          textarea
        />

        <p className="flex items-start gap-2 border-t border-border pt-4 text-note text-secondary">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-primary-600"
          />
          Tus datos solo se compartirán con el proveedor del servicio.
        </p>
      </div>
    </section>
  );
}
