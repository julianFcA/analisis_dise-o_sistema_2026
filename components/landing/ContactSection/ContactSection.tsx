"use client";

import { useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import Mail from "@/components/icons/mail";
import Phone from "@/components/icons/phone";
import Clock3 from "@/components/icons/clock-3";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface ContactMethod {
  title: string;
  detail: string;
  icon: IconComponent;
}

/**
 * Los 3 medios de contacto documentados (docs/landing-page.md §10 — iconos
 * `mail`, `phone`, `clock-3`).
 *
 * ⏳ Los títulos de cada medio no están documentados (nodo `126:5970` no
 * extraído: Figma MCP rate-limited). Los detalles usan los valores de
 * referencia del footer (`docs/landing-page.md` §11): correo, teléfono y
 * horario.
 */
const CONTACT_METHODS: readonly ContactMethod[] = [
  {
    title: "Escríbenos",
    detail: "hola@petcare.example",
    icon: Mail,
  },
  {
    title: "Llámanos",
    detail: "+34 900 000 000",
    icon: Phone,
  },
  {
    title: "Horario de atención",
    detail: "Lun–Vie · 9:00 a 18:00",
    icon: Clock3,
  },
];

/** Opciones del Select "Asunto" (definidas por el usuario). */
const SUBJECT_OPTIONS: readonly string[] = [
  "Soporte",
  "Cotización",
  "Reservas",
  "Servicios",
  "Facturación",
];

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  accepted?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Medio de contacto (docs/design-system.md §6): símbolo 44 (chip `#e6f0ed`,
 * radio 16) + icono 20 + título Bold 13 `#173d39` + detalle Regular 20
 * (docs/landing-page.md §10).
 *
 * ⏳ El sistema no define un rol tipográfico de 20px: se reutiliza
 * `text-service-name` (21px) en Regular, el token más cercano. El color del
 * detalle no está documentado; se usa `--color-primary-500`.
 */
function ContactMethodItem({ title, detail, icon: Icon }: ContactMethod) {
  return (
    <li className="flex items-center gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-chip bg-chip text-primary-600">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-label font-bold text-body">{title}</span>
        <span className="text-service-name font-normal text-primary-500">
          {detail}
        </span>
      </span>
    </li>
  );
}

/**
 * Contacto (docs/landing-page.md §10 — nodos D `126:5969` · T `355:4859` ·
 * M `389:6535`): Hablemos (encabezado + 3 medios + nota) + formulario
 * (card `#f4f7f6`, p-32, radio 24, gap 20).
 *
 * Desktop (xl): 2 columnas — Hablemos 440px + Formulario 672px (gap 88 para
 * completar los 1200px útiles). Tablet/Mobile: apilado a 720/342px
 * (docs/responsive.md §10).
 *
 * ⏳ El fondo de la sección (`126:5969`) no está verificado: se usa blanco
 * para contrastar con la card muted del formulario.
 * ⏳ Copy pendiente: antetítulo, título, descripción, títulos de los medios y
 * nota de Hablemos.
 */
export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Escribe tu nombre.";
    if (!email.trim()) {
      nextErrors.email = "Escribe tu correo electrónico.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Introduce un correo electrónico válido.";
    }
    if (!subject) nextErrors.subject = "Selecciona un tema.";
    if (!message.trim()) nextErrors.message = "Cuéntanos en qué podemos ayudarte.";
    if (!accepted) nextErrors.accepted = "Debes aceptar la política de privacidad.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSent(false);
      return;
    }

    // "Envío" simulado en cliente: no hay backend en esta fase.
    setSubmitting(true);
    setSent(false);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setName("");
      setEmail("");
      setSubject(undefined);
      setMessage("");
      setAccepted(false);
    }, 900);
  };

  return (
    <section id="contacto" className="py-16 xl:py-20">
      <div className="mx-auto w-full max-w-page px-6 xl:px-30">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[440px_minmax(0,1fr)] xl:gap-22">
          {/* Hablemos: encabezado + medios de contacto + nota. */}
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="CONTACTO"
              title="Estamos aquí para ti y para ellos."
              description="¿Tienes una pregunta o necesitas ayuda para empezar? Cuéntanos cómo podemos acompañarte."
            />

            <ul className="flex flex-col gap-6">
              {CONTACT_METHODS.map((method) => (
                <ContactMethodItem key={method.detail} {...method} />
              ))}
            </ul>

            <p className="text-note text-secondary">Datos de contacto de ejemplo.</p>
          </div>

          {/* Formulario de contacto (card `#f4f7f6`). */}
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contacto-form-title"
            className="flex flex-col gap-5 rounded-card-lg bg-surface-muted p-8"
          >
            <h3
              id="contacto-form-title"
              className="text-form-title font-bold text-primary-500"
            >
              Envíanos un mensaje
            </h3>

            {/* Datos personales: 2 columnas en todos los breakpoints. */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                required
                name="nombre"
                placeholder="Tu nombre"
                value={name}
                onChange={setName}
                error={errors.name}
              />
              <Input
                label="Correo electrónico"
                required
                name="correo"
                placeholder="tu@correo.com"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Select
                label="¿En qué podemos ayudarte?"
                required
                name="asunto"
                placeholder="Selecciona un tema"
                options={SUBJECT_OPTIONS}
                value={subject}
                onChange={setSubject}
              />
              {errors.subject ? (
                <p className="text-note text-accent" role="alert">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <Input
              label="Mensaje"
              required
              textarea
              name="mensaje"
              placeholder="Cuéntanos un poco más…"
              value={message}
              onChange={setMessage}
              error={errors.message}
            />

            <div className="flex flex-col gap-2">
              <Checkbox checked={accepted} onChange={setAccepted}>
                He leído y acepto la política de privacidad.
              </Checkbox>
              {errors.accepted ? (
                <p className="text-note text-accent" role="alert">
                  {errors.accepted}
                </p>
              ) : null}
            </div>

            <Button
              type="default"
              label="Enviar mensaje"
              submit
              state={submitting ? "loading" : "default"}
              className="w-full"
            />

            {sent ? (
              <p role="status" className="text-note text-primary-600">
                ¡Gracias! Hemos recibido tu mensaje.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
