"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import ServiceRequestForm from "@/components/request-service/ServiceRequestForm/ServiceRequestForm";
import ServiceRequestSummary from "@/components/request-service/ServiceRequestSummary/ServiceRequestSummary";
import RequestNextSteps from "@/components/request-service/RequestNextSteps/RequestNextSteps";
import { pets } from "@/lib/pets";
import { services, toISODate } from "@/lib/services";
import {
  formatRequestDateTime,
  type RequestFormStatus,
  type ServiceRequestErrors,
  type ServiceRequestValues,
} from "@/lib/request-service";

/** Duración del envío simulado (no hay API real en esta fase). */
const SUBMIT_DELAY_MS = 900;

/**
 * Estado y composición de Solicitar Servicio: formulario (izquierda) y resumen
 * + "¿Qué pasa después?" (derecha) dentro de un único `<form>`, para que el
 * botón del resumen sea el `submit` y el resumen se actualice con cada cambio.
 *
 * Fuentes de datos: `data/pets.json` (vía `lib/pets.ts`) y
 * `data/services.json` (vía `lib/services.ts`). El servicio puede llegar por
 * `?service=<id>` desde `/services`; si no, se parte del primero del catálogo.
 * Reemplazar los JSON por una API no requiere tocar los componentes, que solo
 * reciben datos ya resueltos.
 */
export default function RequestServiceView() {
  const searchParams = useSearchParams();
  const requestedServiceId = searchParams.get("service");

  /* Etiqueta única por servicio: el `Select` trabaja con strings, así que los
     títulos repetidos se desambiguan con la ciudad (mismo dataset). */
  const serviceOptions = useMemo(() => {
    const titleCount = services.reduce<Record<string, number>>(
      (counts, service) => {
        counts[service.title] = (counts[service.title] ?? 0) + 1;
        return counts;
      },
      {}
    );

    return services.map((service) => ({
      id: service.id,
      label:
        titleCount[service.title] > 1
          ? `${service.title} · ${service.location}`
          : service.title,
    }));
  }, []);

  const [values, setValues] = useState<ServiceRequestValues>(() => {
    const initialId =
      serviceOptions.find((option) => option.id === requestedServiceId)?.id ??
      services[0].id;
    const initialService =
      serviceOptions.find((option) => option.id === initialId)?.label ??
      services[0].title;

    return {
      petName: pets[0]?.name ?? "",
      serviceLabel: initialService,
      date: "",
      time: "",
      notes: "",
    };
  });
  const [errors, setErrors] = useState<ServiceRequestErrors>({});
  const [status, setStatus] = useState<RequestFormStatus>("draft");
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedPet = pets.find((pet) => pet.name === values.petName);
  const selectedOption = serviceOptions.find(
    (option) => option.label === values.serviceLabel
  );
  const selectedService =
    (selectedOption
      ? services.find((service) => service.id === selectedOption.id)
      : undefined) ?? services[0];

  const today = toISODate(new Date());
  const dateTimeLabel = formatRequestDateTime(values.date, values.time);

  const handleChange = (patch: Partial<ServiceRequestValues>) => {
    setValues((current) => ({ ...current, ...patch }));

    setErrors((current) => {
      if (Object.keys(current).length === 0) return current;

      const next = { ...current };
      if (patch.petName !== undefined) next.pet = undefined;
      if (patch.serviceLabel !== undefined) next.service = undefined;
      if (patch.date !== undefined) next.date = undefined;
      if (patch.time !== undefined) next.time = undefined;
      return next;
    });

    /* Editar después de enviar invalida el estado anterior: vuelve a "Sin
       enviar" para que la solicitud pueda enviarse de nuevo. */
    if (status === "submitted" || status === "error") setStatus("draft");
  };

  const validate = (): ServiceRequestErrors => {
    const next: ServiceRequestErrors = {};

    if (!pets.some((pet) => pet.name === values.petName)) {
      next.pet = "Selecciona una mascota.";
    }
    if (!selectedOption) {
      next.service = "Selecciona un servicio.";
    }
    if (!values.date) {
      next.date = "Selecciona una fecha.";
    } else if (values.date < today) {
      next.date = "La fecha no puede ser anterior a hoy.";
    }
    if (!values.time) {
      next.time = "Selecciona una hora.";
    }

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting" || status === "submitted") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    /* Envío simulado en cliente: no hay API, backend ni persistencia. */
    setStatus("submitting");
    submitTimer.current = setTimeout(() => {
      submitTimer.current = null;
      setStatus("submitted");
    }, SUBMIT_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (submitTimer.current) clearTimeout(submitTimer.current);
    },
    []
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Solicitud de servicio"
      className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start"
    >
      <ServiceRequestForm
        status={status}
        values={values}
        errors={errors}
        petOptions={pets.map((pet) => pet.name)}
        serviceOptions={serviceOptions.map((option) => option.label)}
        selectedPet={selectedPet}
        selectedServiceDescription={selectedService.description}
        onChange={handleChange}
      />

      <div className="flex min-w-0 flex-col gap-6">
        <ServiceRequestSummary
          status={status}
          pet={selectedPet}
          service={selectedService}
          dateTimeLabel={dateTimeLabel}
        />
        <RequestNextSteps />
      </div>
    </form>
  );
}
